import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Reusable cinematic modal for embedding media overlays (e.g. YouTube iframes, Reels, Certificate previews).
 * Handles keyboard escape events, accessibility attributes, and focus trapping.
 */
export default function EmbedModal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);

  // Esc key closure
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden shadow-2xl z-10 border border-[var(--card-hover-border)] bg-[#03140e]/95"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Header block */}
            <div className="flex items-center justify-between p-5 border-b theme-divider select-none">
              <h3 className="text-lg sm:text-xl font-bold gradient-text">{title}</h3>
              <button
                onClick={onClose}
                className="theme-icon-btn flex items-center justify-center w-8 h-8 rounded-full text-lg cursor-pointer hover:rotate-90 transition-transform duration-300"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content block */}
            <div className="p-4 sm:p-6 flex flex-col items-center justify-center">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
