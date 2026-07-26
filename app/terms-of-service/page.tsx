import type { Metadata } from "next";
import Link from "next/link";

// ==================================================
// SEO METADATA
// ==================================================

const SITE_URL = "https://meggatronai.com";
const PAGE_URL = `${SITE_URL}/terms`;
const LAST_UPDATED = "June 2026";
const SUPPORT_EMAIL = "meggatronai@gmail.com";

export const metadata: Metadata = {
  title: "Terms of Service – MeggatronAI",
  description:
    "Read MeggatronAI's Terms of Service, covering acceptable use, tool accuracy, intellectual property, liability, and your rights as a user of our free online tools.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service – MeggatronAI",
    description:
      "Read MeggatronAI's Terms of Service, covering acceptable use, tool accuracy, intellectual property, liability, and your rights as a user.",
    url: PAGE_URL,
    siteName: "MeggatronAI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service – MeggatronAI",
    description:
      "Read MeggatronAI's Terms of Service, covering acceptable use, tool accuracy, intellectual property, liability, and your rights as a user.",
  },
};

// ==================================================
// STRUCTURED DATA
// ==================================================

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: PAGE_URL },
    ],
  };
}

function buildWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    url: PAGE_URL,
    description:
      "MeggatronAI's Terms of Service, covering acceptable use, tool accuracy, intellectual property, liability, and user rights.",
    isPartOf: {
      "@type": "WebSite",
      name: "MeggatronAI",
      url: `${SITE_URL}/`,
    },
    dateModified: "2026-06-01",
  };
}

// ==================================================
// MAILTO HELPER (matches the pattern used on /support)
// ==================================================

function buildMailtoLink(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${SUPPORT_EMAIL}?${params.toString()}`;
}

const termsQuestionMailto = buildMailtoLink(
  "Terms of Service Question",
  "Your question about the Terms of Service:"
);

// ==================================================
// SECTION DATA (single source of truth for TOC + content)
// ==================================================

type TermsSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: TermsSection[] = [
  {
    id: "acceptance-of-terms",
    title: "1. Acceptance of Terms",
    body: (
      <p className="leading-relaxed text-zinc-400">
        By accessing or using MeggatronAI, you agree to be bound by these
        Terms of Service. If you do not agree with any part of these terms,
        please discontinue use of the website.
      </p>
    ),
  },
  {
    id: "use-of-the-website",
    title: "2. Use of the Website",
    body: (
      <>
        <p className="leading-relaxed text-zinc-400">
          MeggatronAI provides free, browser-based productivity tools across
          categories including AI, PDF, text, image, developer, SEO, and
          general utility tools, designed to help users complete common
          digital tasks efficiently.
        </p>
        <p className="mb-4 mt-6 font-semibold text-white">You agree not to:</p>
        <ul className="list-disc space-y-2 pl-6 text-zinc-400">
          <li>Attempt unauthorized access to our systems.</li>
          <li>Interfere with the operation of the website or its tools.</li>
          <li>Use the platform for unlawful activities.</li>
          <li>Upload, distribute, or generate malicious software or harmful content.</li>
          <li>Abuse, exploit, or misuse our services, including automated abuse.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    body: (
      <p className="leading-relaxed text-zinc-400">
        All content, branding, designs, logos, text, graphics, software, and
        website functionality available on MeggatronAI are the property of
        MeggatronAI unless otherwise stated. Unauthorized copying,
        reproduction, or redistribution of this content is prohibited.
      </p>
    ),
  },
  {
    id: "tool-accuracy-disclaimer",
    title: "4. Tool Accuracy Disclaimer",
    body: (
      <>
        <p className="leading-relaxed text-zinc-400">
          Our tools are provided for informational and productivity purposes.
          While we aim for accuracy, we do not guarantee that all outputs,
          calculations, AI-generated responses, or tool results will always
          be complete, accurate, or error-free.
        </p>
        <p className="mt-4 leading-relaxed text-zinc-400">
          You should independently verify important information before
          relying on any tool output for personal, professional, legal,
          educational, financial, or business decisions.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "5. Limitation of Liability",
    body: (
      <p className="leading-relaxed text-zinc-400">
        To the fullest extent permitted by applicable law, MeggatronAI is
        not liable for any direct, indirect, incidental, consequential,
        special, or punitive damages arising from your use of, or inability
        to use, our website, tools, or services.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "6. Third-Party Services",
    body: (
      <p className="leading-relaxed text-zinc-400">
        MeggatronAI may integrate with third-party services, including
        hosting providers, analytics platforms, and AI providers. We are not
        responsible for the practices, policies, or content of any
        third-party service. See our{" "}
        <Link href="/privacy" className="text-cyan-400 hover:underline">
          Privacy Policy
        </Link>{" "}
        for more on how data is handled.
      </p>
    ),
  },
  {
    id: "changes-to-services",
    title: "7. Changes to Services",
    body: (
      <p className="leading-relaxed text-zinc-400">
        We reserve the right to modify, suspend, discontinue, add, or remove
        features, tools, content, or services at any time, with or without
        prior notice.
      </p>
    ),
  },
  {
    id: "suspension-or-termination",
    title: "8. Suspension or Termination",
    body: (
      <p className="leading-relaxed text-zinc-400">
        We reserve the right to restrict, suspend, or terminate access to
        MeggatronAI for any user who violates these Terms of Service or
        engages in activity that may harm the website, its users, or its
        operations.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    body: (
      <p className="leading-relaxed text-zinc-400">
        These Terms of Service are governed and interpreted in accordance
        with applicable laws and regulations. Any disputes arising from
        these terms will be resolved through the appropriate legal
        channels.
      </p>
    ),
  },
  {
    id: "contact-information",
    title: "10. Contact Information",
    body: (
      <>
        <p className="leading-relaxed text-zinc-400">
          If you have questions about these Terms of Service, you can reach
          us at:
        </p>
        <p className="mt-4 font-semibold text-white">{SUPPORT_EMAIL}</p>
        <a
          href={termsQuestionMailto}
          className="mt-4 inline-block rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          Email us about these terms
        </a>
      </>
    ),
  },
];

// ==================================================
// PAGE
// ==================================================

export default function TermsOfServicePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();
  const webPageJsonLd = buildWebPageJsonLd();

  return (
    <main className="min-h-screen bg-zinc-950">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-6 pt-8">
        <ol className="flex items-center gap-2 text-sm text-zinc-500">
          <li>
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-300" aria-current="page">
            Terms of Service
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Please read these terms carefully before using MeggatronAI&apos;s
          tools and website.
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      {/* Table of contents */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <nav
          aria-label="Table of contents"
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">
            On this page
          </h2>
          <ol className="grid gap-2 sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-zinc-400 hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* Terms content */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 sm:p-10">
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                {section.body}
              </div>
            ))}
          </div>
        </div>

        {/* Commitment callout */}
        <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-zinc-900 p-10 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Our Commitment
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
            MeggatronAI is committed to providing valuable, trustworthy, and
            accessible tools. Clear terms and transparent policies are part
            of building a platform people can rely on.
          </p>
        </div>

        {/* Related links */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          Also see our{" "}
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/faq" className="text-cyan-400 hover:underline">
            FAQ
          </Link>
          , or{" "}
          <Link href="/support" className="text-cyan-400 hover:underline">
            contact support
          </Link>
          .
        </div>
      </section>
    </main>
  );
}