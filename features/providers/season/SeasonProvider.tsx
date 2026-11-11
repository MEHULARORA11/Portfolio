"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { resolveSeason } from "./resolveSeason";
import { SEASONS, type SeasonConfig, type SeasonKey } from "./seasons";

export interface SeasonContextValue {
  season: SeasonKey;
  config: SeasonConfig;
}

export const SeasonContext = createContext<SeasonContextValue | null>(null);

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<SeasonKey>(() => resolveSeason());

  useEffect(() => {
    const syncSeason = () => {
      const next = resolveSeason();
      setSeason((prev) => (prev === next ? prev : next));
    };

    syncSeason();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncSeason();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.season = season;
    return () => {
      delete document.documentElement.dataset.season;
    };
  }, [season]);

  const value = useMemo<SeasonContextValue>(
    () => ({
      season,
      config: SEASONS[season],
    }),
    [season]
  );

  return (
    <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>
  );
}
