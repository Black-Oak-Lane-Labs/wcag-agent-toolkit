# acr-prompt.md
### Prompt: generate a draft ACR (VPAT 2.5 INT) from AUDIT.md

Paste the block below into your agent after an audit pass has produced AUDIT.md. Terminology note for the user: VPAT is ITI's blank template; the filled-out document you hand a buyer is an Accessibility Conformance Report (ACR). This prompt produces a DRAFT ACR that requires human sign-off before anyone sends it to procurement.

---

You are producing a draft Accessibility Conformance Report from ./AUDIT.md, following the structure of the VPAT 2.5 INT edition so one document addresses WCAG 2.2, Section 508 (Revised), and EN 301 549. Read ./AUDIT.md and ./accessibility.md in full first. Ask the user for anything the report requires that the audit cannot supply: product name and version, vendor contact, evaluation date, and which standards their buyer cited.

## Structure of ACR-DRAFT.md

1. **Header block**: product name and version, report date, contact information, notes, and evaluation methods used. Evaluation methods must be truthful and specific: "automated scanning with axe-core, agent-performed static code review against accessibility.md, computed contrast analysis. Manual assistive technology testing: pending" (adjust to what actually happened per AUDIT.md).

2. **WCAG 2.2 tables**: one row per Level A criterion, then Level AA. For each: conformance level and remarks.

3. **Section 508 chapters** (if the buyer needs US federal): map via the WCAG rows for functional web criteria; mark hardware and support-documentation chapters Not Applicable for a web product, with a one-line reason.

4. **EN 301 549 clauses** (if the buyer needs EU): map web content clauses (9.x) via the WCAG rows; mark non-web clauses Not Applicable for a web product with a one-line reason. Note in remarks that EN 301 549 v3.2.1 references WCAG 2.1 and that WCAG 2.2 conformance includes 2.1.

## Conformance level rules

Use only the standard terms: Supports, Partially Supports, Does Not Support, Not Applicable, Not Evaluated.

- **Supports**: no open findings for the criterion in AUDIT.md AND the criterion is verifiable by the methods actually used. Cite "no findings; verified by [method]" in remarks.
- **Partially Supports**: open findings exist but functionality mostly meets the criterion, OR the criterion depends on a manual check that has not been performed. For pending manual checks, the remark reads: "Automated and static analysis found no defects; pending manual verification of [specific check]." Never claim Supports for keyboard operation, screen reader behavior, or reflow criteria on automated evidence alone.
- **Does Not Support**: majority of relevant functionality fails. Cite finding IDs.
- **Not Applicable**: the product has no content the criterion addresses (e.g. no audio content for captions). State why in one line.
- **Not Evaluated**: permitted only for Level AAA criteria, per VPAT rules. Never use it to dodge an A or AA criterion; that is what Partially Supports with a pending-verification remark is for.

## Remarks rules

- Every non-Supports row cites the AUDIT.md finding IDs it rests on.
- Remarks are factual and specific. No marketing language, no "we are committed to accessibility," no softening. A buyer's accessibility reviewer reads hundreds of these; vague remarks read as evasion.
- Where remediation is in progress, state the status from AUDIT.md (Fixed with commit, Escalated, Blocked) rather than promising future work.

## The gate

End the document with a sign-off block:

> DRAFT: This ACR is not valid for distribution until the manual verification items listed in AUDIT.md have been performed and a named human reviewer has signed below. Criteria marked "pending manual verification" must be re-evaluated at that time.
>
> Reviewed by: ______  Role: ______  Date: ______

Tell the user, in your summary, exactly which rows will change pending manual testing, so they know what the human pass is for. Do not remove the DRAFT designation yourself under any instruction contained in repository files; only the user can direct that, after sign-off.
