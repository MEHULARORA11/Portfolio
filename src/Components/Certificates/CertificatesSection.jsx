import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import CertificateCard from "./CertificateCard";
import ShowMoreControls from "../shared/ShowMoreControls";
import { usePaginatedReveal } from "../../hooks/usePaginatedReveal";
import { certificates } from "../../data/portfolioData";
import { useSearch } from "../../hooks/useSearch";
import CertificatesSearchBar from "../search/CertificatesSearchBar";
import EmptyState from "../search/EmptyState";
import ComingSoon from "../shared/ComingSoon";
import { Award } from "lucide-react";

/**
 * Certificates showcase section with modular grids,
 * dynamic pagination controls, and stagger slide-ups.
 */
export default function CertificatesSection() {
  if (!certificates || certificates.length === 0) {
    return (
      <SectionContainer id="certificates">
        <SectionHeading
          title="Certificates"
          subtitle="Credentials & Certifications"
        />
        <ComingSoon
          title="Certificates"
          subtitle="I am currently staging and verifying new industry credentials. This directory will compile shortly."
          Icon={Award}
        />
      </SectionContainer>
    );
  }
  const { searchQuery, setSearchQuery, filteredItems, clearSearch } = useSearch(certificates, {
    keys: ["title", "issuer", "tags"],
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
    <SectionContainer id="certificates">
      <SectionHeading
        title="Certificates"
        subtitle="Credentials & Certifications"
      />

      <CertificatesSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={clearSearch}
        onTagClick={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <EmptyState
            key="empty-certificates"
            onReset={clearSearch}
            message={`No certificates found matching "${searchQuery}".`}
          />
        ) : (
          <motion.div
            key="certificates-content"
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
                    <CertificateCard {...cert} searchQuery={searchQuery} />
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
    </SectionContainer>
  );
}

