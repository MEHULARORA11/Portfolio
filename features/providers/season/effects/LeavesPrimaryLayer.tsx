"use client";

import { useEffect, useRef } from "react";
import { FallingLeaves } from "falling-leaves";
import { SEASONS } from "../seasons";
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
      size: [14, 24],
      speed: [0.5, 1.1],
      wind: [-0.25, 0.55],
      sway: [0.4, 1.2],
      rotationSpeed: [-1.2, 1.2],
      opacity: 0.85,
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
