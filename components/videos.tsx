"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { youtubeVideos } from "@/lib/data";

export function Videos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="videos" className="pt-24 pb-12 border-t border-border/15">
      <FadeIn>
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            Content
          </h2>
          <p className="text-muted-foreground max-w-lg text-lg">
            I occasionally share deep dives into software engineering, architecture, and building AI agents.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {youtubeVideos.map((video, idx) => (
          <FadeIn key={video.id} delay={idx * 100}>
            <div className="group cursor-pointer space-y-4" onClick={() => setActiveVideo(video.videoUrl)}>
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded-md text-[10px] font-mono font-medium text-white">
                  {video.duration}
                </div>

                {/* Hover Play Overlay (Frosted Glass) */}
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-foreground/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 delay-75 shadow-xl">
                    <Play className="w-6 h-6 text-background ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Video Info (Outside the box) */}
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex gap-2 mt-3">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/80">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-border animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              src={`${activeVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}
