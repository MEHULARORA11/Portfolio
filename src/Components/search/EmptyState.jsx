import React from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";
import GlowButton from "../shared/GlowButton";

/**
 * Immersive and animated Empty State component for search results.
 * Displays when a search returns zero matches.
 */
export default function EmptyState({ onReset, message = "No matching items found." }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md relative overflow-hidden max-w-lg mx-auto mt-8 select-none"
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Background neon glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[var(--accent)] opacity-5 blur-[80px] pointer-events-none" />

      {/* Floating scanner effect container */}
      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent-light)] shadow-lg"
        >
          <Search className="w-8 h-8" />
        </motion.div>

        {/* Animated outer ring scanner */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
          className="absolute inset-0 border border-[var(--accent)] rounded-2xl pointer-events-none"
        />
      </div>

      <h3 className="text-xl font-bold theme-text mb-2 tracking-tight">
        Zero Match Coordinates
      </h3>
      <p className="text-sm theme-text-secondary max-w-[32ch] leading-relaxed mb-6 opacity-80">
        {message} Try modifying your keywords or clear the active query input.
      </p>

      <GlowButton onClick={onReset} variant="outline" className="flex items-center gap-2 !py-2.5 !px-5">
        <RotateCcw className="w-3.5 h-3.5" />
        Clear Search
      </GlowButton>
    </motion.div>
  );
}
