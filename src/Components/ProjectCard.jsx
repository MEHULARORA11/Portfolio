import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { HiGlobeAlt } from "react-icons/hi";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiRedis,
  SiNpm,
  SiSocketdotio,
} from "react-icons/si";

const techDetails = {
  react: {
    icon: FaReact,
    bg: "hover:bg-[#61DAFB]/10 hover:text-[#61DAFB] hover:border-[#61DAFB]/40 hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]",
  },
  "node.js": {
    icon: FaNodeJs,
    bg: "hover:bg-[#68A063]/10 hover:text-[#68A063] hover:border-[#68A063]/40 hover:shadow-[0_0_12px_rgba(104,160,99,0.2)]",
  },
  express: {
    icon: SiExpress,
    bg: "hover:bg-[var(--accent-muted)] hover:text-[var(--accent-light)] hover:border-[var(--accent-border)] hover:shadow-[0_0_12px_var(--accent-glow-soft)]",
  },
  redis: {
    icon: SiRedis,
    bg: "hover:bg-[#D82C20]/10 hover:text-[#D82C20] hover:border-[#D82C20]/40 hover:shadow-[0_0_12px_rgba(216,44,32,0.2)]",
  },
  websocket: {
    icon: SiSocketdotio,
    bg: "hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] hover:border-[#3B82F6]/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]",
  },
  npm: {
    icon: SiNpm,
    bg: "hover:bg-[#CB3837]/10 hover:text-[#CB3837] hover:border-[#CB3837]/40 hover:shadow-[0_0_12px_rgba(203,56,55,0.2)]",
  },
  javascript: {
    icon: SiJavascript,
    bg: "hover:bg-[#F7DF1E]/10 hover:text-[#F7DF1E] hover:border-[#F7DF1E]/40 hover:shadow-[0_0_12px_rgba(247,223,30,0.2)]",
  },
  css: {
    icon: FaCss3Alt,
    bg: "hover:bg-[#264DE4]/10 hover:text-[#264DE4] hover:border-[#264DE4]/40 hover:shadow-[0_0_12px_rgba(38,77,228,0.2)]",
  },
  html: {
    icon: FaHtml5,
    bg: "hover:bg-[#E34C26]/10 hover:text-[#E34C26] hover:border-[#E34C26]/40 hover:shadow-[0_0_12px_rgba(227,76,38,0.2)]",
  },
};

const ProjectCard = ({ imgSrc, title, description, githubLink, liveDemo, techStack }) => {
  return (
    <div className="p-4 flex-shrink-0">
      <div className="group h-full w-[280px] sm:w-[300px] md:w-[320px] glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between">

        <a
          href={liveDemo || githubLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden h-44 sm:h-48 relative"
        >
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: "var(--overlay)" }}
          >
            <span className="theme-btn text-xs font-semibold px-4 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{ borderColor: "var(--accent-border)" }}
            >
              View Project
            </span>
          </div>
        </a>

        <div className="p-5 flex flex-col flex-grow gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold theme-text group-hover:text-[var(--accent-light)] transition-colors duration-300">
              {title}
            </h2>
            <p className="text-sm theme-text-secondary leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 select-none group/techs">
              {techStack.map((tech, idx) => {
                const normTech = tech.trim().toLowerCase();
                const details = techDetails[normTech] || {
                  icon: FaCode,
                  bg: "hover:bg-[var(--accent-muted)] hover:text-[var(--accent-light)] hover:border-[var(--accent-border)] hover:shadow-[0_0_12px_var(--accent-glow-soft)]",
                };

                const IconComp = details.icon || FaCode;

                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border theme-text-muted glass-card transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-md cursor-default group-hover/techs:opacity-50 hover:!opacity-100 ${details.bg}`}
                  >
                    <IconComp className="text-xs sm:text-sm" />
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-3 mt-4 pt-4 border-t theme-divider">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-icon-btn flex items-center justify-center w-9 h-9 rounded-xl text-xl hover:-translate-y-0.5"
                title="GitHub Repository"
              >
                <AiFillGithub />
              </a>
            )}
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-icon-btn flex items-center justify-center w-9 h-9 rounded-xl text-lg hover:-translate-y-0.5"
                title="Live Demo"
              >
                <HiGlobeAlt />
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
