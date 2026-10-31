# Website changes

This log covers maxil.app development. Public website updates are dated Markdown
entries, separate from versioned Android notes; see [authoring updates](docs/UPDATES.md).

## Unreleased

- Add an on-device backup workbench to Import & Export: local ZIP/CSV checks,
  inspection, separate analysis copies and AI-readable JSON downloads. Restore
  original SwoLifts ZIPs in Android; do not promote an edit-and-reimport workflow.
- Add an Updates index with individual Markdown pages for app and website notes.
  Preview the website redesign, including its new logo, as Unreleased until publication.
- Simplify navigation with one Workbench link and a direct Guides link.
- Add current app screenshots beside guide steps, with larger image viewing,
  updated homepage captures and illustrated backup/restore instructions.
- Apply the selected theme before the main styles load, preventing white
  flashes during dark-mode navigation and reloads, including update pages.
- Document Quick Share and USB transfer, preserve the manual guide, and refresh
  templates with exact kilograms, Excel BOM support and exercise references.
- Explain browser-memory processing and file privacy in the privacy policy.
- Highlight on-device workout data and link to the privacy policy in the homepage benefits.
- Add an accessible screenshot viewer with gallery controls and full-size image links.
- Add a desktop QR code linking directly to Google Play; keep free core features beside the download button.
- Match the browser-tab icon to the selected theme, including saved dark-mode preferences.
- Improve dark-mode logo contrast with a white wordmark and a soft-white background inside the blue face.
- Migrate all seven public pages to React, with Vite builds and prerendered HTML at the existing URLs.
- Make SwoLifts the primary brand and homepage, with Maxil LLC only in legal ownership text; redesign the product experience for mobile and desktop.
- Add the supplied SwoLifts logo as scalable vector artwork, brand blue, and locally bundled typography.
- Add an interactive screenshot explorer and clearly labeled sample progress chart.
- Add searchable FAQs, accessible navigation, persistent light/dark themes, and a custom 404 page.
- Preserve app release notes, guide content, privacy policy text, metadata, screenshots, and import/export downloads.
- Add browser checks and a GitHub Actions build/test/deployment workflow.
