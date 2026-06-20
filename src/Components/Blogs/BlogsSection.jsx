import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import BlogCard from "./BlogCard";
import ShowMoreControls from "../shared/ShowMoreControls";
import EmbedModal from "../shared/EmbedModal";
import GlowButton from "../shared/GlowButton";
import { usePaginatedReveal } from "../../hooks/usePaginatedReveal";
import { blogs } from "../../data/portfolioData";
import { useSearch } from "../../hooks/useSearch";
import BlogSearchBar from "../search/BlogSearchBar";
import EmptyState from "../search/EmptyState";
import ComingSoon from "../shared/ComingSoon";

/**
 * Blogs Showcase Section supporting paginated card listings,
 * dynamic post previews, and read progress overlays.
 */
export default function BlogsSection() {
  if (!blogs || blogs.length === 0) {
    return (
      <SectionContainer id="blogs">
        <SectionHeading
          title="Technical Articles"
          subtitle="Guides, Tutorials & Architectural Deep Dives"
        />
        <ComingSoon
          title="Articles"
          subtitle="I am currently authoring new editorial technical articles, web architectural studies, and dev tutorials."
          Icon={BookOpen}
        />
      </SectionContainer>
    );
  }
  const [activeBlog, setActiveBlog] = useState(null);

  const { searchQuery, setSearchQuery, filteredItems, clearSearch } = useSearch(blogs, {
    keys: ["title", "description", "content", "tags"],
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
    <SectionContainer id="blogs">
      <SectionHeading
        title="Technical Articles"
        subtitle="Guides, Tutorials & Architectural Deep Dives"
      />

      <BlogSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={clearSearch}
        onTagClick={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <EmptyState
            key="empty-blogs"
            onReset={clearSearch}
            message={`No articles found matching "${searchQuery}".`}
          />
        ) : (
          <motion.div
            key="blogs-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Grid Container with layout animations */}
            <motion.div
              layout="position"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((blog, index) => (
                  <motion.div
                    key={blog.id}
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
                    <BlogCard
                      {...blog}
                      onClick={() => setActiveBlog(blog)}
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

      {/* Cinematic Modal containing Article Reader */}
      <EmbedModal
        isOpen={!!activeBlog}
        onClose={() => setActiveBlog(null)}
        title="Technical Blog Reader"
      >
        {activeBlog && (
          <div className="w-full max-h-[70vh] overflow-y-auto pr-2 scroll-bar text-left">
            {/* Header Cover Info */}
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-[var(--card-border)] bg-black select-none">
              <img
                src={activeBlog.thumbnail}
                alt={activeBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03140e] via-[#03140e]/30 to-black/60 opacity-95" />
              
              {/* Header Title Metadata overlay */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-emerald-300 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeBlog.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeBlog.readTime}
                  </span>
                </div>
                <h4 className="text-xl sm:text-3xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                  {activeBlog.title}
                </h4>
              </div>
            </div>

            {/* Tags strip */}
            <div className="flex flex-wrap gap-2 mb-6">
              {activeBlog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-semibold px-3 py-1 rounded-full border border-[var(--accent-border)] bg-[var(--accent-muted)] text-[var(--accent-light)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Markdown styled article contents */}
            <div className="theme-text text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-wrap select-text selection:bg-[var(--accent)] selection:text-[var(--button-text)] opacity-90">
              {activeBlog.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h5 key={index} className="text-lg sm:text-xl font-bold gradient-text pt-4 pb-1">
                      {paragraph.replace("### ", "")}
                    </h5>
                  );
                }
                if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={index} className="list-disc list-inside pl-4 space-y-1.5 text-sm">
                      {items.map((item, subIndex) => (
                        <li key={subIndex}>{item.replace(/^[*-\s]+/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith("`")) {
                  return (
                    <pre key={index} className="bg-black/60 border border-[var(--card-border)] rounded-xl p-4 font-mono text-xs overflow-x-auto text-[var(--accent-light)] my-4">
                      <code>{paragraph.replace(/`/g, "")}</code>
                    </pre>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t theme-divider flex flex-wrap gap-4 items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)] opacity-60">
                WRITTEN BY: MEHUL ARORA
              </span>
              <div className="flex gap-3">
                <GlowButton
                  onClick={() => setActiveBlog(null)}
                  variant="outline"
                  className="!py-2 !px-5"
                >
                  Close Reader
                </GlowButton>
                <GlowButton
                  onClick={() => {
                    // Mock link redirect or log
                    window.open("https://medium.com", "_blank", "noopener,noreferrer");
                  }}
                  variant="primary"
                  className="!py-2 !px-5"
                >
                  Read on Medium
                  <ArrowRight className="w-4 h-4" />
                </GlowButton>
              </div>
            </div>
          </div>
        )}
      </EmbedModal>
    </SectionContainer>
  );
}

