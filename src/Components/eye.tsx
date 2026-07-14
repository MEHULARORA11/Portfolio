import { useEffect, useRef, useState, useId } from "react";

/**
 * EyeViewCounter
 * ---------------
 * A cursor-tracking eye with a live "visitor" readout.
 * Adapts to both vertical and horizontal layouts, and uses theme CSS variables.
 *
 * PROPS
 * -----
 * count               number | null   the value to display (null/undefined -> shows "···")
 * label               string          small caption under/beside the number, default "VISITORS"
 * loading             boolean         shows a pulsing placeholder instead of the number
 * size                number          eye diameter in px, default 40
 * layout              "vertical" | "horizontal"
 */
export default function EyeViewCounter({
  count = null,
  label = "VISITORS",
  loading = false,
  size = 40,
  layout = "horizontal",
}) {
  const eyeRef = useRef(null);
  const id = useId();
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

  const isHorizontal = layout === "horizontal";

  // Sanitize React dynamic IDs for HTML selector compatibility
  const safeId = id.replace(/:/g, "-");

  return (
    <div
      className={`glass-card flex ${
        isHorizontal ? "flex-row items-center gap-2.5 px-3 py-1.5" : "flex-col items-center gap-2 p-3 pb-3.5"
      } rounded-xl transition-all duration-300 w-fit shrink-0`}
      style={{
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
            <radialGradient id={`scleraGrad-${safeId}`} cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f3f6f4" />
              <stop offset="100%" stopColor="#cfdad4" />
            </radialGradient>
            <radialGradient id={`irisGrad-${safeId}`} cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="var(--accent-light)" />
              <stop offset="45%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-dark)" />
            </radialGradient>
            <radialGradient id={`irisGrad2-${safeId}`} cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="var(--accent-light)" />
              <stop offset="45%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-dark)" />
            </radialGradient>
            <filter id={`glow-${safeId}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={`eyeClip-${safeId}`}>
              <path d="M 8 100 Q 100 30 192 100 Q 100 170 8 100 Z" />
            </clipPath>
          </defs>

          {/* Outer glow ring */}
          <path
            d="M 4 100 Q 100 24 196 100 Q 100 176 4 100 Z"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.25"
            strokeWidth="10"
            filter={`url(#glow-${safeId})`}
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
              fill={`url(#scleraGrad-${safeId})`}
              stroke="var(--card-border)"
              strokeWidth="2"
            />

            <g clipPath={`url(#eyeClip-${safeId})`}>
              {/* Iris + pupil, offset toward cursor */}
              <g
                style={{
                  transform: `translate(${pupil.x}px, ${pupil.y}px)`,
                  transition: "transform 60ms linear",
                }}
              >
                <circle cx="100" cy="100" r="38" fill={`url(#irisGrad2-${safeId})`} />
                <circle
                  cx="100"
                  cy="100"
                  r="38"
                  fill="none"
                  stroke="var(--accent-light)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />
                <circle cx="100" cy="100" r="17" fill="#000000" />
                <circle cx="100" cy="100" r="17" fill="#050806" fillOpacity="0.9" />
                {/* light glint */}
                <circle cx="90" cy="88" r="6" fill="#ffffff" fillOpacity="0.85" />
                <circle cx="112" cy="108" r="2.4" fill="var(--accent-light)" fillOpacity="0.6" />
              </g>
            </g>

            {/* Upper lid line for definition */}
            <path
              d="M 8 100 Q 100 30 192 100"
              fill="none"
              stroke="var(--accent-dark)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <div className={`flex flex-col ${isHorizontal ? "items-start" : "items-center text-center"}`}>
        <div
          style={{
            fontSize: isHorizontal ? size * 0.32 : size * 0.24,
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: loading ? "var(--text-muted)" : "var(--accent-light)",
            textShadow: loading
              ? "none"
              : "0 0 18px var(--accent-glow), 0 0 2px var(--accent-light)",
            animation: loading ? "evc-pulse 1.4s ease-in-out infinite" : "none",
          }}
        >
          {loading ? "···" : formatted}
        </div>
        <div
          style={{
            marginTop: isHorizontal ? 2 : 4,
            fontSize: isHorizontal ? size * 0.20 : 9,
            letterSpacing: "0.18em",
            color: "var(--text-label)",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}