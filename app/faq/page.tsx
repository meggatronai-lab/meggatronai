export const metadata = {
  title: "FAQ | MeggatronAI",
  description:
    "Frequently asked questions about MeggatronAI, our productivity tools, AI solutions, privacy practices, and platform features.",
};

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-6 text-center text-5xl font-bold">
        Frequently Asked Questions
      </h1>

      <p className="mx-auto mb-16 max-w-3xl text-center text-lg text-zinc-400">
        Find answers to common questions about MeggatronAI, our tools,
        privacy practices, and future platform updates.
      </p>

      <div className="space-y-6">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            What is MeggatronAI?
          </h2>

          <p className="text-zinc-400">
            MeggatronAI is a productivity platform that provides utility
            tools and AI-powered solutions designed to help users complete
            tasks faster and more efficiently. Our mission is to transform
            hours of work into minutes of productivity.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            Are MeggatronAI tools free to use?
          </h2>

          <p className="text-zinc-400">
            Many tools on MeggatronAI are available free of charge.
            Additional premium features or advanced AI capabilities may be
            introduced in the future.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            Do I need to create an account?
          </h2>

          <p className="text-zinc-400">
            No. Most utility tools can be used without creating an account.
            If user accounts are introduced in the future, registration
            will only be required for specific features.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            Is my data secure?
          </h2>

          <p className="text-zinc-400">
            We take privacy and security seriously. We aim to minimize data
            collection and protect user information through secure
            technologies and industry best practices.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            Will more tools be added?
          </h2>

          <p className="text-zinc-400">
            Yes. MeggatronAI is continuously growing. We plan to add new
            productivity, utility, and AI-powered tools to better serve
            students, professionals, creators, and businesses.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            Are AI tools coming soon?
          </h2>

          <p className="text-zinc-400">
            Absolutely. AI-powered writing, summarization, productivity,
            automation, and workflow tools are part of our long-term vision
            for MeggatronAI.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            How can I contact support?
          </h2>

          <p className="text-zinc-400">
            You can contact us through our Contact page or by emailing
            meggatronai@gmail.com.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-2xl font-semibold">
            Who can use MeggatronAI?
          </h2>

          <p className="text-zinc-400">
            MeggatronAI is designed for students, professionals,
            entrepreneurs, freelancers, content creators, developers, and
            anyone looking to save time and improve productivity.
          </p>
        </div>

      </div>
    </main>
  );
}