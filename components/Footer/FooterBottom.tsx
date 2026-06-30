"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <section className="border-t border-white/10 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center lg:flex-row"
      >
        {/* Copyright */}

        <p className="text-sm text-zinc-500">
          © {year}{" "}
          <span className="font-semibold text-white">
            MeggatronAI
          </span>
          . All rights reserved.
        </p>

        {/* Legal Links */}

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/privacy"
            className="text-zinc-500 transition hover:text-cyan-400"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-zinc-500 transition hover:text-cyan-400"
          >
            Terms of Service
          </Link>

          <Link
            href="/cookies"
            className="text-zinc-500 transition hover:text-cyan-400"
          >
            Cookies
          </Link>

          <Link
            href="/contact"
            className="text-zinc-500 transition hover:text-cyan-400"
          >
            Contact
          </Link>
        </div>

        {/* Made With */}

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Made with</span>

          <Heart
            size={16}
            className="fill-red-500 text-red-500 animate-pulse"
          />

          <span>
            by{" "}
            <span className="font-semibold text-cyan-400">
              MeggatronAI
            </span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}