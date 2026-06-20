import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import CertificateCard from "./CertificateCard";
import ShowMoreControls from "../shared/ShowMoreControls";
import { usePaginatedReveal } from "../../hooks/usePaginatedReveal";
import { certificates } from "../../data/portfolioData";

/**
 * Certificates showcase section with modular grids,
 * dynamic pagination controls, and stagger slide-ups.
 */
export default function CertificatesSection() {
  const {
    visibleItems,
    showMore,
    showAll,
    hasMore,
    totalCount,
    revealCount,
  } = usePaginatedReveal(certificates, 3, 4);

  return (
    <SectionContainer id="certificates">
      <SectionHeading
        title="Certificates"
        subtitle="Credentials & Certifications"
      />

      {/* Grid Container with layout animations */}
      <motion.div
        layout="position"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((cert, index) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                delay: (index % 4) * 0.08, // Stagger based on card index in current page
              }}
              className="w-full"
            >
              <CertificateCard {...cert} />
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
    </SectionContainer>
  );
}
