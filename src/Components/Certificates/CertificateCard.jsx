import React, { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { ExternalLink, Award } from "lucide-react";
import { motion } from "framer-motion";
import Highlight from "../search/Highlight";

/**
 * Certificate Card rendering a high-performance 3D parallax tilt,
 * custom hover border gradients, and a mouse-tracking spotlight glow.
 */
export default function CertificateCard({
  title,
  issuer,
  date,
  tags = [],
  thumbnail,
  credentialLink,
  searchQuery = "",
}) {
  const cardRef = useRef(null);

  // Spotlights tracking mouse position
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
        className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-5 transition-colors duration-500 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)]"
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

        {/* Thumbnail Layer */}
        <div>
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[var(--card-border)] group-hover:border-[var(--card-hover-border)] transition-colors duration-300 bg-[#02100a]">
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Visual Glass Tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-gradient)]/80 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 bg-[#03140e]/70 border border-[var(--card-border)] backdrop-blur-md rounded-xl p-2 text-[var(--accent-light)] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Heading Metadata */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] select-none">
              <Highlight text={issuer} query={searchQuery} /> &bull; {date}
            </span>
            <h3 className="text-lg sm:text-xl font-bold theme-text tracking-tight group-hover:text-[var(--accent-light)] transition-colors duration-300 line-clamp-2">
              <Highlight text={title} query={searchQuery} />
            </h3>
          </div>

          {/* Skills Badges */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 select-none">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border theme-text-muted bg-[var(--accent-muted)] border-[var(--accent-border)] transition-all duration-300 hover:border-[var(--accent-light)]"
                >
                  <Highlight text={tag} query={searchQuery} />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        {credentialLink && (
          <div className="mt-6 pt-4 border-t theme-divider flex justify-end">
            <motion.a
              href={credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold py-1.5 px-4 rounded-xl border border-[var(--accent-border)] text-[var(--accent-light)] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--button-text)] hover:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-300"
            >
              Verify Credential
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        )}
      </div>
    </Tilt>
  );
}
