import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

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
  const scrollRef = useRef(null);

  const hScrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += 340;
  };

  const hScrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= 340;
  };

  return (
    <div className="mb-20 lg:mb-36 relative">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl gradient-text mb-8 lg:mb-12 font-bold">
        My Projects
      </h1>

      {/* PROJECTS */}
      <div
        ref={scrollRef}
        className="
          grid grid-cols-1 sm:grid-cols-2 gap-6
          md:flex md:overflow-x-auto md:gap-8
          scroll-smooth px-4 lg:px-0
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>

      {/* ARROWS */}
      <div className="flex justify-center items-center gap-4 mt-6 select-none">
        <HiArrowSmLeft
          onClick={hScrollLeft}
          className="text-2xl lg:text-3xl cursor-pointer text-yellow-500 hidden md:block animate-[pulse_2s_infinite]"
        />
        <h2 className="gradient-text font-mono text-lg uppercase">
          Slide for more
        </h2>
        <HiArrowSmRight
          onClick={hScrollRight}
          className="text-2xl lg:text-3xl cursor-pointer text-yellow-500 hidden md:block animate-[pulse_2s_infinite]"
        />
      </div>

      {/* INLINE STYLE FOR SCROLLBAR */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectSection;
