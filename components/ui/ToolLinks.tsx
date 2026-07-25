"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface Tool {
  name: string;
  href: string;
  description?: string;
}

export interface ToolLinksProps {
  tools?: Tool[];
}

const DEFAULT_TOOLS: Tool[] = [
  { name: "Merge PDF", href: "/tools/pdf-merge", description: "Combine multiple PDFs into one file." },
  { name: "Split PDF", href: "/tools/pdf-split", description: "Extract or divide pages into separate files." },
  { name: "Compress PDF", href: "/tools/pdf-compress", description: "Shrink file size without losing quality." },
  { name: "PDF to Word", href: "/tools/pdf-to-word", description: "Convert PDFs into editable Word documents." },
];

export default function ToolLinks({ tools = DEFAULT_TOOLS }: ToolLinksProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.href}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          <Link
            href={tool.href}
            className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-cyan-400/30 hover:bg-white/[0.05]"
          >
            <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
            {tool.description && <p className="mt-1 text-xs leading-relaxed text-slate-400">{tool.description}</p>}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}