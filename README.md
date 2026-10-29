# SwoLifts website

The SwoLifts Android product and documentation website, built with React and Vite. Production is hosted at **https://maxil.app** on GitHub Pages.

## Development

Requires Node.js 24 and npm. Run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Existing URLs such as `/swolifts.html`, `/logging-guide.html`, and `/privacy-policy.html` remain supported.

```sh
npm run build
npm run preview
```

The build creates `dist/`, including complete HTML for each page. `scripts/prerender.mjs` renders the same React components used in the browser, which then hydrates the HTML to enable interactions. No production Node server, client-side routing fallback, or backend is required. Deploy **dist**, never the unbuilt repository root.

## Structure

- `src/pages/`: product homepage, documentation, release notes, privacy, and support.
- `src/components/`: shared navigation, branding, footer, and interactive progress example.
- `src/styles.css`: responsive design, typography, themes, and page layouts.
- `src/content.css`: existing documentation and release styles carried forward during migration.
- Root HTML files: metadata and React entry points for each public URL.
- `assets/`: screenshots, vector logos, and the existing import/export ZIPs and CSVs.
- `tests/`: desktop and mobile browser checks.
- `src/workbench/`: local backup parsing, validation, edits and downloads.
- `src/content/updates/`: one Markdown file per app or website update; see
  [authoring and publishing notes](docs/UPDATES.md).
- `css/`, `js/`, and standalone logo concept HTML files: retained for the historical design explorations, not loaded by the new React pages.

Page copy belongs in the React components. SEO titles, descriptions, canonical links, and SwoLifts structured data belong in the corresponding root HTML entry. Keep `sitemap.xml` current when adding pages.

## Tests

```sh
npx playwright install chromium
npm run build
npm test
```

Tests exercise the production build at port 4173: all page routes, prerendering and hydration, internal links and fragment targets, images and ZIP downloads, mobile navigation and Escape handling, persistent themes, FAQ search, screenshot selection, sample chart controls, 320px layouts, and essential content without JavaScript. Screenshots are written to ignored `.qa/` for visual inspection. CI installs the same Chromium browser.

The catalog notice fixture is extracted from the Android Git blob at
`noticeCommit` / `noticePath` in `tests/fixtures/transfer-v1/source.json`.
When updating that pin, set `SWOLIFTS_ANDROID_REPO` to a local Android checkout
and run `npm run test:unit`; this compares the snapshot directly with `git show`
at the pinned commit. Public CI verifies the retained snapshot, LF bytes, hash,
three published notices and ZIP notices without private-repository access.

`npm run test:unit` runs the backup contract tests without a browser; `npm test`
runs those tests followed by the browser suite. Workbench browser tests cover
file opening, row errors, edits, ZIP/AI downloads, keyboard access, both themes,
320px layouts and the absence of file-bearing network requests.

## Local backup workbench

The Import & Export page reads ZIP/CSV files in browser memory. It has no upload
endpoint, file analytics, external scripts, persistent file storage or AI API.
The only workbench fetch loads the public bundled example. AI export creates a
local JSON download which the user can choose to share separately.

The supported Android import workflow restores an original SwoLifts ZIP.
Website edits and combined CSV files are analysis copies, not a supported
edit-and-reimport workflow or a converter for another app's workout history.

The archive reader uses pinned, BSD-licensed zip.js 2.24.0's native-stream entry
point with workers disabled and CRC checks enabled. It bounds compressed bytes,
actual decompressed bytes (including ignored entries), entry counts and CSV
dimensions. The supported path is a current browser with native compression
streams; Chromium is the automated browser target. Unknown columns and
non-data ZIP entries are preserved. Files in `examples/` remain examples.

The Android repository owns the transfer contract and five canonical ZIPs.
`tests/fixtures/transfer-v1/source.json` pins its commit and manifest SHA-256;
unit tests verify every fixture hash and both implementations' archive preview
accept/reject outcomes. It also records the reference exercise catalog source.
When the Android importer changes, update the pin, fixtures, browser validation
and tests together. Review [the implementation handoff](docs/WEB_WORKBENCH_01.md)
for the source link, limits, validation and remaining release gates.

File validation is conservative: malformed values block corrected downloads,
while device-dependent identity matches are warnings. The app remains the
authority on its existing database, ownership and merge history. The workbench
does not claim that a clean file guarantees an unchanged import on every device.

## GitHub Pages migration

The previous site published directly from the `master` branch root. React requires a build first. **Before merging this migration**, change GitHub repository **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Keep the existing `maxil.app` custom domain.

The website workflow validates pull requests. Pushes to `master` (or a manual workflow run on `master`) build, test, upload `dist`, and deploy it to the `github-pages` environment. The custom domain, search verification file, sitemap, robots file, existing downloads, and historical design exploration URLs are copied to the output. No Cloudflare DNS changes are needed for this migration.

For local development no hosting change is needed. Do not merge the React entry points while Pages still publishes the repository root: browsers cannot run the unbuilt JSX entry points directly.

## Repository and deployment security

This repository is public. Visitors can propose changes but cannot merge or
deploy them without write access. `master` requires a pull request, the current
GitHub Actions `build` check, and resolved review conversations. These rules
also apply to administrators; force pushes and deletion are blocked. Because
there is one maintainer, GitHub does not require a second account's approving
review. Independent review and the owner's manual production merge remain
release requirements.

All outside-contributor workflow runs require maintainer approval. Review the
entire proposed change, including scripts and dependencies, before allowing
execution. PR checks use isolated GitHub-hosted runners with a read-only token;
never attach this public repository to the personal development PC's runner.
Only the separate deployment job receives Pages write/OIDC permissions, and
the `github-pages` environment permits only the `master` branch.

Workflow actions are pinned to upstream commit SHAs. Repository settings
enforce SHA pins, and Dependabot security updates create reviewable PRs rather
than automatically merging fixes. Secret scanning and push protection remain
enabled. Keep account authentication and authorized tokens protected; these
controls do not prevent an administrator from changing the settings themselves.

See the [2026-10-19 hardening record](docs/WEBSITE_SECURITY_2026-10-19.md) for
applied settings, validation, and the pending production boundary.

## Branding and release notes

SwoLifts is the visitor-facing brand throughout the site. Maxil LLC remains identified only as the legal owner in copyright and privacy text. The domain and support email stay at maxil.app until a new domain is acquired. The old /swolifts.html URL remains functional with a canonical URL pointing to the homepage.

The SwoLifts SVG logo variants are vector traces of the supplied `blue_anime_face_swolifts_logo.png`, using brand blue `#0067E6`. The generated lettering is retained as artwork, not identified as a font. Barlow Condensed provides complementary product headings; Inter is used for readable UI and body text. Both fonts are bundled locally through Fontsource, without runtime Google Fonts requests. Their licenses ship with their npm packages.

Font license copies are included in `assets/fonts/`. To regenerate the social-sharing SVG and PNG after branding changes, run `node scripts/generate-social.mjs` (requires the Playwright Chromium installation).

The interactive chart uses fixed, explicitly labeled sample data; it does not read app workouts. Actual app screenshots remain clearly distinguished from the website demonstration.

The desktop download QR is a static SVG pointing directly to Google Play. If the listing URL changes, update `src/constants.js` and run `node scripts/generate-play-qr.mjs` to regenerate it. The QR generator is a development dependency and is not shipped to visitors.

The public **Updates** index separates versioned Android notes from dated website
notes, with one Markdown file and individual page per entry. `CHANGELOG.md`
retains the website development summary. Website changes do not change the
Android version, app package, or Google Play listing.
