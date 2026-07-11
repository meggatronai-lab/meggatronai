/**
 * lib/pdf/split.ts
 *
 * PDF splitting helpers. All functions use dynamic import("pdf-lib")
 * so the module compiles even before pdf-lib is installed, and
 * Next.js/Turbopack never errors on a missing static import.
 *
 * Install: npm install pdf-lib
 */

/**
 * Splits every page into individual single-page PDFs.
 * Returns one Uint8Array per page.
 */
export async function splitEveryPage(
  pdfBytes: ArrayBuffer
): Promise<Uint8Array[]> {
  const { PDFDocument } = await import("pdf-lib");
  const srcDoc = await PDFDocument.load(pdfBytes);
  const pageCount = srcDoc.getPageCount();
  const results: Uint8Array[] = [];

  for (let i = 0; i < pageCount; i++) {
    const newDoc = await PDFDocument.create();
    const [copied] = await newDoc.copyPages(srcDoc, [i]);
    newDoc.addPage(copied);
    results.push(await newDoc.save());
  }

  return results;
}

/**
 * Extracts pages startPage–endPage (1-based, inclusive) into one PDF.
 */
export async function splitRange(
  pdfBytes: ArrayBuffer,
  startPage: number,
  endPage: number
): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const srcDoc = await PDFDocument.load(pdfBytes);
  const pageCount = srcDoc.getPageCount();

  const start = Math.max(1, startPage);
  const end = Math.min(pageCount, endPage);

  if (start > end) {
    throw new Error(
      `Invalid page range: ${start}–${end} (document has ${pageCount} pages).`
    );
  }

  const indices = Array.from(
    { length: end - start + 1 },
    (_, i) => start - 1 + i
  );
  const newDoc = await PDFDocument.create();
  const copied = await newDoc.copyPages(srcDoc, indices);
  copied.forEach((p) => newDoc.addPage(p));

  return newDoc.save();
}

/**
 * Extracts specific pages (1-based, duplicates removed, sorted) into one PDF.
 */
export async function splitSpecificPages(
  pdfBytes: ArrayBuffer,
  pages: number[]
): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const srcDoc = await PDFDocument.load(pdfBytes);
  const pageCount = srcDoc.getPageCount();

  const unique = [...new Set(pages)]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  if (unique.length === 0) {
    throw new Error("No valid pages specified.");
  }

  const indices = unique.map((p) => p - 1);
  const newDoc = await PDFDocument.create();
  const copied = await newDoc.copyPages(srcDoc, indices);
  copied.forEach((p) => newDoc.addPage(p));

  return newDoc.save();
}

/**
 * Splits a PDF into N equal-sized chunks. Returns one Uint8Array per chunk.
 */
export async function splitIntoParts(
  pdfBytes: ArrayBuffer,
  parts: number
): Promise<Uint8Array[]> {
  const { PDFDocument } = await import("pdf-lib");
  const srcDoc = await PDFDocument.load(pdfBytes);
  const pageCount = srcDoc.getPageCount();

  if (parts < 2 || parts > pageCount) {
    throw new Error(
      `Parts must be between 2 and ${pageCount} (total pages).`
    );
  }

  const baseSize = Math.floor(pageCount / parts);
  const remainder = pageCount % parts;
  const results: Uint8Array[] = [];
  let cursor = 0;

  for (let i = 0; i < parts; i++) {
    const chunkSize = baseSize + (i < remainder ? 1 : 0);
    const indices = Array.from({ length: chunkSize }, (_, j) => cursor + j);
    cursor += chunkSize;

    const newDoc = await PDFDocument.create();
    const copied = await newDoc.copyPages(srcDoc, indices);
    copied.forEach((p) => newDoc.addPage(p));
    results.push(await newDoc.save());
  }

  return results;
}