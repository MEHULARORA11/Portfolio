"use client";

import { useEffect, useRef } from "react";
import { FallingLeaves } from "falling-leaves";
import { SEASONS } from "../seasons";
import { LEAVES_PRIMARY_MOTION } from "./motion.config";
import { applyParticleBudget, SEASON_LAYERS } from "./layers.config";
import { useDocumentVisible } from "./particlesEngine";
import { useEffectsPolicy } from "./useEffectsPolicy";

const BASE_LEAVES_COUNT =
  SEASON_LAYERS.autumn.find((l) => l.id === "leaves-primary")?.baseCount ?? 26;

export default function LeavesPrimaryLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<FallingLeaves | null>(null);
  const { budget } = useEffectsPolicy();
  const isVisible = useDocumentVisible();
  const count = applyParticleBudget(BASE_LEAVES_COUNT, budget);
  const initialCountRef = useRef(count);
  const initialVisibleRef = useRef(isVisible);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leaves = new FallingLeaves({
      container,
      count: initialCountRef.current,
      shapes: ["maple", "oak", "ginkgo", "birch"],
      colors: [...SEASONS.autumn.particles],
      size: [...LEAVES_PRIMARY_MOTION.size],
      speed: [...LEAVES_PRIMARY_MOTION.speed],
      wind: [...LEAVES_PRIMARY_MOTION.wind],
      sway: [...LEAVES_PRIMARY_MOTION.sway],
      rotationSpeed: [...LEAVES_PRIMARY_MOTION.rotationSpeed],
      opacity: LEAVES_PRIMARY_MOTION.opacity,
      respectReducedMotion: true,
      autoStart: initialVisibleRef.current,
    });

    leavesRef.current = leaves;

    return () => {
      leaves.destroy();
      leavesRef.current = null;
    };
  }, []);

  useEffect(() => {
    leavesRef.current?.update({ count });
  }, [count]);

  useEffect(() => {
    const leaves = leavesRef.current;
    if (!leaves) return;

    if (isVisible) {
      leaves.start();
    } else {
      leaves.stop();
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full pointer-events-none overflow-hidden"
    />
  );
}
