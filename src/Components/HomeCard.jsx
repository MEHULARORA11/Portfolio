import React, { useState, useEffect, useRef } from "react";
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
  const [roleIndex,    setRoleIndex]    = useState(0);
  const [orbitPaused,  setOrbitPaused]  = useState(false);
  const cardRef = useRef(null);

  /* Rotate roles every 2.5 s */
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  /* ── 3-D tilt handlers ── */
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    const tiltX = ((height / 2 - y) / (height / 2)) * 10;
    const tiltY = ((x - width  / 2) / (width  / 2)) * 10;
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.boxShadow = "0 30px 60px -15px var(--accent-glow), 0 0 50px var(--accent-glow-soft)";
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
  const handleCardEnter = () => { if (cardRef.current) cardRef.current.style.transition = "none"; };
  const handleCardLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "all 0.5s cubic-bezier(0.25,1,0.5,1)";
      card.style.transform  = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      card.style.boxShadow  = "0 15px 35px -10px var(--accent-glow-soft)";
    }
  };

  /* animation play state string */
  const playState = orbitPaused ? "paused" : "running";

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 justify-between items-center min-h-[85vh] pt-24 pb-12 mb-20 lg:mb-36">

      {/* ── Left: Bio ── */}
      <div data-aos="fade-right" className="flex flex-col gap-6 lg:w-[55%] w-full">
        <div className="flex flex-col gap-2">
          {/* Available badge */}
          <div className="flex items-center gap-2 mb-2 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-light)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-sm text-[var(--accent-light)] font-semibold">Available for work</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight theme-text"
              style={{ textShadow: "0 0 22px var(--name-glow)" }}>
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
            className="theme-btn flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base active:scale-95 hover:shadow-[0_0_20px_var(--accent-glow)]"
          >
            <FiDownload className="text-lg animate-bounce" style={{ animationDuration: "2s" }} />
            Download Resume
          </a>
          <Link to="/resume"
            className="theme-icon-btn flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base active:scale-95 hover:shadow-[0_0_15px_var(--accent-glow-soft)]"
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
              className="glass-card p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 hover:shadow-[0_0_15px_var(--accent-glow-soft)] transition-all duration-300 relative group overflow-hidden border-[var(--card-border)] bg-[var(--card-bg)]"
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

      {/* ── Right: Profile + Orbit ── */}
      <div data-aos="fade-left"
        className="w-full lg:w-[40%] flex justify-center items-center"
        style={{ perspective: "1200px" }}
      >
        {/*
          ╔══════════════════════════════════════════════════════╗
          ║  ORBIT STAGE                                         ║
          ║  • Uses CSS custom props --orbit-r, --card-sz,       ║
          ║    --stage-sz, --icon-sz set in index.css per bp.    ║
          ║  • overflow:visible so icons are never clipped.      ║
          ║  • onMouseEnter/Leave pauses all icon animations.    ║
          ╚══════════════════════════════════════════════════════╝
        */}
        <div
          className="orbit-stage"
          onMouseEnter={() => setOrbitPaused(true)}
          onMouseLeave={() => setOrbitPaused(false)}
        >

          {/* Dashed orbit ring (decorative) */}
          <div className="orbit-ring-deco" aria-hidden="true" />

          {/*
            Each icon sits at its initial angle (0°, 120°, 240°) on the ring.
            The icon itself has:
              • a CSS rotation to place it on the circle: rotate(Ndeg) translateY(-var(--orbit-r))
              • socialOrbit animation to spin the whole circle
              • socialOrbitReverse to counter-spin the icon bubble so it stays upright
          */}
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }, i) => {
            /* Negative delay staggers icons 120° apart around the ring:
               icon 0 → 0s delay (starts at top)
               icon 1 → -4.67s delay (starts 120° = 1/3 through the animation)
               icon 2 → -9.33s delay (starts 240° = 2/3 through the animation) */
            const delay = `${-((14 / 3) * i).toFixed(2)}s`;
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="orbit-icon-arm"
                style={{
                  animationDelay:      delay,
                  animationPlayState:  playState,
                }}
              >
                <span
                  className="orbit-icon-bubble"
                  style={{
                    animationDelay:     delay,
                    animationPlayState: playState,
                  }}
                >
                  <Icon className="orbit-icon-svg" />
                </span>
              </a>
            );
          })}

          {/* Profile Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            className="orbit-profile-card group relative glass-card rounded-[2.5rem] flex items-center justify-center cursor-pointer border-[var(--card-border)] bg-[var(--card-bg)]"
            style={{
              transform:      "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
              transition:     "all 0.5s cubic-bezier(0.25,1,0.5,1)",
              transformStyle: "preserve-3d",
              boxShadow:      "0 15px 35px -10px var(--accent-glow-soft)",
              overflow:       "hidden",
              zIndex:         2,
              padding:        "1rem",
            }}
          >
            {/* Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{ background: "radial-gradient(200px circle at var(--mouse-x,50%) var(--mouse-y,50%), var(--accent-glow-soft), transparent 80%)" }}
            />
            {/* Image */}
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative"
                 style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
              <img src={myImg} alt="Mehul Arora" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Status badge */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/40 border-white/10 backdrop-blur-md"
                 style={{ transform: "translateZ(50px)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] text-emerald-300 font-mono uppercase tracking-wider font-bold">Open for projects</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HomeCard;
