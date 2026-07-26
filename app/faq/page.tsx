import type { Metadata } from "next";
import Link from "next/link";

// ==================================================
// SEO METADATA
// ==================================================

const SITE_URL = "https://meggatronai.com";
const PAGE_URL = `${SITE_URL}/faq`;

export const metadata: Metadata = {
  title: "FAQ – MeggatronAI Online Tools, Pricing & Privacy Questions",
  description:
    "Answers to common questions about MeggatronAI's free browser-based AI, PDF, text, image, developer, and SEO tools, including pricing, accounts, and how your files are handled.",
  keywords: [
    "MeggatronAI FAQ",
    "AI tools FAQ",
    "online productivity tools",
    "free online tools",
    "PDF tools",
    "AI productivity tools",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FAQ – MeggatronAI Online Tools, Pricing & Privacy Questions",
    description:
      "Answers to common questions about MeggatronAI's free browser-based AI, PDF, text, image, developer, and SEO tools, including pricing, accounts, and how your files are handled.",
    url: PAGE_URL,
    siteName: "MeggatronAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – MeggatronAI Online Tools, Pricing & Privacy Questions",
    description:
      "Answers to common questions about MeggatronAI's free browser-based AI, PDF, text, image, developer, and SEO tools, including pricing, accounts, and how your files are handled.",
  },
};

// ==================================================
// FAQ DATA (single source of truth for UI + JSON-LD)
// ==================================================

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    title: "General",
    items: [
      {
        question: "What is MeggatronAI?",
        answer:
          "MeggatronAI is a productivity tools platform offering a collection of free, browser-based tools across categories like AI, PDF, text, image, developer, SEO, and general utilities. The goal is to help people complete common digital tasks quickly without installing software.",
      },
      {
        question: "Who is MeggatronAI for?",
        answer:
          "MeggatronAI is built for anyone who needs to get a quick task done online, including students, professionals, freelancers, content creators, developers, and small business owners. Tools are designed to be simple enough for casual use and useful enough for daily professional work.",
      },
      {
        question: "What types of tools does MeggatronAI offer?",
        answer:
          "MeggatronAI offers tools across several categories: AI tools, PDF tools, text tools, image tools, developer tools, SEO tools, and general utility tools. Each category includes multiple individual tools focused on a specific task, such as converting a file, formatting text, or checking a webpage.",
      },
    ],
  },
  {
    title: "Using the Platform",
    items: [
      {
        question: "Are MeggatronAI tools free?",
        answer:
          "Yes, the core tools on MeggatronAI are free to use. Some advanced or premium features may be introduced in the future, but the platform's foundation is built around free, accessible tools.",
      },
      {
        question: "Do I need an account to use the tools?",
        answer:
          "No, most tools on MeggatronAI can be used without creating an account. If account-based features are added later, such as saving history or preferences, they will be optional additions rather than a requirement for basic tool use.",
      },
      {
        question: "Are the tools browser-based?",
        answer:
          "Yes, MeggatronAI tools run directly in your web browser. There is nothing to download or install, and tools are designed to work on both desktop and mobile browsers.",
      },
      {
        question: "Does MeggatronAI work on mobile devices?",
        answer:
          "Yes, MeggatronAI is built to be responsive and usable on mobile devices. Some tools that involve detailed editing may be easier to use on a larger screen, but the site itself is optimized for mobile browsing.",
      },
      {
        question: "Which browsers are supported?",
        answer:
          "MeggatronAI is designed to work on modern, up-to-date browsers such as Chrome, Firefox, Safari, and Edge. Using an outdated browser version may cause some tools to behave unexpectedly.",
      },
    ],
  },
  {
    title: "Privacy and Files",
    items: [
      {
        question: "Do uploaded files leave my device?",
        answer:
          "It depends on the tool. Some tools process files directly in your browser without sending them anywhere, while others may need to send a file to a server to perform the requested task. Each tool's behavior can vary based on what it needs to do, so check the specific tool page if you have questions about a particular file.",
      },
      {
        question: "How is my data handled?",
        answer:
          "MeggatronAI aims to minimize the amount of data collected and handled. Because tools differ in how they process files and text, data handling can vary from tool to tool. We do not sell user data, and any processing is done to deliver the specific function of the tool being used.",
      },
      {
        question: "Are uploaded files stored?",
        answer:
          "File storage practices depend on the individual tool. Some tools discard files immediately after processing, while others may briefly retain a file to complete the task, such as generating a download. If you need specifics for a particular tool, we recommend checking that tool's page or reaching out through the Contact page.",
      },
    ],
  },
  {
    title: "Tools and Features",
    items: [
      {
        question: "Are AI tools available?",
        answer:
          "Yes, MeggatronAI includes AI-powered tools designed to assist with tasks like writing, summarization, and other productivity workflows. Additional AI tools are planned as the platform continues to grow.",
      },
      {
        question: "Are PDF tools available?",
        answer:
          "Yes, MeggatronAI offers PDF tools for common tasks such as converting, merging, or organizing PDF files. These tools are aimed at handling everyday PDF-related tasks without needing separate software.",
      },
      {
        question: "Are image tools available?",
        answer:
          "Yes, MeggatronAI provides image tools for tasks like resizing, converting, or editing images directly in the browser.",
      },
      {
        question: "Are developer tools available?",
        answer:
          "Yes, MeggatronAI includes developer tools designed for everyday coding and formatting tasks, such as code formatting, encoding, or data conversion utilities.",
      },
      {
        question: "Are SEO tools available?",
        answer:
          "Yes, MeggatronAI offers SEO tools that help with tasks like analyzing on-page elements or generating SEO-related content. These tools are intended to support basic optimization work rather than replace a full SEO platform.",
      },
      {
        question: "Can businesses and professionals use MeggatronAI?",
        answer:
          "Yes, MeggatronAI tools are suitable for business and professional use, including tasks like document handling, content creation, and basic SEO or development work. The platform is not limited to personal or casual use.",
      },
    ],
  },
  {
    title: "Support and Feedback",
    items: [
      {
        question: "Can users suggest new tools?",
        answer:
          "Yes, tool suggestions are welcome. You can reach out through the Contact page to share ideas for tools you would find useful.",
      },
      {
        question: "How can users report bugs?",
        answer:
          "Bugs or issues with a tool can be reported through the Contact page. Including details like the tool name, the steps you took, and your browser helps with resolving issues faster.",
      },
      {
        question: "What should I do if a tool is not working?",
        answer:
          "First, try refreshing the page or using an updated browser, since most tool issues are related to browser compatibility. If the problem continues, report it through the Contact page so it can be looked into.",
      },
      {
        question: "How can users contact MeggatronAI?",
        answer:
          "You can contact MeggatronAI through the Contact page for support, feedback, bug reports, or general questions.",
      },
      {
        question: "Does MeggatronAI offer partnerships?",
        answer:
          "Partnership inquiries can be submitted through the Contact page. Each inquiry is reviewed individually based on how it aligns with the platform.",
      },
    ],
  },
  {
    title: "Future Development",
    items: [
      {
        question: "Will new tools be added?",
        answer:
          "Yes, MeggatronAI is actively developed, and new tools are planned across existing categories as well as potential new ones based on user feedback.",
      },
      {
        question: "Does MeggatronAI have premium features?",
        answer:
          "MeggatronAI does not currently have paid premium features. Additional advanced features may be introduced in the future, and any changes to pricing or access would be communicated clearly on the platform.",
      },
    ],
  },
];

// ==================================================
// STRUCTURED DATA (generated from faqCategories)
// ==================================================

function buildFaqJsonLd() {
  const allItems = faqCategories.flatMap((category) => category.items);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: PAGE_URL,
      },
    ],
  };
}

// ==================================================
// PAGE
// ==================================================

export default function FAQPage() {
  const faqJsonLd = buildFaqJsonLd();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumb (visual) */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-6 pt-8">
        <ol className="flex items-center gap-2 text-sm text-zinc-500">
          <li>
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-300" aria-current="page">
            FAQ
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Straight answers about MeggatronAI&apos;s free browser-based tools,
          how accounts and pricing work, and how your files and data are
          handled while you use them.
        </p>
      </section>

      {/* FAQ content */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.title}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
                {category.title}
              </h2>

              <div className="divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900">
                {category.items.map((item) => (
                  <details key={item.question} className="group p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                      <span>{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xl leading-none text-zinc-500 transition-transform duration-150 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-zinc-400">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact / help footer */}
        <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Still have questions?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-zinc-400">
            Browse the full{" "}
            <Link href="/tools" className="text-cyan-400 hover:underline">
              tools directory
            </Link>{" "}
            or reach out on the{" "}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              Contact page
            </Link>{" "}
            for support, bug reports, or tool suggestions.
          </p>
        </div>
      </section>
    </main>
  );
}