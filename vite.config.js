import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { updateHtml } from "./scripts/update-html.mjs";

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
  plugins: [react(), {
    name: "update-pages",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split("?")[0];
        if (!pathname?.startsWith("/updates/") || !pathname.endsWith(".html")) return next();
        try {
          const { updates } = await server.ssrLoadModule("/src/updates.js");
          const update = updates.find(entry => entry.href === pathname);
          if (!update) return next();
          const template = await readFile(resolve("swolifts-release-history.html"), "utf8");
          const html = await server.transformIndexHtml(request.url, updateHtml(template, update));
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.end(html);
        } catch (error) { next(error); }
      });
    },
  }],
  base: "/",
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(`${page}.html`)]),
      ),
    },
  },
});
