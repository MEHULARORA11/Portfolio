import React from "react";
import { ExternalLink } from "lucide-react";
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
  return (
    <div
      className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-5 transition-all duration-300 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)] hover:-translate-y-1"
      style={{ boxShadow: "var(--card-shadow)" }}
    >

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
                  className="text-[10px] sm:text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border theme-text-muted bg-[var(--accent-muted)] border-[var(--accent-border)] transition-all duration-300 hover:border-[var(--accent-light)]"
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
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold py-1.5 px-4 rounded-xl border border-[var(--accent-border)] text-[var(--accent-light)] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--button-text)] transition-all duration-300"
            >
              Verify Credential
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        )}
    </div>
  );
}
