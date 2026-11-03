import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, cp, readdir, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { updateHtml } from "./update-html.mjs";

// Build real HTML for every public URL. The browser hydrates the same React tree.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App, pages, updates } = await server.ssrLoadModule("/src/App.jsx");
  const updateTemplate = await readFile("dist/swolifts-release-history.html", "utf8");
  for (const page of Object.keys(pages)) {
    const path = `dist/${page}.html`;
    const update = updates.find(entry => entry.path === page);
    const template = update ? updateHtml(updateTemplate, update) : await readFile(path, "utf8");
    await mkdir(dirname(path), { recursive: true });
    if (!template.includes("<!--app-html-->"))
      throw new Error(`Missing render marker: ${path}`);
    await writeFile(
      path,
      template.replace(
        "<!--app-html-->",
        renderToString(createElement(App, { page })),
      ),
    );
    console.log(`Rendered /${page === "index" ? "" : `${page}.html`}`);
  }
  await cp("assets", "dist/assets", { recursive: true });
  for (const name of [
    "CNAME",
    "robots.txt",
    "google5d03b23fa5edc8b2.html",
  ])
    await cp(name, `dist/${name}`);
  const sitemap = await readFile("sitemap.xml", "utf8");
  await writeFile("dist/sitemap.xml", sitemap.replace("</urlset>", updates
    .filter(update => update.status === "published")
    .map(update => `  <url><loc>https://maxil.app${update.href}</loc></url>`).join("\n") + "\n</urlset>"));
  // Preserve existing standalone design explorations at their old URLs.
  for (const name of await readdir(".")) {
    if (name.endsWith(".html") && !Object.hasOwn(pages, name.slice(0, -5)))
      await cp(name, `dist/${name}`);
  }
  await cp("css", "dist/css", { recursive: true });
  await cp("js", "dist/js", { recursive: true });
  await writeFile("dist/.nojekyll", "");
} finally {
  await server.close();
}
