import React from "react";


interface ArticleLayoutProps {
  children: React.ReactNode;
}


export default function ArticleLayout({
  children,
}: ArticleLayoutProps) {

  return (
    <article
      className="
        mx-auto
        max-w-4xl
        px-6
        py-16
      "
    >

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

    </article>
  );
}