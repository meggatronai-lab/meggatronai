import {
  PDFDocument,
  PDFName,
  PDFArray,
  PDFRawStream,
  decodePDFRawStream,
} from "pdf-lib";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

/**
 * ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------
 */

export interface PdfPageInfo {
  pageNumber: number;
  width: number;
  height: number;
  lines: string[];
}

export interface PdfExtractionResult {
  fileName: string;
  fileSize: number;
  pageCount: number;
  pages: PdfPageInfo[];
  fullText: string;
  hasExtractableText: boolean;
}

export interface ConversionOptions {
  preserveFormatting: boolean;
  preserveImages: boolean;
  preserveTables: boolean;
  outputFileName: string;
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
const WORD_GAP_THRESHOLD = -100; // TJ kerning value large enough to imply a space

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
 * PDF content-stream string decoding
 *
 * PDF literal strings use a limited escape syntax. This decodes the
 * common escape sequences found inside "(...)" string operands.
 * ------------------------------------------------------------------
 */

function decodePdfLiteralString(raw: string): string {
  let result = "";

  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];

    if (char !== "\\") {
      result += char;
      continue;
    }

    const next = raw[i + 1];

    switch (next) {
      case "n":
        result += "\n";
        i++;
        break;
      case "r":
        result += "\r";
        i++;
        break;
      case "t":
        result += "\t";
        i++;
        break;
      case "b":
        result += "\b";
        i++;
        break;
      case "f":
        result += "\f";
        i++;
        break;
      case "(":
        result += "(";
        i++;
        break;
      case ")":
        result += ")";
        i++;
        break;
      case "\\":
        result += "\\";
        i++;
        break;
      default:
        if (next >= "0" && next <= "7") {
          let octal = next;
          let cursor = i + 2;
          let digitsRead = 0;
          while (
            digitsRead < 2 &&
            raw[cursor] >= "0" &&
            raw[cursor] <= "7"
          ) {
            octal += raw[cursor];
            cursor++;
            digitsRead++;
          }
          result += String.fromCharCode(parseInt(octal, 8));
          i = cursor - 1;
        } else if (next === undefined) {
          // Trailing backslash, nothing to escape
        } else {
          result += next;
          i++;
        }
    }
  }

  return result;
}

/**
 * ------------------------------------------------------------------
 * Content-stream operator parsing
 *
 * pdf-lib does not include a text-extraction API. This walks the
 * decoded page content stream and reconstructs text by interpreting
 * the Tj / TJ show-text operators and Td / TD / T* line-break
 * operators. This works well for standard, non-subsetted fonts with
 * a direct character encoding. PDFs built from scanned images, or
 * that use custom/subsetted CID fonts with non-standard glyph
 * mappings, cannot be reliably decoded this way - this is a known
 * limitation of doing extraction without a full font/CMap engine.
 * ------------------------------------------------------------------
 */

function extractLinesFromContentStream(streamText: string): string[] {
  const lines: string[] = [];
  let currentLine = "";

  const flushLine = () => {
    const trimmed = currentLine.trim();
    if (trimmed.length > 0) {
      lines.push(trimmed);
    }
    currentLine = "";
  };

  const operatorRegex =
    /\((?:[^()\\]|\\.)*\)\s*Tj|\[(?:[^\[\]]|\\.)*\]\s*TJ|T\*|-?\d*\.?\d+\s+-?\d*\.?\d+\s+Td\b|-?\d*\.?\d+\s+-?\d*\.?\d+\s+TD\b|BT|ET/g;

  let match: RegExpExecArray | null;

  while ((match = operatorRegex.exec(streamText)) !== null) {
    const token = match[0];

    if (token === "BT") {
      currentLine = "";
      continue;
    }

    if (token === "ET") {
      flushLine();
      continue;
    }

    if (token === "T*" || /Td$/.test(token) || /TD$/.test(token)) {
      flushLine();
      continue;
    }

    if (token.endsWith("Tj")) {
      const stringMatch = token.match(/^\(((?:[^()\\]|\\.)*)\)/);
      if (stringMatch) {
        currentLine += decodePdfLiteralString(stringMatch[1]);
      }
      continue;
    }

    if (token.endsWith("TJ")) {
      const closingBracket = token.lastIndexOf("]");
      const arrayContent = token.slice(1, closingBracket);
      let cursor = 0;

      while (cursor < arrayContent.length) {
        const remaining = arrayContent.slice(cursor);

        const stringMatch = remaining.match(/^\(((?:[^()\\]|\\.)*)\)/);
        if (stringMatch) {
          currentLine += decodePdfLiteralString(stringMatch[1]);
          cursor += stringMatch[0].length;
          continue;
        }

        const numberMatch = remaining.match(/^-?\d*\.?\d+/);
        if (numberMatch) {
          const kerning = parseFloat(numberMatch[0]);
          if (kerning < WORD_GAP_THRESHOLD) {
            currentLine += " ";
          }
          cursor += numberMatch[0].length;
          continue;
        }

        cursor += 1;
      }
      continue;
    }
  }

  flushLine();
  return lines;
}

/**
 * ------------------------------------------------------------------
 * Public API
 * ------------------------------------------------------------------
 */

export async function extractPdfText(file: File): Promise<PdfExtractionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });

  const pdfPages = pdfDoc.getPages();
  const pages: PdfPageInfo[] = [];
  const allLines: string[] = [];

  for (let i = 0; i < pdfPages.length; i++) {
    const page = pdfPages[i];
    const { width, height } = page.getSize();
    let pageLines: string[] = [];

    try {
      const contentsRef = page.node.get(PDFName.of("Contents"));
      const rawStreams: PDFRawStream[] = [];

      if (contentsRef) {
        const resolved = pdfDoc.context.lookup(contentsRef);

        if (resolved instanceof PDFArray) {
          for (let j = 0; j < resolved.size(); j++) {
            const entry = pdfDoc.context.lookup(resolved.get(j));
            if (entry instanceof PDFRawStream) {
              rawStreams.push(entry);
            }
          }
        } else if (resolved instanceof PDFRawStream) {
          rawStreams.push(resolved);
        }
      }

      let rawText = "";
      for (const stream of rawStreams) {
        const decodedBytes = decodePDFRawStream(stream).decode();
        rawText += new TextDecoder("latin1").decode(decodedBytes) + "\n";
      }

      pageLines = extractLinesFromContentStream(rawText);
    } catch {
      pageLines = [];
    }

    pages.push({
      pageNumber: i + 1,
      width,
      height,
      lines: pageLines,
    });

    allLines.push(...pageLines);
  }

  return {
    fileName: file.name,
    fileSize: file.size,
    pageCount: pdfPages.length,
    pages,
    fullText: allLines.join("\n"),
    hasExtractableText: allLines.length > 0,
  };
}

function looksLikeHeading(line: string): boolean {
  return (
    line.length > 0 &&
    line.length < 70 &&
    line === line.toUpperCase() &&
    /[A-Z]/.test(line)
  );
}

export async function convertPdfToWord(
  extraction: PdfExtractionResult,
  options: ConversionOptions
): Promise<Blob> {
  const children: Paragraph[] = [];

  const titleText = extraction.fileName.replace(/\.pdf$/i, "");
  children.push(
    new Paragraph({
      text: titleText,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
    })
  );

  extraction.pages.forEach((page, pageIndex) => {
    if (pageIndex > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "" })],
          pageBreakBefore: true,
        })
      );
    }

    if (page.lines.length === 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `[Page ${page.pageNumber}: no extractable text found. This page may be a scanned image or use a font encoding that cannot be read in-browser.]`,
              italics: true,
              color: "999999",
            }),
          ],
          spacing: { after: 200 },
        })
      );
      return;
    }

    page.lines.forEach((line) => {
      const isHeading = options.preserveFormatting && looksLikeHeading(line);

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: isHeading,
              size: isHeading ? 28 : 24,
            }),
          ],
          spacing: { after: 160 },
        })
      );
    });

    if (options.preserveImages || options.preserveTables) {
      const notes: string[] = [];
      if (options.preserveImages) notes.push("images");
      if (options.preserveTables) notes.push("tables");
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `[Note: ${notes.join(
                " and "
              )} on this page could not be reconstructed - full layout/image/table preservation is limited in the browser.]`,
              italics: true,
              color: "999999",
              size: 18,
            }),
          ],
          spacing: { after: 200 },
        })
      );
    }
  });

  const document = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(document);
}

export function downloadWord(blob: Blob, fileName: string): void {
  const safeName = fileName.trim().length > 0 ? fileName.trim() : "converted-document";
  const finalName = safeName.toLowerCase().endsWith(".docx")
    ? safeName
    : `${safeName}.docx`;
  saveAs(blob, finalName);
}