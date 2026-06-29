export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* ✅ REAL BACKGROUND IMAGE (guaranteed visible) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/featured-bg.png')",
        }}
      />

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🌈 GRADIENT DEPTH */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#09090B]" />

      {/* 🔵 LEFT GLOW */}
      <div className="absolute left-[-120px] top-[80px] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* 🟢 RIGHT GLOW */}
      <div className="absolute right-[-120px] bottom-[80px] h-[400px] w-[400px] rounded-full bg-teal-500/20 blur-[140px]" />

      {/* ✨ CENTER GLOW */}
      <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

    </div>
  );
}