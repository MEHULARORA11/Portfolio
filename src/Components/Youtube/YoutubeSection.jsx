/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import YoutubeCard from "./YoutubeCard";
import ShowMoreControls from "../shared/ShowMoreControls";
import EmbedModal from "../shared/EmbedModal";
import { usePaginatedReveal } from "../../hooks/usePaginatedReveal";
import { youtubeVideos } from "../../data/portfolioData";
import { useSearch } from "../../hooks/useSearch";
import YoutubeSearchBar from "../search/YoutubeSearchBar";
import EmptyState from "../search/EmptyState";
import ComingSoon from "../shared/ComingSoon";
import { Video } from "lucide-react";

/**
 * YouTube Showcase Section supporting paginated card listings,
 * dynamic media playbacks, and glassmorphic visual overlays.
 */
export default function YoutubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  const { searchQuery, setSearchQuery, filteredItems, clearSearch } = useSearch(youtubeVideos || [], {
    keys: ["title", "description", "tags"],
  });

  const {
    visibleItems,
    showMore,
    showAll,
    hasMore,
    totalCount,
    revealCount,
    resetReveal,
  } = usePaginatedReveal(filteredItems || [], 3, 4);

  // Reset pagination reveal count when search query changes
  React.useEffect(() => {
    resetReveal();
  }, [searchQuery, resetReveal]);

  if (!youtubeVideos || youtubeVideos.length === 0) {
    return (
      <SectionContainer id="videos">
        <SectionHeading
          title="YouTube Content"
          subtitle="Cinematic Tech Showcases & Guides"
        />
        <ComingSoon
          title="Videos"
          subtitle="I am currently producing new high-quality technical video deep dives. New guides will stream shortly."
          Icon={Video}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="videos">
      <SectionHeading
        title="YouTube Content"
        subtitle="Cinematic Tech Showcases & Guides"
      />

      <YoutubeSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={clearSearch}
        onTagClick={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <EmptyState
            key="empty-youtube"
            onReset={clearSearch}
            message={`No videos found matching "${searchQuery}".`}
          />
        ) : (
          <motion.div
            key="youtube-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Grid wrapper */}
            <motion.div
              layout="position"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
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
                    <YoutubeCard
                      {...video}
                      onClick={() => setActiveVideo(video)}
                      searchQuery={searchQuery}
                    />
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
              onHide={resetReveal}
            />
          </motion.div>
        )}
      </AnimatePresence>

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

