# remediation-prompt.md
### Prompt: execute the remediation plan from AUDIT.md

Paste the block below into your agent after the audit pass has produced AUDIT.md. It assumes accessibility.md and AUDIT.md are in the project root, and that the repo is under version control. If there are uncommitted changes, stop and tell the user before starting.

---

You are remediating the accessibility findings in ./AUDIT.md. The rulebook is ./accessibility.md. Read both in full before changing anything. Work one severity tier at a time: all Blockers, then Serious, then Moderate, then Minor. Never mix tiers in one pass.

## Process per tier

1. **Plan.** List the findings in this tier, grouped by root cause as AUDIT.md grouped them. State the order you will fix them and why. One shared component or design token fix that clears many findings goes first.

2. **Fix one group at a time.**
   - Make the minimal change that satisfies the cited rule. Do not refactor surrounding code, rename things, or improve unrelated patterns you happen to notice. If you spot a new accessibility issue the audit missed, add it to AUDIT.md as a new finding in the right tier; do not fix it out of order.
   - Match the existing code style of the file you are in.
   - Fix at the source: the shared component, the design token, the base style. Never patch the same defect page by page when one upstream change covers it.

3. **Verify each group before moving on.** Re-check the specific rule: recompute the contrast ratio, confirm the label association, tab through the fixed widget's keyboard handling in the running app if it runs. A fix is not done because the code changed; it is done because the check now passes.

4. **Commit per group.** Message format: `a11y: <what> (<finding IDs>, WCAG <criterion>)`. Example: `a11y: replace div click handlers with buttons (A-003, A-007, WCAG 4.1.2)`. Small, revertable commits; never one giant commit per tier.

5. **Close the tier.** Re-run the audit process from audit-prompt.md scoped to this tier's findings plus a regression check on everything previously marked fixed. Update each finding's status in AUDIT.md: Fixed (with commit hash), Escalated, or Blocked. Report the tier summary to the user and stop for confirmation before starting the next tier.

## Escalate, don't decide

Some fixes are design decisions, not code corrections. Stop and ask the user instead of choosing for them when a fix would:

- Change brand colors, logos, or typography to meet contrast (propose the nearest compliant values, but the user picks)
- Remove or visibly restructure a feature (e.g. a drag-only interaction with no obvious alternative)
- Alter copy, legal text, or form flow in ways the business might care about
- Require a dependency upgrade or swap (e.g. an inaccessible third-party component library)

Log these in AUDIT.md as Escalated with your recommended option, and continue with the rest of the tier. Never let one escalation stall the whole pass.

## Rules

- AUDIT.md is the single source of truth. Every status change happens there, in the same pass as the fix.
- The "needs manual check" list stays untouched. You cannot clear those items; remind the user they remain open at the end of every tier.
- If a fix breaks a test or a build, fixing that breakage is in scope. Anything else is not.
- If AUDIT.md is missing, stale, or contradicts the code, stop and say so. Do not remediate against a report you do not trust.
- Done means: every finding is Fixed, Escalated, or Blocked with a reason; the re-audit found no regressions; and the user has the manual-check list one more time.
