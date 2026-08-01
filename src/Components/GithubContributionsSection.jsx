import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink, FiGitCommit } from "react-icons/fi";
import SectionHeading from "./shared/SectionHeading";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Cell size and gap constants — adjust here to resize the whole grid uniformly
const CELL_SIZE = 16;
const CELL_GAP = 3;
const CELL_RADIUS = 4;

/**
 * Real-Time GitHub Contribution Graph Component
 * Fetches contribution data from backend /api/github-contributions.
 * Colors driven entirely by CSS custom properties — works in both themes.
 */
const GithubContributionsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const BASE_URL = import.meta.env.VITE_CLIENT_URL;

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      const endpoints = [
        BASE_URL ? `${BASE_URL}/api/github-contributions` : null,
        "http://localhost:4000/api/github-contributions",
        "http://localhost/api/github-contributions",
        "/api/github-contributions",
      ].filter(Boolean);

      let successData = null;

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, { cache: "no-store" });
          if (res.ok) {
            const json = await res.json();
            if (!json.error) {
              successData = json;
              break;
            }
          }
        } catch {
          // try next endpoint
        }
      }

      if (isMounted) {
        if (successData) setData(successData);
        else setError(true);
        setLoading(false);
      }
    }

    fetchContributions();
    return () => { isMounted = false; };
  }, [BASE_URL]);

  // --- Derived stats ---
  const currentStreak = React.useMemo(() => {
    if (!data?.weeks) return 0;
    const allDays = data.weeks.flatMap(w => w.days).reverse();
    let streak = 0;
    for (const day of allDays) {
      if (day.count > 0) streak++;
      else break;
    }
    return streak;
  }, [data]);

  const bestStreak = React.useMemo(() => {
    if (!data?.weeks) return 0;
    const allDays = data.weeks.flatMap(w => w.days);
    let best = 0;
    let current = 0;
    for (const day of allDays) {
      if (day.count > 0) {
        current++;
        if (current > best) best = current;
      } else {
        current = 0;
      }
    }
    return best;
  }, [data]);

  const mostActiveDay = React.useMemo(() => {
    if (!data?.weeks) return null;
    return data.weeks
      .flatMap(w => w.days)
      .reduce((best, d) => (!best || d.count > best.count ? d : best), null);
  }, [data]);

  // --- Month label positions ---
  const monthHeaders = React.useMemo(() => {
    const headers = [];
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

  // --- Level → inline style ---
  const getCellStyle = (level) => {
    switch (level) {
      case 0:
        return { background: "var(--cell-empty)", border: "1px solid var(--cell-empty-border)" };
      case 1:
        return { background: "var(--accent-muted)", border: "1px solid var(--accent-border)" };
      case 2:
        return { background: "var(--cell-l2)", border: "1px solid var(--accent-border)" };
      case 3:
        return { background: "var(--accent)", border: "1px solid var(--accent-light)", opacity: 0.85 };
      case 4:
        return { background: "var(--accent-light)", border: "1px solid var(--accent-light)", boxShadow: "0 0 7px var(--accent-glow)" };
      default:
        return {};
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric",
    });
  };

  // Day-label column width: text width + right padding
  const DAY_COL_WIDTH = 30;

  return (
    <div data-aos="fade-right" className="mb-20 lg:mb-36 w-full text-left">
      {/* Scoped CSS vars for cell colors */}
      <style>{`
        .gh-graph-root {
          --cell-empty: rgba(255,255,255,0.05);
          --cell-empty-border: rgba(99,102,241,0.15);
          --cell-l2: rgba(99,102,241,0.42);
        }
        [data-theme="light"] .gh-graph-root {
          --cell-empty: rgba(99,102,241,0.06);
          --cell-empty-border: rgba(99,102,241,0.18);
          --cell-l2: rgba(79,70,229,0.38);
        }
      `}</style>

      <SectionHeading title="GitHub Activity" />

      {loading ? (
        <div className="w-full glass-card rounded-[32px] animate-pulse bg-[var(--card-bg)] border-[var(--card-border)] h-72" />
      ) : error || !data?.weeks ? (
        <div className="glass-card p-8 lg:p-10 rounded-[32px] border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col sm:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-2xl theme-icon-box flex items-center justify-center text-2xl shrink-0">
            <AiFillGithub />
          </div>
          <div className="flex-1">
            <p className="font-semibold theme-text">Contribution data temporarily unavailable</p>
            <p className="text-sm theme-text-muted mt-1">The GitHub token may not be configured yet.</p>
          </div>
          <a
            href="https://github.com/MEHULARORA11"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-icon-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm active:scale-95"
          >
            View on GitHub <FiExternalLink />
          </a>
        </div>
      ) : (
        <div className="gh-graph-root glass-card p-6 sm:p-8 lg:p-10 rounded-[32px] border-[var(--card-border)] bg-[var(--card-bg)] relative overflow-hidden group">


          {/* ── Stats row ── */}
          <div className="flex flex-wrap items-start gap-6 mb-8 pb-7 border-b theme-divider">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black gradient-text leading-none tabular-nums">
                  {data.totalContributions.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--accent-light)] mt-1">
                contributions · past year
              </span>
            </div>

            <div className="hidden sm:block w-px self-stretch bg-[var(--divider)]" />

            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-black theme-text tabular-nums">{currentStreak}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] theme-text-muted">current streak</span>
            </div>

            <div className="hidden sm:block w-px self-stretch bg-[var(--divider)]" />

            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-black theme-text tabular-nums">{bestStreak}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] theme-text-muted">best streak</span>
            </div>

            {mostActiveDay && mostActiveDay.count > 0 && (
              <>
                <div className="hidden sm:block w-px self-stretch bg-[var(--divider)]" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <FiGitCommit className="text-[var(--accent)] text-sm" />
                    <span className="text-2xl font-black theme-text tabular-nums">{mostActiveDay.count}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] theme-text-muted">
                    best · {formatDate(mostActiveDay.date)}
                  </span>
                </div>
              </>
            )}

            {/* Legend */}
            <div className="flex items-center gap-2 text-[10px] font-mono theme-text-muted ml-auto self-end pb-0.5">
              <span>Less</span>
              <div className="flex gap-[3px] items-center">
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div key={lvl} style={{ ...getCellStyle(lvl), width: 11, height: 11, borderRadius: 3 }} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* ── Tooltip bar ── */}
          <div className="h-6 mb-4 flex items-center">
            {tooltip?.day ? (
              <motion.span
                key={tooltip.day.date}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12 }}
                className="inline-flex items-center gap-2 theme-badge px-3 py-0.5 rounded-lg text-[11px] font-mono"
              >
                <span className="font-bold text-[var(--accent-light)]">
                  {tooltip.day.count === 0 ? "No contributions" : `${tooltip.day.count} contribution${tooltip.day.count === 1 ? "" : "s"}`}
                </span>
                <span className="opacity-40">·</span>
                <span className="theme-text-secondary">{formatDate(tooltip.day.date)}</span>
              </motion.span>
            ) : (
              <span className="text-[10px] font-mono theme-text-muted opacity-40 select-none">
                Hover a square to inspect
              </span>
            )}
          </div>

          {/* ── Heatmap grid — centred, scrollable on small screens ── */}
          <div className="w-full overflow-x-auto scroll-hide py-2">
            <div className="flex justify-center">
              <div>

                {/* Month labels row */}
                <div className="flex mb-[5px]" style={{ paddingLeft: DAY_COL_WIDTH + CELL_GAP }}>
                  {data.weeks.map((_, weekIdx) => {
                    const header = monthHeaders.find(h => h.weekIdx === weekIdx);
                    return (
                      <div
                        key={weekIdx}
                        style={{ width: CELL_SIZE, marginRight: CELL_GAP, flexShrink: 0 }}
                        className="text-[9px] font-mono text-[var(--accent-light)] font-semibold overflow-visible whitespace-nowrap"
                      >
                        {header ? header.monthName : ""}
                      </div>
                    );
                  })}
                </div>

                {/* Day labels + week columns */}
                <div className="flex items-start" style={{ gap: CELL_GAP }}>

                  {/* Day-of-week label column */}
                  <div
                    className="flex flex-col shrink-0"
                    style={{ gap: CELL_GAP, paddingTop: 1, width: DAY_COL_WIDTH }}
                  >
                    {WEEKDAY_SHORT.map((label, idx) => (
                      <div
                        key={label}
                        className="font-mono text-[9px] theme-text-muted flex items-center justify-end"
                        style={{ height: CELL_SIZE, paddingRight: 5, opacity: idx % 2 === 1 ? 1 : 0 }}
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
                        delay: shouldReduceMotion ? 0 : Math.min(weekIdx * 0.008, 0.35),
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
                            transition: "transform 0.1s ease, box-shadow 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.4)";
                            e.currentTarget.style.zIndex = "10";
                            if (day.level === 4) {
                              e.currentTarget.style.boxShadow = "0 0 10px var(--accent-glow)";
                            }
                            setTooltip({ day });
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.zIndex = "auto";
                            e.currentTarget.style.boxShadow = getCellStyle(day.level).boxShadow || "none";
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

          {/* ── Footer ── */}
          <div className="mt-6 pt-5 border-t theme-divider flex items-center justify-end gap-4">
            <a
              href="https://github.com/MEHULARORA11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-mono font-semibold text-[var(--accent-light)] hover:text-[var(--highlight-text)] transition-colors duration-200 group/link"
            >
              <AiFillGithub className="text-base" />
              <span className="underline underline-offset-4 decoration-[var(--accent-border)] group-hover/link:decoration-[var(--accent-light)]">
                MEHULARORA11
              </span>
              <FiExternalLink className="text-xs opacity-60" />
            </a>
          </div>

        </div>
      )}
    </div>
  );
};

export default GithubContributionsSection;
