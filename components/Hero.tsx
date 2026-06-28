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
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6">

        {/* LEFT CONTENT */}
        <div className="max-w-3xl text-center lg:text-left">

          <h1 className="mt-10 lg:mt-0 text-3xl sm:text-5xl lg:text-8xl font-black leading-[1.1] text-white">
            Everything <br />
            <span className="bg-gradient-to-r from-cyan-300 via-white to-teal-300 bg-clip-text text-transparent">
              You Need.
            </span>
            <br />
            In One Place.
          </h1>

          <p className="mt-6 text-sm sm:text-lg lg:text-xl text-zinc-300">
            Discover powerful tools for PDFs, images, coding, SEO, and productivity — all in one platform.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-2xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 font-bold text-black transition hover:bg-cyan-300 hover:scale-105"
            >
              Explore Tools
              <ArrowRight className="ml-3" size={20} />
            </Link>
          </div>

        </div>

        {/* RIGHT TOOLS CARD (RESPONSIVE) */}
        <div className="mt-12 lg:mt-0 w-full max-w-sm z-50">

          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5">

            <p className="mb-5 text-center text-cyan-300 font-bold tracking-[0.3em] text-sm">
              POPULAR TOOLS
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">

              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.link}
                  className="
                    flex items-center justify-center
                    rounded-xl border border-white/10
                    bg-black/30 px-3 py-3
                    text-white text-xs sm:text-sm font-medium
                    transition-all duration-300

                    hover:text-cyan-300
                    hover:border-cyan-300
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                  "
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