import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, cp, readdir } from "node:fs/promises";

// Build real HTML for every public URL. The browser hydrates the same React tree.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App, pages } = await server.ssrLoadModule("/src/App.jsx");
  for (const page of Object.keys(pages)) {
    const path = `dist/${page}.html`;
    const template = await readFile(path, "utf8");
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
    "sitemap.xml",
    "google5d03b23fa5edc8b2.html",
  ])
    await cp(name, `dist/${name}`);
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
