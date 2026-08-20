import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Timer, Compass, Terminal as TerminalIcon, Search } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";
import { ThemeToggle } from "./ThemeToggle";

const FONT_MONO = "'DM Mono', 'SF Mono', monospace";

const SITE_SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "certificates",
  "experience",
  "contact",
];

const EXPLORED_COLOR_STOPS = [
  { at: 0, r: 239, g: 68, b: 68 },
  { at: 20, r: 234, g: 179, b: 8 },
  { at: 60, r: 59, g: 130, b: 246 },
  { at: 90, r: 74, g: 222, b: 128 },
  { at: 100, r: 74, g: 222, b: 128 },
];

function exploredColor(pct) {
  const p = Math.max(0, Math.min(100, pct));
  for (let i = 0; i < EXPLORED_COLOR_STOPS.length - 1; i++) {
    const a = EXPLORED_COLOR_STOPS[i];
    const b = EXPLORED_COLOR_STOPS[i + 1];
    if (p >= a.at && p <= b.at) {
      const t = (p - a.at) / (b.at - a.at);
      return {
        r: Math.round(a.r + (b.r - a.r) * t),
        g: Math.round(a.g + (b.g - a.g) * t),
        b: Math.round(a.b + (b.b - a.b) * t),
      };
    }
  }
  const last = EXPLORED_COLOR_STOPS[EXPLORED_COLOR_STOPS.length - 1];
  return { r: last.r, g: last.g, b: last.b };
}

function useExplored() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const KEY = "__portfolio_explored_anas_v1";
    let depths = {};
    try {
      depths = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    } catch {}

    const computePct = () =>
      Math.min(
        100,
        (Object.values(depths).reduce((s, v) => s + Math.min(v, 1), 0) /
          SITE_SECTIONS.length) *
          100,
      );

    const getScrollEl = () => document.querySelector(".hologram-interface");

    let cleanupScroll = null;

    const init = () => {
      cleanupScroll?.();
      cleanupScroll = null;

      const scrollEl = getScrollEl();
      const getTop = () => (scrollEl ? scrollEl.scrollTop : window.scrollY);
      const getMax = () =>
        scrollEl
          ? scrollEl.scrollHeight - scrollEl.clientHeight
          : document.body.scrollHeight - window.innerHeight;

      if (getMax() <= 0) {
        depths = { ...depths, home: 1 };
        localStorage.setItem(KEY, JSON.stringify(depths));
        setPct(computePct());
        return;
      }

      const onScroll = () => {
        const max = getMax();
        if (max <= 0) return;
        const p = getTop() / max;
        const prev = depths.home ?? 0;
        if (p > prev) {
          depths = { ...depths, home: p };
          localStorage.setItem(KEY, JSON.stringify(depths));
          setPct(computePct());
        }
      };

      const target = scrollEl ?? window;
      target.addEventListener("scroll", onScroll, { passive: true });
      cleanupScroll = () => target.removeEventListener("scroll", onScroll);
    };

    setPct(computePct());
    init();
    return () => {
      cleanupScroll?.();
    };
  }, []);
  return pct;
}

function useSessionTime() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const key = "__portfolio_session_start_anas";
    const stored = sessionStorage.getItem(key);
    const start = stored
      ? parseInt(stored, 10)
      : (() => {
          const t = Date.now();
          sessionStorage.setItem(key, String(t));
          return t;
        })();
    setElapsed(Math.floor((Date.now() - start) / 1000));
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return elapsed;
}

function useMouseCoords() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      setPos({
        x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
        y: -(e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function useScrollState(progressCircleRef, btnCirc) {
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    let cleanup = null;

    const init = () => {
      cleanup?.();
      setShowTop(false);
      progressRef.current = 0;
      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = String(btnCirc);
      }

      const scrollEl = document.querySelector(".hologram-interface");

      const getTop = () => (scrollEl ? scrollEl.scrollTop : window.scrollY);
      const getMax = () =>
        scrollEl
          ? scrollEl.scrollHeight - scrollEl.clientHeight
          : document.body.scrollHeight - window.innerHeight;
      const getVH = () =>
        scrollEl ? scrollEl.clientHeight : window.innerHeight;

      const onScroll = () => {
        const top = getTop();
        const max = getMax();
        const p = max > 0 ? top / max : 0;
        progressRef.current = p;
        setShowTop(top > getVH() * 0.4);
        if (progressCircleRef.current) {
          progressCircleRef.current.style.strokeDashoffset = String(
            btnCirc * (1 - p),
          );
        }
      };

      const target = scrollEl ?? window;
      target.addEventListener("scroll", onScroll, { passive: true });
      cleanup = () => target.removeEventListener("scroll", onScroll);
    };

    init();
    return () => {
      cleanup?.();
    };
  }, [btnCirc, progressCircleRef]);

  return { showTop, progressRef };
}

function fmtElapsed(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${String(h).padStart(2, "0")}:${mm}:${ss}` : `${mm}:${ss}`;
}

function fmtCoord(n) {
  const fixed = n.toFixed(4);
  return (parseFloat(fixed) > 0 ? "+" : "") + fixed;
}

function scrollToTop() {
  const fn = window.__portfolioScrollTop;
  if (fn) {
    fn(0);
    return;
  }
  const el = document.querySelector(".hologram-interface");
  if (el) {
    el.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function BottomRightHUD() {
  const isMobile = useIsMobile();
  const elapsed = useSessionTime();
  const explored = useExplored();
  const { x, y } = useMouseCoords();

  const btnSize = isMobile ? 34 : 42;
  const btnR = btnSize / 2 - 2;
  const btnCirc = 2 * Math.PI * btnR;

  const progressCircleRef = useRef(null);
  const { showTop, progressRef } = useScrollState(progressCircleRef, btnCirc);

  const openCmd = () => {
    document.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const openTerminal = () => {
    document.dispatchEvent(new CustomEvent("open-terminal-modal"));
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "1.5rem",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {/* Quick Action Triggers: Theme Switcher, CMD+K & CLI Terminal Mode */}
      <div style={{ display: "flex", gap: "0.5rem", alignSelf: "flex-end" }}>
        <ThemeToggle size={btnSize} isMobile={isMobile} />
        <button
          onClick={openCmd}
          title="Command Palette (Cmd+K)"
          style={{
            width: `${btnSize}px`,
            height: `${btnSize}px`,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(12,12,14,0.85)",
            color: "#e8e0d0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "all 0.2s ease",
            padding: 0,
          }}
        >
          <Search size={isMobile ? 13 : 15} />
        </button>

        <button
          onClick={openTerminal}
          title="Developer Terminal CLI"
          style={{
            width: `${btnSize}px`,
            height: `${btnSize}px`,
            borderRadius: "50%",
            border: "1px solid rgba(74,222,128,0.3)",
            background: "rgba(8,12,8,0.85)",
            color: "#4ade80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "all 0.2s ease",
            padding: 0,
            boxShadow: "0 0 10px rgba(74,222,128,0.15)",
          }}
        >
          <TerminalIcon size={isMobile ? 13 : 15} />
        </button>
      </div>

      <div
        style={{
          height: `${btnSize}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-end",
        }}
      >
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              onClick={scrollToTop}
              style={{
                width: `${btnSize}px`,
                height: `${btnSize}px`,
                borderRadius: "50%",
                border: "none",
                background: "rgba(10,10,10,0.85)",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isMobile ? "pointer" : "none",
                transition: "color 0.2s",
                padding: 0,
                position: "relative",
              }}
            >
              <svg
                width={btnSize}
                height={btnSize}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotate(-90deg)",
                }}
              >
                <circle
                  cx={btnSize / 2}
                  cy={btnSize / 2}
                  r={btnR}
                  fill="none"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="1.5"
                />
                <circle
                  ref={progressCircleRef}
                  cx={btnSize / 2}
                  cy={btnSize / 2}
                  r={btnR}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={btnCirc}
                  strokeDashoffset={btnCirc * (1 - progressRef.current)}
                />
              </svg>
              <ChevronUp
                size={isMobile ? 13 : 15}
                strokeWidth={1.5}
                style={{ position: "relative" }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div
        style={{
          display: "flex",
          gap: isMobile ? "0.6rem" : "1rem",
          alignItems: "center",
          color: "white",
          fontFamily: FONT_MONO,
          fontSize: isMobile ? "0.7rem" : "0.82rem",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Timer
            size={isMobile ? 10 : 12}
            strokeWidth={1.8}
            style={{ opacity: 0.7, flexShrink: 0 }}
          />
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.03em",
            }}
          >
            {fmtElapsed(elapsed)}
          </span>
        </div>

        {(() => {
          const { r, g, b } = exploredColor(explored);
          const strokeColor = `rgb(${r},${g},${b})`;
          const fillColor = `rgba(${r},${g},${b},0.13)`;
          const sz = isMobile ? 34 : 40;
          const rad = sz / 2 - 2;
          const circ = 2 * Math.PI * rad;
          const offset = circ * (1 - explored / 100);
          return (
            <div
              style={{
                width: sz,
                height: sz,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width={sz}
                height={sz}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotate(-90deg)",
                }}
              >
                <circle
                  cx={sz / 2}
                  cy={sz / 2}
                  r={rad - 0.75}
                  fill={fillColor}
                  stroke="none"
                  style={{ transition: "fill 0.6s ease" }}
                />
                <circle
                  cx={sz / 2}
                  cy={sz / 2}
                  r={rad}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                />
                <circle
                  cx={sz / 2}
                  cy={sz / 2}
                  r={rad}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  style={{
                    transition: "stroke 0.6s ease, stroke-dashoffset 0.4s ease",
                  }}
                />
              </svg>
              <Compass
                size={isMobile ? 11 : 13}
                strokeWidth={1.5}
                style={{
                  position: "relative",
                  color: strokeColor,
                  transition: "color 0.6s ease",
                }}
              />
            </div>
          );
        })()}

        {!isMobile && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}
            >
              <span
                style={{
                  opacity: 0.75,
                  fontSize: "0.65rem",
                  letterSpacing: "0.04em",
                }}
              >
                X
              </span>
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "0.03em",
                }}
              >
                {fmtCoord(x)}
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}
            >
              <span
                style={{
                  opacity: 0.75,
                  fontSize: "0.65rem",
                  letterSpacing: "0.04em",
                }}
              >
                Y
              </span>
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "0.03em",
                }}
              >
                {fmtCoord(y)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BottomRightHUD;
