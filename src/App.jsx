import React, { useEffect, useState, useCallback } from "react";
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
import { useIsMobile, useIsTouchDevice } from "./hooks/useMediaQuery";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const isMobile = useIsMobile();
  const isTouchDevice = useIsTouchDevice();

  useHashScroll();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Fail-safe timer to guarantee preloader unmounts even if performance timing drops
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

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

    const onTouchStart = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      target = el.scrollTop;
    };

    const onWheel = (e) => {
      if (isMobile || isTouchDevice) return;
      e.preventDefault();
      const max = el.scrollHeight - el.clientHeight;
      if (!rafId) target = el.scrollTop;
      target = Math.max(0, Math.min(target + e.deltaY, max));
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    window.__portfolioScrollTop = (top) => {
      if (isMobile || isTouchDevice) {
        el.scrollTo({ top, behavior: "smooth" });
        return;
      }
      target = Math.max(0, Math.min(top, el.scrollHeight - el.clientHeight));
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });

    if (!isMobile && !isTouchDevice) {
      el.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      if (rafId) cancelAnimationFrame(rafId);
      delete window.__portfolioScrollTop;
    };
  }, [isMobile, isTouchDevice]);

  return (
    <div className="spatial-scene">
      {/* Premium Opening Holographic System Preloader Animation */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
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

      {/* Route Views */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/skills" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/certificates" element={<Home />} />
        <Route path="/experience" element={<Home />} />
        <Route path="/contact" element={<Home />} />
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
