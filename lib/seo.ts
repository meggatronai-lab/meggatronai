import type { Metadata } from "next";

type ToolMetadata = {
  title: string;
  description: string;
  slug: string;
};

export function createToolMetadata({
  title,
  description,
  slug,
}: ToolMetadata): Metadata {
  const url = `https://www.meggatronai.com/tools/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "MeggatronAI",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}