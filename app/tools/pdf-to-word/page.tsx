import PdfToWord from "@/components/tools/pdftoword";
import { createToolMetadata } from "@/lib/seo";

export const metadata = createToolMetadata({
  title: "PDF to Word Converter",
  description:
    "Convert PDF documents into editable Microsoft Word (.docx) files online for free using MeggatronAI. Fast, secure and browser-based.",
  slug: "pdf-to-word",
});

export default function PdfToWordPage() {
  return <PdfToWord />;
}