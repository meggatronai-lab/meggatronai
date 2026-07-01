import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeggatronAI",
  description: "AI Tools & Utility Tools Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col bg-black text-white">

  <Navbar />
        {/* Navigation */}
        <Navbar />

        {/* Global Footer (Remove if Footer is rendered in page.tsx) */}
        {/* <Footer /> */}
<Navbar />

<main className="flex-1">
  {children}
</main>

<ScrollToTop />
      </body>
    </html>
  );
}