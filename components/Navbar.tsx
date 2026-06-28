"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-zinc-800 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="select-none">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Meggatron
            <span className="text-teal-400">AI</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">

          <Link
            href="/"
            className="relative text-sm font-medium text-zinc-300 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>

          <Link
            href="/tools"
            className="relative text-sm font-medium text-zinc-300 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Tools
          </Link>

          <Link
            href="/about"
            className="relative text-sm font-medium text-zinc-300 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="relative text-sm font-medium text-zinc-300 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>

          <Link
            href="/tools"
            className="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/30"
          >
            Explore Tools
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-white lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="space-y-2 border-t border-zinc-800 bg-black/95 px-6 py-6 backdrop-blur-xl">

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-teal-400"
          >
            Home
          </Link>

          <Link
            href="/tools"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-teal-400"
          >
            Tools
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-teal-400"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-teal-400"
          >
            Contact
          </Link>

          <Link
            href="/tools"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block rounded-xl bg-teal-500 px-5 py-3 text-center font-semibold text-black transition hover:scale-[1.02] hover:bg-teal-400"
          >
            Explore Tools
          </Link>

        </div>
      </div>
    </header>
  );
}
