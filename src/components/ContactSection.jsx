import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, Send, CheckCircle2, ArrowUpRight, Instagram, Twitter, FileDown, MessageCircle } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const KaggleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const ContactSection = () => {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`);
    } catch {
      showToast(`Could not copy ${label}`);
    }
  };

  const handleResumeDownload = () => {
    showToast("Downloading Anas Ali's Resume...");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xldapddg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showToast("Message transmitted successfully!");
        form.reset();
      } else {
        showToast("Something went wrong. Please try again.");
      }
    } catch (error) {
      showToast("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryLinks = [
    {
      label: "Resume / CV",
      value: "Anas Ali Resume (PDF)",
      href: "#",
      download: undefined,
      icon: <FileDown size={16} className="text-emerald-400" />,
      onClick: () => showToast("Opening Resume / CV..."),
      badge: "PDF",
    },
    {
      label: "Email",
      value: "anasali.global@gmail.com",
      href: "mailto:anasali.global@gmail.com",
      icon: <Mail size={16} className="text-cyan-400" />,
      copyable: true,
    },
    {
      label: "Phone",
      value: "+91 8740926817",
      href: "tel:+918740926817",
      icon: <Phone size={16} className="text-amber-400" />,
      copyable: true,
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      value: "linkedin.com/in/anas-ali-global",
      href: "https://www.linkedin.com/in/anas-ali-global",
      icon: <Linkedin size={16} />,
    },
    {
      label: "GitHub",
      value: "github.com/syAnasali",
      href: "https://github.com/syAnasali",
      icon: <Github size={16} />,
    },
    {
      label: "Kaggle",
      value: "kaggle.com/anasali7",
      href: "https://www.kaggle.com/anasali7",
      icon: <KaggleIcon />,
    },
    {
      label: "X (Twitter)",
      value: "x.com/Anas_Ali_x07",
      href: "https://x.com/Anas_Ali_x07",
      icon: <Twitter size={16} />,
    },
    {
      label: "Instagram",
      value: "instagram.com/0.anas_ali.0",
      href: "https://www.instagram.com/0.anas_ali.0",
      icon: <Instagram size={16} />,
    },
    {
      label: "Location",
      value: "Jaipur, Rajasthan, India",
      href: "https://maps.google.com/?q=Jaipur,India",
      icon: <MapPin size={16} />,
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "4rem 4vw 2rem" : "6rem 6vw 4rem",
        background: "transparent",
        position: "relative",
        textAlign: "left",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: isMobile ? "2rem" : "3rem",
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
          Contact & Collaboration
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>

      {/* Main Editorial Headline */}
      <div style={{ marginBottom: "3rem" }}>
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            fontFamily: FONT_SERIF,
            fontSize: isMobile
              ? "clamp(2rem, 8vw, 3rem)"
              : "clamp(2.8rem, 4.5vw, 4.2rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            color: "#fafaf8",
            margin: "0 0 1rem",
          }}
        >
          Hard problems welcome.
        </motion.h2>
      </div>

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "3rem" : "5vw",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: Status, Direct Form & Grouped WhatsApp Action */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
          {/* Reference Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.01)",
              alignSelf: "flex-start",
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
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
              }}
            >
              Optimising: Residuals • Not: Roles
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "460px",
              margin: 0,
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Heads-down building right now - not looking for roles. But if you've got a hard problem, a wild idea, or just want to talk shop about AI models, robotics automation, IoT telemetry, or web applications, I'm always up for that.
          </motion.p>

          {/* Grouped Direct Actions Card: Premium WhatsApp + Direct Message Form */}
          <div
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.01)",
              overflow: "hidden",
            }}
          >
            {/* Section A: Premium WhatsApp Quick Action Banner */}
            <a
              href="https://wa.me/918740926817?text=Hi%20Anas%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1.2rem 1.5rem",
                background: "linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.03) 100%)",
                borderBottom: "1px solid rgba(37,211,102,0.25)",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid #25D366",
                    background: "rgba(37,211,102,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#25D366",
                    boxShadow: "0 0 12px rgba(37,211,102,0.3)",
                    flexShrink: 0,
                  }}
                >
                  <WhatsAppIcon />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "#25D366",
                      textTransform: "uppercase",
                      display: "block",
                      fontWeight: 700,
                    }}
                  >
                    Instant Messaging
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      display: "block",
                    }}
                  >
                    Chat on WhatsApp (+91 8740926817)
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: FONT_MONO,
                  fontSize: "0.62rem",
                  color: "#25D366",
                  fontWeight: 600,
                }}
              >
                <span>OPEN</span>
                <ArrowUpRight size={16} />
              </div>
            </a>

            {/* Section B: Direct Form */}
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#fafaf8",
                  margin: "0 0 1rem",
                }}
              >
                Send a Direct Email Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.56rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Alex Mercer"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(0,0,0,0.4)",
                      color: "#fafaf8",
                      fontFamily: FONT_SANS,
                      fontSize: "0.86rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.56rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="alex@company.com"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(0,0,0,0.4)",
                      color: "#fafaf8",
                      fontFamily: FONT_SANS,
                      fontSize: "0.86rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.56rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Hi Anas, I'd like to collaborate on..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(0,0,0,0.4)",
                      color: "#fafaf8",
                      fontFamily: FONT_SANS,
                      fontSize: "0.86rem",
                      outline: "none",
                      resize: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "11px",
                    borderRadius: "4px",
                    border: "1px solid #e8e0d0",
                    background: "#e8e0d0",
                    color: "#000000",
                    fontFamily: FONT_MONO,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    marginTop: "0.4rem",
                  }}
                >
                  <span>{isSubmitting ? "Sending..." : "Transmit Message"}</span>
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Categorized Links (Resume, Primary Contacts & Socials) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Toast Notification Banner */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "1px solid rgba(74,222,128,0.4)",
                  background: "rgba(74,222,128,0.08)",
                  color: "#4ade80",
                  fontFamily: FONT_MONO,
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2 size={15} />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Group 1: Primary Credentials & Direct Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Core Credentials & Contact
            </span>

            {primaryLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                download={item.download ?? undefined}
                target={!item.download && item.href.startsWith("http") ? "_blank" : undefined}
                rel={!item.download && item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 6 }}
                onClick={(e) => {
                  if (item.copyable) {
                    e.preventDefault();
                    void copyToClipboard(item.value, item.label);
                  } else if (item.onClick) {
                    item.onClick();
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e8e0d0",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <p
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.58rem",
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.45)",
                        textTransform: "uppercase",
                        margin: "0 0 2px",
                      }}
                    >
                      {item.label}
                    </p>
                    {item.badge && (
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: "0.50rem",
                          color: "#4ade80",
                          background: "rgba(74,222,128,0.12)",
                          border: "1px solid rgba(74,222,128,0.3)",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: "0.95rem",
                      color: "#fafaf8",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>

                <ArrowUpRight size={18} style={{ color: "rgba(255,255,255,0.35)" }} />
              </motion.a>
            ))}
          </div>

          {/* Group 2: Professional & Social Profiles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginTop: "0.5rem" }}>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Social & Network Profiles
            </span>

            {socialLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 6 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.54rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      margin: "0 0 2px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.8)",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>

                <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
