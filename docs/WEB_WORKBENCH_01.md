# WEB-WORKBENCH-01: offline file workbench

- Tracking: [website #54](https://github.com/maxilmarcus/maxil-website/issues/54).
- Release: [SwoLifts #497 / RELEASE-120-01](https://github.com/maxilmarcus/SwoLifts/issues/497).
- Android transfer: [#502 / TRANSFER-APP-01](https://github.com/maxilmarcus/SwoLifts/pull/502).
- Required review: Claude; Data, Security/Privacy, Product/UX and Accessibility.
- Status: local validation passed; awaiting hosted-PR CI authorization and Claude review.

## Contract and behavior

Android source is pinned to `24565afcc0be67ca8b5f3fbafd3c319746095b68`:
[transfer contract](https://github.com/maxilmarcus/SwoLifts/blob/24565afcc0be67ca8b5f3fbafd3c319746095b68/docs/engineering/OFFLINE_BACKUP_TRANSFER.md),
[importer](https://github.com/maxilmarcus/SwoLifts/blob/24565afcc0be67ca8b5f3fbafd3c319746095b68/app/src/main/java/com/swolifts/app/data/export/DataExportImportManager.kt),
and [canonical fixtures](https://github.com/maxilmarcus/SwoLifts/tree/24565afcc0be67ca8b5f3fbafd3c319746095b68/app/src/androidTest/assets/transfer-v1).
Local fixture hashes and the exercise reference source hash are recorded in
[`source.json`](../tests/fixtures/transfer-v1/source.json).

| Limit | Value |
|---|---|
| Compressed input / expanded ZIP data | 32 MiB / 64 MiB |
| ZIP entries, including ignored entries | 128 |
| Data CSV rows / columns / total cells | 100,000 / 64 / 1,000,000 |
| Characters per cell | 65,536 |

The workbench checks required columns, scalar ranges, canonical UTC dates,
identity references available in the file, and known duplicate/deletion/merge
hazards. It does not have access to the receiving app's database. Missing
device-only exercises and existing-state effects are warnings; invalid values
are errors so a user does not unknowingly download values the app will discard.
The date checker requires the documented complete UTC form, even where the Java
date parser may tolerate trailing text or non-padded components. Date fixes only
normalize real ISO values with an explicit zone, or date-only values to midnight
UTC. Ambiguous locale dates are left for the user.

Editing kilograms updates the rounded pounds pair; editing pounds clears stale
exact kilograms. Unknown columns, multiline notes, IDs, tombstones and unrelated
ZIP entries survive export. Bulk trim changes known scalar fields, preserving
notes, descriptions and unknown values. Mapping names also updates an existing
UUID column. Only a unique included reference/custom exercise can be selected.

The table displays 20 rows at a time. Downloading creates a new file; the browser
never overwrites the original. Edits are in React memory only. Reload/close loses
them. Replacing/clearing a modified file requires confirmation. There is no
automatic AI call: the AI download is readable JSON with units, tables and file
warnings, plus an explicit user privacy note.

## Dependencies and transfer instructions

zip.js is pinned to 2.24.0 and its BSD license is shipped at
[`assets/licenses/zip-js.txt`](../assets/licenses/zip-js.txt).
[Official API](https://gildas-lormeau.github.io/zip.js/api/classes/ZipReader.html)
documents the reader; the native-stream module avoids worker/WASM network loads.
CRC checks and actual expanded-byte accounting are enabled before CSV parsing.
Path traversal and encrypted archives are rejected.

Quick Share instructions link to Google's
[Windows download](https://www.android.com/quick-share/with-windows-pc/) and
[transfer help](https://support.google.com/android/answer/13801258?hl=en).
Current transfer pictures are synthetic emulator screenshots from Android #502.
They show SwoLifts' share and import screens; they are not proof of Windows radio
delivery. Real Windows Quick Share setup screenshots and a phone/PC round trip
remain owner-assisted acceptance work. USB/file-picker instructions are retained.

## Validation

Node 24.22.0 / Chromium 156.0.8078.4, 2026-10-17:

- `npm run build`: passed; all eight routes prerendered.
- `npm test -- --output=.qa/workbench-final-results`: 22 unit and 46 browser tests
  passed, zero failures. Desktop and mobile cover the shared fixture flows.
- Primary buttons and error text meet 4.5:1 contrast in both themes; keyboard
  opening, post-load summary focus and row-error focus pass. Narrow pages fit
  320px; the editable table scrolls horizontally.
- Network assertions permit only same-origin static font GETs with no body or
  query. No workout data requests, socket, worker, executable cell markup or
  file-content storage was observed during editing and AI export.
- The first browser run exposed a React focus timing defect, fixed by focusing
  after rendering. Test sequencing now waits for parsing, and the privacy test
  correctly permits a lazily loaded local font. The final full suite passes.
- [Validation hashes](workbench-2026-10-17/validation.json) identify retained logs
  and the synthetic screenshots below. Preview port 4173 and browser processes
  are stopped. Node/npm/browser dependency caches remain for useful reuse.

| Desktop editing | Mobile editing |
|---|---|
| ![Corrected exact kilogram and pounds pair](workbench-2026-10-17/desktop-workbench-edited.png) | ![Mobile workbench summary and CSV selector](workbench-2026-10-17/mobile-workbench-edited.png) |

| 320px light | 320px dark |
|---|---|
| ![Workbench opening controls in light theme](workbench-2026-10-17/desktop-workbench-320-light.png) | ![Workbench opening controls in dark theme](workbench-2026-10-17/desktop-workbench-320-dark.png) |

The unit suite covers the five shared Android ZIPs and hashes, exact weights,
BOM/wrappers, multiline notes, unknown columns, first duplicate behavior, error
rows, date fixes, references, deletion/merge warnings, AI output, CRC corruption,
unsafe/encrypted archives and size/dimension limits. The bundled blank/example
ZIPs also pass the same file checks.

Cleanup exception: automatic approval rejected the command containing removal
of the initial `test-results/` directory and returned no detailed reason. Its
6,081,488 bytes of failure diagnostics are retained, with a verified compact
archive at `.qa/workbench-first-browser-findings.zip`. Remove the initial traces
after review when the cleanup policy permits; no process is using them. The
passing run used a separate output directory. Compact logs and duplicate raw
screenshots in `.qa/` remain until review reconciles the committed evidence;
remove those redundant copies at that point. `dist/` remains the validated
candidate for review and should be replaced by the next changed-source build.

## Remaining release gates

- Claude review of this branch and Android #501/#502.
- Website PR CI requires owner authorization to start GitHub-hosted runners;
  its existing workflow runs on PRs to `master` and deploys only after a production
  merge. A draft PR also starts the hosted build. Local checks do not waive it.
- After branding #501 merges, replace all required app guide/home screenshots,
  including these transfer captures, from the integrated release candidate.
- Reconcile version references with the eventual 1.2.0 release record; this work
  does not publish release notes or change the live app version claim.
- The exercise-library update #279 waits on the owner's file. The bundled 379-row
  reference is the pinned current catalog, not the future catalog.
- Extra UX choices in #500 remain a separate owner decision. No new Workbench
  navigation item or Android layout changes are implied by this implementation.
- Production website merge/deployment waits for separate owner approval after
  the app is live. No deployment or Play upload has occurred.
