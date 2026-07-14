import { useEffect, useRef, useState } from "react";

/**
 * EyeViewCounter
 * ---------------
 * A cursor-tracking eye with a live "visitor" readout beneath it.
 * Built to sit on a dark, blueprint / systems-engineering style page.
 *
 * CONTROLLING THE COUNT
 * ----------------------
 * The number is fully controlled from the outside — this component never
 * invents data. Three ways to drive it:
 *
 * 1) Static, you manage the number yourself:
 *      <EyeViewCounter count={1287} />
 *
 * 2) Local state, for a quick demo / prototype:
 *      const [count, setCount] = useState(1287);
 *      <EyeViewCounter count={count} onRequestIncrement={() => setCount(c => c + 1)} />
 *
 * 3) Real backend (recommended for production):
 *      useEffect(() => {
 *        fetch("/api/views", { method: "POST" })
 *          .then(r => r.json())
 *          .then(data => setCount(data.total));
 *      }, []);
 *      <EyeViewCounter count={count} loading={count === null} />
 *
 * PROPS
 * -----
 * count               number | null   the value to display (null/undefined -> shows "···")
 * label               string          small caption under the number, default "VISITORS"
 * loading             boolean         shows a pulsing placeholder instead of the number
 * size                number          eye diameter in px, default 160
 */
export default function EyeViewCounter({
  count = null,
  label = "VISITORS",
  loading = false,
  size = 160,
}) {
  const eyeRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [displayCount, setDisplayCount] = useState(count ?? 0);

  // Pupil follows the cursor (or a gentle idle drift on touch devices)
  useEffect(() => {
    const maxOffset = size * 0.11;

    function handlePointerMove(e) {
      const el = eyeRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const clamped = Math.min(dist, 120);
      setPupil({
        x: (dx / dist) * (clamped / 120) * maxOffset,
        y: (dy / dist) * (clamped / 120) * maxOffset,
      });
    }

    let driftT = 0;
    let raf;
    function idleDrift() {
      driftT += 0.015;
      setPupil((p) =>
        window.matchMedia("(pointer: fine)").matches
          ? p
          : { x: Math.sin(driftT) * size * 0.06, y: Math.cos(driftT * 0.7) * size * 0.04 }
      );
      raf = requestAnimationFrame(idleDrift);
    }

    window.addEventListener("pointermove", handlePointerMove);
    idleDrift();
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(raf);
    };
  }, [size]);

  // Natural, irregular blinking
  useEffect(() => {
    let timeout;
    function scheduleBlink() {
      const delay = 2600 + Math.random() * 3200;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, delay);
    }
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Smoothly count up/down toward the real value whenever it changes
  useEffect(() => {
    if (count === null || count === undefined) return;
    if (count === displayCount) return;
    const start = displayCount;
    const end = count;
    const diff = end - start;
    const steps = Math.min(Math.abs(diff), 30) || 1;
    const stepDur = 420 / steps;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      const t = i / steps;
      setDisplayCount(Math.round(start + diff * t));
      if (i >= steps) clearInterval(id);
    }, stepDur);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const formatted =
    count === null || count === undefined
      ? "···"
      : displayCount.toLocaleString("en-US");

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "28px 34px",
        borderRadius: 20,
        background:
          "radial-gradient(120% 140% at 50% 0%, #0b1220 0%, #05070d 60%, #030509 100%)",
        border: "1px solid rgba(84, 138, 255, 0.16)",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.4), 0 20px 60px -20px rgba(0, 60, 160, 0.35)",
        fontFamily:
          "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
      }}
    >
      <div
        ref={eyeRef}
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <radialGradient id="scleraGrad" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#eef3ff" />
              <stop offset="70%" stopColor="#d7e2f7" />
              <stop offset="100%" stopColor="#aebedd" />
            </radialGradient>
            <radialGradient id="irisGrad" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#7fc4ff" />
              <stop offset="45%" stopColor="#2f7fe0" />
              <stop offset="100%" stopColor="#0b2145" />
            </radialGradient>
            <radialGradient id="irisGrad2" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#8fd0ff" />
              <stop offset="45%" stopColor="#2b6fd1" />
              <stop offset="100%" stopColor="#0a1e3d" />
            </radialGradient>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="eyeClip">
              <path d="M 8 100 Q 100 30 192 100 Q 100 170 8 100 Z" />
            </clipPath>
          </defs>

          {/* Outer glow ring */}
          <path
            d="M 4 100 Q 100 24 196 100 Q 100 176 4 100 Z"
            fill="none"
            stroke="#3b82f6"
            strokeOpacity="0.22"
            strokeWidth="10"
            filter="url(#glow)"
          />

          {/* Eyelids open/close via vertical scale for blink */}
          <g
            style={{
              transformOrigin: "100px 100px",
              transform: blink ? "scaleY(0.06)" : "scaleY(1)",
              transition: "transform 110ms ease-in-out",
            }}
          >
            {/* Eye shape (sclera) */}
            <path
              d="M 8 100 Q 100 30 192 100 Q 100 170 8 100 Z"
              fill="url(#scleraGrad)"
              stroke="#4c6ea8"
              strokeWidth="2"
            />

            <g clipPath="url(#eyeClip)">
              {/* Iris + pupil, offset toward cursor */}
              <g
                style={{
                  transform: `translate(${pupil.x}px, ${pupil.y}px)`,
                  transition: "transform 60ms linear",
                }}
              >
                <circle cx="100" cy="100" r="38" fill="url(#irisGrad2)" />
                <circle
                  cx="100"
                  cy="100"
                  r="38"
                  fill="none"
                  stroke="#9fdcff"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />
                <circle cx="100" cy="100" r="17" fill="#020814" />
                <circle cx="100" cy="100" r="17" fill="#040d1c" fillOpacity="0.9" />
                {/* light glint */}
                <circle cx="90" cy="88" r="6" fill="#ffffff" fillOpacity="0.85" />
                <circle cx="112" cy="108" r="2.4" fill="#bfe4ff" fillOpacity="0.6" />
              </g>
            </g>

            {/* Upper lid line for definition */}
            <path
              d="M 8 100 Q 100 30 192 100"
              fill="none"
              stroke="#5a7dbd"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: size * 0.24,
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: loading ? "#5a7db0" : "#bfe4ff",
            textShadow: loading
              ? "none"
              : "0 0 18px rgba(90, 170, 255, 0.55), 0 0 2px rgba(190, 228, 255, 0.9)",
            animation: loading ? "evc-pulse 1.4s ease-in-out infinite" : "none",
          }}
        >
          {loading ? "···" : formatted}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            letterSpacing: "0.32em",
            color: "#5a7db0",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      </div>

      <style>{`
        @keyframes evc-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}