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
- `css/`, `js/`, and standalone logo concept HTML files: retained for the historical design explorations, not loaded by the new React pages.

Page copy belongs in the React components. SEO titles, descriptions, canonical links, and SwoLifts structured data belong in the corresponding root HTML entry. Keep `sitemap.xml` current when adding pages.

## Tests

```sh
npx playwright install chromium
npm run build
npm test
```

Tests exercise the production build at port 4173: all page routes, prerendering and hydration, internal links and fragment targets, images and ZIP downloads, mobile navigation and Escape handling, persistent themes, FAQ search, screenshot selection, sample chart controls, 320px layouts, and essential content without JavaScript. Screenshots are written to ignored `.qa/` for visual inspection. CI installs the same Chromium browser.

## GitHub Pages migration

The previous site published directly from the `master` branch root. React requires a build first. **Before merging this migration**, change GitHub repository **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Keep the existing `maxil.app` custom domain.

The website workflow validates pull requests. Pushes to `master` (or a manual workflow run on `master`) build, test, upload `dist`, and deploy it to the `github-pages` environment. The custom domain, search verification file, sitemap, robots file, existing downloads, and historical design exploration URLs are copied to the output. No Cloudflare DNS changes are needed for this migration.

For local development no hosting change is needed. Do not merge the React entry points while Pages still publishes the repository root: browsers cannot run the unbuilt JSX entry points directly.

## Branding and release notes

SwoLifts is the visitor-facing brand throughout the site. Maxil LLC remains identified only as the legal owner in copyright and privacy text. The domain and support email stay at maxil.app until a new domain is acquired. The old /swolifts.html URL remains functional with a canonical URL pointing to the homepage.

The SwoLifts SVG logo variants are vector traces of the supplied `blue_anime_face_swolifts_logo.png`, using brand blue `#0067E6`. The generated lettering is retained as artwork, not identified as a font. Barlow Condensed provides complementary product headings; Inter is used for readable UI and body text. Both fonts are bundled locally through Fontsource, without runtime Google Fonts requests. Their licenses ship with their npm packages.

Font license copies are included in `assets/fonts/`. To regenerate the social-sharing SVG and PNG after branding changes, run `node scripts/generate-social.mjs` (requires the Playwright Chromium installation).

The interactive chart uses fixed, explicitly labeled sample data; it does not read app workouts. Actual app screenshots remain clearly distinguished from the website demonstration.

The desktop download QR is a static SVG pointing directly to Google Play. If the listing URL changes, update `src/constants.js` and run `node scripts/generate-play-qr.mjs` to regenerate it. The QR generator is a development dependency and is not shipped to visitors.

The public **Android release history** remains specific to SwoLifts app versions. Website changes go in `CHANGELOG.md` and Git history. This website migration does not change the Android version, app package, or Google Play listing.
