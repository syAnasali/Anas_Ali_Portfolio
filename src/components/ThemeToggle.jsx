import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = ({ size = 36, isMobile = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.18)",
        background: isDark ? "rgba(12,12,14,0.85)" : "rgba(255,255,255,0.9)",
        color: isDark ? "#f43f5e" : "#0284c7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "all 0.25s ease",
        padding: 0,
        boxShadow: isDark ? "0 0 12px rgba(244,63,94,0.15)" : "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.6, rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ display: "flex" }}
      >
        {isDark ? <Sun size={isMobile ? 14 : 16} className="text-amber-400" /> : <Moon size={isMobile ? 14 : 16} className="text-indigo-600" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
