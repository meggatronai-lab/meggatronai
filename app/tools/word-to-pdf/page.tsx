import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";
import WordToPdf from "@/components/tools/wordtopdf";

export const metadata: Metadata = createToolMetadata({
  title: "Word to PDF Converter — Convert DOCX to PDF Free | MeggatronAI",
  description:
    "Convert Microsoft Word (.docx) documents into PDF files online for free using MeggatronAI. Fast, secure and browser-based.",
  slug: "word-to-pdf",
});

export default function WordToPdfPage() {
  return <WordToPdf />;
}