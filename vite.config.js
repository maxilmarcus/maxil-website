import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const pages = [
  "index",
  "swolifts",
  "logging-guide",
  "swolifts-import-export",
  "swolifts-release-history",
  "support",
  "privacy-policy",
  "404",
];

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(`${page}.html`)]),
      ),
    },
  },
});
