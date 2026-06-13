import React from "react";
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
  const generatePosition = () => ({
    left: Math.random() * 80 + 5, // 5% to 85%, keeps icons off the right edge
    top: Math.random() * 80 + 5,  // 5% to 85%, keeps icons off the bottom edge
    size: Math.floor(Math.random() * 25) + 25,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  });

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {techIcons.map((Icon, index) => {
        const { left, top, size, duration, delay } = generatePosition();

        return (
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
        );
      })}

      <style>{`
        @keyframes floatTech {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(15deg); }
          50% { transform: translateY(-40px) translateX(20px) rotate(0deg); }
          75% { transform: translateY(-20px) translateX(10px) rotate(-15deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }

        .animate-floatTech {
          animation: floatTech linear infinite;
        }

        @media (max-width: 768px) {
          .animate-floatTech {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingTechBackground;