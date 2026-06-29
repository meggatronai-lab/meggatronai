"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Background from "./Background";
import ToolCategories from "./ToolCategories";
import FeaturedCard from "./FeaturedCard";
import ToolGrid from "./ToolGrid";

export default function FeaturedToolsComponent() {

  const [activeCategory, setActiveCategory] = useState("AI");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">

      {/* 🌌 Background */}
      <Background />

      {/* ✨ Animated Container */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >

        {/* 🏷 Header */}
        <div className="text-center">

          <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-md">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Featured Tools
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-white md:text-6xl lg:text-7xl leading-tight">
            Powerful Tools
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-white bg-clip-text text-transparent">
              Designed For Everyone
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-300 text-lg">
            Explore AI, PDF, image, developer and productivity tools to simplify your workflow.
          </p>

        </div>

        {/* 🎯 Categories */}
        <div className="mt-14">
          <ToolCategories
            active={activeCategory}
            setActive={setActiveCategory}
          />
        </div>

        {/* 🧩 MAIN GRID */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">

          {/* ⭐ LEFT */}
          <FeaturedCard />

          {/* 🧱 RIGHT */}
          <ToolGrid activeCategory={activeCategory} />

        </div>

        {/* 🔘 BUTTON */}
        <div className="mt-16 flex justify-center">
          <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_25px_rgba(34,211,238,.2)]">
            View All Tools
          </button>
        </div>

      </motion.div>
    </section>
  );
}