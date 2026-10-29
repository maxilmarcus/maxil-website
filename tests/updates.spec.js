import { test, expect } from "@playwright/test";

test("updates link to individual notes and keep upcoming website changes distinct", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Updates", exact: true }).click();
  await expect(page.getByRole("heading", { name: "SwoLifts updates", exact: true })).toBeVisible();
  await expect(page.locator("#app-updates article").first()).toContainText("SwoLifts 1.1.1");
  await expect(page.locator("#website-updates")).toContainText("Unreleased");
  await page.getByRole("link", { name: "Read A fresh look for SwoLifts", exact: true }).click();
  await expect(page).toHaveURL(/\/updates\/website-unreleased.html$/);
  await page.reload();
  await expect(page.getByRole("heading", { name: "A fresh look for SwoLifts", exact: true })).toBeVisible();
  await expect(page.getByText("A publication date will be added", { exact: false })).toBeVisible();
  await expect(page.getByRole("img", { name: "The new blue SwoLifts face and wordmark" })).toBeVisible();
  await expect(page.locator("main time")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  await page.getByRole("link", { name: "All updates", exact: false }).click();
  await page.getByRole("link", { name: "Read SwoLifts 1.1.1", exact: true }).click();
  await expect(page.locator("main time")).toHaveAttribute("datetime", "2026-08-04");
  await expect(page.getByRole("heading", { name: "Set Notes", exact: true })).toBeVisible();
});

test("individual Markdown notes are readable without JavaScript and have their own metadata", async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/updates/app-1.1.1.html");
  await expect(page.getByRole("heading", { name: "SwoLifts 1.1.1", exact: true })).toBeVisible();
  await expect(page.getByText("Add an optional note to any workout set.", { exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://maxil.app/updates/app-1.1.1.html");
  await expect(page).toHaveTitle("SwoLifts 1.1.1 | SwoLifts updates");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://maxil.app/updates/app-1.1.1.html");
  expect(sitemap).not.toContain("website-unreleased");
  await context.close();
});
