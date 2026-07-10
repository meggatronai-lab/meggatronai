import type { Metadata } from "next";
import PdfMerger from "@/components/tools/PdfMerger";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "PDF Merger",
  description:
    "Merge multiple PDF files into one document online for free. Fast, secure and private PDF Merger by MeggatronAI.",
  slug: "pdf-merger",
});

export default function Page() {
  return <PdfMerger />;
}