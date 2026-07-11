"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  splitEveryPage,
  splitRange,
  splitSpecificPages,
  splitIntoParts,
} from "@/lib/pdf/split";
import {
  Sparkles,
  UploadCloud,
  FileText,
  Scissors,
  Layers,
  AlignJustify,
  Hash,
  SplitSquareHorizontal,
  Download,
  RotateCcw,
  ShieldCheck,
  Globe,
  Lock,
  CheckCircle2,
  XCircle,
  Loader2,
  FileOutput,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

type SplitMode = "every" | "range" | "specific" | "parts";

interface PdfInfo {
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
}

interface AlertState {
  type: "success" | "error";
  message: string;
}

/* ─────────────────────────────────────────────
   Download helpers — zero external packages
───────────────────────────────────────────── */

function uint8ToBlob(data: Uint8Array): Blob {
  const copy = new Uint8Array(data.length);
  copy.set(data);
  return new Blob([copy], { type: "application/pdf" });
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function downloadZip(
  files: { name: string; data: Uint8Array }[],
  zipName: string
): Promise<void> {
  try {
    const mod = await import("jszip").catch(() => null);
    if (mod) {
      const JSZip = mod.default;
      const zip = new JSZip();
      files.forEach(({ name, data }) => zip.file(name, data));
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, zipName);
      return;
    }
  } catch {}
  files.forEach(({ name, data }) => downloadBlob(uint8ToBlob(data), name));
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

function parseSpecificPages(raw: string, max: number): number[] {
  return [
    ...new Set(
      raw
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n >= 1 && n <= max)
    ),
  ].sort((a, b) => a - b);
}

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */

const SPLIT_MODES: {
  id: SplitMode;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  example: string;
}[] = [
  {
    id: "every",
    label: "Split Every Page",
    icon: Layers,
    description: "Creates one PDF for every single page in the document.",
    example: "128 pages → 128 PDFs",
  },
  {
    id: "range",
    label: "Page Range",
    icon: AlignJustify,
    description: "Extract a continuous range of pages into a single PDF.",
    example: "e.g. pages 1–10",
  },
  {
    id: "specific",
    label: "Specific Pages",
    icon: Hash,
    description: "Extract individual pages by number into a single PDF.",
    example: "e.g. 2, 5, 7, 20",
  },
  {
    id: "parts",
    label: "Equal Parts",
    icon: SplitSquareHorizontal,
    description: "Divide the PDF into a number of equal-sized chunks.",
    example: "e.g. 3 equal PDFs",
  },
];

const FEATURES = [
  {
    icon: Layers,
    title: "Four Split Modes",
    text: "Split every page, extract a range, pick specific pages or divide into equal parts.",
  },
  {
    icon: Globe,
    title: "Browser Based",
    text: "All processing happens inside your browser. No server uploads, ever.",
  },
  {
    icon: Download,
    title: "ZIP Download",
    text: "Multiple output files are bundled automatically into a single ZIP archive.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    text: "Your PDF never leaves your device. Complete privacy by design.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the PDF Splitter free?",
    a: "Yes. Every split mode is completely free with no account, subscription or payment required.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "No. All processing happens inside your browser using pdf-lib. Your files never leave your device.",
  },
  {
    q: "Can I split large PDF files?",
    a: "Yes. The tool processes everything locally so performance depends only on your device.",
  },
  {
    q: "Can I split into equal parts?",
    a: "Absolutely. Select Equal Parts, enter the number of chunks and pages are distributed evenly.",
  },
  {
    q: "Can I extract specific pages?",
    a: "Yes. Use Specific Pages mode and enter page numbers separated by commas, e.g. 2, 5, 8, 20.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. The PDF Splitter is fully responsive and works on smartphones, tablets and desktops.",
  },
  {
    q: "What format are the output files?",
    a: "All outputs are standard PDF files. Multiple PDFs are bundled into a ZIP archive.",
  },
];

const RELATED_TOOLS = [
  { title: "PDF Merger", desc: "Merge multiple PDF files into one document.", href: "/tools/pdf-merger" },
  { title: "Image Compressor", desc: "Reduce image size without quality loss.", href: "/tools/image-compressor" },
  { title: "Password Generator", desc: "Generate strong, secure passwords instantly.", href: "/tools/password-tool" },
  { title: "Word Counter", desc: "Count words, characters, reading time and more.", href: "/tools/word-counter" },
];

const STATS = [
  { value: "4", label: "Split Modes" },
  { value: "100%", label: "Browser Based" },
  { value: "0", label: "Files Uploaded" },
  { value: "Free", label: "No Registration" },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function PDFSplitter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [mode, setMode] = useState<SplitMode>("every");
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(1);
  const [specificRaw, setSpecificRaw] = useState("");
  const [parts, setParts] = useState(2);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  /* ── load PDF ── */
  const loadPdf = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) {
      setAlert({ type: "error", message: "Please upload a valid PDF file." });
      return;
    }
    setAlert(null);
    const bytes = await file.arrayBuffer();
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(bytes);
    const pageCount = doc.getPageCount();
    setPdfInfo({ name: file.name, size: file.size, pageCount, bytes });
    setRangeStart(1);
    setRangeEnd(pageCount);
    setParts(Math.min(2, pageCount));
    setSpecificRaw("");
    setMode("every");
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadPdf(file);
    },
    [loadPdf]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) loadPdf(file);
    },
    [loadPdf]
  );

  /* ── output preview ── */
  const outputPreview = useMemo<{ top: string; mid: string; bot: string } | null>(() => {
    if (!pdfInfo) return null;
    const { pageCount } = pdfInfo;
    if (mode === "every") return { top: `${pageCount} Pages`, mid: "↓", bot: `${pageCount} PDFs` };
    if (mode === "range") {
      const s = Math.max(1, rangeStart);
      const e = Math.min(pageCount, rangeEnd);
      if (s > e) return { top: `${pageCount} Pages`, mid: "↓", bot: "Invalid range" };
      return { top: `${pageCount} Pages`, mid: `↓  Pages ${s}–${e}`, bot: `1 PDF (${e - s + 1} pages)` };
    }
    if (mode === "specific") {
      const pages = parseSpecificPages(specificRaw, pageCount);
      return { top: `${pageCount} Pages`, mid: `↓  ${pages.length} selected`, bot: pages.length > 0 ? `1 PDF (${pages.length} pages)` : "No valid pages" };
    }
    if (mode === "parts") {
      const p = Math.max(2, Math.min(pageCount, parts));
      return { top: `${pageCount} Pages`, mid: "↓", bot: `${p} PDFs (~${Math.floor(pageCount / p)} pages each)` };
    }
    return null;
  }, [pdfInfo, mode, rangeStart, rangeEnd, specificRaw, parts]);

  /* ── live stats ── */
  const liveStats = useMemo(() => {
    if (!pdfInfo) return null;
    const { pageCount, size } = pdfInfo;
    let est = "—";
    if (mode === "every") est = `${pageCount} PDFs`;
    else if (mode === "range") {
      const count = Math.max(0, Math.min(pageCount, rangeEnd) - Math.max(1, rangeStart) + 1);
      est = count > 0 ? `1 PDF, ${count} pages` : "Invalid";
    } else if (mode === "specific") {
      const pages = parseSpecificPages(specificRaw, pageCount);
      est = pages.length > 0 ? `1 PDF, ${pages.length} pages` : "Invalid";
    } else if (mode === "parts") est = `${parts} PDFs`;
    return [
      { title: "Total Pages", value: String(pageCount) },
      { title: "File Size", value: formatBytes(size) },
      { title: "Estimated Output", value: est },
      { title: "Processing", value: "Browser" },
    ];
  }, [pdfInfo, mode, rangeStart, rangeEnd, specificRaw, parts]);

  /* ── split ── */
  const handleSplit = useCallback(async () => {
    if (!pdfInfo) {
      setAlert({ type: "error", message: "No PDF selected. Please upload a file first." });
      return;
    }
    const { bytes, pageCount, name } = pdfInfo;
    setLoading(true);
    setAlert(null);
    try {
      if (mode === "every") {
        const pdfs = await splitEveryPage(bytes);
        if (pdfs.length === 1) {
          downloadBlob(uint8ToBlob(pdfs[0]), "page-1.pdf");
        } else {
          await downloadZip(
            pdfs.map((pdf, i) => ({ name: `page-${i + 1}.pdf`, data: pdf })),
            `${name.replace(/\.pdf$/i, "")}-split.zip`
          );
        }
        setAlert({ type: "success", message: `PDF split into ${pdfs.length} file${pdfs.length > 1 ? "s" : ""} successfully.` });
        return;
      }
      if (mode === "range") {
        const s = Math.max(1, rangeStart);
        const e = Math.min(pageCount, rangeEnd);
        if (s > e) { setAlert({ type: "error", message: `Invalid page range: ${s}–${e}.` }); return; }
        const pdf = await splitRange(bytes, s, e);
        downloadBlob(uint8ToBlob(pdf), `pages-${s}-${e}.pdf`);
        setAlert({ type: "success", message: `Pages ${s}–${e} extracted successfully.` });
        return;
      }
      if (mode === "specific") {
        const pages = parseSpecificPages(specificRaw, pageCount);
        if (pages.length === 0) { setAlert({ type: "error", message: "No valid pages specified. Check your input." }); return; }
        const pdf = await splitSpecificPages(bytes, pages);
        downloadBlob(uint8ToBlob(pdf), `pages-${pages.join("-")}.pdf`);
        setAlert({ type: "success", message: `${pages.length} page${pages.length > 1 ? "s" : ""} extracted successfully.` });
        return;
      }
      if (mode === "parts") {
        const p = Math.max(2, Math.min(pageCount, parts));
        const pdfs = await splitIntoParts(bytes, p);
        await downloadZip(
          pdfs.map((pdf, i) => ({ name: `part-${i + 1}.pdf`, data: pdf })),
          `${name.replace(/\.pdf$/i, "")}-parts.zip`
        );
        setAlert({ type: "success", message: `PDF split into ${p} equal parts successfully.` });
      }
    } catch (err) {
      setAlert({ type: "error", message: err instanceof Error ? err.message : "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }, [pdfInfo, mode, rangeStart, rangeEnd, specificRaw, parts]);

  const handleReset = useCallback(() => {
    setPdfInfo(null);
    setMode("every");
    setRangeStart(1);
    setRangeEnd(1);
    setSpecificRaw("");
    setParts(2);
    setAlert(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  /* ─────────────────────────────────────────────
     Render
  ───────────────────────────────────────────── */

  return (
    <main className="relative overflow-hidden bg-[#050816]">

      {/* Background glows — matches image compressor exactly */}
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
            PDF Splitter
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Split PDF files into individual pages, custom page ranges or equal parts
            directly inside your browser. No uploads. No registration. Completely private.
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
              aria-label="Upload PDF file"
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
                accept="application/pdf"
                onChange={handleFileInput}
                aria-label="PDF file input"
              />
              <UploadCloud size={70} className="text-cyan-400" />
              <h2 className="mt-6 text-3xl font-bold text-white">
                {pdfInfo ? pdfInfo.name : "Drag & Drop PDF"}
              </h2>
              <p className="mt-3 text-zinc-400">or Click to Upload</p>
              <p className="mt-8 text-sm text-zinc-500">PDF files only</p>
            </div>
          </motion.div>
        </section>

        {/* ── PDF Analysis ── */}
        {pdfInfo && (
          <section className="mt-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <FileText size={24} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">PDF Analysis</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {[
                  { label: "File Name", value: pdfInfo.name },
                  { label: "File Size", value: formatBytes(pdfInfo.size) },
                  { label: "Total Pages", value: String(pdfInfo.pageCount) },
                  { label: "Status", value: "Ready" },
                  { label: "Output Estimate", value: outputPreview?.bot ?? "—" },
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

        {/* ── Split Modes ── */}
        <section className="mt-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <Scissors size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Choose Split Mode</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {SPLIT_MODES.map(({ id, label, icon: Icon, description, example }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMode(id)}
                    aria-pressed={active}
                    className={`flex flex-col items-start gap-4 rounded-2xl border p-6 text-left transition-all duration-300 ${
                      active
                        ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,.2)]"
                        : "border-white/10 bg-[#0B1120] hover:border-cyan-400/40"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${active ? "bg-cyan-500/20" : "bg-cyan-500/10"}`}>
                      <Icon size={22} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className={`font-semibold ${active ? "text-white" : "text-zinc-300"}`}>{label}</p>
                      <p className="mt-1.5 text-sm leading-6 text-zinc-500">{description}</p>
                      <p className={`mt-2 text-xs font-medium ${active ? "text-cyan-400" : "text-zinc-600"}`}>{example}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── Dynamic Controls ── */}
        {pdfInfo && (
          <section className="mt-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <h2 className="mb-8 text-2xl font-bold text-white">Split Configuration</h2>

              {mode === "every" && (
                <p className="text-zinc-400">
                  This will generate{" "}
                  <span className="font-bold text-cyan-400">{pdfInfo.pageCount} PDFs</span>,
                  one for each page in the document.
                </p>
              )}

              {mode === "range" && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block font-medium text-white">Start Page</label>
                    <input
                      type="number"
                      min={1}
                      max={pdfInfo.pageCount}
                      value={rangeStart}
                      onChange={(e) => setRangeStart(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full rounded-2xl border border-white/10 bg-[#0B1120] p-4 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                      aria-label="Start page"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block font-medium text-white">End Page</label>
                    <input
                      type="number"
                      min={1}
                      max={pdfInfo.pageCount}
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(Math.min(pdfInfo.pageCount, parseInt(e.target.value) || 1))}
                      className="w-full rounded-2xl border border-white/10 bg-[#0B1120] p-4 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                      aria-label="End page"
                    />
                  </div>
                  {rangeStart > rangeEnd && (
                    <p className="text-sm text-red-300 md:col-span-2">
                      Start page must be less than or equal to end page.
                    </p>
                  )}
                </div>
              )}

              {mode === "specific" && (
                <div>
                  <label className="mb-3 block font-medium text-white">
                    Page Numbers (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={specificRaw}
                    onChange={(e) => setSpecificRaw(e.target.value)}
                    placeholder="e.g. 2, 5, 7, 20"
                    className="w-full rounded-2xl border border-white/10 bg-[#0B1120] p-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                    aria-label="Specific page numbers"
                  />
                  {specificRaw && (
                    <p className="mt-3 text-sm text-zinc-400">
                      Valid pages:{" "}
                      <span className="font-semibold text-cyan-400">
                        {parseSpecificPages(specificRaw, pdfInfo.pageCount).join(", ") || "None"}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {mode === "parts" && (
                <div className="max-w-xs">
                  <label className="mb-3 block font-medium text-white">
                    Number of Parts (2–{pdfInfo.pageCount})
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={pdfInfo.pageCount}
                    value={parts}
                    onChange={(e) =>
                      setParts(Math.max(2, Math.min(pdfInfo.pageCount, parseInt(e.target.value) || 2)))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#0B1120] p-4 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                    aria-label="Number of parts"
                  />
                  <p className="mt-3 text-sm text-zinc-400">
                    Estimated pages per part:{" "}
                    <span className="font-semibold text-cyan-400">
                      {Math.floor(pdfInfo.pageCount / parts)}–{Math.ceil(pdfInfo.pageCount / parts)}
                    </span>
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleSplit}
                  disabled={!pdfInfo || loading}
                  className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Scissors size={18} />}
                  {loading ? "Processing…" : "Generate Split"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Output Preview ── */}
        {pdfInfo && outputPreview && (
          <section className="mt-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <FileOutput size={24} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Output Preview</h2>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0B1120] p-10 text-center">
                <p className="text-3xl font-black text-white">{outputPreview.top}</p>
                <p className="text-xl font-semibold text-cyan-400">{outputPreview.mid}</p>
                <p className="text-2xl font-bold text-white">{outputPreview.bot}</p>
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Live Statistics ── */}
        {liveStats && (
          <section className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {liveStats.map((item, index) => (
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
        )}

        {/* ── Features ── */}
        <section className="mt-20">
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
                Powerful Features
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
                Everything you need to split PDF files quickly, securely and privately.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.18)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                      <Icon size={26} className="text-cyan-400" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-4 leading-7 text-zinc-400">{feature.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── Privacy ── */}
        <section className="mt-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: Globe, title: "Browser Based", text: "All splitting happens inside your browser with no external processing required." },
              { icon: Lock, title: "No Uploads", text: "Your PDF never leaves your device. Privacy is guaranteed by design." },
              { icon: ShieldCheck, title: "Secure Processing", text: "pdf-lib handles all operations locally. Zero third-party access to your files." },
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
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:p-12"
          >
            <h2 className="text-3xl font-black text-white">
              Free Online PDF Splitter
            </h2>
            <p className="mt-6 leading-8 text-zinc-400">
              A PDF Splitter divides a single PDF into multiple smaller files. Whether you need
              individual pages, a custom range, specific page numbers or equal chunks, MeggatronAI
              makes the process instant and effortless — entirely inside your browser.
            </p>
            <p className="mt-5 leading-8 text-zinc-400">
              Lawyers can isolate exhibits from case files. Accountants can separate invoices from
              statements. Developers can extract reference pages from documentation. Teachers can
              distribute individual worksheets without sharing an entire course pack.
            </p>
            <p className="mt-5 leading-8 text-zinc-400">
              Everything is processed using pdf-lib directly in your browser. Your documents are
              never transmitted to any server, never stored remotely and never visible to anyone
              outside your device. Multiple output files are automatically packaged into a ZIP.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-bold text-white">Features</h3>
                <ul className="mt-5 space-y-3 text-zinc-400">
                  {["Split every page into individual PDFs", "Extract custom page ranges", "Extract specific page numbers", "Split into equal parts", "Browser-based processing", "ZIP download for multiple files", "Fast local performance", "Completely private"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-bold text-white">Best For</h3>
                <ul className="mt-5 space-y-3 text-zinc-400">
                  {["Business documents", "Assignments and coursework", "Legal files and exhibits", "Reports and presentations", "Invoices and statements", "Books and manuscripts", "Research papers", "Technical documentation"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
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
                Answers to the most common questions about our free PDF Splitter.
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

        {/* ── General Stats ── */}
        <section className="mt-20">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.04 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl"
              >
                <h3 className="text-5xl font-black text-cyan-400">{item.value}</h3>
                <p className="mt-4 text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
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
                More Free AI Tools
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
                Discover dozens of premium productivity tools designed for creators, developers,
                students and businesses. Everything is fast, modern and completely free.
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
                  Split Another PDF
                </button>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}