/**
 * lib/pdf/pdfToPng.ts
 *
 * Fully browser-based PDF -> PNG conversion engine for MeggatronAI.
 * No server. No API. No database. Everything happens locally in the
 * user's browser using pdfjs-dist for rendering, JSZip for bundling,
 * and file-saver for triggering downloads.
 */

import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// ------------------------------------------------------------------
// Worker setup
// ------------------------------------------------------------------
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

// ------------------------------------------------------------------
// Types & Interfaces
// ------------------------------------------------------------------

export type ResolutionScale = 1 | 2 | 3;

/**
 * PNG is a lossless format, so there is no true "quality" slider the way
 * JPEG has one — the browser's canvas.toBlob() ignores the quality
 * argument for image/png entirely. Instead, "render quality" here
 * controls the canvas's anti-aliasing / image-smoothing algorithm, which
 * has a real, visible effect on how crisp scaled-up page content looks.
 */
export type RenderQuality = "draft" | "standard" | "high";

export interface PdfMetaInfo {
  fileName: string;
  fileSizeBytes: number;
  fileSizeLabel: string;
  totalPages: number;
  pdfVersion: string | null;
  isEncrypted: boolean;
}

export interface ConvertedPage {
  pageNumber: number;
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
  sizeLabel: string;
  transparent: boolean;
}

export interface ConversionOptions {
  scale: ResolutionScale;
  renderQuality: RenderQuality;
  /** When true, the canvas is left transparent instead of filled white. */
  transparentBackground: boolean;
  format?: "image/png";
}

export interface ConversionProgress {
  currentPage: number;
  totalPages: number;
  percent: number;
  stage: "rendering" | "encoding" | "done";
}

export type ProgressCallback = (progress: ConversionProgress) => void;

export class PdfToPngError extends Error {
  code:
    | "INVALID_FILE"
    | "NOT_A_PDF"
    | "ENCRYPTED_PDF"
    | "EMPTY_SELECTION"
    | "TOO_MANY_PAGES"
    | "FILE_TOO_LARGE"
    | "MEMORY_ERROR"
    | "CONVERSION_FAILED"
    | "PARSE_RANGE_FAILED"
    | "LOAD_FAILED";

  constructor(message: string, code: PdfToPngError["code"]) {
    super(message);
    this.name = "PdfToPngError";
    this.code = code;
  }
}

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
export const MAX_PAGE_COUNT = 500;

const IMAGE_SMOOTHING_QUALITY: Record<RenderQuality, ImageSmoothingQuality> =
  {
    draft: "low",
    standard: "medium",
    high: "high",
  };

// ------------------------------------------------------------------
// Validation
// ------------------------------------------------------------------

export function validatePdfFile(file: File | null | undefined): void {
  if (!file) {
    throw new PdfToPngError("No file was provided.", "INVALID_FILE");
  }

  const looksLikePdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!looksLikePdf) {
    throw new PdfToPngError(
      "The selected file is not a PDF document.",
      "NOT_A_PDF"
    );
  }

  if (file.size === 0) {
    throw new PdfToPngError("The selected PDF is empty.", "INVALID_FILE");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new PdfToPngError(
      `This PDF is larger than ${formatFileSize(
        MAX_FILE_SIZE_BYTES
      )}. Please use a smaller file.`,
      "FILE_TOO_LARGE"
    );
  }
}

// ------------------------------------------------------------------
// Loading
// ------------------------------------------------------------------

export async function loadPdfDocument(
  file: File
): Promise<{ pdf: PDFDocumentProxy; arrayBuffer: ArrayBuffer }> {
  validatePdfFile(file);

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new PdfToPngError(
      "Could not read the selected file.",
      "LOAD_FAILED"
    );
  }

  const bufferForLoading = arrayBuffer.slice(0);

  try {
    const loadingTask = pdfjsLib.getDocument({ data: bufferForLoading });
    const pdf = await loadingTask.promise;

    if (pdf.numPages > MAX_PAGE_COUNT) {
      throw new PdfToPngError(
        `This PDF has ${pdf.numPages} pages, which exceeds the ${MAX_PAGE_COUNT}-page limit for browser-based conversion.`,
        "TOO_MANY_PAGES"
      );
    }

    return { pdf, arrayBuffer };
  } catch (err) {
    if (err instanceof PdfToPngError) throw err;

    const message = err instanceof Error ? err.message : String(err);

    if (/password/i.test(message)) {
      throw new PdfToPngError(
        "This PDF is password-protected. Please remove the password before converting.",
        "ENCRYPTED_PDF"
      );
    }

    if (/memory|allocation/i.test(message)) {
      throw new PdfToPngError(
        "This PDF is too large or complex to process in your browser's available memory.",
        "MEMORY_ERROR"
      );
    }

    throw new PdfToPngError(
      "This file could not be read as a valid PDF. It may be corrupted.",
      "LOAD_FAILED"
    );
  }
}

export async function getPdfMetaInfo(
  file: File,
  pdf: PDFDocumentProxy
): Promise<PdfMetaInfo> {
  let pdfVersion: string | null = null;
  let isEncrypted = false;

  try {
    const meta = await pdf.getMetadata();
    const info = meta?.info as Record<string, unknown> | undefined;
    if (info && typeof info["PDFFormatVersion"] === "string") {
      pdfVersion = info["PDFFormatVersion"] as string;
    }
    if (info && "IsEncrypted" in info) {
      isEncrypted = Boolean(info["IsEncrypted"]);
    }
  } catch {
    // Metadata is optional; ignore failures.
  }

  return {
    fileName: file.name,
    fileSizeBytes: file.size,
    fileSizeLabel: formatFileSize(file.size),
    totalPages: pdf.numPages,
    pdfVersion,
    isEncrypted,
  };
}

// ------------------------------------------------------------------
// Page range parsing ("1-5", "2,4,8", "1-3,7,10-12")
// ------------------------------------------------------------------

export function parsePageRangeString(
  input: string,
  totalPages: number
): number[] {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new PdfToPngError(
      "Please enter at least one page or range.",
      "PARSE_RANGE_FAILED"
    );
  }

  const pages = new Set<number>();
  const segments = trimmed.split(",").map((s) => s.trim()).filter(Boolean);

  for (const segment of segments) {
    const rangeMatch = segment.match(/^(\d+)\s*-\s*(\d+)$/);
    const singleMatch = segment.match(/^(\d+)$/);

    if (rangeMatch) {
      let start = parseInt(rangeMatch[1], 10);
      let end = parseInt(rangeMatch[2], 10);
      if (start > end) [start, end] = [end, start];
      for (let p = start; p <= end; p++) {
        if (p >= 1 && p <= totalPages) pages.add(p);
      }
    } else if (singleMatch) {
      const p = parseInt(singleMatch[1], 10);
      if (p >= 1 && p <= totalPages) pages.add(p);
    } else {
      throw new PdfToPngError(
        `"${segment}" is not a valid page or range.`,
        "PARSE_RANGE_FAILED"
      );
    }
  }

  if (pages.size === 0) {
    throw new PdfToPngError(
      "No valid pages were found in that selection.",
      "EMPTY_SELECTION"
    );
  }

  return Array.from(pages).sort((a, b) => a - b);
}

// ------------------------------------------------------------------
// Rendering / conversion
// ------------------------------------------------------------------

async function renderPageToCanvas(
  pdf: PDFDocumentProxy,
  pageNumber: number,
  scale: ResolutionScale,
  renderQuality: RenderQuality,
  transparentBackground: boolean
): Promise<HTMLCanvasElement> {
  const page: PDFPageProxy = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  const context = canvas.getContext("2d", {
    alpha: transparentBackground,
  });

  if (!context) {
    throw new PdfToPngError(
      "Your browser does not support canvas rendering.",
      "CONVERSION_FAILED"
    );
  }

  context.imageSmoothingEnabled = renderQuality !== "draft";
  context.imageSmoothingQuality = IMAGE_SMOOTHING_QUALITY[renderQuality];

  if (!transparentBackground) {
    // PNG has no forced background, so we paint white ourselves to match
    // how the page would normally be viewed/printed.
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  try {
    await page.render({ canvasContext: context, viewport }).promise;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/memory|allocation/i.test(message)) {
      throw new PdfToPngError(
        "Ran out of memory while rendering this page. Try a lower resolution scale.",
        "MEMORY_ERROR"
      );
    }
    throw err;
  } finally {
    page.cleanup();
  }

  return canvas;
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else
        reject(
          new PdfToPngError("Failed to encode image.", "CONVERSION_FAILED")
        );
    }, "image/png");
  });
}

export async function convertSinglePage(
  pdf: PDFDocumentProxy,
  pageNumber: number,
  options: ConversionOptions
): Promise<ConvertedPage> {
  try {
    const canvas = await renderPageToCanvas(
      pdf,
      pageNumber,
      options.scale,
      options.renderQuality,
      options.transparentBackground
    );
    const blob = await canvasToPngBlob(canvas);
    const objectUrl = URL.createObjectURL(blob);

    return {
      pageNumber,
      blob,
      objectUrl,
      width: canvas.width,
      height: canvas.height,
      sizeBytes: blob.size,
      sizeLabel: formatFileSize(blob.size),
      transparent: options.transparentBackground,
    };
  } catch (err) {
    if (err instanceof PdfToPngError) throw err;
    throw new PdfToPngError(
      `Failed to convert page ${pageNumber}.`,
      "CONVERSION_FAILED"
    );
  }
}

export async function convertPdfPages(
  pdf: PDFDocumentProxy,
  pageNumbers: number[],
  options: ConversionOptions,
  onProgress?: ProgressCallback
): Promise<ConvertedPage[]> {
  if (!pageNumbers || pageNumbers.length === 0) {
    throw new PdfToPngError(
      "Select at least one page to convert.",
      "EMPTY_SELECTION"
    );
  }

  const results: ConvertedPage[] = [];
  const total = pageNumbers.length;

  for (let i = 0; i < total; i++) {
    const pageNumber = pageNumbers[i];

    onProgress?.({
      currentPage: i + 1,
      totalPages: total,
      percent: Math.round(((i + 0.5) / total) * 100),
      stage: "rendering",
    });

    const converted = await convertSinglePage(pdf, pageNumber, options);
    results.push(converted);

    onProgress?.({
      currentPage: i + 1,
      totalPages: total,
      percent: Math.round(((i + 1) / total) * 100),
      stage: i + 1 === total ? "done" : "encoding",
    });
  }

  return results;
}

// ------------------------------------------------------------------
// Downloads
// ------------------------------------------------------------------

function safeBaseName(fileName: string): string {
  return (
    fileName.replace(/\.pdf$/i, "").replace(/[^a-z0-9\-_]+/gi, "_") ||
    "document"
  );
}

export function downloadSingleImage(
  page: ConvertedPage,
  baseFileName: string
): void {
  const name = `${safeBaseName(baseFileName)}-page-${String(
    page.pageNumber
  ).padStart(3, "0")}.png`;
  saveAs(page.blob, name);
}

export async function downloadPagesAsZip(
  pages: ConvertedPage[],
  baseFileName: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  if (pages.length === 0) {
    throw new PdfToPngError(
      "There are no converted images to download.",
      "EMPTY_SELECTION"
    );
  }

  const zip = new JSZip();
  const base = safeBaseName(baseFileName);

  pages.forEach((page) => {
    const name = `${base}-page-${String(page.pageNumber).padStart(
      3,
      "0"
    )}.png`;
    zip.file(name, page.blob);
  });

  const zipBlob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (metadata) => {
      onProgress?.(Math.round(metadata.percent));
    }
  );

  saveAs(zipBlob, `${base}-png-images.zip`);
}

// ------------------------------------------------------------------
// Cleanup
// ------------------------------------------------------------------

export function revokeConvertedPages(pages: ConvertedPage[]): void {
  for (const page of pages) {
    try {
      URL.revokeObjectURL(page.objectUrl);
    } catch {
      // no-op: URL may already be revoked
    }
  }
}

// ------------------------------------------------------------------
// Formatting helpers
// ------------------------------------------------------------------

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

/**
 * Rough estimate of total output size before conversion. PNG is lossless
 * and compresses less predictably than JPEG, so estimates lean generous —
 * actual size depends heavily on how much visual detail is on the page.
 */
export function estimateOutputSize(
  pageCount: number,
  scale: ResolutionScale,
  renderQuality: RenderQuality,
  transparentBackground: boolean
): number {
  const baseBytesPerPage = 420 * 1024; // PNG is larger than JPEG on average
  const scaleFactor = scale * scale;
  const qualityFactor =
    renderQuality === "draft" ? 0.8 : renderQuality === "standard" ? 1 : 1.2;
  const transparencyFactor = transparentBackground ? 1.1 : 1;
  return Math.round(
    pageCount *
      baseBytesPerPage *
      scaleFactor *
      qualityFactor *
      transparencyFactor
  );
}