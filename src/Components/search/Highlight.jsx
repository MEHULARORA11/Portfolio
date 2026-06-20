import React from "react";

/**
 * High-performance text highlighting component.
 * Case-insensitive, supports multi-word search queries.
 */
export default function Highlight({ text = "", query = "", className = "" }) {
  if (!text) return null;
  if (!query || typeof query !== "string" || !query.trim()) {
    return <>{text}</>;
  }

  // Split query into individual words and escape special regex characters
  const words = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));

  if (words.length === 0) {
    return <>{text}</>;
  }

  // Create a regex matching any of the query words
  const pattern = words.join("|");
  const regex = new RegExp(`(${pattern})`, "gi");

  const parts = text.toString().split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className={`bg-transparent text-inherit font-bold underline decoration-2 decoration-[var(--accent)] underline-offset-2 ${className}`}
            style={{
              textShadow: "0 0 10px var(--accent-glow)",
            }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
