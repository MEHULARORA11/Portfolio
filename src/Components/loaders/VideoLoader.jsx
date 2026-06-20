import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CyberpunkLoaderWrapper from "./CyberpunkLoaderWrapper";
import HolographicText from "./HolographicText";
import FloatingParticles from "./FloatingParticles";
import NeonGrid from "./NeonGrid";
import { Play, Tv, Volume2 } from "lucide-react";

/**
 * VideoLoader
 * Cinematic media stream loader with equalizer bars, rotating 3D video card mockup, and technical HUD.
 */
export default function VideoLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const update = () => {
      setProgress((prev) => {
        if (prev >= 100) return 0; // loop progress simulation for continuous feel
        return prev + 0.35;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <CyberpunkLoaderWrapper
      title="MEDIA_CAPTURE_CORE"
      statusText="STREAMING_FEED"
      progress={progress}
      errorCode="0x0F52"
      className="min-h-[500px]"
    >
      {/* Immersive Background Nodes & Neon Grid */}
      <NeonGrid speed={0.9} gridColor="#10b981" />
      <FloatingParticles count={25} />

      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 py-4 relative z-10">
        
        {/* Holographic Rotating 3D Video Card Wireframe */}
        <div className="perspective-1000 w-[260px] h-[160px] relative select-none">
          <motion.div
            animate={{
              rotateY: [0, 15, -15, 0],
              rotateX: [12, -12, 12],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full rounded-2xl border border-[var(--accent-light)] bg-[var(--accent-muted)] backdrop-blur-md flex flex-col justify-between p-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            {/* Holographic Play Button Accent */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(30px)" }}>
              <div className="w-14 h-14 rounded-full border-2 border-[var(--accent-light)] bg-black/60 flex items-center justify-center animate-pulse">
                <Play className="w-6 h-6 text-[var(--accent-light)] fill-[var(--accent-light)] ml-1" />
              </div>
            </div>

            {/* Simulated UI items on card */}
            <div className="flex justify-between items-center text-[8px] font-mono text-[var(--accent-light)]">
              <span>CAPTURING_SIGNAL_01</span>
              <Tv className="w-3.5 h-3.5" />
            </div>
            
            <div className="flex flex-col gap-1 text-[8px] font-mono text-[var(--text-muted)]">
              <span className="w-2/3 h-1 bg-[var(--accent-light)]/20 rounded" />
              <span className="w-1/2 h-1 bg-[var(--accent-light)]/20 rounded" />
            </div>
          </motion.div>
        </div>

        {/* Diagnostic Metadata & Status Bars */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left font-mono">
          <HolographicText text="FETCHING VIDEOS..." className="mb-4" />
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-light)] animate-ping" />
              <span>STATION: YT_NODE_GLOBAL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>PROTOCOL: RTMP_SECURE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>RESOLUTION: 2160p_HDR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[var(--accent-light)] animate-pulse" />
              <span>CODEC: OPUS_STEREO</span>
            </div>
          </div>

          {/* Glowing Equalizer Bar Display */}
          <div className="flex items-end gap-1 h-12 mt-6 select-none">
            {[0.4, 0.9, 0.6, 1.2, 0.3, 0.8, 1.1, 0.5, 0.7, 0.4].map((delay, index) => (
              <motion.div
                key={index}
                animate={{ height: ["15%", "85%", "15%"] }}
                transition={{
                  duration: 1 + delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 bg-gradient-to-t from-[var(--accent)] to-[var(--accent-light)] rounded-t shadow-[0_0_6px_var(--accent)]"
              />
            ))}
          </div>
        </div>

      </div>
    </CyberpunkLoaderWrapper>
  );
}
