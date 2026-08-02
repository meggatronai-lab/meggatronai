import Link from "next/link";

export default function BlogCTA() {
  return (
    <section
      className="
        not-prose
        mt-20
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-zinc-900
        via-[#0B1120]
        to-zinc-900
        p-8
        text-center
        shadow-xl
        md:p-14
      "
    >
      <span
        className="
          inline-flex
          items-center
          rounded-full
          border
          border-cyan-500/20
          bg-cyan-500/10
          px-4
          py-1.5
          text-sm
          font-medium
          text-cyan-400
        "
      >
        🚀 MeggatronAI Tools
      </span>

      <h2
        className="
          mt-6
          text-3xl
          font-bold
          tracking-tight
          text-white
          md:text-5xl
        "
      >
        Ready to Optimize Your Workflow?
      </h2>

      <p
        className="
          mx-auto
          mt-5
          max-w-3xl
          text-base
          leading-8
          text-zinc-300
          md:text-lg
        "
      >
        Use MeggatronAI's free online tools to compress images, edit PDFs,
        improve writing, generate SEO content, and boost productivity—all
        directly in your browser with no downloads required.
      </p>

      <div
        className="
          mt-10
          flex
          flex-col
          items-center
          justify-center
          gap-4
          sm:flex-row
        "
      >
        <Link
          href="/tools"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-cyan-500
            px-8
            py-4
            text-base
            font-semibold
            text-black
            transition-all
            duration-300
            hover:scale-105
            hover:bg-cyan-400
            sm:w-auto
          "
        >
          Explore All Tools →
        </Link>

        <Link
          href="/about"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-700
            bg-white/5
            px-8
            py-4
            text-base
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:border-cyan-500
            hover:text-cyan-400
            sm:w-auto
          "
        >
          Learn About MeggatronAI
        </Link>
      </div>
    </section>
  );
}