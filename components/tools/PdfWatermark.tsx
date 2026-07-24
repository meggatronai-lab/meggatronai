"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { addTextWatermark, addImageWatermark } from "@/lib/pdf/watermark";
import ToolLinks from "@/components/ui/ToolLinks";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type WatermarkMode = "text" | "image";

type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface WatermarkOptions {
  text: string;
  color: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  position: WatermarkPosition;
}

interface PositionCoord {
  top: string;
  left: string;
  transform: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const MAX_PDF_SIZE_MB = 25;
const MAX_IMAGE_SIZE_MB = 8;

const DEFAULT_OPTIONS: WatermarkOptions = {
  text: "CONFIDENTIAL",
  color: "#22D3EE",
  fontSize: 36,
  opacity: 0.35,
  rotation: -30,
  position: "center",
};

const POSITION_COORDS: Record<WatermarkPosition, PositionCoord> = {
  "top-left": { top: "10%", left: "8%", transform: "translate(0, 0)" },
  "top-center": { top: "10%", left: "50%", transform: "translate(-50%, 0)" },
  "top-right": { top: "10%", left: "92%", transform: "translate(-100%, 0)" },
  "center-left": { top: "50%", left: "8%", transform: "translate(0, -50%)" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  "center-right": { top: "50%", left: "92%", transform: "translate(-100%, -50%)" },
  "bottom-left": { top: "90%", left: "8%", transform: "translate(0, -100%)" },
  "bottom-center": { top: "90%", left: "50%", transform: "translate(-50%, -100%)" },
  "bottom-right": { top: "90%", left: "92%", transform: "translate(-100%, -100%)" },
};

const POSITION_OPTIONS: { id: WatermarkPosition; label: string }[] = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "center-left", label: "Center Left" },
  { id: "center", label: "Center" },
  { id: "center-right", label: "Center Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

interface Feature {
  title: string;
  description: string;
  icon: (props: { className?: string }) => ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: "Secure",
    description: "Files are processed in memory and never stored on our servers.",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fast",
    description: "Watermark hundreds of pages in seconds, right in your browser.",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "High Quality",
    description: "Vector-accurate output that preserves your original PDF fidelity.",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Free",
    description: "No sign-up and no watermark on your watermark. Ever.",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M20 12v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 7h20v5H2V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 7v13M12 7c-1.5-3-6-3.5-6-1s3 1.5 6 1zM12 7c1.5-3 6-3.5 6-1s-3 1.5-6 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const STEPS: { title: string; description: string }[] = [
  { title: "Upload your PDF", description: "Drag and drop or browse for the file you want to protect." },
  { title: "Customize your mark", description: "Choose text or image, then fine-tune color, size, rotation, and placement." },
  { title: "Apply & download", description: "Generate the watermarked file and download it instantly." },
];

const BENEFITS: { title: string; description: string }[] = [
  { title: "Protect your work", description: "Deter unauthorized use of contracts, drafts, and creative files." },
  { title: "Brand every export", description: "Stamp your logo or name across shared documents automatically." },
  { title: "Stay in control", description: "Adjust opacity and placement so the mark never gets in the way." },
  { title: "Zero install", description: "Everything runs in your browser. No software, no plugins." },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Are my PDFs uploaded?",
    answer:
      "Your file is processed locally in your browser session and is not stored on our servers. Once you close the tab, it's gone.",
  },
  {
    question: "Can I watermark every page?",
    answer: "Yes. The watermark you configure is applied consistently across every page of your document.",
  },
  {
    question: "Can I use my logo?",
    answer: "Switch to Image mode and upload a PNG or JPG. Transparent PNGs work best for a clean, professional look.",
  },
  {
    question: "Is this free?",
    answer: "Completely free, with no sign-up required and no watermark added to your watermark.",
  },
];

const RELATED_TOOLS: { name: string; href: string; description?: string }[] = [
  { name: "Merge PDF", href: "/tools/pdf-merge", description: "Combine multiple PDFs into one file." },
  { name: "Split PDF", href: "/tools/pdf-split", description: "Extract or divide pages into separate files." },
  { name: "Compress PDF", href: "/tools/pdf-compress", description: "Shrink file size without losing quality." },
  { name: "PDF to Word", href: "/tools/pdf-to-word", description: "Convert PDFs into editable Word documents." },
];

/* -------------------------------------------------------------------------- */
/*  Small utilities                                                           */
/* -------------------------------------------------------------------------- */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/*  Presentational subcomponents                                              */
/* -------------------------------------------------------------------------- */

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={classNames(
        "pointer-events-none absolute rounded-full blur-3xl",
        className
      )}
    />
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80">
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={classNames("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function PdfWatermark() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [mode, setMode] = useState<WatermarkMode>("text");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [dragging, setDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [options, setOptions] = useState<WatermarkOptions>(DEFAULT_OPTIONS);

  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------------------------- File handling ---------------------------- */

  const validateAndSetPdf = useCallback((file: File) => {
    setError(null);
    setOutputBlob(null);

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF file.");
      return;
    }
    if (file.size > MAX_PDF_SIZE_MB * 1024 * 1024) {
      setError(`File exceeds the ${MAX_PDF_SIZE_MB}MB size limit.`);
      return;
    }
    setPdfFile(file);
  }, []);

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) validateAndSetPdf(file);
      event.target.value = "";
    },
    [validateAndSetPdf]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) validateAndSetPdf(file);
    },
    [validateAndSetPdf]
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setPdfFile(null);
    setOutputBlob(null);
    setError(null);
  }, []);

  const handleImageInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a PNG or JPG image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError(`Image exceeds the ${MAX_IMAGE_SIZE_MB}MB size limit.`);
      return;
    }
    setError(null);
    setOutputBlob(null);
    setWatermarkImage(file);
  }, []);

  const imagePreviewUrl = useMemo(
    () => (watermarkImage ? URL.createObjectURL(watermarkImage) : null),
    [watermarkImage]
  );

  /* ------------------------------ Option setters ------------------------------ */

  const updateOption = useCallback(
    <K extends keyof WatermarkOptions>(key: K, value: WatermarkOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  /* ------------------------------ Processing ------------------------------ */

  const canApply = useMemo(() => {
    if (!pdfFile) return false;
    if (mode === "text") return options.text.trim().length > 0;
    return watermarkImage !== null;
  }, [pdfFile, mode, options.text, watermarkImage]);

  const handleApply = useCallback(async () => {
    if (!pdfFile || !canApply) return;

    setLoading(true);
    setError(null);

    try {
      let blob: Blob;

      if (mode === "text") {
        blob = await addTextWatermark(pdfFile, {
          text: options.text,
          color: options.color,
          fontSize: options.fontSize,
          opacity: options.opacity,
          rotation: options.rotation,
          position: options.position,
        });
      } else {
        if (!watermarkImage) throw new Error("Please upload a watermark image.");
        blob = await addImageWatermark(pdfFile, watermarkImage, {
          opacity: options.opacity,
          rotation: options.rotation,
          position: options.position,
        });
      }

      setOutputBlob(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while applying the watermark.");
    } finally {
      setLoading(false);
    }
  }, [pdfFile, canApply, mode, options, watermarkImage]);

  const handleDownload = useCallback(() => {
    if (!outputBlob) return;
    const url = URL.createObjectURL(outputBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    const baseName = pdfFile?.name.replace(/\.pdf$/i, "") ?? "document";
    anchor.download = `${baseName}-watermarked.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, [outputBlob, pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setWatermarkImage(null);
    setMode("text");
    setLoading(false);
    setError(null);
    setOutputBlob(null);
    setDragging(false);
    setOptions(DEFAULT_OPTIONS);
  }, []);

  const activeCoord = POSITION_COORDS[options.position];

  /* -------------------------------------------------------------------------- */
  /*  Render                                                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <main className="relative overflow-hidden bg-[#050816] text-white">
      {/* Ambient background glow, shared across hero + CTA */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#050816]" />
        <div
          className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[30%] right-[-10%] h-[420px] w-[420px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-20 text-center sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionEyebrow>Premium PDF Tools</SectionEyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            PDF Watermark
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-2xl text-balance text-lg text-slate-400"
        >
          Stamp text or image watermarks across every page of your PDF in seconds.
          Precise placement, full control, zero uploads to a server.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => pdfInputRef.current?.click()}
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-sm font-semibold text-[#050816] shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Upload a PDF
          </button>
          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur-xl transition-colors hover:bg-white/[0.06]"
          >
            See how it works
          </a>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Feature cards                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <GlassCard className="h-full p-6 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.05]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Workspace: Upload + Settings (left) / Live Preview (right)       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ------------------------------ Left column ------------------------------ */}
          <div className="flex flex-col gap-6">
            {/* Upload area */}
            <GlassCard className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Upload PDF</h2>

              {!pdfFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => pdfInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") pdfInputRef.current?.click();
                  }}
                  aria-label="Upload PDF file, drag and drop or browse"
                  className={classNames(
                    "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
                    dragging
                      ? "border-cyan-400 bg-cyan-400/[0.06]"
                      : "border-white/15 bg-white/[0.02] hover:border-white/25"
                  )}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-cyan-300">
                    <path d="M12 16V4m0 0L7 9m5-5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-4 text-sm font-medium text-white">Drag & drop your PDF here</p>
                  <p className="mt-1 text-xs text-slate-500">or click to browse · up to {MAX_PDF_SIZE_MB}MB</p>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                        <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{pdfFile.name}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(pdfFile.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove file"
                    className="flex-shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </motion.div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 rounded-lg border border-red-400/20 bg-red-400/[0.08] px-3 py-2 text-xs text-red-300"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </GlassCard>

            {/* Watermark settings */}
            <GlassCard className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Watermark Settings</h2>

              {/* Mode segmented control */}
              <div className="relative mt-4 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.02] p-1">
                {(["text", "image"] as WatermarkMode[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMode(option)}
                    className="relative z-10 rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors"
                    style={{ color: mode === option ? "#050816" : "#94A3B8" }}
                  >
                    {mode === option && (
                      <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-cyan-400"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {option}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {mode === "text" ? (
                  <motion.div
                    key="text-controls"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 flex flex-col gap-5"
                  >
                    <div>
                      <label htmlFor="watermark-text" className="text-xs font-medium text-slate-400">
                        Watermark text
                      </label>
                      <input
                        id="watermark-text"
                        type="text"
                        value={options.text}
                        onChange={(event) => updateOption("text", event.target.value)}
                        placeholder="e.g. CONFIDENTIAL"
                        className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-400/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="watermark-color" className="text-xs font-medium text-slate-400">
                        Color
                      </label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          id="watermark-color"
                          type="color"
                          value={options.color}
                          onChange={(event) => updateOption("color", event.target.value)}
                          className="h-9 w-11 cursor-pointer rounded-lg border border-white/10 bg-transparent p-0.5"
                        />
                        <input
                          type="text"
                          value={options.color}
                          onChange={(event) => updateOption("color", event.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm uppercase text-white outline-none focus:border-cyan-400/50"
                        />
                      </div>
                    </div>

                    <SliderField
                      label="Font size"
                      value={options.fontSize}
                      min={8}
                      max={96}
                      step={1}
                      unit="px"
                      onChange={(value) => updateOption("fontSize", value)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="image-controls"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 flex flex-col gap-4"
                  >
                    <div>
                      <label className="text-xs font-medium text-slate-400">Watermark image</label>
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="mt-2 flex w-full items-center justify-between rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-left text-sm text-slate-300 transition-colors hover:border-cyan-400/40"
                      >
                        <span className="truncate">
                          {watermarkImage ? watermarkImage.name : "Choose PNG or JPG"}
                        </span>
                        <span className="ml-3 flex-shrink-0 rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-300">
                          Browse
                        </span>
                      </button>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleImageInputChange}
                        className="hidden"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-xs text-slate-500">Transparent PNGs work best · up to {MAX_IMAGE_SIZE_MB}MB</p>
                    </div>

                    {imagePreviewUrl && (
                      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreviewUrl}
                          alt="Watermark preview"
                          className="h-12 w-12 rounded-md border border-white/10 object-contain"
                        />
                        <p className="truncate text-xs text-slate-400">{watermarkImage?.name}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shared controls */}
              <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-6">
                <SliderField
                  label="Opacity"
                  value={Math.round(options.opacity * 100)}
                  min={5}
                  max={100}
                  step={5}
                  unit="%"
                  onChange={(value) => updateOption("opacity", value / 100)}
                />
                <SliderField
                  label="Rotation"
                  value={options.rotation}
                  min={-180}
                  max={180}
                  step={5}
                  unit="°"
                  onChange={(value) => updateOption("rotation", value)}
                />
              </div>
            </GlassCard>

            {/* Position selector */}
            <GlassCard className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Position</h2>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {POSITION_OPTIONS.map((position) => (
                  <button
                    key={position.id}
                    type="button"
                    onClick={() => updateOption("position", position.id)}
                    aria-pressed={options.position === position.id}
                    aria-label={position.label}
                    className={classNames(
                      "flex aspect-square items-center justify-center rounded-lg border text-[10px] font-medium transition-colors",
                      options.position === position.id
                        ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                        : "border-white/10 bg-white/[0.02] text-slate-500 hover:border-white/25 hover:text-slate-300"
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">{POSITION_OPTIONS.find((p) => p.id === options.position)?.label}</p>
            </GlassCard>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={handleApply}
                disabled={!canApply || loading}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-5 py-3 text-sm font-semibold text-[#050816] shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading && <Spinner className="h-4 w-4" />}
                {loading ? "Applying…" : "Apply Watermark"}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleDownload}
                disabled={!outputBlob}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-opacity hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download PDF
              </motion.button>

              <motion.button
                type="button"
                onClick={handleReset}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-5 py-3 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/[0.12]"
              >
                Reset
              </motion.button>
            </div>
          </div>

          {/* ------------------------------ Right column: Live preview ------------------------------ */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <GlassCard className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Live Preview</h2>

              <div className="relative mt-4 aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
                {/* Mock page lines to suggest a document */}
                <div className="absolute inset-0 flex flex-col gap-3 p-8 opacity-40">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-2 rounded-full bg-white/10"
                      style={{ width: `${85 - (index % 3) * 15}%` }}
                    />
                  ))}
                </div>

                {/* Watermark overlay */}
                <div
                  className="absolute select-none whitespace-nowrap font-semibold"
                  style={{
                    top: activeCoord.top,
                    left: activeCoord.left,
                    transform: `${activeCoord.transform} rotate(${options.rotation}deg)`,
                  }}
                >
                  {mode === "text" ? (
                    <span
                      style={{
                        color: options.color,
                        opacity: options.opacity,
                        fontSize: `${Math.max(options.fontSize / 2.2, 10)}px`,
                      }}
                    >
                      {options.text || "WATERMARK"}
                    </span>
                  ) : imagePreviewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreviewUrl}
                      alt="Watermark preview"
                      style={{ opacity: options.opacity }}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-600">Upload an image to preview</span>
                  )}
                </div>

                {!pdfFile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#050816]/60 backdrop-blur-sm">
                    <p className="max-w-[70%] text-center text-xs text-slate-500">
                      Upload a PDF to see your watermark applied live
                    </p>
                  </div>
                )}
              </div>

              {outputBlob && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center gap-2 text-xs text-emerald-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Watermark applied. Ready to download.
                </motion.p>
              )}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="how-it-works" className="relative mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Three steps to a protected PDF</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <GlassCard className="h-full p-6">
                <span className="text-3xl font-semibold text-cyan-400/60">{`0${index + 1}`}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Benefits                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center">
          <SectionEyebrow>Why it matters</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Built for people who share files</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <GlassCard className="flex items-start gap-4 p-6">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{benefit.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-3xl px-6 pb-24">
        <div className="text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <GlassCard key={faq.question} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-cyan-300"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Related tools                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center">
          <SectionEyebrow>Explore more</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Related tools</h2>
        </div>
        <div className="mt-10">
          <ToolLinks tools={RELATED_TOOLS} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Premium CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-5xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center backdrop-blur-xl">
          <GlowOrb className="left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/30" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to protect your PDFs?</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Apply a professional watermark in seconds and download instantly. No account, no cost.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <motion.button
                type="button"
                onClick={handleApply}
                disabled={!canApply || loading}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-sm font-semibold text-[#050816] shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                Apply Watermark
              </motion.button>
              <motion.button
                type="button"
                onClick={handleDownload}
                disabled={!outputBlob}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download PDF
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Slider field                                                              */
/* -------------------------------------------------------------------------- */

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  const id = `slider-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-slate-400">
          {label}
        </label>
        <span className="text-xs font-medium text-cyan-300">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400"
      />
    </div>
  );
}