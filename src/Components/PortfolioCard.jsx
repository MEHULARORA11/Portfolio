import React, { useEffect, useState } from "react";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

const PortfolioCard = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6">

      <div
        data-aos="fade-right"
        data-aos-duration="1500"
        className="theme-text text-center lg:text-left"
      >
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-5"
          style={{ filter: "drop-shadow(0 0 22px var(--name-glow))" }}
        >
          Hi, I'm{" "}
          <span className="theme-highlight">Mehul Arora</span>
        </h1>

        <h2
          key={roles[index]}
          className="text-2xl sm:text-3xl lg:text-5xl font-semibold h-14 gradient-text animate-[fadeUp_0.6s_ease-out]"
        >
          {roles[index]}
        </h2>

        <p className="mt-6 theme-text-secondary max-w-md text-base sm:text-lg lg:text-xl leading-relaxed">
          I design and develop Full Stack Application , But Fond of Learning and Working on Backend stuff.
        </p>
      </div>

      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        className="theme-text w-[90vw] sm:w-[65vw] lg:w-[32vw] glass-card rounded-2xl p-7 hover:scale-[1.04] transition-all duration-500"
      >
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold py-4 border-b theme-divider drop-shadow-md">
          Portfolio*
        </h3>

        <h4 className="text-xl sm:text-2xl lg:text-3xl py-4 border-b theme-divider drop-shadow-sm">
          Mehul Arora
        </h4>

        <p className="text-lg sm:text-xl lg:text-2xl mt-4 theme-text-secondary leading-relaxed">
          Just a Developer <br />
          Web & App Development
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioCard;
