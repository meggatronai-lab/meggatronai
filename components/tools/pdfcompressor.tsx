"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
  Cpu,
  Sparkles,
  Layers,
  Gauge,
  Zap,
  ChevronDown,
  Merge,
  Split,
  FileType,
  Image as ImageIcon,
  ArrowDown,
} from "lucide-react";

import {
  compressPdf,
  downloadCompressedPdf,
  validatePdfFile,
  formatFileSize,
  getPdfPreviewInfo,
  estimateCompressedSize,
  getDefaultImageQuality,
  type CompressionLevel,
  type CompressionOptions,
  type CompressionResult,
  type PdfPreviewInfo,
} from "@/lib/pdf/pdfcompressor";

type Status = "idle" | "ready" | "compressing" | "success" | "error";

interface RelatedTool {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface FaqItem {
  question: string;
  answer: string;
}

const relatedTools: RelatedTool[] = [
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    description: "Combine multiple PDF files into a single document.",
    icon: <Merge className="h-4 w-4 text-cyan-400" aria-hidden="true" />,
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split a PDF into separate files by page range.",
    icon: <Split className="h-4 w-4 text-cyan-400" aria-hidden="true" />,
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF documents into editable .docx files.",
    icon: <FileType className="h-4 w-4 text-cyan-400" aria-hidden="true" />,
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Reduce image file size without losing quality.",
    icon: <ImageIcon className="h-4 w-4 text-cyan-400" aria-hidden="true" />,
  },
];

const faqs: FaqItem[] = [
  {
    question: "Is this PDF compressor really free?",
    answer:
      "Yes. Compressing PDF files with MeggatronAI is completely free, with no account, subscription, or file limits beyond the 50MB size cap.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. Your PDF is processed entirely inside your browser using JavaScript. It is never sent to MeggatronAI or any third-party server.",
  },
  {
    question: "How much smaller will my file get?",
    answer:
      "It depends on the content. PDFs with many embedded JPEG photos or scanned pages typically shrink the most. Text-only or vector-based PDFs may only see modest reductions since there are few images to re-encode.",
  },
  {
    question: "Will compression reduce the quality of my document?",
    answer:
      "Higher compression levels lower image quality and, in some cases, image resolution. Text and vector content are never degraded. Choose Low Compression if visual fidelity matters most.",
  },
  {
    question: "What does 'Remove metadata' do?",
    answer:
      "It strips optional document properties like title, author, subject, keywords, and producer information, which can shave a small amount of extra size off the file.",
  },
  {
    question: "Why didn't my file get smaller?",
    answer:
      "Some PDFs are already well optimized, or are made up mostly of text and vector graphics rather than JPEG images, so there's little left to compress. PNG images inside a PDF are also not re-encoded in this version of the tool.",
  },
  {
    question: "What is the maximum file size supported?",
    answer:
      "You can compress PDF files up to 50MB in size. Larger files may take longer to process depending on your device.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "The tool works in all modern browsers, including Chrome, Firefox, Safari, and Edge, on desktop, tablet, and mobile devices.",
  },
];

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PdfPreviewInfo | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [options, setOptions] = useState<CompressionOptions>({
    compressionLevel: "balanced",
    imageQuality: getDefaultImageQuality("balanced"),
    removeMetadata: true,
    optimizeObjects: true,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const resetAll = useCallback(() => {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
    setResult(null);
    setOptions({
      compressionLevel: "balanced",
      imageQuality: getDefaultImageQuality("balanced"),
      removeMetadata: true,
      optimizeObjects: true,
    });
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFile = useCallback(async (selected: File) => {
    const validation = validatePdfFile(selected);
    if (!validation.valid) {
      setStatus("error");
      setErrorMessage(validation.error ?? "Invalid file.");
      return;
    }

    setErrorMessage("");
    setFile(selected);
    setResult(null);

    try {
      const info = await getPdfPreviewInfo(selected);
      setPreview(info);
      setStatus("ready");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't read this PDF. It may be corrupted or password protected."
      );
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleLevelChange = (level: CompressionLevel) => {
    setOptions((prev) => ({
      ...prev,
      compressionLevel: level,
      imageQuality: getDefaultImageQuality(level),
    }));
  };

  const handleCompress = async () => {
    if (!file) return;

    setStatus("compressing");
    setProgress(0);
    setErrorMessage("");

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 88 ? prev + Math.random() * 12 : prev));
    }, 180);

    try {
      const compressionResult = await compressPdf(file, options);
      clearInterval(progressTimer);
      setProgress(100);
      setResult(compressionResult);
      setStatus("success");
    } catch {
      clearInterval(progressTimer);
      setStatus("error");
      setErrorMessage(
        "Something went wrong while compressing your file. Please try again."
      );
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadCompressedPdf(
      result.blob,
      (file?.name ?? "compressed").replace(/\.pdf$/i, "")
    );
  };

  const isCompressing = status === "compressing";
  const hasFile = !!file && !!preview;

  const estimatedSize =
    file && !result
      ? estimateCompressedSize(file.size, options.compressionLevel)
      : null;

  return (
    <main className="min-h-screen bg-[#070b16] pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 1. Hero */}
        <section className="pt-16 pb-10 sm:pt-24 sm:pb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Free &amp; Browser-Based
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight text-white"
          >
            PDF Compressor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-400"
          >
            Compress PDF files online for free using MeggatronAI. Reduce PDF
            file size while maintaining document quality, entirely inside
            your browser.
          </motion.p>
        </section>

        {/* 2. Upload Area */}
        {!hasFile && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-[#111827] p-6 sm:p-10"
          >
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
                isDragging
                  ? "border-cyan-400 bg-cyan-500/5"
                  : "border-white/10 bg-[#070b16]"
              }`}
            >
              <div className="rounded-full bg-cyan-500/10 p-4">
                <Upload className="h-7 w-7 text-cyan-400" aria-hidden="true" />
              </div>

              <p className="mt-5 text-base sm:text-lg font-medium text-white">
                Drag &amp; drop your PDF here
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                or click below to browse from your device
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label="Upload PDF file"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16]"
              >
                <Upload className="h-4 w-4" aria-hidden="true" />
                Choose PDF File
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleInputChange}
                className="hidden"
                aria-hidden="true"
              />

              <p className="mt-5 text-xs text-zinc-500">
                Supported format: .pdf &nbsp;•&nbsp; Max size: 50MB
              </p>
            </div>

            {status === "error" && !file && (
              <div
                role="alert"
                className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#070b16] px-4 py-3 text-sm text-red-400"
              >
                <XCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {errorMessage}
              </div>
            )}
          </motion.section>
        )}

        {/* 3. File Preview + 4. Options + 5. Action Area + 6. Results */}
        <AnimatePresence>
          {hasFile && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* File Preview */}
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 rounded-lg bg-cyan-500/10 p-3">
                      <FileText className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {file?.name}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {preview?.pageCount} page
                        {preview && preview.pageCount !== 1 ? "s" : ""}{" "}
                        &nbsp;•&nbsp; {file && formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-medium sm:self-auto ${
                      status === "error"
                        ? "border-white/10 bg-[#070b16] text-red-400"
                        : "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Compressed
                      </>
                    ) : status === "error" ? (
                      <>
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Failed
                      </>
                    ) : (
                      <>
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        Ready to compress
                      </>
                    )}
                  </span>
                </div>

                {estimatedSize !== null && status !== "success" && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#070b16] px-4 py-3 text-xs text-zinc-400">
                    <Gauge className="h-4 w-4 flex-shrink-0 text-cyan-400" aria-hidden="true" />
                    Estimated output size at this level:{" "}
                    <span className="font-medium text-cyan-300">
                      ~{formatFileSize(estimatedSize)}
                    </span>
                    <span className="text-zinc-500">
                      (rough estimate, actual result may vary)
                    </span>
                  </div>
                )}
              </div>

              {/* Compression Options */}
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h2 className="text-sm font-semibold text-white">
                  Compression Options
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <LevelCard
                    label="Low Compression"
                    sublabel="Highest Quality"
                    active={options.compressionLevel === "low"}
                    onClick={() => handleLevelChange("low")}
                    icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
                  />
                  <LevelCard
                    label="Balanced"
                    sublabel="Recommended"
                    active={options.compressionLevel === "balanced"}
                    onClick={() => handleLevelChange("balanced")}
                    icon={<Gauge className="h-4 w-4" aria-hidden="true" />}
                  />
                  <LevelCard
                    label="High Compression"
                    sublabel="Smallest File"
                    active={options.compressionLevel === "high"}
                    onClick={() => handleLevelChange("high")}
                    icon={<Zap className="h-4 w-4" aria-hidden="true" />}
                  />
                </div>

                <div className="mt-5 rounded-lg border border-white/10 bg-[#070b16] px-4 py-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="image-quality"
                      className="flex items-center gap-2 text-sm font-medium text-white"
                    >
                      <ImageIcon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                      Image Quality
                    </label>
                    <span className="text-sm font-medium text-cyan-300">
                      {options.imageQuality}%
                    </span>
                  </div>
                  <input
                    id="image-quality"
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={options.imageQuality}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        imageQuality: Number(e.target.value),
                      }))
                    }
                    className="mt-3 w-full accent-cyan-500"
                    aria-label="Image quality"
                  />
                  <p className="mt-2 text-xs text-zinc-500">
                    Applies to embedded JPEG images only. Lower values produce
                    smaller files with more visible compression artifacts.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <OptionToggle
                    icon={<Layers className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
                    label="Remove metadata"
                    description="Strips title, author, subject, keywords, and producer info."
                    checked={options.removeMetadata}
                    onChange={(checked) =>
                      setOptions((prev) => ({ ...prev, removeMetadata: checked }))
                    }
                  />
                  <OptionToggle
                    icon={<Cpu className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
                    label="Optimize PDF objects"
                    description="Reorganizes the file's internal structure to reduce overhead."
                    checked={options.optimizeObjects}
                    onChange={(checked) =>
                      setOptions((prev) => ({ ...prev, optimizeObjects: checked }))
                    }
                  />
                </div>
              </div>

              {/* Progress / Results */}
              {(isCompressing || status === "success" || status === "error") && (
                <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                  {status !== "success" && (
                    <>
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>
                          {status === "error"
                            ? "Compression failed"
                            : "Compressing your file..."}
                        </span>
                        <span className="text-cyan-300">{Math.round(progress)}%</span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#070b16]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                          className={`h-full rounded-full ${
                            status === "error" ? "bg-red-500" : "bg-cyan-500"
                          }`}
                        />
                      </div>
                    </>
                  )}

                  {status === "error" && (
                    <div
                      role="alert"
                      className="mt-4 flex items-center gap-2 text-sm text-red-400"
                    >
                      <XCircle className="h-4 w-4" aria-hidden="true" />
                      {errorMessage}
                    </div>
                  )}

                  {status === "success" && result && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-cyan-300">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Compression complete
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <ResultStat label="Original Size" value={formatFileSize(result.originalSize)} />
                        <ResultStat label="Compressed Size" value={formatFileSize(result.compressedSize)} />
                        <ResultStat
                          label="Space Saved"
                          value={formatFileSize(result.bytesSaved)}
                          icon={<ArrowDown className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />}
                        />
                        <ResultStat
                          label="Reduction"
                          value={`${result.percentSaved.toFixed(1)}%`}
                        />
                      </div>

                      {result.bytesSaved === 0 && (
                        <p className="mt-4 text-xs text-zinc-500">
                          This file didn&apos;t shrink further at this
                          setting - it may already be optimized, or contain
                          mostly text/vector content rather than
                          re-encodable JPEG images.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={isCompressing || status === "success"}
                  aria-label="Compress PDF"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16]"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      Compress PDF
                    </>
                  )}
                </button>

                {status === "success" && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    aria-label="Download compressed PDF"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16]"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download PDF
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetAll}
                  aria-label="Reset tool"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#111827] px-5 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16]"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 7. Statistics */}
        <section className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            icon={<FileText className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="Pages"
            value={preview ? String(preview.pageCount) : "—"}
          />
          <StatCard
            icon={<Layers className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="Original Size"
            value={file ? formatFileSize(file.size) : "—"}
          />
          <StatCard
            icon={<Sparkles className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="Compressed Size"
            value={result ? formatFileSize(result.compressedSize) : "—"}
          />
          <StatCard
            icon={<Gauge className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="Reduction %"
            value={result ? `${result.percentSaved.toFixed(1)}%` : "—"}
          />
        </section>

        {/* 8. Privacy Section */}
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          <PrivacyCard
            icon={<Cpu className="h-5 w-5 text-cyan-400" aria-hidden="true" />}
            title="Browser Based"
            description="Every compression pass runs locally using JavaScript in your browser, no server round-trip required."
          />
          <PrivacyCard
            icon={<ShieldCheck className="h-5 w-5 text-cyan-400" aria-hidden="true" />}
            title="No Uploads"
            description="Your PDF is never uploaded to MeggatronAI servers or any third party."
          />
          <PrivacyCard
            icon={<Lock className="h-5 w-5 text-cyan-400" aria-hidden="true" />}
            title="Secure Processing"
            description="Files stay on your device throughout the entire compression process."
          />
        </section>

        {/* 9. SEO Content */}
        <section className="mt-20 rounded-2xl border border-white/10 bg-[#111827] p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Free Online PDF Compressor
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
            <p>
              MeggatronAI&apos;s PDF compressor reduces the file size of your
              PDF documents directly in your browser, with no software
              installation and no account required. Upload a file, choose a
              compression level, and download a smaller version in seconds.
            </p>
            <p>
              Unlike many online compressors that send your files to a
              remote server for processing, this tool runs entirely on your
              own device. Your PDF is read, re-encoded, and rebuilt inside
              your browser&apos;s JavaScript engine, which means your
              documents never leave your computer. This makes it a
              practical choice for reports, scanned contracts, portfolios,
              or any file you would rather not upload to an unknown third
              party.
            </p>
            <p>
              Compression works by re-encoding embedded JPEG images at a
              lower quality and, at higher compression levels, a reduced
              resolution, alongside removing optional metadata and
              reorganizing the file&apos;s internal object structure to cut
              overhead. Because this happens without a server-side
              rendering engine, results depend heavily on what&apos;s
              inside your file: PDFs full of photos or scanned pages tend to
              shrink significantly, while text-only or vector-based PDFs
              may only see modest reductions since there are few images to
              re-encode.
            </p>
            <p>
              Three preset levels make it easy to balance size against
              quality: Low Compression keeps images close to their original
              quality for documents where visual fidelity matters most,
              Balanced offers a sensible middle ground for everyday sharing,
              and High Compression pushes for the smallest possible file
              size. The image quality slider and toggles for metadata
              removal and object optimization let you fine-tune the result
              further, with an estimated output size shown before you
              commit to compressing.
            </p>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-[#111827] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq((prev) => (prev === index ? null : index))}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-cyan-400 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5"
                    >
                      <p className="pb-4 text-sm leading-relaxed text-zinc-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Related Tools */}
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Related Tools
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-xl border border-white/10 bg-[#111827] p-5 transition-colors hover:border-cyan-500/20"
              >
                <div className="inline-flex items-center justify-center rounded-lg bg-cyan-500/10 p-2.5">
                  {tool.icon}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white group-hover:text-cyan-300">
                  {tool.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/**
 * ------------------------------------------------------------------
 * Sub-components
 * ------------------------------------------------------------------
 */

function LevelCard({
  label,
  sublabel,
  active,
  onClick,
  icon,
}: {
  label: string;
  sublabel: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-start gap-2 rounded-lg border px-4 py-3.5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16] ${
        active
          ? "border-cyan-500/20 bg-cyan-500/10"
          : "border-white/10 bg-[#070b16] hover:border-white/20"
      }`}
    >
      <span className={active ? "text-cyan-400" : "text-zinc-500"}>{icon}</span>
      <span>
        <span className={`block text-sm font-medium ${active ? "text-white" : "text-zinc-300"}`}>
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-zinc-500">{sublabel}</span>
      </span>
    </button>
  );
}

function OptionToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-[#070b16] px-4 py-3.5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16] ${
          checked ? "bg-cyan-500" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function ResultStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#070b16] p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1.5 flex items-center gap-1 text-base font-semibold text-white">
        {icon}
        {value}
      </p>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111827] p-5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-zinc-500">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function PrivacyCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111827] p-6">
      <div className="inline-flex items-center justify-center rounded-lg bg-cyan-500/10 p-3">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
        {description}
      </p>
    </div>
  );
}