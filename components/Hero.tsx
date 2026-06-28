"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {

  const tools = [
    { name: "PDF Merger", link: "/tools/pdf-merger" },
    { name: "Image Compressor", link: "/tools/image-compressor" },
    { name: "QR Generator", link: "/tools/qr-generator" },
    { name: "Password Tool", link: "/tools/password-tool" },
    { name: "Text Formatter", link: "/tools/text-formatter" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.png.png')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.25)_45%,rgba(0,0,0,.75)_100%)] pointer-events-none" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[180px]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6">

        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6 text-cyan-300 text-sm tracking-widest">
  BUILD. AUTOMATE. SIMPLIFY.
</div>

          {/* Heading */}
          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.05] text-white">
            Everything <br />
            <span className="bg-gradient-to-r from-cyan-300 via-white to-teal-300 bg-clip-text text-transparent">
              You Need.
            </span>
            <br />
            In One Place.
          </h1>

          {/* Description */}
          <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-zinc-300">
            Discover powerful tools for PDFs, images, coding, SEO, and productivity — all in one platform.
          </p>

          {/* Button */}
          <div className="mt-10 sm:mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-2xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 font-bold text-black transition hover:bg-cyan-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.7)]"
            >
              Explore Tools
              <ArrowRight className="ml-3" size={20} />
            </Link>
          </div>

        </div>
      </div>

      <div className="absolute right-6 sm:right-16 top-1/2 w-80 -translate-y-1/2 z-50">
  <p className="mb-6 text-center text-cyan-300 font-bold tracking-[0.35em] text-sm">
    POPULAR TOOLS
  </p>

  {tools.map((tool) => (
    <Link
      key={tool.name}
      href={tool.link}
      className="
        mb-4 flex items-center justify-center
        rounded-xl border border-white/15
        bg-black/30 px-4 py-4
        text-white text-sm font-medium

        cursor-pointer
        transition-all duration-300

        hover:text-cyan-300
        hover:border-cyan-300
        hover:bg-black/60
        hover:scale-[1.06]
        hover:shadow-[0_0_35px_rgba(34,211,238,0.9)]
      "
    >
      {tool.name}
    </Link>
  ))}
</div>

    </section>
  );
}