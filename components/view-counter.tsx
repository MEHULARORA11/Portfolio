"use client";

import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query-keys";

export function ViewCounter() {
  const { data: views, isPending: loading } = useQuery({
    queryKey: QUERY_KEYS.views,
    queryFn: async () => {
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
      return data.views as number;
    },
    staleTime: 30 * 1000, // refetch every 30 seconds
  });

  const displayViews = loading ? "..." : (views !== undefined ? views : 1).toLocaleString();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/50 backdrop-blur-md shadow-sm">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs font-mono font-medium text-foreground tabular-nums">
        {displayViews}
      </span>
    </div>
  );
}
