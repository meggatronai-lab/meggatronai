import { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import ArticleCard from "@/components/blog/ArticleCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { blogArticles } from "@/lib/blogArticles";

export const metadata: Metadata = {
  title: "MeggatronAI Blog | AI, Productivity & Tool Guides",
  description:
    "Discover AI tutorials, productivity guides, writing resources, SEO tips, PDF tutorials, and practical tool walkthroughs from MeggatronAI.",
};

const categories = [
  {
    name: "Writing",
    href: "/blog?category=writing",
  },
  {
    name: "PDF",
    href: "/blog?category=pdf",
  },
  {
    name: "Image",
    href: "/blog?category=image",
  },
  {
    name: "SEO",
    href: "/blog?category=seo",
  },
  {
    name: "AI",
    href: "/blog?category=ai",
  },
  {
    name: "Developer",
    href: "/blog?category=developer",
  },
];

export default function BlogPage() {
  const featuredArticles = blogArticles.filter(
    (article) => article.featured
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">

      {/* ================= HERO ================= */}

      <section className="text-center">

        <span
          className="
            inline-flex
            rounded-full
            border
            border-cyan-500/30
            bg-cyan-500/10
            px-4
            py-1
            text-sm
            font-medium
            text-cyan-400
          "
        >
          MeggatronAI Blog
        </span>

        <h1
          className="
            mx-auto
            mt-6
            max-w-4xl
            text-5xl
            font-bold
            leading-tight
            md:text-6xl
          "
        >
          Learn Faster.
          <br />
          Build Smarter.
          <br />
          Work Better.
        </h1>

        <p
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-lg
            leading-8
            text-zinc-400
          "
        >
          Explore premium tutorials, productivity guides,
          AI insights, SEO strategies, PDF resources,
          writing tips, and developer content designed
          to help you work smarter every day.
        </p>

      </section>

      {/* ================= SEARCH ================= */}

      <section className="mx-auto mt-14 max-w-2xl">

        <div className="relative">

          <Search
            className="
              absolute
              left-5
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            type="text"
            placeholder="Search articles..."
            className="
              w-full
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              py-4
              pl-14
              pr-5
              text-white
              outline-none
              transition-all
              duration-300
              focus:border-cyan-500
            "
          />

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}

      <section
        className="
          mt-10
          flex
          flex-wrap
          justify-center
          gap-4
        "
      >

        {categories.map((category) => (

          <Link
            key={category.name}
            href={category.href}
            className="
              rounded-full
              border
              border-zinc-800
              bg-zinc-900
              px-5
              py-2.5
              text-sm
              text-zinc-300
              transition-all
              duration-300
              hover:border-cyan-500
              hover:text-cyan-400
            "
          >
            {category.name}
          </Link>

        ))}

      </section>

      {/* ================= FEATURED ARTICLES ================= */}
            <section className="mt-24">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <span className="text-sm font-medium uppercase tracking-widest text-cyan-400">
              Featured
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Featured Articles
            </h2>

          </div>

          <Link
            href="/blog"
            className="text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            View All →
          </Link>

        </div>

        {featuredArticles.length === 0 ? (

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">

            <h3 className="text-2xl font-semibold">
              Featured articles coming soon
            </h3>

            <p className="mt-4 text-zinc-400">
              We're publishing in-depth tutorials, productivity guides,
              AI resources, SEO strategies, and practical tool
              walkthroughs. Check back soon.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-2">

            {featuredArticles.slice(0, 2).map((article) => (

              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                slug={article.slug}
                category={article.category}
                publishedAt={article.publishedAt}
                readingTime={article.readingTime}
                featured={true}
              />

            ))}

          </div>

        )}

      </section>

      {/* ================= LATEST ARTICLES ================= */}

      <section className="mt-24">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <span className="text-sm font-medium uppercase tracking-widest text-cyan-400">
              Latest
            </span>

            <h2 className="mt-2 text-4xl font-bold">
              Latest Articles
            </h2>

          </div>

          <Link
            href="/blog"
            className="text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            Browse All →
          </Link>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {blogArticles.map((article) => (

            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              slug={article.slug}
              category={article.category}
              publishedAt={article.publishedAt}
              readingTime={article.readingTime}
              featured={false}
            />

          ))}

        </div>

      </section>

      {/* ================= BROWSE BY CATEGORY ================= */}
            <section className="mt-24">

        <div className="text-center">

          <span
            className="
              text-sm
              font-medium
              uppercase
              tracking-widest
              text-cyan-400
            "
          >
            Categories
          </span>

          <h2 className="mt-2 text-4xl font-bold">
            Browse by Topic
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-zinc-400
            "
          >
            Explore articles organized by category to quickly
            find tutorials, guides, and resources that help
            you learn and build faster.
          </p>

        </div>


        <div
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {categories.map((category) => (

            <Link
              key={category.name}
              href={category.href}
              className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500
              "
            >

              <h3 className="text-xl font-semibold">
                {category.name}
              </h3>


              <p
                className="
                  mt-3
                  text-sm
                  leading-7
                  text-zinc-400
                "
              >
                Discover tutorials, practical guides,
                and helpful resources related to{" "}
                {category.name}.
              </p>


              <span
                className="
                  mt-6
                  inline-block
                  text-sm
                  font-medium
                  text-cyan-400
                "
              >
                Explore {category.name} →
              </span>


            </Link>

          ))}

        </div>


      </section>


      {/* ================= BLOG CTA ================= */}


      <section className="mt-28">

        <BlogCTA />

      </section>

    </main>
  );
}