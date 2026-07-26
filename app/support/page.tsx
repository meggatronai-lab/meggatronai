import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  ChevronRight,
  Clock3,
  FileQuestion,
  Lightbulb,
  Mail,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const SITE_URL = "https://meggatronai.com";

const PAGE_URL = `${SITE_URL}/support`;

const SUPPORT_EMAIL = "meggatronai@gmail.com";

const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=meggatronai@gmail.com";

export const metadata: Metadata = {
  title: "Support Center | Get Help with MeggatronAI",
  description:
    "Get help with MeggatronAI tools, report bugs, request new features, ask questions, or contact the MeggatronAI team directly.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Support Center | Get Help with MeggatronAI",
    description:
      "Get help with MeggatronAI tools, report bugs, request features, and contact our team.",
    url: PAGE_URL,
    siteName: "MeggatronAI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Support Center | Get Help with MeggatronAI",
    description:
      "Get help with MeggatronAI tools, report bugs, request features, and contact our team.",
  },
};

const supportOptions = [
  {
    icon: Bug,
    eyebrow: "Something not working?",
    title: "Report a bug",
    description:
      "Tell us what happened and help us improve the tool for everyone.",
    href: "/contact?category=Bug%20Report",
    linkLabel: "Report an issue",
  },
  {
    icon: Lightbulb,
    eyebrow: "Have an idea?",
    title: "Request a feature",
    description:
      "Suggest a new tool, workflow, or improvement you would like to see.",
    href: "/contact?category=Feature%20Request",
    linkLabel: "Suggest an idea",
  },
  {
    icon: MessageCircleQuestion,
    eyebrow: "Need an answer?",
    title: "Browse the FAQ",
    description:
      "Find answers about tools, accounts, privacy, files, and the platform.",
    href: "/faq",
    linkLabel: "Explore FAQs",
  },
  {
    icon: Users,
    eyebrow: "Want to work together?",
    title: "Partnerships",
    description:
      "Reach out about partnerships, collaborations, integrations, or business opportunities.",
    href: "/contact?category=Partnership",
    linkLabel: "Start a conversation",
  },
];

const breadcrumbJsonLd = {
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
      name: "Support",
      item: PAGE_URL,
    },
  ],
};

const supportPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "MeggatronAI Support Center",
  url: PAGE_URL,
  description:
    "Support center for MeggatronAI users seeking help, bug reporting, feature requests, and partnership inquiries.",
  mainEntity: {
    "@type": "Organization",
    name: "MeggatronAI",
    url: SITE_URL,
    email: SUPPORT_EMAIL,
  },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd,
            supportPageJsonLd,
          ]).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-180px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-20 flex items-center gap-2 text-sm text-zinc-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-cyan-400"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" aria-hidden="true" />

            <span className="text-zinc-300" aria-current="page">
              Support
            </span>
          </nav>

          {/* Hero Content */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              MeggatronAI Support
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Need a hand?
              <span className="block text-zinc-400">
                We&apos;re here to help.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              Whether you found a bug, have an idea for a new tool, or simply
              have a question about MeggatronAI, choose the option that best
              matches what you need.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <Clock3
                  className="h-4 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                Typical response: 1–2 business days
              </span>

              <span className="hidden h-4 w-px bg-white/10 sm:block" />

              <span className="inline-flex items-center gap-2">
                <ShieldCheck
                  className="h-4 w-4 text-cyan-400"
                  aria-hidden="true"
                />
                Real human support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            How can we help?
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Choose the right place to start
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            Most questions and requests can be handled quickly through one of
            the options below.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {supportOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.title}
                href={option.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon
                      className="h-5 w-5 text-cyan-400"
                      aria-hidden="true"
                    />
                  </div>

                  <ArrowRight
                    className="h-5 w-5 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-cyan-400"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {option.eyebrow}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {option.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  {option.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                  {option.linkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Direct Contact */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-8 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <Mail
                  className="h-5 w-5 text-cyan-400"
                  aria-hidden="true"
                />
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Have a question that doesn&apos;t fit?
              </h2>

              <p className="mt-4 leading-7 text-zinc-400">
                You can contact the MeggatronAI team directly by email for
                general questions, business inquiries, or anything else you
                would like us to know.
              </p>

              <p className="mt-4 break-all text-sm font-medium text-cyan-400">
                {SUPPORT_EMAIL}
              </p>
            </div>

            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email MeggatronAI
            </a>
          </div>
        </div>
      </section>

      {/* Bug Report Guide */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Reporting an issue
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Help us solve problems faster
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              If you are reporting a bug, a few extra details can make it much
              easier for us to understand and reproduce the problem.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div className="space-y-5">
              {[
                "The name of the tool you were using",
                "What you expected to happen",
                "What happened instead",
                "Steps that reproduce the issue",
                "Your browser and device",
              ].map((item, index) => (
                <div key={item} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-400">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-sm leading-6 text-zinc-500">
                Screenshots can also be useful when explaining unexpected
                behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 sm:flex">
                <FileQuestion
                  className="h-5 w-5 text-cyan-400"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Have a general question?
                </h2>

                <p className="mt-2 max-w-xl leading-7 text-zinc-400">
                  Check the MeggatronAI FAQ for answers about the platform,
                  tools, privacy, accounts, and common questions.
                </p>
              </div>
            </div>

            <Link
              href="/faq"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 font-semibold text-white transition-colors hover:border-cyan-400/50 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Visit FAQ
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          We&apos;re listening
        </p>

        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Your feedback helps shape MeggatronAI.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
          Every bug report, suggestion, and question helps us build better
          tools and a more useful experience for everyone.
        </p>

        <a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Contact MeggatronAI
        </a>
      </section>
    </main>
  );
}