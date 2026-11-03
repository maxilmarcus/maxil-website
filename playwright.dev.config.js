import { defineConfig } from "@playwright/test";
import base from "./playwright.config.js";

// Exercise React StrictMode effect replay, which production builds omit.
export default defineConfig({
  ...base,
  testMatch: ["**/homepage.spec.js", "**/guides.spec.js"],
  // No-JavaScript behavior requires the prerendered production build.
  grepInvert: /without JavaScript/,
  webServer: {
    ...base.webServer,
    command: "npm run dev -- --port 4173 --strictPort",
    reuseExistingServer: false,
  },
});
