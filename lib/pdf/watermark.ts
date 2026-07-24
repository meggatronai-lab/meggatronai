import { PDFDocument, StandardFonts, rgb, degrees, type PDFFont, type PDFImage } from "pdf-lib";

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface TextWatermarkOptions {
  /** The text to stamp onto every page. */
  text: string;
  /** Hex color, e.g. "#22D3EE". */
  color: string;
  /** Font size in points. */
  fontSize: number;
  /** 0–1 opacity. */
  opacity: number;
  /** Rotation in degrees, counter-clockwise. */
  rotation: number;
  /** Where on the page the watermark is anchored. */
  position: WatermarkPosition;
  /** Distance in points from the page edge. Defaults to 36 (0.5in). */
  margin?: number;
}

export interface ImageWatermarkOptions {
  /** 0–1 opacity. */
  opacity: number;
  /** Rotation in degrees, counter-clockwise. */
  rotation: number;
  /** Where on the page the watermark is anchored. */
  position: WatermarkPosition;
  /** Distance in points from the page edge. Defaults to 36 (0.5in). */
  margin?: number;
  /** Target rendered width in points. Height is scaled to preserve aspect ratio. Defaults to 140. */
  width?: number;
}

/* -------------------------------------------------------------------------- */
/*  Internal helpers                                                         */
/* -------------------------------------------------------------------------- */

const DEFAULT_MARGIN = 36;
const DEFAULT_IMAGE_WIDTH = 140;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function hexToRgbUnit(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.trim().replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const intVal = parseInt(full, 16);
  if (full.length !== 6 || Number.isNaN(intVal)) {
    // Fall back to a neutral gray if an invalid hex value slips through.
    return { r: 0.5, g: 0.5, b: 0.5 };
  }

  return {
    r: ((intVal >> 16) & 255) / 255,
    g: ((intVal >> 8) & 255) / 255,
    b: (intVal & 255) / 255,
  };
}

/**
 * Resolves the bottom-left anchor point pdf-lib expects, given the page
 * dimensions, the unrotated bounding box of the content being drawn, and
 * which of the nine grid positions it should sit in.
 */
function resolveAnchor(
  position: WatermarkPosition,
  pageWidth: number,
  pageHeight: number,
  contentWidth: number,
  contentHeight: number,
  margin: number
): { x: number; y: number } {
  const left = margin;
  const right = pageWidth - margin - contentWidth;
  const centerX = (pageWidth - contentWidth) / 2;

  const bottom = margin;
  const top = pageHeight - margin - contentHeight;
  const centerY = (pageHeight - contentHeight) / 2;

  const map: Record<WatermarkPosition, { x: number; y: number }> = {
    "top-left": { x: left, y: top },
    "top-center": { x: centerX, y: top },
    "top-right": { x: right, y: top },
    "center-left": { x: left, y: centerY },
    center: { x: centerX, y: centerY },
    "center-right": { x: right, y: centerY },
    "bottom-left": { x: left, y: bottom },
    "bottom-center": { x: centerX, y: bottom },
    "bottom-right": { x: right, y: bottom },
  };

  return map[position];
}

async function loadPdf(pdfFile: File): Promise<PDFDocument> {
  const bytes = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);

  if (pdfDoc.getPageCount() === 0) {
    throw new Error("This PDF has no pages to watermark.");
  }

  return pdfDoc;
}

async function toBlob(pdfDoc: PDFDocument): Promise<Blob> {
  const bytes = await pdfDoc.save();
  // pdf-lib returns a Uint8Array typed against ArrayBufferLike, which newer
  // TS DOM libs won't structurally accept as a BlobPart. Slicing to a fresh
  // ArrayBuffer sidesteps the mismatch without an `any` cast.
  const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new Blob([arrayBuffer], { type: "application/pdf" });
}

function drawTextOnPage(
  page: ReturnType<PDFDocument["getPages"]>[number],
  font: PDFFont,
  options: Required<Pick<TextWatermarkOptions, "text" | "fontSize" | "rotation" | "position">> & {
    color: { r: number; g: number; b: number };
    opacity: number;
    margin: number;
  }
) {
  const { width, height } = page.getSize();
  const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);
  // Approximate the glyph bounding box height from the font size; good
  // enough for anchoring a watermark without needing per-glyph metrics.
  const textHeight = options.fontSize;

  const { x, y } = resolveAnchor(options.position, width, height, textWidth, textHeight, options.margin);

  page.drawText(options.text, {
    x,
    y,
    size: options.fontSize,
    font,
    color: rgb(options.color.r, options.color.g, options.color.b),
    opacity: options.opacity,
    rotate: degrees(options.rotation),
  });
}

function drawImageOnPage(
  page: ReturnType<PDFDocument["getPages"]>[number],
  image: PDFImage,
  dims: { width: number; height: number },
  options: { rotation: number; position: WatermarkPosition; opacity: number; margin: number }
) {
  const { width, height } = page.getSize();
  const { x, y } = resolveAnchor(options.position, width, height, dims.width, dims.height, options.margin);

  page.drawImage(image, {
    x,
    y,
    width: dims.width,
    height: dims.height,
    opacity: options.opacity,
    rotate: degrees(options.rotation),
  });
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Stamps a text watermark onto every page of the given PDF and returns the
 * resulting file as a Blob.
 */
export async function addTextWatermark(pdfFile: File, options: TextWatermarkOptions): Promise<Blob> {
  const text = options.text.trim();
  if (!text) {
    throw new Error("Watermark text cannot be empty.");
  }

  const pdfDoc = await loadPdf(pdfFile);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const color = hexToRgbUnit(options.color);
  const margin = options.margin ?? DEFAULT_MARGIN;

  for (const page of pdfDoc.getPages()) {
    drawTextOnPage(page, font, {
      text,
      fontSize: options.fontSize,
      rotation: options.rotation,
      position: options.position,
      color,
      opacity: clamp01(options.opacity),
      margin,
    });
  }

  return toBlob(pdfDoc);
}

/**
 * Stamps an image watermark onto every page of the given PDF and returns the
 * resulting file as a Blob. Supports PNG (including transparency) and JPEG.
 */
export async function addImageWatermark(
  pdfFile: File,
  imageFile: File,
  options: ImageWatermarkOptions
): Promise<Blob> {
  const pdfDoc = await loadPdf(pdfFile);
  const imageBytes = await imageFile.arrayBuffer();

  const isPng = imageFile.type === "image/png" || imageFile.name.toLowerCase().endsWith(".png");
  const isJpg =
    imageFile.type === "image/jpeg" ||
    imageFile.name.toLowerCase().endsWith(".jpg") ||
    imageFile.name.toLowerCase().endsWith(".jpeg");

  if (!isPng && !isJpg) {
    throw new Error("Watermark image must be a PNG or JPG file.");
  }

  const image = isPng ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);

  const targetWidth = options.width ?? DEFAULT_IMAGE_WIDTH;
  const scaleFactor = targetWidth / image.width;
  const dims = image.scale(scaleFactor);
  const margin = options.margin ?? DEFAULT_MARGIN;

  for (const page of pdfDoc.getPages()) {
    drawImageOnPage(page, image, dims, {
      rotation: options.rotation,
      position: options.position,
      opacity: clamp01(options.opacity),
      margin,
    });
  }

  return toBlob(pdfDoc);
}