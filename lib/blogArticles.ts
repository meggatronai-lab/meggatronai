export interface BlogArticle {
  title: string;
  description: string;
  slug: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
}


export const blogArticles: BlogArticle[] = [

  {
    title: "College Essay Word Count: The Complete 2026 Guide",
    slug: "/blog/college-essay-word-count",
    category: "Writing",
    description:
      "Learn the ideal college essay word count, Common App limits, average essay lengths, and tips to edit your essay effectively.",
    publishedAt: "July 2026",
    readingTime: "12 min read",
    featured: true,
  },

  {
    title: "How to Count Words Online: Complete Guide",
    description:
      "Learn how word counters work, why word count matters, and how to measure your content accurately.",
    slug: "/blog/how-to-count-words-online",
    category: "Writing",
    publishedAt: "July 2026",
    readingTime: "5 min read",
    featured: true,
  },

  {
    title: "Character Counter Guide: Everything You Need to Know",
    description:
      "Understand character limits, character counting methods, and how writers use character counters.",
    slug: "/blog/character-counter-guide",
    category: "Writing",
    publishedAt: "July 2026",
    readingTime: "6 min read",
    featured: true,
  },

  {
    title: "Best Productivity Tools for Faster Workflows",
    description:
      "Explore useful AI and productivity tools that help save time and improve your daily workflow.",
    slug: "/blog/productivity-tools-guide",
    category: "AI",
    publishedAt: "July 2026",
    readingTime: "7 min read",
    featured: false,
  },

];