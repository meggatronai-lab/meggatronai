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
  FileWarning,
  ShieldCheck,
  Lock,
  Cpu,
  Sparkles,
  Layers,
  Table2,
  Image as ImageIcon,
  ChevronDown,
  Merge,
  Split,
  KeyRound,
} from "lucide-react";

import {
  extractPdfText,
  convertPdfToWord,
  downloadWord,
  validatePdfFile,
  formatFileSize,
  type PdfExtractionResult,
  type ConversionOptions,
} from "@/lib/pdf/pdfToWord";
// Replace this with your real ToolLinks component/path once confirmed -
// e.g. import ToolLinks from "@/components/tools/ToolLinks";

type Status = "idle" | "ready" | "converting" | "success" | "error";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [extraction, setExtraction] = useState<PdfExtractionResult | null>(
    null
  );
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const [options, setOptions] = useState<ConversionOptions>({
    preserveFormatting: true,
    preserveImages: false,
    preserveTables: false,
    outputFileName: "",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetAll = useCallback(() => {
    setFile(null);
    setExtraction(null);
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
    setResultBlob(null);
    setOptions((prev) => ({ ...prev, outputFileName: "" }));
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
    setResultBlob(null);
    setOptions((prev) => ({
      ...prev,
      outputFileName: selected.name.replace(/\.pdf$/i, ""),
    }));

    try {
      const result = await extractPdfText(selected);
      setExtraction(result);
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

  const handleConvert = async () => {
    if (!file || !extraction) return;

    setStatus("converting");
    setProgress(0);
    setErrorMessage("");

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 88 ? prev + Math.random() * 12 : prev));
    }, 180);

    try {
      const blob = await convertPdfToWord(extraction, options);
      clearInterval(progressTimer);
      setProgress(100);
      setResultBlob(blob);
      setStatus("success");
    } catch {
      clearInterval(progressTimer);
      setStatus("error");
      setErrorMessage(
        "Something went wrong while converting your file. Please try again."
      );
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    downloadWord(
      resultBlob,
      options.outputFileName || "converted-document"
    );
  };

  const isConverting = status === "converting";
  const hasFile = !!file && !!extraction;

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
            PDF to Word Converter
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-400"
          >
            Convert PDF documents into editable Microsoft Word (.docx) files
            online for free using MeggatronAI. Fast, secure, and entirely
            processed in your browser.
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

        {/* 3. File Preview + 4. Conversion Options + 5. Action Area + 6. Progress */}
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
                        {extraction?.pageCount} page
                        {extraction && extraction.pageCount !== 1 ? "s" : ""}{" "}
                        &nbsp;•&nbsp; {file && formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-medium sm:self-auto ${
                      status === "success"
                        ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                        : status === "error"
                        ? "border-white/10 bg-[#070b16] text-red-400"
                        : "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Converted
                      </>
                    ) : status === "error" ? (
                      <>
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Failed
                      </>
                    ) : (
                      <>
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        Ready to convert
                      </>
                    )}
                  </span>
                </div>

                {extraction && !extraction.hasExtractableText && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-[#070b16] px-4 py-3 text-xs text-zinc-400">
                    <FileWarning
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400"
                      aria-hidden="true"
                    />
                    No selectable text was detected in this PDF. It may be a
                    scanned document. The output file will still be created,
                    but pages may appear empty.
                  </div>
                )}
              </div>

              {/* Conversion Options */}
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h2 className="text-sm font-semibold text-white">
                  Conversion Options
                </h2>

                <div className="mt-5 space-y-4">
                  <OptionToggle
                    icon={<Layers className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
                    label="Preserve formatting"
                    description="Detects heading-like lines and applies basic bold styling."
                    checked={options.preserveFormatting}
                    onChange={(checked) =>
                      setOptions((prev) => ({
                        ...prev,
                        preserveFormatting: checked,
                      }))
                    }
                  />
                  <OptionToggle
                    icon={<ImageIcon className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
                    label="Preserve images"
                    description="Full image extraction and placement is limited in the browser."
                    checked={options.preserveImages}
                    onChange={(checked) =>
                      setOptions((prev) => ({
                        ...prev,
                        preserveImages: checked,
                      }))
                    }
                    badge="Limited in browser"
                  />
                  <OptionToggle
                    icon={<Table2 className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
                    label="Preserve tables"
                    description="Reconstructing table grids from raw PDF layout is limited in the browser."
                    checked={options.preserveTables}
                    onChange={(checked) =>
                      setOptions((prev) => ({
                        ...prev,
                        preserveTables: checked,
                      }))
                    }
                    badge="Limited in browser"
                  />

                  <div>
                    <label
                      htmlFor="output-filename"
                      className="mb-2 block text-xs font-medium text-zinc-400"
                    >
                      Output filename
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#070b16] px-3 py-2.5">
                      <input
                        id="output-filename"
                        type="text"
                        value={options.outputFileName}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            outputFileName: e.target.value,
                          }))
                        }
                        placeholder="converted-document"
                        className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                        aria-label="Output filename"
                      />
                      <span className="flex-shrink-0 text-xs text-zinc-500">
                        .docx
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              {(isConverting || status === "success" || status === "error") && (
                <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                      {status === "success"
                        ? "Conversion complete"
                        : status === "error"
                        ? "Conversion failed"
                        : "Converting your file..."}
                    </span>
                    <span className="text-cyan-300">
                      {status === "success" ? 100 : Math.round(progress)}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#070b16]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${status === "success" ? 100 : progress}%`,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`h-full rounded-full ${
                        status === "error" ? "bg-red-500" : "bg-cyan-500"
                      }`}
                    />
                  </div>

                  {status === "success" && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-cyan-300">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Your Word document is ready to download.
                    </div>
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
                </div>
              )}

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isConverting || status === "success"}
                  aria-label="Convert PDF to Word"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16]"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      Convert to Word
                    </>
                  )}
                </button>

                {status === "success" && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    aria-label="Download Word document"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b16]"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download .docx
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
            label="PDF Pages"
            value={extraction ? String(extraction.pageCount) : "—"}
          />
          <StatCard
            icon={<Layers className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="File Size"
            value={file ? formatFileSize(file.size) : "—"}
          />
          <StatCard
            icon={<Sparkles className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="Output Format"
            value=".docx"
          />
          <StatCard
            icon={<Cpu className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            label="Processing"
            value="In-Browser"
          />
        </section>

        {/* 8. Privacy Section */}
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          <PrivacyCard
            icon={<Cpu className="h-5 w-5 text-cyan-400" aria-hidden="true" />}
            title="Browser Based"
            description="Every conversion runs locally using JavaScript in your browser, no server round-trip required."
          />
          <PrivacyCard
            icon={<ShieldCheck className="h-5 w-5 text-cyan-400" aria-hidden="true" />}
            title="No Uploads"
            description="Your PDF is never uploaded to MeggatronAI servers or any third party."
          />
          <PrivacyCard
            icon={<Lock className="h-5 w-5 text-cyan-400" aria-hidden="true" />}
            title="Secure Processing"
            description="Files stay on your device throughout the entire conversion process."
          />
        </section>

        {/* 9. SEO Content */}
        <section className="mt-20 rounded-2xl border border-white/10 bg-[#111827] p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Free Online PDF to Word Converter
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
            <p>
              MeggatronAI&apos;s PDF to Word converter lets you turn static
              PDF documents into editable Microsoft Word (.docx) files
              without installing any software or creating an account. Simply
              drag and drop your file, review the extracted content, and
              download a ready-to-edit document in seconds.
            </p>
            <p>
              Unlike many online converters that require you to upload your
              files to a remote server, this tool performs the entire
              conversion directly inside your browser. Your PDF is read,
              processed, and converted to .docx entirely on your own device,
              which means your documents never leave your computer. This
              makes it a practical option for contracts, resumes, reports,
              and any file containing information you would rather keep
              private.
            </p>
            <p>
              The converter works by reading the text layer embedded in your
              PDF and rebuilding it as structured Word paragraphs, with
              basic heading detection available when the &quot;Preserve
              formatting&quot; option is enabled. Because this happens
              without a server-side rendering engine, results are best for
              text-heavy documents. Complex layouts, embedded images, and
              multi-column tables are only partially supported in-browser
              and are clearly marked as limited so you always know what to
              expect from your output file.
            </p>
            <p>
              Whether you need to quickly edit a paragraph in an old PDF,
              repurpose report text for a new document, or just need a fast,
              free, and privacy-friendly way to get from PDF to Word,
              MeggatronAI&apos;s converter is built to handle the job
              directly in your browser, on any device, at no cost.
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
                  onClick={() =>
                    setOpenFaq((prev) => (prev === index ? null : index))
                  }
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

function OptionToggle({
  icon,
  label,
  description,
  checked,
  onChange,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  badge?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-[#070b16] px-4 py-3.5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">{label}</p>
            {badge && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                {badge}
              </span>
            )}
          </div>
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

/**
 * ------------------------------------------------------------------
 * Static content
 * ------------------------------------------------------------------
 */

const relatedTools = [
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
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Reduce image file size without losing quality.",
    icon: <ImageIcon className="h-4 w-4 text-cyan-400" aria-hidden="true" />,
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Create strong, secure, random passwords instantly.",
    icon: <KeyRound className="h-4 w-4 text-cyan-400" aria-hidden="true" />,
  },
];

const faqs = [
  {
    question: "Is this PDF to Word converter really free?",
    answer:
      "Yes. Converting PDF files to .docx with MeggatronAI is completely free, with no account, subscription, or file limits beyond the 50MB size cap.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. Your PDF is processed entirely inside your browser using JavaScript. It is never sent to MeggatronAI or any third-party server.",
  },
  {
    question: "Will the formatting of my PDF be preserved exactly?",
    answer:
      "Text content is extracted and rebuilt as Word paragraphs, with basic heading detection when 'Preserve formatting' is enabled. Complex layouts, custom fonts, and multi-column designs may not be reproduced exactly.",
  },
  {
    question: "Can this tool convert scanned PDFs?",
    answer:
      "Scanned PDFs are essentially images and don't contain a text layer, so this in-browser tool can't extract text from them. A .docx file will still be generated, but pages without text will be marked accordingly.",
  },
  {
    question: "Does this tool preserve images and tables?",
    answer:
      "Image and table reconstruction is limited in the browser and is marked as such in the conversion options. The tool focuses on accurately preserving text content.",
  },
  {
    question: "What is the maximum file size supported?",
    answer:
      "You can convert PDF files up to 50MB in size. Larger files may cause slower performance depending on your device.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "The tool works in all modern browsers, including Chrome, Firefox, Safari, and Edge, on desktop, tablet, and mobile devices.",
  },
  {
    question: "Can I edit the output .docx file afterward?",
    answer:
      "Yes. The downloaded file is a standard .docx document that opens in Microsoft Word, Google Docs, LibreOffice, and other word processors for further editing.",
  },
];