"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { SEASONS } from "../seasons";
import { applyParticleBudget, SEASON_LAYERS } from "./layers.config";
import {
  initParticlesEngine,
  useCoarsePointer,
  useDocumentVisible,
} from "./particlesEngine";
import { useEffectsPolicy } from "./useEffectsPolicy";

const BASE_FLAKES_COUNT =
  SEASON_LAYERS.winter.find((l) => l.id === "tsparticles-flakes")?.baseCount ??
  15;

export default function TsFlakesLayer() {
  const { budget } = useEffectsPolicy();
  const isCoarsePointer = useCoarsePointer();
  const isVisible = useDocumentVisible();
  const containerRef = useRef<Container | undefined>(undefined);
  const count = applyParticleBudget(BASE_FLAKES_COUNT, budget);

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
            color: { value: [...SEASONS.winter.particles] },
          },
        },
        opacity: { value: { min: 0.08, max: 0.24 } },
        size: { value: { min: 4, max: 9 } },
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.35, max: 0.9 },
          size: true,
          drift: { min: -0.25, max: 0.25 },
          outModes: { default: "out" },
        },
        wobble: {
          enable: true,
          distance: 10,
          speed: { angle: 10, move: 3 },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: !isCoarsePointer,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 80,
            duration: 0.4,
            speed: 0.4,
          },
        },
      },
    }),
    [count, isCoarsePointer]
  );

  return (
    <ParticlesProvider init={initParticlesEngine}>
      <Particles
        id="season-winter-flakes"
        options={options}
        particlesLoaded={handleParticlesLoaded}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
    </ParticlesProvider>
  );
}
