import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer/Footer";
import Hero from "../components/Hero";
import FeaturedTools from "../components/FeaturedTool/FeaturedToolsComponent";

export default function Home() {
  return (
    <main className="pt-20">

      {/* Hero */}
      <Hero />

      {/* Featured Tool */}
      <FeaturedTools />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Explore Categories */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-4 text-center text-5xl font-bold text-white">
            Explore Categories
          </h2>

          <p className="mb-14 text-center text-lg text-zinc-400">
            Browse our growing collection of AI-powered productivity and utility tools.
          </p>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {/* AI Tools */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                🤖
              </div>

              <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                AI Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                AI writers, assistants, summarizers and intelligent productivity solutions.
              </p>
            </div>

            {/* PDF Tools */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                📄
              </div>

              <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                PDF Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Merge, split, compress, convert and edit PDF files with ease.
              </p>
            </div>

            {/* Image Tools */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                🖼️
              </div>

              <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                Image Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Resize, compress, convert and optimize images without losing quality.
              </p>
            </div>

            {/* SEO Tools */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                📈
              </div>

              <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                SEO Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Keyword research, optimization and analytics tools to grow online.
              </p>
            </div>

            {/* Developer Tools */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                💻
              </div>

              <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                Developer Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                JSON formatters, code generators and utilities for developers.
              </p>
            </div>

            {/* Text Tools */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                ✍️
              </div>

              <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                Text Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Word counters, grammar helpers and text formatting utilities.
              </p>
            </div>

          </div>

        </div>
      </section>
            {/* Latest Articles */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-4 text-center text-5xl font-bold text-white">
            Latest Articles
          </h2>

          <p className="mb-14 text-center text-lg text-zinc-400">
            Productivity tips, AI insights, and practical guides to help you work smarter.
          </p>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Article 1 */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                Productivity
              </span>

              <h3 className="mt-6 text-2xl font-bold text-white">
                10 Ways to Save Hours Every Week Using Productivity Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Discover practical methods to automate repetitive tasks,
                organize your workflow and improve efficiency every day.
              </p>

              <div className="mt-8 text-sm text-zinc-500">
                Coming Soon →
              </div>

            </div>

            {/* Article 2 */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                Artificial Intelligence
              </span>

              <h3 className="mt-6 text-2xl font-bold text-white">
                How AI Tools Are Transforming Everyday Work
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Learn how modern AI solutions help students,
                creators and professionals work faster than ever.
              </p>

              <div className="mt-8 text-sm text-zinc-500">
                Coming Soon →
              </div>

            </div>

            {/* Article 3 */}
            <div className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                Tutorials
              </span>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Beginner's Guide to Online Productivity Tools
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Learn how to get the most out of modern online tools
                with this practical beginner-friendly guide.
              </p>

              <div className="mt-8 text-sm text-zinc-500">
                Coming Soon →
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24">

        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="relative mx-auto max-w-4xl rounded-[32px] border border-cyan-500/20 bg-zinc-900/70 p-12 text-center backdrop-blur-xl">

          <h2 className="text-4xl font-black text-white md:text-5xl">
            Ready to Boost Your Productivity?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Explore our growing collection of AI tools, PDF utilities,
            developer resources and productivity solutions built to save you time.
          </p>

          <button className="mt-10 rounded-2xl bg-cyan-400 px-10 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-300">
            Explore Tools
          </button>

        </div>

      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}