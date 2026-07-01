"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  Product: [
    { label: "All Tools", href: "/tools" },
    { label: "AI Tools", href: "/tools/ai" },
    { label: "PDF Tools", href: "/tools/pdf" },
    { label: "Developer Tools", href: "/tools/developer" },
  ],

  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Documentation", href: "/docs" },
    { label: "API", href: "/api" },
  ],

  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
  ],

  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const features = [
  {
    icon: Brain,
    title: "AI Powered",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
  },
  {
    icon: Zap,
    title: "Fast",
  },
];

export default function FooterLinks() {
  return (
    <section className="relative overflow-hidden border-t border-zinc-800 bg-[#070B16]">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#0A1220] p-8 md:p-10"
        >
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
            {/* Left Side */}
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
                  <Sparkles className="text-cyan-400" size={30} />
                </div>

                <div>
                  <h2 className="text-3xl font-black text-white">
                    Meggatron
                    <span className="text-cyan-400">AI</span>
                  </h2>

                  <p className="mt-1 text-xs uppercase tracking-[0.35em] text-cyan-400">
                    Productivity Platform
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-md leading-7 text-zinc-400">
                Powerful AI, PDF, Image and Developer tools designed to help
                creators, students and professionals work faster.
              </p>

              <Link
                href="/tools"
                className="mt-8 inline-flex items-center rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-cyan-400 hover:scale-105"
              >
                Explore Tools
                <ArrowRight className="ml-2" size={18} />
              </Link>

              {/* Feature Pills */}

              <div className="mt-10 flex flex-wrap gap-3">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3"
                    >
                      <Icon size={18} className="text-cyan-400" />

                      <span className="text-sm text-zinc-300">
                        {feature.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side */}
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {Object.entries(footerLinks).map(([title, links], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <h3 className="mb-5 text-lg font-bold text-cyan-300 [text-shadow:0_0_8px_rgba(34,211,238,0.8),0_0_16px_rgba(34,211,238,0.5)]">
  {title}
</h3>

                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center text-zinc-400 transition-all duration-300 hover:text-cyan-400"
                        >
                          {link.label}

                          <ArrowRight
                            size={14}
                            className="ml-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}