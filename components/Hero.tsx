import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tools = [
  {
    name: "PDF Merger",
    link: "/tools/pdf-merger",
  },
  {
    name: "Image Compressor",
    link: "/tools/image-compressor",
  },
  {
    name: "QR Generator",
    link: "/tools/qr-generator",
  },
  {
    name: "Password Tool",
    link: "/tools/password-tool",
  },
  {
    name: "Text Formatter",
    link: "/tools/text-formatter",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/hero-bg.png.webp"
        alt="MeggatronAI Background"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-[#050816]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pt-28 pb-16 lg:flex-row lg:justify-between">

        {/* Left Side */}
        <div className="max-w-3xl text-center lg:text-left">

          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Free AI & Productivity Tools
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Everything You Need.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              In One Place.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Free AI tools, PDF utilities, image editors, developer tools,
            SEO tools and productivity solutions designed to help you work
            faster every day.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

            <Link
              href="/tools"
              className="inline-flex items-center rounded-xl bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300"
            >
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Learn More
            </Link>

          </div>

        </div>

        {/* Popular Tools */}
        <div className="w-full max-w-sm">

          <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">

            <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Popular Tools
            </h2>

            <div className="grid gap-3">

              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.link}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center text-white transition hover:border-cyan-500 hover:bg-cyan-500/10"
                >
                  {tool.name}
                </Link>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}