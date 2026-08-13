"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { GITHUB_USERNAME } from "@/lib/data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CELL_SIZE = 13;
const CELL_GAP = 3;
const CELL_RADIUS = 3;
const DAY_COL_WIDTH = 28;

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  weekday: number;
}

interface Week {
  days: Day[];
}

interface ContribData {
  totalContributions: number;
  weeks: Week[];
}

function getCellStyle(level: number): React.CSSProperties {
  switch (level) {
    case 1: return { background: "var(--contrib-1)" };
    case 2: return { background: "var(--contrib-2)" };
    case 3: return { background: "var(--contrib-3)" };
    case 4: return { background: "var(--contrib-4)", boxShadow: "0 0 6px var(--contrib-4)" };
    default: return { background: "var(--contrib-0)" };
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

export function GitHubGraph() {
  const [data, setData] = useState<ContribData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<Day | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;
    fetch(`${API_URL}/api/github-contributions`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (mounted && !d.error && d.weeks) {
          setData(d);
        } else if (mounted) {
          setError(true);
        }
      })
      .catch(() => { if (mounted) setError(true); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const currentStreak = useMemo(() => {
    if (!data?.weeks) return 0;
    const allDays = data.weeks.flatMap((w) => w.days).reverse();
    let streak = 0;
    for (const day of allDays) {
      if (day.count > 0) streak++;
      else break;
    }
    return streak;
  }, [data]);

  const bestStreak = useMemo(() => {
    if (!data?.weeks) return 0;
    const allDays = data.weeks.flatMap((w) => w.days);
    let best = 0, current = 0;
    for (const day of allDays) {
      if (day.count > 0) { current++; if (current > best) best = current; }
      else current = 0;
    }
    return best;
  }, [data]);

  const monthHeaders = useMemo(() => {
    const headers: { weekIdx: number; monthName: string }[] = [];
    let lastMonth = -1;
    data?.weeks?.forEach((week, weekIdx) => {
      const firstDay = week.days?.[0];
      if (firstDay?.date) {
        const monthIdx = new Date(firstDay.date).getMonth();
        if (monthIdx !== lastMonth) {
          headers.push({ weekIdx, monthName: MONTH_NAMES[monthIdx] });
          lastMonth = monthIdx;
        }
      }
    });
    return headers;
  }, [data]);

  if (loading) {
    return (
      <section className="space-y-4">
        <div>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
      </section>
    );
  }

  if (error || !data?.weeks) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">GitHub Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">Contribution data unavailable.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            Could not load contributions. Make sure the API is running on {API_URL}.
          </p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-foreground/70 transition-colors"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">GitHub Activity</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {data.totalContributions.toLocaleString()} contributions in the past year.
        </p>
      </motion.div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 overflow-hidden">
        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-5 mb-5 pb-4 border-b border-border">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground tabular-nums">
              {data.totalContributions.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
              contributions
            </span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground tabular-nums">{currentStreak}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
              current streak
            </span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground tabular-nums">{bestStreak}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
              best streak
            </span>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground ml-auto">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                style={{ ...getCellStyle(lvl), width: 10, height: 10, borderRadius: 2 }}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Tooltip bar */}
        <div className="h-5 mb-3 flex items-center">
          {tooltip ? (
            <motion.span
              key={tooltip.date}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-foreground"
            >
              <span className="font-semibold">
                {tooltip.count === 0 ? "No contributions" : `${tooltip.count} contribution${tooltip.count === 1 ? "" : "s"}`}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{formatDate(tooltip.date)}</span>
            </motion.span>
          ) : (
            <span className="text-[10px] font-mono text-muted-foreground/40 select-none">
              Hover a cell to inspect
            </span>
          )}
        </div>

        {/* Grid */}
        <div className="w-full overflow-x-auto">
          <div className="flex justify-start">
            <div>
              {/* Month labels */}
              <div className="flex mb-1" style={{ paddingLeft: DAY_COL_WIDTH + CELL_GAP }}>
                {data.weeks.map((_, weekIdx) => {
                  const header = monthHeaders.find((h) => h.weekIdx === weekIdx);
                  return (
                    <div
                      key={weekIdx}
                      style={{ width: CELL_SIZE, marginRight: CELL_GAP, flexShrink: 0 }}
                      className="text-[9px] font-mono text-muted-foreground overflow-visible whitespace-nowrap"
                    >
                      {header ? header.monthName : ""}
                    </div>
                  );
                })}
              </div>

              {/* Day labels + weeks */}
              <div className="flex items-start" style={{ gap: CELL_GAP }}>
                {/* Weekday labels */}
                <div
                  className="flex flex-col shrink-0"
                  style={{ gap: CELL_GAP, paddingTop: 1, width: DAY_COL_WIDTH }}
                >
                  {WEEKDAY_SHORT.map((label, idx) => (
                    <div
                      key={label}
                      className="font-mono text-[9px] text-muted-foreground flex items-center justify-end"
                      style={{ height: CELL_SIZE, paddingRight: 4, opacity: idx % 2 === 1 ? 1 : 0 }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Week columns */}
                {data.weeks.map((week, weekIdx) => (
                  <motion.div
                    key={weekIdx}
                    className="flex flex-col"
                    style={{ gap: CELL_GAP }}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: shouldReduceMotion ? 0 : Math.min(weekIdx * 0.006, 0.3),
                    }}
                  >
                    {week.days.map((day) => (
                      <div
                        key={day.date}
                        style={{
                          ...getCellStyle(day.level),
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          borderRadius: CELL_RADIUS,
                          cursor: "pointer",
                          flexShrink: 0,
                          transition: "transform 0.1s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.4)";
                          setTooltip(day);
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                          setTooltip(null);
                        }}
                      />
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-end">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {GITHUB_USERNAME}
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </section>
  );
}
