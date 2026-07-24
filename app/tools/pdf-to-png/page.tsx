import type { Metadata } from "next";
import PdfToPng from "@/components/tools/pdftopng";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "PDF to PNG",
  description:
    "Convert PDF pages into high-quality PNG images instantly using MeggatronAI.",
  slug: "pdf-to-png",
});

export default function Page() {
  return <PdfToPng />;
}