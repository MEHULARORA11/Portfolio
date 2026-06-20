import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronsDown } from "lucide-react";
import GlowButton from "./GlowButton";

/**
 * Renders the pagination controls for cards.
 *
 * @param {Object} props
 * @param {boolean} props.hasMore - If there are more items to reveal.
 * @param {number} props.totalCount - Total number of items in the dataset.
 * @param {number} props.revealCount - Number of items currently visible.
 * @param {Function} props.showMore - Callback to show next page.
 * @param {Function} props.showAll - Callback to reveal all items.
 */
export default function ShowMoreControls({
  hasMore,
  totalCount,
  revealCount,
  showMore,
  showAll,
}) {
  // If the total items are <= 3, the buttons are hidden entirely.
  if (totalCount <= 3) return null;

  return (
    <div className="flex justify-center items-center mt-12 mb-6">
      <AnimatePresence mode="wait">
        {hasMore ? (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <GlowButton onClick={showMore} variant="primary">
              Show More
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </GlowButton>

            <GlowButton onClick={showAll} variant="secondary">
              Show All
              <ChevronsDown className="w-4 h-4 opacity-80" />
            </GlowButton>
          </motion.div>
        ) : (
          <motion.div
            key="end-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-mono text-[var(--text-muted)] opacity-60 flex flex-col items-center select-none"
          >
            <span>Showing all {totalCount} items</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
