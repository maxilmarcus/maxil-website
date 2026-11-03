import { test, expect } from "@playwright/test";

test("guide screenshots open at the matching step and return keyboard focus", async ({ page }) => {
  await page.goto("/logging-guide.html");
  const trigger = page.getByRole("link", { name: "Enlarge screenshot: Log and complete a set", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Inside SwoLifts" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute("src", "/assets/guide/log-set.png");
  await expect(dialog.getByRole("button", { name: "Close screenshot viewer" })).toBeFocused();
  await expect(dialog.getByRole("button", { name: "Next screenshot" })).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  for (const img of await page.locator(".guide-visual img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty("complete", true);
    expect(await img.evaluate(el => el.naturalWidth)).toBeGreaterThan(0);
  }
});

test("restore screenshots remain accessible as full-size images without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/swolifts-import-export.html#quick-share");
  const imageLink = page.getByRole("link", { name: "Enlarge screenshot: Review a backup before restoring", exact: true });
  await expect(imageLink).toHaveAttribute("href", "/assets/transfer/import-preview.png");
  await expect(imageLink.locator("img")).toBeVisible();
  await context.close();
});
