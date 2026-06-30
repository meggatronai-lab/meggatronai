"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    "All Tools",
    "AI Tools",
    "PDF Tools",
    "Image Tools",
    "Developer Tools",
  ],
  Resources: [
    "Blog",
    "Tutorials",
    "Documentation",
    "API",
    "Changelog",
  ],
  Company: [
    "About",
    "Contact",
    "Careers",
    "Partners",
    "Affiliate Program",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Disclaimer",
  ],
};

export default function FooterLinks() {
  return (
    <section className="px-6 py-20">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-5">

          {/* Brand */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Sparkles className="text-cyan-400" />
              </div>

              <h2 className="text-3xl font-black text-white">
                Meggatron
                <span className="text-cyan-400">AI</span>
              </h2>

            </div>

            <p className="mt-6 max-w-md leading-8 text-zinc-400">
              Discover powerful AI, productivity, PDF, image and developer
              tools designed to help creators, students and professionals
              work smarter.
            </p>

          </motion.div>

          {/* Link Columns */}

          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 text-lg font-bold text-white">
                {title}
              </h3>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="group inline-flex items-center text-zinc-400 transition-all duration-300 hover:text-cyan-400"
                    >
                      <span>{link}</span>

                      <span className="ml-0 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:ml-2 group-hover:w-6" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}