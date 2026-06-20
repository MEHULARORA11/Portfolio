import React from "react";
import { Play, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Highlight from "../search/Highlight";

/**
 * YouTube Card mimicking a futuristic developer media player interface.
 * Implements hover zoom, neon glows, and custom hover overlays.
 */
export default function YoutubeCard({
  title,
  description,
  duration,
  thumbnail,
  tags = [],
  onClick,
  searchQuery = "",
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition-all duration-500 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)] cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Dynamic border-accent glow on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[var(--accent)] opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-3xl pointer-events-none" />

      {/* Thumbnail / Player Preview Area */}
      <div>
        <div className="relative w-full h-48 overflow-hidden bg-black select-none">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Media Player Glass Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "var(--overlay)" }}
          >
            {/* Pulsing Play Button */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-[var(--accent)] text-[var(--button-text)] rounded-full flex items-center justify-center shadow-[0_0_25px_var(--accent-glow)] border border-[var(--accent-light)]/40"
            >
              <Play className="w-6 h-6 fill-current translate-x-[2px]" />
            </motion.div>
          </div>

          {/* Static Pill overlays */}
          <div className="absolute bottom-3 left-3 bg-[#03140e]/80 border border-[var(--card-border)] backdrop-blur-md rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-mono font-medium text-[var(--accent-light)] flex items-center gap-1.5 shadow-md">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </div>
        </div>

        {/* Video Metadata & Info */}
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl font-bold theme-text leading-tight group-hover:text-[var(--accent-light)] transition-colors duration-300 line-clamp-2">
            <Highlight text={title} query={searchQuery} className="!decoration-red-500" />
          </h3>
          <p className="text-xs sm:text-sm theme-text-secondary leading-relaxed line-clamp-2 opacity-80 mt-1">
            <Highlight text={description} query={searchQuery} className="!decoration-red-500" />
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 select-none">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-muted)] text-[var(--text-muted)]"
                >
                  <Highlight text={tag} query={searchQuery} className="!decoration-red-500" />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Futuristic status bar */}
      <div className="p-5 pt-0 mt-4 border-t theme-divider flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] opacity-60">
        <span>STATUS: READY_TO_PLAY</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </div>
    </div>
  );
}
