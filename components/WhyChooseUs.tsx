"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BrainCircuit,
  ShieldCheck,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Powerful cloud infrastructure delivers results instantly with optimized performance.",
  },
  {
    icon: BrainCircuit,
    title: "AI Powered",
    description:
      "Create content, automate workflows, and boost productivity using advanced AI.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your files and data stay protected with modern security and privacy standards.",
  },
  {
    icon: Globe,
    title: "Accessible Anywhere",
    description:
      "Use MeggatronAI seamlessly across desktop, tablet, and mobile devices.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#070B16] px-6 py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Built for Speed,
            <span className="text-cyan-400"> Powered by AI</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Everything you need to create, automate and work smarter with one
            modern AI productivity platform.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
                </div>

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Icon
                    size={30}
                    className="text-cyan-400"
                  />
                </div>

                {/* Title */}
                <h3 className="relative mt-8 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}