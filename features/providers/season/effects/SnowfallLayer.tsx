"use client";

import Snowfall from "react-snowfall";
import { SEASONS } from "../seasons";
import { applyParticleBudget, SEASON_LAYERS } from "./layers.config";
import { useDocumentVisible } from "./particlesEngine";
import { SNOWFALL_MOTION } from "./motion.config";
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
      speed={[...SNOWFALL_MOTION.speed]}
      wind={[...SNOWFALL_MOTION.wind]}
      rotationSpeed={[...SNOWFALL_MOTION.rotationSpeed]}
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
