import type { Metadata } from "next";
import QrGenerator from "@/components/tools/QrGenerator";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "QR Code Generator",
  description:
    "Generate QR codes instantly for URLs, text, email, phone numbers, Wi-Fi and more with MeggatronAI's free QR Code Generator.",
  slug: "qr-generator",
});

export default function Page() {
  return <QrGenerator />;
}