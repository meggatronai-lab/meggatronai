import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.meggatronai.com"),

  title: {
    default: "MeggatronAI | Free AI Tools",
    template: "%s | MeggatronAI",
  },

  description:
    "Free AI tools for productivity, image compression, PDF tools, writing, and more.",

  openGraph: {
    title: "MeggatronAI",
    description: "Free AI Tools Platform",
    url: "https://www.meggatronai.com",
    siteName: "MeggatronAI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MeggatronAI",
    description: "Free AI Tools Platform",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#050816] text-white antialiased">
        <Navbar />

        <main className="flex min-h-screen flex-col">
          {children}
        </main>

        <ScrollToTop />
      </body>
    </html>
  );
}