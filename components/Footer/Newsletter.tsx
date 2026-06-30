"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative px-6 py-20 lg:py-28">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12 lg:p-16">

        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2">
            <Sparkles size={16} className="text-cyan-400" />

            <span className="text-sm font-medium uppercase tracking-wider text-cyan-300">
              Newsletter
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-8 max-w-4xl text-center text-4xl font-black leading-tight text-white md:text-6xl">
          Stay Updated With

          <span className="block bg-gradient-to-r from-cyan-300 via-teal-300 to-white bg-clip-text text-transparent">
            New Tools Every Week
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-zinc-400">
          Get notified whenever we launch new AI tools, productivity apps,
          developer utilities and exclusive features.
        </p>

        {/* Form */}
        <form className="mx-auto mt-12 flex max-w-3xl flex-col gap-4 md:flex-row">

          <input
            type="email"
            placeholder="Enter your email address..."
            className="h-16 flex-1 rounded-2xl border border-white/10 bg-black/30 px-6 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-400"
          />

          <button
            type="submit"
            className="flex h-16 items-center justify-center rounded-2xl bg-cyan-400 px-8 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,.4)]"
          >
            Subscribe

            <ArrowRight
              size={20}
              className="ml-3"
            />
          </button>

        </form>

        {/* Footer Text */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          No spam. Unsubscribe anytime.
        </p>

      </div>

    </section>
  );
}