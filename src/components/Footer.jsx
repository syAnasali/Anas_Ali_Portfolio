import React from "react";

const FONT_MONO = '"DM Mono", monospace';

export const Footer = () => {
  return (
    <footer
      style={{
        position: "relative",
        marginTop: "3rem",
        borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.07))",
        background: "transparent",
        padding: "3rem 6vw 4rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >

        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "var(--text-muted, rgba(255,255,255,0.45))",
            textTransform: "uppercase",
          }}
        >
          © {new Date().getFullYear()} Anas Ali • B.Tech CSE • Jaipur, India
        </span>

        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.55rem",
            letterSpacing: "0.12em",
            color: "var(--text-faint, rgba(255,255,255,0.3))",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Designed & Developed by Anas Ali
        </p>
      </div>
    </footer>
  );
};

export default Footer;
