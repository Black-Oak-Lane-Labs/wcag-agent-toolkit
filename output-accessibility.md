# output-accessibility.md
### Accessibility rules for every non-webpage output

This file is the companion to accessibility.md. Routing rule: if you are producing a webpage, web app, or web component, follow ./accessibility.md. If you are producing any other artifact, find your output type below and follow that section plus the universal rules. If your output type is not listed, apply the universal rules and say which specific checks you could not perform.

## Universal rules (every output type)

- Structure is real, not visual. Headings are actual heading styles or tags, never bold text pretending. Lists are actual list structures. Tables are for data, never for layout.
- Heading levels descend without skipping. One top-level heading per document.
- Every image, chart, and diagram has alt text describing content or function. Purely decorative images are marked decorative.
- Link text describes the destination. No bare URLs in body text, no "click here."
- Color never carries meaning alone. Charts pair color with labels, patterns, or direct annotation.
- Text contrast meets 4.5:1 against its background, including text inside charts and graphics.
- Plain language: define acronyms on first use, keep sentences direct.
- Document language is set in the file's properties or metadata.

## PDF

- Produce tagged PDF. Untagged PDF output is a defect, not a style choice.
- Set the document title and language in metadata; configure the file to display the title, not the filename.
- Reading order in the tag tree matches the logical reading order, especially with multi-column layouts, sidebars, or callouts.
- Data tables carry header cell tags. Complex tables get scope or ID/headers associations.
- Form fields (if any) have tooltips/labels and a logical tab order.
- Verify: run the available accessibility checker (e.g. veraPDF for PDF/UA, or the authoring tool's checker) and report the result. If you cannot produce a tagged PDF in the current environment, say so explicitly rather than shipping an untagged file silently.

## Word documents (docx)

- Build on built-in heading styles (Heading 1, 2, 3), never manually enlarged bold text.
- Use real bulleted and numbered list styles.
- Tables: mark the header row as a repeating header; no merged cells in data tables; add table alt text where the format supports it.
- Alt text on every image and shape; mark decorative elements decorative.
- Meaningful hyperlink text, document title in properties, language set.
- No color-only emphasis; no text boxes for body content (they break reading order).

## Presentations (pptx)

- Every slide has a unique title (in the title placeholder, not a floating text box).
- Use built-in layouts and placeholders so reading order is inherited; verify reading order per slide.
- Alt text on every image, chart, and SmartArt object.
- Minimum 18pt body text; contrast rules apply against the actual slide background.
- No meaning conveyed only by animation or position. Embedded video needs captions.
- Speaker notes carry any content that exists only visually on the slide.

## Spreadsheets (xlsx)

- One table per sheet where practical; give sheets descriptive tab names.
- Real header rows, defined as headers or named ranges. Never blank rows/columns as visual spacing inside a data table.
- No merged cells inside data regions. No color-only status coding; pair color with a text value.
- Alt text on charts; chart titles and axis labels present and literal.
- Remove empty sheets. Put instructions or context in cell A1 of the first sheet, not in a floating text box.

## HTML email

- Semantic structure inside the constraints of email HTML: real heading tags, lists, and a single logical column order in source even if visually multi-column.
- role="presentation" on layout tables.
- Alt text on all images; critical content never lives only inside an image.
- Contrast checked in both light and dark mode; do not rely on colors that invert badly.
- Descriptive link text; the plain-text alternative part is generated, not skipped.

## Markdown and plain text

- Correct heading hierarchy (#, ##, ###) with no skips.
- Descriptive link text in brackets, not raw URLs.
- Real markdown tables and lists; never ASCII-art layout that carries meaning through spacing alone.
- Alt text inside image syntax: ![description](path).
- Code blocks fenced with a language tag so screen readers and renderers treat them as code.

## Generated images, charts, and diagrams

- Provide the alt text with the image, always, in whatever field the format offers.
- Charts: direct-label data where possible; color plus pattern or label, never color alone; readable font sizes at intended display size.
- Complex diagrams and infographics get a text equivalent adjacent to the image: a paragraph or structured list conveying the same information. The alt attribute alone is not enough for dense content.

## Out of scope, named honestly

- Native mobile apps: governed by the platform accessibility APIs and guidelines (Apple and Android), which are a different specification. Do not claim this file covers them.
- Audio and video production values (caption authoring, audio description recording): flag the requirement, do not fake the artifact.

## Verify before declaring done

1. Structure check: headings, lists, and tables are real structures in the file format, confirmed by inspecting the output, not the source intent.
2. Alt text check: zero images without alt or a decorative mark.
3. Contrast check on any colored text or chart elements.
4. Format-native checker where one exists (PDF checker, Office accessibility checker); report its result or report that it was unavailable.
5. State remaining manual checks for the user in one short list.
