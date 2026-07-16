# audit-prompt.md
### Prompt: evaluate an existing repository against accessibility.md

Paste the block below into your agent (Claude Code, Codex, or any runtime with repo access). It assumes accessibility.md is in the project root; adjust the path if not.

---

You are auditing this repository for WCAG 2.2 AA compliance. The rulebook is ./accessibility.md. Read it in full before examining any code. Audit only. Do not modify any file.

## Process

1. **Inventory.** List every page, route, template, and shared UI component. Note the framework and where global styles live. This inventory is the audit scope; nothing gets skipped silently.

2. **Static scan.** Check the source against every rule in accessibility.md. At minimum, search for these known failure signatures:
   - `div` or `span` with click handlers; missing native elements
   - Missing or empty `lang`, missing or duplicate `<title>`, absent `main` or skip link
   - Heading levels that skip, multiple `h1`s per page
   - `tabindex` greater than 0; `outline: none` or `outline: 0` without a replacement focus style
   - `img` without `alt`; icon buttons without accessible names
   - Inputs without associated labels; placeholder used as the only label; missing `autocomplete` on personal data fields
   - Color values in CSS and design tokens: compute contrast ratios for text and UI states, including hover, focus, error, and disabled
   - `user-scalable=no` or `maximum-scale` below 5; fixed heights on text containers
   - Custom widgets (dropdowns, tabs, modals, tooltips): compare against the WAI-ARIA pattern for role, states, and keyboard handling
   - Missing `aria-live` on toasts, validation messages, async updates
   - Autoplaying media; animations without `prefers-reduced-motion` handling
   - Interactive targets sized under 24x24 CSS pixels
   - Drag-only interactions with no single-pointer alternative
   - Auth flows that block paste or require transcription
   - Forms that re-ask for data already collected in the same flow

3. **Runtime scan, if the app can run.** Start the dev server, then run axe-core against every route (via Playwright or the project's existing test setup). Record every violation with the route it occurred on. If the app cannot run, say so and continue; do not fake results.

4. **Report.** Produce AUDIT.md at the repository root with this structure for every finding:

   - **ID**: A-001, A-002, ...
   - **Severity**: Blocker (prevents access for some users), Serious (major barrier), Moderate (friction), Minor (polish)
   - **WCAG criterion**: number and name, e.g. 2.5.8 Target Size (Minimum)
   - **Location**: file path and line number, or route for runtime findings
   - **Evidence**: the exact offending code or measured value (e.g. "contrast 2.9:1, needs 4.5:1")
   - **Fix**: the specific change, with corrected code where short

5. **Close the report with three sections:**
   - A severity-ordered remediation plan, grouping findings that share one root cause (e.g. a design token change that fixes twelve contrast failures counts as one work item)
   - A "needs manual check" list: everything this audit cannot verify from code alone, specifically the keyboard-only pass, screen reader behavior, and 400% zoom reflow, phrased as instructions a human can execute in under 30 minutes
   - A one-paragraph honest summary: is this repo close to compliant, structurally sound but unpolished, or built on patterns that need rework

## Rules

- Cite the accessibility.md rule or WCAG criterion for every finding. No vibes-based findings.
- Never guess a contrast ratio; compute it from the actual color values.
- If a pattern appears in a shared component, report it once at the component with a count of affected pages, not once per page.
- Uncertain findings get flagged as "possible" with what would confirm them. A gap is honest; an invented violation is not.
- Do not soften the summary. If the repo would fail an audit, say it fails and why.
