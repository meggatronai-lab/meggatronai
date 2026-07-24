/**
 * lib/pdf/pdfToJpg.ts
 *
 * Fully browser-based PDF -> JPG conversion engine for MeggatronAI.
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
// pdfjs-dist requires a worker script. We point it at the version-matched
// worker shipped inside the package so nothing is fetched from a server
// we don't control. Next.js will bundle this as a static asset.
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

// ------------------------------------------------------------------
// Types & Interfaces
// ------------------------------------------------------------------

export type ImageQualityPreset = "low" | "medium" | "high" | "maximum";

export type ResolutionScale = 1 | 2 | 3;

export interface QualitySettings {
  /** JPEG quality, 0.5 - 1.0 (matches the 50-100% UI slider) */
  quality: number;
  /** Render scale multiplier applied to the PDF page viewport */
  scale: ResolutionScale;
}

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
}

export interface ConversionOptions {
  quality: number; // 0.5 - 1.0
  scale: ResolutionScale;
  format?: "image/jpeg";
}

export interface ConversionProgress {
  currentPage: number;
  totalPages: number;
  percent: number;
  stage: "rendering" | "encoding" | "done";
}

export type ProgressCallback = (progress: ConversionProgress) => void;

export class PdfToJpgError extends Error {
  code:
    | "INVALID_FILE"
    | "NOT_A_PDF"
    | "ENCRYPTED_PDF"
    | "EMPTY_SELECTION"
    | "TOO_MANY_PAGES"
    | "FILE_TOO_LARGE"
    | "CONVERSION_FAILED"
    | "PARSE_RANGE_FAILED"
    | "LOAD_FAILED";

  constructor(
    message: string,
    code: PdfToJpgError["code"]
  ) {
    super(message);
    this.name = "PdfToJpgError";
    this.code = code;
  }
}

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
export const MAX_PAGE_COUNT = 500;

export const QUALITY_PRESETS: Record<ImageQualityPreset, number> = {
  low: 0.5,
  medium: 0.7,
  high: 0.85,
  maximum: 1.0,
};

// ------------------------------------------------------------------
// Validation
// ------------------------------------------------------------------

/**
 * Validates that a File is a usable, non-encrypted, reasonably-sized PDF.
 * Throws a PdfToJpgError with a specific `code` on failure.
 */
export function validatePdfFile(file: File | null | undefined): void {
  if (!file) {
    throw new PdfToJpgError("No file was provided.", "INVALID_FILE");
  }

  const looksLikePdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!looksLikePdf) {
    throw new PdfToJpgError(
      "The selected file is not a PDF document.",
      "NOT_A_PDF"
    );
  }

  if (file.size === 0) {
    throw new PdfToJpgError("The selected PDF is empty.", "INVALID_FILE");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new PdfToJpgError(
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

/**
 * Reads a File into an ArrayBuffer and loads it with pdfjs-dist.
 * Detects encrypted/password-protected PDFs and throws accordingly.
 */
export async function loadPdfDocument(
  file: File
): Promise<{ pdf: PDFDocumentProxy; arrayBuffer: ArrayBuffer }> {
  validatePdfFile(file);

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new PdfToJpgError(
      "Could not read the selected file.",
      "LOAD_FAILED"
    );
  }

  // pdfjs detaches/transfers the buffer, so keep a copy for metadata use.
  const bufferForLoading = arrayBuffer.slice(0);

  try {
    const loadingTask = pdfjsLib.getDocument({ data: bufferForLoading });
    const pdf = await loadingTask.promise;

    if (pdf.numPages > MAX_PAGE_COUNT) {
      throw new PdfToJpgError(
        `This PDF has ${pdf.numPages} pages, which exceeds the ${MAX_PAGE_COUNT}-page limit for browser-based conversion.`,
        "TOO_MANY_PAGES"
      );
    }

    return { pdf, arrayBuffer };
  } catch (err) {
    if (err instanceof PdfToJpgError) throw err;

    const message = err instanceof Error ? err.message : String(err);

    if (/password/i.test(message)) {
      throw new PdfToJpgError(
        "This PDF is password-protected. Please remove the password before converting.",
        "ENCRYPTED_PDF"
      );
    }

    throw new PdfToJpgError(
      "This file could not be read as a valid PDF. It may be corrupted.",
      "LOAD_FAILED"
    );
  }
}

/**
 * Extracts human-friendly metadata about a loaded PDF for the info panel.
 */
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

/**
 * Parses a page-range string like "1-5,2,4,8" into a sorted, de-duplicated
 * array of valid page numbers bounded by totalPages.
 */
export function parsePageRangeString(
  input: string,
  totalPages: number
): number[] {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new PdfToJpgError(
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
      throw new PdfToJpgError(
        `"${segment}" is not a valid page or range.`,
        "PARSE_RANGE_FAILED"
      );
    }
  }

  if (pages.size === 0) {
    throw new PdfToJpgError(
      "No valid pages were found in that selection.",
      "EMPTY_SELECTION"
    );
  }

  return Array.from(pages).sort((a, b) => a - b);
}

// ------------------------------------------------------------------
// Rendering / conversion
// ------------------------------------------------------------------

/**
 * Renders a single PDF page to a canvas at the given scale.
 */
async function renderPageToCanvas(
  pdf: PDFDocumentProxy,
  pageNumber: number,
  scale: ResolutionScale
): Promise<HTMLCanvasElement> {
  const page: PDFPageProxy = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new PdfToJpgError(
      "Your browser does not support canvas rendering.",
      "CONVERSION_FAILED"
    );
  }

  // JPG has no transparency, paint a white background first.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport }).promise;
  page.cleanup();

  return canvas;
}

/**
 * Converts a canvas to a JPEG Blob at the requested quality (0.5 - 1.0).
 */
function canvasToJpegBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new PdfToJpgError("Failed to encode image.", "CONVERSION_FAILED"));
      },
      "image/jpeg",
      quality
    );
  });
}

/**
 * Converts a single PDF page into a ConvertedPage (JPEG blob + object URL).
 */
export async function convertSinglePage(
  pdf: PDFDocumentProxy,
  pageNumber: number,
  options: ConversionOptions
): Promise<ConvertedPage> {
  try {
    const canvas = await renderPageToCanvas(pdf, pageNumber, options.scale);
    const blob = await canvasToJpegBlob(canvas, options.quality);
    const objectUrl = URL.createObjectURL(blob);

    return {
      pageNumber,
      blob,
      objectUrl,
      width: canvas.width,
      height: canvas.height,
      sizeBytes: blob.size,
      sizeLabel: formatFileSize(blob.size),
    };
  } catch (err) {
    if (err instanceof PdfToJpgError) throw err;
    throw new PdfToJpgError(
      `Failed to convert page ${pageNumber}.`,
      "CONVERSION_FAILED"
    );
  }
}

/**
 * Converts multiple pages sequentially, reporting progress after each page.
 * Sequential (rather than parallel) rendering keeps memory bounded, which
 * matters a lot for large / high-page-count PDFs in the browser.
 */
export async function convertPdfPages(
  pdf: PDFDocumentProxy,
  pageNumbers: number[],
  options: ConversionOptions,
  onProgress?: ProgressCallback
): Promise<ConvertedPage[]> {
  if (!pageNumbers || pageNumbers.length === 0) {
    throw new PdfToJpgError(
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
  return fileName.replace(/\.pdf$/i, "").replace(/[^a-z0-9\-_]+/gi, "_") || "document";
}

/**
 * Triggers a browser download for a single converted page.
 */
export function downloadSingleImage(
  page: ConvertedPage,
  baseFileName: string
): void {
  const name = `${safeBaseName(baseFileName)}-page-${String(
    page.pageNumber
  ).padStart(3, "0")}.jpg`;
  saveAs(page.blob, name);
}

/**
 * Bundles multiple converted pages into a ZIP and triggers a download.
 */
export async function downloadPagesAsZip(
  pages: ConvertedPage[],
  baseFileName: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  if (pages.length === 0) {
    throw new PdfToJpgError(
      "There are no converted images to download.",
      "EMPTY_SELECTION"
    );
  }

  const zip = new JSZip();
  const base = safeBaseName(baseFileName);

  pages.forEach((page) => {
    const name = `${base}-page-${String(page.pageNumber).padStart(3, "0")}.jpg`;
    zip.file(name, page.blob);
  });

  const zipBlob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (metadata) => {
      onProgress?.(Math.round(metadata.percent));
    }
  );

  saveAs(zipBlob, `${base}-jpg-images.zip`);
}

// ------------------------------------------------------------------
// Cleanup
// ------------------------------------------------------------------

/**
 * Revokes object URLs for a set of converted pages to avoid memory leaks.
 * Always call this when replacing or discarding a ConvertedPage[] batch.
 */
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
 * Rough estimate of total output size before conversion, based on page
 * count, chosen scale, and quality. Used to populate the "Estimated Size"
 * statistic before the user hits Convert.
 */
export function estimateOutputSize(
  pageCount: number,
  scale: ResolutionScale,
  quality: number
): number {
  // Baseline: ~180KB per page at 1x scale, 0.7 quality, for a typical
  // text+image PDF page. Scales roughly with pixel area and quality.
  const baseBytesPerPage = 180 * 1024;
  const scaleFactor = scale * scale; // pixel area grows with scale^2
  const qualityFactor = 0.4 + quality * 0.9;
  return Math.round(pageCount * baseBytesPerPage * scaleFactor * qualityFactor);
}

export function qualityPresetFromValue(value: number): ImageQualityPreset {
  if (value <= 0.55) return "low";
  if (value <= 0.75) return "medium";
  if (value <= 0.9) return "high";
  return "maximum";
}