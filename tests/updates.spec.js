import { test, expect } from "@playwright/test";

test("updates link to dated app and website notes with gradual rollout wording", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Updates", exact: true }).click();
  await expect(page.getByRole("heading", { name: "SwoLifts updates", exact: true })).toBeVisible();
  await expect(page.locator("#app-updates article").first()).toContainText("SwoLifts 1.3.0");
  await expect(page.locator("#app-updates article").first()).toContainText("Unreleased preview");
  await expect(page.locator("#release-1-2-0")).toContainText("Rolling out gradually");
  await expect(page.locator("#website-updates time")).toHaveAttribute("datetime", "2026-11-02");
  await page.getByRole("link", { name: "Read A fresh look for SwoLifts", exact: true }).click();
  await expect(page).toHaveURL(/\/updates\/website-2026-11-02.html$/);
  await page.reload();
  await expect(page.getByRole("heading", { name: "A fresh look for SwoLifts", exact: true })).toBeVisible();
  await expect(page.getByText("Sharing instructions require SwoLifts 1.2.0 or later.", { exact: false })).toBeVisible();
  await expect(page.getByRole("img", { name: "The new blue SwoLifts face and wordmark" })).toBeVisible();
  await expect(page.locator("main time")).toHaveAttribute("datetime", "2026-11-02");
  await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(0);
  await page.getByRole("link", { name: "All updates", exact: false }).click();
  await page.getByRole("link", { name: "Read SwoLifts 1.1.1", exact: true }).click();
  await expect(page.locator("main time")).toHaveAttribute("datetime", "2026-08-04");
  await expect(page.getByRole("heading", { name: "Set Notes", exact: true })).toBeVisible();
});

test("individual Markdown notes are readable without JavaScript and have their own metadata", async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/updates/app-1.2.0.html");
  await expect(page.getByRole("heading", { name: "SwoLifts 1.2.0", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Rolling out gradually", exact: true })).toBeVisible();
  await expect(page.locator("main time")).toHaveAttribute("datetime", "2026-11-02");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://maxil.app/updates/app-1.2.0.html");
  await expect(page).toHaveTitle("SwoLifts 1.2.0 | SwoLifts updates");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://maxil.app/updates/app-1.1.1.html");
  expect(sitemap).toContain("https://maxil.app/updates/app-1.2.0.html");
  expect(sitemap).toContain("https://maxil.app/updates/website-2026-11-02.html");
  expect(sitemap).not.toContain("website-unreleased");
  await context.close();
});

test("1.3 preview stays unreleased and its sample screenshots open", async ({ page, request }) => {
  await page.goto("/updates/app-1.3.0.html");
  await expect(page.getByRole("heading", { name: "SwoLifts 1.3.0", exact: true })).toBeVisible();
  await expect(page.getByText("Unreleased preview", { exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  await expect(page.locator(".update-content")).toContainText("not yet available on Google Play");
  await expect(page.locator(".update-content img")).toHaveCount(4);
  for (const img of await page.locator(".update-content img").all()) {
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    const href = await img.locator("..").getAttribute("href");
    expect((await request.get(href)).ok()).toBe(true);
  }
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("app-1.3.0.html");
});
