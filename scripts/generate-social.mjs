import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Render the code-native social card from the approved vector logo and real app screenshot.
const face = await readFile("assets/swolifts-face.svg", "utf8");
const wordmark = await readFile("assets/swolifts-wordmark.svg", "utf8");
const screen = (await readFile("assets/swolifts-workout-screen.png")).toString(
  "base64",
);
const embedded = (svg) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><clipPath id="screen"><rect x="861" y="60" width="228" height="510" rx="24"/></clipPath></defs>
  <rect width="1200" height="630" fill="#f7faff"/>
  <circle cx="980" cy="300" r="300" fill="#eaf2ff"/>
  <circle cx="975" cy="310" r="210" fill="none" stroke="#c3dbfa"/>
  <image href="${embedded(face)}" x="70" y="55" width="80" height="80"/>
  <image href="${embedded(wordmark)}" x="165" y="72" width="290" height="54"/>
  <text x="70" y="252" fill="#172338" font-family="Arial, sans-serif" font-size="69" font-weight="800" letter-spacing="-2">MORE LIFTING.</text>
  <text x="70" y="337" fill="#0067e6" font-family="Arial, sans-serif" font-size="69" font-weight="800" letter-spacing="-2">LESS FRICTION.</text>
  <text x="73" y="401" fill="#566274" font-family="Arial, sans-serif" font-size="26">Your offline workout tracker for Android.</text>
  <text x="73" y="446" fill="#566274" font-family="Arial, sans-serif" font-size="23">No account. Your data. Your progress.</text>
  <rect x="70" y="498" width="325" height="62" rx="9" fill="#0067e6"/>
  <text x="232" y="537" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="22" font-weight="600">Available on Google Play</text>
  <rect x="851" y="50" width="248" height="530" rx="34" fill="#172338"/>
  <image href="data:image/png;base64,${screen}" x="861" y="60" width="228" height="510" preserveAspectRatio="xMidYMid slice" clip-path="url(#screen)"/>
</svg>`;
await writeFile("assets/swolifts-social-card.svg", svg);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page
    .locator("svg")
    .screenshot({ path: "assets/swolifts-social-card.png" });
} finally {
  await browser.close();
}
console.log("Updated the 1200 × 630 SwoLifts social card.");
