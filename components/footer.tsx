"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function Footer() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    // Increment on first visit using sessionStorage as guard
    const alreadyCounted = sessionStorage.getItem("portfolio_counted");
    const shouldIncrement = !alreadyCounted;

    fetch(`${API_URL}/api/views${shouldIncrement ? "" : "?incr=false"}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && typeof data.views === "number") {
          setViews(data.views);
          if (shouldIncrement) {
            sessionStorage.setItem("portfolio_counted", "1");
          }
        }
      })
      .catch(() => {/* views are nice-to-have */});

    return () => { isMounted = false; };
  }, []);

  return (
    <footer className="border-t border-dashed border-border/40 py-8">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-xs text-muted-foreground/85">
          Built by{" "}
          <a
            href="https://github.com/MEHULARORA11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium transition-colors duration-200 hover:text-foreground/80"
          >
            Mehul Arora
          </a>
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
          <p>&copy; {new Date().getFullYear()} &middot; All rights reserved.</p>
          {views !== null && (
            <>
              <span>&middot;</span>
              <p>{views.toLocaleString()} views</p>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground/70">
          Source code on{" "}
          <a
            className="text-foreground font-medium link-underline"
            href="https://github.com/MEHULARORA11"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
