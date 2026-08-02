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
    <main
      className="
        mx-auto
        w-full
        max-w-[1400px]
        px-4
        sm:px-6
        lg:px-8
        py-10
        lg:py-16
      "
    >
      <div
        className="
          grid
          gap-10
          xl:grid-cols-[280px_minmax(0,860px)]
          justify-center
          items-start
        "
      >
        {/* ===================================== */}
        {/* DESKTOP SIDEBAR */}
        {/* ===================================== */}

        <aside
          className="
            hidden
            xl:block
            sticky
            top-24
            self-start
            space-y-6
          "
          aria-label="Article navigation"
        >
          {tableOfContents}

          {keyTakeaways}
        </aside>

        {/* ===================================== */}
        {/* MAIN CONTENT */}
        {/* ===================================== */}

        <div className="min-w-0">

          {/* Mobile TOC */}

          <div className="xl:hidden mb-8">
            {tableOfContents}
          </div>

          {/* Mobile Key Takeaways */}

          <div className="xl:hidden mb-10">
            {keyTakeaways}
          </div>

          <article
            className="
              prose
              prose-invert

              max-w-none

              prose-headings:scroll-mt-28

              prose-headings:font-bold
              prose-headings:text-white

              prose-h2:text-3xl
              sm:prose-h2:text-4xl

              prose-h3:text-2xl

              prose-p:text-zinc-300
              prose-p:leading-8

              prose-li:text-zinc-300

              prose-strong:text-white

              prose-a:text-cyan-400
              hover:prose-a:text-cyan-300

              prose-img:rounded-2xl

              prose-table:w-full

              prose-th:border
              prose-th:border-zinc-700

              prose-td:border
              prose-td:border-zinc-800
            "
          >
            {children}
          </article>
                    {/* ===================================== */}
          {/* FAQ */}
          {/* ===================================== */}

          {faq && (
            <section
              aria-labelledby="faq-heading"
              className="mt-20"
            >
              <h2
                id="faq-heading"
                className="sr-only"
              >
                Frequently Asked Questions
              </h2>

              {faq}
            </section>
          )}

          {/* ===================================== */}
          {/* RELATED ARTICLES */}
          {/* ===================================== */}

          {relatedArticles && (
            <section
              aria-labelledby="related-articles-heading"
              className="mt-20"
            >
              <h2
                id="related-articles-heading"
                className="sr-only"
              >
                Related Articles
              </h2>

              {relatedArticles}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}