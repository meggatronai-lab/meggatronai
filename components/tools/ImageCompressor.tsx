"use client";
import ToolLinks from "@/components/ui/ToolLinks";
import { useMemo, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Download,
  RotateCcw,
  Loader2,
  ImageIcon,
  CheckCircle2,
} from "lucide-react";

export default function ImageCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState("");

  const [quality, setQuality] = useState(80);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const originalSize = useMemo(() => {
    if (!file) return "0 KB";
    return `${(file.size / 1024).toFixed(1)} KB`;
  }, [file]);

  const compressedSize = useMemo(() => {
    if (!compressedFile) return "0 KB";
    return `${(compressedFile.size / 1024).toFixed(1)} KB`;
  }, [compressedFile]);

  const reduction = useMemo(() => {
    if (!file || !compressedFile) return 0;

    return Math.round(
      ((file.size - compressedFile.size) / file.size) * 100
    );
  }, [file, compressedFile]);

  function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    setError("");
    setMessage("");

    setFile(selected);
    setCompressedFile(null);

    setPreview(URL.createObjectURL(selected));
    setCompressedPreview("");
  }

  async function compressImage() {
    if (!file) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const compressed = await imageCompression(file, {
        initialQuality: quality / 100,
        useWebWorker: true,
      });

      setCompressedFile(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));

      setMessage("Image compressed successfully.");
    } catch {
      setError("Compression failed.");
    } finally {
      setLoading(false);
    }
  }

  function downloadImage() {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);

    const a = document.createElement("a");
    a.href = url;
    a.download = compressedFile.name;
    a.click();

    URL.revokeObjectURL(url);
  }

  function resetTool() {
    setFile(null);
    setPreview("");
    setCompressedFile(null);
    setCompressedPreview("");
    setQuality(80);
    setMessage("");
    setError("");
  }

  return (
    <main className="bg-[#070b16] min-h-screen py-16">
      <div className="mx-auto max-w-6xl px-6">

        {/* Hero, Upload and Controls will be added in Part 2 */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mx-auto max-w-3xl text-center"
>
  <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
    Free • Secure • Browser Based
  </span>

  <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
    Image Compressor
  </h1>

  <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
    Compress JPG, PNG and WEBP images in seconds without noticeable quality
    loss. Your files stay on your device.
  </p>
</motion.section>

<div className="mt-14 grid gap-8 lg:grid-cols-2">

  {/* Upload */}

  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="rounded-3xl border border-white/10 bg-[#111827] p-6"
  >

    <button
      onClick={() => inputRef.current?.click()}
      className="flex h-[340px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-500/30 transition hover:border-cyan-400 hover:bg-cyan-500/5"
    >
      <UploadCloud
        size={60}
        className="text-cyan-400"
      />

      <h2 className="mt-5 text-2xl font-bold text-white">
        Upload Image
      </h2>

      <p className="mt-2 text-zinc-400">
        Drag & Drop or Click to Browse
      </p>

      <span className="mt-5 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
        JPG • PNG • WEBP
      </span>
    </button>

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
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="rounded-3xl border border-white/10 bg-[#111827] p-6"
  >

    <div className="mb-4 flex items-center gap-3">

      <ImageIcon className="text-cyan-400" />

      <h2 className="text-xl font-bold text-white">
        Preview
      </h2>

    </div>

    <div className="flex h-[340px] items-center justify-center overflow-hidden rounded-2xl bg-[#070b16]">

      {preview ? (

        <img
          src={compressedPreview || preview}
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
            Image preview appears here
          </p>

        </div>

      )}

    </div>

  </motion.div>

</div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-6"
>

  <div className="mb-4 flex items-center justify-between">

    <span className="font-medium text-white">
      Compression Quality
    </span>

    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">
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

  {message && (
    <div className="mt-6 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
      <CheckCircle2 size={18} />
      {message}
    </div>
  )}

  {error && (
    <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {error}
    </div>
  )}

  <div className="mt-8 flex flex-wrap gap-4">

    <button
      onClick={compressImage}
      disabled={!file || loading}
      className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
    >

      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Compressing...
        </>
      ) : (
        "Compress Image"
      )}

    </button>

    <button
      onClick={downloadImage}
      disabled={!compressedFile}
      className="flex items-center gap-2 rounded-xl border border-cyan-500 px-6 py-3 text-cyan-300 transition hover:bg-cyan-500/10 disabled:opacity-50"
    >

      <Download size={18} />

      Download

    </button>

    <button
      onClick={resetTool}
      className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-white transition hover:border-cyan-400"
    >

      <RotateCcw size={18} />

      Reset

    </button>

  </div>

</motion.div>
{/* Statistics */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-10"
>
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <p className="text-sm text-zinc-500">
        Original Size
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {originalSize}
      </h3>
    </div>

    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <p className="text-sm text-zinc-500">
        Compressed Size
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {compressedSize}
      </h3>
    </div>

    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <p className="text-sm text-zinc-500">
        Space Saved
      </p>

      <h3 className="mt-2 text-3xl font-bold text-cyan-400">
        {compressedFile ? `${reduction}%` : "--"}
      </h3>
    </div>

    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <p className="text-sm text-zinc-500">
        Output Format
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {compressedFile
          ? compressedFile.type
              .replace("image/", "")
              .toUpperCase()
          : "--"}
      </h3>
    </div>

  </div>
</motion.section>

{/* File Information */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8"
>

  <h2 className="mb-8 text-2xl font-bold text-white">
    File Information
  </h2>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-2xl bg-[#070b16] p-5">
      <p className="text-sm text-zinc-500">
        File Name
      </p>

      <p className="mt-2 break-all font-semibold text-white">
        {file?.name || "--"}
      </p>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-5">
      <p className="text-sm text-zinc-500">
        File Type
      </p>

      <p className="mt-2 font-semibold text-white">
        {file
          ? file.type
              .replace("image/", "")
              .toUpperCase()
          : "--"}
      </p>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-5">
      <p className="text-sm text-zinc-500">
        Original Size
      </p>

      <p className="mt-2 font-semibold text-white">
        {originalSize}
      </p>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-5">
      <p className="text-sm text-zinc-500">
        Compression
      </p>

      <p className="mt-2 font-semibold text-cyan-400">
        {compressedFile
          ? `${reduction}% Saved`
          : "--"}
      </p>
    </div>

  </div>

</motion.section>
{/* SEO Content */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-16 rounded-3xl border border-white/10 bg-[#111827] p-8"
>
  <h2 className="text-3xl font-bold text-white">
    Free Online Image Compressor
  </h2>

  <p className="mt-6 leading-8 text-zinc-400">
    Compress JPG, PNG and WEBP images directly in your browser without
    uploading them to a server. MeggatronAI helps you reduce image file
    sizes while maintaining excellent visual quality. Everything is processed
    locally for maximum privacy and speed.
  </p>

  <p className="mt-5 leading-8 text-zinc-400">
    Whether you're optimizing images for websites, blogs, social media,
    portfolios or email attachments, our Image Compressor makes your files
    smaller in just a few seconds.
  </p>

  <div className="mt-10 grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-xl font-semibold text-white">
        Features
      </h3>

      <ul className="mt-5 space-y-3 text-zinc-400">
        <li>✓ Compress JPG, PNG & WEBP</li>
        <li>✓ Browser-based processing</li>
        <li>✓ No uploads required</li>
        <li>✓ Adjustable compression quality</li>
        <li>✓ Instant download</li>
      </ul>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-xl font-semibold text-white">
        Best For
      </h3>

      <ul className="mt-5 space-y-3 text-zinc-400">
        <li>✓ Website optimization</li>
        <li>✓ Social media images</li>
        <li>✓ Blogs</li>
        <li>✓ Portfolios</li>
        <li>✓ Email attachments</li>
      </ul>
    </div>

  </div>

</motion.section>

{/* FAQ */}

<section className="mt-16 rounded-3xl border border-white/10 bg-[#111827] p-8">

  <h2 className="text-3xl font-bold text-white">
    Frequently Asked Questions
  </h2>

  <div className="mt-8 space-y-6">

    <div>
      <h3 className="font-semibold text-white">
        Is this Image Compressor free?
      </h3>

      <p className="mt-2 text-zinc-400">
        Yes. The tool is completely free to use.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-white">
        Are my images uploaded?
      </h3>

      <p className="mt-2 text-zinc-400">
        No. Everything happens directly inside your browser.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-white">
        Which formats are supported?
      </h3>

      <p className="mt-2 text-zinc-400">
        JPG, JPEG, PNG and WEBP.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-white">
        Does compression reduce quality?
      </h3>

      <p className="mt-2 text-zinc-400">
        Minor quality reduction may occur depending on your selected compression
        level.
      </p>
    </div>

  </div>

</section>

<ToolLinks
  tools={[
    {
      name: "Word Counter",
      href: "/tools/word-counter",
    },
    {
      name: "QR Generator",
      href: "/tools/qr-generator",
    },
    {
      name: "Password Tool",
      href: "/tools/password-tool",
    },
    {
      name: "PDF Merger",
      href: "/tools/pdf-merger",
    },
  ]}
/>
      </div>
    </main>
  );
}