"use client";

import { useEffect, useRef } from "react";
import {
  createSeasonalFX,
  type Intensity,
  type ISeasonalFX,
  type Season,
  type SeasonConfig,
} from "seasonalfx";
import { useSeason } from "../useSeason";
import { SEASONALFX_SPEED_MULTIPLIER } from "./motion.config";
import { useDocumentVisible } from "./particlesEngine";
import { useEffectsPolicy } from "./useEffectsPolicy";

const SEASON_PRESETS: Partial<Record<Season, SeasonConfig>> = {
  spring: { variant: "softPetals", intensity: "subtle" },
  summer: { variant: "sunDust", intensity: "subtle" },
  autumn: { variant: "maple", intensity: "subtle" },
};

const INTENSITY_DOWNGRADE: Record<Intensity, Intensity> = {
  bold: "moderate",
  moderate: "subtle",
  subtle: "minimal",
  minimal: "minimal",
};

const FPS_CHECK_DELAY_MS = 3000;
const MIN_ACCEPTABLE_FPS = 24;

export interface SeasonalFxLayerProps {
  seasonOverride?: Extract<Season, "spring" | "summer" | "autumn">;
}

function buildSeasonConfig(
  season: Season,
  intensity: Intensity
): Partial<Record<Season, SeasonConfig>> {
  const preset = SEASON_PRESETS[season];
  if (!preset) {
    return SEASON_PRESETS;
  }
  return {
    ...SEASON_PRESETS,
    [season]: {
      ...preset,
      intensity,
    },
  };
}

export default function SeasonalFxLayer({
  seasonOverride,
}: SeasonalFxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { season: activeSeason } = useSeason();
  const { budget } = useEffectsPolicy();
  const isVisible = useDocumentVisible();

  const targetSeason = seasonOverride ?? activeSeason;
  const targetIntensity: Intensity = budget < 0.5 ? "minimal" : "subtle";
  const fxRef = useRef<ISeasonalFX | null>(null);
  const intensityRef = useRef<Intensity>(targetIntensity);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialIntensity = intensityRef.current;

    const fx = createSeasonalFX({
      target: container,
      autoSeason: false,
      season: targetSeason,
      intensity: initialIntensity,
      maxFPS: 30,
      disableOnMobile: false,
      respectReducedMotion: true,
      particleCustomization: { speedMultiplier: SEASONALFX_SPEED_MULTIPLIER },
      seasonConfig: buildSeasonConfig(targetSeason, initialIntensity),
    });

    fxRef.current = fx;
    fx.start();
    if (document.visibilityState === "hidden") {
      fx.pause();
    }

    const fpsTimer = window.setTimeout(() => {
      if (
        document.visibilityState === "hidden" ||
        typeof fx.getMetrics !== "function"
      ) {
        return;
      }
      const metrics = fx.getMetrics();
      if (metrics.fps > 0 && metrics.fps < MIN_ACCEPTABLE_FPS) {
        const downgraded = INTENSITY_DOWNGRADE[intensityRef.current];
        if (downgraded !== intensityRef.current) {
          intensityRef.current = downgraded;
          fx.updateConfig({
            season: targetSeason,
            intensity: downgraded,
            seasonConfig: buildSeasonConfig(targetSeason, downgraded),
          });
        }
      }
    }, FPS_CHECK_DELAY_MS);

    return () => {
      window.clearTimeout(fpsTimer);
      fx.destroy();
      fxRef.current = null;
    };
  }, [targetSeason]);

  useEffect(() => {
    const fx = fxRef.current;
    if (!fx || intensityRef.current === targetIntensity) return;

    intensityRef.current = targetIntensity;
    fx.updateConfig({
      season: targetSeason,
      intensity: targetIntensity,
      seasonConfig: buildSeasonConfig(targetSeason, targetIntensity),
    });
  }, [targetIntensity, targetSeason]);

  useEffect(() => {
    const fx = fxRef.current;
    if (!fx) return;

    if (isVisible) {
      fx.resume();
    } else {
      fx.pause();
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full pointer-events-none isolate"
    />
  );
}
