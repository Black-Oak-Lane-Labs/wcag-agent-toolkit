# WCAG agent toolkit
### Make vibe-coded output accessible by default, provable on demand

Version 1.0 (July 2026). A toolkit for anyone building with coding agents (Claude Code, Codex, Cursor, OpenClaw, and similar) who wants the output to meet WCAG 2.2 AA without becoming an accessibility specialist first.

Published by Black Oak Lane Labs.

## The idea

Most accessibility advice tells you what compliant looks like. This toolkit is the working infrastructure: rules your agent follows while building, a prompt that audits what already exists, a prompt that fixes it in order, a pipeline gate that refuses violations, and a draft conformance report a buyer can read. Copy the files, wire the pointers, done.

The lifecycle:

```
Build  (accessibility.md + output-accessibility.md, via pointer snippets)
Audit  (prompts/audit-prompt.md → AUDIT.md)
Fix    (prompts/remediation-prompt.md, tier by tier)
Enforce (ci/ → GitHub Actions gate on every pull request)
Report (prompts/acr-prompt.md → draft ACR on the VPAT 2.5 INT structure)
```

## What's in the box

| File | What it does |
|---|---|
| accessibility.md | Canonical WCAG 2.2 AA rules for webpages, plus a five-check verification gate |
| output-accessibility.md | Rules for everything else an agent produces: PDF, docx, pptx, xlsx, email, markdown, images |
| claude-md-snippet.md | Pointer block to merge into CLAUDE.md (Claude Code) |
| agents-md-snippet.md | Pointer block to merge into AGENTS.md (Codex, OpenClaw, Cursor, Windsurf) |
| prompts/audit-prompt.md | Audits an existing repository, produces evidence-based AUDIT.md |
| prompts/remediation-prompt.md | Executes AUDIT.md fixes by severity tier, escalates design decisions |
| prompts/acr-prompt.md | Generates a draft Accessibility Conformance Report from AUDIT.md |
| ci/a11y.yml | GitHub Actions workflow: axe-core scan plus accessibility lint, fails on violations |
| ci/axe-scan.mjs | The scan script the workflow runs |
| ci/ci-setup.md | Plain-language setup guide, written for GitHub beginners, ends with branch protection |

## Quick start

1. Copy `accessibility.md` and `output-accessibility.md` into your project root.
2. Merge the snippet for your agent into your existing CLAUDE.md or AGENTS.md (the snippets say exactly how; note for OpenClaw users: this goes in AGENTS.md, not SOUL.md, because these are operating rules, not personality).
3. New project: start building; the rules apply from the first component. Existing project: run `prompts/audit-prompt.md`, then `prompts/remediation-prompt.md`.
4. Follow `ci/ci-setup.md` to make the check a merge requirement. This is the step that turns the whole thing from advice into enforcement.
5. When a buyer or client asks for documentation, run `prompts/acr-prompt.md`.

## What this deliberately does not do

Honesty is a feature of this toolkit, so here is the boundary. No automated system replaces manual assistive technology testing; every audit and every draft ACR in this toolkit carries the human verification items forward instead of pretending they cleared. Native mobile apps are out of scope (different specification). Governance (ownership, SLAs, defect routing, legal posture) is organization-specific by nature and no template does it honestly. If you need those layers designed, that is consulting work, and it should be.

## Standards note

The build target is WCAG 2.2 Level AA. Content conforming to 2.2 also conforms to 2.1 and 2.0, which covers current legal baselines (ADA Title II's WCAG 2.1 AA rule, EN 301 549 v3.2.1's WCAG 2.1 reference) while positioning you for the EN 301 549 update that references WCAG 2.2. Nothing in this toolkit is legal advice; the ACR prompt produces a draft that requires human sign-off before distribution.

## License

MIT. Free to use, adapt, and redistribute, including commercially, with attribution preserved through the copyright notice. Provided as is, without warranty of any kind; see LICENSE. Accessibility work affects real people's access to the web, so if you improve these files, consider sharing the improvement back. We're all better off when this knowledge travels.

Nothing in this toolkit is legal advice, and using it does not by itself make any product compliant with any law. It makes the engineering layer honest and repeatable; the rest is on all of us.
