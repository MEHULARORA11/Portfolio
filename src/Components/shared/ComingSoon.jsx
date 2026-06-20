import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

/**
 * Premium "Coming Soon" component for empty portfolio categories.
 * Features rotating futuristic layout cues, neon ambient glow, and glass elevation.
 */
export default function ComingSoon({
  title = "Content Hub",
  subtitle = "Future technical developments are currently staging.",
  Icon = Clock,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="group relative w-full max-w-2xl mx-auto py-16 px-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md overflow-hidden text-center select-none"
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Background ambient glowing ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[90px] pointer-events-none" />

      {/* Futuristic Scanner Bracket Visual */}
      <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="absolute inset-0 border-2 border-dashed border-[var(--accent-border)] rounded-full opacity-60"
        />

        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent-light)] shadow-lg relative z-10"
        >
          <Icon className="w-7 h-7" />
        </motion.div>

        {/* Dynamic radar pulse */}
        <motion.span
          animate={{
            scale: [1, 1.4],
            opacity: [0.4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeOut",
          }}
          className="absolute w-20 h-20 rounded-full border border-[var(--accent-light)] pointer-events-none"
        />
      </div>

      {/* Badge Indicator */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--accent-border)] bg-[var(--accent-muted)] text-[10px] font-mono font-bold tracking-widest text-[var(--accent-light)] mb-4 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)] animate-ping" />
        Staging_Incoming
      </span>

      <h3 className="text-2xl sm:text-3xl font-extrabold theme-text tracking-tight mb-3">
        {title} Coming Soon
      </h3>

      <p className="text-sm sm:text-base theme-text-secondary max-w-[42ch] mx-auto leading-relaxed opacity-85">
        {subtitle}
      </p>

      {/* Ornamental footer line */}
      <div className="h-[1px] w-1/3 bg-gradient-to-r from-transparent via-[var(--accent-border)] to-transparent mx-auto mt-8 opacity-50" />
    </motion.div>
  );
}
