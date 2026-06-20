import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * FloatingParticles
 * Interactive canvas particle system creating a holographic node constellation.
 */
export default function FloatingParticles({
  count = 35,
  particleColor = "rgba(52, 211, 153, 0.4)",
  lineColor = "rgba(16, 185, 129, 0.12)",
  maxDistance = 90,
  className = "",
}) {
  const canvasRef = useRef(null);
  const shouldReduce = useReducedMotion();
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates relative to canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const particles = [];
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        // parallax layers
        layer: Math.random() * 2 + 1, 
      });
    }

    // Animation Loop
    const animate = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // Render & Update Particles
      particles.forEach((p) => {
        // Move particles (unless reduced motion is active)
        if (!shouldReduce) {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary checks
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        // Apply mouse interaction (subtle magnetic pull/displacement)
        const dx = mousePosRef.current.x - p.x;
        const dy = mousePosRef.current.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let displayX = p.x;
        let displayY = p.y;

        if (distToMouse < 180 && !shouldReduce) {
          const force = (180 - distToMouse) / 180;
          displayX -= (dx / distToMouse) * force * 15 * p.layer;
          displayY -= (dy / distToMouse) * force * 15 * p.layer;
        }

        // Draw particle
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(displayX, displayY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow accent on larger particles
        if (p.size > 2.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(16, 185, 129, 0.6)";
          ctx.fillStyle = "rgba(110, 231, 183, 0.7)";
          ctx.beginPath();
          ctx.arc(displayX, displayY, p.size - 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Draw Connection Lines between close particles
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.85;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Apply mouse displacement to connection coordinates as well
            let d1x = p1.x;
            let d1y = p1.y;
            let d2x = p2.x;
            let d2y = p2.y;

            if (!shouldReduce) {
              const dx1 = mousePosRef.current.x - p1.x;
              const dy1 = mousePosRef.current.y - p1.y;
              const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
              if (dist1 < 180) {
                const force = (180 - dist1) / 180;
                d1x -= (dx1 / dist1) * force * 15 * p1.layer;
                d1y -= (dy1 / dist1) * force * 15 * p1.layer;
              }

              const dx2 = mousePosRef.current.x - p2.x;
              const dy2 = mousePosRef.current.y - p2.y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              if (dist2 < 180) {
                const force = (180 - dist2) / 180;
                d2x -= (dx2 / dist2) * force * 15 * p2.layer;
                d2y -= (dy2 / dist2) * force * 15 * p2.layer;
              }
            }

            // Alpha fades as particles drift apart
            const alpha = (1 - dist / maxDistance) * 0.4;
            ctx.strokeStyle = lineColor.replace(/[^,]+(?=\))/, alpha.toString());
            ctx.beginPath();
            ctx.moveTo(d1x, d1y);
            ctx.lineTo(d2x, d2y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, particleColor, lineColor, maxDistance, shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
