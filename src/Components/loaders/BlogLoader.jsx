import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CyberpunkLoaderWrapper from "./CyberpunkLoaderWrapper";
import HolographicText from "./HolographicText";
import FloatingParticles from "./FloatingParticles";
import { Terminal, BookOpen, HardDrive } from "lucide-react";

/**
 * BlogLoader
 * Elegant editorial tech loader containing a scrolling digital data stream background,
 * shimmering paragraph card templates, and high-tech file reading diagnostics.
 */
export default function BlogLoader() {
  const [progress, setProgress] = useState(0);
  const matrixCanvasRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    let frame;
    const update = () => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.4;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Digital Stream Rain Effect (Matrix style)
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cols = Math.floor(canvas.width / 16);
    const ypos = Array(cols).fill(0);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(3, 20, 14, 0.15)"; // matches dark background with alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(16, 185, 129, 0.25)"; // dim emerald
      ctx.font = "10px monospace";

      ypos.forEach((y, ind) => {
        // Random hex chars
        const text = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        const x = ind * 16;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[ind] = 0;
        } else {
          ypos[ind] = y + 12;
        }
      });
    };

    const render = () => {
      if (!shouldReduce) {
        drawMatrix();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduce]);

  return (
    <CyberpunkLoaderWrapper
      title="FS_READER_CORE"
      statusText="INDEXING_BLOGS"
      progress={progress}
      errorCode="0x0A9F"
      className="min-h-[400px]"
    >
      {/* Matrix Code Stream Background */}
      <canvas
        ref={matrixCanvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none mix-blend-screen"
      />
      <FloatingParticles count={15} />

      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 py-4 relative z-10">
        
        {/* Floating Article Card Skeletal Outline */}
        <div className="perspective-1000 w-full max-w-[340px] h-[190px] relative select-none">
          <motion.div
            animate={{
              rotateX: [6, -6, 6],
              rotateY: [-8, 8, -8],
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full rounded-2xl border border-[var(--accent-border)] bg-[var(--card-bg)] backdrop-blur-md p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.15)]"
          >
            {/* Holographic lines */}
            <div className="flex justify-between items-center text-[9px] font-mono text-[var(--accent-light)]">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                BLOG_DEEP_DIVE.md
              </span>
              <span>READING...</span>
            </div>

            {/* Shimmering Text Skeletons */}
            <div className="flex flex-col gap-2.5 my-3">
              <div className="h-3 w-5/6 bg-gradient-to-r from-[var(--accent)]/30 via-[var(--accent-light)]/20 to-[var(--accent)]/30 rounded animate-pulse" />
              <div className="h-2 w-full bg-[var(--accent-light)]/10 rounded" />
              <div className="h-2 w-11/12 bg-[var(--accent-light)]/10 rounded" />
              <div className="h-2 w-2/3 bg-[var(--accent-light)]/10 rounded" />
            </div>

            <div className="flex justify-between items-center text-[8px] font-mono text-[var(--text-muted)] border-t border-[var(--card-border)] pt-2">
              <span>WORDS: 2450</span>
              <span>READ_TIME: 8 MIN</span>
            </div>
          </motion.div>
        </div>

        {/* Diagnostics logs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left font-mono">
          <HolographicText text="LOADING ARTICLES..." className="mb-4" />

          <div className="flex flex-col gap-2 text-xs text-[var(--text-muted)] text-left">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-light)] animate-pulse" />
              <span>LOG: QUERYING_MARKDOWN_REPOS</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-[var(--accent-light)]" />
              <span>BUFF: PARSING_FRONTMATTER_BLOCKS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-[var(--accent-light)] animate-ping" />
              <span>SYS: RENDER_60FPS_ENGINE</span>
            </div>
          </div>
        </div>

      </div>
    </CyberpunkLoaderWrapper>
  );
}
