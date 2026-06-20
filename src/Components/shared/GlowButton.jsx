import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable, premium button implementing spring physics, micro-interactions,
 * and custom neon shadow glows matching the site's dark/light variables.
 */
export default function GlowButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full overflow-hidden transition-all duration-300 select-none text-sm sm:text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(0,0,0,0.8)]";

  const variants = {
    primary:
      "theme-btn font-medium cursor-pointer shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)]",
    secondary:
      "bg-[var(--accent-muted)] border border-[var(--accent-border)] text-[var(--accent-light)] hover:bg-[var(--accent-glow-soft)] hover:border-[var(--accent-light)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
    outline:
      "bg-transparent border border-[var(--card-border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent-light)] backdrop-blur-sm",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      className={`${baseClasses} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {/* Glow highlight effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
