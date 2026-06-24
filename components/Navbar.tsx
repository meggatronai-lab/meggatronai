import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">
            Meggatron
            <span className="text-teal-400">AI</span>
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm font-medium">

          <Link
            href="/"
            className="transition-colors duration-300 hover:text-teal-400"
          >
            Home
          </Link>

          <Link
            href="/tools"
            className="transition-colors duration-300 hover:text-teal-400"
          >
            Tools
          </Link>

          <Link
            href="/about"
            className="transition-colors duration-300 hover:text-teal-400"
          >
            About
          </Link>
<Link
  href="/faq"
  className="transition-colors duration-300 hover:text-teal-400"
>
  FAQ
</Link>
<Link
  href="/blog"
  className="transition-colors duration-300 hover:text-teal-400"
>
  Blog
</Link>
<Link
  href="/support"
  className="transition-colors duration-300 hover:text-teal-400"
>
  Support
</Link>
          <Link
            href="/ontact"
            className="transition-colors duration-300 hover:text-teal-400"
          >
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
}