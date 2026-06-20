import React, { useRef, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function InstagramSearchBar({
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

  const popularTags = ["UI Hacks", "Performance", "ScrollTrigger", "Bento Grid", "Color Design", "A11y"];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 select-none">
      {/* 1px Gradient Wrapper to simulate a glowing border */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        animate={{
          scale: isFocused ? 1.015 : 1,
          boxShadow: isFocused
            ? "0 0 30px rgba(236, 72, 153, 0.3)"
            : "var(--card-shadow)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="p-[1px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500/30 hover:to-indigo-500 transition-all duration-500"
      >
        {/* Inner Search Box */}
        <div className="relative flex items-center h-14 rounded-[15px] bg-black/85 backdrop-blur-md px-4 overflow-hidden">
          {/* Spotlight Follower Layer - Pink/Purple tinted */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(236, 72, 153, 0.15), transparent 80%)`,
            }}
          />

          {/* Social Icon */}
          <motion.div
            animate={{
              rotate: isFocused ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mr-3 text-pink-400 flex items-center justify-center flex-shrink-0"
          >
            <FaInstagram className="w-5 h-5 animate-pulse" />
          </motion.div>

          {/* Input Field */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search reel captions, tags, dev hacks..."
            className="w-full h-full bg-transparent border-none outline-none text-sm text-pink-50 placeholder-pink-300/70 relative z-10 pr-2 font-medium"
          />

          {/* Sparkle typing indicator */}
          {value && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="mr-2 text-purple-400 relative z-10"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          )}

          {/* Action Buttons (Clear) */}
          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={onClear}
                className="relative z-10 p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 hover:border-pink-500 text-pink-400 hover:text-white transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Popular tag shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400/60 mr-1">
          REELS:
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
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 border-none text-white shadow-[0_0_12px_rgba(236,72,153,0.6)] font-bold"
                  : "bg-transparent border-pink-500/20 text-pink-300 hover:border-pink-500/50"
              }`}
            >
              #{tag}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
