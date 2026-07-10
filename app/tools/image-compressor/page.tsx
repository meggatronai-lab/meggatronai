import type { Metadata } from "next";
import ImageCompressor from "@/components/tools/ImageCompressor";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "Image Compressor",
  description:
    "Compress JPG, PNG, JPEG and WebP images online for free. Reduce image file size without losing quality using MeggatronAI's secure Image Compressor.",
  slug: "image-compressor",
});

export default function Page() {
  return <ImageCompressor />;
}