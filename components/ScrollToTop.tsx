"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8 z-50
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            border border-cyan-400/30
            bg-[#0b1220]/80
            backdrop-blur-xl
            shadow-[0_0_25px_rgba(34,211,238,0.25)]
            transition-all duration-300
            hover:scale-110
            hover:border-cyan-400
            hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]
          "
          aria-label="Scroll to top"
        >
          <ChevronUp
            size={26}
            className="text-cyan-400"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}