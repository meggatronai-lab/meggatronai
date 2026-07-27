import Link from "next/link";

export default function BlogCTA() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-10
        text-center
        md:p-14
      "
    >

      <span
        className="
          inline-flex
          rounded-full
          bg-cyan-500/10
          px-4
          py-1
          text-sm
          font-medium
          text-cyan-400
        "
      >
        MeggatronAI Tools
      </span>


      <h2
        className="
          mt-6
          text-3xl
          font-bold
          md:text-4xl
        "
      >
        Ready to work smarter?
      </h2>


      <p
        className="
          mx-auto
          mt-4
          max-w-2xl
          text-zinc-400
          leading-7
        "
      >
        Explore our AI-powered tools and productivity utilities
        designed to help you write faster, create better content,
        and simplify your daily workflow.
      </p>


      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

        <Link
          href="/tools"
          className="
            rounded-xl
            bg-cyan-500
            px-6
            py-3
            font-semibold
            text-black
            transition
            hover:bg-cyan-400
          "
        >
          Explore Tools
        </Link>


        <Link
          href="/"
          className="
            rounded-xl
            border
            border-zinc-700
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:border-cyan-500
            hover:text-cyan-400
          "
        >
          Learn More
        </Link>

      </div>


    </section>
  );
}