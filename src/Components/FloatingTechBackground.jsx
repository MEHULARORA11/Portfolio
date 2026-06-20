import React, { useMemo } from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiJavascript, SiTailwindcss } from "react-icons/si";

const techIcons = [
  FaReact,
  FaNodeJs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  FaHtml5,
  FaCss3Alt,
  SiTailwindcss,
  FaGitAlt,
];

const FloatingTechBackground = () => {
  const iconsData = useMemo(() => {
    return techIcons.map((Icon) => ({
      Icon,
      left: Math.random() * 80 + 5, // 5% to 85%, keeps icons off the right edge
      top: Math.random() * 80 + 5,  // 5% to 85%, keeps icons off the bottom edge
      size: Math.floor(Math.random() * 25) + 25,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {iconsData.map(({ Icon, left, top, size, duration, delay }, index) => (
        <Icon
          key={index}
          size={size}
          className="absolute drop-shadow-md animate-floatTech"
          color="var(--icon-float)"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingTechBackground;