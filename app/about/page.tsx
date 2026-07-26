import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">

      {/* Hero */}

      <section className="text-center">

        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
          About MeggatronAI
        </span>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Turn Hours of Work Into Minutes
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          MeggatronAI is a single home for the AI tools, PDF tools, image tools,
          text tools, developer tools, and SEO tools you reach for every day.
          No downloads, no ten-tab searches, no learning curve — just free
          online tools that do the job and get out of your way.
        </p>

      </section>

      {/* Our Story */}

      <section className="mt-24">

        <div className="mx-auto max-w-4xl">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Our Story
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            It Started With a Resume, Not a Business Plan
          </h2>

          <div className="mt-10 space-y-7 text-lg leading-9 text-zinc-300">

            <p>
              I built the first version of MeggatronAI for a reason most
              people will recognize immediately.
            </p>

            <p>
              As an undergraduate student, I spent nearly
              <strong className="text-white"> four to five hours </strong>
              making my first resume. Almost none of that time went into the
              actual writing. It went into fixing formatting, realigning
              sections, converting between file types, and jumping from one
              website to another looking for a tool that just worked.
            </p>

            <p>
              By the end of it, one question stuck with me:
            </p>

            <blockquote className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-xl italic text-white">
              "Why should something this simple take this long?"
            </blockquote>

            <p>
              That question is the entire reason{" "}
              <strong className="text-white">MeggatronAI</strong> exists. Not
              a grand vision, not a five-year plan — just a genuine
              frustration with how much friction sits between people and the
              work they're actually trying to do.
            </p>

          </div>

        </div>

      </section>

      {/* Why We Built MeggatronAI */}

      <section className="mt-24">

        <div className="mx-auto max-w-4xl">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Why We Built MeggatronAI
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            One Platform Instead of a Dozen Tabs
          </h2>

          <div className="mt-10 space-y-7 text-lg leading-9 text-zinc-300">

            <p>
              The resume problem wasn't really about resumes. It was about
              how online tools are scattered everywhere — one site to merge
              a PDF, another to compress an image, a third to count words,
              a fourth that's full of ads and asks for an email address
              before it lets you download anything.
            </p>

            <p>
              MeggatronAI brings that scattered experience into one place:
              AI tools, PDF tools, image tools, text tools, developer tools,
              and SEO tools, built with the same interface, the same speed,
              and the same standard. Instead of remembering which website
              does what, you go to one platform and the tool you need is
              already there.
            </p>

            <p>
              That's the shift we're building toward — from{" "}
              <em className="text-white">
                "which site has a free tool for this?"
              </em>{" "}
              to <em className="text-white">"MeggatronAI has a tool for this."</em>
            </p>

          </div>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="mt-24">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Mission */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Our Mission
            </span>

            <h2 className="mt-4 text-3xl font-bold text-white">
              What We're Here to Do
            </h2>

            <p className="mt-6 leading-8 text-zinc-300">
              Our mission is to take the repetitive, mechanical parts of
              everyday work — formatting a document, resizing an image,
              checking a page's SEO, cleaning up text, converting a file —
              and make them take seconds instead of hours.
            </p>

            <p className="mt-5 leading-8 text-zinc-300">
              We build online tools that are genuinely free to use, fast
              enough that you never think about the loading spinner, and
              simple enough that you don't need a tutorial to use them.
              Powerful software shouldn't be reserved for people who can
              afford it — it should be available to a student the same way
              it's available to a company.
            </p>

          </div>

          {/* Vision */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Our Vision
            </span>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Where We're Headed
            </h2>

            <p className="mt-6 leading-8 text-zinc-300">
              We're building toward a platform where AI-powered productivity
              isn't a separate category of expensive software — it's just
              part of how everyday tools work.
            </p>

            <p className="mt-5 leading-8 text-zinc-300">
              Long term, that means a growing library of AI tools, document
              tools, image utilities, and developer resources that all live
              under one roof, get better over time, and stay true to the
              same standard: fast, useful, and built around how people
              actually work.
            </p>

          </div>

        </div>

      </section>

      {/* Our Principles */}

      <section className="mt-24">

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Our Principles
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white">
            How We Decide What to Build
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            We don't have a long list of corporate values. We have a short
            list of things we actually check every tool against before it
            ships.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Build useful things
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">
              If a tool doesn't solve a real problem someone actually has,
              it doesn't get built — no matter how impressive it sounds.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Keep it simple
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">
              The best tool is the one you understand in five seconds, not
              the one with the most settings.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Respect user privacy
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">
              Where it's technically possible, processing happens right in
              your browser instead of on a server, so your files and data
              stay yours.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Make tools fast
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">
              Slow software is broken software. Every tool is judged on how
              quickly it gets you to a result.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Solve real problems
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">
              We'd rather ship ten tools people use every week than a
              hundred tools nobody needs.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Always improve
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">
              Nothing on MeggatronAI is "finished." Every tool gets faster,
              cleaner, and more capable over time.
            </p>
          </div>

        </div>

      </section>

      {/* Who We Build For */}

      <section className="mt-24">

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Who We Build For
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Built for the People Doing the Work
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            MeggatronAI isn't built for one type of user — it's built for
            anyone who'd rather spend their time on the actual work instead
            of the setup around it. That includes professionals in every
            field who just want something that works the first time.
          </p>

        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">Students</h3>
            <p className="mt-3 text-zinc-400 leading-7">
              Format assignments, clean up citations, edit PDFs, and get
              resumes and reports looking right without losing an afternoon
              to it.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">Developers</h3>
            <p className="mt-3 text-zinc-400 leading-7">
              Reach for the developer tools and text utilities that save the
              small, constant chunks of time that add up across a project.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">Designers</h3>
            <p className="mt-3 text-zinc-400 leading-7">
              Resize, compress, and convert visual assets without opening
              heavier design software for a two-minute task.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">Creators</h3>
            <p className="mt-3 text-zinc-400 leading-7">
              Draft, edit, and polish content faster with AI and text tools,
              without breaking their workflow to do it.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">Marketers</h3>
            <p className="mt-3 text-zinc-400 leading-7">
              Rely on the SEO tools to check, optimize, and clean up content
              before it goes live.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-xl font-semibold text-white">
              Businesses &amp; Freelancers
            </h3>
            <p className="mt-3 text-zinc-400 leading-7">
              Use MeggatronAI as a shared, no-login utility layer for the
              small document and file tasks that show up in almost every
              project.
            </p>
          </div>

        </div>

      </section>

      {/* Why People Choose MeggatronAI */}

      <section className="mt-24">

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Why People Choose Us
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Why People Stick Around
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            Nobody keeps using a tool because of a nice headline. They keep
            using it because it works, and because using it doesn't cost
            them anything they weren't already willing to give.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold text-white">
              Free to use
            </h3>
            <p className="mt-4 leading-8 text-zinc-400">
              The tools are free to use, with no forced sign-up just to get
              a result you should have had in two clicks.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold text-white">
              Everything in one place
            </h3>
            <p className="mt-4 leading-8 text-zinc-400">
              AI tools, PDF tools, image tools, text tools, developer tools,
              and SEO tools — all in one platform, so once you're here you
              usually don't need to go looking anywhere else.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold text-white">
              Fast, without the clutter
            </h3>
            <p className="mt-4 leading-8 text-zinc-400">
              Tools load fast and don't bury the actual function under ads
              and pop-ups. It's software that respects the two minutes you
              came here to spend.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold text-white">
              Always improving
            </h3>
            <p className="mt-4 leading-8 text-zinc-400">
              MeggatronAI continues to grow with new tools and steady
              improvements based on how people actually use it.
            </p>
          </div>

        </div>

      </section>

      {/* Looking Ahead / Final CTA */}

      <section className="mt-24 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-transparent px-8 py-16 text-center">

        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Looking Ahead
        </span>

        <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">
          This Is Day One
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          MeggatronAI today is AI tools, PDF tools, image tools, text tools,
          developer tools, and SEO utilities. MeggatronAI in a year will be
          a lot more than that — we're actively building toward a wider set
          of AI-powered productivity tools, deeper document utilities, more
          developer resources, and automation features that take on entire
          workflows, not just single steps.
        </p>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
          There's no pitch at the end of this. MeggatronAI exists because
          fixing a resume for four hours was a bad way to spend an
          afternoon, and it shouldn't have taken that long — for us or for
          anyone else.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <Link
            href="/tools"
            className="rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-black transition hover:bg-cyan-400"
          >
            Explore Our Tools
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-white/10 px-7 py-4 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
          >
            Contact Us
          </Link>

        </div>

      </section>

      {/* Bottom Note */}

      <section className="mx-auto mt-20 max-w-4xl text-center">

        <p className="text-zinc-500 leading-8">
          If you've got a file to convert, a document to fix, or five
          minutes you'd rather not lose to formatting, the tools are
          already open.
        </p>

      </section>

    </main>
  );
}