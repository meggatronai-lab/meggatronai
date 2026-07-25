"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Clipboard,
  Trash2,
  Type,
  FileText,
  AlignLeft,
  BookOpen,
  Clock3,
  Mic,
  BarChart3,
} from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();

    const words =
      trimmed === ""
        ? 0
        : trimmed.split(/\s+/).length;

    const characters = text.length;

    const charactersNoSpaces =
      text.replace(/\s/g, "").length;

    const sentences =
      trimmed === ""
        ? 0
        : trimmed
            .split(/[.!?]+/)
            .filter(Boolean).length;

    const paragraphs =
      trimmed === ""
        ? 0
        : trimmed
            .split(/\n+/)
            .filter(Boolean).length;

    const readingTime = Math.max(
      1,
      Math.ceil(words / 200)
    );

    const speakingTime = Math.max(
      1,
      Math.ceil(words / 130)
    );

    const averageWordLength =
      words === 0
        ? 0
        : Number(
            (
              charactersNoSpaces / words
            ).toFixed(1)
          );

    const longestWord =
      trimmed === ""
        ? "-"
        : trimmed
            .split(/\s+/)
            .sort(
              (a, b) => b.length - a.length
            )[0];

    const uniqueWords =
      trimmed === ""
        ? 0
        : new Set(
            trimmed
              .toLowerCase()
              .match(/\b[\w']+\b/g) ?? []
          ).size;

    const readingLevel =
      words < 100
        ? "Very Easy"
        : words < 300
        ? "Easy"
        : words < 700
        ? "Medium"
        : words < 1200
        ? "Advanced"
        : "Expert";

    const keywordMap =
      trimmed
        .toLowerCase()
        .match(/\b[a-z]{4,}\b/g)
        ?.reduce<Record<string, number>>(
          (acc, word) => {
            acc[word] =
              (acc[word] || 0) + 1;

            return acc;
          },
          {}
        ) ?? {};

    const keywords = Object.entries(
      keywordMap
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      averageWordLength,
      longestWord,
      uniqueWords,
      readingLevel,
      keywords,
    };
  }, [text]);

  async function copyText() {
    if (!text) return;

    await navigator.clipboard.writeText(
      text
    );
  }

  async function pasteText() {
    try {
      const clipboard =
        await navigator.clipboard.readText();

      setText(clipboard);
    } catch {}
  }

  function clearText() {
    setText("");
  }

  const statCards = [
    {
      title: "Words",
      value: stats.words,
      icon: Type,
    },
    {
      title: "Characters",
      value: stats.characters,
      icon: FileText,
    },
    {
      title: "Sentences",
      value: stats.sentences,
      icon: AlignLeft,
    },
    {
      title: "Paragraphs",
      value: stats.paragraphs,
      icon: BookOpen,
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[#050816]">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,.08),transparent_65%)]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">

        {/* Hero */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .6,
          }}
          className="mx-auto max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">

            Free Online Text Analysis Tool

          </span>

          <h1
            className="
              mt-6
              bg-gradient-to-r
              from-white
              via-white
              to-cyan-400
              bg-clip-text
              text-4xl
              font-black
              tracking-tight
              text-transparent
              sm:text-5xl
              lg:text-6xl
            "
          >
            Word Counter
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">

            Instantly count words, characters,
            sentences and paragraphs while
            estimating reading time, speaking
            time and writing quality.

          </p>

        </motion.div>

        {/* Main Tool */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .15,
          }}
          className="
            mt-14
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-5
            backdrop-blur-2xl
            sm:p-8
          "
        >

          {/* Toolbar */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-white">

                Analyze Your Text

              </h2>

              <p className="mt-2 text-zinc-500">

                Type, paste or edit your content below.

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={pasteText}
                className="
                  flex items-center gap-2
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  px-4 py-3
                  text-sm
                  text-zinc-300
                  transition-all
                  hover:border-cyan-400
                  hover:text-cyan-300
                "
              >
                <Clipboard size={18} />

                Paste
              </button>

              <button
                onClick={copyText}
                className="
                  flex items-center gap-2
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  px-4 py-3
                  text-sm
                  text-zinc-300
                  transition-all
                  hover:border-cyan-400
                  hover:text-cyan-300
                "
              >
                <Copy size={18} />

                Copy
              </button>

              <button
                onClick={clearText}
                className="
                  flex items-center gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-sky-500
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:scale-105
                "
              >
                <Trash2 size={18} />

                Clear
              </button>

            </div>

          </div>
                    {/* Text Editor */}

          <div className="mt-8">

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              placeholder="Start typing or paste your text here..."
              className="
                h-72
                sm:h-80
                lg:h-[420px]
                w-full
                resize-none
                rounded-2xl
                border
                border-white/10
                bg-[#0B1120]/70
                px-5
                py-5
                text-base
                sm:text-lg
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                duration-300
                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-500/20
              "
            />

          </div>

          {/* Status Bar */}

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap gap-3">

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">

                Live Analysis

              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">

                Private

              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">

                Auto Update

              </span>

            </div>

            <p className="text-sm text-zinc-500">

              {stats.characters.toLocaleString()} characters entered

            </p>

          </div>

          {/* Statistics */}

          <div className="mt-10 grid grid-cols-2 gap-4 xl:grid-cols-4">

            {statCards.map((card, index) => {

              const Icon = card.icon;

              return (

                <motion.div
                  key={card.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-5
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400/40
                    hover:shadow-[0_0_35px_rgba(34,211,238,.15)]
                  "
                >

                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-500/20" />

                  <div className="relative">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">

                      <Icon
                        size={22}
                        className="text-cyan-400"
                      />

                    </div>

                    <h3 className="text-3xl font-black text-white lg:text-4xl">

                      {card.value.toLocaleString()}

                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">

                      {card.title}

                    </p>

                  </div>

                </motion.div>

              );

            })}

          </div>

          {/* Reading Analytics */}

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
              "
            >

              <div className="mb-6 flex items-center gap-3">

                <Clock3 className="text-cyan-400" />

                <h3 className="text-xl font-bold text-white">

                  Reading Statistics

                </h3>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-zinc-400">

                    Reading Time

                  </span>

                  <span className="font-semibold text-cyan-400">

                    {stats.readingTime} min

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-zinc-400">

                    Speaking Time

                  </span>

                  <span className="font-semibold text-cyan-400">

                    {stats.speakingTime} min

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-zinc-400">

                    Avg. Word Length

                  </span>

                  <span className="font-semibold text-cyan-400">

                    {stats.averageWordLength}

                  </span>

                </div>

              </div>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
              "
            >

              <div className="mb-6 flex items-center gap-3">

                <Mic className="text-cyan-400" />

                <h3 className="text-xl font-bold text-white">

                  Character Details

                </h3>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-zinc-400">

                    Characters

                  </span>

                  <span className="font-semibold text-cyan-400">

                    {stats.characters}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-zinc-400">

                    No Spaces

                  </span>

                  <span className="font-semibold text-cyan-400">

                    {stats.charactersNoSpaces}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-zinc-400">

                    Paragraphs

                  </span>

                  <span className="font-semibold text-cyan-400">

                    {stats.paragraphs}

                  </span>

                </div>

              </div>

            </motion.div>

          </div>
                    {/* Advanced Analytics */}

          <div className="mt-10">

            <div className="mb-6 flex items-center gap-3">

              <BarChart3 className="text-cyan-400" />

              <h3 className="text-2xl font-bold text-white">

                Advanced Writing Insights

              </h3>

            </div>

            <div className="grid gap-6 xl:grid-cols-3">

              {/* Readability */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-xl
                "
              >

                <h4 className="text-lg font-semibold text-white">

                  Readability

                </h4>

                <div className="mt-6 space-y-5">

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-400">

                      Reading Level

                    </span>

                    <span className="font-semibold text-cyan-400">

                      {stats.readingLevel}

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-400">

                      Unique Words

                    </span>

                    <span className="font-semibold text-cyan-400">

                      {stats.uniqueWords}

                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-zinc-400">

                      Longest Word

                    </span>

                    <span className="max-w-[170px] truncate font-semibold text-cyan-400">

                      {stats.longestWord}

                    </span>

                  </div>

                </div>

              </motion.div>

              {/* Keyword Density */}

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
                  delay: .1,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-xl
                "
              >

                <h4 className="text-lg font-semibold text-white">

                  Top Keywords

                </h4>

                <div className="mt-6 space-y-3">

                  {stats.keywords.length > 0 ? (

                    stats.keywords.map(
                      ([word, count]) => (

                        <div
                          key={word}
                          className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-white/5
                            bg-white/5
                            px-4
                            py-3
                          "
                        >

                          <span className="capitalize text-zinc-300">

                            {word}

                          </span>

                          <span
                            className="
                              rounded-full
                              bg-cyan-500/15
                              px-3
                              py-1
                              text-sm
                              font-semibold
                              text-cyan-400
                            "
                          >
                            {count}
                          </span>

                        </div>

                      )
                    )

                  ) : (

                    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-zinc-500">

                      Start typing to analyze keyword frequency.

                    </div>

                  )}

                </div>

              </motion.div>

              {/* AI Insights */}

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
                  delay: .2,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-xl
                "
              >

                <h4 className="text-lg font-semibold text-white">

                  Writing Insights

                </h4>

                <div className="mt-6">

                  <div className="mb-3 flex items-center justify-between text-sm">

                    <span className="text-zinc-400">

                      Content Progress

                    </span>

                    <span className="text-cyan-400">

                      {Math.min(stats.words, 1000)} / 1000

                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${Math.min(
                          (stats.words / 1000) * 100,
                          100
                        )}%`,
                      }}
                      transition={{
                        duration: .5,
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        to-sky-500
                      "
                    />

                  </div>

                  <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">

                    <p className="text-sm leading-7 text-zinc-300">

                      {stats.words === 0 &&
                        "Start typing to receive writing recommendations."}

                      {stats.words > 0 &&
                        stats.words < 150 &&
                        "Short-form content. Great for social media captions, titles and quick notes."}

                      {stats.words >= 150 &&
                        stats.words < 500 &&
                        "Balanced content length suitable for emails, landing pages and standard blog posts."}

                      {stats.words >= 500 &&
                        "Excellent long-form content suitable for detailed articles, documentation and SEO pages."}

                    </p>

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

          {/* Quick Overview */}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {[
              {
                label: "Reading Time",
                value: `${stats.readingTime} min`,
              },
              {
                label: "Speaking Time",
                value: `${stats.speakingTime} min`,
              },
              {
                label: "Unique Words",
                value: stats.uniqueWords,
              },
              {
                label: "Reading Level",
                value: stats.readingLevel,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  text-center
                "
              >

                <p className="text-sm text-zinc-500">

                  {item.label}

                </p>

                <h4 className="mt-2 text-2xl font-bold text-cyan-400">

                  {item.value}

                </h4>

              </div>

            ))}

          </div>
                  {/* SEO Content */}

        <section className="mt-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl"
          >

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl lg:p-10">

              <h2 className="text-3xl font-black text-white">

                Free Online Word Counter

              </h2>

              <p className="mt-6 leading-8 text-zinc-400">

                Our free Word Counter helps writers, students, bloggers,
                marketers, developers and professionals instantly analyze
                their writing. As you type, the tool automatically counts
                words, characters, sentences and paragraphs while providing
                estimated reading and speaking time.

              </p>

              <p className="mt-6 leading-8 text-zinc-400">

                Everything runs directly inside your browser, meaning your
                content stays private and is never uploaded to any server.
                Whether you're writing an essay, article, email, report or
                social media post, this tool provides fast and accurate
                statistics in real time.

              </p>

            </div>

          </motion.div>

        </section>

        {/* Features */}

        <section className="mt-16">

          <h2 className="mb-8 text-center text-3xl font-black text-white">

            Why Use Our Word Counter?

          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Real-Time Analysis",
                text: "Instantly updates every statistic while you type.",
              },
              {
                title: "Privacy First",
                text: "Everything stays in your browser without uploading your text.",
              },
              {
                title: "Fast Performance",
                text: "Optimized for speed even with large documents.",
              },
              {
                title: "Completely Free",
                text: "Unlimited usage with no registration required.",
              },
            ].map((feature) => (

              <motion.div
                key={feature.title}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/40
                "
              >

                <h3 className="text-xl font-bold text-white">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-zinc-400">

                  {feature.text}

                </p>

              </motion.div>

            ))}

          </div>

        </section>

        {/* How To Use */}

        <section className="mt-20">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-black text-white">

              How to Use

            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              {[
                "Paste or type your content into the editor.",
                "Watch the statistics update instantly.",
                "Review reading and speaking time.",
                "Analyze readability and keyword frequency.",
                "Copy or clear your text anytime.",
                "Use the insights to improve your writing.",
              ].map((step, index) => (

                <div
                  key={step}
                  className="flex gap-4"
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-cyan-500/15
                      font-bold
                      text-cyan-400
                    "
                  >

                    {index + 1}

                  </div>

                  <p className="pt-2 leading-7 text-zinc-300">

                    {step}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* FAQ */}

        <section className="mt-20">

          <h2 className="mb-8 text-center text-3xl font-black text-white">

            Frequently Asked Questions

          </h2>

          <div className="space-y-5">

            {[
              {
                q: "Is this Word Counter free?",
                a: "Yes. You can use it without limits and without creating an account.",
              },
              {
                q: "Is my text stored online?",
                a: "No. Your text remains inside your browser and is never uploaded.",
              },
              {
                q: "Can I use this tool on mobile?",
                a: "Absolutely. The interface is fully responsive for phones, tablets, laptops and desktop computers.",
              },
              {
                q: "How is reading time calculated?",
                a: "Reading time is estimated using an average reading speed of approximately 200 words per minute.",
              },
            ].map((faq) => (

              <div
                key={faq.q}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                "
              >

                <h3 className="text-lg font-semibold text-white">

                  {faq.q}

                </h3>

                <p className="mt-3 leading-7 text-zinc-400">

                  {faq.a}

                </p>

              </div>

            ))}

          </div>

        </section>
                {/* Related Tools */}

        <section className="mt-20">

          <h2 className="mb-8 text-center text-3xl font-black text-white">

            Related Tools

          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Character Counter",
                href: "/tools/character-counter",
                description: "Count characters with and without spaces.",
              },
              {
                title: "Case Converter",
                href: "/tools/case-converter",
                description: "Convert text between uppercase, lowercase and more.",
              },
              {
                title: "Text Reverser",
                href: "/tools/text-reverser",
                description: "Reverse words or complete text instantly.",
              },
              {
                title: "Remove Duplicate Lines",
                href: "/tools/remove-duplicate-lines",
                description: "Clean duplicate lines from your content.",
              },
            ].map((tool) => (

              <motion.div
                key={tool.title}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/40
                  hover:shadow-[0_0_35px_rgba(34,211,238,.15)]
                "
              >

                <h3 className="text-xl font-bold text-white">

                  {tool.title}

                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-400">

                  {tool.description}

                </p>

                <a
                  href={tool.href}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    text-sm
                    font-semibold
                    text-cyan-400
                    transition
                    hover:text-cyan-300
                  "
                >
                  Try Tool →

                </a>

              </motion.div>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="mt-24">

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-cyan-500/20
              bg-gradient-to-br
              from-cyan-500/10
              via-sky-500/5
              to-transparent
              p-10
              text-center
            "
          >

            <h2
              className="
                bg-gradient-to-r
                from-white
                via-white
                to-cyan-400
                bg-clip-text
                text-3xl
                font-black
                text-transparent
                lg:text-5xl
              "
            >

              More Powerful AI Tools Coming Soon

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">

              Explore premium productivity tools built for creators,
              developers, students and businesses. MeggatronAI is
              continuously expanding with powerful AI-powered utilities.

            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <a
                href="/tools"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-sky-500
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >

                Explore All Tools

              </a>

              <a
                href="/"
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-cyan-400
                  hover:text-cyan-300
                "
              >

                Back to Home

              </a>

            </div>

          </div>

        </section>

      </motion.section>

    </div>

  </main>

);
}