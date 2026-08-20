import { useEffect } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "certificates",
  "experience",
  "contact",
];

function getSectionFromPath(path) {
  const section = path.replace(/^\//, "");
  return SECTION_IDS.includes(section) ? section : "";
}

export function scrollToSection(id, behavior = "smooth") {
  const container = document.querySelector(".hologram-interface");
  if (!container) return;
  const target = document.getElementById(id);
  if (!target) return;

  const paddingTop = parseFloat(getComputedStyle(target).paddingTop) || 0;
  const offset =
    container.scrollTop +
    target.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    paddingTop;

  const portfolioScroll = window.__portfolioScrollTop;
  if (behavior === "smooth" && portfolioScroll) {
    portfolioScroll(offset);
  } else {
    container.scrollTo({ top: offset, behavior });
  }
}

export function useHashScroll() {
  useEffect(() => {
    const container = document.querySelector(".hologram-interface");
    if (!container) return;

    const pathSection = getSectionFromPath(window.location.pathname);
    const hashSection = window.location.hash.slice(1);
    const initial =
      pathSection || (SECTION_IDS.includes(hashSection) ? hashSection : "");

    if (initial && initial !== "hero") {
      let attempts = 0;
      const tryScroll = () => {
        const target = document.getElementById(initial);
        if (target) {
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              requestAnimationFrame(() => {
                scrollToSection(initial, "instant");
                setTimeout(() => scrollToSection(initial, "instant"), 300);
              });
            });
          } else {
            scrollToSection(initial, "instant");
          }
        } else if (attempts < 20) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 50);
    }

    const updatePath = () => {
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + containerRect.height * 0.4;

      let activeId = "";
      let bestDist = Infinity;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          const dist = threshold - top;
          if (dist < bestDist) {
            bestDist = dist;
            activeId = id;
          }
        }
      }

      if (activeId) {
        const next = activeId === "hero" ? "/" : `/${activeId}`;
        if (window.location.pathname !== next) {
          history.replaceState(null, "", next);
        }
      }
    };

    container.addEventListener("scroll", updatePath, { passive: true });
    return () => container.removeEventListener("scroll", updatePath);
  }, []);
}
