"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;

    async function fetchViews() {
      try {
        // 1. Check sessionStorage — only increment on the FIRST load of this browser session
        const hasIncremented = sessionStorage.getItem("viewedThisSession");
        const incrParam = hasIncremented ? "false" : "true";

        // 2. Set it immediately so reloads never increment again
        sessionStorage.setItem("viewedThisSession", "true");

        // 3. Force fetch to bypass browser cache
        const res = await fetch(`/api/views?incr=${incrParam}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch views");

        const data = await res.json();
        if (mounted) {
          setViews(data.views);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching visitor counter:", err);
        // If everything fails, show at least a baseline so it's never stuck at '...'
        if (mounted) {
          setViews(1);
          setLoading(false);
        }
      }
    }

    fetchViews();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/50 backdrop-blur-md shadow-sm">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs font-mono font-medium text-foreground tabular-nums">
        {loading ? "..." : views !== null ? views.toLocaleString() : "..."}
      </span>
    </div>
  );
}
