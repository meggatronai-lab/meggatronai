"use client";

import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

const qrTypes = [
  { id: "url", label: "Website", icon: Link2 },
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageCircle },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "location", label: "Location", icon: MapPin },
  { id: "contact", label: "Contact", icon: UserRound },
];

export default function QRGeneratorPage() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  const [qrType, setQrType] = useState("url");
  const [content, setContent] = useState("");

  const [foreground, setForeground] =
    useState("#06b6d4");

  const [background, setBackground] =
    useState("#ffffff");

  const [size, setSize] =
    useState(320);

  const [rounded, setRounded] =
    useState(true);

  useEffect(() => {
    if (!qrInstance.current) {

      qrInstance.current = new QRCodeStyling({
        width: size,
        height: size,
        data: content || "https://meggatronai.com",

        margin: 10,

        dotsOptions: {
          color: foreground,
          type: rounded
            ? "rounded"
            : "square",
        },

        cornersSquareOptions: {
          type: rounded
            ? "extra-rounded"
            : "square",
        },

        cornersDotOptions: {
          type: rounded
            ? "dot"
            : "square",
        },

        backgroundOptions: {
          color: background,
        },

        imageOptions: {
          crossOrigin: "anonymous",
        },
      });

      if (qrRef.current) {
        qrInstance.current.append(qrRef.current);
      }

    } else {

      qrInstance.current.update({
        width: size,
        height: size,

        data:
          content ||
          "https://meggatronai.com",

        dotsOptions: {
          color: foreground,
          type: rounded
            ? "rounded"
            : "square",
        },

        cornersSquareOptions: {
          type: rounded
            ? "extra-rounded"
            : "square",
        },

        cornersDotOptions: {
          type: rounded
            ? "dot"
            : "square",
        },

        backgroundOptions: {
          color: background,
        },
      });

    }

  }, [
    content,
    foreground,
    background,
    size,
    rounded,
  ]);

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
    setForeground("#06b6d4");
    setBackground("#ffffff");
    setRounded(true);
    setSize(320);
    setContent("");
    setQrType("url");
  };

  return (

    <main className="relative overflow-hidden bg-[#050816]">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[160px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-sky-500/10 blur-[160px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20">

        {/* Hero */}

        <motion.section
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300">

            <Sparkles size={16} />

            Stylish QR Code Generator

          </div>

          <h1
            className="
              mt-6
              bg-gradient-to-r
              from-white
              via-white
              to-cyan-400
              bg-clip-text
              text-5xl
              font-black
              text-transparent
              lg:text-7xl
            "
          >

            Create Beautiful QR Codes

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">

            Generate premium QR codes with custom colors,
            rounded styles, instant downloads and a
            beautiful live preview.

          </p>

        </motion.section>
                {/* Generator */}

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left Panel */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-6
              backdrop-blur-2xl
              lg:p-8
            "
          >

            <div className="flex items-center gap-3">

              <Palette
                size={24}
                className="text-cyan-400"
              />

              <h2 className="text-2xl font-bold text-white">

                QR Generator

              </h2>

            </div>

            <p className="mt-3 text-zinc-400">

              Choose a QR type, customize the design,
              preview it instantly and download in high quality.

            </p>

            {/* QR Types */}

            <div className="mt-10">

              <label className="mb-4 block text-sm font-medium text-zinc-300">

                QR Type

              </label>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                {qrTypes.map((item) => {

                  const Icon = item.icon;

                  return (

                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setQrType(item.id);
                        setContent("");
                      }}
                      className={`
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        border
                        p-4
                        transition-all
                        duration-300
                        ${
                          qrType === item.id
                            ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,.2)]"
                            : "border-white/10 bg-white/[0.03] hover:border-cyan-400/40"
                        }
                      `}
                    >

                      <Icon
                        size={22}
                        className={
                          qrType === item.id
                            ? "text-cyan-400"
                            : "text-zinc-400"
                        }
                      />

                      <span
                        className={
                          qrType === item.id
                            ? "text-sm font-semibold text-white"
                            : "text-sm text-zinc-400"
                        }
                      >

                        {item.label}

                      </span>

                    </button>

                  );

                })}

              </div>

            </div>

            {/* QR Content */}

            <div className="mt-10">

              <label className="mb-3 block text-sm font-medium text-zinc-300">

                QR Content

              </label>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder={
                  qrType === "url"
                    ? "https://example.com"
                    : qrType === "email"
                    ? "name@example.com"
                    : qrType === "phone"
                    ? "+923001234567"
                    : qrType === "sms"
                    ? "Enter your SMS..."
                    : qrType === "wifi"
                    ? "WIFI:T:WPA;S:Network;P:Password;;"
                    : qrType === "location"
                    ? "24.8607,67.0011"
                    : qrType === "contact"
                    ? "John Doe"
                    : "Enter your text..."
                }
                className="
                  h-44
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

            </div>

            {/* Colors */}

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-3 block text-sm text-zinc-300">

                  Foreground Color

                </label>

                <input
                  type="color"
                  value={foreground}
                  onChange={(e) =>
                    setForeground(e.target.value)
                  }
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
                  onChange={(e) =>
                    setBackground(e.target.value)
                  }
                  className="h-14 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
                />

              </div>

            </div>

            {/* Size */}

            <div className="mt-10">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-medium text-zinc-300">

                  QR Size

                </span>

                <span className="font-semibold text-cyan-400">

                  {size}px

                </span>

              </div>

              <input
                type="range"
                min={180}
                max={700}
                step={10}
                value={size}
                onChange={(e) =>
                  setSize(Number(e.target.value))
                }
                className="w-full accent-cyan-400"
              />

            </div>

            {/* Shape */}

            <div className="mt-10">

              <label className="mb-4 block text-sm font-medium text-zinc-300">

                QR Style

              </label>

              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={() => setRounded(true)}
                  className={`rounded-xl border px-5 py-4 transition-all ${
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
                  className={`rounded-xl border px-5 py-4 transition-all ${
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
                    {/* Right Preview */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              sticky
              top-24
              h-fit
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-6
              backdrop-blur-2xl
            "
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-white">

                Live Preview

              </h2>

              <Sparkles
                size={20}
                className="text-cyan-400"
              />

            </div>

            <div
              className="
                mt-8
                flex
                justify-center
                rounded-3xl
                border
                border-white/10
                bg-white
                p-8
              "
            >

              <div ref={qrRef} />

            </div>

            {/* Downloads */}

            <div className="mt-8 grid gap-4">

              <button
                type="button"
                onClick={downloadPNG}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-sky-500
                  px-6
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
              >

                <Download size={18} />

                Download PNG

              </button>

              <button
                type="button"
                onClick={downloadSVG}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-6
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-cyan-400
                "
              >

                <Download size={18} />

                Download SVG

              </button>

              <button
                type="button"
                onClick={resetSettings}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-6
                  py-4
                  font-semibold
                  text-red-300
                  transition-all
                  duration-300
                  hover:bg-red-500/20
                "
              >

                <RotateCcw size={18} />

                Reset

              </button>

            </div>

            {/* Quick Themes */}

            <div className="mt-10">

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">

                Quick Themes

              </h3>

              <div className="grid grid-cols-4 gap-3">

                {[
                  "#06b6d4",
                  "#7c3aed",
                  "#10b981",
                  "#ef4444",
                ].map((color) => (

                  <button
                    key={color}
                    type="button"
                    onClick={() => setForeground(color)}
                    className="h-12 rounded-xl border border-white/10 transition hover:scale-105"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                ))}

              </div>

            </div>

          </motion.aside>

        </section>
                {/* Features */}

        <section className="mt-24">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div className="text-center">

              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >

                Why Choose MeggatronAI

              </div>

              <h2
                className="
                  mt-6
                  text-4xl
                  font-black
                  text-white
                  lg:text-5xl
                "
              >

                Powerful Features

              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">

                Build beautiful QR codes within seconds using our premium
                online generator. Designed for businesses, creators,
                marketers and developers.

              </p>

            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {[
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
              ].map((feature) => {

                const Icon = feature.icon;

                return (

                  <motion.div
                    key={feature.title}
                    whileHover={{
                      y: -8,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
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

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-cyan-500/10
                      "
                    >

                      <Icon
                        size={26}
                        className="text-cyan-400"
                      />

                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">

                      {feature.title}

                    </h3>

                    <p className="mt-4 leading-7 text-zinc-400">

                      {feature.text}

                    </p>

                  </motion.div>

                );

              })}

            </div>

          </motion.div>

        </section>
                {/* How It Works */}

        <section className="mt-28">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div className="text-center">

              <div
                className="
                  inline-flex
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >

                Three Simple Steps

              </div>

              <h2
                className="
                  mt-6
                  text-4xl
                  font-black
                  text-white
                  lg:text-5xl
                "
              >

                How It Works

              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">

                Generate professional QR codes in less than one minute.

              </p>

            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">

              {[
                {
                  number: "01",
                  title: "Choose QR Type",
                  description:
                    "Select Website, Text, Email, Phone, WiFi, SMS, Contact or Location.",
                },
                {
                  number: "02",
                  title: "Customize Design",
                  description:
                    "Choose colors, rounded style, size and instantly preview your QR code.",
                },
                {
                  number: "03",
                  title: "Download",
                  description:
                    "Export your QR Code in high-quality PNG or SVG format.",
                },
              ].map((step) => (

                <motion.div
                  key={step.number}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400/40
                  "
                >

                  <span
                    className="
                      text-6xl
                      font-black
                      text-cyan-500/20
                    "
                  >

                    {step.number}

                  </span>

                  <h3 className="mt-6 text-2xl font-bold text-white">

                    {step.title}

                  </h3>

                  <p className="mt-4 leading-8 text-zinc-400">

                    {step.description}

                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </section>

        {/* SEO Content */}

        <section className="mt-28">

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-8
              backdrop-blur-xl
              lg:p-12
            "
          >

            <h2 className="text-3xl font-black text-white">

              Free QR Code Generator for Businesses & Creators

            </h2>

            <p className="mt-6 leading-8 text-zinc-400">

              MeggatronAI provides a modern QR Code Generator that allows
              anyone to create beautiful QR codes without design skills.
              Whether you're sharing a website, portfolio, social media,
              business card, restaurant menu, WiFi credentials or contact
              details, our generator produces high-resolution QR codes that
              scan instantly across all modern smartphones.

            </p>

            <p className="mt-6 leading-8 text-zinc-400">

              Customize colors, rounded modules, background colors and QR
              sizes while seeing a live preview before downloading.
              Everything is processed directly inside your browser for a
              fast, secure and privacy-friendly experience.

            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                "
              >

                <h3 className="text-xl font-bold text-white">

                  Why use our QR Generator?

                </h3>

                <ul className="mt-5 space-y-3 text-zinc-400">

                  <li>✓ Unlimited QR Codes</li>
                  <li>✓ No Watermarks</li>
                  <li>✓ High Resolution</li>
                  <li>✓ Instant Preview</li>
                  <li>✓ Fast Downloads</li>
                  <li>✓ Mobile Friendly</li>

                </ul>

              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                "
              >

                <h3 className="text-xl font-bold text-white">

                  Supported QR Types

                </h3>

                <ul className="mt-5 space-y-3 text-zinc-400">

                  <li>✓ Website URL</li>
                  <li>✓ Plain Text</li>
                  <li>✓ Email Address</li>
                  <li>✓ Phone Number</li>
                  <li>✓ SMS</li>
                  <li>✓ WiFi</li>
                  <li>✓ Contact Card</li>
                  <li>✓ GPS Location</li>

                </ul>

              </div>

            </div>

          </div>

        </section>
                {/* FAQ */}

        <section className="mt-28">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div className="text-center">

              <div
                className="
                  inline-flex
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >

                Frequently Asked Questions

              </div>

              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">

                Everything You Need To Know

              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">

                Answers to the most common questions about our free QR Code Generator.

              </p>

            </div>

            <div className="mx-auto mt-16 max-w-4xl space-y-6">

              {[
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
              ].map((item) => (

                <motion.div
                  key={item.q}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-7
                    backdrop-blur-xl
                  "
                >

                  <h3 className="text-xl font-bold text-white">

                    {item.q}

                  </h3>

                  <p className="mt-4 leading-8 text-zinc-400">

                    {item.a}

                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </section>

        {/* CTA */}

        <section className="mt-28">

          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            className="
              relative
              overflow-hidden
              rounded-[36px]
              border
              border-cyan-500/20
              bg-gradient-to-br
              from-cyan-500/10
              via-white/[0.03]
              to-sky-500/10
              p-10
              backdrop-blur-2xl
              lg:p-16
            "
          >

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

            <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />

            <div className="relative text-center">

              <h2
                className="
                  bg-gradient-to-r
                  from-white
                  via-white
                  to-cyan-400
                  bg-clip-text
                  text-4xl
                  font-black
                  text-transparent
                  lg:text-6xl
                "
              >

                Ready To Create Your QR Code?

              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">

                Generate professional QR Codes instantly with unlimited downloads,
                premium customization and beautiful modern design.

              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-5">

                <button
                  onClick={downloadPNG}
                  className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-sky-500
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-[0_0_40px_rgba(34,211,238,.45)]
                  "
                >

                  Download PNG

                </button>

                <button
                  onClick={downloadSVG}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:border-cyan-400
                  "
                >

                  Download SVG

                </button>

              </div>

            </div>

          </motion.div>

        </section>
                {/* Related Tools */}

        <section className="mt-28">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div className="text-center">

              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >

                More Free AI Tools

              </span>

              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">

                Explore More Productivity Tools

              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">

                Discover more premium online tools available on MeggatronAI.

              </p>

            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {[
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
              ].map((tool) => (

                <motion.div
                  key={tool.title}
                  whileHover={{
                    y: -8,
                  }}
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

                  <h3 className="text-xl font-bold text-white">

                    {tool.title}

                  </h3>

                  <p className="mt-4 leading-7 text-zinc-400">

                    {tool.desc}

                  </p>

                  <Link
                    href={tool.href}
                    className="
                      mt-6
                      inline-flex
                      items-center
                      text-cyan-400
                      transition
                      hover:text-cyan-300
                    "
                  >

                    Open Tool →

                  </Link>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </section>

        {/* Statistics */}

        <section className="mt-28">

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {[
              {
                value: "100%",
                label: "Free Forever",
              },
              {
                value: "8+",
                label: "QR Types",
              },
              {
                value: "PNG + SVG",
                label: "Downloads",
              },
              {
                value: "24/7",
                label: "Available",
              },
            ].map((item) => (

              <motion.div
                key={item.label}
                whileHover={{
                  scale: 1.04,
                }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-8
                  text-center
                  backdrop-blur-xl
                "
              >

                <h3 className="text-5xl font-black text-cyan-400">

                  {item.value}

                </h3>

                <p className="mt-4 text-zinc-400">

                  {item.label}

                </p>

              </motion.div>

            ))}

          </div>

        </section>

        {/* Trust */}

        <section className="mt-28">

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-10
              backdrop-blur-xl
            "
          >

            <div className="grid gap-12 lg:grid-cols-2">

              <div>

                <h2 className="text-3xl font-black text-white">

                  Why Choose MeggatronAI?

                </h2>

                <p className="mt-6 leading-8 text-zinc-400">

                  Our QR Code Generator is designed with performance,
                  privacy and simplicity in mind. Everything happens
                  inside your browser, ensuring your information stays
                  secure while giving you instant results.

                </p>

              </div>

              <div className="grid gap-5">

                {[
                  "✓ No registration required",
                  "✓ Unlimited QR generation",
                  "✓ High-resolution downloads",
                  "✓ Mobile responsive",
                  "✓ Modern SaaS design",
                  "✓ Lightning-fast performance",
                ].map((item) => (

                  <div
                    key={item}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-6
                      py-5
                      text-zinc-300
                    "
                  >

                    {item}

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>
                {/* Final CTA */}

        <section className="mt-32">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .6,
            }}
            className="
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-cyan-500/20
              bg-gradient-to-br
              from-cyan-500/10
              via-white/[0.03]
              to-sky-500/10
              p-12
              backdrop-blur-3xl
              lg:p-20
            "
          >

            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px]" />

            <div className="relative text-center">

              <h2
                className="
                  bg-gradient-to-r
                  from-white
                  via-white
                  to-cyan-400
                  bg-clip-text
                  text-5xl
                  font-black
                  text-transparent
                  lg:text-6xl
                "
              >

                Build Smarter With MeggatronAI

              </h2>

              <p
                className="
                  mx-auto
                  mt-8
                  max-w-3xl
                  text-lg
                  leading-8
                  text-zinc-400
                "
              >

                Discover dozens of premium productivity tools designed
                for creators, developers, students and businesses.
                Everything is fast, modern and completely free.

              </p>

              <div
                className="
                  mt-12
                  flex
                  flex-wrap
                  justify-center
                  gap-5
                "
              >

                <Link
                  href="/tools"
                  className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-sky-500
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-[0_0_40px_rgba(34,211,238,.45)]
                  "
                >

                  Explore All Tools

                </Link>

                <button
                  type="button"
                  onClick={downloadPNG}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:border-cyan-400
                  "
                >

                  Download QR Code

                </button>

              </div>

            </div>

          </motion.div>

        </section>

        {/* Footer */}

        <footer
          className="
            mt-32
            border-t
            border-white/10
            py-12
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-8
              lg:flex-row
            "
          >

            <div>

              <h3
                className="
                  bg-gradient-to-r
                  from-white
                  to-cyan-400
                  bg-clip-text
                  text-3xl
                  font-black
                  text-transparent
                "
              >

                MeggatronAI

              </h3>

              <p className="mt-3 text-zinc-500">

                Premium AI & Productivity Tools

              </p>

            </div>

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-6
                text-sm
              "
            >

              <Link
                href="/"
                className="text-zinc-400 transition hover:text-cyan-400"
              >
                Home
              </Link>

              <Link
                href="/tools"
                className="text-zinc-400 transition hover:text-cyan-400"
              >
                Tools
              </Link>

              <Link
                href="/about"
                className="text-zinc-400 transition hover:text-cyan-400"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-zinc-400 transition hover:text-cyan-400"
              >
                Contact
              </Link>

            </div>

          </div>

          <div
            className="
              mt-10
              border-t
              border-white/10
              pt-8
              text-center
              text-sm
              text-zinc-500
            "
          >

            © {new Date().getFullYear()} MeggatronAI.
            All Rights Reserved.

          </div>

        </footer>

      </div>

    </main>

  );

}