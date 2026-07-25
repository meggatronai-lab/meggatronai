"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCodeStyling from "qr-code-styling";
import {
  Sparkles,
  Palette,
  Link2,
  Type,
  Mail,
  Phone,
  MessageCircle,
  Wifi,
  MapPin,
  UserRound,
  Download,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

type QRTypeId =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "wifi"
  | "location"
  | "contact";

interface QRTypeOption {
  id: QRTypeId;
  label: string;
  icon: LucideIcon;
  placeholder: string;
}

interface FeatureItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface RelatedTool {
  title: string;
  desc: string;
  href: string;
}

interface StatItem {
  value: string;
  label: string;
}

const QR_TYPES: QRTypeOption[] = [
  { id: "url", label: "Website", icon: Link2, placeholder: "https://example.com" },
  { id: "text", label: "Text", icon: Type, placeholder: "Enter your text..." },
  { id: "email", label: "Email", icon: Mail, placeholder: "name@example.com" },
  { id: "phone", label: "Phone", icon: Phone, placeholder: "+923001234567" },
  { id: "sms", label: "SMS", icon: MessageCircle, placeholder: "Enter your SMS..." },
  { id: "wifi", label: "WiFi", icon: Wifi, placeholder: "WIFI:T:WPA;S:Network;P:Password;;" },
  { id: "location", label: "Location", icon: MapPin, placeholder: "24.8607,67.0011" },
  { id: "contact", label: "Contact", icon: UserRound, placeholder: "John Doe" },
];

const QUICK_THEME_COLORS = ["#06b6d4", "#7c3aed", "#10b981", "#ef4444"];

const FEATURES: FeatureItem[] = [
  {
    title: "Instant Generation",
    text: "Your QR code updates live while you type.",
    icon: Sparkles,
  },
  {
    title: "Custom Colors",
    text: "Personalize foreground and background colors.",
    icon: Palette,
  },
  {
    title: "Multiple Formats",
    text: "Download in PNG and SVG formats.",
    icon: Download,
  },
  {
    title: "Fully Responsive",
    text: "Works perfectly on desktop, tablet and mobile.",
    icon: Sparkles,
  },
];

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Choose QR Type",
    description: "Select Website, Text, Email, Phone, WiFi, SMS, Contact or Location.",
  },
  {
    number: "02",
    title: "Customize Design",
    description: "Choose colors, rounded style, size and instantly preview your QR code.",
  },
  {
    number: "03",
    title: "Download",
    description: "Export your QR Code in high-quality PNG or SVG format.",
  },
];

const FAQS: FAQItem[] = [
  {
    q: "Is this QR Generator completely free?",
    a: "Yes. You can generate unlimited QR Codes without paying anything.",
  },
  {
    q: "Do the QR Codes expire?",
    a: "No. Static QR Codes generated here never expire.",
  },
  {
    q: "Can I use them commercially?",
    a: "Absolutely. You can use them for businesses, restaurants, products and marketing.",
  },
  {
    q: "What download formats are available?",
    a: "You can download your QR Code as PNG and SVG.",
  },
];

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Word Counter",
    desc: "Count words, characters and reading time.",
    href: "/tools/word-counter",
  },
  {
    title: "Image Compressor",
    desc: "Compress images without losing quality.",
    href: "/tools/image-compressor",
  },
  {
    title: "PDF Merger",
    desc: "Merge multiple PDF files instantly.",
    href: "/tools/pdf-merger",
  },
  {
    title: "AI Text Summarizer",
    desc: "Summarize long articles in seconds.",
    href: "/tools/ai-summarizer",
  },
];

const STATS: StatItem[] = [
  { value: "100%", label: "Free Forever" },
  { value: "8+", label: "QR Types" },
  { value: "PNG + SVG", label: "Downloads" },
  { value: "24/7", label: "Available" },
];

const WHY_CHOOSE_LIST = [
  "✓ Unlimited QR Codes",
  "✓ No Watermarks",
  "✓ High Resolution",
  "✓ Instant Preview",
  "✓ Fast Downloads",
  "✓ Mobile Friendly",
];

const SUPPORTED_TYPES_LIST = [
  "✓ Website URL",
  "✓ Plain Text",
  "✓ Email Address",
  "✓ Phone Number",
  "✓ SMS",
  "✓ WiFi",
  "✓ Contact Card",
  "✓ GPS Location",
];

const TRUST_LIST = [
  "✓ No registration required",
  "✓ Unlimited QR generation",
  "✓ High-resolution downloads",
  "✓ Mobile responsive",
  "✓ Modern SaaS design",
  "✓ Lightning-fast performance",
];

const DEFAULT_FOREGROUND = "#06b6d4";
const DEFAULT_BACKGROUND = "#ffffff";
const DEFAULT_SIZE = 320;
const DEFAULT_DATA_FALLBACK = "https://meggatronai.com";

function getPlaceholder(type: QRTypeId): string {
  const match = QR_TYPES.find((item) => item.id === type);
  return match ? match.placeholder : "Enter your text...";
}

export default function QRGeneratorPage() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  const [qrType, setQrType] = useState<QRTypeId>("url");
  const [content, setContent] = useState("");
  const [foreground, setForeground] = useState(DEFAULT_FOREGROUND);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [rounded, setRounded] = useState(true);

  useEffect(() => {
    const options = {
      width: size,
      height: size,
      data: content || DEFAULT_DATA_FALLBACK,
      margin: 10,
      dotsOptions: {
        color: foreground,
        type: rounded ? ("rounded" as const) : ("square" as const),
      },
      cornersSquareOptions: {
        type: rounded ? ("extra-rounded" as const) : ("square" as const),
      },
      cornersDotOptions: {
        type: rounded ? ("dot" as const) : ("square" as const),
      },
      backgroundOptions: {
        color: background,
      },
      imageOptions: {
        crossOrigin: "anonymous" as const,
      },
    };

    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling(options);
      if (qrRef.current) {
        qrInstance.current.append(qrRef.current);
      }
    } else {
      qrInstance.current.update(options);
    }
  }, [content, foreground, background, size, rounded]);

  const downloadPNG = async () => {
    await qrInstance.current?.download({
      extension: "png",
      name: "meggatronai-qr",
    });
  };

  const downloadSVG = async () => {
    await qrInstance.current?.download({
      extension: "svg",
      name: "meggatronai-qr",
    });
  };

  const resetSettings = () => {
    setForeground(DEFAULT_FOREGROUND);
    setBackground(DEFAULT_BACKGROUND);
    setRounded(true);
    setSize(DEFAULT_SIZE);
    setContent("");
    setQrType("url");
  };

  const handleTypeSelect = (id: QRTypeId) => {
    setQrType(id);
    setContent("");
  };

  return (
    <main className="relative overflow-x-hidden bg-[#050816]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 sm:px-5">
            <Sparkles size={16} />
            Stylish QR Code Generator
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl lg:text-7xl">
            Create Beautiful QR Codes
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Generate premium QR codes with custom colors, rounded styles,
            instant downloads and a beautiful live preview.
          </p>
        </motion.section>

        <section className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-6 lg:p-8"
          >
            <div className="flex items-center gap-3">
              <Palette size={24} className="text-cyan-400" />
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                QR Generator
              </h2>
            </div>

            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Choose a QR type, customize the design, preview it instantly
              and download in high quality.
            </p>

            <div className="mt-8 sm:mt-10">
              <label className="mb-4 block text-sm font-medium text-zinc-300">
                QR Type
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {QR_TYPES.map((item) => {
                  const Icon = item.icon;
                  const isActive = qrType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTypeSelect(item.id)}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition-all duration-300 sm:gap-3 sm:p-4 ${
                        isActive
                          ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,.2)]"
                          : "border-white/10 bg-white/[0.03] hover:border-cyan-400/40"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={isActive ? "text-cyan-400" : "text-zinc-400"}
                      />
                      <span
                        className={`text-xs sm:text-sm ${
                          isActive
                            ? "font-semibold text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <label className="mb-3 block text-sm font-medium text-zinc-300">
                QR Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={getPlaceholder(qrType)}
                className="h-40 w-full resize-none rounded-2xl border border-white/10 bg-[#0B1120] p-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 sm:h-44 sm:p-5 sm:text-base"
              />
            </div>

            <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm text-zinc-300">
                  Foreground Color
                </label>
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="h-14 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm text-zinc-300">
                  Background Color
                </label>
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="h-14 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">
                  QR Size
                </span>
                <span className="font-semibold text-cyan-400">{size}px</span>
              </div>
              <input
                type="range"
                min={180}
                max={700}
                step={10}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="mt-8 sm:mt-10">
              <label className="mb-4 block text-sm font-medium text-zinc-300">
                QR Style
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRounded(true)}
                  className={`rounded-xl border px-4 py-3 text-sm transition-all sm:px-5 sm:py-4 sm:text-base ${
                    rounded
                      ? "border-cyan-400 bg-cyan-500/10 text-white"
                      : "border-white/10 text-zinc-400"
                  }`}
                >
                  Rounded
                </button>
                <button
                  type="button"
                  onClick={() => setRounded(false)}
                  className={`rounded-xl border px-4 py-3 text-sm transition-all sm:px-5 sm:py-4 sm:text-base ${
                    !rounded
                      ? "border-cyan-400 bg-cyan-500/10 text-white"
                      : "border-white/10 text-zinc-400"
                  }`}
                >
                  Square
                </button>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-6 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Live Preview
              </h2>
              <Sparkles size={20} className="text-cyan-400" />
            </div>

            <div className="mt-6 flex justify-center overflow-hidden rounded-3xl border border-white/10 bg-white p-4 sm:mt-8 sm:p-8">
              <div ref={qrRef} className="max-w-full [&>canvas]:h-auto [&>canvas]:max-w-full [&>svg]:h-auto [&>svg]:max-w-full" />
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
              <button
                type="button"
                onClick={downloadPNG}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] sm:py-4 sm:text-base"
              >
                <Download size={18} />
                Download PNG
              </button>

              <button
                type="button"
                onClick={downloadSVG}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400 sm:py-4 sm:text-base"
              >
                <Download size={18} />
                Download SVG
              </button>

              <button
                type="button"
                onClick={resetSettings}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3.5 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20 sm:py-4 sm:text-base"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>

            <div className="mt-8 sm:mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Quick Themes
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {QUICK_THEME_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForeground(color)}
                    aria-label={`Use theme color ${color}`}
                    className="h-12 rounded-xl border border-white/10 transition hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </motion.aside>
        </section>

        <section className="mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 sm:px-5">
                Why Choose MeggatronAI
              </div>
              <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Powerful Features
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Build beautiful QR codes within seconds using our premium
                online generator. Designed for businesses, creators,
                marketers and developers.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
              {FEATURES.map((feature) => {
                const Icon: ComponentType<{ size?: number; className?: string }> =
                  feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.18)] sm:p-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                      <Icon size={26} className="text-cyan-400" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-white sm:text-xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-zinc-400 sm:leading-7">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section className="mt-24 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 sm:px-5">
                Three Simple Steps
              </div>
              <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                How It Works
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Generate professional QR codes in less than one minute.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
              {STEPS.map((step) => (
                <motion.div
                  key={step.number}
                  whileHover={{ y: -10 }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 sm:p-8"
                >
                  <span className="text-5xl font-black text-cyan-500/20 sm:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-24 sm:mt-28">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8 lg:p-12">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Free QR Code Generator for Businesses & Creators
            </h2>

            <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
              MeggatronAI provides a modern QR Code Generator that allows
              anyone to create beautiful QR codes without design skills.
              Whether you&apos;re sharing a website, portfolio, social media,
              business card, restaurant menu, WiFi credentials or contact
              details, our generator produces high-resolution QR codes that
              scan instantly across all modern smartphones.
            </p>

            <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
              Customize colors, rounded modules, background colors and QR
              sizes while seeing a live preview before downloading.
              Everything is processed directly inside your browser for a
              fast, secure and privacy-friendly experience.
            </p>

            <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Why use our QR Generator?
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-zinc-400 sm:text-base">
                  {WHY_CHOOSE_LIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Supported QR Types
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-zinc-400 sm:text-base">
                  {SUPPORTED_TYPES_LIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 sm:px-5">
                Frequently Asked Questions
              </div>
              <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Everything You Need To Know
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base text-zinc-400 sm:text-lg">
                Answers to the most common questions about our free QR Code
                Generator.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl space-y-5 sm:mt-16 sm:space-y-6">
              {FAQS.map((item) => (
                <motion.div
                  key={item.q}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-7"
                >
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {item.q}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-24 sm:mt-28">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-sky-500/10 p-8 backdrop-blur-2xl sm:rounded-[36px] sm:p-10 lg:p-16"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />

            <div className="relative text-center">
              <h2 className="bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl lg:text-6xl">
                Ready To Create Your QR Code?
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Generate professional QR Codes instantly with unlimited
                downloads, premium customization and beautiful modern
                design.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5">
                <button
                  type="button"
                  onClick={downloadPNG}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,.45)] sm:px-8 sm:py-4 sm:text-base"
                >
                  Download PNG
                </button>

                <button
                  type="button"
                  onClick={downloadSVG}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400 sm:px-8 sm:py-4 sm:text-base"
                >
                  Download SVG
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-24 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 sm:px-5">
                More Free AI Tools
              </span>
              <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Explore More Productivity Tools
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base text-zinc-400 sm:text-lg">
                Discover more premium online tools available on
                MeggatronAI.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
              {RELATED_TOOLS.map((tool) => (
                <motion.div
                  key={tool.title}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 sm:p-7"
                >
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {tool.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-400 sm:leading-7">
                    {tool.desc}
                  </p>
                  <Link
                    href={tool.href}
                    className="mt-6 inline-flex items-center text-cyan-400 transition hover:text-cyan-300"
                  >
                    Open Tool →
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-24 sm:mt-28">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {STATS.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.04 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl sm:p-8"
              >
                <h3 className="text-4xl font-black text-cyan-400 sm:text-5xl">
                  {item.value}
                </h3>
                <p className="mt-4 text-sm text-zinc-400 sm:text-base">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-24 sm:mt-28">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  Why Choose MeggatronAI?
                </h2>
                <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  Our QR Code Generator is designed with performance,
                  privacy and simplicity in mind. Everything happens inside
                  your browser, ensuring your information stays secure
                  while giving you instant results.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-5">
                {TRUST_LIST.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-zinc-300 sm:px-6 sm:py-5 sm:text-base"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-28 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-sky-500/10 p-8 backdrop-blur-3xl sm:rounded-[40px] sm:p-12 lg:p-20"
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px]" />

            <div className="relative text-center">
              <h2 className="bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-4xl font-black text-transparent sm:text-5xl lg:text-6xl">
                Build Smarter With MeggatronAI
              </h2>
              <p className="mx-auto mt-8 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Discover dozens of premium productivity tools designed for
                creators, developers, students and businesses. Everything
                is fast, modern and completely free.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-5">
                <Link
                  href="/tools"
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,.45)] sm:px-8 sm:py-4 sm:text-base"
                >
                  Explore All Tools
                </Link>

                <button
                  type="button"
                  onClick={downloadPNG}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400 sm:px-8 sm:py-4 sm:text-base"
                >
                  Download QR Code
                </button>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}