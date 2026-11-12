export type SeasonKey = "winter" | "spring" | "summer" | "autumn";

export interface SeasonConfig {
  label: string;
  months: readonly number[];
  accent: string;
  accentMuted: string;
  particles: readonly string[];
}

export const SEASONS: Record<SeasonKey, SeasonConfig> = {
  winter: {
    label: "Winter",
    months: [ 11, 0, 1],
    accent: "#9CC9E8",
    accentMuted: "#355C77",
    particles: ["#FFFFFF", "#DCEBFA", "#B9D6F2"],
  },
  spring: {
    label: "Spring",
    months: [10,2, 3, 4],
    accent: "#E7A8BC",
    accentMuted: "#6E3E4F",
    particles: ["#F6C9D6", "#E7A8BC", "#F3DDE4"],
  },
  summer: {
    label: "Summer",
    months: [5, 6, 7],
    accent: "#E8C170",
    accentMuted: "#6B5424",
    particles: ["#F2D98F", "#E8C170", "#F7EBC5"],
  },
  autumn: {
    label: "Autumn",
    months: [8, 9],
    accent: "#D9822B",
    accentMuted: "#6E3E12",
    particles: ["#D9822B", "#B5532A", "#C99A2E", "#8C3B1F"],
  },
};

export const SEASON_KEYS = Object.keys(SEASONS) as SeasonKey[];
