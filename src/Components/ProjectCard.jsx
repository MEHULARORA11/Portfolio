import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { HiGlobeAlt } from "react-icons/hi";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaCode,
} from "react-icons/fa";
import {
  SiExpress,
  SiJavascript,
  SiRedis,
  SiNpm,
  SiSocketdotio,
  SiNextdotjs,
  SiOpenai
} from "react-icons/si";

/* ─── Tech badge config — icon only, monochrome hover treatment ─── */
const techDetails = {
  react:      { icon: FaReact },
  "node.js":  { icon: FaNodeJs },
  "next.js":  { icon: SiNextdotjs },
  express:    { icon: SiExpress },
  redis:      { icon: SiRedis },
  websocket:  { icon: SiSocketdotio },
  openai:     { icon: SiOpenai },
  npm:        { icon: SiNpm },
  javascript: { icon: SiJavascript },
  css:        { icon: FaCss3Alt },
  html:       { icon: FaHtml5 },
};

/* Monochrome badge hover applied uniformly to all tech tags */
const TAG_HOVER = "hover:bg-[var(--card-hover-bg)] hover:border-[var(--card-hover-border)] hover:text-[var(--text-primary)] tag-inner-shadow";

const ProjectCard = ({
  imgSrc,
  title,
  description,
  githubLink,
  liveDemo,
  techStack = [],
}) => {
  return (
    <div
      className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition-all duration-300 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)] hover:-translate-y-1"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      {/* Thumbnail Layer */}
      <div>
        <a
          href={liveDemo || githubLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden h-44 sm:h-48 relative border-b border-[var(--card-border)] group-hover:border-[var(--card-hover-border)] transition-colors duration-300"
        >
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: "var(--overlay)" }}
          >
            <span
              className="theme-btn text-xs font-semibold px-4 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{ borderColor: "var(--accent-border)" }}
            >
              View Project
            </span>
          </div>
        </a>

        {/* Heading Info */}
        <div className="p-5 pb-0 flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold theme-text group-hover:text-[var(--accent-light)] transition-colors duration-300 tracking-tight">
            {title}
          </h2>
          <p className="text-sm theme-text-secondary leading-relaxed line-clamp-3 opacity-90">
            {description}
          </p>

          {/* Tech Badges */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 select-none group/techs">
              {techStack.map((tech, idx) => {
                const normTech = tech.trim().toLowerCase();
                const details = techDetails[normTech] || { icon: FaCode };
                const IconComp = details.icon || FaCode;

                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-semibold px-3 py-1 rounded-full border theme-text-secondary bg-[var(--card-bg)] border-[var(--card-border)] transition-all duration-200 hover:scale-105 cursor-default group-hover/techs:opacity-60 hover:!opacity-100 ${TAG_HOVER}`}
                  >
                    <IconComp className="text-xs sm:text-sm" />
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-4 mt-6 border-t theme-divider flex items-center gap-3">
        {githubLink && (
          <motion.a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            className="theme-icon-btn flex items-center justify-center w-9 h-9 rounded-xl text-xl"
            title="GitHub Repository"
          >
            <AiFillGithub />
          </motion.a>
        )}
        {liveDemo && (
          <motion.a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            className="theme-icon-btn flex items-center justify-center w-9 h-9 rounded-xl text-lg"
            title="Live Demo"
          >
            <HiGlobeAlt />
          </motion.a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
