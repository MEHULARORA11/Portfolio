import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable wrapper that adds an organic floating drift animation
 * (up and down) using smooth easeInOut curves. Automatically disables
 * when reduced motion is preferred.
 */
export default function FloatingWrapper({
  children,
  className = "",
  yRange = [-10, 10],
  duration = 6,
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: yRange,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
