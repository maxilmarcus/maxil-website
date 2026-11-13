# RELEASE-130-01: website coordination

Android tracker: https://github.com/maxilmarcus/SwoLifts/issues/538 (private).
Scope: publish the Android 1.3.0 update page with existing, approved native
screenshots, explicit app locations and current app metadata. No application,
catalog or workbench implementation changes.

Android 1.3.0 (version code 6) is available on Google Play. The production
console showed it released on November 11, 2026, after the owner merged the
Android production PR. The website note now uses that release date and
`published` status; it is indexable and included in the sitemap. Homepage and
structured app metadata identify 1.3.0, and current guide copy no longer claims
that 1.2.0 is still rolling out. Website publication awaits the owner's merge
of PR #61 and the subsequent Pages deployment.

The four screenshots each have a visible location caption:

- Progress → Muscles: primary-muscle volume map and selected reading.
- Progress → Volume: weekly lifting-volume chart and selected total.
- History: workout search and the Your consistency calendar.
- History → completed workout, or View Summary after finishing: comparison
  with an earlier comparable workout.

Publication sequence:

1. Confirm Android production merge, signed artifact and Play availability (done).
2. Set the note's actual release date/status and rollout wording. Update the
   current app metadata/feature copy to match that verified rollout (done).
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
