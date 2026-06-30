import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

// ─── static values at module scope ───
const symbolSet = [
  "{",
  "}",
  "<",
  "/>",
  ";",
  "(",
  ")",
  "=>",
  "#",
  "01",
  "const",
  "[]",
];

// ─── pure helper function at module scope ───
const generateCodeLines = (safeName, safeTagline) => [
  [
    {
      t: "// booting up the portfolio",
      c: "comment",
    },
  ],
  [
    {
      t: "const ",
      c: "keyword",
    },
    {
      t: "developer",
      c: "variable",
    },
    {
      t: " = {",
      c: "punct",
    },
  ],
  [
    {
      t: "  name: ",
      c: "property",
    },
    {
      t: `"${safeName}",`,
      c: "string",
    },
  ],
  [
    {
      t: "  role: ",
      c: "property",
    },
    {
      t: `"${safeTagline}",`,
      c: "string",
    },
  ],
  [
    {
      t: "  what_i_do: ",
      c: "property",
    },
    {
      t: `"I Make Servers Communicate",`,
      c: "string",
    },
  ],
  [
    {
      t: "};",
      c: "punct",
    },
  ],
  [
    {
      t: "",
      c: "plain",
    },
  ],
  [
    {
      t: "export default function ",
      c: "keyword",
    },
    {
      t: "Welcome",
      c: "func",
    },
    {
      t: "() {",
      c: "punct",
    },
  ],
  [
    {
      t: "  return (",
      c: "punct",
    },
  ],
  [
    {
      t: "    <h1>",
      c: "tag",
    },
    {
      t: `Hi, I'm ${safeName} — welcome to my portfolio`,
      c: "plain",
    },
    {
      t: "</h1>",
      c: "tag",
    },
  ],
  [
    {
      t: "  );",
      c: "punct",
    },
  ],
  [
    {
      t: "}",
      c: "punct",
    },
  ],
];

// ─── custom hook for progress simulation ───
const useProgress = (duration, isControlled, controlledProgress) => {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (isControlled) return;

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const pct = Math.min(
        100,
        Math.round(((now - start) / duration) * 100)
      );

      setInternalProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [duration, isControlled]);

  const progress = isControlled
    ? Math.min(100, Math.max(0, controlledProgress))
    : internalProgress;

  return progress;
};

// ─── pure theme generator helper ───
const getThemeStyles = (isDark) => {
  const fb = {
    bg1: isDark ? "#030303" : "#f4f9f5",
    bg2: isDark ? "#08080a" : "#e2ede6",
    border: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(11, 108, 83, 0.12)",
    accent: isDark ? "#00ff66" : "#0b6c53",
    glow: isDark ? "rgba(0, 255, 102, 0.3)" : "rgba(11, 108, 83, 0.15)",
  };

  const editor = isDark
    ? {
        panel: "#08080a",
        gutter: "rgba(0,0,0,0.22)",
        tabActive: "#0f0f13",
        chromeText: "#52525b",
      }
    : {
        panel: "#ffffff",
        gutter: "rgba(0,0,0,0.035)",
        tabActive: "#f4f9f5",
        chromeText: "#6e7781",
      };

  const syn = isDark
    ? {
        comment: "#52525b",
        keyword: "#00ff66",
        variable: "#a1a1aa",
        property: "#34d399",
        string: "#10b981",
        punct: "#71717a",
        func: "#6ee7b7",
        tag: "#34d399",
        plain: "#e4e4e7",
        success: "#00ff66",
      }
    : {
        comment: "#8b949e",
        keyword: "#0b6c53",
        variable: "#1f6feb",
        property: "#0d9488",
        string: "var(--accent, #0d9488)",
        punct: "#57606a",
        func: "#b35900",
        tag: "#cf222e",
        plain: "#1f2328",
        success: "#1a7f37",
      };

  return { fb, editor, syn };
};

// ─── pure visible lines calculator helper ───
const calculateVisibleLines = (codeLines, revealTarget, buildComplete) => {
  let budget = revealTarget;
  let cursorPlaced = false;
  const visibleLines = [];

  for (let li = 0; li < codeLines.length; li++) {
    const tokens = codeLines[li];
    const visibleTokens = [];
    let lineComplete = true;

    for (const tok of tokens) {
      if (budget <= 0) {
        lineComplete = false;
        break;
      }

      if (tok.t.length <= budget) {
        visibleTokens.push(tok);
        budget -= tok.t.length;
      } else {
        visibleTokens.push({
          ...tok,
          t: tok.t.slice(0, budget),
        });
        budget = 0;
        lineComplete = false;
      }
    }

    const showCursorHere =
      !cursorPlaced && !lineComplete && !buildComplete;

    if (showCursorHere) {
      cursorPlaced = true;
    }

    visibleLines.push({
      tokens: visibleTokens,
      showCursor: showCursorHere,
    });

    budget -= 1;
    if (budget < 0) {
      budget = 0;
    }
  }

  return visibleLines;
};

// ─── ParticlesBackground Component ───
const ParticlesBackground = ({ particles, fb }) => (
  <div
    className="absolute inset-0"
    style={{
      background: `radial-gradient(circle at 50% 38%, ${fb.bg2}, ${fb.bg1} 72%)`,
    }}
  >
    {particles.map((p) => (
      <span
        key={p.id}
        className="plo-particle absolute font-mono"
        style={{
          left: `${p.left}%`,
          top: `${p.top}%`,
          fontSize: p.size,
          color: fb.accent,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
        }}
      >
        {p.symbol}
      </span>
    ))}
  </div>
);

// ─── CodeEditorWindow Component ───
const CodeEditorWindow = ({
  tilt,
  editor,
  fb,
  visibleLines,
  lineHeight,
  syn,
  buildComplete,
  progress,
}) => (
  <div
    style={{
      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      transition: "transform 0.3s ease-out",
      transformStyle: "preserve-3d",
    }}
  >
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        width: "min(90vw, 540px)",
        background: editor.panel,
        border: `1px solid ${fb.border}`,
        boxShadow: `0 30px 60px -20px rgba(0,0,0,0.5), 0 0 50px ${fb.glow}`,
      }}
    >
      {/* top bar */}
      <div
        className="flex items-center gap-2 px-4"
        style={{
          height: 38,
          background: editor.tabActive,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#ff5f57",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#febc2e",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#28c840",
          }}
        />
        <span
          className="ml-3 font-mono text-xs"
          style={{
            color: editor.chromeText,
          }}
        >
          portfolio.tsx
        </span>
      </div>

      {/* code area */}
      <div className="flex font-mono text-sm py-4">
        {/* line numbers */}
        <div
          className="pr-4 pl-4 text-right"
          style={{
            color: editor.chromeText,
            minWidth: 40,
            lineHeight: `${lineHeight}px`,
          }}
        >
          {visibleLines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* code */}
        <div
          className="pr-5"
          style={{
            lineHeight: `${lineHeight}px`,
          }}
        >
          {visibleLines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line.tokens.map((tok, ti) => (
                <span
                  key={ti}
                  style={{
                    color: syn[tok.c],
                  }}
                >
                  {tok.t}
                </span>
              ))}

              {line.showCursor && (
                <span
                  className="plo-cursor"
                  style={{
                    color: fb.accent,
                  }}
                >
                  █
                </span>
              )}
            </div>
          ))}

          {buildComplete && (
            <div
              style={{
                color: syn.success,
              }}
            >
              {"// ✓ build complete — welcome to my portfolio"}
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <div
        className="flex items-center justify-between px-4 text-[11px] font-mono"
        style={{
          height: 28,
          background: editor.tabActive,
          color: editor.chromeText,
        }}
      >
        <span>main · UTF-8 · TSX</span>

        <div className="flex items-center gap-2">
          {!buildComplete ? (
            <>
              <span
                style={{
                  color: fb.accent,
                }}
              >
                Building portfolio
              </span>

              <div
                style={{
                  width: 64,
                  height: 4,
                  overflow: "hidden",
                  borderRadius: 999,
                  background: fb.border,
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: fb.accent,
                    transition: "width 0.15s linear",
                  }}
                />
              </div>

              <span>{progress}%</span>
            </>
          ) : (
            <span
              style={{
                color: syn.success,
              }}
            >
              ✓ Ready
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════
const PortfolioLoader = ({
  theme = "dark",
  name = "MEHUL ARORA",
  tagline = "I Make Servers Talk",
  duration = 1200,
  progress: controlledProgress,
  isLoading,
  targetRef,
  onFinish = () => {},
}) => {
  const isDark = theme === "dark";

  const isControlled = controlledProgress !== undefined;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState("active");
  const [mounted, setMounted] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const cardOuterRef = useRef(null);

  const progress = useProgress(duration, isControlled, controlledProgress);
  const buildComplete = progress >= 100;

  // start morphing
  useEffect(() => {
    const doneByProgress = !isControlled && progress >= 100;
    const doneByFlag = isControlled && isLoading === false;

    if ((doneByProgress || doneByFlag) && phase === "active") {
      const t = setTimeout(() => {
        setPhase("morphing");
      }, 600);

      return () => clearTimeout(t);
    }
  }, [progress, isControlled, isLoading, phase]);

  // morph animation
  useLayoutEffect(() => {
    if (phase !== "morphing") return;

    const cardEl = cardOuterRef.current;
    const targetEl = targetRef?.current;
    const flightMs = prefersReducedMotion ? 1 : 950;

    if (cardEl && targetEl) {
      const cardRect = cardEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const dx =
        targetRect.left +
        targetRect.width / 2 -
        (cardRect.left + cardRect.width / 2);

      const dy =
        targetRect.top +
        targetRect.height / 2 -
        (cardRect.top + cardRect.height / 2);

      const scale = Math.max(
        0.1,
        Math.min(1, targetRect.width / cardRect.width)
      );

      cardEl.style.transition = `transform ${flightMs}ms cubic-bezier(0.65,0,0.35,1)`;
      cardEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    }

    const t = setTimeout(() => {
      setPhase("landed");
    }, flightMs);

    return () => clearTimeout(t);
  }, [phase, targetRef, prefersReducedMotion]);

  // fade out
  useEffect(() => {
    if (phase !== "landed") return;

    const fadeMs = prefersReducedMotion ? 1 : 220;
    const cardEl = cardOuterRef.current;

    if (cardEl) {
      cardEl.style.transition = `opacity ${fadeMs}ms ease`;
      cardEl.style.opacity = "0";
    }

    const t = setTimeout(() => {
      setMounted(false);
      onFinish();
    }, fadeMs);

    return () => clearTimeout(t);
  }, [phase, onFinish, prefersReducedMotion]);

  // mouse tilt
  const handleMouseMove = useCallback(
    (e) => {
      if (phase !== "active") return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({
        x: py * -10,
        y: px * 12,
      });
    },
    [phase]
  );

  useEffect(() => {
    if (phase !== "active") {
      setTilt({
        x: 0,
        y: 0,
      });
    }
  }, [phase]);

  // particles list memo using hoisted symbolSet
  const particles = useMemo(
    () =>
      Array.from({
        length: 18,
      }).map((_, i) => ({
        id: i,
        symbol: symbolSet[i % symbolSet.length],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        dur: Math.random() * 8 + 7,
        size: Math.random() * 6 + 11,
      })),
    []
  );

  if (!mounted) return null;

  const { fb, editor, syn } = useMemo(() => getThemeStyles(isDark), [isDark]);

  const safeName = (name || "YOUR NAME").trim();
  const safeTagline = (tagline || "Building something good").trim();

  // code lines memo using hoisted pure code generator
  const codeLines = useMemo(
    () => generateCodeLines(safeName, safeTagline),
    [safeName, safeTagline]
  );

  const lineHeight = 22;

  const totalChars = codeLines.reduce(
    (sum, line) =>
      sum + line.reduce((s, tok) => s + tok.t.length, 0) + 1,
    0
  );

  const revealTarget = buildComplete
    ? totalChars
    : Math.floor((progress / 100) * totalChars);

  const visibleLines = useMemo(
    () => calculateVisibleLines(codeLines, revealTarget, buildComplete),
    [codeLines, revealTarget, buildComplete]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        perspective: "1400px",
      }}
    >
      <style>{`
        @keyframes plo-sway {
          0%,100% {
            transform:
              rotateY(-3deg)
              rotateX(1.5deg)
              translateY(0);
          }

          50% {
            transform:
              rotateY(3deg)
              rotateX(-1.5deg)
              translateY(-10px);
          }
        }

        @keyframes plo-drift {
          0%,100% {
            transform:
              translateY(0)
              translateX(0);

            opacity: .35;
          }

          50% {
            transform:
              translateY(-22px)
              translateX(10px);

            opacity: .12;
          }
        }

        @keyframes plo-blink {
          0%,45% {
            opacity: 1;
          }

          50%,95% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        .plo-sway {
          animation:
            plo-sway 6.5s ease-in-out infinite;

          transform-style:
            preserve-3d;
        }

        .plo-particle {
          animation-name:
            plo-drift;

          animation-timing-function:
            ease-in-out;

          animation-iteration-count:
            infinite;
        }

        .plo-cursor {
          animation:
            plo-blink 1s steps(1) infinite;
        }
      `}</style>

      {/* background */}
      <ParticlesBackground particles={particles} fb={fb} />

      {/* card */}
      <div
        ref={cardOuterRef}
        className={phase === "active" ? "plo-sway" : ""}
      >
        <CodeEditorWindow
          tilt={tilt}
          editor={editor}
          fb={fb}
          visibleLines={visibleLines}
          lineHeight={lineHeight}
          syn={syn}
          buildComplete={buildComplete}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default PortfolioLoader;