import React from "react";
import { FiArrowUp } from "react-icons/fi";

/**
 * Minimalist and professional footer aligned with the portfolio design system.
 * Automatically adapts to light/dark themes.
 */
export default function Footer() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full py-8 mt-10 border-t theme-divider grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-xs tracking-wider uppercase font-semibold">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
        <span className="theme-text-muted">© {new Date().getFullYear()}</span>
        <span className="theme-text font-bold">Mehul Arora</span>
        <span className="theme-text-muted">·</span>
        <span className="theme-text-secondary">All Rights Reserved</span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={scrollToTop}
          className="group theme-icon-btn flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
          aria-label="Scroll to top of the page"
        >
          <span>Back to Top</span>
          <FiArrowUp className="text-sm group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      <div className="hidden sm:block" />
    </footer>
  );
}
