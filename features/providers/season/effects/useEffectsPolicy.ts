"use client";

import { useSyncExternalStore } from "react";

export interface EffectsPolicy {
  enabled: boolean;
  budget: number;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const COARSE_POINTER_QUERY = "(pointer: coarse)";
const MOBILE_VIEWPORT_MAX_WIDTH = 768;
const LOW_CONCURRENCY_MAX_CORES = 4;

const SERVER_POLICY: EffectsPolicy = {
  enabled: false,
  budget: 1,
};

let cachedPolicy: EffectsPolicy = SERVER_POLICY;

function readPolicySnapshot(): EffectsPolicy {
  if (typeof window === "undefined") {
    return SERVER_POLICY;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const effectsDisabledByQuery = searchParams.get("effects") === "off";

  const prefersReducedMotion =
    typeof window.matchMedia === "function"
      ? window.matchMedia(REDUCED_MOTION_QUERY).matches
      : false;

  const enabled = !effectsDisabledByQuery && !prefersReducedMotion;

  const isCoarsePointer =
    typeof window.matchMedia === "function"
      ? window.matchMedia(COARSE_POINTER_QUERY).matches
      : false;
  const isSmallViewport = window.innerWidth <= MOBILE_VIEWPORT_MAX_WIDTH;
  const isLowConcurrency =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= LOW_CONCURRENCY_MAX_CORES;

  let budget = 1;
  if (isCoarsePointer || isSmallViewport) {
    budget = 0.4;
  } else if (isLowConcurrency) {
    budget = 0.7;
  }

  if (cachedPolicy.enabled === enabled && cachedPolicy.budget === budget) {
    return cachedPolicy;
  }

  cachedPolicy = { enabled, budget };
  return cachedPolicy;
}

function subscribePolicy(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const reducedMotionMql =
    typeof window.matchMedia === "function"
      ? window.matchMedia(REDUCED_MOTION_QUERY)
      : null;
  const coarsePointerMql =
    typeof window.matchMedia === "function"
      ? window.matchMedia(COARSE_POINTER_QUERY)
      : null;

  reducedMotionMql?.addEventListener("change", callback);
  coarsePointerMql?.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  window.addEventListener("popstate", callback);

  return () => {
    reducedMotionMql?.removeEventListener("change", callback);
    coarsePointerMql?.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
    window.removeEventListener("popstate", callback);
  };
}

export function useEffectsPolicy(): EffectsPolicy {
  return useSyncExternalStore(
    subscribePolicy,
    readPolicySnapshot,
    () => SERVER_POLICY
  );
}
