"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedCard() {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative h-full overflow-hidden rounded-[32px] border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl md:p-12"
    >

      {/* 🔥 Glow Effect */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* 🏷 Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2">
        <Sparkles size={16} className="text-cyan-300" />
        <span className="text-sm font-medium text-cyan-300">
          Most Popular
        </span>
      </div>

      {/* 📦 MAIN CONTENT */}
      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT SIDE */}
        <div className="max-w-xl">

          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10">
            <Bot size={44} className="text-cyan-400" />
          </div>

          {/* Title */}
          <h3 className="mt-8 text-4xl font-black text-white md:text-5xl">
            AI Writer
          </h3>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Generate blogs, articles, emails, product descriptions,
            social posts and marketing copy in seconds using AI.
          </p>

          {/* Feature Tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">
              AI Powered
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">
              Fast
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">
              Secure
            </span>
          </div>

          {/* CTA Button */}
          <Link
            href="/tools"
            className="mt-10 inline-flex items-center rounded-xl bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Launch Tool
            <ArrowRight className="ml-3" size={20} />
          </Link>

        </div>

        {/* RIGHT SIDE (BIG ICON CIRCLE) */}
        <div className="flex justify-center">
          <div className="flex h-72 w-72 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl">
            <Bot size={140} className="text-cyan-400" />
          </div>
        </div>

      </div>

    </motion.div>
  );
}