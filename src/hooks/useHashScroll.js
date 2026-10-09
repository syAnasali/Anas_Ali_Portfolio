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

  if (id === "hero" || !id) {
    const portfolioScroll = window.__portfolioScrollTop;
    if (behavior === "smooth" && portfolioScroll) {
      portfolioScroll(0);
    } else {
      container.scrollTo({ top: 0, behavior });
    }
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const offset = Math.max(0, container.scrollTop + (targetRect.top - containerRect.top));

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

    const hashSection = window.location.hash.replace(/^#/, "");
    const pathSection = getSectionFromPath(window.location.pathname);
    const initial =
      (SECTION_IDS.includes(hashSection) ? hashSection : "") || pathSection;

    if (initial && initial !== "hero") {
      let attempts = 0;
      const tryScroll = () => {
        const target = document.getElementById(initial);
        if (target) {
          scrollToSection(initial, "instant");
          setTimeout(() => scrollToSection(initial, "instant"), 350);
        } else if (attempts < 20) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 50);

      if (pathSection) {
        history.replaceState(null, "", `/#${pathSection}`);
      }
    }

    let scrollTimer = null;
    const updateHashOnScroll = () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
        const containerRect = container.getBoundingClientRect();
        const threshold = containerRect.top + containerRect.height * 0.35;

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
          if (activeId === "hero") {
            if (window.location.hash) {
              history.replaceState(null, "", window.location.pathname);
            }
          } else {
            const nextHash = `#${activeId}`;
            if (window.location.hash !== nextHash) {
              history.replaceState(null, "", nextHash);
            }
          }
        }
      }, 100);
    };

    container.addEventListener("scroll", updateHashOnScroll, { passive: true });
    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      container.removeEventListener("scroll", updateHashOnScroll);
    };
  }, []);
}
