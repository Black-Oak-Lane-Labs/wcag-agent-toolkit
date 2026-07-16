# accessibility.md
### WCAG 2.2 AA rules for coding agents

This file is the canonical accessibility spec for this project. It is referenced from CLAUDE.md and AGENTS.md; edit here, never in the pointer files.

Scope: every page, component, and state you generate. Target is WCAG 2.2 Level AA. If a design request conflicts with any rule below, flag it and propose an accessible alternative before building. Never silently ship the violation.

## Structure

- Write semantic HTML first. Use native elements (`button`, `a`, `nav`, `main`, `header`, `footer`, `ul`, `table`, `dialog`, `details`) before reaching for `div` + ARIA. A `div` with a click handler is a defect.
- One `h1` per page. Heading levels descend without skipping.
- Set `lang` on `<html>`. Give every page a unique, descriptive `<title>`.
- Wrap primary content in `main`. Make a skip link the first focusable element.

## Keyboard

- Every interactive element is reachable and operable by keyboard alone (Tab, Shift+Tab, Enter, Space, arrow keys where the pattern requires them).
- Focus order matches visual and logical order. Never use `tabindex` greater than 0.
- Visible focus indicator on everything focusable: at least a 2px outline with 3:1 contrast against adjacent colors. Never `outline: none` without an equal or better replacement.
- A focused element is never fully hidden behind sticky headers, footers, or overlays (2.4.11).
- Modals trap focus while open, close on Escape, return focus to the trigger on close, and set everything behind them `inert`.

## Pointer and targets

- Interactive targets are at least 24x24 CSS pixels, or have equivalent spacing from neighbors (2.5.8). Prefer 44x44 for primary actions.
- Any drag interaction (sliders, reordering, swipe) has a single-pointer alternative such as buttons or click-to-select then click-to-place (2.5.7).

## Color and contrast

- Text contrast: 4.5:1 minimum; 3:1 for text 24px+ or 18.66px+ bold.
- UI component boundaries and meaningful graphics: 3:1 against adjacent colors. This includes focus, hover, and error states.
- Never convey information by color alone. Pair color with text, an icon, or a pattern.

## Images, media, and motion

- Every `img` has `alt`. Meaningful images: describe content or function. Decorative images: `alt=""`.
- Video gets captions. Audio gets a transcript. Nothing autoplays with sound.
- Any animation longer than 5 seconds has a pause or stop control. Honor `prefers-reduced-motion` by disabling or reducing all nonessential motion. Nothing flashes more than 3 times per second.

## Forms

- Every input has a visible label programmatically associated via `label for`/`id`. A placeholder is not a label.
- Use `autocomplete` attributes on fields collecting personal data (name, email, tel, address, cc fields).
- Errors: name the field in text, say how to fix it, connect the message with `aria-describedby`, set `aria-invalid`. Never color-only error states.
- Never ask the user to re-enter information already provided in the same process; auto-populate it or let them select it (3.3.7).
- Authentication never requires a cognitive test: allow paste, support password managers, and offer an alternative like email link or OAuth instead of transcribing codes or solving puzzles (3.3.8).
- Legal or financial submissions are reversible, reviewable before submit, or confirmable.

## Dynamic content and ARIA

- Use ARIA only when no native element does the job. When you do build a custom widget, follow the WAI-ARIA Authoring Practices pattern for that widget exactly: role, states, and keyboard behavior.
- Reflect state in attributes and keep them updated in JS: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`.
- Announce async updates with `aria-live="polite"` (reserve `assertive` for urgent). Toasts, validation results, cart changes, and loading completion all announce.
- Content revealed on hover or focus is dismissible with Escape, hoverable itself, and persistent until dismissed.

## Layout and reflow

- The page works at 320px width and 400% zoom with no horizontal scrolling and no lost content or function.
- Text spacing can be increased by the user without clipping. No fixed heights on containers that hold text.
- Support both orientations. Never set `user-scalable=no` or a `maximum-scale` below 5.

## Consistency

- Navigation, component behavior, and icon meaning stay consistent across pages.
- Help mechanisms (contact link, chat, FAQ) appear in the same relative location on every page that has them (3.2.6).
- Link text makes sense out of context. No bare "click here" or "learn more."

## Verify before declaring done

Run all five. Failing any one means the task is not complete.

1. axe-core (or Lighthouse accessibility) reports zero violations.
2. Keyboard-only pass: reach and operate everything, focus always visible, no traps, logical order.
3. Contrast check on all text and UI states, including hover, focus, and disabled.
4. Zoom to 400% and resize to 320px: nothing clipped, overlapped, or unreachable.
5. Screen reader smoke test where available: landmarks present, headings sensible, every control labeled, live regions announce.

Automated scanners catch roughly a third of real issues. Steps 2 through 5 are mandatory, not optional polish.
