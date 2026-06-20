import React from "react";
import Tilt from "react-parallax-tilt";
import { Smartphone, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * Instagram Reel / Video Card utilizing vertical 9:16 dimensions,
 * 3D parallax rotations, animated gradient overlays, and magnetic hover indicators.
 */
export default function InstagramCard({
  title,
  description,
  duration,
  thumbnail,
  tags = [],
  onClick,
}) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="var(--accent-light)"
      glarePosition="all"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.03}
      transitionSpeed={1500}
      className="h-full w-full"
    >
      <div
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        role="button"
        tabIndex={0}
        className="group relative w-full h-[400px] flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-transparent backdrop-blur-md transition-all duration-500 hover:border-[var(--card-hover-border)] cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        style={{
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Animated Gradient Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-[var(--accent)] to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

        {/* Thumbnail (Tall 9:16 background) */}
        <div className="absolute inset-0 z-0">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Base Darkening Scrim Grid */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 opacity-80 group-hover:opacity-75 transition-opacity duration-300" />
        </div>

        {/* Card Header (Icon tags) */}
        <div className="relative z-10 p-5 flex items-center justify-between select-none">
          <div className="bg-[#03140e]/80 border border-[var(--card-border)] backdrop-blur-md rounded-xl p-2 text-pink-400 flex items-center justify-center shadow-lg">
            <FaInstagram className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-white/80">
            {duration}
          </span>
        </div>

        {/* Card Center (Animated Play Indicator on Hover) */}
        <div className="relative z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 scale-90 group-hover:scale-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-[var(--accent)] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-white/20"
          >
            <Smartphone className="w-6 h-6 animate-pulse" />
          </motion.div>
          <span className="text-[10px] font-mono text-pink-300 tracking-wider mt-2.5 bg-black/55 px-3 py-1 rounded-full border border-pink-500/20 backdrop-blur-md">
            VIEW REEL
          </span>
        </div>

        {/* Card Footer (Metadata and description) */}
        <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-pink-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRENDING</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
              {title}
            </h3>
            <p className="text-xs text-white/70 line-clamp-2 opacity-80">
              {description}
            </p>

            {/* Tag Badges */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5 select-none">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
}
