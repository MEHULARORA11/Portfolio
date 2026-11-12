"use client";

import { useScroll, useSpring, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-[2px] origin-left",
        "bg-gradient-to-r from-season-accent via-season-accent/80 to-season-accent/60",
        className
      )}
      style={{ scaleX }}
    />
  );
}
