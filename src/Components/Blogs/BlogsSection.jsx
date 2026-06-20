import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
              onHide={resetReveal}
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
            <div className="theme-text text-sm sm:text-base leading-relaxed select-text selection:bg-[var(--accent)] selection:text-[var(--button-text)] opacity-95">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text mt-8 mb-4 border-b theme-divider pb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text mt-6 mb-3 border-b theme-divider pb-1" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--accent-light)] mt-5 mb-2" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-base sm:text-lg font-semibold text-[var(--accent-light)] mt-4 mb-2" {...props} />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mt-3 mb-1" {...props} />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6 className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] mt-2 mb-1" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-sm sm:text-base leading-relaxed text-[var(--text-primary)] opacity-90" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-sm sm:text-base" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-sm sm:text-base" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="leading-relaxed text-[var(--text-primary)] mb-1" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-muted)] px-4 py-3 rounded-r-2xl my-6 italic text-[var(--text-primary)] opacity-95" {...props} />
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const content = String(children).replace(/\n$/, "");
                    const hasNewline = content.includes("\n");
                    if (hasNewline || match) {
                      return (
                        <pre className="bg-black/60 border border-[var(--card-border)] rounded-xl p-4 font-mono text-xs overflow-x-auto text-[var(--accent-light)] my-4">
                          <code className={className} {...props}>
                            {content}
                          </code>
                        </pre>
                      );
                    }
                    return (
                      <code className="bg-black/40 border border-[var(--card-border)] rounded px-1.5 py-0.5 font-mono text-xs text-[var(--accent-light)]" {...props}>
                        {children}
                      </code>
                    );
                  },
                  a: ({ node, ...props }) => (
                    <a className="text-[var(--accent-light)] hover:underline hover:text-[var(--accent)] transition-colors duration-300 font-medium" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="w-full overflow-x-auto my-6 border border-[var(--card-border)] rounded-xl">
                      <table className="w-full border-collapse text-left text-sm" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-[var(--accent-muted)] border-b border-[var(--card-border)]" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="px-4 py-3 font-semibold text-[var(--text-primary)] border-r border-[var(--card-border)] last:border-r-0" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody className="divide-y divide-[var(--divider)]" {...props} />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr className="hover:bg-[var(--card-hover-bg)]/30 transition-colors duration-200" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-4 py-3 text-[var(--text-secondary)] border-r border-[var(--card-border)] last:border-r-0" {...props} />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-8 border-t border-[var(--divider)]" {...props} />
                  ),
                  del: ({ node, ...props }) => (
                    <del className="line-through opacity-60" {...props} />
                  ),
                  img: ({ node, ...props }) => (
                    <img className="rounded-2xl border border-[var(--card-border)] max-w-full my-4 shadow-md" {...props} />
                  ),
                  input: ({ node, ...props }) => {
                    if (props.type === "checkbox") {
                      return (
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--accent)] focus:ring-[var(--accent-glow)] mr-2 accent-[var(--accent)] cursor-not-allowed"
                          disabled
                          checked={props.checked}
                          {...props}
                        />
                      );
                    }
                    return <input {...props} />;
                  }
                }}
              >
                {activeBlog.content}
              </ReactMarkdown>
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

