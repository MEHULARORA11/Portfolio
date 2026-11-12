import type { SeasonKey } from "../seasons";

export type SeasonalLayerId =
  | "snowfall"
  | "tsparticles-flakes"
  | "seasonalfx-petals"
  | "tsparticles-summer"
  | "leaves-primary"
  | "tsparticles-leaves";

export interface SeasonLayerSpec {
  id: SeasonalLayerId;
  baseCount: number;
}

export const SEASON_LAYERS: Record<SeasonKey, readonly SeasonLayerSpec[]> = {
  winter: [
    { id: "snowfall", baseCount: 50 },
    { id: "tsparticles-flakes", baseCount: 15 },
  ],
  spring: [{ id: "seasonalfx-petals", baseCount: 30 }],
  summer: [{ id: "tsparticles-summer", baseCount: 40 }],
  autumn: [
    { id: "leaves-primary", baseCount: 15 },
    { id: "tsparticles-leaves", baseCount: 15 },
  ],
};

export function applyParticleBudget(baseCount: number, budget: number): number {
  return Math.max(1, Math.round(baseCount * budget));
}
