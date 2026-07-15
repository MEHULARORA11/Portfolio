import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SectionContainer from "./shared/SectionContainer";
import SectionHeading from "./shared/SectionHeading";
import ShowMoreControls from "./shared/ShowMoreControls";
import { usePaginatedReveal } from "../hooks/usePaginatedReveal";

import Million_Checkboxes from "../assets/1_million_checkboxes.png"
import Personic from "../assets/Personic.png";
import Arbiter from "../assets/Arbiter.png";
import TalwinderCSS from "../assets/TalwinderCSS.png";

const projects = [
  {
    imgSrc: Arbiter,
    title: "Arbiter",
    description: "A self Consistency Agent",
    githubLink: "https://github.com/MEHULARORA11/Arbiter",
    liveDemo: "https://arbiter.mehularora.dev/",
    techStack: ['postgres','openAI,claude,gemini SDK','NextJS','JS',"Node.js"]
  },
  {
    imgSrc: Personic,
    title: "Personic",
    description: "An Agent That talks exactly like Hitesh Sir and Piyush Sir",
    githubLink: "https://github.com/MEHULARORA11/PersonicAi",
    liveDemo: "https://personic.mehularora.dev/",
    techStack: ["OpenAI SDK", "NodeJS", "JavaScript"]
  },
  {
    imgSrc: TalwinderCSS,
    title: "TalwinderCSS",
    description: "A Custom Tailwind , Inspired by tailwind css , with some fun classes",
    githubLink: "https://github.com/MEHULARORA11/TalwinderCSS",
    liveDemo: "https://talwinder.mehularora.dev/",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    imgSrc: Million_Checkboxes,
    title: "1 Million Checkboxes",
    description: "A Full stack App , Scaled smoothly to 1 Million Checkbox",
    githubLink: "https://github.com/MEHULARORA11/1-Million-CheckBoxes",
    liveDemo: "https://checkboxes.mehularora.dev/",
    techStack: ["React", "Node.js", "Express", "Redis", "WebSocket"]
  },
];

const ProjectSection = () => {
  const {
    visibleItems,
    showMore,
    showAll,
    hasMore,
    totalCount,
    revealCount,
    resetReveal,
  } = usePaginatedReveal(projects, 3, 4);

  return (
    <SectionContainer id="projects">
      <SectionHeading
        title="My Projects"
        subtitle="Selected Engineering Creations"
      />

      {/* Grid container with position layout animations */}
      <motion.div
        layout="position"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((project, index) => (
            <motion.div
              key={project.title}
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
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      <ShowMoreControls
        hasMore={hasMore}
        totalCount={totalCount}
        revealCount={revealCount}
        showMore={showMore}
        showAll={showAll}
        onHide={resetReveal}
      />
    </SectionContainer>
  );
};

export default ProjectSection;
