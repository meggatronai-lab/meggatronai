import { PDFDocument, PDFName, PDFDict, PDFRawStream, decodePDFRawStream } from "pdf-lib";
import { saveAs } from "file-saver";

/**
 * ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------
 */

export type CompressionLevel = "low" | "balanced" | "high";

export interface CompressionOptions {
  compressionLevel: CompressionLevel;
  imageQuality: number; // 10-100
  removeMetadata: boolean;
  optimizeObjects: boolean;
}

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  bytesSaved: number;
  percentSaved: number;
  pageCount: number;
  imagesOptimized: number;
}

export interface PdfPreviewInfo {
  fileName: string;
  fileSize: number;
  pageCount: number;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * ------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------
 */

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

const LEVEL_ESTIMATE_MULTIPLIER: Record<CompressionLevel, number> = {
  low: 0.85,
  balanced: 0.65,
  high: 0.45,
};

const LEVEL_DEFAULT_QUALITY: Record<CompressionLevel, number> = {
  low: 90,
  balanced: 70,
  high: 45,
};

const LEVEL_IMAGE_SCALE: Record<CompressionLevel, number> = {
  low: 1,
  balanced: 0.85,
  high: 0.65,
};

/**
 * ------------------------------------------------------------------
 * Uint8Array -> BlobPart helper
 *
 * `decodePDFRawStream(...).decode()` and `pdfDoc.save()` both return
 * `Uint8Array<ArrayBufferLike>`. Depending on the TypeScript/@types
 * versions in a project, the DOM lib's `BlobPart` type expects
 * `Uint8Array<ArrayBuffer>` specifically, which can make
 * `new Blob([bytes])` fail to type-check even though it works
 * perfectly at runtime. Routing every conversion through this one
 * helper keeps the cast contained to a single, obviously-safe spot.
 * ------------------------------------------------------------------
 */

function toBlobPart(bytes: Uint8Array): BlobPart {
  return bytes as unknown as BlobPart;
}

/**
 * ------------------------------------------------------------------
 * Validation helpers
 * ------------------------------------------------------------------
 */

export function validatePdfFile(file: File): FileValidationResult {
  const isPdfMime = file.type === "application/pdf";
  const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");

  if (!isPdfMime && !isPdfExtension) {
    return { valid: false, error: "Please upload a valid PDF file." };
  }

  if (file.size === 0) {
    return { valid: false, error: "The selected file appears to be empty." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "File is too large. Maximum supported size is 50MB.",
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, exponent);
  return `${parseFloat(value.toFixed(2))} ${units[exponent]}`;
}

/**
 * ------------------------------------------------------------------
 * Preview / estimation helpers (run before the user commits to a
 * full compression pass)
 * ------------------------------------------------------------------
 */

export async function getPdfPreviewInfo(file: File): Promise<PdfPreviewInfo> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  return {
    fileName: file.name,
    fileSize: file.size,
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Rough, non-binding estimate shown to the user before compression
 * actually runs. Real results vary based on how much of the file is
 * made up of re-encodable JPEG images versus text/vector content.
 */
export function estimateCompressedSize(
  originalSize: number,
  level: CompressionLevel
): number {
  return Math.max(1, Math.round(originalSize * LEVEL_ESTIMATE_MULTIPLIER[level]));
}

export function getDefaultImageQuality(level: CompressionLevel): number {
  return LEVEL_DEFAULT_QUALITY[level];
}

/**
 * ------------------------------------------------------------------
 * Low-level stream dictionary access
 *
 * pdf-lib's TypeScript typings do not expose a public getter for the
 * dictionary that lives on a PDFStream, even though the field exists
 * at runtime. This narrow cast is confined to this one helper, and
 * ONLY reaches into the stream's own dict (never `page.node.dict`,
 * which is not public and will throw/compile-error if accessed).
 * ------------------------------------------------------------------
 */

function getStreamDict(stream: PDFRawStream): PDFDict {
  return (stream as unknown as { dict: PDFDict }).dict;
}

/**
 * ------------------------------------------------------------------
 * JPEG re-encoding via the Canvas API
 * ------------------------------------------------------------------
 */

async function reencodeJpeg(
  bytes: Uint8Array,
  quality: number,
  scale: number
): Promise<Uint8Array | null> {
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
    return null;
  }

  let bitmap: ImageBitmap;
  try {
    const sourceBlob = new Blob([toBlobPart(bytes)], { type: "image/jpeg" });
    bitmap = await createImageBitmap(sourceBlob);
  } catch {
    return null;
  }

  const targetWidth = Math.max(1, Math.round(bitmap.width * scale));
  const targetHeight = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return null;
  }

  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  bitmap.close();

  const outputBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), "image/jpeg", quality);
  });

  if (!outputBlob) return null;

  const arrayBuffer = await outputBlob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

/**
 * Walks every page's XObject resources, finds embedded JPEG images
 * (Filter = DCTDecode), and replaces them with a re-encoded, lower
 * quality/resolution version. Non-JPEG images (e.g. PNG using
 * FlateDecode) are left untouched - re-encoding those losslessly to
 * a smaller lossy form requires a bitmap decoder pdf-lib does not
 * provide, so this is a known, intentional limitation.
 *
 * NOTE: `page.node.get(...)` used below IS a public pdf-lib method
 * (PDFPageLeaf extends PDFDict, which exposes `.get`). This is
 * different from the invalid `page.node.dict.get(...)` pattern,
 * which reaches for a private field that TypeScript will reject.
 */
async function recompressImages(
  pdfDoc: PDFDocument,
  quality: number,
  scale: number
): Promise<number> {
  let recompressedCount = 0;
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const resourcesRef = page.node.get(PDFName.of("Resources"));
    if (!resourcesRef) continue;

    const resources = pdfDoc.context.lookup(resourcesRef);
    if (!(resources instanceof PDFDict)) continue;

    const xObjectRef = resources.get(PDFName.of("XObject"));
    if (!xObjectRef) continue;

    const xObjects = pdfDoc.context.lookup(xObjectRef);
    if (!(xObjects instanceof PDFDict)) continue;

    for (const key of xObjects.keys()) {
      const entry = xObjects.get(key);
      if (!entry) continue;

      const stream = pdfDoc.context.lookup(entry);
      if (!(stream instanceof PDFRawStream)) continue;

      const streamDict = getStreamDict(stream);

      const subtype = streamDict.lookup(PDFName.of("Subtype"));
      if (!subtype || subtype.toString() !== "/Image") continue;

      const filter = streamDict.lookup(PDFName.of("Filter"));
      const isJpeg = filter instanceof PDFName && filter.toString() === "/DCTDecode";
      if (!isJpeg) continue;

      try {
        const rawBytes = decodePDFRawStream(stream).decode();
        const newBytes = await reencodeJpeg(rawBytes, quality, scale);

        if (newBytes && newBytes.byteLength > 0 && newBytes.byteLength < rawBytes.byteLength) {
          const embeddedImage = await pdfDoc.embedJpg(newBytes);
          xObjects.set(key, embeddedImage.ref);
          recompressedCount++;
        }
      } catch {
        // Skip images that fail to decode or re-encode (unsupported
        // color space, corrupt stream, etc.) and leave them as-is.
      }
    }
  }

  return recompressedCount;
}

/**
 * ------------------------------------------------------------------
 * Public API
 * ------------------------------------------------------------------
 */

export async function compressPdf(
  file: File,
  options: CompressionOptions
): Promise<CompressionResult> {
  const originalSize = file.size;
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  if (options.removeMetadata) {
    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");
  }

  const quality = Math.min(1, Math.max(0.1, options.imageQuality / 100));
  const scale = LEVEL_IMAGE_SCALE[options.compressionLevel];

  const imagesOptimized = await recompressImages(pdfDoc, quality, scale);

  const bytes = await optimizePdf(pdfDoc, options.optimizeObjects);

  const blob = new Blob([toBlobPart(bytes)], { type: "application/pdf" });
  const compressedSize = bytes.byteLength;
  const bytesSaved = Math.max(0, originalSize - compressedSize);
  const percentSaved = originalSize > 0 ? (bytesSaved / originalSize) * 100 : 0;

  return {
    blob,
    originalSize,
    compressedSize,
    bytesSaved,
    percentSaved,
    pageCount: pdfDoc.getPageCount(),
    imagesOptimized,
  };
}

/**
 * Serializes a PDFDocument to bytes, optionally reorganizing its
 * internal object structure (object streams) to reduce overhead.
 * Split out from compressPdf() so it can also be used on its own -
 * e.g. to shrink a PDF that has no re-encodable images at all.
 */
export async function optimizePdf(
  pdfDoc: PDFDocument,
  useObjectStreams = true
): Promise<Uint8Array> {
  return pdfDoc.save({
    useObjectStreams,
    addDefaultPage: false,
  });
}

export function downloadCompressedPdf(blob: Blob, fileName: string): void {
  const safeName = fileName.trim().length > 0 ? fileName.trim() : "compressed-document";
  const finalName = safeName.toLowerCase().endsWith(".pdf") ? safeName : `${safeName}.pdf`;
  saveAs(blob, finalName);
}