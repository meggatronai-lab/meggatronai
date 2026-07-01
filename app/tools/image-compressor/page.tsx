"use client";

import React, { useMemo, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

import {
  Sparkles,
  UploadCloud,
  Download,
  RotateCcw,
  Image as ImageIcon,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

export default function ImageCompressorPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [compressedFile, setCompressedFile] =
    useState<File | null>(null);

  const [compressedPreview, setCompressedPreview] =
    useState("");

  const [quality, setQuality] = useState(80);

  const [loading, setLoading] = useState(false);

  const [keepResolution, setKeepResolution] =
    useState(true);

  const [convertWebp, setConvertWebp] =
    useState(false);

  const [preserveExif, setPreserveExif] =
    useState(false);

  const originalSize = useMemo(() => {
    if (!file) return "0 KB";
    return `${(file.size / 1024).toFixed(1)} KB`;
  }, [file]);

  const compressedSize = useMemo(() => {
    if (!compressedFile) return "0 KB";
    return `${(compressedFile.size / 1024).toFixed(
      1
    )} KB`;
  }, [compressedFile]);

  const reduction = useMemo(() => {
    if (!file || !compressedFile) return 0;

    return Math.round(
      ((file.size - compressedFile.size) /
        file.size) *
        100
    );
  }, [file, compressedFile]);

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setCompressedFile(null);
    setCompressedPreview("");

    setPreview(URL.createObjectURL(selected));
  };

  const compressImage = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const options = {
        maxSizeMB: 5,
        useWebWorker: true,
        initialQuality: quality / 100,
        preserveExif,
        fileType: convertWebp
          ? "image/webp"
          : file.type,
        maxWidthOrHeight: keepResolution
          ? undefined
          : 1920,
      };

      const output =
        await imageCompression(file, options);

      setCompressedFile(output);

      setCompressedPreview(
        URL.createObjectURL(output)
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedFile) return;

    const url =
      URL.createObjectURL(compressedFile);

    const a = document.createElement("a");

    a.href = url;

    a.download = compressedFile.name;

    a.click();

    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFile(null);
    setPreview("");
    setCompressedFile(null);
    setCompressedPreview("");
    setQuality(80);
  };

  return (
    <main className="relative overflow-hidden bg-[#050816]">

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[180px]" />

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
            duration: .6,
          }}
          className="mx-auto max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300">

            <Sparkles size={16} />

            Premium Image Compressor

          </div>

          <h1 className="mt-6 bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-5xl font-black text-transparent lg:text-7xl">

            Compress Images Instantly

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">

            Compress JPG, PNG and WEBP images without sacrificing quality.
            Fast, secure and processed entirely inside your browser.

          </p>

        </motion.section>

        {/* Upload */}

        <section className="mt-20">

          <div className="grid gap-8 xl:grid-cols-2">

            <motion.div
              initial={{
                opacity:0,
                x:-30
              }}
              whileInView={{
                opacity:1,
                x:0
              }}
              viewport={{
                once:true
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >

              <div
                onClick={() =>
                  inputRef.current?.click()
                }
                className="flex h-[420px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-500/30 transition hover:border-cyan-400 hover:bg-cyan-500/5"
              >

                <UploadCloud
                  size={70}
                  className="text-cyan-400"
                />

                <h2 className="mt-6 text-3xl font-bold text-white">

                  Drag & Drop Image

                </h2>

                <p className="mt-3 text-zinc-400">

                  or Click to Upload

                </p>

                <p className="mt-8 text-sm text-zinc-500">

                  PNG • JPG • JPEG • WEBP

                </p>

              </div>

              <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleUpload}
              />

            </motion.div>
                        {/* Preview */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >

              <div className="mb-6 flex items-center gap-3">

                <ImageIcon
                  size={24}
                  className="text-cyan-400"
                />

                <h2 className="text-2xl font-bold text-white">

                  Image Preview

                </h2>

              </div>

              <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120]">

                {preview ? (

                  <img
                    src={
                      compressedPreview || preview
                    }
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />

                ) : (

                  <div className="text-center">

                    <ImageIcon
                      size={60}
                      className="mx-auto text-zinc-600"
                    />

                    <p className="mt-4 text-zinc-500">

                      Image preview will appear here

                    </p>

                  </div>

                )}

              </div>

            </motion.div>

          </div>

        </section>

        {/* Compression Controls */}

        <section className="mt-14">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
          >

            <div className="flex items-center gap-3">

              <SlidersHorizontal
                size={24}
                className="text-cyan-400"
              />

              <h2 className="text-2xl font-bold text-white">

                Compression Settings

              </h2>

            </div>

            <div className="mt-10">

              <div className="mb-4 flex items-center justify-between">

                <span className="font-medium text-white">

                  Image Quality

                </span>

                <span className="rounded-full bg-cyan-500/10 px-4 py-1 text-cyan-300">

                  {quality}%

                </span>

              </div>

              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) =>
                  setQuality(Number(e.target.value))
                }
                className="w-full accent-cyan-400"
              />

            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] p-5">

                <input
                  type="checkbox"
                  checked={preserveExif}
                  onChange={(e) =>
                    setPreserveExif(
                      e.target.checked
                    )
                  }
                />

                <span className="text-white">

                  Preserve EXIF

                </span>

              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] p-5">

                <input
                  type="checkbox"
                  checked={keepResolution}
                  onChange={(e) =>
                    setKeepResolution(
                      e.target.checked
                    )
                  }
                />

                <span className="text-white">

                  Keep Resolution

                </span>

              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] p-5">

                <input
                  type="checkbox"
                  checked={convertWebp}
                  onChange={(e) =>
                    setConvertWebp(
                      e.target.checked
                    )
                  }
                />

                <span className="text-white">

                  Convert to WEBP

                </span>

              </label>

            </div>

            <div className="mt-12 flex flex-wrap gap-4">

              <button
                onClick={compressImage}
                disabled={!file || loading}
                className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading
                  ? "Compressing..."
                  : "Compress Image"}

              </button>

              <button
                onClick={downloadImage}
                disabled={!compressedFile}
                className="flex items-center gap-2 rounded-2xl border border-cyan-500 px-8 py-4 font-semibold text-cyan-300 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Download size={18} />

                Download

              </button>

              <button
                onClick={resetTool}
                className="flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:border-cyan-400"
              >

                <RotateCcw size={18} />

                Reset

              </button>

            </div>

          </motion.div>

        </section>
                {/* Live Statistics */}

        <section className="mt-16">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              {[
                {
                  title: "Original Size",
                  value: originalSize,
                },
                {
                  title: "Compressed Size",
                  value: compressedSize,
                },
                {
                  title: "Reduction",
                  value: `${reduction}%`,
                },
                {
                  title: "Output Format",
                  value: compressedFile
                    ? compressedFile.type.replace(
                        "image/",
                        ""
                      ).toUpperCase()
                    : "--",
                },
              ].map((item, index) => (

                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-7
                    text-center
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-cyan-400/40
                    hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
                  "
                >

                  <h3 className="text-4xl font-black text-white">

                    {item.value}

                  </h3>

                  <p className="mt-3 text-zinc-400">

                    {item.title}

                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </section>

        {/* Image Details */}

        <section className="mt-16">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
              backdrop-blur-xl
            "
          >

            <div className="mb-8 flex items-center gap-3">

              <CheckCircle2
                size={24}
                className="text-cyan-400"
              />

              <h2 className="text-2xl font-bold text-white">

                Image Information

              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">

                <p className="text-sm text-zinc-500">

                  File Name

                </p>

                <h3 className="mt-2 break-all text-lg font-semibold text-white">

                  {file?.name || "--"}

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">

                <p className="text-sm text-zinc-500">

                  File Type

                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">

                  {file
                    ? file.type.replace(
                        "image/",
                        ""
                      ).toUpperCase()
                    : "--"}

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">

                <p className="text-sm text-zinc-500">

                  Original Size

                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">

                  {originalSize}

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">

                <p className="text-sm text-zinc-500">

                  Space Saved

                </p>

                <h3 className="mt-2 text-lg font-semibold text-cyan-400">

                  {compressedFile
                    ? `${reduction}%`
                    : "--"}

                </h3>

              </div>

            </div>

          </motion.div>

        </section>
                {/* SEO Content */}

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

            <div className="mx-auto max-w-5xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300">

                <Sparkles size={16} />

                SEO Optimized

              </div>

              <h2 className="mt-8 text-4xl font-black text-white lg:text-5xl">

                Free Online Image Compressor

              </h2>

              <p className="mt-8 leading-8 text-zinc-400">

                MeggatronAI Image Compressor helps you reduce image file sizes
                without noticeably affecting image quality. Compress JPG, JPEG,
                PNG and WEBP images directly inside your browser with no uploads,
                no waiting and no registration. Every compression takes place on
                your own device, giving you complete privacy and faster
                performance.

              </p>

              <p className="mt-6 leading-8 text-zinc-400">

                Large images slow websites, increase storage requirements and
                consume more bandwidth. Our premium image compression tool
                optimizes your images for websites, blogs, online stores,
                portfolios, presentations, emails and social media while keeping
                excellent visual quality.

              </p>

              <p className="mt-6 leading-8 text-zinc-400">

                Unlike many online compressors that upload files to external
                servers, MeggatronAI performs all compression locally in your
                browser. Your images remain private and never leave your device,
                making the tool secure for personal, business and professional
                use.

              </p>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                  <h3 className="text-2xl font-bold text-white">

                    Supported Formats

                  </h3>

                  <ul className="mt-6 space-y-3 text-zinc-400">

                    <li>✓ JPG Compression</li>
                    <li>✓ JPEG Compression</li>
                    <li>✓ PNG Compression</li>
                    <li>✓ WEBP Compression</li>
                    <li>✓ High Quality Output</li>
                    <li>✓ Browser Processing</li>

                  </ul>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                  <h3 className="text-2xl font-bold text-white">

                    Perfect For

                  </h3>

                  <ul className="mt-6 space-y-3 text-zinc-400">

                    <li>✓ Website Optimization</li>
                    <li>✓ Blog Images</li>
                    <li>✓ Ecommerce Products</li>
                    <li>✓ Social Media Uploads</li>
                    <li>✓ Email Attachments</li>
                    <li>✓ Digital Portfolios</li>

                  </ul>

                </div>

              </div>

              <p className="mt-10 leading-8 text-zinc-400">

                Whether you are a web developer, blogger, designer, student or
                business owner, MeggatronAI provides a fast, reliable and
                professional image compression experience. Simply upload your
                image, adjust the compression quality, preview the results and
                download the optimized version within seconds.

              </p>

            </div>

          </motion.div>

        </section>
              </div>

    </main>

  );
}