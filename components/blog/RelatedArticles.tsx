import Link from "next/link";

export interface RelatedArticle {
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
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Related Articles
      </h2>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="rounded-2xl border border-white/10 p-5 transition hover:border-cyan-400"
          >
            <span className="text-sm text-cyan-400">
              {article.category}
            </span>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {article.title}
            </h3>

            <p className="mt-3 text-zinc-400">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}