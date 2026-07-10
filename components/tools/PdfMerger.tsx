"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PDFDocument } from "pdf-lib";

import {
  UploadCloud,
  ShieldCheck,
  FileText,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";

import ToolLinks from "@/components/ui/ToolLinks";

export default function PdfMerger() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const addFiles = (incomingFiles: File[]) => {
    const pdfFiles = incomingFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length !== incomingFiles.length) {
      setError("Only PDF files are allowed.");
    } else {
      setError("");
    }

    if (pdfFiles.length > 0) {
      setFiles((prev) => [...prev, ...pdfFiles]);

      setMessage(
        `${pdfFiles.length} PDF${
          pdfFiles.length > 1 ? "s" : ""
        } added successfully.`
      );
    }
  };

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    addFiles(selectedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    setDragActive(false);

    const droppedFiles = Array.from(
      e.dataTransfer.files
    );

    addFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const moveFileUp = (index: number) => {
    if (index === 0) return;

    const updated = [...files];

    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];

    setFiles(updated);
  };

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return;

    const updated = [...files];

    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];

    setFiles(updated);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError("Please select at least two PDF files.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const mergedPdf =
        await PDFDocument.create();

      for (const file of files) {
        const bytes =
          await file.arrayBuffer();

        const pdf =
          await PDFDocument.load(bytes);

        const copiedPages =
          await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );

        copiedPages.forEach((page) =>
          mergedPdf.addPage(page)
        );
      }

      const mergedBytes = await mergedPdf.save();

const arrayBuffer = new Uint8Array(mergedBytes).buffer as ArrayBuffer;

const blob = new Blob([arrayBuffer], {
  type: "application/pdf",
});

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = "merged.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setMessage(
        "PDF merged successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        "Failed to merge PDF files."
      );
    } finally {
      setLoading(false);
    }
  };

  return ( 
  <main className="min-h-screen bg-[#070b16] py-16">
  <div className="mx-auto max-w-6xl px-6">

    {/* ================= HERO ================= */}

    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
        <ShieldCheck size={16} />
        Free • Secure • Browser Based
      </span>

      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
        PDF Merger
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
        Merge multiple PDF documents into one file instantly.
        Everything happens securely inside your browser.
        Your files never leave your device.
      </p>
    </motion.section>

    {/* ================= Upload ================= */}

    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-14 rounded-3xl border border-white/10 bg-[#111827] p-6 md:p-8"
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex h-[330px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300

        ${
          dragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5"
        }
        `}
      >
        <UploadCloud
          size={64}
          className="text-cyan-400"
        />

        <h2 className="mt-6 text-2xl font-bold text-white">
          Upload PDF Files
        </h2>

        <p className="mt-3 text-zinc-400">
          Drag & Drop your PDFs here
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          or click anywhere to browse
        </p>

        <span className="mt-6 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          PDF Files Only
        </span>
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleUpload}
      />

      {error && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-center text-green-400">
          {message}
        </div>
      )}
    </motion.section>
    {/* ================= Uploaded Files ================= */}

{files.length > 0 && (
  <motion.section
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-6"
  >
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">
        Uploaded PDF Files
      </h2>

      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
        {files.length} File{files.length > 1 ? "s" : ""}
      </span>
    </div>

    <div className="space-y-4">
      {files.map((file, index) => (
        <motion.div
          key={`${file.name}-${index}`}
          layout
          className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#070b16] p-5 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <FileText
                size={28}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-white break-all">
                {file.name}
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => moveFileUp(index)}
              disabled={index === 0}
              className="rounded-xl bg-zinc-800 p-3 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp size={18} />
            </button>

            <button
              onClick={() => moveFileDown(index)}
              disabled={index === files.length - 1}
              className="rounded-xl bg-zinc-800 p-3 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowDown size={18} />
            </button>

            <button
              onClick={() => removeFile(index)}
              className="rounded-xl bg-red-500/20 p-3 text-red-400 transition hover:bg-red-500/30"
            >
              <X size={18} />
            </button>

          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-10 flex justify-center">
      <button
        onClick={mergePDFs}
        disabled={loading || files.length < 2}
        className="rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading
          ? "Merging PDFs..."
          : "Merge PDF Files"}
      </button>
    </div>
  </motion.section>
)}
{/* ================= Statistics ================= */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
>
  <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
    <p className="text-sm text-zinc-500">
      PDF Files
    </p>

    <h3 className="mt-3 text-3xl font-bold text-white">
      {files.length}
    </h3>
  </div>

  <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
    <p className="text-sm text-zinc-500">
      Total Size
    </p>

    <h3 className="mt-3 text-3xl font-bold text-cyan-400">
      {(
        files.reduce(
          (total, file) => total + file.size,
          0
        ) /
        1024 /
        1024
      ).toFixed(2)} MB
    </h3>
  </div>

  <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
    <p className="text-sm text-zinc-500">
      Output
    </p>

    <h3 className="mt-3 text-2xl font-bold text-white">
      PDF
    </h3>
  </div>

  <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
    <p className="text-sm text-zinc-500">
      Processing
    </p>

    <h3 className="mt-3 text-2xl font-bold text-green-400">
      Browser
    </h3>
  </div>
</motion.section>

{/* ================= File Information ================= */}

{files.length > 0 && (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8"
  >
    <h2 className="text-3xl font-bold text-white">
      File Information
    </h2>

    <div className="mt-8 grid gap-6 md:grid-cols-3">

      <div className="rounded-2xl bg-[#070b16] p-6">
        <p className="text-sm text-zinc-500">
          Selected Files
        </p>

        <h3 className="mt-3 text-4xl font-bold text-cyan-400">
          {files.length}
        </h3>
      </div>

      <div className="rounded-2xl bg-[#070b16] p-6">
        <p className="text-sm text-zinc-500">
          Combined Size
        </p>

        <h3 className="mt-3 text-4xl font-bold text-white">
          {(
            files.reduce(
              (total, file) => total + file.size,
              0
            ) /
            1024 /
            1024
          ).toFixed(2)}{" "}
          MB
        </h3>
      </div>

      <div className="rounded-2xl bg-[#070b16] p-6">
        <p className="text-sm text-zinc-500">
          Output Format
        </p>

        <h3 className="mt-3 text-4xl font-bold text-green-400">
          PDF
        </h3>
      </div>

    </div>
  </motion.section>
)}

{/* ================= Privacy ================= */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-12 rounded-3xl border border-white/10 bg-[#111827] p-8"
>
  <h2 className="text-3xl font-bold text-white">
    Your Files Stay Private
  </h2>

  <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
    Every PDF is merged directly inside your browser.
    Your files are never uploaded to any server,
    ensuring maximum privacy and security.
  </p>

  <div className="mt-10 grid gap-6 md:grid-cols-3">

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-lg font-semibold text-white">
        No Uploads
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-400">
        All processing happens locally on your device.
      </p>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-lg font-semibold text-white">
        Fast Processing
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Merge PDFs instantly without waiting for cloud uploads.
      </p>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-lg font-semibold text-white">
        Secure
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Your documents remain private from start to finish.
      </p>
    </div>

  </div>
</motion.section>
{/* ================= SEO CONTENT ================= */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-16 rounded-3xl border border-white/10 bg-[#111827] p-8"
>
  <h2 className="text-3xl font-bold text-white">
    Free Online PDF Merger
  </h2>

  <p className="mt-6 leading-8 text-zinc-400">
    MeggatronAI PDF Merger allows you to combine multiple
    PDF documents into one file quickly and securely.
    Everything is processed directly inside your browser,
    meaning your files never leave your device.
  </p>

  <p className="mt-5 leading-8 text-zinc-400">
    Whether you're combining reports, invoices,
    presentations, assignments, contracts, or personal
    documents, our PDF Merger provides a fast,
    privacy-focused, and completely free solution.
  </p>

  <div className="mt-10 grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-xl font-semibold text-white">
        Features
      </h3>

      <ul className="mt-5 space-y-3 text-zinc-400">
        <li>✓ Merge unlimited PDF files</li>
        <li>✓ Drag & Drop support</li>
        <li>✓ Rearrange file order</li>
        <li>✓ Instant download</li>
        <li>✓ Browser-based processing</li>
        <li>✓ 100% Free</li>
        <li>✓ No registration required</li>
        <li>✓ Secure local processing</li>
      </ul>
    </div>

    <div className="rounded-2xl bg-[#070b16] p-6">
      <h3 className="text-xl font-semibold text-white">
        Best For
      </h3>

      <ul className="mt-5 space-y-3 text-zinc-400">
        <li>✓ Business documents</li>
        <li>✓ School assignments</li>
        <li>✓ Office reports</li>
        <li>✓ Contracts & agreements</li>
        <li>✓ Research papers</li>
        <li>✓ Presentations</li>
        <li>✓ Personal records</li>
        <li>✓ PDF organization</li>
      </ul>
    </div>

  </div>
</motion.section>
{/* ================= FAQ ================= */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-16 rounded-3xl border border-white/10 bg-[#111827] p-8"
>
  <h2 className="text-3xl font-bold text-white">
    Frequently Asked Questions
  </h2>

  <div className="mt-8 space-y-8">

    <div>
      <h3 className="text-lg font-semibold text-white">
        Is this PDF Merger free?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        Yes. MeggatronAI PDF Merger is completely free to use with
        no hidden charges or subscriptions.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Are my PDF files uploaded to a server?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        No. All PDF processing happens locally in your browser.
        Your files never leave your device.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Can I merge more than two PDF files?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        Yes. You can merge multiple PDF documents in any order.
        Simply upload your files and rearrange them before merging.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Can I change the order of the PDFs?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        Absolutely. Use the Up and Down buttons to reorder your
        documents before creating the final merged PDF.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Is there a file size limit?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        There is no fixed limit within the tool. The maximum number
        and size of files depend on your browser and your device's
        available memory.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Does it work on mobile devices?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        Yes. The PDF Merger is fully responsive and works on modern
        Android, iPhone, tablet, and desktop browsers.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Will the merged PDF lose quality?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        No. The original PDF pages are combined without reducing
        their quality, helping preserve text and graphics.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Is my information secure?
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        Yes. Because all processing happens inside your browser,
        your documents remain private and under your control.
      </p>
    </div>

  </div>
</motion.section>
{/* ================= Related Tools ================= */}

<ToolLinks
  tools={[
    {
      name: "PDF Compressor",
      href: "/tools/pdf-compressor",
    },
    {
      name: "Image Compressor",
      href: "/tools/image-compressor",
    },
    {
      name: "QR Generator",
      href: "/tools/qr-generator",
    },
    {
      name: "Word Counter",
      href: "/tools/word-counter",
    },
  ]}
/>

  </div>
</main>
  );
}