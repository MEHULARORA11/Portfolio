import React, { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Blog Card featuring 3D tilt transformations, cursor tracking
 * radial glows, and tag capsules.
 */
export default function BlogCard({
  title,
  description,
  date,
  readTime,
  thumbnail,
  tags = [],
  onClick,
}) {
  const cardRef = useRef(null);

  // Spotlight coordinates interpolation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.12}
      glareColor="var(--accent-light)"
      glarePosition="all"
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={1200}
      className="h-full w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        role="button"
        tabIndex={0}
        className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-5 transition-all duration-500 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)] cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        style={{
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Spotlight Follower Layer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--accent-glow-soft), transparent 80%)`,
          }}
        />

        {/* Thumbnail & Badges */}
        <div>
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[var(--card-border)] group-hover:border-[var(--card-hover-border)] transition-colors duration-300 bg-[#02100a]">
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Visual Glass Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-gradient)]/80 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 bg-[#03140e]/70 border border-[var(--card-border)] backdrop-blur-md rounded-xl p-2 text-[var(--accent-light)] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          {/* Heading metadata */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] select-none">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[var(--accent-light)]" />
                {date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[var(--accent-light)]" />
                {readTime}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold theme-text tracking-tight group-hover:text-[var(--accent-light)] transition-colors duration-300 line-clamp-2 mt-1">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm theme-text-secondary leading-relaxed line-clamp-2 opacity-80 mt-2">
            {description}
          </p>

          {/* Skills Badges */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 select-none">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md border theme-text-muted bg-[var(--accent-muted)] border-[var(--accent-border)] transition-all duration-300 hover:border-[var(--accent-light)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Read Post indicator bar */}
        <div className="mt-6 pt-4 border-t theme-divider flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] opacity-60">
          <span>READ_ARTICLE &rarr;</span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform duration-300" />
        </div>
      </div>
    </Tilt>
  );
}
