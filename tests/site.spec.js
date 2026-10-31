import { test, expect } from "@playwright/test";

const urls = [
  "/",
  "/swolifts.html",
  "/logging-guide.html",
  "/swolifts-import-export.html",
  "/swolifts-release-history.html",
  "/updates/app-1.1.1.html",
  "/updates/app-1.0.html",
  "/updates/website-unreleased.html",
  "/support.html",
  "/privacy-policy.html",
  "/404.html",
];

for (const url of urls) {
  test(`${url} renders, hydrates, and fits the viewport`, async ({
    page,
    request,
  }, testInfo) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        /hydration|React|Minified/.test(message.text())
      )
        errors.push(message.text());
    });
    await page.goto(url);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    // The built HTML must remain useful without executing JavaScript.
    const response = await request.get(url);
    expect(await response.text()).toContain("<main");
    await page.screenshot({
      path: `.qa/${testInfo.project.name}-${url === "/" ? "home" : url.slice(1, -5)}.png`,
      fullPage: true,
    });
  });
}

test("all local links, anchors, images, and ZIP downloads resolve", async ({
  page,
  request,
}) => {
  const targets = new Set();
  for (const url of urls.filter((u) => u !== "/404.html")) {
    await page.goto(url);
    const refs = await page
      .locator("a[href], img[src]")
      .evaluateAll((elements) => elements.map((el) => el.href || el.src));
    for (const ref of refs)
      if (ref.startsWith("http://127.0.0.1:4173")) targets.add(ref);
  }
  for (const ref of targets) {
    const target = new URL(ref);
    const response = await request.get(target.pathname);
    expect(response.status(), ref).toBe(200);
    if (target.hash) {
      const html = await response.text();
      expect(html, ref).toContain(`id="${target.hash.slice(1)}"`);
    }
    if (target.pathname.endsWith(".zip"))
      expect((await response.body()).subarray(0, 2).toString()).toBe("PK");
  }
});

test("product explorer and chart respond to input", async ({ page }) => {
  await page.goto("/swolifts.html");
  await page.getByRole("button", { name: "03 Load the bar" }).click();
  await expect(
    page.getByRole("heading", { name: "Leave the plate math to us." }),
  ).toBeVisible();
  await expect(
    page.getByAltText(
      "SwoLifts plate calculator with per-side plate breakdown",
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Volume", exact: true }).click();
  await expect(page.locator(".demo-value")).toContainText("4,000");
  await page.getByRole("slider", { name: "Example workout session" }).fill("0");
  await expect(page.locator(".demo-value")).toContainText("3,240");
});

test("FAQ search, disclosure, and reset work", async ({ page }) => {
  await page.goto("/support.html");
  await page.getByRole("searchbox").fill("back up");
  await expect(page.locator(".faq-item")).toHaveCount(1);
  await page.locator(".faq-item summary").click();
  await expect(page.locator(".faq-answer")).toBeVisible();
  await page.getByRole("searchbox").fill("no-such-question");
  await expect(page.getByRole("status")).toHaveText("0 answers found");
  await page.getByRole("button", { name: "Show all questions" }).click();
  await expect(page.locator(".faq-item")).toHaveCount(7);
});

test("theme persists across navigation and reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.goto("/logging-guide.html");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Switch to light theme" }),
  ).toBeVisible();
});

test("keyboard and mobile navigation work", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Guides", exact: true })
    .click();
  await expect(page).toHaveURL(/logging-guide.html/);
  if (isMobile)
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeHidden();
});

test("narrow screens and dark mode remain readable without page overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const url of urls) {
    await page.goto(url);
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      url,
    ).toBe(true);
    await page.getByRole("button", { name: "Switch to light theme" }).click();
  }
});

test("documentation, FAQs and downloads work with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4173/support.html");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.locator(".faq-item summary").first().click();
  await expect(page.locator(".faq-answer").first()).toBeVisible();
  await page.goto("http://127.0.0.1:4173/swolifts-import-export.html");
  await expect(
    page.getByRole("link", { name: "Download Blank ZIP" }),
  ).toBeVisible();
  await context.close();
});


test("workbench is discoverable from main navigation", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Workbench", exact: true }).click();
  await expect(page).toHaveURL(/swolifts-import-export.html/);
  await expect(page.getByRole("heading", { name: "SwoLifts Backup Workbench" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open my SwoLifts file", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Try an example", exact: true })).toBeVisible();
  await expect(page.locator("#quick-share ol li")).toHaveCount(3);
  await expect(page.locator("header .nav-download")).toHaveAttribute("href", /play.google.com/);
  if (isMobile) await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
});


test("workbench navigation fits tablet widths", async ({ page }, testInfo) => {
  for (const width of [821, 900, 1050]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/swolifts-import-export.html");
    await page.evaluate(() => document.fonts.ready);
    const header = await page.locator("header .nav-inner").evaluate(el => {
      const children = [...el.children].filter(child => getComputedStyle(child).display !== "none")
        .map(child => child.getBoundingClientRect());
      return children.every((rect, i) => rect.left >= 0 && rect.right <= innerWidth &&
        (i === 0 || children[i - 1].right <= rect.left));
    });
    expect(header).toBe(true);
    await page.screenshot({ path: `.qa/ux-120-${testInfo.project.name}-${width}.png` });
  }
});
