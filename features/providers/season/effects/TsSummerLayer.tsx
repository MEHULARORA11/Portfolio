"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { SEASONS } from "../seasons";
import { applyParticleBudget, SEASON_LAYERS } from "./layers.config";
import { TS_SUMMER_MOTION } from "./motion.config";
import { initParticlesEngine, useDocumentVisible } from "./particlesEngine";
import { useEffectsPolicy } from "./useEffectsPolicy";

const BASE_SUMMER_COUNT =
  SEASON_LAYERS.summer.find((l) => l.id === "tsparticles-summer")?.baseCount ??
  90;

/** Summer: warm golden motes drifting slowly upward and twinkling. */
export default function TsSummerLayer() {
  const { budget } = useEffectsPolicy();
  const isVisible = useDocumentVisible();
  const containerRef = useRef<Container | undefined>(undefined);
  const count = applyParticleBudget(BASE_SUMMER_COUNT, budget);

  const handleParticlesLoaded = useCallback(async (container?: Container) => {
    containerRef.current = container;
    if (container && document.visibilityState === "hidden") {
      container.pause();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (isVisible) {
      container.play();
    } else {
      container.pause();
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      containerRef.current = undefined;
    };
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: count },
        shape: { type: "circle" },
        paint: {
          fill: {
            enable: true,
            color: { value: [...SEASONS.summer.particles] },
          },
        },
        opacity: {
          value: { ...TS_SUMMER_MOTION.opacity },
          animation: {
            enable: true,
            speed: TS_SUMMER_MOTION.twinkleSpeed,
            sync: false,
            startValue: "random",
          },
        },
        size: { value: { ...TS_SUMMER_MOTION.size } },
        move: {
          enable: true,
          direction: "top",
          speed: { ...TS_SUMMER_MOTION.riseSpeed },
          outModes: { default: "out" },
        },
        wobble: {
          enable: true,
          distance: TS_SUMMER_MOTION.wobble.distance,
          speed: { ...TS_SUMMER_MOTION.wobble.speed },
        },
      },
    }),
    [count]
  );

  return (
    <ParticlesProvider init={initParticlesEngine}>
      <Particles
        id="season-summer-motes"
        options={options}
        particlesLoaded={handleParticlesLoaded}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
    </ParticlesProvider>
  );
}
