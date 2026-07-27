import Link from "next/link";

interface ArticleCardProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
}

export default function ArticleCard({
  title,
  description,
  slug,
  category,
  publishedAt,
  readingTime,
  featured = false,
}: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={`
        group
        block
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-500
        ${
          featured
            ? "p-8"
            : "p-6"
        }
      `}
    >

      {/* Category */}

      <span
        className="
          inline-flex
          rounded-full
          bg-cyan-500/10
          px-3
          py-1
          text-xs
          font-medium
          text-cyan-400
        "
      >
        {category}
      </span>


      {/* Title */}

      <h3
        className={`
          mt-5
          font-bold
          leading-tight
          transition
          group-hover:text-cyan-400
          ${
            featured
              ? "text-3xl"
              : "text-xl"
          }
        `}
      >
        {title}
      </h3>


      {/* Description */}

      <p
        className={`
          mt-4
          text-zinc-400
          leading-7
          ${
            featured
              ? "line-clamp-4 text-base"
              : "line-clamp-3 text-sm"
          }
        `}
      >
        {description}
      </p>


      {/* Footer */}

      <div
        className="
          mt-8
          flex
          items-center
          justify-between
          border-t
          border-zinc-800
          pt-5
          text-sm
          text-zinc-500
        "
      >
        <span>
          {readingTime}
        </span>

        <span>
          {publishedAt}
        </span>
      </div>


    </Link>
  );
}