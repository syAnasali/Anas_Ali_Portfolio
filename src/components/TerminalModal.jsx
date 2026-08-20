import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";

const FONT_MONO = '"DM Mono", monospace';

const INITIAL_LOGS = [
  { type: "sys", text: "ANAS ALI PORTFOLIO CLI ENGINE [VERSION 2.0.26]" },
  { type: "sys", text: "Type 'help' to view all available commands." },
];

export const TerminalModal = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim().toLowerCase();
    const newLogs = [...logs, { type: "user", text: `$ ${cmdStr}` }];

    if (!raw) {
      setLogs(newLogs);
      return;
    }

    if (raw === "clear") {
      setLogs([]);
      return;
    }

    if (raw === "exit" || raw === "quit") {
      onClose();
      return;
    }

    switch (raw) {
      case "help":
        newLogs.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  help       - Display list of CLI commands
  whoami     - Anas Ali engineering biography & profile
  skills     - Technical stack (Full-Stack, AI/ML, Robotics)
  projects   - Featured software & hardware projects
  certs      - Verified certifications & honors
  contact    - Email, Phone, WhatsApp & social links
  clear      - Clear terminal screen
  exit       - Close terminal CLI mode`,
        });
        break;

      case "whoami":
      case "bio":
        newLogs.push({
          type: "output",
          text: `ANAS ALI // B.Tech CSE (2023 - 2027)
Govt. Engineering College, Jaipur

Focus Areas:
- Full-Stack Software Engineering (React 18, Next.js, Node.js)
- Artificial Intelligence & Deep Learning (PyTorch, GenAI APIs, Perception)
- Robotics & Hardware Automation (ESP32, Arduino, SolidWorks, Proteus)`,
        });
        break;

      case "skills":
        newLogs.push({
          type: "output",
          text: `TECHNICAL STACK & SKILLS:
Web:      React 18, Next.js 15, Tailwind CSS, Node.js, REST APIs, Supabase
AI/ML:    Python, PyTorch, Scikit-Learn, Generative AI, OpenCV, NLP
Robotics: Arduino IDE, SolidWorks, AutoCAD, Tinkercad, Proteus, ESP32`,
        });
        break;

      case "projects":
        newLogs.push({
          type: "output",
          text: `FEATURED PROJECTS:
1. AI Code Reviewer Assistant - Real-time AST code reviewer with LLM feedback
2. Autonomous Line Follower & Obstacle Robot - Sensor PID feedback robot
3. Medical Diagnostic ML & Telemetry IoT Node - Proteus circuit telemetry
4. Full-Stack E-Commerce Platform - Next.js & Supabase integration`,
        });
        break;

      case "certs":
        newLogs.push({
          type: "output",
          text: `VERIFIED CREDENTIALS & HONORS (17 Total):
- Oracle Certified Generative AI Professional & Data Science Professional
- Oracle Certified DevOps Professional & Developer Professional
- Google & Kaggle AI Agents Specialization
- Nvidia Fundamentals of Deep Learning & Anomaly Detection
- RCAT Robotics & Industrial Automation A-Grade Internship`,
        });
        break;

      case "contact":
        newLogs.push({
          type: "output",
          text: `CONTACT & DIRECT LINKS:
Email:    anasali.global@gmail.com
Phone:    +91 8740926817
WhatsApp: https://wa.me/918740926817
GitHub:   https://github.com/syAnasali
LinkedIn: https://www.linkedin.com/in/anas-ali-global`,
        });
        break;

      default:
        newLogs.push({
          type: "error",
          text: `command not found: '${raw}'. Type 'help' for available commands.`,
        });
        break;
    }

    setLogs(newLogs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal("");
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
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "750px",
              height: "480px",
              borderRadius: "8px",
              border: "1px solid rgba(74,222,128,0.3)",
              background: "#080c08",
              boxShadow: "0 0 30px rgba(74,222,128,0.15)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                background: "rgba(74,222,128,0.08)",
                borderBottom: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <TerminalIcon size={15} className="text-green-400" />
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.62rem",
                    letterSpacing: "0.15em",
                    color: "#4ade80",
                    textTransform: "uppercase",
                  }}
                >
                  anasali@portfolio-cli:~
                </span>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#4ade80",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Log Output Body */}
            <div
              style={{
                flex: 1,
                padding: "1.2rem",
                overflowY: "auto",
                fontFamily: FONT_MONO,
                fontSize: "0.82rem",
                lineHeight: 1.6,
                color: "#4ade80",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    color:
                      log.type === "sys"
                        ? "rgba(255,255,255,0.5)"
                        : log.type === "user"
                        ? "#ffffff"
                        : log.type === "error"
                        ? "#f87171"
                        : "#4ade80",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {log.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Prompt Input Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderTop: "1px solid rgba(74,222,128,0.2)",
                background: "rgba(0,0,0,0.6)",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.82rem",
                  color: "#4ade80",
                  fontWeight: 700,
                }}
              >
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command ('help', 'projects', 'skills', 'certs', 'clear')..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#ffffff",
                  fontFamily: FONT_MONO,
                  fontSize: "0.82rem",
                }}
              />
              <CornerDownLeft size={14} className="text-green-500 opacity-60" />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
