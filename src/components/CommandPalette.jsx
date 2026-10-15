import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, FolderGit2, Award, Briefcase, Mail, Phone, Github, Linkedin, Terminal, Sparkles, MessageCircle, ArrowRight, X, FileDown } from "lucide-react";
import { scrollToSection } from "../hooks/useHashScroll";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const COMMANDS = [
  {
    id: "hero",
    title: "Go to Home / Hero",
    category: "Navigation",
    icon: <Compass size={16} className="text-cyan-400" />,
    action: () => {
      scrollToSection("hero");
      history.replaceState(null, "", window.location.pathname);
    },
  },
  {
    id: "about",
    title: "Go to About Section",
    category: "Navigation",
    icon: <Sparkles size={16} className="text-amber-400" />,
    action: () => {
      scrollToSection("about");
      history.replaceState(null, "", "#about");
    },
  },
  {
    id: "skills",
    title: "Go to Technical Skills",
    category: "Navigation",
    icon: <Sparkles size={16} className="text-purple-400" />,
    action: () => {
      scrollToSection("skills");
      history.replaceState(null, "", "#skills");
    },
  },
  {
    id: "projects",
    title: "Go to Featured Projects",
    category: "Navigation",
    icon: <FolderGit2 size={16} className="text-blue-400" />,
    action: () => {
      scrollToSection("projects");
      history.replaceState(null, "", "#projects");
    },
  },
  {
    id: "certificates",
    title: "Go to Credentials & Certifications",
    category: "Navigation",
    icon: <Award size={16} className="text-yellow-400" />,
    action: () => {
      scrollToSection("certificates");
      history.replaceState(null, "", "#certificates");
    },
  },
  {
    id: "experience",
    title: "Go to Experience Trajectory",
    category: "Navigation",
    icon: <Briefcase size={16} className="text-emerald-400" />,
    action: () => {
      scrollToSection("experience");
      history.replaceState(null, "", "#experience");
    },
  },
  {
    id: "contact",
    title: "Go to Contact & Collaboration",
    category: "Navigation",
    icon: <Mail size={16} className="text-pink-400" />,
    action: () => {
      scrollToSection("contact");
      history.replaceState(null, "", "#contact");
    },
  },
  {
    id: "resume",
    title: "Download Resume / CV (PDF)",
    category: "Actions",
    icon: <FileDown size={16} className="text-emerald-400" />,
    action: () => {
      const link = document.createElement("a");
      link.href = "/Anas_Ali_Resume.pdf";
      link.download = "Anas_Ali_Resume.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  {
    id: "copy-email",
    title: "Copy Email: anasali.global@gmail.com",
    category: "Actions",
    icon: <Mail size={16} className="text-cyan-400" />,
    action: () => {
      navigator.clipboard.writeText("anasali.global@gmail.com");
    },
  },
  {
    id: "whatsapp",
    title: "Chat on WhatsApp (+91 8740926817)",
    category: "Actions",
    icon: <MessageCircle size={16} className="text-emerald-400" />,
    action: () => {
      window.open("https://wa.me/918740926817?text=Hi%20Anas%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!", "_blank");
    },
  },
  {
    id: "github",
    title: "Open GitHub Profile",
    category: "Socials",
    icon: <Github size={16} />,
    action: () => {
      window.open("https://github.com/syAnasali", "_blank");
    },
  },
  {
    id: "linkedin",
    title: "Open LinkedIn Profile",
    category: "Socials",
    icon: <Linkedin size={16} />,
    action: () => {
      window.open("https://www.linkedin.com/in/anas-ali-global", "_blank");
    },
  },
];

export const CommandPalette = ({ isOpen, onClose, onOpenTerminal }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredCommands = COMMANDS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          document.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDownInMenu = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "12vh",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: "600px",
              borderRadius: "10px",
              border: "1px solid var(--border-card, rgba(255,255,255,0.15))",
              background: "var(--bg-card, #0c0c0e)",
              boxShadow: "var(--modal-shadow, 0 20px 50px rgba(0,0,0,0.8))",
              overflow: "hidden",
            }}
          >
            {/* Input Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "1rem 1.2rem",
                borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
              }}
            >
              <Search size={18} style={{ color: "var(--text-muted, #a3a3a3)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInMenu}
                placeholder="Type a command or search section (e.g. Projects, WhatsApp, Skills)..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text-heading, #fafaf8)",
                  fontFamily: FONT_SANS,
                  fontSize: "0.95rem",
                }}
              />
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.55rem",
                  color: "var(--text-muted, rgba(255,255,255,0.4))",
                  border: "1px solid var(--border-subtle, rgba(255,255,255,0.12))",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                ESC
              </span>
            </div>

            {/* Command List */}
            <div
              style={{
                maxHeight: "340px",
                overflowY: "auto",
                padding: "0.5rem",
              }}
            >
              {filteredCommands.length === 0 ? (
                <div
                  style={{
                    padding: "2rem 1rem",
                    textAlign: "center",
                    color: "var(--text-muted, rgba(255,255,255,0.4))",
                    fontFamily: FONT_MONO,
                    fontSize: "0.8rem",
                  }}
                >
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, i) => {
                  const isSelected = i === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        background: isSelected ? "var(--pill-bg-active, rgba(255,255,255,0.08))" : "transparent",
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ color: isSelected ? "var(--text-heading, #ffffff)" : "var(--text-body, #e8e0d0)" }}>{cmd.icon}</div>
                        <div>
                          <span
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: "0.9rem",
                              color: isSelected ? "var(--text-heading, #ffffff)" : "var(--text-body, rgba(255,255,255,0.85))",
                              display: "block",
                              fontWeight: isSelected ? 600 : 400,
                            }}
                          >
                            {cmd.title}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: "0.52rem",
                            letterSpacing: "0.1em",
                            color: "var(--text-muted, rgba(255,255,255,0.4))",
                            textTransform: "uppercase",
                          }}
                        >
                          {cmd.category}
                        </span>
                        <ArrowRight size={14} style={{ color: isSelected ? "var(--text-heading, #e8e0d0)" : "transparent" }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Tip */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                background: "var(--bg-surface-elevated, rgba(0,0,0,0.5))",
                borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.06))",
                fontFamily: FONT_MONO,
                fontSize: "0.55rem",
                color: "var(--text-muted, rgba(255,255,255,0.4))",
              }}
            >
              <div style={{ display: "flex", gap: "12px" }}>
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>CMD + K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
