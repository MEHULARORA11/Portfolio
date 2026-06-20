import { useState, useMemo } from "react";
import Fuse from "fuse.js";

/**
 * Reusable hook for fuzzy searching a list of items using fuse.js.
 *
 * @param {Array} items - The complete list of items to search.
 * @param {Object} options - Fuse.js search options (keys, threshold, etc.).
 */
export function useSearch(items = [], options = {}) {
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(items, {
      threshold: 0.35, // Adjust sensitivity: lower is stricter, higher is fuzzier
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      findAllMatches: true,
      ...options,
    });
  }, [items, options]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, items, fuse]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    clearSearch,
  };
}
