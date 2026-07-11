import type { Metadata } from "next";
import PDFSplitter from "@/components/tools/pdfsplitter";

export const metadata: Metadata = {
  title: "PDF Splitter — Split PDF Files Online Free | MeggatronAI",
  description:
    "Split PDF files into individual pages, custom page ranges, specific pages or equal parts — free, private and entirely browser-based. No uploads. No registration.",
  openGraph: {
    title: "Free Online PDF Splitter | MeggatronAI",
    description:
      "Split any PDF file directly in your browser. Choose every page, a range, specific pages or equal parts. Fast, secure and 100% free.",
    url: "https://www.meggatronai.com/tools/pdf-splitter",
    siteName: "MeggatronAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Splitter Online | MeggatronAI",
    description:
      "Split PDFs into pages, ranges or equal parts instantly. Secure, private, browser-based.",
  },
  alternates: {
    canonical: "https://www.meggatronai.com/tools/pdf-splitter",
  },
};

export default function PDFSplitterPage() {
  return <PDFSplitter />;
}