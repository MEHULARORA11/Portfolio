import React from "react";
import { FiDownload, FiPrinter, FiArrowLeft, FiGithub, FiLinkedin, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import PageWrapper from "../Components/shared/PageWrapper";

const Resume = () => {
  return (
    <PageWrapper>
      <div className="w-full flex flex-col items-center pt-24 pb-16 min-h-screen print:pt-0 print:pb-0 print:min-h-0">
        
        {/* Navigation & Action Controls (Hidden when printing) */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 print:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold theme-icon-btn active:scale-95"
          >
            <FiArrowLeft /> Back to Portfolio
          </Link>
          
          <div className="flex items-center gap-3">
            <a
              href="/resume/Mehul_Arora_Resume.pdf"
              download="Mehul_Arora_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold theme-btn active:scale-95 hover:shadow-[0_0_20px_var(--accent-glow)]"
            >
              <FiDownload className="text-base" /> Download PDF
            </a>
          </div>
        </div>

        {/* Resume Canvas Container */}
        <div className="w-full max-w-4xl glass-card rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[var(--card-border)] bg-[var(--card-bg)] print:bg-white print:text-black print:shadow-none print:border-none print:p-0 print:m-0 print:w-full print:max-w-none">
          
          {/* Print specific CSS stylesheet injection */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              @page {
                size: A4;
                margin: 0.6in !important;
              }
              body, html {
                background: white !important;
                color: black !important;
                min-height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              /* Hide everything else */
              nav, footer, .floating-tech, .grid-overlay, .print\\:hidden, #chatbot-container, .chatbot-panel, .chatbot-fab, button, a[href^="/resume/"] {
                display: none !important;
              }
              /* Remove all containers' padding & background shadow */
              .glass-card {
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              .theme-text, .theme-text-secondary, .theme-highlight, .theme-text-label, h1, h2, h3, h4, p, span, a, li {
                color: black !important;
                text-shadow: none !important;
              }
              .theme-divider {
                border-color: #d1d5db !important;
              }
              .print-divider {
                border-color: #9ca3af !important;
              }
              a {
                text-decoration: underline !important;
              }
            }
          `}} />

          {/* HEADER */}
          <div className="flex flex-col items-center text-center pb-6 border-b theme-divider">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight theme-text">
              MEHUL ARORA
            </h1>
            <p className="text-sm sm:text-base font-mono uppercase tracking-[0.15em] theme-text-secondary mt-2">
              Software Engineer
            </p>
            
            {/* Contact Information */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm theme-text-secondary font-mono">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-[var(--accent)] print:text-black" /> Faridabad, India
              </span>
              <a href="mailto:mehularora505@gmail.com" className="flex items-center gap-1.5 hover:text-[var(--accent-light)] transition-colors print:no-underline">
                <FiMail className="text-[var(--accent)] print:text-black" /> mehularora505@gmail.com
              </a>
              <a href="https://github.com/MEHULARORA11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--accent-light)] transition-colors print:no-underline">
                <FiGithub className="text-[var(--accent)] print:text-black" /> github.com/MEHULARORA11
              </a>
              <a href="https://www.linkedin.com/in/mehul-arora-32674b238/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--accent-light)] transition-colors print:no-underline">
                <FiLinkedin className="text-[var(--accent)] print:text-black" /> linkedin.com/in/mehul-arora-32674b238
              </a>
              <a href="https://mehularora.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--accent-light)] transition-colors print:no-underline">
                <FiGlobe className="text-[var(--accent)] print:text-black" /> mehularora.dev
              </a>
            </div>
          </div>

          {/* MAIN COLUMN LAYOUT */}
          <div className="flex flex-col gap-8 mt-8">
            
            {/* 1. PROFESSIONAL SUMMARY */}
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-[var(--accent-light)] print:text-black flex items-center gap-2 mb-1">
                Professional Summary
              </h2>
              <div className="border-b print-divider border-[var(--accent-border)] mb-3" />
              <p className="text-base leading-relaxed theme-text-secondary">
                Detail-oriented Full Stack Developer specializing in backend engineering, scalable systems, and real-time architectures. Experienced in building high-performance web applications using Node.js, Express, Redis, and WebSockets. Passionate about solving complex system-design problems, optimizing database queries, and creating modern, responsive user interfaces.
              </p>
            </div>

            {/* 2. TECHNICAL SKILLS */}
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-[var(--accent-light)] print:text-black flex items-center gap-2 mb-1">
                Technical Skills
              </h2>
              <div className="border-b print-divider border-[var(--accent-border)] mb-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                <div className="flex flex-col gap-1.5">
                  <p className="theme-text"><strong className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] print:text-black">Languages:</strong> JavaScript (ES6+), SQL, HTML5, CSS3</p>
                  <p className="theme-text"><strong className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] print:text-black">Backend & Tools:</strong> Node.js, Express, Redis, WebSockets, REST APIs, Git, npm</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="theme-text"><strong className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] print:text-black">Frontend:</strong> React.js, Tailwind CSS, Framer Motion, HTML, CSS</p>
                  <p className="theme-text"><strong className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] print:text-black">Databases:</strong> PostgreSQL, MongoDB, SQL</p>
                </div>
              </div>
            </div>

            {/* 3. PROJECTS */}
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-[var(--accent-light)] print:text-black flex items-center gap-2 mb-1">
                Projects
              </h2>
              <div className="border-b print-divider border-[var(--accent-border)] mb-4" />
              
              <div className="flex flex-col gap-6">
                {/* Project 1 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h3 className="text-base font-bold theme-text">
                      1 Million Checkboxes <span className="text-xs font-mono font-normal theme-text-secondary">| React, Node, Express, Redis, WebSockets</span>
                    </h3>
                    <div className="flex gap-3 text-xs font-mono">
                      <a href="https://github.com/MEHULARORA11/1-Million-CheckBoxes" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-light)] hover:underline print:text-black">GitHub</a>
                      <a href="https://checkboxes.mehularora.dev/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-light)] hover:underline print:text-black">Demo</a>
                    </div>
                  </div>
                  <ul className="list-disc pl-5 text-sm theme-text-secondary flex flex-col gap-1">
                    <li>Scaled a collaborative real-time grid application supporting 1 million checkboxes concurrently with sub-millisecond updates.</li>
                    <li>Integrated Redis for memory-efficient state management, pub-sub messaging, and rapid atomic key-value operations.</li>
                    <li>Architected WebSockets connection pooling and broadcast pipelines to manage thousands of concurrent client updates with minimal latency.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h3 className="text-base font-bold theme-text">
                      Custom Tailwind Compiler <span className="text-xs font-mono font-normal theme-text-secondary">| Node.js, npm, JavaScript, CSS</span>
                    </h3>
                    <div className="flex gap-3 text-xs font-mono">
                      <a href="https://www.npmjs.com/package/talwinder-ji-ki-css" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-light)] hover:underline print:text-black">npm</a>
                      <a href="https://github.com/MEHULARORA11/My-Custom-Tailwind" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-light)] hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc pl-5 text-sm theme-text-secondary flex flex-col gap-1">
                    <li>Developed and published `talwinder-ji-ki-css` on npm, a lightweight, utility-first CSS preprocessor.</li>
                    <li>Engineered an AST-like parser to compile dynamic utility classes into highly optimized static stylesheet maps.</li>
                    <li>Optimized asset sizes by purging unused classes, reducing compiled CSS bundles by over 40%.</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h3 className="text-base font-bold theme-text">
                      Tic Tac Toe & Web Games <span className="text-xs font-mono font-normal theme-text-secondary">| HTML5, CSS3, JavaScript (ES6)</span>
                    </h3>
                    <div className="flex gap-3 text-xs font-mono">
                      <a href="https://tic-tac-toe-game-nine-puce.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-light)] hover:underline print:text-black">Tic-Tac-Toe</a>
                      <a href="https://guessinggame.mehularora.dev/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-light)] hover:underline print:text-black">Guessing Game</a>
                    </div>
                  </div>
                  <ul className="list-disc pl-5 text-sm theme-text-secondary flex flex-col gap-1">
                    <li>Built responsive interactive web games in vanilla JavaScript, implementing custom logic for winning-path validation and optimized state flow.</li>
                    <li>Designed clean UI layouts utilizing CSS variables and modern responsive grids for seamless mobile and desktop cross-compatibility.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. EDUCATION */}
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-[var(--accent-light)] print:text-black flex items-center gap-2 mb-1">
                Education
              </h2>
              <div className="border-b print-divider border-[var(--accent-border)] mb-3" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h4 className="text-base font-bold theme-text">JC Bose UST (YMCA)</h4>
                  <p className="text-sm theme-text-secondary">Bachelor of Technology (B.Tech) in Computer Science & Engineering</p>
                </div>
                <div className="sm:text-right font-mono text-sm">
                  <p className="text-[var(--accent)] print:text-black font-semibold">Expected Graduation: June 2029</p>
                  <p className="theme-text-muted">Faridabad, India</p>
                </div>
              </div>
              <p className="text-sm theme-text-secondary mt-2">
                First-year coursework focuses on Computer Science foundations, database engineering, and algorithms.
              </p>
            </div>

            {/* 5. CERTIFICATIONS & ACHIEVEMENTS */}
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-[var(--accent-light)] print:text-black flex items-center gap-2 mb-1">
                Certifications & Achievements
              </h2>
              <div className="border-b print-divider border-[var(--accent-border)] mb-3" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h4 className="text-base font-bold theme-text">Zenith 5.0 Hackathon Certificate</h4>
                    <p className="text-sm theme-text-secondary">Participated in Zenith 5.0 hackathon at JC Bose UST, building real-time collaboration tools.</p>
                  </div>
                  <div className="sm:text-right font-mono text-sm">
                    <p className="text-[var(--accent)] print:text-black font-semibold">unstop.com</p>
                    <a 
                      href="https://unstop.com/certificate-preview/0716ff08-88eb-4294-b510-6e150945774c?utm_campaign=site-emails&utm_medium=d2c-automated&utm_source=wow-look-at-your-certificate-zenith-50" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-[var(--accent-light)] hover:underline mt-1 block print:hidden"
                    >
                      Verify Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageWrapper>
  );
};

export default Resume;
