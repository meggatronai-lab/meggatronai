import type { Metadata } from "next";
import PdfWatermark from "@/components/tools/PdfWatermark";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "PDF Watermark",
  description:
    "Add custom text or image watermarks to your PDF files for free. Secure documents with professional watermarking directly in your browser.",
  slug: "pdf-watermark",
});

export default function Page() {
  return <PdfWatermark />;
}