export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-6 text-center text-5xl font-bold">
        Terms of Service
      </h1>

      <p className="mb-16 text-center text-xl text-gray-500">
        Please read these terms carefully before using MeggatronAI.
      </p>

      <div className="rounded-2xl border p-8">
        <p className="mb-8 text-sm text-gray-500">
          Last Updated: June 2026
        </p>

        {/* Acceptance */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            1. Acceptance of Terms
          </h2>

          <p className="leading-8 text-gray-600">
            By accessing or using MeggatronAI, you agree to comply with and be
            bound by these Terms of Service. If you do not agree with any part
            of these terms, you should discontinue use of the website.
          </p>
        </section>

        {/* Website Usage */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            2. Use of the Website
          </h2>

          <p className="mb-4 leading-8 text-gray-600">
            MeggatronAI provides productivity tools, utility tools, and future
            AI-powered services to assist users in completing tasks more
            efficiently.
          </p>

          <p className="mb-4 font-semibold">
            You agree NOT to:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Attempt unauthorized access to our systems.</li>
            <li>Interfere with website operations.</li>
            <li>Use the platform for unlawful activities.</li>
            <li>Distribute malicious software or harmful content.</li>
            <li>Abuse, exploit, or misuse our services.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            3. Intellectual Property
          </h2>

          <p className="leading-8 text-gray-600">
            All content, branding, designs, logos, text, graphics, software,
            and website functionality available on MeggatronAI are the property
            of MeggatronAI unless otherwise stated. Unauthorized copying,
            reproduction, or redistribution is prohibited.
          </p>
        </section>

        {/* Tool Disclaimer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            4. Tool Accuracy Disclaimer
          </h2>

          <p className="leading-8 text-gray-600">
            Our tools are provided for informational and productivity purposes
            only. While we strive for accuracy, we do not guarantee that all
            outputs, calculations, AI-generated responses, or tool results will
            always be complete, accurate, or error-free.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Users should independently verify important information before
            relying on tool outputs for personal, professional, legal,
            educational, financial, or business decisions.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            5. Limitation of Liability
          </h2>

          <p className="leading-8 text-gray-600">
            To the fullest extent permitted by applicable law, MeggatronAI
            shall not be liable for any direct, indirect, incidental,
            consequential, special, or punitive damages arising from the use or
            inability to use our website, tools, or services.
          </p>
        </section>

        {/* Third Party Services */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            6. Third-Party Services
          </h2>

          <p className="leading-8 text-gray-600">
            MeggatronAI may integrate with third-party services including
            hosting providers, analytics platforms, payment providers, AI
            providers, and other technology partners. We are not responsible
            for the practices, policies, or content of third-party services.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            7. Changes to Services
          </h2>

          <p className="leading-8 text-gray-600">
            We reserve the right to modify, suspend, discontinue, add, or
            remove features, tools, content, or services at any time without
            prior notice.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            8. Suspension or Termination
          </h2>

          <p className="leading-8 text-gray-600">
            We reserve the right to restrict, suspend, or terminate access to
            MeggatronAI if a user violates these Terms of Service or engages in
            activities that may harm the website, its users, or its operations.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            9. Governing Law
          </h2>

          <p className="leading-8 text-gray-600">
            These Terms of Service shall be governed and interpreted in
            accordance with applicable laws and regulations. Any disputes shall
            be resolved through appropriate legal channels.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            10. Contact Information
          </h2>

          <p className="leading-8 text-gray-600">
            If you have questions regarding these Terms of Service, please
            contact us:
          </p>

          <p className="mt-4 font-semibold">
            📧 meggatronai@gmail.com
          </p>
        </section>

        {/* Closing */}
        <section className="rounded-2xl border p-8">
          <h2 className="mb-4 text-3xl font-bold">
            Our Commitment
          </h2>

          <p className="leading-8 text-gray-600">
            MeggatronAI is committed to providing valuable, trustworthy, and
            accessible digital tools for users worldwide. By maintaining clear
            terms and transparent policies, we aim to create a secure and
            reliable platform that users can trust.
          </p>
        </section>
      </div>
    </main>
  );
}