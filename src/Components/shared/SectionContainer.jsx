import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable section container that wraps portfolio sections with
 * standardized responsive padding, margins, and fade-up reveals on scroll.
 */
export default function SectionContainer({
  id,
  children,
  className = "",
  delay = 0.1,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium cinematic ease-out
      }}
      className={`mb-20 lg:mb-36 relative w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}
