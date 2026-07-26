"use client";

import { useState } from "react";

const CATEGORIES = [
  "General Question",
  "Bug Report",
  "Tool Request",
  "Feature Request",
  "Business Inquiry",
  "Partnership",
  "Other",
] as const;

const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=meggatronai@gmail.com";

const CONTACT_INFO = [
  {
    label: "Email",
    value: "meggatronai@gmail.com",
    href: GMAIL_COMPOSE_URL,
  },
  {
    label: "Response Time",
    value: "We typically reply within 1–2 business days.",
  },
  {
    label: "Support Availability",
    value: "Monitored 7 days a week, worldwide.",
  },
  {
    label: "Location",
    value: "Remote-first team serving users worldwide.",
  },
];

const FAQS = [
  {
    question: "Is MeggatronAI free to use?",
    answer:
      "Yes. The core AI tools, PDF tools, text tools, image tools, developer tools and SEO tools on MeggatronAI are free to use. We may introduce optional premium features in the future, but the free tools will remain the foundation of the platform.",
  },
  {
    question: "How long does it take to receive a reply?",
    answer:
      "Most messages get a reply within 1–2 business days. Bug reports and time-sensitive issues are usually prioritized and answered sooner. If you haven't heard back after a few days, feel free to send a follow-up.",
  },
  {
    question: "Can I request a new tool?",
    answer:
      'Yes, and we genuinely want you to. Select "Tool Request" in the form\'s category field and describe what the tool should do and why it would be useful. Real requests from real users are one of the main ways we decide what to build next.',
  },
  {
    question: "Can I report bugs?",
    answer:
      'Please do. Select "Bug Report" in the form and include what you were trying to do, what happened instead, and which browser or device you were using. The more detail you give us, the faster we can track it down and fix it.',
  },
  {
    question: "Do you accept partnerships?",
    answer:
      'Yes. We\'re open to partnerships, integrations and collaborations that make sense for a productivity-tools platform. Select "Partnership" or "Business Inquiry" in the form and tell us a bit about what you have in mind.',
  },
  {
    question: "Will more tools be added?",
    answer:
      "Yes. MeggatronAI is under active development, with new AI tools, PDF tools, image tools, developer tools and SEO tools being added on an ongoing basis. Tool requests and feedback from users directly shape what gets added next.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "",
          message: "",
        });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch {
      alert("Unable to send message.");
    }

    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="text-center">
        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
          Contact MeggatronAI
        </span>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Let&apos;s Talk
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Reach out with questions, feedback, bug reports, feature requests,
          tool suggestions, or partnership inquiries. MeggatronAI is built by
          a small team, so messages go to real people who read every one of
          them.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="mt-20 grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:col-span-3">
          <h2 className="text-2xl font-bold text-white">Send a Message</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Fill out the form below and we&apos;ll get back to you at the
            email address you provide.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="What's this about?"
                  className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-white outline-none transition-colors focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:opacity-60"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-zinc-900"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                placeholder="Tell us what's on your mind..."
                className="w-full resize-y rounded-lg border border-white/10 bg-black/20 p-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6 lg:col-span-2">
          {CONTACT_INFO.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-cyan-500/30"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                {item.label}
              </h3>
              <p className="mt-3 leading-7 text-zinc-300">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-cyan-500/40 underline-offset-4 transition-colors hover:text-cyan-400"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Requests */}
      <section className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Tool Requests
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Have an Idea for a Tool We Haven&apos;t Built Yet?
        </h2>

        <p className="mt-6 max-w-3xl leading-8 text-zinc-300">
          MeggatronAI is continuously expanding across AI tools, PDF tools,
          text tools, image tools, developer tools and SEO tools. If
          there&apos;s a tool you need for your work that doesn&apos;t exist
          here yet, we want to know about it.
        </p>

        <p className="mt-4 max-w-3xl leading-8 text-zinc-300">
          Select <span className="text-white">&quot;Tool Request&quot;</span>{" "}
          in the form above and describe what the tool should do. Requests
          from real users are one of the main ways we decide what gets built
          next.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <h2 className="text-center text-4xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {faq.question}
              </h3>
              <p className="mt-3 leading-7 text-zinc-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto mt-24 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white">
          We&apos;d Like to Hear From You
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-zinc-400">
          Whether it&apos;s a quick question, a bug you&apos;ve run into, or
          an idea for the next tool we should build, reach out any time.
        </p>

        <div className="mt-8">
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-white/10 px-7 py-4 font-semibold text-white transition-colors hover:border-cyan-500 hover:text-cyan-400"
          >
            Email Us Directly
          </a>
        </div>
      </section>
    </main>
  );
}