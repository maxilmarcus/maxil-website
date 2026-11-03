import { marked } from "marked";

// Only reviewed Markdown checked into this repository is rendered here.
// Uploaded workout files never enter this content pipeline.
const sources = import.meta.glob("./content/updates/*/*.md", {
  query: "?raw", import: "default", eager: true,
});

export const updates = Object.entries(sources).map(([path, source]) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing update metadata: ${path}`);
  const metadata = JSON.parse(match[1]);
  const [, kind, name] = path.match(/updates\/(app|website)\/([^/]+)\.md$/);
  const slug = `${kind}-${name}`;
  return { ...metadata, kind, name, slug, path: `updates/${slug}`,
    href: `/updates/${slug}.html`, html: marked.parse(match[2], { async: false }) };
}).sort((a, b) => Number(b.status === "unreleased") - Number(a.status === "unreleased")
  || (b.date || "").localeCompare(a.date || "")
  || b.name.localeCompare(a.name, undefined, { numeric: true }));

export function updateDate(update) {
  if (update.status === "unreleased") return "Unreleased preview";
  if (!update.date) return "Initial Android release";
  return new Intl.DateTimeFormat("en", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${update.date}T00:00:00Z`));
}
