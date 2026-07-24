import type { Metadata } from "next";
import PdfToJpg from "@/components/tools/pdftojpg";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "PDF to JPG",
  description:
    "Convert PDF pages into high-quality JPG images instantly using MeggatronAI.",
  slug: "pdf-to-jpg",
});

export default function Page() {
  return <PdfToJpg />;
}