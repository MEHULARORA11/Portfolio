import React, { useRef } from "react";
import Tilt from "react-parallax-tilt";
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

const ProjectCard = ({
  imgSrc,
  title,
  description,
  githubLink,
  liveDemo,
  techStack = [],
}) => {
  const cardRef = useRef(null);

  // Spotlights tracking mouse position for premium neon reflection
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.12}
      glareColor="var(--accent-light)"
      glarePosition="all"
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={1200}
      className="h-full w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition-all duration-500 hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)]"
        style={{
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Spotlight Follower Layer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--accent-glow-soft), transparent 80%)`,
          }}
        />

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
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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
                  const details = techDetails[normTech] || {
                    icon: FaCode,
                    bg: "hover:bg-[var(--accent-muted)] hover:text-[var(--accent-light)] hover:border-[var(--accent-border)] hover:shadow-[0_0_12px_var(--accent-glow-soft)]",
                  };

                  const IconComp = details.icon || FaCode;

                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border theme-text-muted bg-[var(--accent-muted)] border-[var(--accent-border)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-md cursor-default group-hover/techs:opacity-50 hover:!opacity-100 ${details.bg}`}
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
    </Tilt>
  );
};

export default ProjectCard;
