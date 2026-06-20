import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ theme, onToggle, hide }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`fixed top-3 right-3 sm:top-6 sm:right-6 z-50 flex flex-col items-end gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        hide
          ? "opacity-0 pointer-events-none -translate-y-6 scale-90"
          : "opacity-100 scale-100"
      }`}
    >
      <button
        onClick={onToggle}
        className="theme-toggle-glow relative flex items-center gap-1 p-1 sm:p-1.5 rounded-full cursor-pointer select-none"
        style={{
          backgroundColor: "var(--toggle-track)",
          border: "1px solid var(--card-border)",
          backdropFilter: "blur(14px)",
        }}
      >
        <span
          className="absolute top-1 bottom-1 sm:top-1.5 sm:bottom-1.5 w-[calc(50%-3px)] sm:w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            left: isDark ? "4px" : "calc(50% + 1px)",
            backgroundColor: "var(--toggle-thumb)",
            boxShadow: "0 2px 12px var(--accent-glow)",
          }}
        />

        <span
          className="relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-400"
          style={{ color: isDark ? "var(--toggle-text-active)" : "var(--toggle-text)" }}
        >
          <FiMoon className="text-xs sm:text-sm" />
        </span>

        <span
          className="relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-400"
          style={{ color: !isDark ? "var(--toggle-text-active)" : "var(--toggle-text)" }}
        >
          <FiSun className="text-xs sm:text-sm" />
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;