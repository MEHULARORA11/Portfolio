"use client";

import Snowfall from "react-snowfall";
import { SEASONS } from "../seasons";
import { applyParticleBudget, SEASON_LAYERS } from "./layers.config";
import { useDocumentVisible } from "./particlesEngine";
import { useEffectsPolicy } from "./useEffectsPolicy";

const BASE_SNOWFLAKE_COUNT =
  SEASON_LAYERS.winter.find((l) => l.id === "snowfall")?.baseCount ?? 120;

export default function SnowfallLayer() {
  const { budget } = useEffectsPolicy();
  const isVisible = useDocumentVisible();

  if (!isVisible) {
    return null;
  }

  const snowflakeCount = applyParticleBudget(BASE_SNOWFLAKE_COUNT, budget);

  return (
    <Snowfall
      color={SEASONS.winter.particles[1]}
      snowflakeCount={snowflakeCount}
      radius={[0.8, 2.5]}
      speed={[0.35, 1.1]}
      wind={[-0.25, 0.45]}
      rotationSpeed={[-0.4, 0.4]}
      opacity={[0.35, 0.75]}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
