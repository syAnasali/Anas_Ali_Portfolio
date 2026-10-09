import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, Send, CheckCircle2, ArrowUpRight, Instagram, Twitter, FileDown, MessageCircle, AlertTriangle, RotateCcw, Loader2 } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionReceipt, setSubmissionReceipt] = useState(null);
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
    setFormStatus("submitting");
    setErrorMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      const response = await fetch("https://formspree.io/f/xldapddg", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmissionReceipt({
          name: formData.name.trim(),
          email: formData.email.trim(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          date: new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
        });
        setFormStatus("success");
        showToast("Your response was submitted successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const msg =
          errorData?.errors?.[0]?.message ||
          errorData?.error ||
          "Could not transmit message. Please try again or reach out directly.";
        setErrorMessage(msg);
        setFormStatus("error");
        showToast("Transmission failed. Please retry.");
      }
    } catch {
      setErrorMessage("Network connection timed out. Please check your internet or send an email directly.");
      setFormStatus("error");
      showToast("Connection error. Please retry.");
    }
  };

  const handleResetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setFormStatus("idle");
    setErrorMessage("");
    setSubmissionReceipt(null);
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
            color: "var(--text-muted, rgba(255,255,255,0.4))",
            textTransform: "uppercase",
          }}
        >
          Contact & Collaboration
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "var(--border-subtle, rgba(255,255,255,0.07))",
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
            color: "var(--text-heading, #fafaf8)",
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
              border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
              borderRadius: "4px",
              background: "var(--bg-surface, rgba(255,255,255,0.01))",
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
                color: "var(--text-muted, rgba(255,255,255,0.55))",
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
              color: "var(--text-body, rgba(255,255,255,0.6))",
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
              border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
              background: "var(--bg-card, rgba(255,255,255,0.01))",
              boxShadow: "var(--shadow-card, none)",
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
                      color: "var(--text-heading, #ffffff)",
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

            {/* Section B: Direct Form & Holographic Confirmation */}
            <div style={{ padding: "1.5rem" }}>
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: "center", padding: "1rem 0.5rem" }}
                  >
                    {/* Creative Radar Wave & Glowing Badge Animation */}
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "74px",
                        height: "74px",
                        margin: "0 auto 1.4rem",
                      }}
                    >
                      {/* Pulse Ring 1 */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: [1, 1.9, 2.5], opacity: [0.75, 0.3, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: "2px solid #10b981",
                          pointerEvents: "none",
                        }}
                      />
                      {/* Pulse Ring 2 (Cyan Hue) */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: [1, 1.9, 2.5], opacity: [0.75, 0.3, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: 0.8, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: "2px solid #38bdf8",
                          pointerEvents: "none",
                        }}
                      />
                      {/* Radiating Sparkles */}
                      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                        const rad = (deg * Math.PI) / 180;
                        const x = Math.cos(rad) * 44;
                        const y = Math.sin(rad) * 44;
                        return (
                          <motion.span
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                            animate={{ x, y, opacity: [1, 0.8, 0], scale: [0, 1.3, 0] }}
                            transition={{ duration: 1.2, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                            style={{
                              position: "absolute",
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: i % 2 === 0 ? "#10b981" : "#38bdf8",
                              boxShadow: `0 0 8px ${i % 2 === 0 ? "#10b981" : "#38bdf8"}`,
                              pointerEvents: "none",
                            }}
                          />
                        );
                      })}
                      {/* Central Glowing Orb with Spring Animation */}
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 12, stiffness: 220, delay: 0.15 }}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(56, 189, 248, 0.15) 100%)",
                          border: "1.5px solid #10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 25px rgba(16, 185, 129, 0.45)",
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        <CheckCircle2 size={32} style={{ color: "#10b981" }} />
                      </motion.div>
                    </div>

                    {/* Terminal Status Pill */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: "rgba(16, 185, 129, 0.12)",
                        border: "1px solid rgba(16, 185, 129, 0.35)",
                        marginBottom: "0.8rem",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#10b981",
                          boxShadow: "0 0 8px #10b981",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          color: "#10b981",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Transmission Confirmed // 200 OK
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--text-heading, #fafaf8)",
                        margin: "0 0 0.5rem",
                        lineHeight: 1.25,
                      }}
                    >
                      Your Response Has Been Submitted!
                    </h3>

                    {/* Friendly descriptive message */}
                    <p
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: "0.86rem",
                        lineHeight: 1.6,
                        color: "var(--text-body, rgba(255,255,255,0.7))",
                        margin: "0 auto 1.3rem",
                        maxWidth: "400px",
                      }}
                    >
                      Thank you, <strong style={{ color: "var(--text-heading, #fafaf8)" }}>{submissionReceipt?.name || "there"}</strong>! Your message has been encrypted and delivered directly to Anas Ali's private terminal. A prompt reply will be sent to <span style={{ color: "var(--text-heading, #fafaf8)" }}>{submissionReceipt?.email || "your email"}</span>.
                    </p>

                    {/* Cyber Transmission Receipt */}
                    <div
                      style={{
                        borderRadius: "6px",
                        border: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                        background: "var(--bg-surface-elevated, rgba(255,255,255,0.02))",
                        padding: "0.85rem 1.1rem",
                        fontFamily: FONT_MONO,
                        fontSize: "0.65rem",
                        color: "var(--text-muted, rgba(255,255,255,0.5))",
                        textAlign: "left",
                        marginBottom: "1.4rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--text-muted, rgba(255,255,255,0.4))" }}>SENDER</span>
                        <span style={{ color: "var(--text-heading, #fafaf8)" }}>{submissionReceipt?.name} &lt;{submissionReceipt?.email}&gt;</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--text-muted, rgba(255,255,255,0.4))" }}>ROUTED TO</span>
                        <span style={{ color: "#38bdf8" }}>anasali.global@gmail.com</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--text-muted, rgba(255,255,255,0.4))" }}>TIMESTAMP</span>
                        <span style={{ color: "var(--text-heading, #fafaf8)" }}>{submissionReceipt?.date} • {submissionReceipt?.time}</span>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      type="button"
                      onClick={handleResetForm}
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "4px",
                        border: "1px solid var(--accent-button-bg, #e8e0d0)",
                        background: "var(--accent-button-bg, #e8e0d0)",
                        color: "var(--accent-button-text, #000000)",
                        fontFamily: FONT_MONO,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Transmit Another Message</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text-heading, #fafaf8)",
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
                            color: "var(--text-muted, rgba(255,255,255,0.45))",
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
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          required
                          placeholder="Alex Mercer"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "4px",
                            border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                            background: "var(--bg-input, rgba(0,0,0,0.4))",
                            color: "var(--text-heading, #fafaf8)",
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
                            color: "var(--text-muted, rgba(255,255,255,0.45))",
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
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                          placeholder="alex@company.com"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "4px",
                            border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                            background: "var(--bg-input, rgba(0,0,0,0.4))",
                            color: "var(--text-heading, #fafaf8)",
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
                            color: "var(--text-muted, rgba(255,255,255,0.45))",
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
                          value={formData.message}
                          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                          required
                          rows={3}
                          placeholder="Hi Anas, I'd like to collaborate on..."
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "4px",
                            border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                            background: "var(--bg-input, rgba(0,0,0,0.4))",
                            color: "var(--text-heading, #fafaf8)",
                            fontFamily: FONT_SANS,
                            fontSize: "0.86rem",
                            outline: "none",
                            resize: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      {/* Animated Failure Alert on Transmission Error */}
                      <AnimatePresence>
                        {formStatus === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              padding: "0.85rem 1rem",
                              borderRadius: "6px",
                              background: "rgba(239, 68, 68, 0.08)",
                              border: "1px solid rgba(239, 68, 68, 0.35)",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                background: "rgba(239, 68, 68, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: "1px",
                              }}
                            >
                              <AlertTriangle size={14} style={{ color: "#ef4444" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontFamily: FONT_MONO,
                                  fontSize: "0.62rem",
                                  letterSpacing: "0.12em",
                                  color: "#ef4444",
                                  textTransform: "uppercase",
                                  fontWeight: 700,
                                  marginBottom: "2px",
                                }}
                              >
                                Transmission Error // Signal Interrupted
                              </div>
                              <div
                                style={{
                                  fontFamily: FONT_SANS,
                                  fontSize: "0.78rem",
                                  color: "var(--text-body, rgba(255,255,255,0.75))",
                                  lineHeight: 1.45,
                                }}
                              >
                                {errorMessage || "Unable to deliver message through transmission relay. Your message content has been preserved below."}
                              </div>
                              <div style={{ marginTop: "6px", display: "flex", gap: "10px", alignItems: "center" }}>
                                <a
                                  href={`mailto:anasali.global@gmail.com?subject=Message from ${encodeURIComponent(formData.name || "Portfolio Visitor")}&body=${encodeURIComponent(formData.message || "")}`}
                                  style={{
                                    fontFamily: FONT_MONO,
                                    fontSize: "0.6rem",
                                    color: "#38bdf8",
                                    textDecoration: "underline",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Send via Default Email App ↗
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        style={{
                          padding: "11px",
                          borderRadius: "4px",
                          border: formStatus === "error" ? "1px solid #ef4444" : "1px solid var(--accent-button-bg, #e8e0d0)",
                          background: formStatus === "error" ? "#ef4444" : "var(--accent-button-bg, #e8e0d0)",
                          color: formStatus === "error" ? "#ffffff" : "var(--accent-button-text, #000000)",
                          fontFamily: FONT_MONO,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          cursor: formStatus === "submitting" ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "all 0.2s ease",
                          marginTop: "0.4rem",
                        }}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              style={{ display: "inline-flex" }}
                            >
                              <Loader2 size={14} />
                            </motion.span>
                            <span>Transmitting Signal...</span>
                          </>
                        ) : formStatus === "error" ? (
                          <>
                            <span>Retry Transmission</span>
                            <RotateCcw size={14} />
                          </>
                        ) : (
                          <>
                            <span>Transmit Message</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
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
                color: "var(--text-muted, rgba(255,255,255,0.35))",
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
                  borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--border-strong, rgba(255,255,255,0.35))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--border-subtle, rgba(255,255,255,0.08))";
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.15))",
                    background: "var(--bg-surface, rgba(255,255,255,0.02))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-accent, #e8e0d0)",
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
                        color: "var(--text-muted, rgba(255,255,255,0.45))",
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
                          color: "#16a34a",
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
                      color: "var(--text-heading, #fafaf8)",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>

                <ArrowUpRight size={18} style={{ color: "var(--text-faint, rgba(255,255,255,0.35))" }} />
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
                color: "var(--text-muted, rgba(255,255,255,0.35))",
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
                  borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.06))",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--border-strong, rgba(255,255,255,0.35))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "var(--border-subtle, rgba(255,255,255,0.06))";
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                    background: "var(--bg-surface, rgba(255,255,255,0.02))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-body, rgba(255,255,255,0.6))",
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
                      color: "var(--text-muted, rgba(255,255,255,0.4))",
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
                      color: "var(--text-heading, rgba(255,255,255,0.8))",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>

                <ArrowUpRight size={16} style={{ color: "var(--text-faint, rgba(255,255,255,0.3))" }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
