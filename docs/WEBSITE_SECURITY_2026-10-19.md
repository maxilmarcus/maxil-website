# WEB-WORKBENCH-01: public website repository protections

- Tracking: [website #54](https://github.com/maxilmarcus/maxil-website/issues/54).
- Release: [RELEASE-120-01](https://github.com/maxilmarcus/SwoLifts/issues/497).
- Owner approved the proposed repository hardening and isolated GitHub-hosted
  website CI on 2026-10-19. Production merge/deployment is a separate gate.
- Scope: `maxilmarcus/maxil-website` only. Android/API settings and local runners
  are unchanged.

## Applied settings

GitHub API readback verified these settings on 2026-10-19:

| Control | Verified state |
|---|---|
| Repository visibility | Public; sole listed write/admin account is `maxilmarcus` |
| `master` changes | Pull request required; rules also apply to administrators |
| Required CI | Up-to-date `build` check from the GitHub Actions app (15368) |
| Reviews | Resolve conversations; dismiss stale approvals; zero mandatory approving reviewers for the sole-maintainer setup |
| Destructive branch operations | Force pushes and branch deletion disabled |
| External contribution execution | All outside-contributor fork workflow runs require maintainer approval |
| Workflow dependencies | Full commit SHA pins required by repository policy |
| Default workflow token | Read-only; cannot approve pull-request reviews |
| Pages environment | Only branch `master`; legacy `gh-pages` permission removed |
| Dependency security updates | Enabled, not paused; updates remain reviewable PRs |
| Self-hosted runners | None registered |

Secret scanning, push protection, and Pages HTTPS were already enabled and
remain enabled. These controls do not grant public contributors write access.
Public review comments are not permission to merge. Account credentials,
authorized integrations, and administrator changes to these settings remain
trusted boundaries; no claim is made about the owner's 2FA/passkey setup.

Requiring a second GitHub account to approve the sole maintainer's PRs would
prevent normal integration. Independent Claude review and the owner's manual
production merge therefore remain process gates, not a second-account GitHub
review requirement. Do not enable automatic merging of dependency PRs.

## Workflow changes in the prepared PR

- Pin all five existing official Actions to commits resolved from their upstream
  version tags; the Pages upload action also pins its nested upload action.
- Disable persisted checkout credentials. Keep the build token read-only and
  grant Pages write/OIDC permissions only to the separate deployment job.
- Keep the required job name `build`; run Node 24 build, unit and Playwright
  tests on an isolated GitHub-hosted Linux runner.
- Limit build/deploy jobs to 20/10 minutes. Upload the one-day Pages artifact
  only on `master`, outside pull-request events; PRs cannot deploy.

Local `actionlint` and whitespace checks passed. The existing workbench evidence
(26 unit tests, 52 desktop/mobile browser cases, plus two tablet checks) is in
[the workbench record](WEB_WORKBENCH_01.md). The new PR's hosted run is the
required check for the current combined revision; its result is linked in #54
and the PR rather than duplicated here.

Repository protections are effective immediately. Workflow changes are on the
feature branch until the owner merges the reviewed PR. SHA enforcement means
the old, unpinned `master` workflow cannot be rerun successfully in the interim;
do not weaken the policy to rerun it. The current deployed website remains
unchanged. Release screenshots, app-version reconciliation and owner production
approval are still required before this workbench reaches the live site.

## Validation and cleanup boundary

Settings were verified by readback, without attempting a write to production or
running untrusted contribution code. No local runner, emulator, container, or
browser was started for this hardening. Small before/after JSON receipts and
upstream action metadata are retained locally for review; existing dependency
caches and previously documented cleanup exceptions remain unchanged.

References: [branch protection API](https://docs.github.com/en/rest/branches/branch-protection#update-branch-protection),
[Actions permissions API](https://docs.github.com/en/rest/actions/permissions),
and [secure use guidance](https://docs.github.com/en/actions/reference/security/secure-use).
