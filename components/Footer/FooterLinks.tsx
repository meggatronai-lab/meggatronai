"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Brain,
  ShieldCheck,
  Zap,
} from "lucide-react";

const footerLinks = {
  Product: [
    { label: "All Tools", href: "/tools" },
    { label: "AI Tools", href: "/tools/ai" },
    { label: "PDF Tools", href: "/tools/pdf" },
    { label: "Image Tools", href: "/tools/image" },
    { label: "Developer Tools", href: "/tools/developer" },
  ],

  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Documentation", href: "/docs" },
    { label: "API", href: "/api" },
    { label: "Changelog", href: "/changelog" },
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
    description:
      "Modern AI tools that automate repetitive tasks and improve productivity.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description:
      "Built with privacy and security in mind for professionals and businesses.",
  },
  {
    icon: Zap,
    title: "Fast",
    description:
      "Lightning-fast performance with beautifully optimized utilities.",
  },
];

export default function FooterLinks() {
  return (
    <section className="relative overflow-hidden border-t border-zinc-800 bg-[#070B16] px-6 py-24">

      {/* Background Glow */}

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-teal-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Hero Card */}

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#091321] p-8 shadow-2xl md:p-14"
        >

          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1.3fr]">

            {/* Left */}

            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >

              <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 ring-1 ring-cyan-500/20 md:h-20 md:w-20">

                  <Sparkles
                    size={36}
                    className="text-cyan-400"
                  />

                </div>

                <div>

                  <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                    Meggatron
                    <span className="text-cyan-400">AI</span>
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-[0.45em] text-cyan-400 md:text-sm">
                    Productivity Platform
                  </p>

                </div>

              </div>

              <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400 md:text-lg md:leading-9">

                Discover a growing collection of AI tools, PDF utilities,
                developer resources, image optimizers and productivity
                solutions designed to help students, creators and
                professionals work smarter every day.

              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
                >
                  Explore Tools

                  <ArrowRight
                    size={18}
                    className="ml-2"
                  />

                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/10"
                >
                  Contact Us
                </Link>

              </div>

            </motion.div>

            {/* Right */}

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >

              <div className="grid gap-6 sm:grid-cols-3">

                {features.map((feature) => {

                  const Icon = feature.icon;

                  return (

                    <div
                      key={feature.title}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40"
                    >

                      <Icon
                        size={28}
                        className="text-cyan-400"
                      />

                      <h3 className="mt-5 text-lg font-bold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-zinc-400">
                        {feature.description}
                      </p>

                    </div>

                  );

                })}
              </div>              {/* Quick Links */}

              <div className="mt-14 border-t border-zinc-800 pt-14">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">

                  {Object.entries(footerLinks).map(
                    ([title, links], index) => (

                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.08,
                        }}
                        viewport={{ once: true }}
                      >

                        <h3 className="mb-6 text-lg font-bold text-white">
                          {title}
                        </h3>

                        <ul className="space-y-4">

                          {links.map((link) => (

                            <li key={link.label}>

                              <Link
                                href={link.href}
                                className="group flex items-center text-zinc-400 transition-all duration-300 hover:text-cyan-400"
                              >

                                <span className="mr-3 h-2 w-2 rounded-full bg-cyan-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />

                                <span>
                                  {link.label}
                                </span>

                                <ArrowRight
                                  size={15}
                                  className="ml-2 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                />

                              </Link>

                            </li>

                          ))}

                        </ul>

                      </motion.div>

                    )
                  )}

                </div>

              </div>

              {/* Trust Section */}

              <div className="mt-16 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

                  <div className="text-3xl font-black text-cyan-400">
                    50+
                  </div>

                  <h4 className="mt-3 text-lg font-semibold text-white">
                    Productivity Tools
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    AI, PDF, Image and Developer tools available from one
                    platform.
                  </p>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

                  <div className="text-3xl font-black text-cyan-400">
                    24/7
                  </div>

                  <h4 className="mt-3 text-lg font-semibold text-white">
                    Cloud Access
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Access your favourite utilities anytime from any device.
                  </p>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

                  <div className="text-3xl font-black text-cyan-400">
                    Fast
                  </div>

                  <h4 className="mt-3 text-lg font-semibold text-white">
                    Optimized Performance
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Built using modern web technologies for maximum speed.
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </motion.div>
                {/* Bottom Footer */}

        <div className="mt-20 border-t border-zinc-800 pt-10">

          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">


          </div>

        </div>

      </div>

    </section>

  );
}