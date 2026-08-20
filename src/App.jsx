import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { EnvironmentLayer } from "./components/EnvironmentLayer";
import { Cursor } from "./components/Cursor";
import { ClockWidget } from "./components/ClockWidget";
import { BottomRightHUD } from "./components/BottomRightHUD";
import { Preloader } from "./components/Preloader";
import { CommandPalette } from "./components/CommandPalette";
import { TerminalModal } from "./components/TerminalModal";
import { useHashScroll } from "./hooks/useHashScroll";

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(0.2);
  const [isLoading, setIsLoading] = useState(true);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useHashScroll();

  useEffect(() => {
    const handleOpenCmd = () => setIsCmdOpen(true);
    const handleOpenTerminal = () => setIsTerminalOpen(true);

    document.addEventListener("open-command-palette", handleOpenCmd);
    document.addEventListener("open-terminal-modal", handleOpenTerminal);

    return () => {
      document.removeEventListener("open-command-palette", handleOpenCmd);
      document.removeEventListener("open-terminal-modal", handleOpenTerminal);
    };
  }, []);

  useEffect(() => {
    const el = document.querySelector(".hologram-interface");
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? el.scrollTop / max : 0;
      setScrollProgress(progress);
      setThumbRatio(
        el.scrollHeight > 0 ? el.clientHeight / el.scrollHeight : 1
      );
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    let target = el.scrollTop;
    let rafId = null;

    const animate = () => {
      const diff = target - el.scrollTop;
      if (Math.abs(diff) < 0.5) {
        el.scrollTop = target;
        rafId = null;
        return;
      }
      el.scrollTop += diff * 0.08;
      rafId = requestAnimationFrame(animate);
    };

    const onWheel = (e) => {
      e.preventDefault();
      const max = el.scrollHeight - el.clientHeight;
      if (!rafId) target = el.scrollTop;
      target = Math.max(0, Math.min(target + e.deltaY, max));
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    window.__portfolioScrollTop = (top) => {
      target = Math.max(0, Math.min(top, el.scrollHeight - el.clientHeight));
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      if (rafId) cancelAnimationFrame(rafId);
      delete window.__portfolioScrollTop;
    };
  }, []);

  return (
    <div className="spatial-scene">
      {/* Premium Opening Holographic System Preloader Animation */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Global Interactive Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onOpenTerminal={() => {
          setIsCmdOpen(false);
          setIsTerminalOpen(true);
        }}
      />

      {/* Developer CLI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Dynamic 2D Canvas Background */}
      <EnvironmentLayer />

      {/* ISS Satellite Trailing Cursor */}
      <Cursor />

      {/* Bottom Left Airport Clock Widget */}
      <ClockWidget />

      {/* Bottom Right Session Timer & Compass Exploration HUD */}
      <BottomRightHUD />

      {/* Right Edge Scroll Progress Pill Indicator */}
      <div
        style={{
          position: "fixed",
          right: "6px",
          top: "1rem",
          bottom: "1rem",
          width: "3px",
          zIndex: 998,
          borderRadius: "3px",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: `${Math.max(thumbRatio * 100, 8)}%`,
            top: `${scrollProgress * (100 - Math.max(thumbRatio * 100, 8))}%`,
            borderRadius: "3px",
            background: "rgba(255,255,255,0.25)",
            transition: "background 0.3s ease",
          }}
        />
      </div>

      {/* Route Views */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
