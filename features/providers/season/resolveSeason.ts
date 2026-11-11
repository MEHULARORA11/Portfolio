import { getSeason } from "./getSeason";
import { SEASON_KEYS, type SeasonKey } from "./seasons";

function isSeasonKey(value: string | null): value is SeasonKey {
  return value !== null && (SEASON_KEYS as readonly string[]).includes(value);
}

/**
 * Resolves the active season from `?season=` query param override when valid,
 * falling back to meteorological date lookup. Safe in SSR environments.
 */
export function resolveSeason(): SeasonKey {
  if (typeof window === "undefined") {
    return getSeason();
  }

  const override = new URLSearchParams(window.location.search).get("season");
  if (isSeasonKey(override)) {
    return override;
  }

  return getSeason();
}
