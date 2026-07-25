import type { Metadata } from "next";
import WordCounter from "@/components/tools/WordCounter";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata({
  title: "Word Counter",
  description:
    "Count words, characters, sentences, paragraphs and reading time instantly with MeggatronAI's free online Word Counter.",
  slug: "word-counter",
});

export default function Page() {
  return <WordCounter />;
}