/**
 * lib/pdf/wordToPdf.ts
 *
 * Word to PDF conversion helpers.
 *
 * Browser limitation note:
 * True Word-to-PDF conversion with perfect fidelity requires a rendering
 * engine (like LibreOffice or Microsoft Word). In-browser, we use mammoth
 * to extract DOCX content as HTML, then generate a PDF from that HTML using
 * jsPDF. Formatting fidelity is good for text-heavy documents but complex
 * layouts, custom fonts and advanced Word features will be simplified.
 *
 * Install: npm install mammoth jspdf file-saver
 * Types:   npm install --save-dev @types/file-saver
 */

export interface WordFileInfo {
  name: string;
  size: number;
  type: string;
}

export interface WordConversionResult {
  success: boolean;
  pageCount: number;
  filename: string;
  blob: Blob;
  warnings: string[];
}

export interface WordConversionOptions {
  preserveFormatting: boolean;
  preserveImages: boolean;
  preserveHyperlinks: boolean;
  preservePageSize: boolean;
  outputFilename: string;
}

/**
 * Validates that the uploaded file is a .docx Word document.
 */
export function validateWordFile(file: File): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: "No file provided." };

  const validTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];
  const validExtensions = [".docx", ".doc"];
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));

  if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
    return { valid: false, error: "Please upload a valid Word document (.docx or .doc)." };
  }

  if (file.size > 50 * 1024 * 1024) {
    return { valid: false, error: "File size exceeds the 50 MB limit." };
  }

  return { valid: true };
}

/**
 * Extracts HTML from a DOCX file using mammoth.
 */
async function extractDocxHtml(
  fileBytes: ArrayBuffer
): Promise<{ html: string; warnings: string[] }> {
  const mammoth = await import("mammoth");
  const result = await mammoth.convertToHtml({ arrayBuffer: fileBytes });
  return {
    html: result.value,
    warnings: result.messages
      .filter((m) => m.type === "warning")
      .map((m) => m.message),
  };
}

/**
 * Converts HTML string to a PDF Blob using jsPDF.
 */
async function htmlToPdfBlob(
  html: string,
  filename: string,
  options: WordConversionOptions
): Promise<{ blob: Blob; pageCount: number }> {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: options.preservePageSize ? "a4" : "a4",
  });

  // Parse HTML and render text content
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, "text/html");

  const PAGE_WIDTH = 210; // A4 mm
  const MARGIN = 20;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
  const PAGE_HEIGHT = 297;
  const BOTTOM_MARGIN = 20;

  let y = MARGIN;
  let pageCount = 1;

  const checkPageBreak = (lineHeight: number) => {
    if (y + lineHeight > PAGE_HEIGHT - BOTTOM_MARGIN) {
      doc.addPage();
      pageCount++;
      y = MARGIN;
    }
  };

  // Add document filename as header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(20, 20, 20);
  const titleLines = doc.splitTextToSize(
    filename.replace(/\.docx?$/i, ""),
    CONTENT_WIDTH
  ) as string[];
  for (const line of titleLines) {
    checkPageBreak(8);
    doc.text(line, MARGIN, y);
    y += 8;
  }
  y += 4;

  // Separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;

  // Walk DOM nodes
  const body = parsed.body;
  const nodes = Array.from(body.childNodes);

  for (const node of nodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      const text = el.textContent?.trim() ?? "";

      if (!text && tag !== "hr") continue;

      if (tag === "h1") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(10, 10, 10);
        const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
        y += 4;
        for (const line of lines) {
          checkPageBreak(9);
          doc.text(line, MARGIN, y);
          y += 9;
        }
        y += 3;
      } else if (tag === "h2") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(20, 20, 20);
        const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
        y += 3;
        for (const line of lines) {
          checkPageBreak(8);
          doc.text(line, MARGIN, y);
          y += 8;
        }
        y += 2;
      } else if (tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(30, 30, 30);
        const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
        y += 2;
        for (const line of lines) {
          checkPageBreak(7);
          doc.text(line, MARGIN, y);
          y += 7;
        }
        y += 2;
      } else if (tag === "p") {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
        for (const line of lines) {
          checkPageBreak(6);
          doc.text(line, MARGIN, y);
          y += 6;
        }
        y += 3;
      } else if (tag === "ul" || tag === "ol") {
        const items = Array.from(el.querySelectorAll("li"));
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        for (let i = 0; i < items.length; i++) {
          const itemText = items[i].textContent?.trim() ?? "";
          const bullet = tag === "ol" ? `${i + 1}.` : "•";
          const itemLines = doc.splitTextToSize(
            `${bullet} ${itemText}`,
            CONTENT_WIDTH - 5
          ) as string[];
          for (const line of itemLines) {
            checkPageBreak(6);
            doc.text(line, MARGIN + 3, y);
            y += 6;
          }
        }
        y += 3;
      } else if (tag === "hr") {
        checkPageBreak(4);
        doc.setDrawColor(200, 200, 200);
        doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
        y += 6;
      } else if (tag === "table") {
        // Simplified table rendering
        const rows = Array.from(el.querySelectorAll("tr"));
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        for (const row of rows) {
          const cells = Array.from(row.querySelectorAll("td, th"));
          const rowText = cells.map((c) => c.textContent?.trim()).join(" | ");
          if (rowText.trim()) {
            const lines = doc.splitTextToSize(rowText, CONTENT_WIDTH) as string[];
            for (const line of lines) {
              checkPageBreak(6);
              doc.text(line, MARGIN, y);
              y += 6;
            }
          }
        }
        y += 4;
      } else if (tag === "blockquote") {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 8) as string[];
        for (const line of lines) {
          checkPageBreak(6);
          doc.text(line, MARGIN + 8, y);
          y += 6;
        }
        y += 3;
      } else {
        // Fallback for any other elements
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        if (text) {
          const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
          for (const line of lines) {
            checkPageBreak(6);
            doc.text(line, MARGIN, y);
            y += 6;
          }
          y += 2;
        }
      }
    }
  }

  // Footer on every page
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `Converted by MeggatronAI — meggatronai.com`,
      MARGIN,
      PAGE_HEIGHT - 10
    );
    doc.text(
      `Page ${p} of ${totalPages}`,
      PAGE_WIDTH - MARGIN,
      PAGE_HEIGHT - 10,
      { align: "right" }
    );
  }

  const blob = doc.output("blob");
  return { blob, pageCount: totalPages };
}

/**
 * Main conversion function: DOCX ArrayBuffer → PDF Blob.
 */
export async function convertWordToPdf(
  fileBytes: ArrayBuffer,
  options: WordConversionOptions
): Promise<WordConversionResult> {
  const { html, warnings } = await extractDocxHtml(fileBytes);

  const filename = options.outputFilename.endsWith(".pdf")
    ? options.outputFilename
    : `${options.outputFilename}.pdf`;

  const { blob, pageCount } = await htmlToPdfBlob(html, filename, options);

  return {
    success: true,
    pageCount,
    filename,
    blob,
    warnings,
  };
}

/**
 * Triggers a browser download of the generated PDF.
 */
export function downloadPdf(blob: Blob, filename: string): void {
  const name = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Formats a file size in bytes to a readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}