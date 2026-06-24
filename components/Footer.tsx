import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950">

      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.08),transparent_70%)]" />

      {/* Neon Divider */}
      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/">
              <h3 className="cursor-pointer text-3xl font-bold transition-colors duration-300 hover:text-teal-400">
                Meggatron
                <span className="text-teal-400">AI</span>
              </h3>
            </Link>

            <p className="mt-4 text-zinc-400">
              Powerful AI tools and utility tools designed to help
              students, professionals, creators, and businesses save
              time and boost productivity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Navigation
            </h4>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-teal-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/tools"
                  className="transition-colors duration-300 hover:text-teal-400"
                >
                  Tools
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-teal-400"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors duration-300 hover:text-teal-400"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          <div>
  <h4 className="mb-4 text-lg font-semibold">
    Resources
  </h4>

  <ul className="space-y-3 text-zinc-400">

    <li>
      <Link
        href="/faq"
        className="transition-colors duration-300 hover:text-teal-400"
      >
        FAQ
      </Link>
    </li>

    <li>
      <Link
        href="/support"
        className="transition-colors duration-300 hover:text-teal-400"
      >
        Support
      </Link>
    </li>

    <li>
      <Link
        href="/privacy-policy"
        className="transition-colors duration-300 hover:text-teal-400"
      >
        Privacy Policy
      </Link>
    </li>

    <li>
      <Link
        href="/terms-of-service"
        className="transition-colors duration-300 hover:text-teal-400"
      >
        Terms of Service
      </Link>
    </li>

  </ul>
</div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h4>

            <a
              href="mailto:meggatronai@gmail.com"
              className="text-zinc-400 transition-colors duration-300 hover:text-teal-400"
            >
              meggatronai@gmail.com
            </a>

            <p className="mt-4 text-zinc-500">
              Building the future of productivity.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-zinc-500">
          © 2026 MeggatronAI • Built for Productivity & Innovation
        </div>

      </div>
    </footer>
  );
}