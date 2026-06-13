import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { HiGlobeAlt } from "react-icons/hi";
import { 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaDatabase, 
  FaCode 
} from "react-icons/fa";
import { 
  SiMongodb, 
  SiExpress, 
  SiJavascript, 
  SiRedis, 
  SiNpm,
  SiSocketdotio
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
    bg: "hover:bg-white/10 hover:text-white hover:border-white/40 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]",
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
      <div className="group h-full w-[280px] sm:w-[300px] md:w-[320px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden
     shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between">
        
        {/* Card Header / Image container with Hover zoom */}
        <a 
          href={githubLink || liveDemo || "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block overflow-hidden h-44 sm:h-48 relative"
        >
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs font-semibold px-4 py-1.5 rounded-full bg-purple-600/80 border border-purple-400/30 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-105">
              View Project
            </span>
          </div>
        </a>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-grow gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
              {title}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Premium & Interactive Tech Stack Badges */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 select-none group/techs">
              {techStack.map((tech, idx) => {
                const normTech = tech.trim().toLowerCase();
                const details = techDetails[normTech] || {
                  icon: FaCode,
                  bg: "hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-500/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]",
                };
                
                const IconComp = details.icon || FaCode;
                
                return (
                  <span 
                    key={idx} 
                    className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-white/10 text-gray-300 bg-white/5 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-md cursor-default group-hover/techs:opacity-50 hover:!opacity-100 ${details.bg}`}
                  >
                    <IconComp className="text-xs sm:text-sm" />
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white text-xl hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]"
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
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white text-lg hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]"
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
