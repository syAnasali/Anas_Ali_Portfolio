import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, Compass, ArrowRight, Zap, Orbit } from "lucide-react";

function NotFoundCanvas({ gravityMode }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const shockwavesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const count = 220;
    particlesRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * Math.min(width, height) * 0.48;
      return {
        angle,
        dist,
        speed: 0.003 + Math.random() * 0.008,
        size: 1 + Math.random() * 2.5,
        color:
          Math.random() < 0.5
            ? "167, 139, 250"
            : Math.random() < 0.5
            ? "59, 130, 246"
            : "34, 211, 238",
        alpha: 0.25 + Math.random() * 0.65,
      };
    });

    const handleCanvasClick = (e) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 180,
        alpha: 0.9,
      });

      for (let i = 0; i < 20; i++) {
        const pAngle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(pAngle) * speed,
          vy: Math.sin(pAngle) * speed,
          isProbe: true,
          size: 2 + Math.random() * 2.5,
          color: "244, 114, 182",
          alpha: 1,
          life: 1,
        });
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    let angleScan = 0;

    const render = () => {
      ctx.fillStyle = "rgba(4, 4, 10, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Central Singularity Glow
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 300);
      grad.addColorStop(0, "rgba(139, 92, 246, 0.35)");
      grad.addColorStop(0.35, "rgba(59, 130, 246, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 300, 0, Math.PI * 2);
      ctx.fill();

      // Sweeping Sonar Line
      angleScan += 0.012;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angleScan);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, Math.max(width, height));
      ctx.strokeStyle = "rgba(167, 139, 250, 0.14)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Shockwaves
      shockwavesRef.current = shockwavesRef.current.filter((sw) => {
        sw.radius += 4.5;
        sw.alpha *= 0.93;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${sw.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        return sw.alpha > 0.02 && sw.radius < sw.maxRadius;
      });

      // Swirling Orbiting Particles & Probes
      particlesRef.current = particlesRef.current.filter((p) => {
        if (p.isProbe) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.life -= 0.012;
          p.alpha = Math.max(0, p.life);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${p.color}, 0.9)`;
          ctx.fill();
          ctx.shadowBlur = 0;
          return p.life > 0;
        }

        p.angle += p.speed;
        let targetX = cx + Math.cos(p.angle) * p.dist;
        let targetY = cy + Math.sin(p.angle) * p.dist;

        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - targetX;
          const mdy = mouseRef.current.y - targetY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 240 && mDist > 0) {
            // Pull or push depending on gravityMode
            const force = (240 - mDist) * 0.2 * (gravityMode === "PULL" ? 1 : -1.2);
            targetX += (mdx / mDist) * force;
            targetY += (mdy / mDist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(targetX, targetY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
        return true;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, [gravityMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair z-0"
    />
  );
}

export function NotFound() {
  const [isWarping, setIsWarping] = useState(false);
  const [gravityMode, setGravityMode] = useState("PULL"); // "PULL" | "REPULSE"

  const handleWarpTo = (targetPath) => {
    setIsWarping(true);
    setTimeout(() => {
      window.location.href = targetPath;
    }, 900);
  };

  const toggleGravity = () => {
    setGravityMode((prev) => (prev === "PULL" ? "REPULSE" : "PULL"));
  };

  const QUICK_NAVIGATION_LINKS = [
    { label: "Home", href: "/", code: "01" },
    { label: "Projects", href: "/#projects", code: "02" },
    { label: "Skills", href: "/#skills", code: "03" },
    { label: "Experience", href: "/#experience", code: "04" },
    { label: "Certifications", href: "/#certificates", code: "05" },
    { label: "Contact", href: "/#contact", code: "06" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030308] text-white flex flex-col justify-between overflow-hidden font-sans-body select-none">
      {/* Hyperdrive Warp Transition Overlay */}
      {isWarping && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 35 }}
          transition={{ duration: 1.0, ease: "easeIn" }}
          className="fixed inset-0 z-50 bg-gradient-to-r from-purple-600 via-cyan-300 to-white pointer-events-none rounded-full"
        />
      )}

      {/* Interactive Physics Canvas Background */}
      <NotFoundCanvas gravityMode={gravityMode} />

      {/* Top Header HUD Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
          <span className="font-mono-hud text-xs tracking-[0.2em] text-purple-300/80 uppercase">
            SECTOR_404 // UNMAPPED_COORDINATE
          </span>
        </div>

        {/* Live Canvas Gravity Controller */}
        <button
          onClick={toggleGravity}
          className="flex items-center gap-2 font-mono-hud text-xs text-white/70 hover:text-cyan-300 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all cursor-pointer"
        >
          <Orbit size={13} className={gravityMode === "PULL" ? "text-purple-400" : "text-cyan-400"} />
          <span>Gravity Mode: <strong className="text-white">{gravityMode}</strong></span>
        </button>
      </header>

      {/* Pure Editorial Typographic Center Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 flex flex-col items-center text-center pointer-events-auto my-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Tag */}
          <div className="flex items-center gap-2 font-mono-hud text-xs tracking-[0.3em] uppercase text-cyan-400/90 mb-2">
            <Compass size={14} className="animate-spin text-cyan-400" style={{ animationDuration: "16s" }} />
            [ OUT_OF_BOUNDS ]
          </div>

          {/* Giant Editorial Serif 404 Display Title */}
          <h1
            className="font-serif-heading font-extrabold tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-400/80"
            style={{
              fontSize: "clamp(6rem, 18vw, 15rem)",
              textShadow: "0 0 60px rgba(167, 139, 250, 0.25)",
            }}
          >
            404
          </h1>

          {/* Editorial Headline */}
          <h2 className="font-serif-heading text-2xl sm:text-4xl md:text-5xl font-light text-white/95 tracking-tight -mt-4 sm:-mt-8 mb-4 italic">
            Lost in the Space Between Stars.
          </h2>

          <p className="font-sans-body text-sm sm:text-base text-white/55 max-w-md mx-auto leading-relaxed mb-8">
            The page you requested is unmapped. Use the navigational quantum bridge below to jump directly to any sector of the site.
          </p>

          {/* Useful Quick Navigation Jump Links */}
          <div className="w-full max-w-3xl mb-8">
            <div className="font-mono-hud text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-4">
              // TELEPORT TO KNOWN SECTORS
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-hud text-xs">
              {QUICK_NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.code}
                  onClick={() => handleWarpTo(link.href)}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/50 text-white/80 hover:text-white transition-all duration-300 cursor-pointer text-left"
                >
                  <span className="text-white/40 text-[0.65rem] group-hover:text-purple-400 transition-colors">
                    {link.code}
                  </span>
                  <span className="font-medium tracking-wider group-hover:translate-x-0.5 transition-transform">
                    {link.label}
                  </span>
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-purple-400 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => handleWarpTo("/")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 font-mono-hud text-xs tracking-[0.2em] uppercase text-white font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Home size={14} />
            Warp Back Home
          </button>
        </motion.div>
      </main>

      {/* Footer Metadata */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex justify-between items-center font-mono-hud text-[0.65rem] text-white/30 tracking-[0.25em] uppercase pointer-events-auto">
        <span>ANAS_ALI // ASTRO_NAVIGATION</span>
        <span>STATUS // 0x404_VOID</span>
      </footer>
    </div>
  );
}

export default NotFound;
