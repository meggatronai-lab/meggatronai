import React from "react";

interface KeyTakeawaysProps {
  points: string[];
}

export default function KeyTakeaways({
  points,
}: KeyTakeawaysProps) {
  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Key Takeaways
      </h2>

      <ul className="space-y-4">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-zinc-300"
          >
            <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}