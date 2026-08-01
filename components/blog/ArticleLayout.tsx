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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
      <div className="grid gap-8 lg:gap-12 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          {tableOfContents}
          {keyTakeaways}
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <article
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

              prose-h2:text-3xl
              sm:prose-h2:text-4xl

              prose-h3:text-xl
              sm:prose-h3:text-2xl
            "
          >
            {children}
          </article>

          {faq && <div className="mt-16 sm:mt-20">{faq}</div>}

          {relatedArticles && (
            <div className="mt-16 sm:mt-20">
              {relatedArticles}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}