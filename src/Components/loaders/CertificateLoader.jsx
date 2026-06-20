import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CyberpunkLoaderWrapper from "./CyberpunkLoaderWrapper";
import HolographicText from "./HolographicText";
import FloatingParticles from "./FloatingParticles";
import { ShieldCheck, Award, KeyRound, Cpu } from "lucide-react";

/**
 * CertificateLoader
 * Holographic credentials loader utilizing circular radar sweeps,
 * animated scanning laser highlights, and security check readouts.
 */
export default function CertificateLoader() {
  const [progress, setProgress] = useState(0);
  const radarCanvasRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    let frame;
    const update = () => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.38;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Radar circular sweeping canvas
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let angle = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.45;

      ctx.clearRect(0, 0, w, h);

      // Draw static radar rings
      ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweep gradient line
      if (!shouldReduce) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        sweepGrad.addColorStop(0, "rgba(16, 185, 129, 0.25)");
        sweepGrad.addColorStop(0.8, "rgba(16, 185, 129, 0.05)");
        sweepGrad.addColorStop(1, "rgba(16, 185, 129, 0)");

        ctx.fillStyle = sweepGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, -0.2, 0.2);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.restore();

        angle += 0.025;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduce]);

  return (
    <CyberpunkLoaderWrapper
      title="SECURE_CERT_AUTH"
      statusText="AUTHENTICATING"
      progress={progress}
      errorCode="0x0E99"
      className="min-h-[400px]"
    >
      <FloatingParticles count={20} />

      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 py-4 relative z-10">
        
        {/* Radar Telemetry Screen */}
        <div className="w-[170px] h-[170px] relative select-none bg-black/40 rounded-full border border-[var(--accent-border)] flex items-center justify-center">
          <canvas
            ref={radarCanvasRef}
            className="absolute inset-0 w-full h-full"
          />
          <div className="relative z-10 flex flex-col items-center">
            <Cpu className="w-8 h-8 text-[var(--accent-light)] animate-pulse" />
            <span className="text-[8px] font-mono text-[var(--accent-light)] mt-1.5">RADAR_LINK</span>
          </div>
        </div>

        {/* Secure 3D Cryptographic Badge Mockup */}
        <div className="perspective-1000 w-[240px] h-[160px] relative select-none">
          <motion.div
            animate={{
              rotateY: [15, -15, 15],
              rotateX: [8, -8, 8],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full rounded-2xl border border-[var(--accent-border)] bg-[var(--card-bg)] backdrop-blur-md p-4 flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.2)] relative overflow-hidden"
          >
            {/* Laser scanning bar */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-[var(--accent-light)] opacity-70 shadow-[0_0_8px_var(--accent-light)] z-10"
            />

            <div className="flex justify-between items-start text-[8px] font-mono text-[var(--accent-light)]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFY_CERTIFICATE
              </span>
              <Award className="w-4 h-4 text-[var(--accent-light)] animate-pulse" />
            </div>

            {/* Simulated credential elements */}
            <div className="flex flex-col gap-1.5 my-2">
              <div className="h-2 w-5/6 bg-[var(--accent-light)]/20 rounded" />
              <div className="h-1.5 w-2/3 bg-[var(--accent-light)]/10 rounded" />
              <div className="h-1.5 w-1/2 bg-[var(--accent-light)]/10 rounded" />
            </div>

            <div className="flex justify-between items-center text-[7px] font-mono text-[var(--text-muted)] border-t border-[var(--card-border)] pt-2">
              <span>SHA-256 MATCH</span>
              <span>VERIFIED: 100%</span>
            </div>
          </motion.div>
        </div>

        {/* Verification Status Console logs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left font-mono">
          <HolographicText text="VERIFYING CERTIFICATES..." className="mb-4" />

          <div className="flex flex-col gap-2 text-xs text-[var(--text-muted)] text-left">
            <div className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[var(--accent-light)] animate-pulse" />
              <span>[SECURE CONNECTED: OK]</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-light)]" />
              <span>[SHA256 SIGNATURES: OK]</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-[var(--accent-light)] animate-pulse">
              <span>[DECRYPTING CREDENTIAL DATA...]</span>
            </div>
          </div>
        </div>

      </div>
    </CyberpunkLoaderWrapper>
  );
}
