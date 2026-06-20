import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CyberpunkLoaderWrapper from "./CyberpunkLoaderWrapper";
import HolographicText from "./HolographicText";
import FloatingParticles from "./FloatingParticles";
import NeonGrid from "./NeonGrid";
import { FolderGit2, GitBranch, GitPullRequest, Settings } from "lucide-react";

/**
 * ProjectLoader
 * Cinematic showcase project compilation screen with rotating 3D blueprints,
 * animated git tree visualizers, and code compilation stats.
 */
export default function ProjectLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const update = () => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.42;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <CyberpunkLoaderWrapper
      title="REPO_COMPILER_CORE"
      statusText="COMPILING"
      progress={progress}
      errorCode="0x0B44"
      className="min-h-[500px]"
    >
      {/* 3D Scrolling Perspective Grid and Constellation Nodes */}
      <NeonGrid speed={1.1} gridColor="#10b981" />
      <FloatingParticles count={28} />

      <div className="flex flex-col lg:flex-row items-center justify-around gap-10 py-6 relative z-10">
        
        {/* Floating 3D Holographic Project Card Blueprint */}
        <div className="perspective-1000 w-[270px] h-[170px] relative select-none">
          <motion.div
            animate={{
              rotateY: [-15, 15, -15],
              rotateX: [10, -10, 10],
              y: [6, -6, 6],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full rounded-2xl border border-[var(--accent-light)] bg-[var(--accent-muted)] backdrop-blur-md p-4 flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.22)] relative overflow-hidden"
          >
            {/* Blueprint Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:10px_10px] opacity-10 pointer-events-none" />

            <div className="flex justify-between items-center text-[9px] font-mono text-[var(--accent-light)]">
              <span className="flex items-center gap-1">
                <FolderGit2 className="w-3.5 h-3.5 animate-pulse" />
                WORKSPACE_SRC
              </span>
              <Settings className="w-3.5 h-3.5 animate-spin" />
            </div>

            {/* Glowing Tech Card Wireframe Graphics */}
            <div className="flex-grow flex items-center justify-around my-2">
              <div className="w-12 h-12 rounded-lg border-2 border-dashed border-[var(--accent-light)]/40 flex items-center justify-center">
                <GitBranch className="w-6 h-6 text-[var(--accent-light)]" />
              </div>
              <div className="flex flex-col gap-1.5 w-1/2">
                <span className="h-2 w-full bg-[var(--accent-light)]/20 rounded" />
                <span className="h-1.5 w-5/6 bg-[var(--accent-light)]/10 rounded" />
                <span className="h-1.5 w-2/3 bg-[var(--accent-light)]/10 rounded" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[7px] font-mono text-[var(--text-muted)] border-t border-[var(--card-border)] pt-2">
              <span>TARGET: DIST_BUILD</span>
              <span>ERRORS: 0</span>
            </div>
          </motion.div>
        </div>

        {/* Diagnostics & Holographic Stats */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left font-mono">
          <HolographicText text="COMPILING PROJECTS..." className="mb-4" />
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-[var(--accent-light)] animate-pulse" />
              <span>BRANCH: MAIN</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitPullRequest className="w-4 h-4 text-[var(--accent-light)]" />
              <span>COMMITS: INDEXED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>ENVIRONMENT: VITE_V7</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>OPTIMIZER: ESBUILD</span>
            </div>
          </div>

          <div className="mt-6 px-3.5 py-2 border border-[var(--accent-border)] bg-[var(--accent-muted)] rounded-xl max-w-[290px] text-[10px] text-zinc-400 text-left leading-relaxed">
            <span className="text-[var(--accent-light)] font-bold block mb-1">COMPILER_STATUS:</span>
            Indexing project repositories, resolving dependencies, resolving AST tree mapping, compiling Tailwind design directives.
          </div>
        </div>

      </div>
    </CyberpunkLoaderWrapper>
  );
}
