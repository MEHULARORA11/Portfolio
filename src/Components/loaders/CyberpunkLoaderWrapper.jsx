import React from "react";
import { motion } from "framer-motion";

/**
 * CyberpunkLoaderWrapper
 * Provides a futuristic diagnostic container with corner brackets,
 * active scanlines, glow overlays, and diagnostic metadata.
 */
export default function CyberpunkLoaderWrapper({
  children,
  title = "DIAGNOSTIC",
  statusText = "RUNNING",
  progress = 0,
  errorCode = "0x00A7",
  className = "",
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[32px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-2xl ${className}`}
      style={{
        boxShadow: "inset 0 0 30px rgba(16, 185, 129, 0.05)",
      }}
    >
      {/* Laser Scanning Line */}
      <motion.div
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-light)] to-transparent opacity-40 blur-[1px] pointer-events-none z-10"
      />

      {/* Cyberpunk Tech Corner Brackets */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-light)] opacity-70 pointer-events-none" />
      {/* Top Right */}
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-light)] opacity-70 pointer-events-none" />
      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-light)] opacity-70 pointer-events-none" />
      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-light)] opacity-70 pointer-events-none" />

      {/* Grid Pattern Mesh Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" 
      />

      {/* Header Diagnostic Line */}
      <div className="relative flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest text-[var(--accent-light)] border-b border-[var(--card-border)] pb-3 mb-6 select-none opacity-80">
        <div className="flex items-center gap-2">
          {/* Pulsing indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span>SYS_INIT // {title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[var(--text-muted)]">ERR_CODE: {errorCode}</span>
          <span className="px-2 py-0.5 rounded border border-[var(--accent-border)] bg-[var(--accent-muted)] font-bold text-[10px] animate-pulse">
            {statusText}
          </span>
        </div>
      </div>

      {/* Center content slot */}
      <div className="relative flex-grow flex flex-col justify-center z-10">
        {children}
      </div>

      {/* Footer Status Indicators */}
      <div className="relative flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 text-[10px] font-mono text-[var(--text-muted)] mt-6 border-t border-[var(--card-border)] pt-3 select-none opacity-80">
        <div className="flex justify-between sm:justify-start items-center gap-3">
          <span>BUFF_STREAMING</span>
          <div className="w-24 h-1.5 bg-black/40 rounded overflow-hidden border border-[var(--card-border)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            />
          </div>
          <span className="text-[var(--accent-light)] font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="flex justify-between sm:justify-end items-center gap-4">
          <span>RATE: {(Math.random() * 5 + 8).toFixed(1)} MB/S</span>
          <span>FPS: 60.00</span>
        </div>
      </div>
    </div>
  );
}
