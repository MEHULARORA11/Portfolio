import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

/**
 * Statusline-style footer: a segmented strip with a live clock,
 * mode indicator, copyright, and back-to-top control.
 * Adapts to light/dark themes via existing CSS custom properties.
 */
const scrollToTop = () => {
  if (window.lenis) {
    window.lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

function useLiveClock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return time;
}

export default function Footer() {
  const time = useLiveClock();

  return (
    <footer className="w-full py-8 mt-10">
      <div className="status-bar">

        {/* Segment 1 — Mode indicator */}
        <div className="status-segment gap-2 shrink-0">
          <span
            className="inline-flex h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-widest"
            style={{ color: "var(--accent-light)" }}
          >
            MA
          </span>
        </div>

        {/* Segment 2 — Live clock */}
        <div className="status-segment gap-1.5 shrink-0" title="Local time">
          <span className="theme-text-muted tabular-nums">{time}</span>
        </div>

        {/* Segment 3 — Copyright (flex-grow, takes remaining space) */}
        <div className="status-segment status-segment-grow justify-center gap-1.5 min-w-0">
          <span className="theme-text-muted truncate">
            © {new Date().getFullYear()}
          </span>
          <span className="theme-text font-bold truncate">Mehul Arora</span>
          <span className="theme-text-muted hidden sm:inline">·</span>
          <span className="theme-text-secondary hidden sm:inline truncate">
            All Rights Reserved
          </span>
        </div>

        {/* Segment 4 — Back to top */}
        <button
          onClick={scrollToTop}
          className="status-segment gap-2 shrink-0 cursor-pointer theme-text-secondary hover:text-[var(--accent-light)] hover:bg-[var(--card-hover-bg)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
          aria-label="Scroll to top of the page"
        >
          <span className="hidden sm:inline">Back to top</span>
          <FiArrowUp className="text-sm transition-transform duration-300 group-hover:-translate-y-1" />
        </button>

      </div>
    </footer>
  );
}
