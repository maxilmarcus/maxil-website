import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { openBackup } from "../src/workbench/backup.js";

const fixturePath = name => fileURLToPath(new URL(`./fixtures/transfer-v1/${name}`, import.meta.url));
const fixture = "valid-wrapped-bom-exact-kg.zip";
const open = async (page, name = fixture) => {
  const input = page.getByLabel("Open a SwoLifts ZIP or CSV", { exact: true });
  await expect(input).toBeEnabled();
  await input.setInputFiles(fixturePath(name));
};
test.beforeEach(async ({ page }) => { await page.goto("/swolifts-import-export.html"); });

test("shared backup opens, reports bad edit, focuses the field and downloads corrected exact weights", async ({ page }, info) => {
  await open(page);
  await expect(page.locator(".wb-summary")).toContainText("1 sets · 1 workouts · 0 problems");
  await expect(page.locator(".wb-summary")).toBeFocused();
  await page.getByLabel("CSV file", { exact: true }).selectOption("exercise_sets.csv");
  await expect(page.getByLabel("notes, row 2", { exact: true })).toHaveValue("First line\nSecond line");
  await page.getByLabel("weightKg, row 2", { exact: true }).fill("bad weight");
  await expect(page.getByRole("button", { name: "Download corrected ZIP" })).toBeDisabled();
  await page.getByRole("button", { name: "exercise_sets.csv row 2", exact: true }).click();
  await expect(page.getByLabel("weightKg, row 2", { exact: true })).toBeFocused();
  await page.getByLabel("weightKg, row 2", { exact: true }).fill("100");
  await expect(page.getByLabel("weightLbs, row 2", { exact: true })).toHaveValue("220.5");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download corrected ZIP" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toMatch(/^SwoLifts-corrected-\d{4}-\d{2}-\d{2}\.zip$/);
  const corrected = await openBackup(new File([await readFile(await download.path())], "corrected.zip"));
  expect(corrected.files["exercise_sets.csv"].rows[1].slice(4, 7)).toEqual(["220.5", "100", "First line\nSecond line"]);
  await page.locator(".wb-summary").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/${info.project.name}-workbench-edited.png` });
});

test("file contents stay local through editing and AI export", async ({ page }) => {
  await page.waitForLoadState("networkidle");
  const requests = [], sockets = [], workers = [];
  page.on("request", request => requests.push({ url: request.url(), data: request.postData(), method: request.method(), type: request.resourceType() }));
  page.on("websocket", socket => sockets.push(socket.url()));
  page.on("worker", worker => workers.push(worker.url()));
  await open(page);
  await page.getByLabel("CSV file", { exact: true }).selectOption("exercise_sets.csv");
  const marker = 'PRIVATE_WORKOUT_9a18\n<script>window.fileExecuted=true</script>';
  await page.getByLabel("notes, row 2", { exact: true }).fill(marker);
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download for AI" }).click();
  const ai = JSON.parse(await readFile(await (await pending).path(), "utf8"));
  expect(ai.tables["exercise_sets.csv"][0].notes).toBe(marker);
  expect(ai.units["*Lbs"]).toBe("pounds");
  expect(ai.tables["exercise_sets.csv"][0].weightKg).toBe("61.25");
  expect(await page.evaluate(() => window.fileExecuted)).toBeUndefined();
  expect(await page.evaluate(() => JSON.stringify({ local: localStorage, session: sessionStorage }))).not.toContain("PRIVATE_WORKOUT");
  // Opening the editable table can lazily load an already-bundled font weight.
  for (const request of requests) {
    const url = new URL(request.url);
    expect(request.method).toBe("GET");
    expect(request.data).toBeNull();
    expect(request.type).toBe("font");
    expect(url.origin).toBe("http://127.0.0.1:4173");
    expect(url.search).toBe("");
    expect(url.pathname).toMatch(/^\/assets\/(inter|barlow-condensed)-[\w-]+\.woff2?$/);
    expect(request.url).not.toContain("PRIVATE_WORKOUT");
  }
  expect(sockets).toEqual([]);
  expect(workers).toEqual([]);
  await page.reload();
  await expect(page.locator(".wb-summary")).toHaveCount(0);
});

test("drag/drop, CSV additions and date bulk fix produce a valid download", async ({ page }) => {
  const dataTransfer = await page.evaluateHandle(() => {
    const data = new DataTransfer();
    data.items.add(new File(["id,name,startTime\ns,Example,2026-01-02\n"], "workout_sessions.csv", { type: "text/csv" }));
    return data;
  });
  await page.locator("#workbench").dispatchEvent("drop", { dataTransfer });
  await dataTransfer.dispose();
  await expect(page.locator(".wb-summary")).toContainText("1 problems");
  await page.getByText("Fix several rows at once", { exact: true }).click();
  await page.getByRole("button", { name: "Normalize ISO dates to UTC" }).click();
  await expect(page.getByLabel("startTime, row 2", { exact: true })).toHaveValue("2026-01-02T00:00:00Z");
  await page.getByLabel("Add a CSV file", { exact: true }).setInputFiles({ name: "exercise_sets.csv", mimeType: "text/csv", buffer: Buffer.from("sessionId,exerciseName,setNumber\ns,Known lift,1\n") });
  await expect(page.locator(".wb-summary")).toContainText("1 sets · 1 workouts · 0 problems");
  await expect(page.locator(".wb-issues")).toContainText("Unknown exercise");
  await page.getByLabel("Add a CSV file", { exact: true }).setInputFiles({ name: "custom_exercises.csv", mimeType: "text/csv", buffer: Buffer.from("name\nKnown lift\n") });
  await expect(page.locator(".wb-summary")).toContainText("0 warnings");
  await expect(page.getByRole("button", { name: "Download corrected ZIP" })).toBeEnabled();
});

test("invalid shared fixtures show errors and leave a previously opened backup intact", async ({ page }) => {
  await open(page);
  await expect(page.locator(".wb-summary h3")).toHaveText(fixture);
  for (const name of ["invalid-no-data.zip", "invalid-large-cell.zip", "invalid-not-zip.zip"]) {
    await open(page, name);
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.locator(".wb-summary h3")).toHaveText(fixture);
  }
});

test("example is usable and dirty edits require confirmation before clearing", async ({ page }) => {
  await page.getByRole("button", { name: "Try an example" }).click();
  await expect(page.locator(".wb-summary")).toContainText("0 problems");
  await page.getByRole("button", { name: "Clear workbench" }).click();
  await open(page);
  await page.getByLabel("name, row 2", { exact: true }).fill("Edited lift");
  page.once("dialog", dialog => dialog.dismiss());
  await page.getByRole("button", { name: "Clear workbench" }).click();
  await expect(page.locator(".wb-summary")).toBeVisible();
  page.once("dialog", dialog => dialog.accept());
  await page.getByRole("button", { name: "Clear workbench" }).click();
  await expect(page.locator(".wb-summary")).toHaveCount(0);
});

test("keyboard file button, narrow layout and primary/error contrast in both themes", async ({ page }, info) => {
  await page.evaluate(() => { window.showOpenFilePicker = undefined; });
  const button = page.getByRole("button", { name: "Open my SwoLifts file" });
  await button.focus();
  const chooser = page.waitForEvent("filechooser");
  await page.keyboard.press("Enter");
  await (await chooser).setFiles(fixturePath(fixture));
  await expect(page.locator(".wb-summary")).toBeFocused();
  await open(page, "invalid-not-zip.zip");
  await page.setViewportSize({ width: 320, height: 800 });
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "Switch to dark theme" }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const ratios = await page.locator(".wb-primary:not(:disabled), .wb-error").evaluateAll(elements => {
      const luminance = color => {
        const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
          const c = value / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
        });
        return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
      };
      return elements.map(element => {
        const style = getComputedStyle(element), a = luminance(style.color), b = luminance(style.backgroundColor);
        return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      });
    });
    for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
    await page.locator("#workbench").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `.qa/${info.project.name}-workbench-320-${theme}.png` });
  }
});
