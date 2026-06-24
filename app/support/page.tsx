export const metadata = {
  title: "Support | MeggatronAI",
  description:
    "Get support for MeggatronAI tools, report bugs, request features, and contact our team for assistance.",
};

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">

      {/* Hero */}
      <section className="text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Support Center
        </h1>

        <p className="mx-auto max-w-3xl text-lg text-zinc-400">
          We're committed to providing a reliable experience for all
          MeggatronAI users. Whether you need assistance, want to report
          a bug, or have ideas for new features, we're here to help.
        </p>
      </section>

      {/* Contact Support */}
      <section className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="mb-4 text-3xl font-bold">
          Contact Support
        </h2>

        <p className="mb-4 text-zinc-400">
          If you experience any issues while using MeggatronAI, please
          contact our support team.
        </p>

        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
          <p className="font-semibold">
            Support Email
          </p>

          <a
            href="mailto:meggatronai@gmail.com"
            className="text-teal-400 hover:underline"
          >
            meggatronai@gmail.com
          </a>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          We aim to respond to all inquiries within 24–72 hours.
        </p>
      </section>

      {/* Report Issues */}
      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="mb-4 text-3xl font-bold">
          Report a Bug
        </h2>

        <p className="text-zinc-400">
          Found a broken feature, unexpected behavior, or technical issue?
          Please include:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-400">
          <li>The tool you were using</li>
          <li>A description of the problem</li>
          <li>Steps to reproduce the issue</li>
          <li>Screenshots (if available)</li>
          <li>Your browser and device information</li>
        </ul>
      </section>

      {/* Feature Requests */}
      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="mb-4 text-3xl font-bold">
          Request a Feature
        </h2>

        <p className="text-zinc-400">
          Have an idea for a new tool or feature? We actively review
          community suggestions and use feedback to improve MeggatronAI.
        </p>

        <p className="mt-4 text-zinc-400">
          Whether it's a productivity tool, AI feature, utility tool,
          or workflow improvement, we'd love to hear your ideas.
        </p>
      </section>

      {/* Common Support Topics */}
      <section className="mt-12">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Common Support Topics
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Account Issues
            </h3>

            <p className="text-zinc-400">
              Assistance with future account access, settings,
              and profile management.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Tool Errors
            </h3>

            <p className="text-zinc-400">
              Report problems, broken tools,
              or unexpected functionality.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Feature Requests
            </h3>

            <p className="text-zinc-400">
              Suggest new tools, categories,
              or platform improvements.
            </p>
          </div>

        </div>
      </section>

      {/* Commitment */}
      <section className="mt-16 rounded-2xl border border-teal-500/30 bg-zinc-900 p-10 text-center">
        <h2 className="mb-4 text-4xl font-bold">
          Our Commitment
        </h2>

        <p className="mx-auto max-w-3xl text-lg text-zinc-400">
          At MeggatronAI, we are committed to providing reliable,
          secure, and easy-to-use tools. User feedback plays a critical
          role in shaping the future of our platform, and every message
          helps us improve the experience for everyone.
        </p>
      </section>

    </main>
  );
}