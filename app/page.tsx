import ToolCard from "../components/ToolCard";

export default function Home() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="px-6 py-16">
  <div className="mx-auto max-w-6xl">

    <div className="grid gap-8 md:grid-cols-4">

      <div className="text-center">
        <h3 className="text-4xl font-bold text-teal-400">
          10+
        </h3>
        <p className="mt-2 text-zinc-400">
          Tools
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-4xl font-bold text-teal-400">
          1K+
        </h3>
        <p className="mt-2 text-zinc-400">
          Users
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-4xl font-bold text-teal-400">
          24/7
        </h3>
        <p className="mt-2 text-zinc-400">
          Availability
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-4xl font-bold text-teal-400">
          100%
        </h3>
        <p className="mt-2 text-zinc-400">
          Free Tools
        </p>
      </div>

    </div>

  </div>
</section>

      {/* Featured Tools */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-5xl font-bold">
            Featured Tools
          </h2>

          <p className="mb-14 text-center text-lg text-zinc-400">
            Discover the most popular tools on MeggatronAI.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <ToolCard
              title="AI Writer"
              description="Generate blogs, emails, social posts and content in seconds."
            />

            <ToolCard
              title="AI Summarizer"
              description="Convert lengthy articles and documents into concise summaries."
            />

            <ToolCard
              title="Password Generator"
              description="Create strong and secure passwords instantly."
            />
          </div>
        </div>
      </section>

      {/* Explore Categories */}
<section className="px-6 py-24">
  <div className="mx-auto max-w-7xl">

    <h2 className="mb-4 text-center text-5xl font-bold">
      Explore Categories
    </h2>

    <p className="mb-14 text-center text-lg text-zinc-400">
      Browse our growing collection of productivity and utility tools.
    </p>

    <div className="grid gap-8 md:grid-cols-3">

      {/* AI Tools */}
      <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
        <div className="mb-4 text-5xl">🤖</div>

        <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-teal-400">
          AI Tools
        </h3>

        <p className="mt-3 text-zinc-400">
          AI writers, assistants, summarizers and future AI solutions.
        </p>
      </div>

      {/* PDF Tools */}
      <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
        <div className="mb-4 text-5xl">📄</div>

        <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-teal-400">
          PDF Tools
        </h3>

        <p className="mt-3 text-zinc-400">
          Merge, split, compress and convert PDF documents easily.
        </p>
      </div>

      {/* Image Tools */}
      <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
        <div className="mb-4 text-5xl">🖼️</div>

        <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-teal-400">
          Image Tools
        </h3>

        <p className="mt-3 text-zinc-400">
          Resize, compress, optimize and enhance your images.
        </p>
      </div>

      {/* SEO Tools */}
      <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
        <div className="mb-4 text-5xl">📈</div>

        <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-teal-400">
          SEO Tools
        </h3>

        <p className="mt-3 text-zinc-400">
          Keyword research, optimization and SEO productivity tools.
        </p>
      </div>

      {/* Developer Tools */}
      <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
        <div className="mb-4 text-5xl">💻</div>

        <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-teal-400">
          Developer Tools
        </h3>

        <p className="mt-3 text-zinc-400">
          Coding utilities, generators and developer productivity tools.
        </p>
      </div>

      {/* Text Tools */}
      <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
        <div className="mb-4 text-5xl">✍️</div>

        <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-teal-400">
          Text Tools
        </h3>

        <p className="mt-3 text-zinc-400">
          Word counters, case converters and text optimization tools.
        </p>
      </div>

    </div>

  </div>
</section>
      {/* Why Choose Us */}
<section className="px-6 py-24">
  <h2 className="mb-4 text-center text-5xl font-bold">
    Why Choose MeggatronAI
  </h2>

  <p className="mb-12 text-center text-zinc-400">
    Everything you need to boost productivity and save time.
  </p>

  <div className="grid gap-8 md:grid-cols-4">
    <ToolCard
      title="⚡ Fast"
      description="Get results instantly with powerful tools."
    />

    <ToolCard
      title="🤖 AI Powered"
      description="Smart AI tools for productivity and creativity."
    />

    <ToolCard
      title="🔒 Secure"
      description="Your data stays protected and private."
    />

    <ToolCard
      title="🌍 Accessible"
      description="Use MeggatronAI anywhere, anytime."
    />
  </div>
</section>
{/* Latest Articles */}
<section className="px-6 py-24">
  <div className="mx-auto max-w-7xl">

    <h2 className="mb-4 text-center text-5xl font-bold">
      Latest Articles
    </h2>

    <p className="mb-14 text-center text-zinc-400">
      Productivity tips, AI insights, and practical guides to help you work smarter.
    </p>

    <div className="grid gap-8 md:grid-cols-3">

      <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal-400 hover:shadow-xl">
        <div className="mb-4 text-sm text-teal-400">
          Productivity
        </div>

        <h3 className="mb-3 text-2xl font-semibold">
          10 Ways To Save Hours Every Week Using Productivity Tools
        </h3>

        <p className="text-zinc-400">
          Discover practical methods to automate repetitive tasks and improve efficiency.
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          Coming Soon
        </p>
      </div>

      <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal-400 hover:shadow-xl">
        <div className="mb-4 text-sm text-teal-400">
          Artificial Intelligence
        </div>

        <h3 className="mb-3 text-2xl font-semibold">
          How AI Tools Are Transforming Everyday Work
        </h3>

        <p className="text-zinc-400">
          Learn how modern AI tools help students, creators, and professionals work faster.
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          Coming Soon
        </p>
      </div>

      <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal-400 hover:shadow-xl">
        <div className="mb-4 text-sm text-teal-400">
          Tutorials
        </div>

        <h3 className="mb-3 text-2xl font-semibold">
          Beginner's Guide To Using Online Productivity Tools
        </h3>

        <p className="text-zinc-400">
          A practical guide for getting the most out of digital tools and workflows.
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          Coming Soon
        </p>
      </div>

    </div>

  </div>
</section>
      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-5xl font-bold">
          Ready To Boost Your Productivity?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          Explore our growing collection of tools and accomplish more in less time.
        </p>

        <button className="mt-8 rounded-xl bg-teal-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105">
          Explore Tools
        </button>
      </section>
    </main>
  );
}