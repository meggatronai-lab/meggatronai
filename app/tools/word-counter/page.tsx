"use client";

import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const characters = text.length;

  const sentences =
    text.trim() === ""
      ? 0
      : text.split(/[.!?]+/).filter(Boolean).length;

  const paragraphs =
    text.trim() === ""
      ? 0
      : text.split(/\n+/).filter(Boolean).length;

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-4 text-center text-5xl font-bold">
        Word Counter
      </h1>

      <p className="mb-10 text-center text-gray-500">
        Count words, characters, sentences, and paragraphs instantly.
      </p>

      <textarea
        className="h-64 w-full rounded-2xl border p-4 text-lg outline-none focus:ring-2"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="cursor-pointer rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <h2 className="text-4xl font-bold">{words}</h2>
          <p className="mt-2 text-gray-500">Words</p>
        </div>

        <div className="cursor-pointer rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <h2 className="text-4xl font-bold">{characters}</h2>
          <p className="mt-2 text-gray-500">Characters</p>
        </div>

        <div className="cursor-pointer rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <h2 className="text-4xl font-bold">{sentences}</h2>
          <p className="mt-2 text-gray-500">Sentences</p>
        </div>

        <div className="cursor-pointer rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <h2 className="text-4xl font-bold">{paragraphs}</h2>
          <p className="mt-2 text-gray-500">Paragraphs</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border p-6">
        <h3 className="mb-4 text-2xl font-semibold">
          Reading Statistics
        </h3>

        <div className="space-y-3">
          <p>
            <strong>Reading Time:</strong>{" "}
            {Math.ceil(words / 200)} minute(s)
          </p>

          <p>
            <strong>Speaking Time:</strong>{" "}
            {Math.ceil(words / 130)} minute(s)
          </p>
        </div>
      </div>
    </main>
  );
}