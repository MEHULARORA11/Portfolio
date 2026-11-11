"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { applyParticleBudget, SEASON_LAYERS } from "./layers.config";
import {
  initParticlesEngine,
  useCoarsePointer,
  useDocumentVisible,
} from "./particlesEngine";
import { useEffectsPolicy } from "./useEffectsPolicy";

const LEAF_IMAGES = [
  { src: "/seasons/maple.svg", width: 32, height: 32, replaceColor: false },
  { src: "/seasons/oak.svg", width: 32, height: 32, replaceColor: false },
  { src: "/seasons/ginkgo.svg", width: 32, height: 32, replaceColor: false },
];

const BASE_LEAVES_COUNT =
  SEASON_LAYERS.autumn.find((l) => l.id === "tsparticles-leaves")?.baseCount ??
  16;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) {
      resolve();
    }
  });
}

export default function TsLeavesLayer() {
  const [imagesReady, setImagesReady] = useState(false);
  const { budget } = useEffectsPolicy();
  const isCoarsePointer = useCoarsePointer();
  const isVisible = useDocumentVisible();
  const containerRef = useRef<Container | undefined>(undefined);
  const count = applyParticleBudget(BASE_LEAVES_COUNT, budget);

  useEffect(() => {
    let cancelled = false;
    void Promise.all(LEAF_IMAGES.map((item) => preloadImage(item.src))).then(
      () => {
        if (!cancelled) {
          setImagesReady(true);
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

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
        shape: {
          type: "image",
          options: {
            image: LEAF_IMAGES,
          },
        },
        opacity: { value: { min: 0.65, max: 0.9 } },
        size: { value: { min: 7, max: 13 } },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          animation: {
            enable: true,
            speed: 6,
            sync: false,
          },
        },
        wobble: {
          enable: true,
          distance: 16,
          speed: { angle: 25, move: 6 },
        },
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.65, max: 1.35 },
          drift: { min: -0.5, max: 0.5 },
          outModes: { default: "out" },
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

  if (!imagesReady) {
    return null;
  }

  return (
    <ParticlesProvider init={initParticlesEngine}>
      <Particles
        id="season-autumn-leaves"
        options={options}
        particlesLoaded={handleParticlesLoaded}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
    </ParticlesProvider>
  );
}
