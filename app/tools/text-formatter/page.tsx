"use client";

import React, { useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Sparkles,
  Type,
  Copy,
  ClipboardPaste,
  Download,
  Trash2,
  RotateCcw,
  CaseSensitive,
  ArrowUpAZ,
  ArrowDownAZ,
  Wand2,
} from "lucide-react";

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */

type IconType = ComponentType<{ size?: number; className?: string }>;

interface StatItem {
  label: string;
  value: string | number;
}

interface FormatAction {
  label: string;
  icon: IconType;
  action: (value: string) => string;
}

interface AdvancedAction {
  title: string;
  icon: IconType;
  action: (value: string) => string;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: IconType;
}

interface StepItem {
  step: string;
  title: string;
  description: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface RelatedTool {
  title: string;
  href: string;
  description: string;
}

interface TrustStat {
  number: string;
  label: string;
}

interface ActionButtonProps {
  icon: IconType;
  title: string;
  onClick: () => void | Promise<void>;
}

/* ------------------------------------------------------------------
   Pure text-transform helpers (kept outside the component so they
   are not re-created on every render and JSX stays free of IIFEs)
------------------------------------------------------------------ */

const toTitleCase = (value: string): string =>
  value.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

const toSentenceCase = (value: string): string =>
  value
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());

const invertCase = (value: string): string =>
  [...value]
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    )
    .join("");

const removeExtraSpaces = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const removeEmptyLines = (value: string): string =>
  value
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");

const removeDuplicateLines = (value: string): string =>
  [...new Set(value.split("\n"))].join("\n");

const sortAZ = (value: string): string =>
  value
    .split("\n")
    .sort((a, b) => a.localeCompare(b))
    .join("\n");

const sortZA = (value: string): string =>
  value
    .split("\n")
    .sort((a, b) => b.localeCompare(a))
    .join("\n");

const reverseText = (value: string): string =>
  value.split("").reverse().join("");

const reverseWords = (value: string): string =>
  value.split(/\s+/).reverse().join(" ");

const reverseLines = (value: string): string =>
  value.split("\n").reverse().join("\n");

const removeLineBreaks = (value: string): string => value.replace(/\n/g, " ");

const addLineNumbers = (value: string): string =>
  value
    .split("\n")
    .map((line, index) => `${index + 1}. ${line}`)
    .join("\n");

const trimLines = (value: string): string =>
  value
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

/* ------------------------------------------------------------------
   Static configuration data (module scope, mapped over in JSX)
------------------------------------------------------------------ */

const formatActions: FormatAction[] = [
  { label: "UPPERCASE", icon: ArrowUpAZ, action: (v) => v.toUpperCase() },
  { label: "lowercase", icon: ArrowDownAZ, action: (v) => v.toLowerCase() },
  { label: "Title Case", icon: CaseSensitive, action: toTitleCase },
  { label: "Sentence Case", icon: Wand2, action: toSentenceCase },
  { label: "Invert Case", icon: CaseSensitive, action: invertCase },
  { label: "Remove Extra Spaces", icon: Wand2, action: removeExtraSpaces },
  { label: "Remove Empty Lines", icon: Wand2, action: removeEmptyLines },
  {
    label: "Remove Duplicate Lines",
    icon: Wand2,
    action: removeDuplicateLines,
  },
];

const advancedActions: AdvancedAction[] = [
  { title: "Sort A–Z", icon: ArrowUpAZ, action: sortAZ },
  { title: "Sort Z–A", icon: ArrowDownAZ, action: sortZA },
  { title: "Reverse Text", icon: RotateCcw, action: reverseText },
  { title: "Reverse Words", icon: RotateCcw, action: reverseWords },
  { title: "Reverse Lines", icon: RotateCcw, action: reverseLines },
  { title: "Remove Line Breaks", icon: Wand2, action: removeLineBreaks },
  { title: "Add Line Numbers", icon: Type, action: addLineNumbers },
  { title: "Trim Lines", icon: Type, action: trimLines },
];

const premiumFeatures: FeatureItem[] = [
  {
    title: "Lightning Fast",
    description:
      "Every transformation happens instantly while you type without waiting for a server.",
    icon: Sparkles,
  },
  {
    title: "100% Secure",
    description:
      "Everything runs locally in your browser. Your text never leaves your device.",
    icon: Copy,
  },
  {
    title: "Works Offline",
    description:
      "After loading once, you can continue formatting text even without internet.",
    icon: Download,
  },
  {
    title: "Unlimited Usage",
    description: "No limits, no subscriptions and no registrations required.",
    icon: Wand2,
  },
];

const howItWorksSteps: StepItem[] = [
  {
    step: "01",
    title: "Paste Your Text",
    description: "Paste or type any text into the editor.",
  },
  {
    step: "02",
    title: "Choose a Formatter",
    description: "Apply any formatting operation with one click.",
  },
  {
    step: "03",
    title: "Copy or Download",
    description: "Export your formatted text instantly.",
  },
];

const popularUses: string[] = [
  "Blog Writing",
  "Essay Formatting",
  "Coding Documentation",
  "Email Editing",
  "AI Prompt Cleaning",
  "Social Media Content",
];

const supportedFeatures: string[] = [
  "Uppercase Converter",
  "Lowercase Converter",
  "Title Case",
  "Sentence Case",
  "Remove Extra Spaces",
  "Remove Duplicate Lines",
  "Sort Text A–Z / Z–A",
  "Copy & Download TXT",
];

const faqs: FaqItem[] = [
  {
    q: "Is this Text Formatter free?",
    a: "Yes. Every formatting feature is completely free to use without creating an account.",
  },
  {
    q: "Does my text leave my device?",
    a: "No. All processing happens locally in your browser. Your text is never uploaded to any server.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes. The tool is fully responsive and works perfectly on phones, tablets and desktops.",
  },
  {
    q: "Can I download my formatted text?",
    a: "Absolutely. You can instantly download your formatted text as a TXT file.",
  },
  {
    q: "Is there a word limit?",
    a: "There is no practical limit for normal browser usage. The tool is optimized for handling large amounts of text.",
  },
];

const relatedTools: RelatedTool[] = [
  {
    title: "Word Counter",
    href: "/tools/word-counter",
    description: "Count words, characters, reading time and much more.",
  },
  {
    title: "QR Code Generator",
    href: "/tools/qr-generator",
    description: "Generate beautiful QR codes instantly.",
  },
  {
    title: "PDF Merger",
    href: "/tools/pdf-merger",
    description: "Merge multiple PDF files securely online.",
  },
  {
    title: "Image Compressor",
    href: "/tools/image-compressor",
    description: "Reduce image size without losing quality.",
  },
];

const trustStats: TrustStat[] = [
  { number: "50+", label: "Premium Tools" },
  { number: "100K+", label: "Monthly Users" },
  { number: "1M+", label: "Texts Formatted" },
  { number: "99.9%", label: "Browser Uptime" },
];

/* ------------------------------------------------------------------
   Small reusable presentational components (module scope, not
   nested inside the page component)
------------------------------------------------------------------ */

const ActionButton = ({ icon: Icon, title, onClick }: ActionButtonProps) => {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-5
        py-5
        text-left
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400
        hover:bg-cyan-500/10
        hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-cyan-500/10
          transition-all
          duration-300
          group-hover:bg-cyan-500/20
        "
      >
        <Icon size={22} className="text-cyan-400" />
      </div>

      <span className="font-semibold text-white">{title}</span>
    </motion.button>
  );
};

/* ------------------------------------------------------------------
   Page component
------------------------------------------------------------------ */

export default function TextFormatterPage() {
  const [text, setText] = useState("");

  /* -----------------------------
     Statistics
  ------------------------------*/

  const characters = text.length;

  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const words = useMemo(() => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  }, [text]);

  const lines = useMemo(() => {
    if (!text) return 0;
    return text.split("\n").length;
  }, [text]);

  const paragraphs = useMemo(() => {
    if (!text.trim()) return 0;
    return text.split(/\n+/).filter(Boolean).length;
  }, [text]);

  const sentences = useMemo(() => {
    if (!text.trim()) return 0;
    return text.split(/[.!?]+/).filter(Boolean).length;
  }, [text]);

  const readingTime = Math.max(1, Math.ceil(words / 200));

  const speakingTime = Math.max(1, Math.ceil(words / 130));

  const stats: StatItem[] = [
    { label: "Characters", value: characters },
    { label: "Characters (No Spaces)", value: charactersNoSpaces },
    { label: "Words", value: words },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Lines", value: lines },
    { label: "Reading Time", value: `${readingTime} min` },
    { label: "Speaking Time", value: `${speakingTime} min` },
  ];

  /* -----------------------------
     Actions
  ------------------------------*/

  const copyText = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
  };

  const pasteText = async () => {
    const clipboard = await navigator.clipboard.readText();
    setText(clipboard);
  };

  const clearText = () => {
    setText("");
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="relative overflow-hidden bg-[#050816]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300">
            <Sparkles size={16} />
            Premium AI Text Formatter
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-5xl font-black text-transparent lg:text-7xl">
            Format Text Like A Pro
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Instantly convert text to uppercase, lowercase, title case,
            sentence case, remove extra spaces, clean formatting, and much
            more — all in one premium tool.
          </p>
        </motion.section>

        {/* Editor & Live Preview */}
        <section className="mt-20">
          <div className="grid gap-8 xl:grid-cols-2">
            {/* Editor */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <Type size={22} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  Text Editor
                </h2>
              </div>

              <textarea
                aria-label="Text Formatter Input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="
                  h-[420px]
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0B1120]
                  p-5
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
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <Sparkles size={22} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  Live Preview
                </h2>
              </div>

              <div
                className="
                  h-[420px]
                  overflow-y-auto
                  whitespace-pre-wrap
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0B1120]
                  p-5
                  text-base
                  leading-8
                  text-zinc-300
                "
              >
                {text ? (
                  text
                ) : (
                  <span className="text-zinc-500">
                    Your formatted text will appear here...
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -6 }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  text-center
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/40
                  hover:shadow-[0_0_25px_rgba(34,211,238,.15)]
                "
              >
                <h3 className="text-4xl font-black text-white">
                  {item.value}
                </h3>
                <p className="mt-3 text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Formatting Tools */}
        <section className="mt-24">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
              One Click Formatting
            </div>

            <h2 className="mt-6 text-4xl font-black text-white">
              Formatting Tools
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              Clean and transform your text instantly using the tools below.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formatActions.map((item) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.label}
                  type="button"
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setText(item.action(text))}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-5
                    py-5
                    text-left
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400
                    hover:bg-cyan-500/10
                    hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                    <Icon size={22} className="text-cyan-400" />
                  </div>

                  <span className="font-semibold text-white">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Advanced Formatting */}
        <section className="mt-24">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white">
              Advanced Formatting
            </h2>

            <p className="mt-5 text-zinc-400">
              Powerful tools for organizing and transforming text.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advancedActions.map((item) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.title}
                  type="button"
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setText(item.action(text))}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-5
                    py-5
                    text-left
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400
                    hover:bg-cyan-500/10
                    hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                    <Icon size={22} className="text-cyan-400" />
                  </div>

                  <span className="font-semibold text-white">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-24">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
              Instant Actions
            </div>

            <h2 className="mt-6 text-4xl font-black text-white">
              Quick Actions
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
              Copy, paste, download or clear your text with one click.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <ActionButton icon={ClipboardPaste} title="Paste" onClick={pasteText} />
            <ActionButton icon={Copy} title="Copy" onClick={copyText} />
            <ActionButton
              icon={Download}
              title="Download TXT"
              onClick={downloadText}
            />
            <ActionButton icon={Trash2} title="Clear" onClick={clearText} />
            <ActionButton
              icon={RotateCcw}
              title="Reset"
              onClick={() => setText("")}
            />
          </div>
        </section>

        {/* Premium Features */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                Why Choose MeggatronAI
              </div>

              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
                Powerful Text Formatting Features
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
                Everything you need to clean, convert and transform text
                instantly with a modern, privacy-first experience.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {premiumFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      p-7
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:border-cyan-400/40
                      hover:shadow-[0_0_35px_rgba(34,211,238,.18)]
                    "
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                      <Icon size={26} className="text-cyan-400" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-4 leading-7 text-zinc-400">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                Three Simple Steps
              </span>

              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
                How It Works
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">
                Format your text in three quick steps.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {howItWorksSteps.map((item) => (
                <motion.div
                  key={item.step}
                  whileHover={{ y: -8 }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400/40
                    hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
                  "
                >
                  <div className="text-5xl font-black text-cyan-500/20">
                    {item.step}
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-8 text-zinc-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SEO Content */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
              backdrop-blur-2xl
              lg:p-12
            "
          >
            <div className="max-w-5xl">
              <h2 className="text-4xl font-black text-white">
                Free Online Text Formatter &amp; Case Converter
              </h2>

              <p className="mt-6 leading-8 text-zinc-400">
                MeggatronAI Text Formatter is a modern online utility that
                helps you instantly clean, organize and transform text.
                Convert text to uppercase, lowercase, title case, sentence
                case, remove duplicate lines, eliminate extra spaces and
                much more.
              </p>

              <p className="mt-6 leading-8 text-zinc-400">
                Every operation happens directly inside your browser, making
                the tool incredibly fast, private and secure. No uploads, no
                waiting and no registration required.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-2xl font-bold text-white">
                    Popular Uses
                  </h3>

                  <ul className="mt-5 space-y-3 text-zinc-400">
                    {popularUses.map((use) => (
                      <li key={use}>✓ {use}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-2xl font-bold text-white">
                    Supported Features
                  </h3>

                  <ul className="mt-5 space-y-3 text-zinc-400">
                    {supportedFeatures.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                Frequently Asked Questions
              </div>

              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
                Everything You Need To Know
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">
                Common questions about our online Text Formatter.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl space-y-6">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.q}
                  whileHover={{ y: -4 }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-7
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400/40
                  "
                >
                  <h3 className="text-xl font-bold text-white">{faq.q}</h3>

                  <p className="mt-4 leading-8 text-zinc-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Related Tools */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                Explore More Tools
              </div>

              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
                More Free Productivity Tools
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">
                Boost your workflow with our growing collection of free
                online productivity tools.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {relatedTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    href={tool.href}
                    className="
                      group
                      block
                      h-full
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      p-7
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:border-cyan-400/40
                      hover:bg-cyan-500/5
                      hover:shadow-[0_0_40px_rgba(34,211,238,.18)]
                    "
                  >
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-cyan-500/10
                        text-2xl
                        transition-all
                        duration-300
                        group-hover:bg-cyan-500/20
                      "
                    >
                      ✨
                    </div>

                    <h3
                      className="
                        mt-6
                        text-2xl
                        font-bold
                        text-white
                        transition-colors
                        group-hover:text-cyan-300
                      "
                    >
                      {tool.title}
                    </h3>

                    <p className="mt-4 leading-7 text-zinc-400">
                      {tool.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Trust Statistics */}
        <section className="mt-28">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {trustStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-8
                  text-center
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/40
                "
              >
                <h3
                  className="
                    bg-gradient-to-r
                    from-white
                    to-cyan-400
                    bg-clip-text
                    text-5xl
                    font-black
                    text-transparent
                  "
                >
                  {item.number}
                </h3>

                <p className="mt-4 text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}