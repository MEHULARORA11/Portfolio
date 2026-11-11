"use client";

import { useSyncExternalStore } from "react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";

let initPromise: Promise<void> | null = null;

/**
 * Shared module-level tsParticles engine initializer.
 * Passed to ParticlesProvider (must remain referentially stable across mounts).
 */
export async function initParticlesEngine(engine: Engine): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      await loadSlim(engine);
      await loadWobbleUpdater(engine);
    })().catch((error) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}

function subscribeMediaQuery(query: string, callback: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMediaQuerySnapshot(query: string): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(query).matches;
}

export function useCoarsePointer(): boolean {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery("(pointer: coarse)", callback),
    () => getMediaQuerySnapshot("(pointer: coarse)"),
    () => false
  );
}

function subscribeVisibility(callback: () => void): () => void {
  if (typeof document === "undefined") {
    return () => {};
  }
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

function getVisibilitySnapshot(): boolean {
  if (typeof document === "undefined") {
    return true;
  }
  return document.visibilityState !== "hidden";
}

export function useDocumentVisible(): boolean {
  return useSyncExternalStore(
    subscribeVisibility,
    getVisibilitySnapshot,
    () => true
  );
}
