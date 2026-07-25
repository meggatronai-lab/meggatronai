import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#0B1220] p-8">

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
        <Sparkles className="h-7 w-7 text-cyan-400" />
      </div>

      {/* Label */}
      <span className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Featured Tool
      </span>

      {/* Title */}
      <h3 className="mt-4 text-3xl font-bold text-white">
        AI Resume Builder
      </h3>

      {/* Description */}
      <p className="mt-5 flex-1 leading-8 text-zinc-400">
        Create professional, ATS-friendly resumes in minutes using AI.
        Build polished resumes faster with intelligent suggestions,
        clean layouts, and modern templates.
      </p>

      {/* Stats */}
      <div className="mt-8 flex gap-8 border-t border-white/10 pt-6">
        <div>
          <p className="text-2xl font-bold text-white">Free</p>
          <span className="text-sm text-zinc-500">Always</span>
        </div>

        <div>
          <p className="text-2xl font-bold text-white">Fast</p>
          <span className="text-sm text-zinc-500">Browser Based</span>
        </div>
      </div>

      {/* Button */}
      <Link
        href="/tools/ai-resume-builder"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-400"
      >
        Try Tool
        <ArrowRight className="h-4 w-4" />
      </Link>

    </div>
  );
}