import type { Metadata } from "next";
import Link from "next/link";

// ==================================================
// SEO METADATA
// ==================================================

const SITE_URL = "https://meggatronai.com";
const PAGE_URL = `${SITE_URL}/privacy`;
const LAST_UPDATED = "June 2026";

export const metadata: Metadata = {
  title: "Privacy Policy – MeggatronAI",
  description:
    "Read MeggatronAI's Privacy Policy to learn what information is collected, how it is used, how cookies and third-party services work, and your rights as a user.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy – MeggatronAI",
    description:
      "Read MeggatronAI's Privacy Policy to learn what information is collected, how it is used, how cookies and third-party services work, and your rights as a user.",
    url: PAGE_URL,
    siteName: "MeggatronAI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy – MeggatronAI",
    description:
      "Read MeggatronAI's Privacy Policy to learn what information is collected, how it is used, how cookies and third-party services work, and your rights as a user.",
  },
};

// ==================================================
// SECTION DATA (single source of truth for TOC + content)
// ==================================================

type PolicySection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: (
      <p className="leading-relaxed text-zinc-400">
        Welcome to MeggatronAI (&quot;we,&quot; &quot;our,&quot; or
        &quot;us&quot;). This Privacy Policy explains what information we
        collect, how we use it, and the choices you have when you use our
        website and tools. By using MeggatronAI, you agree to the practices
        described in this policy.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: (
      <>
        <p className="leading-relaxed text-zinc-400">
          We may collect information that you voluntarily provide, such as
          through contact forms, emails, or other communication with us.
          This can include:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-400">
          <li>Your name and contact information.</li>
          <li>Your email address.</li>
          <li>Feedback, bug reports, or support requests.</li>
          <li>Information submitted through contact or suggestion forms.</li>
        </ul>
        <p className="mt-6 leading-relaxed text-zinc-400">
          We may also automatically collect certain technical information
          when you visit the site, such as browser type, device information,
          pages visited, approximate location derived from IP address, and
          general usage statistics. Some tools on MeggatronAI process files
          or text you submit in order to perform the requested task; how
          that content is handled can vary by tool, since some tools run
          entirely in your browser while others may need to send data to a
          server to complete the task.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Information",
    body: (
      <>
        <ul className="list-disc space-y-2 pl-6 text-zinc-400">
          <li>To provide and improve our tools and services.</li>
          <li>To respond to inquiries, feedback, and support requests.</li>
          <li>To understand how the website is used and where it can be improved.</li>
          <li>To help maintain security and prevent misuse of the platform.</li>
          <li>To guide the development of new tools and features.</li>
        </ul>
        <p className="mt-6 leading-relaxed text-zinc-400">
          MeggatronAI does not sell personal information to third parties.
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-analytics",
    title: "4. Cookies and Analytics",
    body: (
      <p className="leading-relaxed text-zinc-400">
        We may use cookies and similar analytics technologies to understand
        how visitors use the site and to help improve functionality and user
        experience. You can disable cookies at any time through your browser
        settings; doing so may affect some non-essential functionality but
        will not prevent you from using most tools.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "5. Third-Party Services",
    body: (
      <p className="leading-relaxed text-zinc-400">
        MeggatronAI may rely on trusted third-party providers for services
        such as hosting, analytics, security, and certain AI-powered
        features. These providers may process information according to
        their own privacy policies, and we choose providers with a focus on
        reliability and data protection.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "6. Data Security",
    body: (
      <p className="leading-relaxed text-zinc-400">
        We take reasonable steps to help protect information from
        unauthorized access, misuse, or disclosure. That said, no method of
        transmission over the internet or electronic storage is completely
        secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "7. Children's Privacy",
    body: (
      <p className="leading-relaxed text-zinc-400">
        MeggatronAI is not intended for children under the age of 13, and we
        do not knowingly collect personal information from children. If you
        believe a child has provided us with personal information, please
        contact us so it can be removed.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "8. External Links",
    body: (
      <p className="leading-relaxed text-zinc-400">
        Our website may contain links to external websites. We are not
        responsible for the content, privacy practices, or policies of any
        third-party sites, and we encourage you to review their policies
        before providing any information.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "9. Your Rights",
    body: (
      <p className="leading-relaxed text-zinc-400">
        Depending on where you live, you may have rights regarding your
        personal information, such as the right to access, update, correct,
        or request deletion of information we hold about you. To exercise
        any of these rights, contact us using the details below.
      </p>
    ),
  },
  {
    id: "changes-to-this-policy",
    title: "10. Changes to This Policy",
    body: (
      <p className="leading-relaxed text-zinc-400">
        We may update this Privacy Policy from time to time. Any changes
        will be posted on this page along with an updated revision date, so
        we encourage you to review it periodically.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "11. Contact Us",
    body: (
      <>
        <p className="leading-relaxed text-zinc-400">
          If you have questions about this Privacy Policy or how your
          information is handled, you can reach us at:
        </p>
        <p className="mt-4 font-semibold text-white">
          meggatronai@gmail.com
        </p>
        <p className="mt-2 leading-relaxed text-zinc-400">
          You can also visit our{" "}
          <Link href="/contact" className="text-cyan-400 hover:underline">
            Contact page
          </Link>
          .
        </p>
      </>
    ),
  },
];

// ==================================================
// PAGE
// ==================================================

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
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
            Privacy Policy
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          How MeggatronAI collects, uses, and protects information when you
          use our website and tools.
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

      {/* Policy content */}
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
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Our Commitment
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-zinc-400">
            We believe trust is earned through transparency and responsible
            use of technology. Our goal is to build tools that help you get
            things done faster, while being upfront about what information
            is collected and how it&apos;s used.
          </p>
        </div>

        {/* Related links */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          Have questions?{" "}
          <Link href="/contact" className="text-cyan-400 hover:underline">
            Contact us
          </Link>{" "}
          or read our{" "}
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms of Service
          </Link>
          .
        </div>
      </section>
    </main>
  );
}