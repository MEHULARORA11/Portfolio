"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Clock, X, ExternalLink } from "lucide-react";
import { youtubeVideos, type Video } from "@/lib/data";

/* ── YouTube icon ───────────────────────────────────── */
function YouTubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ── Video Modal ────────────────────────────────────── */
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
          >
            <X size={14} />
            Close
          </button>

          {/* Embedded player */}
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/40 shadow-2xl bg-black">
            <iframe
              src={`${video.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>

          {/* Meta below player */}
          <div className="mt-4 px-1">
            <h3 className="font-semibold text-white text-base leading-snug">{video.title}</h3>
            <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{video.description}</p>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
                >
                  {tag}
                </span>
              ))}
              <a
                href={video.videoUrl.replace("/embed/", "/watch?v=")}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                Watch on YouTube
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Video Card ─────────────────────────────────────── */
function VideoCard({ video, index, onPlay }: { video: Video; index: number; onPlay: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card cursor-pointer transition-all duration-300 hover:border-border/70 hover:shadow-md dark:hover:shadow-black/20"
      onClick={onPlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPlay()}
      aria-label={`Play video: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* YouTube brand badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-white/15 bg-black/50 px-2 py-0.5 backdrop-blur-sm">
          <YouTubeIcon size={11} />
          <span className="text-[10px] font-semibold text-white/90">YouTube</span>
        </div>

        {/* Duration badge */}
        <div className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-0.5 backdrop-blur-sm border border-white/10">
          <Clock size={9} className="text-white/70" />
          <span className="text-[10px] font-mono font-semibold text-white/90">{video.duration}</span>
        </div>

        {/* Play button — animated on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
              <Play size={16} className="ml-0.5 text-black fill-black" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-foreground/90 transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {video.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {video.tags.length > 3 && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{video.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Videos section ─────────────────────────────────── */
export function Videos() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  if (youtubeVideos.length === 0) return null;

  return (
    <>
      {/* Video modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <section id="videos" className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Videos</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Stuff I&apos;ve recorded and published.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@mehularora"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-foreground/20 hover:bg-muted active:scale-95"
            >
              <YouTubeIcon size={13} />
              Subscribe
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {youtubeVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onPlay={() => setActiveVideo(video)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
