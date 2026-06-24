export const metadata = {
  title: "Blog | MeggatronAI",
  description:
    "Explore productivity tips, AI insights, tool guides, and technology articles from MeggatronAI.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">

      <section className="text-center">
        <h1 className="mb-6 text-5xl font-bold">
          MeggatronAI Blog
        </h1>

        <p className="mx-auto max-w-3xl text-lg text-zinc-400">
          Insights, productivity tips, AI trends, tutorials, and guides
          designed to help you work smarter and stay ahead.
        </p>
      </section>

      <section className="mt-20">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">

          <h2 className="text-3xl font-bold">
            Articles Coming Soon
          </h2>

          <p className="mt-4 text-zinc-400">
            We're currently preparing high-quality content covering
            productivity, AI tools, digital workflows, business growth,
            and technology trends.
          </p>

          <p className="mt-6 text-zinc-500">
            Check back soon for new articles and tutorials.
          </p>

        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-8 text-center text-4xl font-bold">
          What You'll Find Here
        </h2>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Productivity Guides
            </h3>

            <p className="text-zinc-400">
              Learn practical strategies to save time and improve your workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              AI Insights
            </h3>

            <p className="text-zinc-400">
              Stay updated with the latest developments in artificial intelligence.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Tool Tutorials
            </h3>

            <p className="text-zinc-400">
              Step-by-step guides showing how to get the most from our tools.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}