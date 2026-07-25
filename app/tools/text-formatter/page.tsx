import type { Metadata } from "next";
import TextFormatter from "@/components/tools/TextFormatter";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "Text Formatter",
  description:
    "Format, clean and transform text instantly. Convert case, remove extra spaces and improve text with MeggatronAI's free Text Formatter.",
  slug: "text-formatter",
});

export default function Page() {
  return <TextFormatter />;
}