"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Download,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  X,
  Settings2,
  Layers,
  FileStack,
  Scissors,
  FileOutput,
  ImagePlus,
  Check,
} from "lucide-react";

import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  loadPdfDocument,
  getPdfMetaInfo,
  convertPdfPages,
  parsePageRangeString,
  downloadSingleImage,
  downloadPagesAsZip,
  revokeConvertedPages,
  formatFileSize,
  estimateOutputSize,
  PdfToJpgError,
  type PdfMetaInfo,
  type ConvertedPage,
  type ConversionProgress,
  type ResolutionScale,
} from "@/lib/pdf/pdftojpg";

// ------------------------------------------------------------------
// Local types
// ------------------------------------------------------------------

interface Thumbnail {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

type AlertState = { type: "success" | "error"; message: string } | null;

// ------------------------------------------------------------------
// Small shared UI atoms (kept in-file to avoid extra dependencies)
// ------------------------------------------------------------------

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="p-4 sm:p-5 flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="truncate text-lg font-semibold text-white">{value}</p>
      </div>
    </Card>
  );
}

// ------------------------------------------------------------------
// Main component
// ------------------------------------------------------------------

export default function PdfToJpg() {
  // File & document state
  const [file, setFile] = useState<File | null>(null);
  const [pdfMeta, setPdfMeta] = useState<PdfMetaInfo | null>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  // Thumbnails & selection
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rangeInput, setRangeInput] = useState("");

  // Conversion settings
  const [qualityPercent, setQualityPercent] = useState(85); // 50-100
  const [scale, setScale] = useState<ResolutionScale>(2);

  // Process state
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const [alert, setAlert] = useState<AlertState>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------------------
  // Cleanup object URLs whenever convertedPages changes/unmounts
  // ----------------------------------------------------------------
  useEffect(() => {
    return () => {
      revokeConvertedPages(convertedPages);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertedPages]);

  useEffect(() => {
    return () => {
      if (pdfRef.current) {
        pdfRef.current.destroy();
        pdfRef.current = null;
      }
    };
  }, []);

  const showError = useCallback((message: string) => {
    setAlert({ type: "error", message });
  }, []);

  const showSuccess = useCallback((message: string) => {
    setAlert({ type: "success", message });
  }, []);

  // ----------------------------------------------------------------
  // File loading + thumbnail generation
  // ----------------------------------------------------------------

  const generateThumbnails = useCallback(
    async (pdf: PDFDocumentProxy): Promise<Thumbnail[]> => {
      const results: Thumbnail[] = [];
      const THUMB_SCALE = 0.35;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: THUMB_SCALE });

        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d", { alpha: false });

        if (context) {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: context, viewport }).promise;
          results.push({
            pageNumber,
            dataUrl: canvas.toDataURL("image/jpeg", 0.6),
            width: canvas.width,
            height: canvas.height,
          });
        }

        page.cleanup();
      }

      return results;
    },
    []
  );

  const resetConversionOutputs = useCallback(() => {
    setConvertedPages((prev) => {
      revokeConvertedPages(prev);
      return [];
    });
    setProgress(null);
  }, []);

  const handleFileSelect = useCallback(
    async (selected: File | null | undefined) => {
      setAlert(null);

      if (!selected) return;

      try {
        setIsLoadingFile(true);
        resetConversionOutputs();

        if (pdfRef.current) {
          pdfRef.current.destroy();
          pdfRef.current = null;
        }

        const { pdf } = await loadPdfDocument(selected);
        const meta = await getPdfMetaInfo(selected, pdf);
        const thumbs = await generateThumbnails(pdf);

        pdfRef.current = pdf;
        setFile(selected);
        setPdfMeta(meta);
        setThumbnails(thumbs);
        setSelectedPages(new Set(thumbs.map((t) => t.pageNumber)));
        setRangeInput(`1-${meta.totalPages}`);
        showSuccess(
          `${selected.name} loaded successfully — ${meta.totalPages} page${
            meta.totalPages === 1 ? "" : "s"
          } ready to convert.`
        );
      } catch (err) {
        const message =
          err instanceof PdfToJpgError
            ? err.message
            : "Something went wrong while reading this PDF.";
        showError(message);
        setFile(null);
        setPdfMeta(null);
        setThumbnails([]);
      } finally {
        setIsLoadingFile(false);
      }
    },
    [generateThumbnails, resetConversionOutputs, showError, showSuccess]
  );

  // ----------------------------------------------------------------
  // Drag & drop handlers
  // ----------------------------------------------------------------

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      handleFileSelect(dropped);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // ----------------------------------------------------------------
  // Selection helpers
  // ----------------------------------------------------------------

  const togglePage = (pageNumber: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNumber)) next.delete(pageNumber);
      else next.add(pageNumber);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedPages(new Set(thumbnails.map((t) => t.pageNumber)));
    if (pdfMeta) setRangeInput(`1-${pdfMeta.totalPages}`);
  };

  const clearSelection = () => {
    setSelectedPages(new Set());
    setRangeInput("");
  };

  const applyRangeInput = () => {
    if (!pdfMeta) return;
    try {
      const pages = parsePageRangeString(rangeInput, pdfMeta.totalPages);
      setSelectedPages(new Set(pages));
      setAlert(null);
    } catch (err) {
      const message =
        err instanceof PdfToJpgError
          ? err.message
          : "Could not parse that page selection.";
      showError(message);
    }
  };

  // ----------------------------------------------------------------
  // Conversion
  // ----------------------------------------------------------------

  const handleConvert = async () => {
    if (!pdfRef.current || !pdfMeta) return;

    const pages = Array.from(selectedPages).sort((a, b) => a - b);

    if (pages.length === 0) {
      showError("Select at least one page before converting.");
      return;
    }

    setIsConverting(true);
    setAlert(null);
    resetConversionOutputs();

    try {
      const results = await convertPdfPages(
        pdfRef.current,
        pages,
        { quality: qualityPercent / 100, scale },
        (p) => setProgress(p)
      );
      setConvertedPages(results);
      showSuccess(
        `Converted ${results.length} page${
          results.length === 1 ? "" : "s"
        } to JPG.`
      );
    } catch (err) {
      const message =
        err instanceof PdfToJpgError
          ? err.message
          : "Conversion failed. Please try again.";
      showError(message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadOne = (page: ConvertedPage) => {
    if (!file) return;
    downloadSingleImage(page, file.name);
  };

  const handleDownloadSelected = async () => {
    if (!file || convertedPages.length === 0) return;
    if (convertedPages.length === 1) {
      downloadSingleImage(convertedPages[0], file.name);
      return;
    }
    try {
      setIsZipping(true);
      await downloadPagesAsZip(convertedPages, file.name);
    } catch (err) {
      const message =
        err instanceof PdfToJpgError
          ? err.message
          : "Could not build the ZIP file.";
      showError(message);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!file || convertedPages.length === 0) return;
    try {
      setIsZipping(true);
      await downloadPagesAsZip(convertedPages, file.name);
    } catch (err) {
      const message =
        err instanceof PdfToJpgError
          ? err.message
          : "Could not build the ZIP file.";
      showError(message);
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = () => {
    if (pdfRef.current) {
      pdfRef.current.destroy();
      pdfRef.current = null;
    }
    revokeConvertedPages(convertedPages);
    setFile(null);
    setPdfMeta(null);
    setThumbnails([]);
    setSelectedPages(new Set());
    setRangeInput("");
    setConvertedPages([]);
    setProgress(null);
    setAlert(null);
    setQualityPercent(85);
    setScale(2);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ----------------------------------------------------------------
  // Derived values
  // ----------------------------------------------------------------

  const estimatedSizeLabel = pdfMeta
    ? formatFileSize(
        estimateOutputSize(selectedPages.size, scale, qualityPercent / 100)
      )
    : "—";

  const totalConvertedSize = convertedPages.reduce(
    (sum, p) => sum + p.sizeBytes,
    0
  );

  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ============================== HERO ============================== */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex justify-center">
            <Badge>100% Browser-Based · No Uploads</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            PDF to <span className="text-cyan-400">JPG</span> Converter
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Convert PDF pages into high-quality JPG images instantly. Every
            page is rendered locally in your browser — nothing is ever
            uploaded to a server.
          </p>
        </motion.section>

        {/* ============================== ALERTS ============================== */}
        <div className="mx-auto mt-8 max-w-3xl" aria-live="polite">
          <AnimatePresence mode="wait">
            {alert && (
              <motion.div
                key={alert.message}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role={alert.type === "error" ? "alert" : "status"}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                  alert.type === "success"
                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {alert.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p className="leading-relaxed">{alert.message}</p>
                <button
                  onClick={() => setAlert(null)}
                  aria-label="Dismiss message"
                  className="ml-auto shrink-0 rounded-md p-1 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ============================== UPLOAD AREA ============================== */}
        {!file && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl"
          >
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload a PDF file by clicking or dragging it here"
              className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-all duration-200 ${
                isDragging
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/15 bg-[#111827]/60 hover:border-cyan-500/50 hover:bg-[#111827]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                aria-hidden="true"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />

              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-transform duration-200 ${
                  isDragging ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                {isLoadingFile ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ) : (
                  <UploadCloud className="h-7 w-7" />
                )}
              </div>

              <p className="text-lg font-semibold text-white">
                {isLoadingFile
                  ? "Reading your PDF…"
                  : "Drag & drop your PDF here"}
              </p>
              <p className="mt-1.5 text-sm text-gray-400">
                or{" "}
                <span className="font-medium text-cyan-400 underline underline-offset-2">
                  browse your files
                </span>
              </p>
              <p className="mt-4 text-xs text-gray-500">
                Supports PDF · Up to 100MB · Processed entirely on your device
              </p>
            </div>
          </motion.section>
        )}

        {/* ============================== SELECTED FILE + WORKSPACE ============================== */}
        <AnimatePresence>
          {file && pdfMeta && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Selected file card */}
              <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {pdfMeta.fileName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {pdfMeta.fileSizeLabel} · {pdfMeta.totalPages} page
                      {pdfMeta.totalPages === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 sm:self-auto"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </Card>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                  label="Total Pages"
                  value={String(pdfMeta.totalPages)}
                  icon={FileStack}
                />
                <StatCard
                  label="Selected Pages"
                  value={String(selectedPages.size)}
                  icon={Layers}
                />
                <StatCard
                  label="Output Images"
                  value={String(convertedPages.length)}
                  icon={ImageIcon}
                />
                <StatCard
                  label="Estimated Size"
                  value={
                    convertedPages.length > 0
                      ? formatFileSize(totalConvertedSize)
                      : estimatedSizeLabel
                  }
                  icon={ImagePlus}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Preview panel */}
                <Card className="p-5 lg:col-span-2">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-base font-semibold text-white">
                      Page Preview
                    </h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={selectAll}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-cyan-500/30 hover:text-cyan-300"
                      >
                        Select All
                      </button>
                      <button
                        onClick={clearSelection}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-cyan-500/30 hover:text-cyan-300"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Range input */}
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row">
                    <label htmlFor="page-range" className="sr-only">
                      Page range (e.g. 1-5, 8, 10-12)
                    </label>
                    <input
                      id="page-range"
                      type="text"
                      value={rangeInput}
                      onChange={(e) => setRangeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") applyRangeInput();
                      }}
                      placeholder="e.g. 1-5, 8, 10-12"
                      className="flex-1 rounded-xl border border-white/10 bg-[#070b16] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                    />
                    <button
                      onClick={applyRangeInput}
                      className="shrink-0 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20"
                    >
                      Apply Range
                    </button>
                  </div>

                  {/* Thumbnail grid */}
                  <div className="grid max-h-[520px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-4">
                    {thumbnails.map((thumb) => {
                      const isSelected = selectedPages.has(thumb.pageNumber);
                      return (
                        <button
                          key={thumb.pageNumber}
                          onClick={() => togglePage(thumb.pageNumber)}
                          aria-pressed={isSelected}
                          aria-label={`Page ${thumb.pageNumber}${
                            isSelected ? ", selected" : ""
                          }`}
                          className={`group relative overflow-hidden rounded-xl border-2 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                            isSelected
                              ? "border-cyan-400 shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                              : "border-white/10 hover:border-white/25"
                          }`}
                        >
                          <img
                            src={thumb.dataUrl}
                            alt={`Preview of page ${thumb.pageNumber}`}
                            className="aspect-[3/4] w-full object-cover bg-white"
                            loading="lazy"
                          />
                          <div
                            className={`absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-md border text-[10px] font-bold transition-colors ${
                              isSelected
                                ? "border-cyan-400 bg-cyan-400 text-[#070b16]"
                                : "border-white/40 bg-black/40 text-white/70"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
                            <span className="text-[11px] font-medium text-white">
                              Page {thumb.pageNumber}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Controls panel */}
                <Card className="flex flex-col gap-6 p-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Settings2 className="h-4 w-4 text-cyan-400" />
                      <h2 className="text-base font-semibold text-white">
                        Conversion Settings
                      </h2>
                    </div>

                    {/* Quality slider */}
                    <div className="mb-5">
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          htmlFor="quality-slider"
                          className="text-sm text-gray-300"
                        >
                          Image Quality
                        </label>
                        <span className="text-sm font-semibold text-cyan-400">
                          {qualityPercent}%
                        </span>
                      </div>
                      <input
                        id="quality-slider"
                        type="range"
                        min={50}
                        max={100}
                        step={1}
                        value={qualityPercent}
                        onChange={(e) =>
                          setQualityPercent(Number(e.target.value))
                        }
                        aria-valuemin={50}
                        aria-valuemax={100}
                        aria-valuenow={qualityPercent}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400"
                      />
                      <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                        <span>Low</span>
                        <span>Maximum</span>
                      </div>
                    </div>

                    {/* Resolution scale */}
                    <div className="mb-5">
                      <p className="mb-2 text-sm text-gray-300">
                        Resolution Scale
                      </p>
                      <div
                        role="group"
                        aria-label="Resolution scale"
                        className="grid grid-cols-3 gap-2"
                      >
                        {([1, 2, 3] as ResolutionScale[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => setScale(s)}
                            aria-pressed={scale === s}
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                              scale === s
                                ? "border-cyan-400 bg-cyan-500/15 text-cyan-300"
                                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/25"
                            }`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Output format */}
                    <div>
                      <p className="mb-2 text-sm text-gray-300">
                        Output Format
                      </p>
                      <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
                        <ImageIcon className="h-4 w-4" />
                        JPG
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  {isConverting && progress && (
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                          Converting page {progress.currentPage} of{" "}
                          {progress.totalPages}
                        </span>
                        <span>{progress.percent}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-cyan-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.percent}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={handleConvert}
                      disabled={isConverting || selectedPages.size === 0}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-[#070b16] transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isConverting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ImageIcon className="h-4 w-4" />
                      )}
                      Convert PDF
                    </button>

                    <button
                      onClick={handleDownloadSelected}
                      disabled={convertedPages.length === 0 || isZipping}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isZipping ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      Download Selected
                    </button>

                    <button
                      onClick={handleDownloadAll}
                      disabled={convertedPages.length === 0 || isZipping}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Download className="h-4 w-4" />
                      Download All (ZIP)
                    </button>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset Everything
                    </button>
                  </div>
                </Card>
              </div>

              {/* Converted images grid */}
              <AnimatePresence>
                {convertedPages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card className="p-5">
                      <h2 className="mb-4 text-base font-semibold text-white">
                        Converted Images
                      </h2>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {convertedPages.map((page) => (
                          <div
                            key={page.pageNumber}
                            className="group relative overflow-hidden rounded-xl border border-white/10"
                          >
                            <img
                              src={page.objectUrl}
                              alt={`Converted JPG of page ${page.pageNumber}`}
                              className="aspect-[3/4] w-full object-cover bg-white"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent px-2.5 py-2">
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium text-white">
                                  Page {page.pageNumber}
                                </p>
                                <p className="text-[10px] text-gray-300">
                                  {page.sizeLabel}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDownloadOne(page)}
                                aria-label={`Download page ${page.pageNumber} as JPG`}
                                className="shrink-0 rounded-lg bg-cyan-500 p-1.5 text-[#070b16] hover:bg-cyan-400"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Information section */}
              <Card className="p-5">
                <h2 className="mb-4 text-base font-semibold text-white">
                  File Information
                </h2>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoRow label="Filename" value={pdfMeta.fileName} />
                  <InfoRow label="File Size" value={pdfMeta.fileSizeLabel} />
                  <InfoRow
                    label="PDF Version"
                    value={pdfMeta.pdfVersion ?? "Unknown"}
                  />
                  <InfoRow
                    label="Image Quality"
                    value={`${qualityPercent}%`}
                  />
                  <InfoRow label="Output Type" value="JPG" />
                  <InfoRow
                    label="Resolution Scale"
                    value={`${scale}x`}
                  />
                </dl>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ============================== PRIVACY SECTION ============================== */}
        <section className="mt-16">
          <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Your files never leave your device
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                MeggatronAI's PDF to JPG tool runs entirely inside your
                browser. There is no server, no API, and no database involved
                — your PDF is read, rendered, and converted locally using
                your device's own processing power. Nothing is transmitted,
                stored, or logged anywhere.
              </p>
            </div>
          </Card>
        </section>

        {/* ============================== SEO SECTION ============================== */}
        <section className="mt-16 space-y-5">
          <h2 className="text-2xl font-bold text-white">
            Everything You Need to Know About Converting PDF to JPG
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            <p>
              A PDF to JPG converter takes each page of a Portable Document
              Format file and renders it as a standalone JPEG image. Instead
              of a single document made up of vector text, embedded fonts,
              and layout instructions, you end up with a set of flat,
              universally viewable pictures — one JPG per page. Because JPG
              is one of the most widely supported image formats in the
              world, the pages you export can be opened, shared, and edited
              on virtually any device, browser, or piece of software without
              needing a dedicated PDF reader.
            </p>
            <p>
              MeggatronAI's PDF to JPG tool does this conversion entirely
              inside your browser. When you drop in a file, JavaScript reads
              the PDF, draws each page onto an in-memory canvas at the
              resolution and quality you choose, and encodes that canvas as
              a JPEG. That image is then handed straight back to you as a
              download. At no point does the file travel to a server — the
              entire pipeline, from reading the PDF to producing the final
              images, happens on your own machine. That matters for anyone
              working with sensitive contracts, personal records, or
              proprietary documents who would rather not upload them to an
              unknown third party.
            </p>
            <p>
              <strong className="text-white">Why convert PDF to JPG?</strong>{" "}
              PDFs are excellent for preserving layout and typography, but
              they aren't always the right format for the job. Image formats
              like JPG are easier to drop into slide decks, social posts,
              chat apps, and design tools that don't natively handle PDF
              pages. They're also simpler to crop, resize, compress, or
              paste directly into an email or document without triggering a
              PDF viewer. Converting to JPG turns a document into visual
              content that behaves like any other picture.
            </p>
            <p>
              <strong className="text-white">Students</strong> often convert
              lecture slides or scanned notes from PDF to JPG so they can
              paste specific pages into study guides, flashcard apps, or
              group chats without sending an entire multi-page file.{" "}
              <strong className="text-white">Business professionals</strong>{" "}
              use the same workflow to drop a single page of a report,
              invoice, or signed agreement into an email thread or a
              presentation, rather than attaching a full PDF that recipients
              have to open separately.
            </p>
            <p>
              <strong className="text-white">Designers</strong> frequently
              need flattened raster previews of PDF layouts — think print
              proofs, brochure mockups, or portfolio pages — that can be
              placed directly into design software as reference images.{" "}
              <strong className="text-white">Teachers</strong> convert
              worksheets and handouts into JPGs so they can be inserted into
              slideshows or learning management systems that expect image
              uploads instead of documents.
            </p>
            <p>
              For <strong className="text-white">social media</strong>,
              JPGs are simply easier to post. Platforms like Instagram,
              LinkedIn, and X are built around images, not PDFs, so
              converting a page of a report or a one-page flyer into a JPG
              means it can be posted directly rather than linked out.
              And for <strong className="text-white">printing</strong>,
              having individual high-resolution JPGs gives you more control
              at photo kiosks, print shops, and desktop printers that expect
              standard image files rather than multi-page documents.
            </p>
            <p>
              With adjustable quality (50–100%) and resolution scale (1x to
              3x), you can balance sharpness against file size depending on
              what the image is for — a quick social post might only need
              medium quality at 1x, while a print-ready proof benefits from
              maximum quality at 3x scale. You can convert every page, a
              single page, several individual pages, or a specific range —
              and download the results one at a time or bundled together as
              a ZIP file.
            </p>
          </div>
        </section>

        {/* ============================== FAQ ============================== */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <Card key={item.question} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-white sm:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm leading-relaxed text-gray-400">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ============================== RELATED TOOLS ============================== */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED_TOOLS.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#111827]/80 p-5 transition-colors hover:border-cyan-500/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-white">{tool.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">
                    {tool.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// ------------------------------------------------------------------
// Small presentational helpers
// ------------------------------------------------------------------

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium text-white">
        {value}
      </dd>
    </div>
  );
}

// ------------------------------------------------------------------
// Static content
// ------------------------------------------------------------------

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Is my PDF uploaded to a server when I use this tool?",
    answer:
      "No. This tool runs entirely in your browser using JavaScript. Your PDF is read and converted locally on your device — it is never sent to MeggatronAI's servers or any third party.",
  },
  {
    question: "What image quality options are available?",
    answer:
      "You can choose any quality between 50% and 100% using the slider, corresponding to Low, Medium, High, and Maximum presets. Higher quality produces sharper images with larger file sizes.",
  },
  {
    question: "What's the difference between 1x, 2x, and 3x resolution scale?",
    answer:
      "The resolution scale multiplies the pixel dimensions of each exported image relative to the PDF page's default size. 1x is standard resolution, 2x doubles both width and height for sharper detail, and 3x triples it for print-quality output.",
  },
  {
    question: "Can I convert only specific pages instead of the whole PDF?",
    answer:
      "Yes. You can select individual pages by clicking their thumbnails, or type a range such as \"1-5, 8, 10-12\" into the page range field and click Apply Range.",
  },
  {
    question: "Can I convert a single page only?",
    answer:
      "Yes. Click Clear to deselect everything, then click the thumbnail for the one page you want. Only that page will be converted when you click Convert PDF.",
  },
  {
    question: "How do I download all converted images at once?",
    answer:
      "After conversion, click Download All to receive every converted page bundled into a single ZIP file, or use Download Selected to grab just the pages you're currently focused on.",
  },
  {
    question: "Does this tool work with password-protected PDFs?",
    answer:
      "Not currently. Encrypted or password-protected PDFs cannot be read by the browser-based renderer. Please remove the password from the PDF first, then upload it here.",
  },
  {
    question: "Is there a limit on file size or page count?",
    answer:
      "Yes, to keep conversion fast and reliable in the browser, files are limited to 100MB and 500 pages. Most everyday documents are well under these limits.",
  },
  {
    question: "Will the output images have a transparent background?",
    answer:
      "No. JPG does not support transparency, so any transparent areas in the original PDF page are filled with white in the exported image.",
  },
  {
    question: "Why does a higher scale produce a larger file size?",
    answer:
      "Increasing the resolution scale increases the pixel dimensions of the rendered image, which means more pixel data needs to be encoded. More pixels combined with higher quality settings result in larger JPG files.",
  },
  {
    question: "Can I use this tool on my phone or tablet?",
    answer:
      "Yes. The tool is fully responsive and works on desktop, laptop, tablet, and mobile browsers, including touch-based page selection and downloads.",
  },
  {
    question: "What happens if the conversion fails partway through?",
    answer:
      "If a page fails to render or encode, you'll see a clear error message describing what went wrong. Pages that converted successfully before the failure remain available for download.",
  },
];

const RELATED_TOOLS: {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
}[] = [
  {
    name: "Image Compressor",
    description: "Shrink JPG and PNG file sizes without losing quality.",
    href: "/tools/image-compressor",
    icon: ImagePlus,
  },
  {
    name: "PDF Merger",
    description: "Combine multiple PDF files into a single document.",
    href: "/tools/pdf-merger",
    icon: Layers,
  },
  {
    name: "PDF Splitter",
    description: "Break a PDF apart into individual pages or sections.",
    href: "/tools/pdf-splitter",
    icon: Scissors,
  },
  {
    name: "JPG to PDF",
    description: "Turn one or more JPG images into a single PDF file.",
    href: "/tools/jpg-to-pdf",
    icon: FileOutput,
  },
];