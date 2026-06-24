import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold">
        404
      </h1>

      <h2 className="mt-4 text-4xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-6 max-w-xl text-gray-500">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg border px-6 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        Back to Home
      </Link>
    </main>
  );
}