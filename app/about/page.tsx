export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-6 text-center text-5xl font-bold">
        About MeggatronAI
      </h1>

      <p className="mb-16 text-center text-xl text-gray-500">
        Transforming hours of work into minutes of productivity.
      </p>

      {/* Our Story */}
      <section className="mb-16">
        <h2 className="mb-6 text-4xl font-bold">Our Story</h2>

        <div className="space-y-6 text-lg leading-8 text-gray-600">
          <p>Every great idea starts with a problem.</p>

          <p>
            A few years ago, I was an undergraduate student trying to build my
            first professional resume. What seemed like a simple task quickly
            turned into a frustrating experience. I spent nearly 4–5 hours
            formatting content, adjusting layouts, fixing alignment issues, and
            searching for the right resources.
          </p>

          <p>
            By the time I was finished, I couldn't help but think there had to
            be a better way.
          </p>

          <p>
            Why should people spend hours on tasks that technology can complete
            in minutes?
          </p>

          <p>
            The more I looked around, the more I realized that students,
            professionals, freelancers, entrepreneurs, and creators face
            similar challenges every day.
          </p>

          <p>
            Whether it's writing content, generating documents, analyzing text,
            converting files, creating passwords, optimizing workflows, or
            using AI-powered solutions, people often waste valuable time on
            repetitive tasks.
          </p>

          <p>That's why MeggatronAI was created.</p>

          <p>
            MeggatronAI is built with one purpose: to simplify everyday tasks
            and help people achieve more in less time through powerful digital
            tools and AI-driven solutions.
          </p>

          <p>
            Transform hours of work into minutes of productivity.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16 rounded-2xl border p-8">
        <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>

        <p className="text-lg leading-8 text-gray-600">
          Our mission is to make powerful technology accessible to everyone. We
          aim to provide a platform where students, professionals, creators,
          and businesses can access practical tools that simplify complex
          tasks, improve productivity, and save valuable time.
        </p>
      </section>

      {/* Vision */}
      <section className="mb-16 rounded-2xl border p-8">
        <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>

        <p className="text-lg leading-8 text-gray-600">
          We envision a future where technology removes barriers instead of
          creating them. MeggatronAI aims to become a global hub of intelligent
          productivity tools that empower individuals and organizations to
          focus on creativity, innovation, and growth rather than repetitive
          manual work.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Why Choose MeggatronAI?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-semibold">⚡ Save Time</h3>

            <p className="text-gray-600">
              Automate repetitive tasks and complete work in minutes instead of
              hours.
            </p>
          </div>

          <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-semibold">
              🤖 Smart Technology
            </h3>

            <p className="text-gray-600">
              Access modern AI-powered solutions and practical productivity
              tools from a single platform.
            </p>
          </div>

          <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-semibold">
              🔒 Reliable & Secure
            </h3>

            <p className="text-gray-600">
              We prioritize user trust, privacy, and a seamless experience
              across all our tools.
            </p>
          </div>

          <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-3 text-2xl font-semibold">
              🌍 Accessible Anywhere
            </h3>

            <p className="text-gray-600">
              Use MeggatronAI anytime, anywhere, from any device with an
              internet connection.
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="rounded-2xl border p-10 text-center">
        <h2 className="mb-4 text-4xl font-bold">Join Our Journey</h2>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
          MeggatronAI is more than just a collection of tools—it's a mission to
          make technology more useful, accessible, and impactful for everyone.
          Whether you're a student, professional, entrepreneur, or creator,
          we're excited to help you work smarter and achieve more.
        </p>
      </section>
    </main>
  );
}