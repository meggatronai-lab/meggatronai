import Link from "next/link";
import {
  FileText,
  Image,
  Shield,
  QrCode,
} from "lucide-react";

const tools = [
  {
    title: "PDF Merger",
    description: "Merge multiple PDF files into one document.",
    href: "/tools/pdf-merger",
    icon: FileText,
  },
  {
    title: "Image Compressor",
    description: "Compress images without losing quality.",
    href: "/tools/image-compressor",
    icon: Image,
  },
  {
    title: "Password Generator",
    description: "Generate strong and secure passwords instantly.",
    href: "/tools/password-generator",
    icon: Shield,
  },
  {
    title: "QR Generator",
    description: "Create beautiful QR codes in seconds.",
    href: "/tools/qr-generator",
    icon: QrCode,
  },
];

export default function ToolGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">

      {tools.map((tool) => {
        const Icon = tool.icon;

        return (
          <Link
            key={tool.title}
            href={tool.href}
            className="rounded-3xl border border-white/10 bg-[#0B1220] p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <Icon className="h-6 w-6 text-cyan-400" />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-white">
              {tool.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {tool.description}
            </p>
          </Link>
        );
      })}

    </div>
  );
}