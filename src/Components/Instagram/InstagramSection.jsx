import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import InstagramCard from "./InstagramCard";
import ShowMoreControls from "../shared/ShowMoreControls";
import EmbedModal from "../shared/EmbedModal";
import GlowButton from "../shared/GlowButton";
import { usePaginatedReveal } from "../../hooks/usePaginatedReveal";
import { instagramReels } from "../../data/portfolioData";
import { useSearch } from "../../hooks/useSearch";
import InstagramSearchBar from "../search/InstagramSearchBar";
import EmptyState from "../search/EmptyState";

/**
 * Instagram Reels showcase section. Leverages responsive grids,
 * custom pagination controls, and mobile device simulator embeds.
 */
export default function InstagramSection() {
  const [activeReel, setActiveReel] = useState(null);

  const { searchQuery, setSearchQuery, filteredItems, clearSearch } = useSearch(instagramReels, {
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
  } = usePaginatedReveal(filteredItems, 3, 4);

  // Reset pagination reveal count when search query changes
  React.useEffect(() => {
    resetReveal();
  }, [searchQuery, resetReveal]);

  return (
    <SectionContainer id="instagram">
      <SectionHeading
        title="Instagram Reels"
        subtitle="Short Dev Tips & Hacks"
      />

      <InstagramSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={clearSearch}
        onTagClick={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <EmptyState
            key="empty-instagram"
            onReset={clearSearch}
            message={`No reels found matching "${searchQuery}".`}
          />
        ) : (
          <motion.div
            key="instagram-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Tall aspect grid layout for vertical Reels */}
            <motion.div
              layout="position"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((reel, index) => (
                  <motion.div
                    key={reel.id}
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
                    <InstagramCard
                      {...reel}
                      onClick={() => setActiveReel(reel)}
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
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Modal containing Smartphone mockup player */}
      <EmbedModal
        isOpen={!!activeReel}
        onClose={() => setActiveReel(null)}
        title={activeReel?.title || "Instagram Reel"}
      >
        {activeReel && (
          <div className="w-full flex flex-col md:flex-row items-center gap-8 py-4 px-2">
            {/* Mock Smartphone Frame */}
            <div className="relative w-[240px] sm:w-[280px] h-[480px] sm:h-[530px] rounded-[45px] border-[8px] border-zinc-800 bg-black shadow-2xl flex-shrink-0 overflow-hidden flex flex-col justify-between">
              {/* Dynamic Camera Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-800 rounded-full z-20 flex items-center justify-between px-4">
                <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
                <div className="w-3.5 h-1 bg-zinc-900 rounded-full" />
              </div>

              {/* Reel Image in Frame */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeReel.thumbnail}
                  alt={activeReel.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50 opacity-90" />
              </div>

              {/* Simulated Reels UI Layer */}
              <div className="relative z-10 p-4 pt-12 flex flex-col justify-between h-full text-white">
                <div className="flex items-center gap-2 text-[10px] font-mono bg-pink-500/20 border border-pink-500/30 px-2 py-0.5 rounded-full self-start backdrop-blur-md">
                  <FaInstagram className="w-3 h-3 text-pink-400" />
                  <span>@mehularora11</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-pink-400 text-xs font-mono font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>POPULAR REEL</span>
                  </div>
                  <h4 className="text-sm font-bold leading-tight">
                    {activeReel.title}
                  </h4>
                  <p className="text-[10px] text-zinc-300 leading-normal line-clamp-3">
                    {activeReel.description}
                  </p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {activeReel.tags.map((t, i) => (
                      <span key={i} className="text-[9px] text-zinc-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Details & Action Block */}
            <div className="flex-grow flex flex-col justify-center text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-pink-400 mb-2 block">
                Social Integration
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold theme-text leading-tight mb-4">
                Watch Quick Dev Hack
              </h3>
              <p className="text-sm sm:text-base theme-text-secondary leading-relaxed mb-6 max-w-[45ch]">
                This is a short format video tutorial covering core web dev concepts, animation setups, styling guidelines, and workflow optimizations.
              </p>

              <div className="flex flex-wrap gap-4">
                <GlowButton
                  onClick={() => {
                    window.open(activeReel.videoUrl, "_blank", "noopener,noreferrer");
                  }}
                  variant="primary"
                  className="!py-3 !px-6 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 border-none text-white shadow-lg"
                >
                  Open in Instagram
                  <ExternalLink className="w-4 h-4" />
                </GlowButton>
                <GlowButton
                  onClick={() => setActiveReel(null)}
                  variant="outline"
                  className="!py-3 !px-6"
                >
                  Close Preview
                </GlowButton>
              </div>
            </div>
          </div>
        )}
      </EmbedModal>
    </SectionContainer>
  );
}
