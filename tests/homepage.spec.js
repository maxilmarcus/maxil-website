import { test, expect } from "@playwright/test";
import { PLAY_URL } from "../src/constants.js";

test("screenshots open at the selected feature with accessible gallery navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "03 Load the bar" }).click();
  const trigger = page.getByRole("link", { name: "Enlarge screenshot: Load the bar" });
  await trigger.click();
  const viewer = page.getByRole("dialog", { name: "Inside SwoLifts" });
  const close = viewer.getByRole("button", { name: "Close screenshot viewer" });
  await expect(viewer).toBeVisible();
  await expect(close).toBeFocused();
  await expect(viewer.locator("figcaption")).toHaveText("3 / 4 — Load the bar");
  await expect(viewer.locator("img")).toHaveAttribute("src", /plate-calculator/);
  await page.keyboard.press("Shift+Tab");
  await expect(viewer.getByRole("button", { name: "Next screenshot" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.locator("figcaption")).toHaveText("4 / 4 — Review your history");
  await viewer.getByRole("button", { name: "Next screenshot" }).click();
  await expect(viewer.locator("figcaption")).toHaveText("1 / 4 — Log your workout");
  await viewer.getByRole("button", { name: "Previous screenshot" }).click();
  await expect(viewer.getByRole("link", { name: /Open full-size image/ })).toHaveAttribute("href", /history-calendar/);
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  await trigger.click();
  await close.click();
  await expect(viewer).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("desktop download QR links directly to Play and stays off mobile layouts", async ({ page, isMobile }) => {
  await page.goto("/");
  const qr = page.locator(".desktop-download-qr");
  await expect(qr).toHaveAttribute("href", PLAY_URL);
  if (isMobile) await expect(qr).toBeHidden();
  else await expect(qr).toBeVisible();
});
