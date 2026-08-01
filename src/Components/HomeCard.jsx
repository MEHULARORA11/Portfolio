import React, { useState, useEffect } from "react";
import myImg from "../assets/personal.png";
import { FiBookOpen, FiCpu, FiMapPin, FiDownload, FiFileText } from "react-icons/fi";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Social links ─── */
const SOCIAL_LINKS = [
  { href: "https://github.com/MEHULARORA11",     icon: FiGithub,   label: "GitHub"   },
  { href: "https://linkedin.com/in/mehul-arora", icon: FiLinkedin, label: "LinkedIn" },
  { href: "https://twitter.com/mehularora",       icon: FiTwitter,  label: "X"        },
];

/* ─── Roles ─── */
const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

/* ─── HomeCard ─── */
const HomeCard = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  /* Rotate roles every 2.5 s */
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 justify-between items-center min-h-[85vh] pt-24 pb-12 mb-20 lg:mb-36">

      {/* ── Left: Bio ── */}
      <div data-aos="fade-right" className="flex flex-col gap-6 lg:w-[55%] w-full">
        <div className="flex flex-col gap-2">
          {/* Available badge */}
          <div className="flex items-center gap-2 mb-2 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-sm text-[var(--accent-light)] font-semibold">Available for work</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight theme-text">
            Hi, I'm <span className="theme-highlight">Mehul Arora</span>
          </h1>

          <div className="h-12 overflow-hidden relative mt-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[roleIndex]}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{   y: -15, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold gradient-text"
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base sm:text-lg lg:text-xl leading-relaxed">
          <p className="theme-text-secondary">
            I design and develop Full Stack Applications with a strong focus on backend engineering, scalability, security, and performance-driven architectures. I enjoy building reliable systems that combine efficient server-side logic with modern, immersive user experiences.
          </p>
          <p className="theme-text-secondary">
            Currently pursuing my first year of B.Tech in Faridabad, India, I continuously explore modern web technologies, APIs, databases, authentication systems, and high-performance application workflows to craft fast, scalable, and production-ready digital solutions.
          </p>
        </div>

        {/* Resume CTAs */}
        <div className="flex flex-wrap gap-4 mt-2">
          <a
            href="/resume/Mehul_Arora_Resume.pdf"
            download="Mehul_Arora_Resume.pdf"
            target="_blank" rel="noopener noreferrer"
            className="theme-btn flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base active:scale-95 transition-all duration-200"
          >
            <FiDownload className="text-lg" />
            Download Resume
          </a>
          <Link to="/resume"
            className="theme-icon-btn flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base active:scale-95 transition-all duration-200"
          >
            <FiFileText className="text-lg" /> View Resume
          </Link>
        </div>

        {/* Bento Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { icon: FiBookOpen, label: "Education",      value: "B.Tech First Year"  },
            { icon: FiCpu,      label: "Specialization", value: "Backend & scaling"  },
            { icon: FiMapPin,   label: "Base Location",  value: "Faridabad, India"   },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}
              className="glass-card p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl theme-icon-box">
                <Icon className="text-lg" />
              </div>
              <div>
                <h4 className="text-[10px] theme-text-label uppercase tracking-widest font-mono font-semibold">{label}</h4>
                <p className="text-sm font-bold theme-text mt-1">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Profile Image ── */}
      <div data-aos="fade-left"
        className="w-full lg:w-[40%] flex flex-col justify-center items-center gap-5"
      >
        {/* Profile Card — static, no tilt, no orbit */}
        <div
          className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[290px] lg:h-[290px] group relative glass-card rounded-[2.5rem] flex items-center justify-center hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          {/* Image */}
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
            <img src={myImg} alt="Mehul Arora" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* Status badge */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/40 border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider font-bold">Open for projects</span>
          </div>
        </div>

        {/* Social links row — plain flex, no orbit */}
        <div className="flex items-center gap-3 mt-2">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="theme-icon-btn flex items-center justify-center w-10 h-10 rounded-xl text-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomeCard;
