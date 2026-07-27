import React from "react";
import Link from "next/link";


interface RelatedArticle {
  title: string;
  description: string;
  slug: string;
  category: string;
}


interface RelatedArticlesProps {
  articles: RelatedArticle[];
}


export default function RelatedArticles({
  articles,
}: RelatedArticlesProps) {

  return (
    <section
      className="
        mt-16
      "
    >

      <h2
        className="
          mb-6
          text-2xl
          font-bold
          text-white
        "
      >
        Related Articles
      </h2>



      <div
        className="
          grid
          gap-6
          md:grid-cols-2
        "
      >

        {articles.map((article) => (

          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-6
              transition
              hover:border-cyan-400/40
              hover:bg-white/10
            "
          >

            <span
              className="
                text-sm
                text-cyan-400
              "
            >
              {article.category}
            </span>


            <h3
              className="
                mt-3
                text-xl
                font-semibold
                text-white
                group-hover:text-cyan-300
              "
            >
              {article.title}
            </h3>


            <p
              className="
                mt-3
                text-zinc-400
              "
            >
              {article.description}
            </p>


          </Link>

        ))}

      </div>


    </section>
  );
}