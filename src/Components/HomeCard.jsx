import React, { useState, useEffect, useRef } from "react";
import myImg from "../assets/personal.png";
import { FiBookOpen, FiCpu, FiMapPin } from "react-icons/fi";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

const HomeCard = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const cardRef = useRef(null);

  // Rotate roles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const tiltX = ((yc - y) / yc) * 10;
    const tiltY = ((x - xc) / xc) * 10;
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = "0 30px 60px -15px var(--accent-glow), 0 0 50px var(--accent-glow-soft)";
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "none";
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.boxShadow = "0 15px 35px -10px var(--accent-glow-soft)";
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 justify-between items-center min-h-[85vh] pt-24 pb-12 mb-20 lg:mb-36">
      
      {/* Bio, Roles, and Bento Stats (Left Side on Desktop, Bottom on Mobile) */}
      <div 
        data-aos="fade-right" 
        className="flex flex-col gap-6 lg:w-[55%] w-full"
      >
        <div className="flex flex-col gap-2">
          <span className="theme-pill w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-2">
            Welcome to my space
          </span>
          <h1 
            className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight theme-text"
            style={{ textShadow: "0 0 22px var(--name-glow)" }}
          >
            Hi, I'm <span className="theme-highlight">Mehul Arora</span>
          </h1>
          <h2
            key={roles[roleIndex]}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold h-12 gradient-text animate-[fadeUp_0.6s_ease-out] mt-1"
          >
            {roles[roleIndex]}
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-base sm:text-lg lg:text-xl leading-relaxed">
          <p className="theme-text-secondary">
           I design and develop Full Stack Applications with a strong focus on backend engineering, scalability, security, and performance-driven architectures. I enjoy building reliable systems that combine efficient server-side logic with modern, immersive user experiences.
          </p>
          <p className="theme-text-secondary">
            Currently pursuing my first year of B.Tech in Faridabad, India, I continuously explore modern web technologies, APIs, databases, authentication systems, and high-performance application workflows to craft fast, scalable, and production-ready digital solutions.
          </p>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          
          <div className="glass-card p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl theme-icon-box">
              <FiBookOpen className="text-lg" />
            </div>
            <div>
              <h4 className="text-xs theme-text-label uppercase tracking-wider font-semibold">Education</h4>
              <p className="text-sm font-bold theme-text mt-1">B.Tech First Year</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl theme-icon-box">
              <FiCpu className="text-lg" />
            </div>
            <div>
              <h4 className="text-xs theme-text-label uppercase tracking-wider font-semibold">Specialization</h4>
              <p className="text-sm font-bold theme-text mt-1">Backend & scaling</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl theme-icon-box">
              <FiMapPin className="text-lg" />
            </div>
            <div>
              <h4 className="text-xs theme-text-label uppercase tracking-wider font-semibold">Base Location</h4>
              <p className="text-sm font-bold theme-text mt-1">Faridabad, India</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3D Tilting Profile Card (Right Side on Desktop, Top on Mobile) */}
      <div 
        data-aos="fade-left"
        className="w-full lg:w-[40%] flex justify-center items-center"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] p-4 glass-card rounded-[2.5rem] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            transform: "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            transformStyle: "preserve-3d",
            boxShadow: "0 15px 35px -10px var(--accent-glow-soft)",
          }}
        >
          {/* Inner image container */}
          <div 
            className="w-full h-full rounded-[2rem] overflow-hidden relative"
            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          >
            <img
              src={myImg}
              alt="Mehul Arora"
              className="w-full h-full object-cover"
            />
            {/* Dark vignette gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Status Badge */}
          <div 
            className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/40 border-white/10 backdrop-blur-md"
            style={{ transform: "translateZ(50px)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Open for projects</span>
          </div>

        </div>
      </div>


    </div>
  );
};

export default HomeCard;
