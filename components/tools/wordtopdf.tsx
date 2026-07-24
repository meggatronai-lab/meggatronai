"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  UploadCloud,
  FileText,
  Download,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Loader2,
  ShieldCheck,
  Globe,
  Lock,
  SlidersHorizontal,
  FileOutput,
  AlertTriangle,
} from "lucide-react";
import {
  validateWordFile,
  convertWordToPdf,
  downloadPdf,
  formatFileSize,
  type WordConversionOptions,
  type WordConversionResult,
} from "@/lib/pdf/wordtopdf";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface FileInfo {
  name: string;
  size: number;
  type: string;
  bytes: ArrayBuffer;
}

interface AlertState {
  type: "success" | "error";
  message: string;
}

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */

const FAQS = [
  {
    q: "Is the Word to PDF Converter free?",
    a: "Yes. The tool is completely free with no account, subscription or payment required.",
  },
  {
    q: "Are my Word files uploaded to a server?",
    a: "No. All processing happens inside your browser using mammoth and jsPDF. Your files never leave your device.",
  },
  {
    q: "Does formatting stay the same after conversion?",
    a: "Text-heavy documents convert very well. Complex layouts, custom fonts and advanced Word features may be simplified due to browser limitations.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. The tool is fully responsive and works on smartphones, tablets and desktops.",
  },
  {
    q: "Which Word formats are supported?",
    a: "DOCX files are fully supported. DOC files have limited support. DOCM and DOTX are not currently supported.",
  },
  {
    q: "Can I convert multiple files at once?",
    a: "Currently the tool processes one file at a time. Convert your next document after downloading.",
  },
  {
    q: "Is there a file size limit?",
    a: "Files up to 50 MB are supported. Very large files with many images may take longer to process.",
  },
  {
    q: "Is my document data secure?",
    a: "Yes. All processing runs locally in your browser. No document content is ever sent to MeggatronAI or any third-party server.",
  },
];

const RELATED_TOOLS = [
  { title: "PDF Merger", href: "/tools/pdf-merger", desc: "Merge multiple PDF files into one document." },
  { title: "PDF Splitter", href: "/tools/pdf-splitter", desc: "Split PDF files into individual pages." },
  { title: "PDF to Word", href: "/tools/pdf-to-word", desc: "Convert PDF documents into editable Word files." },
  { title: "Image Compressor", href: "/tools/image-compressor", desc: "Compress images without losing quality." },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function WordToPdf() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<WordConversionResult | null>(null);
  const [options, setOptions] = useState<WordConversionOptions>({
    preserveFormatting: true,
    preserveImages: false,
    preserveHyperlinks: true,
    preservePageSize: true,
    outputFilename: "converted-document",
  });

  /* ── load file ── */
  const loadFile = useCallback(async (file: File) => {
    const validation = validateWordFile(file);
    if (!validation.valid) {
      setAlert({ type: "error", message: validation.error ?? "Invalid file." });
      return;
    }
    setAlert(null);
    setResult(null);
    setProgress(0);
    const bytes = await file.arrayBuffer();
    setFileInfo({ name: file.name, size: file.size, type: file.type, bytes });
    setOptions((prev) => ({
      ...prev,
      outputFilename: file.name.replace(/\.docx?$/i, ""),
    }));
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadFile(file);
    },
    [loadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) loadFile(file);
    },
    [loadFile]
  );

  /* ── convert ── */
  const handleConvert = useCallback(async () => {
    if (!fileInfo) {
      setAlert({ type: "error", message: "Please upload a Word document first." });
      return;
    }
    setLoading(true);
    setProgress(0);
    setAlert(null);
    setResult(null);
    try {
      setProgress(15);
      await new Promise((r) => setTimeout(r, 50)); // allow UI to update
      setProgress(40);
      const convResult = await convertWordToPdf(fileInfo.bytes, options);
      setProgress(90);
      await new Promise((r) => setTimeout(r, 50));
      setProgress(100);
      setResult(convResult);
      setAlert({
        type: "success",
        message: `Successfully converted ${fileInfo.name} into a PDF document (${convResult.pageCount} page${convResult.pageCount !== 1 ? "s" : ""}).`,
      });
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof Error ? err.message : "Conversion failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [fileInfo, options]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    downloadPdf(result.blob, result.filename);
  }, [result]);

  const handleReset = useCallback(() => {
    setFileInfo(null);
    setAlert(null);
    setResult(null);
    setProgress(0);
    setLoading(false);
    setOptions({
      preserveFormatting: true,
      preserveImages: false,
      preserveHyperlinks: true,
      preservePageSize: true,
      outputFilename: "converted-document",
    });
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const stats = [
    { title: "File Size", value: fileInfo ? formatFileSize(fileInfo.size) : "—" },
    { title: "Document Type", value: fileInfo ? "DOCX" : "—" },
    { title: "Output Format", value: "PDF" },
    { title: "Processing", value: "Browser" },
  ];

  /* ── render ── */
  return (
    <main className="relative overflow-hidden bg-[#050816]">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20">

        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300">
            <Sparkles size={16} />
            Free · Secure · Browser Based
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-5xl font-black text-transparent lg:text-7xl">
            Word to PDF Converter
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Convert Microsoft Word (.docx) documents into PDF files directly
            inside your browser. No uploads. No registration. Completely private.
          </p>
        </motion.section>

        {/* ── Alert ── */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 flex items-start gap-4 rounded-3xl border p-6 ${
              alert.type === "success"
                ? "border-green-500/30 bg-green-500/10 text-green-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
            role="alert"
          >
            {alert.type === "success"
              ? <CheckCircle2 size={22} className="mt-0.5 shrink-0" />
              : <XCircle size={22} className="mt-0.5 shrink-0" />}
            <p className="font-medium">{alert.message}</p>
          </motion.div>
        )}

        {/* ── Conversion warnings ── */}
        {result && result.warnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-start gap-4 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6 text-yellow-300"
          >
            <AlertTriangle size={22} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Conversion Notes</p>
              <ul className="mt-2 space-y-1 text-sm">
                {result.warnings.slice(0, 5).map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* ── Upload ── */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
          >
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              role="button"
              tabIndex={0}
              aria-label="Upload Word document"
              onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
              className={`flex h-[320px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 ${
                dragging
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5"
              }`}
            >
              <input
                ref={inputRef}
                hidden
                type="file"
                accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                onChange={handleFileInput}
                aria-label="Word document file input"
              />
              <UploadCloud size={70} className="text-cyan-400" />
              <h2 className="mt-6 text-3xl font-bold text-white">
                {fileInfo ? fileInfo.name : "Drag & Drop Word File"}
              </h2>
              <p className="mt-3 text-zinc-400">or Click to Browse</p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                <FileText size={14} />
                DOCX · DOC supported
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── File Preview ── */}
        {fileInfo && (
          <section className="mt-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <FileText size={24} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">File Information</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {[
                  { label: "File Name", value: fileInfo.name },
                  { label: "File Size", value: formatFileSize(fileInfo.size) },
                  { label: "Document Type", value: "Word Document" },
                  { label: "Estimated Pages", value: "Calculated on convert" },
                  { label: "Status", value: result ? "Converted ✓" : "Ready" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
                    <p className="text-sm text-zinc-500">{label}</p>
                    <h3 className="mt-2 break-all text-lg font-semibold text-white">{value}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Conversion Options ── */}
        <section className="mt-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <SlidersHorizontal size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Conversion Options</h2>
            </div>

            {/* Output filename */}
            <div className="mb-8">
              <label className="mb-3 block font-medium text-white" htmlFor="output-pdf-name">
                Output File Name
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-5 py-4">
                <input
                  id="output-pdf-name"
                  type="text"
                  value={options.outputFilename}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, outputFilename: e.target.value }))
                  }
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500"
                  placeholder="converted-document"
                />
                <span className="shrink-0 text-zinc-500">.pdf</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  key: "preserveFormatting" as const,
                  label: "Preserve Formatting",
                  note: "Headings, paragraphs and lists",
                  limited: false,
                },
                {
                  key: "preserveImages" as const,
                  label: "Preserve Images",
                  note: "Limited in browser — images skipped",
                  limited: true,
                },
                {
                  key: "preserveHyperlinks" as const,
                  label: "Preserve Hyperlinks",
                  note: "Links extracted as plain text",
                  limited: true,
                },
                {
                  key: "preservePageSize" as const,
                  label: "Preserve Page Size",
                  note: "Uses A4 format",
                  limited: false,
                },
              ].map(({ key, label, note, limited }) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-[#0B1120] p-5"
                >
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                    className="mt-1 accent-cyan-400"
                  />
                  <div>
                    <p className="font-medium text-white">{label}</p>
                    <p className={`mt-1 text-xs ${limited ? "text-yellow-400/70" : "text-zinc-500"}`}>
                      {note}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleConvert}
                disabled={!fileInfo || loading}
                className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Convert Word to PDF"
              >
                {loading
                  ? <Loader2 size={18} className="animate-spin" />
                  : <FileOutput size={18} />}
                {loading ? "Converting…" : "Convert to PDF"}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={!result}
                className="flex items-center gap-2 rounded-2xl border border-cyan-500 px-8 py-4 font-semibold text-cyan-300 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Download PDF"
              >
                <Download size={18} />
                Download PDF
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Reset tool"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── Progress ── */}
        {loading && (
          <section className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-medium text-white">Converting Word document…</span>
                <span className="text-cyan-400">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-full bg-cyan-400"
                />
              </div>
              <p className="mt-4 text-sm text-zinc-500">
                {progress < 20 && "Reading Word document…"}
                {progress >= 20 && progress < 50 && "Extracting document content…"}
                {progress >= 50 && progress < 90 && "Rendering PDF pages…"}
                {progress >= 90 && "Finalising PDF…"}
              </p>
            </motion.div>
          </section>
        )}

        {/* ── Result ── */}
        {result && !loading && (
          <section className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Conversion Complete</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Pages Generated", value: String(result.pageCount) },
                  { label: "Output Format", value: "PDF" },
                  { label: "Output File", value: result.filename },
                  { label: "Status", value: "Success ✓" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-[#0B1120] p-6">
                    <p className="text-sm text-zinc-500">{label}</p>
                    <h3 className="mt-2 break-all text-lg font-semibold text-cyan-400">{value}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Statistics ── */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,.18)]"
                >
                  <h3 className="text-4xl font-black text-white">{item.value}</h3>
                  <p className="mt-3 text-zinc-400">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Privacy ── */}
        <section className="mt-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: Globe, title: "Browser Based", text: "All conversion happens inside your browser. No external servers process your documents." },
              { icon: Lock, title: "No Uploads", text: "Your Word document never leaves your device. Complete privacy guaranteed by design." },
              { icon: ShieldCheck, title: "Secure Processing", text: "mammoth and jsPDF run locally. Zero third-party access to your document content." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Icon size={26} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ── */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl lg:p-12"
          >
            <div className="mx-auto max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-cyan-300">
                <Sparkles size={16} />
                Free Online Tool
              </div>

              <h2 className="mt-8 text-4xl font-black text-white lg:text-5xl">
                Free Online Word to PDF Converter
              </h2>

              <p className="mt-8 leading-8 text-zinc-400">
                Converting Word documents to PDF is one of the most essential tasks in
                modern professional and academic environments. PDF files are universally
                readable, preserve their visual layout across all devices and operating
                systems, and cannot be accidentally edited by recipients. MeggatronAI Word
                to PDF Converter makes this conversion instant, free and completely private
                — directly inside your browser with no file uploads required.
              </p>

              <p className="mt-6 leading-8 text-zinc-400">
                Business professionals use Word to PDF conversion every day. Sending a
                proposal, contract, invoice or report as a PDF ensures the recipient sees
                exactly what you intended, regardless of which version of Word or operating
                system they use. Presentations and portfolios look more polished when shared
                as PDFs rather than editable DOCX files that may reflow text or shift
                layouts on different devices.
              </p>

              <p className="mt-6 leading-8 text-zinc-400">
                Students and academics rely on PDF submissions for assignments, dissertations
                and research papers. Most universities and institutions require PDF
                submissions to ensure consistent formatting across different marking systems.
                Converting your Word essay or thesis into PDF with MeggatronAI takes seconds
                and requires no software installation.
              </p>

              <p className="mt-6 leading-8 text-zinc-400">
                Office and administrative teams convert Word documents to PDFs to create
                permanent records, protect document content from accidental modification and
                produce professional-looking output for printing or digital distribution.
                Legal professionals use PDF for court filings, contracts and client
                agreements where exact formatting must be preserved.
              </p>

              <p className="mt-6 leading-8 text-zinc-400">
                MeggatronAI uses mammoth.js to extract the structure and text content of
                DOCX files, and jsPDF to render the output as a clean, readable PDF
                document. All processing happens in your browser — your document content
                never touches an external server, making the tool completely safe for
                confidential documents.
              </p>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-2xl font-bold text-white">What Works Well</h3>
                  <ul className="mt-6 space-y-3 text-zinc-400">
                    <li>✓ Text-heavy documents</li>
                    <li>✓ Headings and paragraphs</li>
                    <li>✓ Bullet and numbered lists</li>
                    <li>✓ Tables (rendered as text rows)</li>
                    <li>✓ Page numbering</li>
                    <li>✓ Document titles and subtitles</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-2xl font-bold text-white">Browser Limitations</h3>
                  <ul className="mt-6 space-y-3 text-zinc-400">
                    <li>⚠ Complex multi-column layouts</li>
                    <li>⚠ Embedded custom fonts</li>
                    <li>⚠ Exact image positioning</li>
                    <li>⚠ Word Art and SmartArt</li>
                    <li>⚠ Track changes and comments</li>
                    <li>⚠ Password-protected documents</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-20">
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
                Answers to common questions about our free Word to PDF Converter.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-4xl space-y-5">
              {FAQS.map((item) => (
                <motion.div
                  key={item.q}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
                >
                  <h3 className="text-xl font-bold text-white">{item.q}</h3>
                  <p className="mt-4 leading-8 text-zinc-400">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Related Tools ── */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                More Free Tools
              </span>
              <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
                Explore More Productivity Tools
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">
                Discover more premium online tools available on MeggatronAI.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {RELATED_TOOLS.map((tool) => (
                <motion.div
                  key={tool.title}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40"
                >
                  <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                  <p className="mt-4 leading-7 text-zinc-400">{tool.desc}</p>
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

        {/* ── CTA ── */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-sky-500/10 p-10 backdrop-blur-2xl lg:p-16"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
            <div className="relative text-center">
              <h2 className="bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-4xl font-black text-transparent lg:text-6xl">
                Build Smarter With MeggatronAI
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
                Discover dozens of premium productivity tools designed for creators,
                developers, students and businesses. Fast, modern and completely free.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-5">
                <Link
                  href="/tools"
                  className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,.45)]"
                >
                  Explore All Tools
                </Link>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white transition hover:border-cyan-400"
                >
                  Convert Another File
                </button>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}