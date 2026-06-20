import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import YoutubeCard from "./YoutubeCard";
import ShowMoreControls from "../shared/ShowMoreControls";
import EmbedModal from "../shared/EmbedModal";
import { usePaginatedReveal } from "../../hooks/usePaginatedReveal";
import { youtubeVideos } from "../../data/portfolioData";

/**
 * YouTube Showcase Section supporting paginated card listings,
 * dynamic media playbacks, and glassmorphic visual overlays.
 */
export default function YoutubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  const {
    visibleItems,
    showMore,
    showAll,
    hasMore,
    totalCount,
    revealCount,
  } = usePaginatedReveal(youtubeVideos, 3, 4);

  return (
    <SectionContainer id="youtube">
      <SectionHeading
        title="YouTube Content"
        subtitle="Cinematic Tech Showcases & Guides"
      />

      {/* Grid wrapper */}
      <motion.div
        layout="position"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((video, index) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                delay: (index % 4) * 0.08,
              }}
              className="w-full"
            >
              <YoutubeCard {...video} onClick={() => setActiveVideo(video)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show All Controls */}
      <ShowMoreControls
        hasMore={hasMore}
        totalCount={totalCount}
        revealCount={revealCount}
        showMore={showMore}
        showAll={showAll}
      />

      {/* Embedded Iframe Modal */}
      <EmbedModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title || "Video Player"}
      >
        {activeVideo && (
          <div className="w-full h-full relative aspect-video rounded-2xl overflow-hidden border border-[var(--card-border)] bg-black shadow-2xl">
            <iframe
              src={activeVideo.videoUrl}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />
          </div>
        )}
      </EmbedModal>
    </SectionContainer>
  );
}
