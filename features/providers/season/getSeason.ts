import { SEASONS, SEASON_KEYS, type SeasonKey } from "./seasons";

/**
 * Pure meteorological season lookup from a Date (month 0-11).
 */
export function getSeason(date: Date = new Date()): SeasonKey {
  const month = date.getMonth();
  for (const key of SEASON_KEYS) {
    if (SEASONS[key].months.includes(month)) {
      return key;
    }
  }
  return "winter";
}
