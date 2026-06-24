import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="mb-4 text-center text-5xl font-bold">
        All Tools
      </h1>

      <p className="mb-16 text-center text-gray-500 text-xl">
        Discover productivity, utility, and AI-powered tools built to save time.
      </p>

      {/* Text Tools */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">
          Text Tools
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/tools/word-counter">
            <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-2xl font-semibold">
                Word Counter
              </h3>
              <p className="mt-2 text-gray-500">
                Count words, characters, sentences and paragraphs.
              </p>
            </div>
          </Link>

          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              Character Counter
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              Text Case Converter
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Security Tools */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">
          Security Tools
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              Password Generator
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Image Tools */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">
          Image Tools
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              QR Code Generator
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section>
        <h2 className="mb-8 text-3xl font-bold">
          AI Tools
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              AI Writer
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              AI Summarizer
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-2xl font-semibold">
              AI Chat
            </h3>
            <p className="mt-2 text-gray-500">
              Coming Soon
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}