import React, { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, FileDown, Cpu, Globe, Brain } from "lucide-react";
import { useIsMobile, useIsTouchDevice } from "../hooks/useMediaQuery";
import { scrollToSection } from "../hooks/useHashScroll";

const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const CONTACT_EMAIL = "anasali.global@gmail.com";

const DOMAINS = [
  {
    id: "WEB",
    title: "01 // FULL-STACK WEB",
    icon: <Globe size={16} className="text-cyan-400" />,
    skills: ["React 18", "Next.js 15", "Tailwind CSS", "Supabase", "Node.js", "Prisma"],
    highlight: "Full-Stack Web Architecture",
  },
  {
    id: "AI",
    title: "02 // AI & DATA SCIENCE",
    icon: <Brain size={16} className="text-purple-400" />,
    skills: ["PyTorch", "Scikit-Learn", "GenAI", "LangChain", "OpenCV", "Python"],
    highlight: "Oracle Certified Professional",
  },
  {
    id: "ROBOTICS",
    title: "03 // ROBOTICS & IOT",
    icon: <Cpu size={16} className="text-emerald-400" />,
    skills: ["ESP32", "Arduino", "SolidWorks", "Proteus", "Blynk", "Perception"],
    highlight: "Model Wall-E & RCAT Robotics A Grade",
  },
];

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const isTouchDevice = useIsTouchDevice();

  const layerText = useRef(null);
  const layerConstellation = useRef(null);
  const pendingRaf = useRef(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeDomain, setActiveDomain] = useState("WEB");

  const showToast = useCallback((msg, duration = 2000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  }, []);

  const copyEmailToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      showToast("Email copied to clipboard!");
    } catch {
      showToast("Email: " + CONTACT_EMAIL, 2500);
    }
  }, [showToast]);

  const handleResumeDownload = useCallback((e) => {
    e?.preventDefault?.();
    scrollToSection("contact");
    history.replaceState(null, "", "#contact");
    showToast("Opening Resume / CV...");
  }, [showToast]);

  const onMouseMove = useCallback((e) => {
    if (pendingRaf.current) return;
    const cx = e.clientX;
    const cy = e.clientY;
    pendingRaf.current = requestAnimationFrame(() => {
      pendingRaf.current = 0;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const x = (cx / W - 0.5) * 2;
      const y = (cy / H - 0.5) * 2;
      if (layerText.current)
        layerText.current.style.transform = `translate(${x * 10}px, ${y * 6}px)`;
      if (layerConstellation.current)
        layerConstellation.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translate(${x * 18}px, ${y * 12}px)`;
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    [layerText, layerConstellation].forEach((r) => {
      if (r.current) {
        r.current.style.transform = "none";
        r.current.style.transition =
          "transform 0.9s cubic-bezier(0.23,1,0.32,1)";
      }
    });
  }, []);

  const onMouseEnterSection = useCallback(() => {
    [layerText, layerConstellation].forEach((r) => {
      if (r.current) r.current.style.transition = "transform 0.08s ease-out";
    });
  }, []);

  const selectedDomainData = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  return (
    <section
      id="hero"
      onMouseMove={isTouchDevice || isMobile ? undefined : onMouseMove}
      onMouseLeave={isTouchDevice || isMobile ? undefined : onMouseLeave}
      onMouseEnter={isTouchDevice || isMobile ? undefined : onMouseEnterSection}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "120px 5.5vw 40px" : "120px 8.5vw 40px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "3rem" : "5vw",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT COLUMN - Typography & Information */}
        <div ref={layerText} style={{ willChange: "transform", textAlign: "left" }}>
          {/* Eyebrow Tagline */}
          <div style={{ overflow: "hidden", marginBottom: "1.75rem" }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{ width: "28px", height: "1px", background: "var(--border-strong, #e8e0d0)" }}
              />
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: isMobile ? "0.62rem" : "0.72rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted, #e8e0d0)",
                  textTransform: "uppercase",
                }}
              >
                Full-Stack Innovator Blending Multiple Domains
              </span>
            </motion.div>
          </div>

          {/* Giant Serif Display Name */}
          <div style={{ overflow: "visible", marginBottom: "-0.05em" }}>
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(3rem, 11vw, 8.5rem)"
                  : "clamp(4.2rem, 10.5vw, 8.5rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                color: "var(--text-heading, #fafaf8)",
                margin: 0,
              }}
            >
              Anas
            </motion.h1>
          </div>

          <div
            style={{
              overflow: "visible",
              marginBottom: isMobile ? "1.75rem" : "2.5rem",
            }}
          >
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(3rem, 11vw, 8.5rem)"
                  : "clamp(4.2rem, 10.5vw, 8.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                color: "var(--text-heading, #fafaf8)",
                margin: 0,
                display: "block",
              }}
            >
              Ali
            </motion.h1>
          </div>

          {/* Role + Education Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "1.25rem" : "3rem",
              marginBottom: isMobile ? "2rem" : "2.5rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted, rgba(255,255,255,0.45))",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Role & Focus
              </p>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "0.9rem",
                  color: "var(--text-body, #e8e0d0)",
                  lineHeight: 1.5,
                }}
              >
                Full-Stack Engineer &<br />
                AI / Robotics Developer
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted, rgba(255,255,255,0.45))",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Education
              </p>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "0.9rem",
                  color: "var(--text-body, #e8e0d0)",
                  lineHeight: 1.5,
                }}
              >
                B.Tech in Computer Science<br />
                & Engineering
              </p>
            </div>
          </motion.div>

          {/* Action Row: Social Icons, Email Toast & CV Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "0.85rem",
              position: "relative",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {/* Toast Popup Notification */}
            <AnimatePresence mode="wait">
              {toastMessage && (
                <motion.div
                  key={toastMessage}
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: 0,
                    fontFamily: FONT_SANS,
                    fontSize: "0.78rem",
                    color: "#4ade80",
                    border: "1px solid rgba(74,222,128,0.35)",
                    background: "rgba(74,222,128,0.08)",
                    borderRadius: "999px",
                    padding: "6px 14px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                    pointerEvents: "none",
                    zIndex: 20,
                  }}
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Icon Buttons & Desktop CV Download */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {[
                {
                  href: `mailto:${CONTACT_EMAIL}`,
                  icon: <Mail size={15} />,
                  label: "Email",
                  isCopy: true,
                },
                {
                  href: "https://github.com/syAnasali",
                  icon: <Github size={15} />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/anas-ali-global",
                  icon: <Linkedin size={15} />,
                  label: "LinkedIn",
                },
              ].map(({ href, icon, label, isCopy }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={
                    isCopy
                      ? (e) => {
                          e.preventDefault();
                          void copyEmailToClipboard();
                        }
                      : undefined
                  }
                  whileHover={{ y: -2 }}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-body, rgba(255,255,255,0.65))",
                    background: "var(--bg-surface, transparent)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    flexShrink: 0,
                    cursor: isTouchDevice ? "pointer" : "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border-strong, #e8e0d0)";
                    el.style.color = "var(--text-heading, #e8e0d0)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border-card, rgba(255,255,255,0.12))";
                    el.style.color = "var(--text-body, rgba(255,255,255,0.65))";
                  }}
                >
                  {icon}
                </motion.a>
              ))}

              {!isMobile && (
                <motion.a
                  href="#contact"
                  onClick={handleResumeDownload}
                  whileHover={{ y: -2 }}
                  style={{
                    height: "38px",
                    padding: "0 14px",
                    borderRadius: "999px",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                    background: "var(--bg-surface, transparent)",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    color: "var(--text-body, rgba(255,255,255,0.65))",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    cursor: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border-strong, #e8e0d0)";
                    el.style.color = "var(--text-heading, #e8e0d0)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border-card, rgba(255,255,255,0.12))";
                    el.style.color = "var(--text-body, rgba(255,255,255,0.65))";
                  }}
                >
                  <FileDown size={14} strokeWidth={1.5} />
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Download CV
                  </span>
                </motion.a>
              )}
            </div>

            {isMobile && (
              <motion.a
                href="#contact"
                onClick={handleResumeDownload}
                whileHover={{ y: -2 }}
                style={{
                  height: "38px",
                  borderRadius: "999px",
                  border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  color: "var(--text-body, rgba(255,255,255,0.65))",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <FileDown size={14} strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Download CV
                </span>
              </motion.a>
            )}

            {/* Live Activity Status Line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "10px 16px",
                border: "1px solid var(--border-subtle, rgba(255,255,255,0.1))",
                borderRadius: "4px",
                background: "var(--bg-surface, transparent)",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  boxShadow: "0 0 8px #ef4444",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "var(--text-muted, rgba(255,255,255,0.55))",
                  textTransform: "uppercase",
                }}
              >
                Building: AI, ML & Robotics • Status: Open to Opportunities
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Unboxed Floating 3D Spatial Constellation Deck */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "relative",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div ref={layerConstellation} style={{ willChange: "transform" }}>
            {/* Domain Switcher Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginBottom: "2rem",
              }}
            >
              {DOMAINS.map((domain) => {
                const isActive = activeDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setActiveDomain(domain.id)}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      border: isActive
                        ? "1px solid var(--text-heading, #e8e0d0)"
                        : "1px solid var(--border-card, rgba(255,255,255,0.12))",
                      background: isActive
                        ? "var(--pill-bg-active, rgba(255,255,255,0.08))"
                        : "var(--bg-surface, transparent)",
                      color: isActive ? "var(--text-heading, #e8e0d0)" : "var(--text-body, rgba(255,255,255,0.65))",
                      cursor: isTouchDevice ? "pointer" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {domain.icon}
                    <span>{domain.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Domain Skills Matrix */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {/* Domain Highlight Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: FONT_MONO,
                    fontSize: "0.62rem",
                    letterSpacing: "0.15em",
                    color: "var(--text-accent, #e8e0d0)",
                    textTransform: "uppercase",
                  }}
                >
                  <span>{selectedDomainData.highlight}</span>
                </div>

                {/* Floating Tech Stack Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.6rem",
                  }}
                >
                  {selectedDomainData.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.72rem",
                        letterSpacing: "0.1em",
                        color: "var(--text-heading, rgba(255,255,255,0.85))",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                        background: "var(--pill-bg, transparent)",
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Impact Stat Badges - Static, outside AnimatePresence so it never reloads */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginTop: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--text-heading, #fafaf8)",
                    lineHeight: 1,
                  }}
                >
                  15+
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted, rgba(255,255,255,0.45))",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                  }}
                >
                  Projects Shipped
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--text-heading, #e8e0d0)",
                    lineHeight: 1,
                  }}
                >
                  17
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted, rgba(255,255,255,0.45))",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                  }}
                >
                  Certs & Awards
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--text-heading, #fafaf8)",
                    lineHeight: 1,
                  }}
                >
                  3
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted, rgba(255,255,255,0.45))",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                  }}
                >
                  Internship Roles
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
