# RELEASE-130-01: website coordination

Android tracker: https://github.com/maxilmarcus/SwoLifts/issues/538 (private).
Scope: prepare the Android 1.3.0 update page with existing, approved native
screenshots. No application/catalog/workbench implementation changes.

The note is deliberately `unreleased` with a null date. The existing renderer
labels it as a preview, adds `noindex`, and omits it from the sitemap. Current
homepage and structured app metadata stay at 1.2.0. This PR must not be merged
or deployed as an available release before the Play rollout is verified.

Publication sequence:

1. Confirm Android production merge, signed artifact and Play availability.
2. Set the note's actual release date/status and rollout wording. Update the
   current app metadata/feature copy to match that verified rollout.
3. Run website build, unit/browser and development tests; obtain review.
4. Owner performs the production merge after deployment approval.
5. Verify the live note, screenshots, sitemap and metadata.

The four PNGs are unedited native Compose captures using entirely synthetic
data from Android feature head `09ec8ab685c9e0d9cb715e3e1b11d3f1baf70f55`.
The review-correction capture archive was checksum/readback verified. The later
personal-record date fix does not change these four views. See
`assets/updates/app-1.3.0/provenance.json` for per-image hashes. No owner workout
history, device identifiers or private screenshots are included.

The separate workbench-hiding PR #60 remains independent. Its checkout and
owner preview are preserved; this PR branches from production master and does
not deploy or override #60.
