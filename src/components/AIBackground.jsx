import React, { useEffect, useRef } from "react";
import { useIsMobile, useIsTouchDevice } from "../hooks/useMediaQuery";

const BG = "0,0,0";
const NODE_BRIGHT = "rgba(255,255,255,";
const EDGE_COLOR = "255,255,255";
const PARTICLE_COLOR = "255,255,255";

const getNodeCount = (isMobile) => (isMobile ? 40 : 110);
const getParticleCount = (isMobile) => (isMobile ? 40 : 75);
const getConnectionDist = (isMobile) => (isMobile ? 80 : 500);
const getDustMoteCount = (isMobile) => (isMobile ? 80 : 600);

const PACKET_INTERVAL = 20;
const PACKET_SPEED_MIN = 0.001;
const PACKET_SPEED_MAX = 0.004;
const NODE_SPEED = 0.4;

const BREEZE_KEYFRAMES = [
  { t: 0.0, mx: -0.52, my: -0.52, kx: 0, ky: 0 },
  { t: 0.22, mx: -0.22, my: -0.2, kx: 0, ky: 0 },
  { t: 0.36, mx: -0.08, my: -0.06, kx: 1, ky: 1 },
  { t: 0.51, mx: 0.1, my: 0.1, kx: 0, ky: 0 },
  { t: 0.67, mx: 0.26, my: 0.24, kx: 2, ky: 2 },
  { t: 0.82, mx: 0.42, my: 0.4, kx: 0, ky: 0 },
  { t: 1.0, mx: 0.56, my: 0.56, kx: 0, ky: 0 },
];

function breezePosition(mote, progress, W, H) {
  const p = progress % 1;
  let i = 0;
  for (; i < BREEZE_KEYFRAMES.length - 1; i++) {
    if (p < BREEZE_KEYFRAMES[i + 1].t) break;
  }
  const a = BREEZE_KEYFRAMES[i];
  const b = BREEZE_KEYFRAMES[i + 1] || a;
  const segT = b.t === a.t ? 0 : (p - a.t) / (b.t - a.t);

  const lerpX =
    a.mx * mote.travelX + segT * (b.mx * mote.travelX - a.mx * mote.travelX);
  const lerpY =
    a.my * mote.travelY + segT * (b.my * mote.travelY - a.my * mote.travelY);

  let kinkOffX = 0,
    kinkOffY = 0;
  if (a.kx === 1) {
    kinkOffX = mote.kink1X * (1 - segT);
    kinkOffY = mote.kink1Y * (1 - segT);
  } else if (a.kx === 2) {
    kinkOffX = mote.kink2X * (1 - segT);
    kinkOffY = mote.kink2Y * (1 - segT);
  }
  if (b.kx === 1) {
    kinkOffX += mote.kink1X * segT;
    kinkOffY += mote.kink1Y * segT;
  } else if (b.kx === 2) {
    kinkOffX += mote.kink2X * segT;
    kinkOffY += mote.kink2Y * segT;
  }

  return {
    x: (mote.baseX / 100) * W + lerpX + kinkOffX,
    y: (mote.baseY / 100) * H + lerpY + kinkOffY,
  };
}

function shimmerOpacity(phase) {
  const t = phase % 1;
  const ease = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
  return 0.07 + 0.15 * ease;
}

export function AIBackground() {
  const isMobile = useIsMobile();
  const isTouchDevice = useIsTouchDevice();
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const nodesRef = useRef([]);
  const packetsRef = useRef([]);
  const particlesRef = useRef([]);
  const dustMotesRef = useRef([]);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scanlinesRef = useRef(null);
  const edgeCacheRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const NODE_COUNT = getNodeCount(isMobile);
    const PARTICLE_COUNT = getParticleCount(isMobile);
    const CONNECTION_DIST = getConnectionDist(isMobile);
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const DUST_MOTE_COUNT = getDustMoteCount(isMobile);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const buildScanlines = (w, h) => {
      const sc = document.createElement("canvas");
      sc.width = w;
      sc.height = h;
      const sctx = sc.getContext("2d");
      if (sctx) {
        sctx.fillStyle = "rgba(255,255,255,0.015)";
        for (let y = 0; y < h; y += 4) {
          sctx.fillRect(0, y, w, 1);
        }
      }
      scanlinesRef.current = sc;
    };

    const initNodes = () => {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => {
        const layer = Math.floor(Math.random() * 3);
        const speed = NODE_SPEED * (0.5 + layer * 0.3);
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: 0.8 + layer * 0.4 + Math.random() * 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.04 + Math.random() * 0.03,
          layer,
          activationTimer: 0,
          activationDuration: 30 + Math.floor(Math.random() * 25),
        };
      });
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 0.5 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.3,
        life: Math.random(),
      }));
    };

    const initDustMotes = () => {
      dustMotesRef.current = Array.from({ length: DUST_MOTE_COUNT }, () => {
        const isNear = Math.random() < 0.42;
        const horizontalDir = Math.random() < 0.86 ? 1 : -1;
        const vwPx = canvas.width / 100;
        const vhPx = canvas.height / 100;
        return {
          baseX: Math.random() * 100,
          baseY: Math.random() * 100,
          travelX:
            horizontalDir *
            (isNear ? 60 + Math.random() * 58 : 40 + Math.random() * 40) *
            vwPx,
          travelY:
            (isNear ? -18 + Math.random() * 36 : -12 + Math.random() * 24) *
            vhPx,
          kink1X: isNear ? -16 + Math.random() * 32 : -10 + Math.random() * 20,
          kink1Y: isNear ? -12 + Math.random() * 24 : -8 + Math.random() * 16,
          kink2X: isNear ? -14 + Math.random() * 28 : -9 + Math.random() * 18,
          kink2Y: isNear ? -10 + Math.random() * 20 : -7 + Math.random() * 14,
          pathDuration: isNear
            ? (22 + Math.random() * 16) * 60
            : (32 + Math.random() * 22) * 60,
          shimmerDuration: isNear
            ? (4.2 + Math.random() * 2.4) * 60
            : (6 + Math.random() * 3) * 60,
          phase: Math.random(),
          size: isNear ? 2.8 + Math.random() * 4 : 1.5 + Math.random() * 2.6,
          baseOpacity: isNear
            ? 0.33 + Math.random() * 0.36
            : 0.2 + Math.random() * 0.28,
          isNear,
          mouseOffX: 0,
          mouseOffY: 0,
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
      initParticles();
      initDustMotes();
      if (!isMobile) {
        buildScanlines(canvas.width, canvas.height);
      }
    };

    const spawnPacket = () => {
      const nodes = nodesRef.current;
      if (!nodes.length) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const from = nodes[fromIdx];

      const candidates = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === fromIdx) continue;
        const dx = nodes[i].x - from.x;
        const dy = nodes[i].y - from.y;
        if (dx * dx + dy * dy < CONNECTION_DIST_SQ) candidates.push(i);
      }
      if (candidates.length === 0) return;

      const toIdx = candidates[Math.floor(Math.random() * candidates.length)];
      nodes[fromIdx].activationTimer = nodes[fromIdx].activationDuration;

      packetsRef.current.push({
        fromNode: fromIdx,
        toNode: toIdx,
        progress: 0,
        speed:
          PACKET_SPEED_MIN +
          Math.random() * (PACKET_SPEED_MAX - PACKET_SPEED_MIN),
      });
    };

    const drawGrid = (time, isLight) => {
      const W = canvas.width,
        H = canvas.height;
      const gridSize = 50;
      const offset = (time * 0.02) % gridSize;

      ctx.strokeStyle = isLight ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;

      for (let x = -offset; x < W + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = -offset; y < H + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    const draw = () => {
      const nodes = nodesRef.current;
      const packets = packetsRef.current;
      const particles = particlesRef.current;
      const dustMotes = dustMotesRef.current;
      const W = canvas.width,
        H = canvas.height;

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const bgClr = isLight ? "241,245,249" : "3,3,3";
      const particleClr = isLight ? "79,70,229" : "255,255,255";
      const nodeClr = isLight ? "rgba(30,41,59," : "rgba(255,255,255,";
      const edgeClr = isLight ? "99,102,241" : "255,255,255";

      ctx.fillStyle = `rgba(${bgClr},1)`;
      ctx.fillRect(0, 0, W, H);

      if (!isMobile) {
        drawGrid(frameRef.current, isLight);
      }

      if (!isMobile && scanlinesRef.current) {
        ctx.drawImage(scanlinesRef.current, 0, 0);
      }

      frameRef.current++;
      if (frameRef.current % PACKET_INTERVAL === 0) spawnPacket();

      for (const mote of dustMotes) {
        const pathProgress =
          ((frameRef.current + mote.phase * mote.pathDuration) %
            mote.pathDuration) /
          mote.pathDuration;
        const shimmerProgress =
          ((frameRef.current + mote.phase * mote.shimmerDuration) %
            mote.shimmerDuration) /
          mote.shimmerDuration;

        const pos = breezePosition(mote, pathProgress, W, H);
        const opacity = shimmerOpacity(shimmerProgress);

        if (!isTouchDevice) {
          const mdx = pos.x - mouseRef.current.x;
          const mdy = pos.y - mouseRef.current.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const MOUSE_R = 150;
          if (mDistSq < MOUSE_R * MOUSE_R && mDistSq > 0) {
            const mDist = Math.sqrt(mDistSq);
            const force = ((MOUSE_R - mDist) / MOUSE_R) * 42;
            mote.mouseOffX += (mdx / mDist) * force;
            mote.mouseOffY += (mdy / mDist) * force;
          }
        }
        mote.mouseOffX *= 0.85;
        mote.mouseOffY *= 0.85;
        const CAP = 200;
        if (mote.mouseOffX > CAP) mote.mouseOffX = CAP;
        if (mote.mouseOffX < -CAP) mote.mouseOffX = -CAP;
        if (mote.mouseOffY > CAP) mote.mouseOffY = CAP;
        if (mote.mouseOffY < -CAP) mote.mouseOffY = -CAP;
        const drawX = pos.x + mote.mouseOffX;
        const drawY = pos.y + mote.mouseOffY;

        if (drawX < -50 || drawX > W + 50 || drawY < -50 || drawY > H + 50)
          continue;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = mote.isNear ? 24 : 14;
        ctx.shadowColor = mote.isNear
          ? "rgba(235,242,255,0.56)"
          : "rgba(229,236,252,0.34)";
        ctx.fillStyle = "rgba(248,250,255,0.97)";
        ctx.beginPath();
        ctx.arc(drawX, drawY, mote.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.01;
        p.alpha = 0.2 + Math.sin(p.life) * 0.15;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR},${p.alpha})`;
        ctx.fill();
      }

      const mouse = mouseRef.current;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.activationTimer > 0) n.activationTimer--;

        if (!isTouchDevice) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400 && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (180 - dist) / 180;
            n.x += (dx / dist) * force * 5.5;
            n.y += (dy / dist) * force * 5.5;
          }
        }

        if (n.x < 0 || n.x > W) {
          n.vx *= -1;
          n.x = Math.max(0, Math.min(W, n.x));
        }
        if (n.y < 0 || n.y > H) {
          n.vy *= -1;
          n.y = Math.max(0, Math.min(H, n.y));
        }
      }

      if (frameRef.current % 3 === 0) {
        const cache = [];
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DIST_SQ) {
              cache.push({
                i,
                j,
                fade: 1 - Math.sqrt(distSq) / CONNECTION_DIST,
              });
            }
          }
        }
        edgeCacheRef.current = cache;
      }

      ctx.lineWidth = 0.3;
      for (const edge of edgeCacheRef.current) {
        const isActive =
          nodes[edge.i]?.activationTimer > 0 ||
          nodes[edge.j]?.activationTimer > 0;
        const alpha = isActive ? edge.fade * 0.18 : edge.fade * 0.05;
        ctx.beginPath();
        ctx.moveTo(nodes[edge.i].x, nodes[edge.i].y);
        ctx.lineTo(nodes[edge.j].x, nodes[edge.j].y);
        ctx.strokeStyle = `rgba(${edgeClr},${alpha.toFixed(3)})`;
        ctx.stroke();
      }

      for (const n of nodes) {
        const ps = 1 + Math.sin(n.pulse) * 0.25;
        const isActive = n.activationTimer > 0;
        const frac = n.activationTimer / n.activationDuration;

        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * ps, 0, Math.PI * 2);
          ctx.fillStyle = `${nodeClr}${(frac * 0.35).toFixed(3)})`;
          ctx.fill();
        } else {
          const coreAlpha = isLight ? 0.25 + n.layer * 0.08 : 0.08 + n.layer * 0.04;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * ps, 0, Math.PI * 2);
          ctx.fillStyle = `${nodeClr}${coreAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      packetsRef.current = packets.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          if (nodes[p.toNode]) {
            nodes[p.toNode].activationTimer = nodes[p.toNode].activationDuration;
          }
          return false;
        }

        const fn = nodes[p.fromNode];
        const tn = nodes[p.toNode];
        if (!fn || !tn) return false;

        const x = fn.x + (tn.x - fn.x) * p.progress;
        const y = fn.y + (tn.y - fn.y) * p.progress;

        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile, isTouchDevice]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "#000000",
      }}
    />
  );
}
