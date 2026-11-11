import type { SeasonKey } from "../seasons";

export type SeasonalLayerId =
  | "snowfall"
  | "tsparticles-flakes"
  | "seasonalfx-petals"
  | "seasonalfx-dust"
  | "leaves-primary"
  | "tsparticles-leaves";

export interface SeasonLayerSpec {
  id: SeasonalLayerId;
  baseCount: number;
}

export const SEASON_LAYERS: Record<SeasonKey, readonly SeasonLayerSpec[]> = {
  winter: [
    { id: "snowfall", baseCount: 120 },
    { id: "tsparticles-flakes", baseCount: 15 },
  ],
  spring: [{ id: "seasonalfx-petals", baseCount: 32 }],
  summer: [{ id: "seasonalfx-dust", baseCount: 20 }],
  autumn: [
    { id: "leaves-primary", baseCount: 26 },
    { id: "tsparticles-leaves", baseCount: 16 },
  ],
};

export function applyParticleBudget(baseCount: number, budget: number): number {
  return Math.max(1, Math.round(baseCount * budget));
}
