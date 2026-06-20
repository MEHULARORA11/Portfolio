import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * NeonGrid
 * Renders a GPU-accelerated 3D scrolling perspective grid using HTML5 Canvas.
 * Automatically halts animation if reduced motion is enabled or components are unmounted.
 */
export default function NeonGrid({ speed = 1.2, gridColor = "#10b981", className = "" }) {
  const canvasRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let offset = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop
    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Horizon line
      const horizonY = height * 0.3;
      const vanishingX = width / 2;

      // Draw gridlines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Longitudinal lines (vertical radiating lines)
      const numLongLines = 26;
      for (let i = 0; i <= numLongLines; i++) {
        // Map x to range [-1, 1] relative to center
        const ratio = (i / numLongLines) * 2 - 1;
        const startX = vanishingX + ratio * (width * 0.1); // closely packed at horizon
        const endX = vanishingX + ratio * (width * 1.5); // spread out at bottom

        const grad = ctx.createLinearGradient(startX, horizonY, endX, height);
        grad.addColorStop(0, "rgba(16, 185, 129, 0)");
        grad.addColorStop(0.5, "rgba(16, 185, 129, 0.22)");
        grad.addColorStop(1, "rgba(16, 185, 129, 0.55)");

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Latitudinal lines (horizontal depth-scaled lines)
      const numLatLines = 9;
      for (let i = 0; i < numLatLines; i++) {
        // Apply scrolling offset to depth calculation
        const scrollRatio = shouldReduce ? 0 : offset;
        const depth = ((i + scrollRatio) / numLatLines) % 1;

        // Exponential perspective mapping
        const y = horizonY + Math.pow(depth, 2) * (height - horizonY);

        // Fading intensity based on depth (closer to camera = brighter)
        const opacity = Math.pow(depth, 1.5) * 0.6;
        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.lineWidth = depth * 1.5;

        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Advance scroll offset
      if (!shouldReduce) {
        offset += speed * 0.005;
        if (offset >= 1) offset = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, gridColor, shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen ${className}`}
    />
  );
}
