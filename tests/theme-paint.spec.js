import { test, expect } from '@playwright/test';

for (const mode of [
  { name: 'saved dark theme', saved: 'dark', system: 'light', theme: 'dark', background: 'rgb(16, 23, 32)' },
  { name: 'saved light theme', saved: 'light', system: 'dark', theme: 'light', background: 'rgb(252, 252, 250)' },
  { name: 'system dark theme', saved: null, system: 'dark', theme: 'dark', background: 'rgb(16, 23, 32)' },
]) {
  test(`${mode.name} paints correctly before stylesheets and application JavaScript load`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: mode.system });
    await page.addInitScript(saved => {
      if (saved) localStorage.setItem('theme', saved);
      else localStorage.removeItem('theme');
    }, mode.saved);
    // Simulate navigation while the bundles are unavailable. The document itself
    // must paint the saved theme; waiting for React or an external CSS file flashes.
    await page.route(/\.(?:css|js)(?:\?|$)/, route => route.abort());
    for (const path of ['/', '/swolifts.html', '/logging-guide.html', '/swolifts-release-history.html', '/updates/website-unreleased.html', '/swolifts-import-export.html', '/support.html', '/privacy-policy.html', '/404.html']) {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode.theme);
      await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor)).toBe(mode.background);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(mode.theme);
    }
  });
}
