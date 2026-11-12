/**
 * Single source of truth for particle motion.
 *
 * Rule: sideways motion must stay well below fall speed so everything reads as
 * a slow vertical fall with a gentle sway, never a horizontal stream.
 *
 * Units differ per library, so each block notes them.
 */

/** falling-leaves: px per frame at 60fps. `wind` is constant drift, `sway` is a
 *  sideways velocity amplitude (ginkgo x2.2, birch x1.9 inside the library). */
export const LEAVES_PRIMARY_MOTION = {
  size: [14, 22],
  speed: [0.45, 0.9],
  wind: [-0.015, 0.015],
  sway: [0.05, 0.1],
  rotationSpeed: [-0.35, 0.35],
  opacity: 0.85,
} as const;

/** tsparticles leaves.
 *  NEVER use `move.drift` here: tsparticles applies it as a per-frame
 *  acceleration, so sideways speed grows without bound over time. Sway comes
 *  only from `wobble`, which is bounded. */
export const TS_LEAVES_MOTION = {
  fallSpeed: { min: 0.9, max: 1.6 },
  wobble: { distance: 26, speed: { angle: 7, move: 2 } },
  rotateSpeed: 3,
  size: { min: 7, max: 13 },
  opacity: { min: 0.65, max: 0.9 },
} as const;

/** tsparticles large background flakes (winter depth layer). Same rule: no drift. */
export const TS_FLAKES_MOTION = {
  fallSpeed: { min: 0.5, max: 1.1 },
  wobble: { distance: 14, speed: { angle: 6, move: 1.5 } },
} as const;

/** react-snowfall: px per frame at 60fps. Wind is re-picked from the range and
 *  eased, so keep it symmetric around 0 to avoid a constant sideways bias. */
export const SNOWFALL_MOTION = {
  speed: [0.35, 0.85],
  wind: [-0.1, 0.1],
  rotationSpeed: [-0.3, 0.3],
} as const;

/** seasonalfx: scales particle velocity (library range 0.1 - 3.0). */
export const SEASONALFX_SPEED_MULTIPLIER = 0.55;

/** tsparticles summer motes (warm golden dust, floats UP). No `drift` here either.
 *  The seasonalfx "sunDust" preset was nearly invisible (about 15 particles, 1-3px,
 *  10-30% white), so summer uses this layer instead. */
export const TS_SUMMER_MOTION = {
  riseSpeed: { min: 0.25, max: 0.6 },
  wobble: { distance: 12, speed: { angle: 5, move: 1.5 } },
  size: { min: 1.5, max: 4.5 },
  opacity: { min: 0.25, max: 0.75 },
  twinkleSpeed: 0.4,
} as const;
