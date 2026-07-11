import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";
import PdfCompressor from "@/components/tools/pdfcompressor";

export const metadata: Metadata = createToolMetadata({
  title: "PDF Compressor",
  description:
    "Compress PDF files online for free using MeggatronAI. Reduce PDF file size while maintaining document quality. Fast, secure and browser-based.",
  slug: "pdf-compressor",
});

export default function PdfCompressorPage() {
  return <PdfCompressor />;
}