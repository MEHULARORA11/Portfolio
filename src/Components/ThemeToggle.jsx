import React from "react";
import { FiSun, FiMoon, FiFeather } from "react-icons/fi";

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === "dark";

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        onClick={onToggle}
        className="theme-toggle-glow relative flex items-center gap-1 p-1.5 rounded-full cursor-pointer select-none"
        style={{
          backgroundColor: "var(--toggle-track)",
          border: "1px solid var(--card-border)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Sliding thumb */}
        <span
          className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            left: isDark ? "6px" : "calc(50% + 2px)",
            backgroundColor: "var(--toggle-thumb)",
            boxShadow: "0 2px 12px var(--accent-glow)",
          }}
        />

        {/* Dark option */}
        <span
          className="relative z-10 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-400"
          style={{ color: isDark ? "var(--toggle-text-active)" : "var(--toggle-text)" }}
        >
          <FiMoon className="text-sm" />
          <span className="hidden sm:inline">Dark</span>
        </span>

        {/* Light option */}
        <span
          className="relative z-10 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-400"
          style={{ color: !isDark ? "var(--toggle-text-active)" : "var(--toggle-text)" }}
        >
          <FiSun className="text-sm" />
          <span className="hidden sm:inline">Light</span>
        </span>
      </button>

      {/* Theme label */}

    </div>
  );
};

export default ThemeToggle;
