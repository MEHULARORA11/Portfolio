import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import AOS from "aos";
import SectionHeading from "./shared/SectionHeading";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Real-Time GitHub Contribution Graph Component
 * Fetches contribution activity from backend /api/github-contributions and renders
 * a theme-matched heatmap grid driven by CSS custom properties.
 */
const GithubContributionsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
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
          const res = await fetch(endpoint);
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
        if (successData) {
          setData(successData);
        } else {
          setError(true);
        }
        setLoading(false);
        setTimeout(() => {
          AOS.refresh();
        }, 150);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [BASE_URL]);

  // Loading skeleton matching sibling sections
  if (loading) {
    return (
      <div className="h-64 w-full glass-card rounded-[32px] animate-pulse mb-20 lg:mb-36 bg-[var(--card-bg)] border-[var(--card-border)]" />
    );
  }

  // Graceful fallback if data failed or token/API error occurred
  if (error || !data || !data.weeks) {
    return (
      <div data-aos="fade-right" className="mb-20 lg:mb-36 w-full text-left">
        <SectionHeading title="Live Contribution Activity" subtitle="Straight From GitHub" />
        
        <div className="glass-card p-8 lg:p-10 rounded-[32px] border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl theme-icon-box flex items-center justify-center text-3xl shrink-0">
              <AiFillGithub />
            </div>
            <div>
              <h3 className="text-xl font-bold theme-text">GitHub Activity Stream</h3>
              <p className="theme-text-muted text-sm mt-1">
                Contribution data temporarily unavailable.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/MEHULARORA11"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-btn flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm shrink-0 active:scale-95 hover:shadow-[0_0_20px_var(--accent-glow)]"
          >
            <span>Visit GitHub Profile</span>
            <FiExternalLink className="text-base" />
          </a>
        </div>
      </div>
    );
  }

  // Compute Month Labels header row based on dates in weeks
  const monthHeaders = [];
  let lastMonth = -1;

  data.weeks.forEach((week, weekIdx) => {
    const firstDay = week.days && week.days[0];
    if (firstDay && firstDay.date) {
      const dateObj = new Date(firstDay.date);
      const monthIdx = dateObj.getMonth();
      if (monthIdx !== lastMonth) {
        monthHeaders.push({ weekIdx, monthName: MONTH_NAMES[monthIdx] });
        lastMonth = monthIdx;
      }
    }
  });

  // Level intensity CSS class mappings driven by CSS variables
  const getLevelStyle = (level) => {
    switch (level) {
      case 1:
        return "bg-[var(--accent-muted)] border border-[var(--accent-border)]/40";
      case 2:
        return "bg-[var(--accent)]/35 border border-[var(--accent-border)]";
      case 3:
        return "bg-[var(--accent)] border border-[var(--accent-light)]/40 shadow-[0_0_5px_var(--accent-glow-soft)]";
      case 4:
        return "bg-[var(--accent-light)] border border-[var(--accent-light)] shadow-[0_0_9px_var(--accent-glow)]";
      case 0:
      default:
        return "bg-[var(--card-border)]/50 border border-transparent";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div data-aos="fade-right" className="mb-20 lg:mb-36 w-full text-left">
      <SectionHeading title="Live Contribution Activity" subtitle="Straight From GitHub" />

      <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-[32px] border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl relative overflow-hidden group">
        
        {/* Top-Right Micro-Label */}
        <div className="absolute top-6 right-8 font-mono text-[9.5px] sm:text-[10.5px] text-[var(--accent-light)] opacity-60 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-[0.2em] font-semibold hidden sm:block">
          GH // CONTRIB_STREAM
        </div>

        {/* Card Header: Total Contributions & Stat Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b theme-divider">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text leading-none">
                {data.totalContributions}
              </span>
              <span className="text-sm sm:text-base font-bold theme-text-secondary">
                contributions
              </span>
            </div>
            <p className="theme-text-label font-mono text-xs uppercase tracking-wider font-semibold mt-2">
              Contributions Past Year
            </p>
          </div>

          {/* Intensity Legend */}
          <div className="flex items-center gap-2 text-xs theme-text-muted font-mono self-start sm:self-end">
            <span>Less</span>
            <div className="flex gap-1 items-center">
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className={`w-3 h-3 rounded-[3px] ${getLevelStyle(lvl)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Floating Tooltip Display */}
        <div className="h-7 mb-3 flex items-center">
          {hoveredDay ? (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl font-mono text-xs font-semibold theme-badge shadow-md"
            >
              <span className="text-[var(--accent-light)] font-bold">
                {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"}
              </span>
              <span className="opacity-50">•</span>
              <span className="theme-text-secondary">{formatDate(hoveredDay.date)}</span>
            </motion.div>
          ) : (
            <span className="text-xs font-mono theme-text-muted opacity-50 select-none">
              Hover over squares for details
            </span>
          )}
        </div>

        {/* Grid Scroll Container */}
        <div className="w-full overflow-x-auto scroll-hide pb-2 pt-1 select-none">
          <div className="min-w-max flex flex-col gap-1.5">

            {/* Month Labels Header Row */}
            <div className="flex text-[10px] font-mono text-[var(--text-muted)] h-4 relative mb-1">
              <div className="w-8 shrink-0" /> {/* Spacer for day labels column */}
              <div className="flex gap-1.5 relative">
                {data.weeks.map((_, weekIdx) => {
                  const header = monthHeaders.find((h) => h.weekIdx === weekIdx);
                  return (
                    <div key={weekIdx} className="w-3.5 sm:w-4 shrink-0 text-left">
                      {header ? (
                        <span className="font-semibold text-[var(--accent-light)]">
                          {header.monthName}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Calendar Matrix: Day Labels + Week Columns */}
            <div className="flex gap-2 items-start">

              {/* Day Labels Column (Mon, Wed, Fri) */}
              <div className="flex flex-col gap-1.5 text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] shrink-0 pt-[2px]">
                {DAY_LABELS.map((dayLabel, idx) => (
                  <div key={dayLabel} className="h-3.5 sm:h-4 flex items-center justify-end pr-1 w-7">
                    {idx % 2 === 1 ? dayLabel : ""}
                  </div>
                ))}
              </div>

              {/* Week Columns */}
              <div className="flex gap-1.5">
                {data.weeks.map((week, weekIdx) => (
                  <motion.div
                    key={weekIdx}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.25,
                      delay: shouldReduceMotion ? 0 : Math.min(weekIdx * 0.012, 0.5),
                      ease: "easeOut",
                    }}
                    className="flex flex-col gap-1.5"
                  >
                    {week.days.map((day) => (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] sm:rounded-[4px] ${getLevelStyle(
                          day.level
                        )} transition-all duration-150 hover:scale-125 hover:z-20 cursor-pointer`}
                      />
                    ))}
                  </motion.div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default GithubContributionsSection;
