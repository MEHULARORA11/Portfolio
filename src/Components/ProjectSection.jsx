import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SectionContainer from "./shared/SectionContainer";
import SectionHeading from "./shared/SectionHeading";
import ShowMoreControls from "./shared/ShowMoreControls";
import { usePaginatedReveal } from "../hooks/usePaginatedReveal";

import Million_Checkboxes from "../assets/1_million_checkboxes.png";
import Tick_Tac_Toe from "../assets/Tick_Tac_Toe.png";
import Guessing_Game from "../assets/guessinggame.png";
import Todo from "../assets/Todo.png";
import TailwindCSS from "../assets/TailwindCSS.png";

const projects = [
  {
    imgSrc: Million_Checkboxes,
    title: "1 Million Checkboxes",
    description: "A Full stack App , Scaled smoothly to 1 Million Checkbox",
    githubLink: "https://github.com/MEHULARORA11/1-Million-CheckBoxes",
    liveDemo: "https://checkboxes.mehularora.dev/",
    techStack: ["React", "Node.js", "Express", "Redis", "WebSocket"]
  },
  {
    imgSrc: TailwindCSS,
    title: "Custom Tailwind",
    description: "Built My custom Tailwind => 'Talwinder Css'",
    githubLink: "https://github.com/MEHULARORA11/My-Custom-Tailwind",
    liveDemo: "https://www.npmjs.com/package/talwinder-ji-ki-css",
    techStack: ["Node.js", "npm", "JavaScript", "CSS"]
  },
  {
    imgSrc: Tick_Tac_Toe,
    title: "Tic Tac Toe",
    description: "A Basic Tic Tac Toe built with raw JS",
    githubLink: "https://github.com/MEHULARORA11/Tic-Tac-Toe-Game",
    liveDemo: "https://tic-tac-toe-game-nine-puce.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    imgSrc: Guessing_Game,
    title: "Guessing Game",
    description: "A Game which generates random number and asks u to guess it .",
    githubLink: "https://github.com/MEHULARORA11/Random-Number-Game",
    liveDemo: "https://guessinggame.mehularora.dev/",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    imgSrc: Todo,
    title: "A Todo Application",
    description: "A Todo app built with raw JS",
    githubLink: "https://github.com/MEHULARORA11/My-Todo-App",
    liveDemo: "https://todo.mehularora.dev/",
    techStack: ["HTML", "CSS", "JavaScript"]
  }
];

const ProjectSection = () => {
  const {
    visibleItems,
    showMore,
    showAll,
    hasMore,
    totalCount,
    revealCount,
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
      />
    </SectionContainer>
  );
};

export default ProjectSection;
