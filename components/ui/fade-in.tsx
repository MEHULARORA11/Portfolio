"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  yOffset = 24,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1], // premium spring-like easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
