import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ArrowUp, Code2, Cpu, Brain, Layers, X, CpuIcon, Network, ShieldCheck, Terminal } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const PROJECTS = [
  {
    id: "01",
    title: "AI Finance Manager",
    category: "web-ai",
    categoryLabel: "Full-Stack Web & AI",
    description: "A full-fledged AI-powered finance tracking platform with automated receipt scanning, recurring transaction scheduling via Inngest, and financial analytics.",
    image: "/projects/finance.png",
    tags: ["Next.js 15", "TailwindCSS", "Shadcn UI", "Supabase", "Inngest", "Clerk", "Prisma", "Arcjet", "Resend"],
    demoUrl: "https://github.com/syAnasali/AI-Finance-Manager",
    githubUrl: "https://github.com/syAnasali/AI-Finance-Manager",
    featured: true,
    architecture: {
      flow: "Client (Next.js 15) → Auth (Clerk) → Background Queue (Inngest) → AI Parser (Gemini API) → DB (Supabase/Prisma)",
      challenges: [
        "Automated OCR receipt scanning and structured JSON extraction using Gemini Flash API.",
        "Cron-scheduled recurring invoice generation and ledger updates via Inngest workers.",
        "Bot protection, rate limiting, and attack mitigation using Arcjet security rules.",
      ],
      metrics: "Sub-500ms API response • 99.9% uptime",
    },
  },
  {
    id: "02",
    title: "Jarvis | Autonomous Desktop AI Assistant",
    category: "ai-ml",
    categoryLabel: "AI & Autonomous Agents",
    description: "A production-oriented, offline-first local AI assistant running local LLMs via Ollama with real-time streaming, multi-type persistent memory, task planning runtime, 23 system automation tools, and PySide6 desktop GUI.",
    image: "/projects/Jarvis.png",
    tags: ["Python 3.13", "Ollama", "Local LLMs", "PySide6", "Whisper", "SQLite WAL", "Task Planning", "Agent Tools"],
    demoUrl: "https://github.com/syAnasali/jarvis-ai-assistant",
    githubUrl: "https://github.com/syAnasali/jarvis-ai-assistant",
    featured: true,
    architecture: {
      flow: "User (PySide6 GUI / Voice / CLI) → AgentController & Heuristic Router → TaskPlan Executor → Hybrid Memory Retriever (SQLite WAL) → Local LLM (Ollama qwen2.5:7b) → 23 System Tools with Action Approval",
      challenges: [
        "Zero-cloud offline LLM inference via Ollama with word-by-word streaming token accumulator parsing.",
        "Synchronized modal action approval runtime with indefinite OS console thread wait and safety suspension for dangerous OS commands.",
        "Air-gapped push-to-talk voice loop combining faster-whisper STT and pyttsx3 TTS with dynamic prompt context trimming (78.9% prompt compression).",
      ],
      metrics: "405 Tests Passed • 78.9% Prompt Compression • 100% Offline Privacy",
    },
  },
  {
    id: "03",
    title: "Model Wall-E Perception Car",
    category: "robotics",
    categoryLabel: "Robotics & Hardware",
    description: "Autonomous perception system & manually controlled mini robotic vehicle engineered with ESP32 microcontrollers, Arduino C++, Blynk IoT, and ultrasonic sensors.",
    image: "/projects/robo.jpg",
    tags: ["Hardware", "IoT", "Arduino", "Blynk", "ESP32", "SolidWorks", "Perception"],
    demoUrl: "https://github.com/syAnasali/RCAT-Robotics-and-Automation",
    githubUrl: "https://github.com/syAnasali/RCAT-Robotics-and-Automation",
    featured: true,
    architecture: {
      flow: "Hardware Sensors (Ultrasonic/IR) → ESP32 Microcontroller → L298N Motor Driver → Blynk IoT Telemetry",
      challenges: [
        "Low-latency real-time Wi-Fi control loop over Blynk IoT protocol.",
        "Obstacle distance perception math & autonomous collision avoidance algorithm.",
        "Custom 3D printed mechanical chassis designed and modeled in SolidWorks.",
      ],
      metrics: "<20ms Telemetry Latency • 100% Hardware Precision",
    },
  },
  {
    id: "04",
    title: "Pixel_Info | AI Image Caption Generator",
    category: "ai-ml",
    categoryLabel: "AI & Deep Learning",
    description: "An end-to-end deep learning system generating natural language captions for images using a pre-trained ResNet50 CNN encoder and custom PyTorch LSTM with Beam Search decoding, served via FastAPI and Next.js 15.",
    image: "/projects/PixelInfo.png",
    tags: ["PyTorch", "ResNet50", "LSTM", "FastAPI", "Next.js 15", "Python", "CUDA", "Beam Search"],
    demoUrl: "https://github.com/syAnasali/Pixel_Info",
    githubUrl: "https://github.com/syAnasali/Pixel_Info",
    featured: true,
    architecture: {
      flow: "Next.js 15 Client → FastAPI REST (POST /caption) → ResNet50 Feature Extractor (2048-dim) → PyTorch LSTM Decoder (Beam Search k=3) → Generated Natural Language Caption",
      challenges: [
        "Visual feature projection mapping 2048-dim ResNet50 vectors into 512-dim multimodal embedding spaces.",
        "Beam Search decoding (k=3, α=0.75) boosting BLEU-4 by +10.99% and vocabulary diversity by +14.63% over greedy decoding.",
        "FastAPI model lifecycle caching with GPU CUDA acceleration for single-load inference memory optimization.",
      ],
      metrics: "+10.99% BLEU-4 Boost • 6.45M Parameters • Sub-second GPU Inference",
    },
  },
  {
    id: "05",
    title: "BillFlow SaaS Billing Engine",
    category: "web-ui",
    categoryLabel: "Full-Stack SaaS",
    description: "A standalone, type-safe SaaS invoice and billing management platform with cookie-based SSR Supabase auth, dynamic spreadsheet math, server-side PDF generation, and financial dashboard analytics.",
    image: "/projects/BillFlow.png",
    tags: ["Next.js 15", "TypeScript", "Supabase", "React 19", "TailwindCSS", "shadcn/ui", "PostgreSQL RLS", "React-PDF"],
    demoUrl: "https://bill-flow-neon.vercel.app/",
    githubUrl: "https://github.com/syAnasali/BillFlow",
    featured: true,
    architecture: {
      flow: "Client (Next.js 15 / React 19) → SSR Middleware Auth (Supabase) → Server Actions (Monetary Validation) → PostgreSQL (RLS) → @react-pdf/renderer (A4 Stream)",
      challenges: [
        "Tamper-proof monetary recalculation validating taxes, discounts, and line-item totals server-side prior to DB commit.",
        "Historical snapshot integrity preserving business and customer headers at creation time against future profile mutations.",
        "Server-side A4 invoice compilation and streaming via @react-pdf/renderer in Node.js without client-side overhead.",
      ],
      metrics: "100% Type-Safe • Server-Side PDF Stream • Zero Math Drift",
    },
  },
  {
    id: "06",
    title: "News Aggregator App",
    category: "mobile",
    categoryLabel: "Android & Mobile",
    description: "A professional, minimal Android news app fetching live BBC News RSS feeds with Material Design cards, shimmer loading, and progress-aware WebView reader.",
    image: "/projects/NewsApp.png",
    tags: ["Java", "Android XML", "Material Design", "Glide", "RSS Parsing", "Shimmer UI", "WebView"],
    demoUrl: "https://github.com/syAnasali/NewsAggregatorApp",
    githubUrl: "https://github.com/syAnasali/NewsAggregatorApp",
    featured: false,
    architecture: {
      flow: "BBC RSS Feed → HttpURLConnection (Worker Thread) → XmlPullParser → NewsItem Model → RecyclerView / Glide Cache → In-App WebView",
      challenges: [
        "Non-blocking background thread networking with HttpURLConnection preventing main-thread UI stutter.",
        "Optimized image caching and memory footprint management using Glide.",
        "Smooth pull-to-refresh feed synchronization with animated Facebook Shimmer skeleton placeholders.",
      ],
      metrics: "60 FPS Fluid Scroll • Zero Main Thread Blocking",
    },
  },
  {
    id: "07",
    title: "Crop Prediction System",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    description: "A soil and climate-based crop recommendation machine learning system predicting optimal agricultural yields based on NPK soil ratios, rainfall, and temperature.",
    image: "/projects/crop.png",
    tags: ["Python", "Machine Learning", "Scikit-Learn", "NumPy", "Pandas", "Flask"],
    demoUrl: "https://github.com/syAnasali/Crop-Prediction-System",
    githubUrl: "https://github.com/syAnasali/Crop-Prediction-System",
    featured: false,
    architecture: {
      flow: "Soil Parameters (NPK, Temp, Rain) → Flask API Server → Scikit-Learn Classifier → Recommended Crop Output",
      challenges: [
        "Feature engineering & normalization on multi-regional agricultural soil dataset.",
        "Model evaluation using Random Forest & XGBoost achieving >95% prediction accuracy.",
        "Lightweight REST API deployment for real-time inference in rural agricultural apps.",
      ],
      metrics: ">95% Prediction Accuracy • Instant Inference",
    },
  },
  {
    id: "08",
    title: "Portfolio Website",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "A developer portfolio built to present systems, projects, achievements, and technical expertise with spatial 3D physics and editorial typography.",
    image: "/projects/portfolio.png",
    tags: ["React 18", "Vite", "TailwindCSS", "Lucide", "Framer Motion", "Canvas 2D"],
    demoUrl: "https://anas-ali-global.netlify.app",
    githubUrl: "https://github.com/syAnasali/Anas_Ali_Portfolio",
    featured: false,
    architecture: {
      flow: "Vite React 18 App → 2D Canvas Particle Engine → Dual-Track Gantt Trajectory Physics → Holographic Interface",
      challenges: [
        "Scroll-driven canvas particle animation loop with inertia physics.",
        "Dual-track Gantt timeline layout preventing overlapping role card collisions.",
        "Cmd+K Command Palette and CLI Terminal mode overlays.",
      ],
      metrics: "60 FPS Render • 100% Responsive",
    },
  },
  {
    id: "09",
    title: "Drive Clone Storage Platform",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "A cloud file storage platform letting users securely upload, store, access, and share files with JWT authentication and Multer stream handling.",
    image: "/projects/drive.png",
    tags: ["Express", "Node.js", "MongoDB", "Multer", "JWT", "REST API"],
    demoUrl: "https://github.com/syAnasali/Drive_Clone",
    githubUrl: "https://github.com/syAnasali/Drive_Clone",
    featured: false,
    architecture: {
      flow: "Client Upload → Express Middleware (Multer) → MongoDB GridFS Storage → JWT Auth",
      challenges: [
        "Stream handling for large file uploads without clogging server memory.",
        "Role-based permission controls and secure access tokens.",
      ],
      metrics: "Stream Processing • Encrypted Authentication",
    },
  },
  {
    id: "10",
    title: "Password Manager",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "A secure local password manager application that encrypts, stores, and manages credentials with instant search and clipboard auto-copy.",
    image: "/projects/pass.png",
    tags: ["React", "Vite", "TailwindCSS", "Lucide", "Web Crypto"],
    demoUrl: "https://github.com/syAnasali/Password-Manager",
    githubUrl: "https://github.com/syAnasali/Password-Manager",
    featured: false,
    architecture: {
      flow: "User Secret → Web Crypto API Encryption → Local Encrypted Vault",
      challenges: [
        "Client-side encryption ensuring plain text passwords never leave local device.",
        "Instant search filter over encrypted credential vault.",
      ],
      metrics: "Zero-Knowledge Security • Instant Search",
    },
  },
  {
    id: "11",
    title: "Automobile Garage Management",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "An operational management system for garage service centers organizing customer bookings, vehicle records, billing, and service mechanics.",
    image: "/projects/garage.png",
    tags: ["HTML5", "CSS3", "PHP", "MySQL", "Apache", "XAMPP"],
    demoUrl: "https://github.com/syAnasali/Automobile-Garage-Management-System",
    githubUrl: "https://github.com/syAnasali/Automobile-Garage-Management-System",
    featured: false,
    architecture: {
      flow: "Client Form → Apache Web Server → PHP Controller → MySQL Relational Database",
      challenges: [
        "Relational schema design connecting mechanics, customer invoices, and vehicle history.",
        "Automated billing generator calculating parts cost and labor charges.",
      ],
      metrics: "Normalized Relational DB • Sub-second Query Speed",
    },
  },
  {
    id: "12",
    title: "Web Music Player",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "A sleek web audio player enabling users to stream, control, and organize music playback directly inside the browser using native Web Audio APIs.",
    image: "/projects/music.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Audio API"],
    demoUrl: "https://github.com/syAnasali/Web-Music-Player",
    githubUrl: "https://github.com/syAnasali/Web-Music-Player",
    featured: false,
    architecture: {
      flow: "Audio Source → HTML5 Web Audio API Context → Dynamic Visualizer Canvas",
      challenges: [
        "Smooth frequency spectrum visualizer rendered using requestAnimationFrame.",
        "Seamless audio buffering and playlist queue management.",
      ],
      metrics: "60 FPS Visualizer • Low Latency Audio",
    },
  },
  {
    id: "13",
    title: "Task Tracker System",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "A task tracking app designed to organize, prioritize, and monitor daily engineering tasks with interactive status boards.",
    image: "/projects/task.png",
    tags: ["React", "Vite", "TailwindCSS", "Local Storage"],
    demoUrl: "https://github.com/syAnasali/Task-Tracker",
    githubUrl: "https://github.com/syAnasali/Task-Tracker",
    featured: false,
    architecture: {
      flow: "React State → Filter & Priority Controllers → Persistent LocalStorage",
      challenges: [
        "Optimistic UI updates for drag/status toggles.",
        "State persistence across browser sessions.",
      ],
      metrics: "Instant State Sync",
    },
  },
  {
    id: "14",
    title: "Token & Order Management",
    category: "web-ui",
    categoryLabel: "Full-Stack Web",
    description: "A real-time token and order management system built for high-throughput order queueing in commercial shops and restaurants.",
    image: "/projects/Token.png",
    tags: ["Express", "Node.js", "React", "SQLite", "Socket.IO"],
    demoUrl: "https://github.com/syAnasali/Token_System",
    githubUrl: "https://github.com/syAnasali/Token_System",
    featured: false,
    architecture: {
      flow: "Order Terminal → Express Server → Socket.IO Real-Time Engine → Queue Display Screen",
      challenges: [
        "Real-time WebSocket event synchronization between kitchen display & order counter.",
        "Concurrent token ID generation with transactional safety.",
      ],
      metrics: "Real-Time WebSocket Sync • High Throughput",
    },
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Systems", icon: <Layers size={14} /> },
  { id: "web-ai", label: "Web & Apps", icon: <Code2 size={14} /> },
  { id: "robotics", label: "Robotics & Hardware", icon: <Cpu size={14} /> },
  { id: "ai-ml", label: "AI & Data Science", icon: <Brain size={14} /> },
];

const INITIAL_SHOW_COUNT = 6;

export const ProjectsSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW_COUNT);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "web-ai") return p.category === "web-ai" || p.category === "web-ui" || p.category === "mobile";
    return p.category === activeCategory;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? "4rem 4vw" : "6rem 6vw",
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
          Selected Engineering Works
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "var(--border-subtle, rgba(255,255,255,0.07))",
          }}
        />
      </div>

      {/* Section Title */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile
                ? "clamp(2rem, 8vw, 3rem)"
                : "clamp(2.8rem, 4.5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "0.02em",
              color: "var(--text-heading, #fafaf8)",
              margin: 0,
            }}
          >
            Systems & Solutions.
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--text-body, rgba(255,255,255,0.55))",
              maxWidth: "540px",
              margin: "0.8rem 0 0",
            }}
          >
            Production web applications, machine learning prediction engines, and autonomous robotics hardware designed and built for real-world reliability.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            background: "var(--pill-bg, rgba(255,255,255,0.02))",
            padding: "5px",
            borderRadius: "8px",
            border: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
          }}
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setVisibleCount(INITIAL_SHOW_COUNT);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: isActive ? "var(--pill-bg-active, rgba(255,255,255,0.12))" : "transparent",
                  color: isActive ? "var(--text-heading, #fafaf8)" : "var(--text-muted, rgba(255,255,255,0.5))",
                  fontFamily: FONT_MONO,
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "2rem",
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              style={{
                borderRadius: "10px",
                border: "1px solid var(--border-card, rgba(255,255,255,0.12))",
                background: "var(--bg-card, rgba(255,255,255,0.01))",
                boxShadow: "var(--shadow-card, none)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              whileHover={{ y: -5, borderColor: "var(--border-strong, rgba(255,255,255,0.3))" }}
            >
              {/* Card Image Banner */}
              <div
                style={{
                  height: "200px",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  background: "rgba(0,0,0,0.6)",
                  borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.82,
                    transition: "transform 0.5s ease",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* Category Pill Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    fontFamily: FONT_MONO,
                    fontSize: "0.55rem",
                    letterSpacing: "0.1em",
                    color: "var(--text-heading, #e8e0d0)",
                    background: "var(--hud-bg, rgba(0,0,0,0.75))",
                    backdropFilter: "blur(6px)",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.15))",
                    textTransform: "uppercase",
                  }}
                >
                  {project.categoryLabel}
                </div>
              </div>

              {/* Card Content Body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "var(--text-heading, #fafaf8)",
                    margin: "0 0 0.6rem",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: "var(--text-body, rgba(255,255,255,0.6))",
                    margin: "0 0 1.2rem",
                    flex: 1,
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {project.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.58rem",
                        color: "var(--text-body, rgba(255,255,255,0.7))",
                        border: "1px solid var(--border-subtle, rgba(255,255,255,0.1))",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background: "var(--pill-bg, rgba(255,255,255,0.02))",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Actions Footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                  }}
                >
                  {/* Architecture Detail Trigger Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--cat-frontend, #60a5fa)",
                      fontFamily: FONT_MONO,
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: 0,
                    }}
                  >
                    <Network size={14} />
                    <span>Architecture</span>
                  </button>

                  <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Repository"
                      style={{ color: "var(--text-muted, rgba(255,255,255,0.6))", transition: "color 0.2s" }}
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live System Link"
                      style={{ color: "var(--text-heading, rgba(255,255,255,0.8))", transition: "color 0.2s" }}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            style={{
              padding: "12px 28px",
              borderRadius: "6px",
              border: "1px solid var(--border-strong, rgba(255,255,255,0.18))",
              background: "var(--bg-surface-elevated, rgba(255,255,255,0.03))",
              color: "var(--text-heading, #fafaf8)",
              fontFamily: FONT_MONO,
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            Load More Projects ({filteredProjects.length - visibleCount} Remaining)
          </button>
        </div>
      )}

      {/* System Architecture Deep-Dive Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              background: "var(--modal-backdrop, rgba(0,0,0,0.85))",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "700px",
                maxHeight: "85vh",
                overflowY: "auto",
                borderRadius: "10px",
                border: "1px solid var(--border-card, rgba(255,255,255,0.2))",
                background: "var(--bg-card, #0c0c0e)",
                padding: "2rem",
                boxShadow: "var(--modal-shadow, 0 25px 60px rgba(0,0,0,0.9))",
                color: "var(--text-heading, #fafaf8)",
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-subtle, rgba(255,255,255,0.1))",
                  paddingBottom: "1rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.58rem",
                      letterSpacing: "0.15em",
                      color: "var(--cat-frontend, #60a5fa)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    System Architecture Breakdown // {selectedProject.categoryLabel}
                  </span>
                  <h3
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      margin: 0,
                      color: "var(--text-heading, #fafaf8)",
                    }}
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted, rgba(255,255,255,0.5))",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Data Flow Pipeline */}
              {selectedProject.architecture && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "var(--text-muted, rgba(255,255,255,0.45))",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Architecture Data Flow
                    </span>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.75rem",
                        color: "var(--text-body, #e8e0d0)",
                        padding: "12px 16px",
                        borderRadius: "6px",
                        border: "1px solid var(--border-subtle, rgba(255,255,255,0.1))",
                        background: "var(--bg-surface-elevated, rgba(255,255,255,0.02))",
                        lineHeight: 1.5,
                      }}
                    >
                      {selectedProject.architecture.flow}
                    </div>
                  </div>

                  {/* Key Challenges Solved */}
                  <div>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "var(--text-muted, rgba(255,255,255,0.45))",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Engineering Challenges Solved
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedProject.architecture.challenges.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: "0.88rem",
                              color: "var(--text-body, rgba(255,255,255,0.75))",
                              margin: 0,
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark Performance Metric */}
                  {selectedProject.architecture.metrics && (
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--border-subtle, rgba(96,165,250,0.3))",
                        background: "var(--bg-surface-elevated, rgba(96,165,250,0.06))",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: FONT_MONO,
                        fontSize: "0.7rem",
                        color: "var(--cat-frontend, #60a5fa)",
                      }}
                    >
                      <Terminal size={14} />
                      <span>Benchmark: {selectedProject.architecture.metrics}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "2rem",
                  paddingTop: "1.2rem",
                  borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.1))",
                }}
              >
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-card, rgba(255,255,255,0.2))",
                    background: "var(--bg-surface-elevated, rgba(255,255,255,0.03))",
                    color: "var(--text-heading, #fafaf8)",
                    fontFamily: FONT_MONO,
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Github size={15} />
                  <span>Repository</span>
                </a>

                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid var(--accent-button-bg, #e8e0d0)",
                    background: "var(--accent-button-bg, #e8e0d0)",
                    color: "var(--accent-button-text, #000000)",
                    fontFamily: FONT_MONO,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <span>Live System</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
