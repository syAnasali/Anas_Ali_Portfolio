import React, { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useMediaQuery";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const CLR = {
  college: "#6fa3ff",
  mnit: "#2ed4c8",
  rcat: "#ffaa2e",
  ailusion: "#c87eff",
};

const ENTRIES = [
  {
    id: "college",
    track: "education",
    weight: "early",
    role: "B.Tech Computer Science & Engineering",
    company: "Government Engineering College, Jaipur",
    period: "Aug 2023 – May 2027",
    start: new Date(2023, 7, 1),
    end: new Date(2027, 4, 30),
    bullets: [
      "Computer Science & Engineering degree specializing in AI, Web Systems & Robotics",
      "Hands-on experience in full-stack development, machine learning algorithms, and hardware automation",
      "Active participant in national hackathons and technical developer communities",
    ],
  },
  {
    id: "mnit",
    track: "professional",
    weight: "early",
    role: "Machine Learning and IoT Intern",
    company: "Malviya National Institute of Technology (MNIT), (MIIC)",
    period: "15th Jul 2024 – 31st Jul 2024",
    start: new Date(2024, 6, 15),
    end: new Date(2024, 6, 31),
    bullets: [
      "Learned concepts of machine learning and ai",
      "Designed and coded circuits and models of IoT devices",
      "Understood use of ml and IoT in various medical domains",
    ],
  },
  {
    id: "rcat",
    track: "professional",
    weight: "mid",
    role: "Robotics and Automation Engineer Intern",
    company: "Rajasthan Centre of Advanced Technology (RCAT)",
    period: "16th Jun 2025 – 31st Jul 2025",
    start: new Date(2025, 5, 16),
    end: new Date(2025, 6, 31),
    bullets: [
      "Designed and built various types robotic control systems",
      "Automation protocols and sensor integration and worked on industrial robots",
      "Designing and printing of 2D & 3D models",
    ],
  },
  {
    id: "ailusion",
    track: "professional",
    weight: "recent",
    role: "AI, ML & Automation Intern",
    company: "AiLusion",
    period: "15th May 2026 – 30th Jun 2026",
    start: new Date(2026, 4, 15),
    end: new Date(2026, 5, 30),
    bullets: [
      "Experience in AI, ML & Automation",
      "Python, Generative AI & Backend Automation",
      "Recognized for Technical Excellence & Problem Solving",
    ],
  },
];

const PRO = ENTRIES.filter((e) => e.track === "professional");
const EDU = ENTRIES.filter((e) => e.track === "education");

const ORIGIN = new Date(2023, 0, 1);
const AXIS_END = new Date(2027, 6, 1);
const TODAY = new Date();
const YEAR_MARKS = [2023, 2024, 2025, 2026, 2027];

function toMonths(d) {
  const dateObj = d === "present" ? TODAY : d;
  return (
    (dateObj.getFullYear() - ORIGIN.getFullYear()) * 12 +
    (dateObj.getMonth() - ORIGIN.getMonth()) +
    (dateObj.getDate() - 1) / 30
  );
}
const TOTAL_MONTHS = toMonths(AXIS_END);

function assignLanes(entries) {
  const sorted = [...entries].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );
  const laneEnd = [];
  const out = new Map();
  for (const e of sorted) {
    const endM = toMonths(e.end === "present" ? TODAY : e.end) + 0.2;
    let lane = laneEnd.findIndex((m) => m <= toMonths(e.start));
    if (lane === -1) lane = laneEnd.length;
    laneEnd[lane] = endM;
    out.set(e.id, lane);
  }
  return out;
}

const PRO_LANE = assignLanes(PRO);
const EDU_LANE = assignLanes(EDU);
const PRO_PROJ_LANE = assignLanes(PRO);
const EDU_PROJ_LANE = assignLanes(EDU);
const ALL_LANE = assignLanes(ENTRIES);

const PAD_X = 14;
const PAD_TOP = 12;
const PAD_BOTTOM = 16;
const BULLET_MARK = 14;
const ROLE_H = 20;
const COMPANY_H = 12;
const DIVIDER_H = 15;
const BAR_HDR_H = PAD_TOP + ROLE_H + COMPANY_H + DIVIDER_H;
const BULLET_GAP = 4;
const FONT_PX = 13.2;
const FONT_LH = 1.48;
const MOBILE_FONT_PX = 11.2;

const _measureCache = new Map();

function measureBarH(e, barWidth, fontPx = FONT_PX) {
  const key = `${e.id}-${Math.round(barWidth)}-${fontPx}-${e.bullets.length}`;
  if (_measureCache.has(key)) return _measureCache.get(key);

  const textW = barWidth - PAD_X * 2 - BULLET_MARK;
  let bulletsH = 0;

  if (typeof window !== "undefined" && textW > 0) {
    try {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.font = `${fontPx}px "DM Sans", sans-serif`;
      const lineH = fontPx * FONT_LH;
      e.bullets.forEach((bullet, bi) => {
        const words = bullet.split(" ");
        let lines = 0,
          cur = "";
        for (const w of words) {
          const test = cur ? `${cur} ${w}` : w;
          if (ctx.measureText(test).width > textW && cur) {
            lines++;
            cur = w;
          } else cur = test;
        }
        if (cur) lines++;
        bulletsH += Math.ceil(lines * lineH);
        if (bi < e.bullets.length - 1) bulletsH += BULLET_GAP;
      });
    } catch {
      bulletsH = e.bullets.length * Math.ceil(fontPx * FONT_LH);
    }
  } else {
    bulletsH = e.bullets.length * Math.ceil(fontPx * FONT_LH);
  }

  const h = BAR_HDR_H + bulletsH + PAD_BOTTOM;
  _measureCache.set(key, h);
  return h;
}

const HEADER_H = 220;
const CHART_PAD_T = 60;
const CHART_PAD_B = 80;
const CHART_EDGE_L = 40;
const CHART_EDGE_R = 40;
const CHART_MULT_V = 1.35;
const SPINE_RATIO = 0.5;
const PRO_SPINE_X_GAP = 40;
const EDU_SPINE_X_GAP = 40;
const PROJ_W = 2;
const PROJ_X_GAP = 16;
const BAR_X_GAP = 22;
const MAX_PRO_LANE_W = 340;
const MAX_EDU_LANE_W = 380;

const N_PRO_PROJ_ROWS = new Set(assignLanes(PRO).values()).size;
const N_EDU_PROJ_ROWS = new Set(assignLanes(EDU).values()).size;

const MOBILE_SPINE_X_PX = 28;
const MOBILE_SPINE_GAP = 6;
const MOBILE_PROJ_W = 2;
const MOBILE_PROJ_X_GAP = 6;
const MOBILE_INTER_BAND_GAP = 4;
const MOBILE_BAR_X_GAP = 14;
const MOBILE_CARD_MARGIN_R = 8;
const MOBILE_HEADER_H = 140;

function buildMobileDims(vpW, vpH) {
  const chartH = Math.max(vpH * CHART_MULT_V, 1400);
  const monthPx = (chartH - CHART_PAD_T - CHART_PAD_B) / TOTAL_MONTHS;
  const STRIP_H = vpH - MOBILE_HEADER_H;
  const SPINE_X = MOBILE_SPINE_X_PX;

  const toPy = (d) =>
    CHART_PAD_T + (TOTAL_MONTHS - toMonths(d)) * monthPx;

  const bH = (s, e) => {
    const endM = e === "present" ? toMonths(TODAY) : toMonths(e);
    return Math.max(monthPx * 0.5, (endM - toMonths(s)) * monthPx);
  };

  const proBandW =
    N_PRO_PROJ_ROWS * MOBILE_PROJ_W +
    Math.max(0, N_PRO_PROJ_ROWS - 1) * MOBILE_PROJ_X_GAP;
  const eduBandW =
    N_EDU_PROJ_ROWS * MOBILE_PROJ_W +
    Math.max(0, N_EDU_PROJ_ROWS - 1) * MOBILE_PROJ_X_GAP;

  const proStripStart = SPINE_X + MOBILE_SPINE_GAP;
  const eduStripStart = proStripStart + proBandW + MOBILE_INTER_BAND_GAP;
  const cardLeft = eduStripStart + eduBandW + MOBILE_BAR_X_GAP;
  const laneW = Math.max(160, vpW - MOBILE_CARD_MARGIN_R - cardLeft);

  const barLeft = () => cardLeft;

  const projLeft = (e) => {
    if (e.track === "professional") {
      const row = PRO_PROJ_LANE.get(e.id) ?? 0;
      return proStripStart + row * (MOBILE_PROJ_W + MOBILE_PROJ_X_GAP);
    }
    const row = EDU_PROJ_LANE.get(e.id) ?? 0;
    return eduStripStart + row * (MOBILE_PROJ_W + MOBILE_PROJ_X_GAP);
  };

  const entryH = {};
  const collapsedEntryH = {};
  for (const e of ENTRIES) {
    entryH[e.id] = measureBarH(e, laneW, MOBILE_FONT_PX);
    collapsedEntryH[e.id] = measureBarH(
      { ...e, bullets: e.bullets.slice(0, 2) },
      laneW,
      MOBILE_FONT_PX
    );
  }

  return {
    chartH,
    monthPx,
    STRIP_H,
    SPINE_X,
    toPy,
    bH,
    barLeft,
    laneW,
    entryH,
    collapsedEntryH,
    projLeft,
    maxOffset: Math.max(0, chartH - STRIP_H),
  };
}

function buildDims(vpW, vpH) {
  const chartH = Math.max(vpH * CHART_MULT_V, 1300);
  const monthPx = (chartH - CHART_PAD_T - CHART_PAD_B) / TOTAL_MONTHS;
  const STRIP_H = vpH - HEADER_H;
  const SPINE_X = Math.round(vpW * SPINE_RATIO);

  const toPy = (d) =>
    CHART_PAD_T + (TOTAL_MONTHS - toMonths(d)) * monthPx;

  const bH = (s, e) => {
    const endM = e === "present" ? toMonths(TODAY) : toMonths(e);
    return Math.max(monthPx * 0.5, (endM - toMonths(s)) * monthPx);
  };

  const proProjBandW =
    N_PRO_PROJ_ROWS * PROJ_W + Math.max(0, N_PRO_PROJ_ROWS - 1) * PROJ_X_GAP;
  const proCardLeft = SPINE_X + PRO_SPINE_X_GAP + proProjBandW + BAR_X_GAP;
  const proLaneW = Math.min(
    MAX_PRO_LANE_W,
    Math.max(100, vpW - CHART_EDGE_R - proCardLeft)
  );
  const proBarLeft = () => proCardLeft;
  const proProj_left = (e) => {
    const row = PRO_PROJ_LANE.get(e.id) ?? 0;
    return SPINE_X + PRO_SPINE_X_GAP + row * (PROJ_W + PROJ_X_GAP);
  };

  const eduProjBandW =
    N_EDU_PROJ_ROWS * PROJ_W + Math.max(0, N_EDU_PROJ_ROWS - 1) * PROJ_X_GAP;
  const eduCardRight = SPINE_X - EDU_SPINE_X_GAP - eduProjBandW - BAR_X_GAP;
  const eduLaneW = Math.min(
    MAX_EDU_LANE_W,
    Math.max(100, eduCardRight - CHART_EDGE_L)
  );
  const eduBarLeft = () => eduCardRight - eduLaneW;
  const eduProj_left = (e) => {
    const row = EDU_PROJ_LANE.get(e.id) ?? 0;
    return SPINE_X - EDU_SPINE_X_GAP - PROJ_W - row * (PROJ_W + PROJ_X_GAP);
  };

  const entryH = {};
  const collapsedEntryH = {};
  for (const e of ENTRIES) {
    const laneW = e.track === "professional" ? proLaneW : eduLaneW;
    entryH[e.id] = measureBarH(e, laneW);
    collapsedEntryH[e.id] = measureBarH(
      { ...e, bullets: e.bullets.slice(0, 1) },
      laneW
    );
  }

  return {
    chartH,
    monthPx,
    STRIP_H,
    SPINE_X,
    toPy,
    bH,
    proBarLeft,
    eduBarLeft,
    proLaneW,
    eduLaneW,
    entryH,
    collapsedEntryH,
    proProj_left,
    eduProj_left,
    maxOffset: Math.max(0, chartH - STRIP_H),
  };
}

function cardCenterY(
  e,
  lane,
  allEntries,
  laneMap,
  monthPx,
  pickLatest = false
) {
  const eS = toMonths(e.start);
  const eE = toMonths(e.end === "present" ? TODAY : e.end);
  const midY = (mA, mB) =>
    CHART_PAD_T + (TOTAL_MONTHS - (mA + mB) / 2) * monthPx;

  const blocked = [];
  for (const o of allEntries) {
    if (o.id === e.id || (laneMap.get(o.id) ?? 0) === lane) continue;
    const oS = toMonths(o.start);
    const oE = toMonths(o.end === "present" ? TODAY : o.end);
    if (oE > eS && oS < eE) blocked.push([Math.max(oS, eS), Math.min(oE, eE)]);
  }

  if (blocked.length === 0) return midY(eS, eE);

  blocked.sort((a, b) => a[0] - b[0]);
  const gaps = [];
  if (blocked[0][0] > eS) gaps.push([eS, blocked[0][0]]);
  for (let i = 0; i < blocked.length - 1; i++) {
    if (blocked[i][1] < blocked[i + 1][0])
      gaps.push([blocked[i][1], blocked[i + 1][0]]);
  }
  if (blocked[blocked.length - 1][1] < eE)
    gaps.push([blocked[blocked.length - 1][1], eE]);

  if (gaps.length === 0) return midY(eS, eE);

  if (pickLatest) {
    const latest = gaps.reduce((a, b) => (b[0] > a[0] ? b : a));
    return midY(latest[0], latest[1]);
  }

  const best = gaps.reduce((a, b) => (b[1] - b[0] > a[1] - a[0] ? b : a));
  return midY(best[0], best[1]);
}

export function ExperienceSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const scanYTargetRef = useRef(0);
  const prevTargetRef = useRef(0);
  const tailVelRef = useRef(0);
  const dimsRef = useRef(null);

  const [vpW, setVpW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [vpH, setVpH] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );
  const [chartOffset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const sync = () => {
      setVpW(window.innerWidth);
      setVpH(window.innerHeight);
    };
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  const dims = useMemo(() => buildDims(vpW, vpH), [vpW, vpH]);
  const mDims = useMemo(() => buildMobileDims(vpW, vpH), [vpW, vpH]);

  useEffect(() => {
    dimsRef.current = isMobile ? mDims : dims;
  }, [dims, mDims, isMobile]);

  // Connect scroll listener to document.querySelector(".hologram-interface") OR window fallback!
  useEffect(() => {
    const scroller =
      document.querySelector(".hologram-interface") || window;
    const section = sectionRef.current;
    if (!section) return;

    const maxOff = isMobile ? mDims.maxOffset : dims.maxOffset;

    let cachedTop = null;
    const measureTop = () => {
      if (scroller !== window) {
        let acc = 0;
        let el = section;
        while (el && el !== scroller) {
          acc += el.offsetTop;
          el = el.offsetParent;
        }
        cachedTop = acc;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        let raw = 0;
        if (scroller !== window && scroller.scrollTop !== undefined) {
          if (cachedTop === null) measureTop();
          raw = scroller.scrollTop - (cachedTop ?? 0);
        } else {
          const rect = section.getBoundingClientRect();
          raw = -rect.top;
        }
        setOffset(Math.max(0, Math.min(maxOff, raw)));
      });
    };

    requestAnimationFrame(() => {
      measureTop();
      onScroll();
    });

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        cachedTop = null;
      },
      { passive: true }
    );

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, dims.maxOffset, mDims.maxOffset]);

  // Auto-close expanded card on scroll
  useEffect(() => {
    if (expanded === null) return;
    const scroller =
      document.querySelector(".hologram-interface") || window;
    const close = () => setExpanded(null);
    scroller.addEventListener("scroll", close, { passive: true, once: true });
    return () => scroller.removeEventListener("scroll", close);
  }, [expanded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = vpW;
    canvas.height = (isMobile ? mDims : dims).STRIP_H;
  }, [vpW, dims, mDims, isMobile]);

  // Particle draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let last = performance.now();
    let particleRaf = 0;

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target = scanYTargetRef.current;
      const targetDelta = target - prevTargetRef.current;
      prevTargetRef.current = target;
      if (Math.abs(targetDelta) > 0.1) {
        tailVelRef.current = targetDelta / Math.max(dt, 0.001);
      } else {
        tailVelRef.current *= Math.pow(0.001, dt);
      }

      if (Math.abs(tailVelRef.current) > 5 && dimsRef.current) {
        const { SPINE_X } = dimsRef.current;
        const sign = tailVelRef.current > 0 ? -1 : 1;
        const speed = Math.min(Math.abs(tailVelRef.current) * 0.85, 200);
        const count = Math.max(
          1,
          Math.min(6, Math.round(Math.abs(tailVelRef.current) / 25))
        );
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: SPINE_X + (Math.random() - 0.5) * 6,
            y: target + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 30,
            vy: sign * speed * (0.4 + Math.random() * 0.6),
            life: 1,
            size: 0.8 + Math.random() * 1.5,
          });
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      for (const p of particlesRef.current) {
        p.life -= dt / 0.5;
        if (p.life <= 0) continue;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        ctx.globalAlpha = p.life * 0.9;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.3, p.size * p.life), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      particleRaf = requestAnimationFrame(draw);
    };
    particleRaf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(particleRaf);
  }, [isMobile]);

  useEffect(() => {
    const activeDims = isMobile ? mDims : dims;
    if (activeDims.maxOffset === 0) return;
    scanYTargetRef.current =
      (chartOffset / activeDims.maxOffset) * activeDims.STRIP_H;
  }, [chartOffset, dims, mDims, isMobile]);

  const {
    chartH,
    STRIP_H,
    SPINE_X,
    toPy,
    bH,
    proBarLeft,
    eduBarLeft,
    proLaneW,
    eduLaneW,
    entryH,
    collapsedEntryH,
    proProj_left,
    eduProj_left,
    monthPx,
    maxOffset,
  } = dims;

  const sectionH = vpH + maxOffset;

  const compressRatio = maxOffset > 0 ? Math.min(1, chartOffset / 100) : 0;
  const headerGapPx = 80 * (1 - compressRatio) + 20 * compressRatio;

  const renderBar = (
    e,
    top,
    left,
    width,
    height,
    collapsedHeight,
    fontPx = FONT_PX,
    interactive = false
  ) => {
    const clr = CLR[e.id];
    const roleFontSize = fontPx < FONT_PX ? "0.72rem" : "0.80rem";
    const isExp = !interactive || expanded === e.id;

    const header = interactive ? (
      <>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: roleFontSize,
            color: "#fafaf8",
            lineHeight: 1.25,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 2,
          }}
        >
          {e.role}
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.50rem",
            color: `${clr}bb`,
            letterSpacing: "0.04em",
            display: "block",
            lineHeight: 1.4,
          }}
        >
          {e.company}
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.44rem",
            color: "rgba(255,255,255,0.26)",
            letterSpacing: "0.06em",
            display: "block",
            lineHeight: 1.6,
            whiteSpace: "nowrap",
          }}
        >
          {e.period}
        </span>
      </>
    ) : (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 6,
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: roleFontSize,
              color: "#fafaf8",
              lineHeight: 1.25,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {e.role}
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.44rem",
              color: "rgba(255,255,255,0.26)",
              letterSpacing: "0.06em",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {e.period}
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.50rem",
            color: `${clr}bb`,
            letterSpacing: "0.04em",
            display: "block",
            lineHeight: 1.4,
          }}
        >
          {e.company}
        </span>
      </>
    );

    const bulletsEl = (
      <div
        style={{
          padding: `0 ${PAD_X}px ${PAD_BOTTOM}px`,
          display: "flex",
          flexDirection: "column",
          gap: BULLET_GAP,
        }}
      >
        {e.bullets.map((b, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 5, alignItems: "flex-start" }}
          >
            <span
              style={{
                color: clr,
                fontSize: "0.42rem",
                flexShrink: 0,
                marginTop: "0.22rem",
                opacity: 0.7,
              }}
            >
              ▪
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: `${fontPx}px`,
                lineHeight: FONT_LH,
                color: "rgba(255,255,255,0.62)",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {b}
            </span>
          </div>
        ))}
      </div>
    );

    const headerEl = (
      <div style={{ padding: `${PAD_TOP}px ${PAD_X}px 0`, flexShrink: 0 }}>
        {header}
        <div
          style={{
            height: 1,
            background: `${clr}20`,
            marginTop: 5,
            marginBottom: 9,
          }}
        />
      </div>
    );

    return (
      <div
        key={e.id}
        onClick={
          interactive
            ? () => setExpanded((prev) => (prev === e.id ? null : e.id))
            : undefined
        }
        style={{
          position: "absolute",
          left,
          top,
          width,
          ...(interactive ? {} : { height }),
          background: `linear-gradient(180deg, ${clr}0e 0%, ${clr}05 100%)`,
          borderLeft: `2px solid ${clr}`,
          borderTop: `1px solid ${clr}28`,
          borderBottom: `1px solid ${clr}28`,
          borderRight: `1px solid ${clr}28`,
          borderRadius: "3px",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          cursor: interactive ? "pointer" : "default",
          transition: interactive
            ? "top 0.45s cubic-bezier(0.76, 0, 0.24, 1)"
            : undefined,
        }}
      >
        {interactive ? (
          <div
            style={{
              overflow: "hidden",
              maxHeight: isExp ? height : collapsedHeight,
              transition: "max-height 0.45s cubic-bezier(0.76, 0, 0.24, 1)",
              ...(!isExp
                ? {
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 55%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 55%, transparent 100%)",
                  }
                : {}),
            }}
          >
            {headerEl}
            {bulletsEl}
          </div>
        ) : (
          <>
            {headerEl}
            {bulletsEl}
          </>
        )}
      </div>
    );
  };

  // Mobile Gantt render
  if (isMobile) {
    const {
      chartH: mChartH,
      STRIP_H: mStripH,
      SPINE_X: mSpineX,
      toPy: mToPy,
      bH: mBH,
      barLeft: mBarLeft,
      laneW: mLaneW,
      entryH: mEntryH,
      collapsedEntryH: mCollapsedEntryH,
      projLeft: mProjLeft,
      monthPx: mMonthPx,
      maxOffset: mMaxOffset,
    } = mDims;

    const mSectionH = vpH + mMaxOffset;
    const mScanY = mMaxOffset > 0 ? (chartOffset / mMaxOffset) * mStripH : 0;

    return (
      <div
        ref={sectionRef}
        id="experience"
        style={{ position: "relative", height: mSectionH }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: vpH,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "0.7rem 4vw 0.6rem",
              opacity: 1,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                }}
              >
                Experience & Education
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontWeight: 800,
                fontSize: "clamp(1.85rem, 7.5vw, 2.4rem)",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                color: "#fafaf8",
                margin: 0,
              }}
            >
              The trajectory.
            </h2>
          </div>

          {/* Chart strip */}
          <div
            style={{
              position: "relative",
              width: "100%",
              flex: 1,
              overflow: "hidden",
              opacity: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: mChartH,
                transform: `translateY(-${chartOffset}px)`,
              }}
            >
              {/* Faint year grid */}
              {YEAR_MARKS.map((y) => (
                <div
                  key={y}
                  style={{
                    position: "absolute",
                    top: mToPy(new Date(y, 0, 1)),
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "rgba(255,255,255,0.04)",
                  }}
                />
              ))}

              {/* Spine */}
              {(() => {
                const GAP = 11;
                const markYs = YEAR_MARKS.map((y) =>
                  mToPy(new Date(y, 0, 1))
                ).sort((a, b) => a - b);
                const segs = [];
                let prev = 0;
                for (const my of markYs) {
                  const h = my - GAP - prev;
                  if (h > 0) segs.push({ top: prev, height: h });
                  prev = my + GAP;
                }
                const tail = mChartH - prev;
                if (tail > 0) segs.push({ top: prev, height: tail });
                return segs.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: mSpineX,
                      top: s.top,
                      height: s.height,
                      width: 1,
                      background: "rgba(255,255,255,0.15)",
                    }}
                  />
                ));
              })()}

              {/* Year ticks + labels */}
              {YEAR_MARKS.map((y) => {
                const yPos = mToPy(new Date(y, 0, 1));
                return (
                  <div key={y}>
                    <div
                      style={{
                        position: "absolute",
                        top: yPos,
                        left: mSpineX - 4,
                        width: 8,
                        height: 1,
                        background: "rgba(255,255,255,0.22)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: yPos - 7,
                        left: 0,
                        width: mSpineX - 3,
                        textAlign: "right",
                        fontFamily: FONT_MONO,
                        fontSize: "0.44rem",
                        letterSpacing: "0.04em",
                        color: "rgba(255,255,255,0.45)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {y}
                    </span>
                  </div>
                );
              })}

              {/* Projection strips */}
              {ENTRIES.map((e) => {
                const endDate = e.end === "present" ? TODAY : e.end;
                const stripTop = mToPy(endDate);
                const stripHv = mBH(e.start, e.end);
                return (
                  <div
                    key={`mp-${e.id}`}
                    style={{
                      position: "absolute",
                      top: e.end === "present" ? stripTop - 20 : stripTop,
                      left: mProjLeft(e),
                      width: MOBILE_PROJ_W,
                      height: e.end === "present" ? stripHv + 20 : stripHv,
                      background: CLR[e.id],
                      borderRadius: 2,
                      opacity: 0.82,
                    }}
                  />
                );
              })}

              {/* Entry cards */}
              {(() => {
                const baseTops = new Map();
                for (const e of ENTRIES) {
                  let cy;
                  if (e.track === "professional") {
                    const lane = PRO_LANE.get(e.id) ?? 0;
                    cy = cardCenterY(e, lane, PRO, PRO_LANE, mMonthPx);
                  } else {
                    const lane = ALL_LANE.get(e.id) ?? 0;
                    cy = cardCenterY(
                      e,
                      lane,
                      ENTRIES,
                      ALL_LANE,
                      mMonthPx,
                      true
                    );
                  }
                  baseTops.set(e.id, cy - mCollapsedEntryH[e.id] / 2);
                }

                const expandedTop =
                  expanded !== null
                    ? baseTops.get(expanded) ?? -Infinity
                    : -Infinity;
                const pushDelta =
                  expanded !== null
                    ? mEntryH[expanded] - mCollapsedEntryH[expanded]
                    : 0;

                return ENTRIES.map((e) => {
                  const base = baseTops.get(e.id);
                  const top =
                    expanded !== null && e.id !== expanded && base > expandedTop
                      ? base + pushDelta
                      : base;
                  return renderBar(
                    e,
                    top,
                    mBarLeft(e.id),
                    mLaneW,
                    mEntryH[e.id],
                    mCollapsedEntryH[e.id],
                    MOBILE_FONT_PX,
                    true
                  );
                });
              })()}
            </div>

            {/* Particle canvas */}
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* Spine laser line & comet head */}
            <>
              <div
                style={{
                  position: "absolute",
                  left: mSpineX,
                  top: 0,
                  width: 1,
                  height: mScanY,
                  background: "#ffffff",
                  opacity: 0.9,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: mSpineX - 4,
                  top: mScanY - 4,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#ffffff",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />
            </>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Gantt render
  const scanY = maxOffset > 0 ? (chartOffset / maxOffset) * STRIP_H : 0;

  return (
    <div
      ref={sectionRef}
      id="experience"
      style={{ position: "relative", height: sectionH }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: vpH,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "0.85rem 6vw 2rem",
            opacity: 1,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: headerGapPx,
            }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}
            >
              Experience & Education
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              color: "#fafaf8",
              margin: 0,
            }}
          >
            The trajectory.
          </h2>
        </div>

        {/* Chart strip */}
        <div
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            overflow: "hidden",
            opacity: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: chartH,
              transform: `translateY(-${chartOffset}px)`,
            }}
          >
            {/* Faint year grid */}
            {YEAR_MARKS.map((y) => (
              <div
                key={y}
                style={{
                  position: "absolute",
                  top: toPy(new Date(y, 0, 1)),
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "rgba(255,255,255,0.04)",
                }}
              />
            ))}

            {/* Spine */}
            {(() => {
              const GAP = 11;
              const markYs = YEAR_MARKS.map((y) =>
                toPy(new Date(y, 0, 1))
              ).sort((a, b) => a - b);
              const segs = [];
              let prev = 0;
              for (const my of markYs) {
                const h = my - GAP - prev;
                if (h > 0) segs.push({ top: prev, height: h });
                prev = my + GAP;
              }
              const tail = chartH - prev;
              if (tail > 0) segs.push({ top: prev, height: tail });
              return segs.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: SPINE_X,
                    top: s.top,
                    height: s.height,
                    width: 1,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              ));
            })()}

            {/* Year labels */}
            {YEAR_MARKS.map((y) => {
              const yPos = toPy(new Date(y, 0, 1));
              return (
                <span
                  key={y}
                  style={{
                    position: "absolute",
                    top: yPos - 8,
                    left: SPINE_X - 18,
                    width: 36,
                    textAlign: "center",
                    fontFamily: FONT_MONO,
                    fontSize: "0.52rem",
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.45)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {y}
                </span>
              );
            })}

            {/* Professional projection strips */}
            {PRO.map((e) => {
              const endDate = e.end === "present" ? TODAY : e.end;
              const stripTop = toPy(endDate);
              const stripHv = bH(e.start, e.end);
              return (
                <div
                  key={`p-${e.id}`}
                  style={{
                    position: "absolute",
                    top: e.end === "present" ? stripTop - 20 : stripTop,
                    left: proProj_left(e),
                    width: PROJ_W,
                    height: e.end === "present" ? stripHv + 20 : stripHv,
                    background: CLR[e.id],
                    borderRadius: 2,
                    opacity: 0.85,
                  }}
                />
              );
            })}

            {/* Education projection strips */}
            {EDU.map((e) => {
              const endDate = e.end === "present" ? TODAY : e.end;
              const stripTop = toPy(endDate);
              const stripHv = bH(e.start, e.end);
              return (
                <div
                  key={`p-${e.id}`}
                  style={{
                    position: "absolute",
                    top: e.end === "present" ? stripTop - 20 : stripTop,
                    left: eduProj_left(e),
                    width: PROJ_W,
                    height: e.end === "present" ? stripHv + 20 : stripHv,
                    background: CLR[e.id],
                    borderRadius: 2,
                    opacity: 0.85,
                  }}
                />
              );
            })}

            {/* Render cards */}
            {PRO.map((e) => {
              const lane = PRO_LANE.get(e.id) ?? 0;
              const cy = cardCenterY(e, lane, PRO, PRO_LANE, monthPx);
              return renderBar(
                e,
                cy - entryH[e.id] / 2,
                proBarLeft(e.id),
                proLaneW,
                entryH[e.id],
                collapsedEntryH[e.id]
              );
            })}

            {EDU.map((e) => {
              const lane = EDU_LANE.get(e.id) ?? 0;
              const cy = cardCenterY(e, lane, EDU, EDU_LANE, monthPx);
              return renderBar(
                e,
                cy - entryH[e.id] / 2,
                eduBarLeft(e.id),
                eduLaneW,
                entryH[e.id],
                collapsedEntryH[e.id]
              );
            })}
          </div>

          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Spine laser line & comet head */}
          <>
            <div
              style={{
                position: "absolute",
                left: SPINE_X,
                top: 0,
                width: 1,
                height: scanY,
                background: "#ffffff",
                opacity: 0.9,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: SPINE_X - 4,
                top: scanY - 4,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#ffffff",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />
          </>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;