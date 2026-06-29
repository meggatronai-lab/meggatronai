"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Image,
  Shield,
  QrCode,
} from "lucide-react";

type Props = {
  activeCategory: string;
};

export default function ToolGrid({ activeCategory }: Props) {

  const allTools = [
    { title: "PDF Merge", category: "PDF", icon: FileText },
    { title: "Image Compressor", category: "Images", icon: Image },
    { title: "Password Generator", category: "Security", icon: Shield },
    { title: "QR Generator", category: "Developer", icon: QrCode },
  ];

  const filteredTools =
    activeCategory === "AI"
      ? allTools
      : allTools.filter((tool) => tool.category === activeCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">

      {filteredTools.map((tool) => {
        const Icon = tool.icon;

        return (
          <motion.div
            key={tool.title}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.2)]"
          >

            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-[80px]" />

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Icon size={26} className="text-cyan-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              {tool.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Powerful tool to boost productivity.
            </p>

            <div className="mt-4 text-sm text-cyan-400 opacity-0 group-hover:opacity-100">
              Open →
            </div>

          </motion.div>
        );
      })}

    </div>
  );
}