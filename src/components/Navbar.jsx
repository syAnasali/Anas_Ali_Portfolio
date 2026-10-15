import React, { useState, useRef, useCallback, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile, useIsTouchDevice } from "../hooks/useMediaQuery";
import { scrollToSection } from "../hooks/useHashScroll";

const navBeforeWork = [
  { label: "About", href: "#about", section: "about" },
  { label: "Skills", href: "#skills", section: "skills" },
];

const workItems = [
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Certifications", href: "#certificates", section: "certificates" },
];

const navAfterWork = [
  { label: "Experience", href: "#experience", section: "experience" },
  { label: "Contact", href: "#contact", section: "contact" },
];

const navLinkStyle = {
  fontFamily: '"DM Mono", monospace',
  fontSize: "0.65rem",
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "var(--text-muted, rgba(255,255,255,0.35))",
  textDecoration: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.65rem 0.4rem",
  cursor: "none",
  transition: "color 0.2s, background 0.2s",
  borderRadius: "3px",
};

export const Navbar = () => {
  const isMobile = useIsMobile();
  const isTouchDevice = useIsTouchDevice();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  const workRef = useRef(null);
  const workTimerRef = useRef(null);

  const openWork = useCallback(() => {
    if (workTimerRef.current) clearTimeout(workTimerRef.current);
    setWorkOpen(true);
  }, []);

  const scheduleCloseWork = useCallback(() => {
    workTimerRef.current = setTimeout(() => setWorkOpen(false), 140);
  }, []);

  useEffect(() => {
    if (!workOpen) return;
    const handler = (e) => {
      if (workRef.current && !workRef.current.contains(e.target)) {
        setWorkOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [workOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <>
      {/* Horizontal divider line inside header */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          top: isMobile ? 50 : 76,
          left: isMobile ? "5.5vw" : "8.5vw",
          right: isMobile ? "5.5vw" : "8.5vw",
          height: "1px",
          background: "var(--border-subtle, rgba(255,255,255,0.08))",
          transformOrigin: "left",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {isMobile ? (
        <>
          {/* Mobile Hamburger Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              position: "fixed",
              top: 18,
              right: "5.5vw",
              zIndex: 9999,
              background: "var(--bg-surface-elevated, rgba(10,10,10,0.85))",
              border: "1px solid var(--border-card, rgba(255,255,255,0.18))",
              borderRadius: "4px",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-heading, #fafaf8)",
              cursor: "pointer",
              padding: 0,
              backdropFilter: "blur(8px)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex" }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex" }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile full-screen overlay menu with Left-Aligned Staggered Slide-In Links */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "var(--bg-page, #030303)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  zIndex: 9998,
                  display: "flex",
                  flexDirection: "column",
                  padding: "90px 8vw 48px",
                  overflowY: "auto",
                }}
              >
                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    flex: 1,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {/* Item 01: About */}
                  <motion.a
                    href="#about"
                    initial={{ opacity: 0, x: -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      scrollToSection("about");
                      history.replaceState(null, "", "#about");
                    }}
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.82rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-heading, rgba(255,255,255,0.85))",
                      textDecoration: "none",
                      padding: "1.2rem 0",
                      borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    About
                  </motion.a>

                  {/* Item 02: Skills */}
                  <motion.a
                    href="#skills"
                    initial={{ opacity: 0, x: -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.14, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      scrollToSection("skills");
                      history.replaceState(null, "", "#skills");
                    }}
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.82rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-heading, rgba(255,255,255,0.85))",
                      textDecoration: "none",
                      padding: "1.2rem 0",
                      borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    Skills
                  </motion.a>

                  {/* Item 03: Work Accordion */}
                  <motion.div
                    initial={{ opacity: 0, x: -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <button
                      onClick={() => setMobileWorkOpen((v) => !v)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                        padding: "1.2rem 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: '"DM Mono", monospace',
                        fontSize: "0.82rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-heading, rgba(255,255,255,0.85))",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span>Work</span>
                      <motion.span
                        animate={{ rotate: mobileWorkOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          fontSize: "1.1em",
                          opacity: 0.55,
                          display: "inline-block",
                        }}
                      >
                        ▾
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileWorkOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          {workItems.map(({ label, href, section }) => (
                            <a
                              key={href}
                              href={href}
                              onClick={(e) => {
                                e.preventDefault();
                                setMenuOpen(false);
                                setMobileWorkOpen(false);
                                scrollToSection(section);
                                history.replaceState(null, "", href);
                              }}
                              style={{
                                display: "block",
                                fontFamily: '"DM Mono", monospace',
                                fontSize: "0.72rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--text-body, rgba(255,255,255,0.65))",
                                textDecoration: "none",
                                padding: "0.85rem 0 0.85rem 1.25rem",
                                borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.04))",
                                textAlign: "left",
                              }}
                            >
                              {label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Item 04: Experience */}
                  <motion.a
                    href="#experience"
                    initial={{ opacity: 0, x: -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.26, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      scrollToSection("experience");
                      history.replaceState(null, "", "#experience");
                    }}
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.82rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-heading, rgba(255,255,255,0.85))",
                      textDecoration: "none",
                      padding: "1.2rem 0",
                      borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    Experience
                  </motion.a>

                  {/* Item 05: Contact */}
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, x: -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      scrollToSection("contact");
                      history.replaceState(null, "", "#contact");
                    }}
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.82rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-heading, rgba(255,255,255,0.85))",
                      textDecoration: "none",
                      padding: "1.2rem 0",
                      borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    Contact
                  </motion.a>

                  {/* Item 06: Resume / CV */}
                  <motion.a
                    href="/Anas_Ali_Resume.pdf"
                    download="Anas_Ali_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.36, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.82rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--electric-cyan, #00f0ff)",
                      textDecoration: "none",
                      padding: "1.2rem 0",
                      borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <span>Resume / CV</span>
                    <span
                      style={{
                        fontSize: "0.62rem",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        border: "1px solid rgba(0, 240, 255, 0.3)",
                        background: "rgba(0, 240, 255, 0.08)",
                        color: "var(--electric-cyan, #00f0ff)",
                      }}
                    >
                      PDF
                    </span>
                  </motion.a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Desktop Grid Header Nav */
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            position: "absolute",
            top: 36,
            left: "8.5vw",
            right: "8.5vw",
            display: "grid",
            gridTemplateColumns: `repeat(${
              navBeforeWork.length + 1 + navAfterWork.length
            }, 1fr)`,
            zIndex: 5,
            background: "transparent",
          }}
        >
          {navBeforeWork.map(({ label, href, section }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                if (section) {
                  e.preventDefault();
                  scrollToSection(section);
                  history.replaceState(null, "", href);
                }
              }}
              style={navLinkStyle}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-heading, rgba(255,255,255,0.9))";
                el.style.background =
                  "linear-gradient(to top, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-muted, rgba(255,255,255,0.35))";
                el.style.background = "transparent";
              }}
            >
              {label}
            </a>
          ))}

          {/* Work ▾ Dropdown Container */}
          <div
            ref={workRef}
            onMouseEnter={openWork}
            onMouseLeave={scheduleCloseWork}
            style={{ position: "relative", display: "flex" }}
          >
            <div
              style={{
                flex: 1,
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.65rem",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "var(--text-muted, rgba(255,255,255,0.35))",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                padding: "0.65rem 0.4rem",
                cursor: isTouchDevice ? "pointer" : "none",
                transition: "color 0.2s, background 0.2s",
                borderRadius: "3px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-heading, rgba(255,255,255,0.9))";
                el.style.background =
                  "linear-gradient(to top, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-muted, rgba(255,255,255,0.35))";
                el.style.background = "transparent";
              }}
            >
              <span>Work</span>
              <span
                style={{
                  fontSize: "1.2em",
                  opacity: 0.65,
                  marginTop: "0.05em",
                }}
              >
                ▾
              </span>
            </div>

            {/* Dropdown Menu Glass Overlay */}
            <AnimatePresence>
              {workOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  onMouseEnter={openWork}
                  onMouseLeave={scheduleCloseWork}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 2px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--bg-surface, rgba(6,6,6,0.85))",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.1))",
                    borderRadius: "4px",
                    padding: "0.5rem 0",
                    minWidth: "180px",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    zIndex: 50,
                  }}
                >
                  {workItems.map(({ label, href, section }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        setWorkOpen(false);
                        scrollToSection(section);
                        history.replaceState(null, "", href);
                      }}
                      style={{
                        display: "block",
                        fontFamily: '"DM Mono", monospace',
                        fontSize: "0.62rem",
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                        color: "var(--text-muted, rgba(255,255,255,0.4))",
                        textDecoration: "none",
                        padding: "0.75rem 1.3rem",
                        cursor: isTouchDevice ? "pointer" : "none",
                        transition: "color 0.15s, background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.color = "var(--text-heading, rgba(255,255,255,0.9))";
                        el.style.background = "var(--pill-bg-active, rgba(255,255,255,0.05))";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.color = "var(--text-muted, rgba(255,255,255,0.4))";
                        el.style.background = "transparent";
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navAfterWork.map(({ label, href, section }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                if (section) {
                  e.preventDefault();
                  scrollToSection(section);
                  history.replaceState(null, "", href);
                }
              }}
              style={navLinkStyle}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-heading, rgba(255,255,255,0.9))";
                el.style.background =
                  "linear-gradient(to top, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-muted, rgba(255,255,255,0.35))";
                el.style.background = "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;