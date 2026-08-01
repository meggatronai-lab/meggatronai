import React from "react";

interface ArticleLayoutProps {
  children: React.ReactNode;
  tableOfContents?: React.ReactNode;
  keyTakeaways?: React.ReactNode;
  faq?: React.ReactNode;
  relatedArticles?: React.ReactNode;
}

export default function ArticleLayout({
  children,
  tableOfContents,
  keyTakeaways,
  faq,
  relatedArticles,
}: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main Article */}
        <div
          className="
            prose
            prose-invert
            max-w-none

            prose-headings:text-white
            prose-p:text-zinc-300
            prose-li:text-zinc-300
            prose-strong:text-white
            prose-a:text-cyan-400
            hover:prose-a:text-cyan-300
          "
        >
          {children}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
          {tableOfContents}

          {keyTakeaways}

          {faq}

          {relatedArticles}
        </aside>
      </div>
    </article>
  );
}