"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchViews = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/views", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch views");
        const data = await res.json();
        if (mounted && data.views !== undefined) {
          setViews(data.views);
        }
      } catch (err) {
        console.error("Failed to fetch views:", err);
        // Fallback for when backend is off
        if (mounted) setViews(1337); 
      }
    };
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
        {views !== null ? views.toLocaleString() : "..."}
      </span>
    </div>
  );
}
