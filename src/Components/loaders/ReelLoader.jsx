import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CyberpunkLoaderWrapper from "./CyberpunkLoaderWrapper";
import HolographicText from "./HolographicText";
import FloatingParticles from "./FloatingParticles";
import { Sparkles, Heart, Share2, MessageCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

/**
 * ReelLoader
 * Vibrant animated social media inspired loader featuring a floating 3D smartphone simulator,
 * vertical layout shimmers, and neon sparks.
 */
export default function ReelLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const update = () => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.45;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <CyberpunkLoaderWrapper
      title="SOCIAL_STREAM_CORE"
      statusText="STREAMING_REELS"
      progress={progress}
      errorCode="0x0E82"
      className="min-h-[500px]"
    >
      {/* Sparkles Particle Stream */}
      <FloatingParticles
        count={30}
        particleColor="rgba(236, 72, 153, 0.4)" // Pink social accent particles
        lineColor="rgba(236, 72, 153, 0.08)"
        maxDistance={70}
      />

      <div className="flex flex-col md:flex-row items-center justify-around gap-10 py-6 relative z-10">
        
        {/* Floating 3D Smartphone Outline Mockup */}
        <div className="perspective-1000 w-[190px] h-[340px] relative select-none">
          <motion.div
            animate={{
              rotateY: [15, -15, 15],
              rotateX: [-10, 10, -10],
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full rounded-[38px] border-[5px] border-zinc-800 bg-black/80 flex flex-col justify-between p-3.5 shadow-[0_0_35px_rgba(236,72,153,0.25)] relative"
          >
            {/* Phone Notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-zinc-800 rounded-full z-20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
            </div>

            {/* Glowing Border Sweep */}
            <div className="absolute inset-[-1px] rounded-[34px] border border-pink-500/40 pointer-events-none animate-pulse" />

            {/* Header Content */}
            <div className="flex justify-between items-center text-[7px] font-mono text-zinc-400 mt-2">
              <span className="flex items-center gap-1 text-pink-400">
                <FaInstagram className="w-2.5 h-2.5 animate-spin" />
                @reels
              </span>
              <span>LIVE_CAPTURE</span>
            </div>

            {/* Inner Video Layout Shimmer Mockup */}
            <div className="flex-grow flex flex-col justify-end gap-3 pb-2 mt-4">
              {/* Skeleton content lines */}
              <div className="flex flex-col gap-1.5 w-3/4">
                <div className="h-2 w-full bg-gradient-to-r from-pink-500/20 via-indigo-500/20 to-pink-500/20 rounded animate-pulse" />
                <div className="h-1.5 w-4/5 bg-zinc-800 rounded" />
                <div className="h-1.5 w-2/3 bg-zinc-800 rounded" />
              </div>

              {/* Interaction Bar Skeleton */}
              <div className="flex gap-2.5 text-zinc-500">
                <Heart className="w-3.5 h-3.5 text-pink-500/60 animate-pulse" />
                <MessageCircle className="w-3.5 h-3.5" />
                <Share2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Diagnostics & Holographic Stats */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left font-mono">
          <HolographicText text="STREAMING REELS..." className="mb-4" />
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>LOG: ENCODING_MP4</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>ASPECT: 9:16_VERTICAL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>FPS: 60.00_TARGET</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>SOURCE: SOCIAL_NODE</span>
            </div>
          </div>

          <div className="mt-8 px-4 py-2 border border-pink-500/20 bg-pink-500/5 rounded-xl max-w-[280px] text-[10px] text-zinc-400 text-left leading-normal">
            <span className="text-pink-400 font-bold block mb-1">SYSTEM_FEEDback:</span>
            Indexing short-form vertical tutorials & developer tips. Fetching thumbnails, tags, and interactive playback buffers.
          </div>
        </div>

      </div>
    </CyberpunkLoaderWrapper>
  );
}
