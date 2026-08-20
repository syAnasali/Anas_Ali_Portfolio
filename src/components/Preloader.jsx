import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

export const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ANAS ALI PORTFOLIO ENGINE...");

  useEffect(() => {
    const duration = 1800; // 1.8s progress counter
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setPercent(progress);

      if (progress < 35) {
        setStatusText("INITIALIZING SYSTEM SYSTEM & TELEMETRY...");
      } else if (progress < 70) {
        setStatusText("LOADING AI, ML & ROBOTICS MODULES...");
      } else if (progress < 99) {
        setStatusText("ESTABLISHING ORBITAL SATELLITE LINK [100%]");
      } else {
        setStatusText("SYSTEM ONLINE • WELCOME");
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#030303",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "3rem 6vw",
        color: "#fafaf8",
        overflow: "hidden",
        pointerEvents: "all",
      }}
    >
      {/* Top Header Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "1.2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 10px #4ade80",
              animation: "pulse 1.5s infinite",
            }}
          />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "#e8e0d0",
              textTransform: "uppercase",
            }}
          >
            ANAS ALI // SYSTEM BOOT
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          2026.SYS.V2
        </span>
      </div>

      {/* Center Name & Orbital Typography */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          margin: "auto 0",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "1rem" }}
        >
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            PORTFOLIO ENGINE
          </span>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "#fafaf8",
              margin: 0,
            }}
          >
            Anas Ali.
          </h1>
        </motion.div>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "0.92rem",
            letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "480px",
            margin: 0,
          }}
        >
          Full-Stack, Artificial Intelligence & Robotics Engineering
        </p>

        {/* Central Glowing Laser Line */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "2rem 0 1rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              width: `${percent}%`,
              background: "linear-gradient(90deg, #60a5fa 0%, #e8e0d0 50%, #4ade80 100%)",
              boxShadow: "0 0 10px #e8e0d0",
            }}
          />
        </div>
      </div>

      {/* Bottom Telemetry Status Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "1.2rem",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          {statusText}
        </span>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#fafaf8",
            lineHeight: 1,
          }}
        >
          {String(percent).padStart(3, "0")}
          <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
