"use client";

import { useState } from "react";

const categories = [
  "All",
  "AI",
  "PDF",
  "Image",
  "SEO",
  "Developer",
  "Text",
];

export default function ToolCategories() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`rounded-full border px-5 py-2 text-sm font-medium ${
              active === category
                ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                : "border-white/10 bg-[#0B1220] text-zinc-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}