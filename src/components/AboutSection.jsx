import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useMediaQuery";

const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const pillars = [
  {
    title: "Full-Stack Web Systems",
    desc: "Building high-performance, accessible web applications with React 18, Next.js 15, Tailwind CSS, Supabase, and Node.js. Architecture designed for speed, scale, and seamless user experience.",
  },
  {
    title: "AI-ML & Data Science",
    desc: "Leveraging PyTorch, Scikit-Learn, LangChain, and Generative AI models to solve real-world problems. Certified by Oracle in GenAI & Data Science with focus on end-to-end model deployment.",
  },
  {
    title: "Robotics & IoT Automation",
    desc: "Bridging the gap between software and hardware. Designing control protocols, sensor networks, and autonomous perception systems using ESP32, Arduino, SolidWorks, and Blynk.",
  },
];

const dontDo = [
  "I don't ship basic wrapper apps disguised as core products.",
  "I don't write hardware protocols without testing against real physical constraints.",
  "I don't deliver code without modularity, clear ownership, and performance benchmarks.",
];

const highlights = [
  {
    title: "Oracle Certified GenAI Professional",
    sub: "Oracle Corporation • Oct 2025",
    time: "Oct 2025",
  },
  {
    title: "Oracle Certified Data Science Professional",
    sub: "Oracle Corporation • Oct 2025",
    time: "Oct 2025",
  },
  {
    title: "Robotics & Automation Grade A",
    sub: "RCAT | CADD Centre • Grade A Certification",
    time: "2025",
  },
  {
    title: "AI Agents Intensive With Google",
    sub: "Google | Kaggle • Dec 2025",
    time: "Dec 2025",
  },
  {
    title: "Nvidia Deep Learning & Anomaly Detection",
    sub: "Nvidia Corporation • 2025",
    time: "2025",
  },
  {
    title: "Robotics & Automation Engineer Intern",
    sub: "RCAT Jaipur • 2025",
    time: "2025",
  },
  {
    title: "Machine Learning & IoT Specialist",
    sub: "MNIT Jaipur (MIIC) • 2024",
    time: "2024",
  },
];

export function AboutSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      style={{
        position: "relative",
        background: "transparent",
        padding: isMobile ? "4rem 4vw" : "4rem 0 0",
        textAlign: "left",
      }}
    >
      <style>{`
        @keyframes highlights-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={isMobile ? {} : { padding: "0.85rem 6vw 2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
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
              About
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(1.8rem, 7vw, 4rem)"
                  : "clamp(2.6rem, 4.5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                color: "#fafaf8",
                margin: 0,
              }}
            >
              Building at the intersection of Web, AI & Physical Robotics.
            </motion.h2>
          </div>
        </div>

        {/* Content strip */}
        <div>
          <div style={{ padding: isMobile ? "2rem 0 0" : "1.5rem 6vw 2rem" }}>
            {/* Brand thesis */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: FONT_SANS,
                fontSize: isMobile ? "1rem" : "1.05rem",
                lineHeight: 1.65,
                color: "#e8e0d0",
                marginBottom: isMobile ? "2rem" : "2.5rem",
                borderLeft: "2px solid rgba(232,224,208,0.3)",
                paddingLeft: "1rem",
                maxWidth: "560px",
              }}
            >
              Honest engineering where it matters. Solutions built to perform under real constraints.
            </motion.p>

            {/* Two-column grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "3rem" : "6vw",
                alignItems: "start",
              }}
            >
              {/* LEFT - story paragraphs */}
              <div style={{ alignSelf: "start" }}>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.62)",
                    marginBottom: "1.2rem",
                    maxWidth: "580px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  Computer Science & Engineering background at Government Engineering College, Jaipur (2023–2027). Software engineering hit like a realization, not just a subject: software that connects intelligent models to physical machines was a new class of engineering, and I knew it would matter before anyone around me thought it would.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.62)",
                    marginBottom: "1.2rem",
                    maxWidth: "580px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  With hands-on engineering experience across web applications, AI-ML algorithms, and IoT automation, I specialize in creating responsive, accessible, and performant web apps while seamlessly integrating hardware sensors, perception models, and cloud backends.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.62)",
                    marginBottom: 0,
                    maxWidth: "580px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  Whether engineering an autonomous perception vehicle (Model Wall-E), deploying full-fledged Next.js AI financial platforms, or earning certifications from Oracle, Nvidia, and Google, I am passionate about tackling complex challenges and expanding technical boundaries.
                </motion.p>
              </div>

              {/* RIGHT - pillars + What I Don't Do */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {pillars.map(({ title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1.2rem",
                        padding: "1.4rem 1.6rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "transparent",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#e8e0d0",
                          marginTop: "7px",
                          flexShrink: 0,
                          opacity: 0.6,
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: FONT_SERIF,
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            color: "#fafaf8",
                            marginBottom: "6px",
                          }}
                        >
                          {title}
                        </p>
                        <p
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: "0.83rem",
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,0.58)",
                            textAlign: "justify",
                            textJustify: "inter-word",
                            margin: 0,
                          }}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.24, duration: 0.5 }}
                  style={{
                    padding: "1.2rem 1.5rem",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "6px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      marginBottom: "0.9rem",
                    }}
                  >
                    What I don't do
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.55rem",
                    }}
                  >
                    {dontDo.map((line, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: "0.83rem",
                          lineHeight: 1.5,
                          color: "rgba(255,255,255,0.45)",
                          margin: 0,
                          textAlign: "justify",
                          textJustify: "inter-word",
                        }}
                      >
                        - {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* The Gold and the Glory */}
            <div style={{ marginTop: isMobile ? "4rem" : "6rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    color: "rgba(245,202,64,1)",
                    textTransform: "uppercase",
                  }}
                >
                  <center>• The Gold and the Glory •</center>
                </span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "max-content",
                    animation: "highlights-marquee 45s linear infinite",
                    willChange: "transform",
                  }}
                >
                  {[...highlights, ...highlights].map((h, i) => (
                    <Fragment key={i}>
                      {/* card */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                          width: "max-content",
                          flexShrink: 0,
                          userSelect: "none",
                        }}
                      >
                        {/* row: title */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.65rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: FONT_SERIF,
                              fontWeight: 800,
                              fontSize: "0.92rem",
                              color: "#fafaf8",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h.title}
                          </span>
                        </div>
                        {/* sub */}
                        <p
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.42)",
                            margin: 0,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {h.sub}
                        </p>
                      </div>

                      {/* separator */}
                      <div
                        style={{
                          width: "1px",
                          height: "36px",
                          background: "rgba(255,255,255,0.08)",
                          margin: "0 2rem",
                          flexShrink: 0,
                        }}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
