import React, { useRef, useState } from "react";
import { Search, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificatesSearchBar({
  value,
  onChange,
  onClear,
  onTagClick,
}) {
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const popularTags = ["hackathon"];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 select-none">
      {/* Search Input Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        animate={{
          scale: isFocused ? 1.015 : 1,
          boxShadow: isFocused ? "var(--input-focus-shadow)" : "var(--card-shadow)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="group relative flex items-center h-14 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md px-4 transition-all duration-300 hover:border-[var(--card-hover-border)] overflow-hidden"
      >
        {/* Spotlight Follower Layer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--accent-glow-soft), transparent 80%)`,
          }}
        />

        {/* Animated Search Icon */}
        <motion.div
          animate={{
            rotate: isFocused ? 15 : 0,
            scale: isFocused ? 1.1 : 1,
          }}
          className="relative z-10 mr-3 text-[var(--accent-light)] flex items-center justify-center flex-shrink-0"
        >
          <Award className="w-5 h-5" />
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search credential title, issuer, skills or tech..."
          className="w-full h-full bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder-[var(--input-placeholder)] relative z-10 pr-2 font-medium"
        />

        {/* Action Buttons (Clear) */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClear}
              className="relative z-10 p-1.5 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)] hover:border-[var(--accent-light)] text-[var(--accent-light)] hover:text-white transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Subtle Neon Line Border Indicator */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-500 ${isFocused ? "scale-x-100" : "scale-x-0"}`} />
      </motion.div>

      {/* Popular tag shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mr-1">
          SUGGESTIONS:
        </span>
        {popularTags.map((tag) => {
          const isActive = value.toLowerCase() === tag.toLowerCase();
          return (
            <motion.button
              key={tag}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              onClick={() => onTagClick(isActive ? "" : tag)}
              className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--button-text)] shadow-[0_0_10px_var(--accent-glow)] font-bold"
                  : "bg-transparent border-[var(--accent-border)] text-[var(--text-muted)] hover:border-[var(--accent-light)]"
              }`}
            >
              {tag}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
