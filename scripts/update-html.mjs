function escape(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function updateHtml(template, update) {
  const title = escape(`${update.title} | SwoLifts updates`);
  const description = escape(update.summary);
  return template.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\b[^>]*(?:name="description"|property="og:description")[^>]*>/g,
      tag => tag.replace(/content="[^"]*"/, `content="${description}"`))
    .replace(/<meta\b[^>]*property="og:title"[^>]*>/,
      tag => tag.replace(/content="[^"]*"/, `content="${title}"`))
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/,
      `<link rel="canonical" href="https://maxil.app${update.href}" />`)
    .replace("</head>", `${update.status === "unreleased" ? '<meta name="robots" content="noindex" />' : ""}</head>`);
}
