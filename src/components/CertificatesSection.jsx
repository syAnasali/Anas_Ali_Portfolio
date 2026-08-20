import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, BrainCircuit, Cpu, LaptopMinimalCheck, Bot, BadgeAlert, ChartNoAxesColumnIncreasing, FileBadge, FileCheck, ArrowRight, ArrowUp, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const CERTIFICATES = [
  {
    id: "01",
    title: "Oracle Certified Generative AI Professional",
    issuer: "Oracle Corporation",
    date: "Issued October 2025",
    category: "oracle",
    categoryLabel: "Oracle & Cloud",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Award,
  },
  {
    id: "02",
    title: "AI, ML & Automation Internship",
    issuer: "AiLusion",
    date: "Issued July 2026",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: BrainCircuit,
  },
  {
    id: "03",
    title: "Oracle Certified Data Science Professional",
    issuer: "Oracle Corporation",
    date: "Issued October 2025",
    category: "oracle",
    categoryLabel: "Oracle & Cloud",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Award,
  },
  {
    id: "04",
    title: "Advanced Certification in Robotics and Automation – Grade A",
    issuer: "Autofina Robotics | RCAT | CADD Centre | CCUBE",
    date: "Issued August 2025",
    category: "robotics",
    categoryLabel: "Robotics & Hardware",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: LaptopMinimalCheck,
  },
  {
    id: "05",
    title: "Internship - Robotics and Automation",
    issuer: "Rajasthan Centre of Advanced Technology (R-CAT), Jaipur",
    date: "Issued July 2025",
    category: "robotics",
    categoryLabel: "Robotics & Hardware",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Bot,
  },
  {
    id: "06",
    title: "Industrial Training - Machine Learning and IoT",
    issuer: "Malviya National Institute of Technology (MNIT), (MIIC), Jaipur",
    date: "Issued July 2024",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Cpu,
  },
  {
    id: "07",
    title: "AI Agents Intensive Course With Google",
    issuer: "Google | Kaggle",
    date: "Issued December 2025",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: BrainCircuit,
  },
  {
    id: "08",
    title: "Fundamentals of Deep Learning Course",
    issuer: "Nvidia Corporation",
    date: "Issued March 2025",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: BrainCircuit,
  },
  {
    id: "09",
    title: "Anomaly Detection Course",
    issuer: "Nvidia Corporation",
    date: "Issued August 2025",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: BadgeAlert,
  },
  {
    id: "10",
    title: "Professional Power BI Course",
    issuer: "NoviTech R&D Private Limited",
    date: "Issued September 2025",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    id: "11",
    title: "National Space Hackathon 2025",
    issuer: "Indian Institute of Technology (IIT), Delhi",
    date: "Issued April 2025",
    category: "hackathons",
    categoryLabel: "Hackathons & Honors",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: FileBadge,
  },
  {
    id: "12",
    title: "amcat Certificate",
    issuer: "SHL Corporation",
    date: "Issued September 2025",
    category: "hackathons",
    categoryLabel: "Hackathons & Honors",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: FileCheck,
  },
  {
    id: "13",
    title: "Oracle Certified AI Foundations Associate",
    issuer: "Oracle Corporation",
    date: "Issued October 2025",
    category: "oracle",
    categoryLabel: "Oracle & Cloud",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Award,
  },
  {
    id: "14",
    title: "Execute 4.0 Hackathon of E-Summit-25",
    issuer: "Delhi Technological University (DTU), New Delhi",
    date: "Issued October 2025",
    category: "hackathons",
    categoryLabel: "Hackathons & Honors",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: FileBadge,
  },
  {
    id: "15",
    title: "Oracle Certified DevOps Professional",
    issuer: "Oracle Corporation",
    date: "Issued November 2025",
    category: "oracle",
    categoryLabel: "Oracle & Cloud",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Award,
  },
  {
    id: "16",
    title: "Oracle Certified Developer Professional",
    issuer: "Oracle Corporation",
    date: "Issued November 2025",
    category: "oracle",
    categoryLabel: "Oracle & Cloud",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: Award,
  },
  {
    id: "17",
    title: "iStart Training - Artificial Intelligence",
    issuer: "iStart Rajasthan",
    date: "Issued July 2025",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    url: "https://www.linkedin.com/in/anas-ali-global",
    icon: BrainCircuit,
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Credentials (17)", icon: <Layers size={14} /> },
  { id: "oracle", label: "Oracle & Cloud", icon: <Award size={14} /> },
  { id: "ai-ml", label: "AI & Machine Learning", icon: <BrainCircuit size={14} /> },
  { id: "robotics", label: "Robotics & Hardware", icon: <Cpu size={14} /> },
  { id: "hackathons", label: "Hackathons & Honors", icon: <FileBadge size={14} /> },
];

const INITIAL_SHOW_COUNT = 6;

export const CertificatesSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW_COUNT);

  const filteredCertificates = CERTIFICATES.filter((cert) => {
    if (activeCategory === "all") return true;
    return cert.category === activeCategory;
  });

  const showViewMore = visibleCount < filteredCertificates.length;
  const showShowLess = visibleCount > INITIAL_SHOW_COUNT;

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_SHOW_COUNT);
  };

  return (
    <section
      id="certificates"
      style={{
        padding: isMobile ? "4rem 4vw" : "5rem 6vw 8rem",
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
          Certifications
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>

      {/* Header Title & Metrics Counter Strip */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile
                ? "clamp(1.8rem, 7vw, 4rem)"
                : "clamp(2.6rem, 4.5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              color: "#fafaf8",
              margin: "0 0 0.8rem",
            }}
          >
            Credentials & Verified Honors.
          </motion.h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "580px",
              margin: 0,
            }}
          >
            A continuous ledger of verified professional certifications, industrial training achievements, and hackathon honors.
          </p>
        </div>

        {/* Verification Summary Badge Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.02)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: "1.3rem", fontWeight: 800, color: "#fafaf8", lineHeight: 1 }}>
              17
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: "0.55rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: "3px" }}>
              Total Honors
            </span>
          </div>

          <div style={{ width: "1px", height: "26px", background: "rgba(255,255,255,0.1)" }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: "1.3rem", fontWeight: 800, color: "#e8e0d0", lineHeight: 1 }}>
              5
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: "0.55rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: "3px" }}>
              Oracle Certs
            </span>
          </div>

          <div style={{ width: "1px", height: "26px", background: "rgba(255,255,255,0.1)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4ade80" }}>
            <CheckCircle2 size={16} />
            <span style={{ fontFamily: FONT_MONO, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              100% Verified
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          marginBottom: "2.5rem",
        }}
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryChange(tab.id)}
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "8px 16px",
                borderRadius: "999px",
                border: isActive
                  ? "1px solid #e8e0d0"
                  : "1px solid rgba(255,255,255,0.12)",
                background: isActive
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                color: isActive ? "#e8e0d0" : "rgba(255,255,255,0.45)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Credential Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? "1.25rem" : "1.5rem",
          width: "100%",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredCertificates.slice(0, visibleCount).map((cert) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                style={{
                  padding: "1.3rem 1.5rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.01)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.2rem",
                  transition: "all 0.25s ease",
                }}
                whileHover={{ y: -3, borderColor: "#e8e0d0" }}
              >
                <div>
                  {/* Category & Icon Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      {cert.id} // {cert.categoryLabel}
                    </span>

                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#e8e0d0",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={16} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#fafaf8",
                      margin: "0 0 6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: "0.84rem",
                      color: "rgba(255,255,255,0.58)",
                      margin: 0,
                    }}
                  >
                    {cert.issuer}
                  </p>
                </div>

                {/* Footer Date & Credential Link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.8rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {cert.date}
                  </span>

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#e8e0d0",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.2s",
                    }}
                  >
                    <span>View Credential</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination & LinkedIn Footer CTA */}
      <div
        style={{
          marginTop: "3.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {showViewMore && (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredCertificates.length))}
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "10px 24px",
                borderRadius: "999px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8e0d0",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              View More Credentials ({filteredCertificates.length - visibleCount} Remaining)
            </button>
          )}

          {showShowLess && (
            <button
              onClick={() => setVisibleCount(INITIAL_SHOW_COUNT)}
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "10px 24px",
                borderRadius: "999px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <ArrowUp size={14} />
              <span>Show Less</span>
            </button>
          )}
        </div>

        {/* LinkedIn Profile Direct Trigger */}
        <a
          href="https://www.linkedin.com/in/anas-ali-global"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#e8e0d0",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "6px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            transition: "all 0.2s",
          }}
        >
          <span>Verify All Certifications on LinkedIn</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
};

export default CertificatesSection;
