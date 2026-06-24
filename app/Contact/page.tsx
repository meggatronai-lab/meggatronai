export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      {/* Hero */}
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-gray-500">
          Have a question, suggestion, or partnership opportunity?
          We'd love to hear from you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="grid gap-10 md:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl border p-8">
          <h2 className="mb-6 text-3xl font-bold">
            Send a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">
                Name
              </label>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-lg border p-3"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg border px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-bold">
              📧 Email
            </h3>

            <p className="text-gray-600">
              meggatronai@gmail.com
            </p>
          </div>

          <div className="rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-bold">
              🌍 Availability
            </h3>

            <p className="text-gray-600">
              We are available worldwide and aim to respond
              to inquiries as quickly as possible.
            </p>
          </div>

          <div className="rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-bold">
              🚀 Social Media
            </h3>

            <p className="text-gray-600">
              Social channels coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="rounded-2xl border p-6">
            <h3 className="mb-2 text-xl font-semibold">
              Is MeggatronAI free to use?
            </h3>

            <p className="text-gray-600">
              Many tools will be available for free, with
              premium features planned for the future.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="mb-2 text-xl font-semibold">
              Will AI tools be added?
            </h3>

            <p className="text-gray-600">
              Yes. MeggatronAI will gradually expand from
              utility tools into powerful AI-driven tools.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="mb-2 text-xl font-semibold">
              How can I suggest a tool?
            </h3>

            <p className="text-gray-600">
              Use the contact form above and let us know
              which tool you'd like to see added.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}