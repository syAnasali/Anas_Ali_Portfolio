import React, { useEffect, useRef } from "react";
import { useIsMobile, useIsTouchDevice } from "../hooks/useMediaQuery";

export function Cursor() {
  const isTouchDevice = useIsTouchDevice();
  const isMobile = useIsMobile();
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const posX = useRef(-300);
  const posY = useRef(-300);
  const curX = useRef(-300);
  const curY = useRef(-300);
  const rafId = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (isTouchDevice || isMobile) return;

    const styleEl = document.createElement("style");
    styleEl.dataset.cursorOverride = "1";
    styleEl.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    const lerp = () => {
      curX.current += (posX.current - curX.current) * 0.4;
      curY.current += (posY.current - curY.current) * 0.4;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${curX.current - 26}px,${curY.current - 26}px,0)`;
      }

      const dx = posX.current - curX.current;
      const dy = posY.current - curY.current;
      if (Math.abs(dx) > 0.06 || Math.abs(dy) > 0.06) {
        rafId.current = requestAnimationFrame(lerp);
      } else {
        ticking.current = false;
      }
    };

    const onMove = (e) => {
      posX.current = e.clientX;
      posY.current = e.clientY;
      if (wrapRef.current) wrapRef.current.style.opacity = "1";
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(lerp);
      }
    };

    const SEMANTIC =
      "a, button, input, select, textarea, label, summary, " +
      '[role="button"], [role="link"], [role="menuitem"], [role="tab"], ' +
      '[role="checkbox"], [role="radio"], [role="switch"], ' +
      '[tabindex]:not([tabindex="-1"]), [data-hover], .cosmic-button';

    const isClickable = (el) => {
      let cur = el;
      while (cur && cur !== document.documentElement) {
        if (cur.matches && cur.matches(SEMANTIC)) return true;
        if (cur.style && cur.style.cursor === "pointer") return true;
        cur = cur.parentElement;
      }
      return false;
    };

    const onOver = (e) => {
      if (isClickable(e.target)) {
        svgRef.current?.classList.add("iss-hovering");
      }
    };

    const onOut = (e) => {
      if (!isClickable(e.relatedTarget)) {
        svgRef.current?.classList.remove("iss-hovering");
      }
    };

    const onDocLeave = (e) => {
      if (e.relatedTarget === null) {
        if (wrapRef.current) wrapRef.current.style.opacity = "0";
        svgRef.current?.classList.remove("iss-hovering");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mouseleave", onDocLeave, { passive: true });

    return () => {
      styleEl.remove();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onDocLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice, isMobile]);

  if (isTouchDevice || isMobile) return null;

  return (
    <>
      <style>{`
        .iss-cursor .iss-arc {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center bottom;
        }

        .iss-cursor.iss-hovering {
          color: #22d3ee !important;
          filter: drop-shadow(0 0 7px rgba(34,211,238,0.55));
        }

        @keyframes iss-arc-emit {
          0%   { opacity: 0;    transform: translateY(1px)   scaleX(0.45) scaleY(0.3);  }
          14%  { opacity: 0.95; }
          100% { opacity: 0;    transform: translateY(-18px) scaleX(2.0)  scaleY(1.8);  }
        }

        .iss-cursor.iss-hovering .iss-arc-1 {
          animation: iss-arc-emit 1.8s ease-out infinite;
        }
        .iss-cursor.iss-hovering .iss-arc-2 {
          animation: iss-arc-emit 1.8s ease-out infinite;
          animation-delay: 0.36s;
        }
        .iss-cursor.iss-hovering .iss-arc-3 {
          animation: iss-arc-emit 1.8s ease-out infinite;
          animation-delay: 0.72s;
        }
        .iss-cursor.iss-hovering .iss-arc-4 {
          animation: iss-arc-emit 1.8s ease-out infinite;
          animation-delay: 1.08s;
        }
        .iss-cursor.iss-hovering .iss-arc-5 {
          animation: iss-arc-emit 1.8s ease-out infinite;
          animation-delay: 1.44s;
        }
      `}</style>

      <div
        ref={wrapRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "52px",
          height: "52px",
          pointerEvents: "none",
          zIndex: 2147483647,
          opacity: 0,
          willChange: "transform",
        }}
      >
        <svg
          className="iss-cursor"
          ref={svgRef}
          width="52"
          height="52"
          viewBox="0 0 40 40"
          style={{
            display: "block",
            color: "var(--cursor-color, rgba(255,255,255,0.92))",
            filter: "drop-shadow(0 0 2px rgba(255,255,255,0.25))",
            transition: "color 0.22s ease, filter 0.22s ease",
            overflow: "visible",
          }}
        >
          <rect
            x="16.5"
            y="18"
            width="7"
            height="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />

          <line
            x1="2"
            y1="20"
            x2="38"
            y2="20"
            stroke="currentColor"
            strokeWidth="0.85"
          />

          <rect
            x="2"
            y="15.5"
            width="7"
            height="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <rect
            x="31"
            y="15.5"
            width="7"
            height="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />

          <rect
            x="11"
            y="15.5"
            width="5"
            height="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity="0.6"
          />
          <rect
            x="24"
            y="15.5"
            width="5"
            height="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity="0.6"
          />

          <line
            x1="20"
            y1="12"
            x2="20"
            y2="18"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <line
            x1="20"
            y1="22"
            x2="20"
            y2="28"
            stroke="currentColor"
            strokeWidth="0.75"
          />

          <path
            d="M16,13 Q20,10 24,13"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
          />

          <circle cx="20" cy="20" r="0.7" fill="currentColor" />

          <path
            className="iss-arc iss-arc-1"
            d="M15,11 Q20,7 25,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.65"
          />
          <path
            className="iss-arc iss-arc-2"
            d="M13,10 Q20,4 27,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            className="iss-arc iss-arc-3"
            d="M11,9  Q20,2 29,9"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
          />
          <path
            className="iss-arc iss-arc-4"
            d="M9,8   Q20,0 31,8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
          />
          <path
            className="iss-arc iss-arc-5"
            d="M7,7   Q20,-3 33,7"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.18"
          />
        </svg>
      </div>
    </>
  );
}
