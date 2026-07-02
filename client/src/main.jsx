// src/main.jsx
// Application entry point — mounts the React app into the DOM

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Mount the App component into the <div id="root"> in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
