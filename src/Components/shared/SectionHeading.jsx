import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable Section Heading rendering premium gradient text and an
 * in-view animated indicator line.
 */
export default function SectionHeading({ title, subtitle }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mb-10 lg:mb-14 flex flex-col items-start relative select-none">
      {subtitle && (
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-light)] mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text pb-2">
        {title}
      </h2>
      <div className="h-[2px] w-full max-w-[200px] bg-gradient-to-r from-[var(--accent)] to-transparent mt-3 overflow-hidden rounded-full">
        {!shouldReduceMotion && (
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full w-full bg-[var(--accent-light)]"
          />
        )}
      </div>
    </div>
  );
}
