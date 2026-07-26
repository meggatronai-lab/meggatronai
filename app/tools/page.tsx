"use client";

import Link from "next/link";
import { toolCategories } from "@/data/tools";

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <section className="mb-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          All Tools
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">
          Explore our growing collection of free online AI, PDF, Image,
          Text, Developer and SEO tools built to improve productivity.
        </p>
      </section>

      {/* Categories */}
      <div className="space-y-20">
        {toolCategories.map((category) => {
          const Icon = category.icon;

          return (
            <section key={category.id}>
              {/* Category Heading */}
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-xl bg-cyan-500/10 p-3">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {category.title}
                  </h2>

                  <p className="text-sm text-zinc-500">
                    {category.tools.length} Tool
                    {category.tools.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Tool Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) =>
                  tool.live ? (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="group rounded-2xl border border-white/10 bg-[#111827] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      <div className="mb-5">
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                          LIVE
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {tool.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-zinc-400">
                        {tool.description}
                      </p>
                    </Link>
                  ) : (
                    <div
                      key={tool.name}
                      className="rounded-2xl border border-white/10 bg-[#111827] p-6 opacity-70"
                    >
                      <div className="mb-5">
                        <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-300">
                          COMING SOON
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white">
                        {tool.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-zinc-400">
                        {tool.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom Section */}
      <section className="mt-24 rounded-3xl border border-white/10 bg-[#111827] p-10 text-center">
        <h2 className="text-3xl font-bold text-white">
          More Tools Coming Soon
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          We're constantly expanding MeggatronAI with new AI, PDF, Image,
          Developer and SEO tools. Check back regularly to discover the latest
          additions.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Request a Tool
        </Link>
      </section>
    </main>
  );
}