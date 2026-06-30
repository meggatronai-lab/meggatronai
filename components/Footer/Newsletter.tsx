"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">

      {/* ================================= */}
      {/* Animated Background */}
      {/* ================================= */}

      <div className="absolute inset-0 -z-20 overflow-hidden">

        <div className="absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[160px]" />

      </div>

      {/* Floating Blur */}

      <motion.div

        animate={{
          y: [-15, 15, -15],
        }}

        transition={{
          duration: 10,
          repeat: Infinity,
        }}

        className="absolute right-20 top-24 hidden h-52 w-52 rounded-full bg-cyan-400/10 blur-[100px] lg:block"
      />

      {/* ================================= */}
      {/* Main Card */}
      {/* ================================= */}

      <motion.div

        initial={{
          opacity: 0,
          y: 70,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: .8,
        }}

        viewport={{
          once: true,
        }}

        className="relative mx-auto max-w-7xl"
      >

        {/* Gradient Border */}

        <div className="rounded-[38px] bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 p-[1px]">

          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#080C18]/90 backdrop-blur-3xl">

            {/* Glow */}

            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[130px]" />

            <div className="relative px-6 py-14 sm:px-10 md:px-16 lg:px-20 lg:py-24">

              {/* Badge */}

              <motion.div

                initial={{
                  opacity: 0,
                  scale: .8,
                }}

                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  delay: .2,
                }}

                className="flex justify-center"
              >

                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 py-3">

                  <Sparkles
                    className="text-cyan-400"
                    size={18}
                  />

                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">

                    Join 50,000+ Smart Creators

                  </span>

                </div>

              </motion.div>

              {/* Heading */}

              <motion.h2

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: .3,
                }}

                className="mx-auto mt-10 max-w-5xl text-center text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl xl:text-7xl"
              >

                Discover The Future Of

                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-white to-teal-300 bg-clip-text text-transparent">

                  AI & Productivity

                </span>

              </motion.h2>

              {/* Description */}

              <motion.p

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: .45,
                }}

                className="mx-auto mt-8 max-w-3xl text-center text-base leading-8 text-zinc-400 sm:text-lg md:text-xl"
              >

                Get exclusive access to newly launched AI tools,
                productivity software, browser utilities,
                feature releases and premium updates delivered
                directly to your inbox every week.

              </motion.p>
                            {/* ================================ */}
              {/* Premium Form */}
              {/* ================================ */}

              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                viewport={{ once: true }}
                className="mx-auto mt-14 max-w-5xl"
              >
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl lg:flex-row lg:items-center">

                  {/* Email Input */}

                  <div className="group flex h-16 flex-1 items-center rounded-2xl border border-transparent bg-black/30 px-5 transition-all duration-300 focus-within:border-cyan-400 focus-within:bg-black/40">

                    <Mail
                      size={22}
                      className="text-cyan-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      className="ml-4 h-full w-full bg-transparent text-base text-white outline-none placeholder:text-zinc-500"
                    />

                  </div>

                  {/* Subscribe Button */}

                  <motion.button
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 px-10 py-5 font-bold text-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(34,211,238,.45)]"
                  >

                    {/* Button Glow */}

                    <div className="absolute inset-0 translate-y-full bg-white/30 transition duration-500 group-hover:translate-y-0" />

                    <span className="relative flex items-center justify-center">

                      Subscribe

                      <ArrowRight
                        size={20}
                        className="ml-3 transition duration-300 group-hover:translate-x-1"
                      />

                    </span>

                  </motion.button>

                </div>
              </motion.form>

              {/* ================================= */}
              {/* Trust Badges */}
              {/* ================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: .7,
                }}
                viewport={{
                  once: true,
                }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10"
              >

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3">

                  <ShieldCheck
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-sm text-zinc-300">
                    No Spam Ever
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3">

                  <Zap
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-sm text-zinc-300">
                    Weekly AI Updates
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3">

                  <Star
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-sm text-zinc-300">
                    100% Free Forever
                  </span>

                </div>

              </motion.div>

              {/* Bottom Text */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  delay: .85,
                }}
                viewport={{
                  once: true,
                }}
                className="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-zinc-500"
              >

                Join thousands of developers, creators, freelancers and
                businesses who rely on MeggatronAI every week to discover
                powerful online tools and AI solutions.

              </motion.p>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}