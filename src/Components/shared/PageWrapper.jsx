import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable page wrapper that standardizes top padding and layout margins for
 * nested pages, while applying smooth entry and exit animations.
 */
export default function PageWrapper({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Premium ease-out curve
      }}
      className={`pt-24 pb-12 w-full min-h-[80vh] flex flex-col justify-start items-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
