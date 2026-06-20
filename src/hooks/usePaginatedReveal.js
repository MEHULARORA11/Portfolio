import { useState, useCallback, useMemo } from "react";

/**
 * Reusable hook to handle incremental pagination for a list of items.
 *
 * @param {Array} items - The complete list of items.
 * @param {number} [initialCount=3] - Number of items shown initially.
 * @param {number} [stepCount=4] - Number of items added on "Show More".
 */
export function usePaginatedReveal(items = [], initialCount = 3, stepCount = 4) {
  const [revealCount, setRevealCount] = useState(initialCount);

  const totalCount = items.length;

  const showMore = useCallback(() => {
    setRevealCount((prev) => Math.min(prev + stepCount, totalCount));
  }, [stepCount, totalCount]);

  const showAll = useCallback(() => {
    setRevealCount(totalCount);
  }, [totalCount]);

  const resetReveal = useCallback(() => {
    setRevealCount(initialCount);
  }, [initialCount]);

  const visibleItems = useMemo(() => {
    return items.slice(0, revealCount);
  }, [items, revealCount]);

  const hasMore = revealCount < totalCount;

  return {
    visibleItems,
    showMore,
    showAll,
    resetReveal,
    hasMore,
    totalCount,
    revealCount,
  };
}
