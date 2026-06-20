import React, { useRef, useState } from "react";
import { Play, Square, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function YoutubeSearchBar({
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

  const popularTags = ["3D Web", "Next.js", "Framer Motion", "GSAP", "WebSockets", "Performance"];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 select-none">
      {/* Search Input Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        animate={{
          scale: isFocused ? 1.015 : 1,
          boxShadow: isFocused
            ? "0 0 25px rgba(239, 68, 68, 0.25)"
            : "var(--card-shadow)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="group relative flex items-center h-14 rounded-2xl border border-red-500/20 bg-black/40 backdrop-blur-md px-4 transition-all duration-300 hover:border-red-500/40 overflow-hidden"
      >
        {/* Spotlight Follower Layer - Red-shifted for YouTube */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(239, 68, 68, 0.12), transparent 80%)`,
          }}
        />

        {/* Video Mode Icon */}
        <motion.div
          animate={{
            scale: isFocused ? [1, 1.1, 1] : 1,
          }}
          className="relative z-10 mr-3 text-red-500 flex items-center justify-center flex-shrink-0"
        >
          <Video className="w-5 h-5" />
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search video titles, topics, keywords..."
          className="w-full h-full bg-transparent border-none outline-none text-sm text-red-50 placeholder-red-300/40 relative z-10 pr-2 font-medium"
        />

        {/* Live Typing Status Dot (Simulated Recording/Streaming Glow) */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 mr-2 relative z-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-[9px] font-mono text-red-400 font-bold hidden sm:inline">REC</span>
          </motion.div>
        )}

        {/* Action Buttons (Clear styled like a stop player icon) */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClear}
              title="Stop Search"
              className="relative z-10 p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Square className="w-3 h-3 fill-current" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Neon Red Bottom Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-transform duration-500 ${isFocused ? "scale-x-100" : "scale-x-0"}`} />
      </motion.div>

      {/* Popular tag shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-red-400/60 mr-1">
          TOPICS:
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
                  ? "bg-red-500 border-red-500 text-black shadow-[0_0_10px_rgba(239,68,68,0.5)] font-bold"
                  : "bg-transparent border-red-500/20 text-red-300 hover:border-red-500/50"
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
