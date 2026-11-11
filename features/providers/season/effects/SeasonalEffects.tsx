"use client";

import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSeason } from "../useSeason";
import { SEASON_LAYERS, type SeasonalLayerId } from "./layers.config";
import { useEffectsPolicy } from "./useEffectsPolicy";

const SnowfallLayer = lazy(() => import("./SnowfallLayer"));
const TsFlakesLayer = lazy(() => import("./TsFlakesLayer"));
const SeasonalFxLayer = lazy(() => import("./SeasonalFxLayer"));
const LeavesPrimaryLayer = lazy(() => import("./LeavesPrimaryLayer"));
const TsLeavesLayer = lazy(() => import("./TsLeavesLayer"));

function renderLayer(id: SeasonalLayerId) {
  switch (id) {
    case "snowfall":
      return <SnowfallLayer />;
    case "tsparticles-flakes":
      return <TsFlakesLayer />;
    case "seasonalfx-petals":
      return <SeasonalFxLayer seasonOverride="spring" />;
    case "seasonalfx-dust":
      return <SeasonalFxLayer seasonOverride="summer" />;
    case "leaves-primary":
      return <LeavesPrimaryLayer />;
    case "tsparticles-leaves":
      return <TsLeavesLayer />;
  }
}

export function SeasonalEffects() {
  const { season } = useSeason();
  const { enabled } = useEffectsPolicy();

  if (!enabled) {
    return null;
  }

  const layers = SEASON_LAYERS[season];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-20 pointer-events-none overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={season}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            {layers.map((layer) => (
              <div key={layer.id} className="absolute inset-0">
                {renderLayer(layer.id)}
              </div>
            ))}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
