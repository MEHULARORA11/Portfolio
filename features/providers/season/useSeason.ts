"use client";

import { useContext } from "react";
import { SeasonContext, type SeasonContextValue } from "./SeasonProvider";

export function useSeason(): SeasonContextValue {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeason must be used within a SeasonProvider");
  }
  return context;
}
