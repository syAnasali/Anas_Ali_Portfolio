import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useMediaQuery";

const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const C = {
  lang: "#a78bfa",
  frontend: "#60a5fa",
  backend: "#10b981",
  ai: "#f5ca40",
  devops: "#22d3ee",
  robotics: "#f97316",
  tools: "#f472b6",
};

const CATEGORIES = [
  {
    label: "Languages",
    color: C.lang,
    techs: [
      { n: "Python", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", brk: "async · ML" },
      { n: "C / C++", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", brk: "embedded · hardware" },
      { n: "Java", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
      { n: "JavaScript", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { n: "TypeScript", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
      { n: "SQL", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg", brk: "PostgreSQL, MySQL" },
      { n: "Bash", f: "https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" },
    ],
  },
  {
    label: "Frontend & UI",
    color: C.frontend,
    techs: [
      { n: "React", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" },
      { n: "Next.js", f: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
      { n: "Vue.js", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" },
      { n: "Tailwind CSS", f: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
      { n: "Shadcn/UI", f: "https://images.seeklogo.com/logo-png/51/2/shadcn-ui-logo-png_seeklogo-519786.png" },
      { n: "Framer Motion", f: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons/brand-framer-motion-pk1mas1m7u9hi06fqzq77f.png/brand-framer-motion-nuunolaqtcs7zlblwkjs.png?_a=DATAg1AAZAA0" },
      { n: "HTML5 / CSS3", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" },
    ],
  },
  {
    label: "Backend & Databases",
    color: C.backend,
    techs: [
      { n: "Node.js", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" },
      { n: "Express", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" },
      { n: "Prisma", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg" },
      { n: "Supabase", f: "https://flow-in-public.nimbuspop.com/flow-apps/supabase.png", brk: "BaaS · Auth · DB" },
      { n: "Inngest", f: "https://www.inngest.com/favicon.ico", brk: "Background Queues" },
      { n: "PHP", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
      { n: "PostgreSQL", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" },
      { n: "MySQL", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" },
      { n: "MongoDB", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" },
      { n: "Firebase", f: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
    ],
  },
  {
    label: "AI / ML & Data",
    color: C.ai,
    techs: [
      { n: "PyTorch", f: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg", brk: "deep learning" },
      { n: "TensorFlow", f: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" },
      { n: "Scikit-Learn", f: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { n: "LangChain", f: "https://cdn.prod.website-files.com/60d251a34163cf29e1220806/68d4abcca211d662e26bd5da_Langchain%20(1).png", brk: "AI agents" },
      { n: "OpenCV", f: "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg", brk: "computer vision" },
      { n: "Pandas", f: "https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg" },
      { n: "NumPy", f: "https://logosandtypes.com/wp-content/uploads/2024/02/numpy.svg" },
      { n: "Power BI", f: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHQ0T9UxCk-gGRVT8qF7gnmFDBzllCVxIew&s" },
    ],
  },
  {
    label: "DevOps & Cloud",
    color: C.devops,
    techs: [
      { n: "AWS", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { n: "GCP", f: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
      { n: "Oracle (OCI)", f: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsVFLTaNmLfrYc941IKgbNLsUTaN5gRaClA&s", brk: "Certified" },
      { n: "Docker", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" },
      { n: "Kubernetes", f: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" },
      { n: "Jenkins", f: "https://1000logos.net/wp-content/uploads/2024/09/Jenkins-Emblem.png" },
      { n: "Linux", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" },
      { n: "Vercel", f: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfprgcI0tcsTQqKyB8Mnsoik1HC8njZOWPDg&s" },
    ],
  },
  {
    label: "Robotics & IoT",
    color: C.robotics,
    techs: [
      { n: "ESP32", f: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYbzKaeYJZUYW7rC5fCt_4S8Uf-_PRFoQa6Q&s", brk: "hardware node" },
      { n: "Arduino", f: "https://cdn.worldvectorlogo.com/logos/arduino-1.svg" },
      { n: "SolidWorks", f: "https://www.cadimensions.com/wp-content/uploads/2022/08/solidworks-desktop-logo.png", brk: "3D CAD modeling" },
      { n: "AutoCAD", f: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg6oPA1vOrXHYMc-KsEp6j6JSuKW8KLlHERA&s" },
      { n: "Proteus", f: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/proteus-m6yuuf4xb9n49h83irqsfn.png/proteus-9iq1io6zwhr4e131ry1sex.png?_a=DATAg1AAZAA0" },
      { n: "Blynk", f: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zwtsdjimn9gcgq4nrunp?ik-sanitizeSvg=true" },
    ],
  },
  {
    label: "Tools & Design",
    color: C.tools,
    techs: [
      { n: "Git", f: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" },
      { n: "GitHub", f: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1HctiRAMzzzwozHLo0YxPfZF1vQrjvcWeg&s" },
      { n: "Postman", f: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { n: "VS Code", f: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
      { n: "Figma", f: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
      { n: "Photoshop", f: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" },
      { n: "Canva", f: "https://www.d-id.com/wp-content/uploads/2023/04/1656733637logo-canva-png.png" },
    ],
  },
];

function Tile({ t, isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "9px",
        width: isMobile ? "80px" : "94px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
        }}
      >
        <img
          src={t.f}
          alt={t.n}
          loading="lazy"
          decoding="async"
          style={{
            width: "36px",
            height: "36px",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.55)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {t.n}
        {t.brk && (
          <span
            style={{
              display: "block",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.62rem",
              marginTop: "2px",
              fontFamily: FONT_MONO,
            }}
          >
            ({t.brk})
          </span>
        )}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="stack"
      style={{
        padding: isMobile ? "4rem 4vw" : "4rem 6vw 10rem",
        background: "transparent",
        position: "relative",
        textAlign: "left",
      }}
    >
      {/* Target anchor for navbar links to #skills */}
      <div id="skills" style={{ position: "absolute", top: 0 }} />

      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: isMobile ? "3rem" : "5rem",
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
          Stack
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: isMobile ? "5rem" : "8vw",
          alignItems: "start",
        }}
      >
        {/* LEFT - sticky heading */}
        <div
          style={{
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "0" : "6rem",
            marginBottom: isMobile ? "2rem" : "0",
          }}
        >
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
                margin: "0 0 1.2rem",
              }}
            >
              What I run in production.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.88rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.48)",
              maxWidth: "260px",
            }}
          >
            Profiled under load. Not just imported.
          </motion.p>
        </div>

        {/* RIGHT - tech stack by category */}
        <div>
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.label}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "1.3rem" : "24px",
                alignItems: isMobile ? "flex-start" : "center",
                padding: ci === 0 ? "0 0 24px" : "24px 0",
                borderTop: ci === 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: cat.color,
                  width: isMobile ? "100%" : "118px",
                  flexShrink: 0,
                  lineHeight: 1.5,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                {cat.label}
              </div>
              <div
                style={
                  isMobile
                    ? {
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        gap: "22px 14px",
                        width: "100%",
                      }
                    : { display: "flex", flexWrap: "wrap", gap: "22px 24px" }
                }
              >
                {cat.techs.map((t) => (
                  <Tile key={t.n} t={t} isMobile={isMobile} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
