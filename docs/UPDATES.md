# App and website update notes

The Updates index stays at `/swolifts-release-history.html` so existing links
continue to work. It links to a separate HTML page for every update, rendered
from a Markdown file. The generated pages work on GitHub Pages, including
direct visits and browsers with JavaScript disabled.

## Authoring

- App notes: `src/content/updates/app/1.1.1.md`, named for the Android version.
- Website notes: `src/content/updates/website/YYYY-MM-DD.md`, named for the
  actual publication date. Website updates do not need app version numbers.
- Upcoming website notes: `src/content/updates/website/unreleased.md` until
  publication. Do not invent a release date for a development preview.

Each file starts with JSON metadata between `---` lines, followed by Markdown:

```markdown
---
{
  "title": "A fresh look for SwoLifts",
  "summary": "A short description for the Updates index.",
  "status": "unreleased",
  "date": null
}
---

## What changed

- Describe a user-facing improvement.
```

At publication, rename the website file to the confirmed date, set `status`
to `published` and `date` to `YYYY-MM-DD`. An entry appears automatically in
the index, receives its own title/description/canonical link, and is rendered
as `/updates/website-YYYY-MM-DD.html`. Published notes enter the generated
sitemap; unreleased previews use `noindex` and stay out of it.

Android entries use `/updates/app-VERSION.html`. The historical initial
Android release has no recorded date; preserve that unknown date rather than
guessing. App 1.2.0 notes must wait for its confirmed release status.

Markdown is reviewed repository content, rendered with pinned Marked. User
backup files never enter this renderer. This is not a runtime content editor;
do not pass untrusted file contents or URLs to it.

## Validation and publishing

Run `npm run build` and `npm test`. The Vite dev server supports the same
individual update URLs at `http://127.0.0.1:5173`.

Keep `CHANGELOG.md` for the website's development change summary. Public
website notes describe deployed improvements, including branding changes;
Android notes describe Android releases. Follow the existing owner approval
and Android/website coordination gates before merging or deploying production.
