import Background from "./Background";
import ToolCategories from "./ToolCategories";
import FeaturedCard from "./FeaturedCard";
import ToolGrid from "./ToolGrid";

export default function FeaturedTools() {
  return (
    <section className="relative bg-[#050816] py-24">
      <Background />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-400">
            FEATURED TOOLS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Powerful Tools.
            <br />
            Zero Complexity.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Explore our growing collection of AI, PDF, Image, SEO,
            Developer and Text tools built to save you time.
          </p>

        </div>

        {/* Categories */}
        <div className="mt-12">
          <ToolCategories />
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">

          <div className="lg:col-span-5">
            <FeaturedCard />
          </div>

          <div className="lg:col-span-7">
            <ToolGrid />
          </div>

        </div>

        {/* Button */}

        <div className="mt-16 flex justify-center">

          <a
            href="/tools"
            className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 font-medium text-cyan-400"
          >
            Explore All Tools
          </a>

        </div>

      </div>
    </section>
  );
}