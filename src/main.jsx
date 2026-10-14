import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { pageFromPath } from "./App";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "./content.css";
import "./styles.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App page={pageFromPath(location.pathname)} />
  </React.StrictMode>
);
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);
