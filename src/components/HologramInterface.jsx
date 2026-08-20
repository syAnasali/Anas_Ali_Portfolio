import React from "react";

export function HologramInterface({ children }) {
  return (
    <div className="hologram-interface">
      <div className="hologram-content">{children}</div>
    </div>
  );
}
