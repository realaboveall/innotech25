import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 🧠 Developer Team Signature Banner
window.addEventListener("load", () => {
  const banner = `
%c╔════════════════════════════════════════════════════╗
║                     ⚡ PROJECT TEAM ⚡              ║
╠══════════════════════════════════════════════════════╣
║  🖥️  Frontend : Atulya Rounak(/realaboveall)         ║
║  ⚙️  Backend  : Anish Kumar (7anish)                 ║
║  🌐  Integration : Yaman Saini (yamanSaini0405)         ║
╚══════════════════════════════════════════════════════╝`;

  console.log(
    banner,
    "color: #00ffe5; font-weight: bold; background: #0a0a0a; padding: 6px 12px; font-family: monospace; font-size: 13px;"
  );
});
