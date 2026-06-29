"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FileText,
  Image,
  Code,
  Shield,
  Sparkles,
} from "lucide-react";

type Props = {
  active: string;
  setActive: (value: string) => void;
};

const categories = [
  { name: "AI", icon: Bot },
  { name: "PDF", icon: FileText },
  { name: "Images", icon: Image },
  { name: "Developer", icon: Code },
  { name: "Security", icon: Shield },
  { name: "Productivity", icon: Sparkles },
];

export default function ToolCategories({ active, setActive }: Props) {
  return (
    <div className="relative">

      {/* 🔥 LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#09090B] to-transparent" />

      {/* 🔥 RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#09090B] to-transparent" />

      {/* 🎯 SCROLL CONTAINER */}
      <div className="flex gap-4 overflow-x-auto px-2 py-3 no-scrollbar">

        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.name;

          return (
            <motion.button
              key={cat.name}
              onClick={() => setActive(cat.name)}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex shrink-0 items-center gap-3 rounded-full px-6 py-3
                backdrop-blur-xl border transition-all duration-300
                ${
                  isActive
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
                    : "bg-white/5 border-white/10 text-white hover:border-cyan-400/50 hover:bg-cyan-500/10"
                }
              `}
            >
              <Icon size={18} />
              <span className="font-medium">{cat.name}</span>
            </motion.button>
          );
        })}

      </div>
    </div>
  );
}