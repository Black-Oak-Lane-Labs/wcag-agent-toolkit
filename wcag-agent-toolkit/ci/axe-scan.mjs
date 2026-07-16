// ci/axe-scan.mjs
// Scans every route in A11Y_ROUTES with axe-core and exits nonzero on any violation.
// Requires dev dependencies: playwright, @axe-core/playwright, wait-on
//   npm install --save-dev playwright @axe-core/playwright wait-on

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const base = process.env.A11Y_BASE_URL || "http://localhost:3000";
const routes = (process.env.A11Y_ROUTES || "/").split(",").map((r) => r.trim());

let totalViolations = 0;
const browser = await chromium.launch();
const page = await browser.newPage();

for (const route of routes) {
  const url = base + route;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (err) {
    console.error(`FAIL ${route}: could not load (${err.message})`);
    totalViolations += 1;
    continue;
  }

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  if (results.violations.length === 0) {
    console.log(`PASS ${route}`);
    continue;
  }

  totalViolations += results.violations.length;
  console.error(`\nFAIL ${route}: ${results.violations.length} violation(s)`);
  for (const v of results.violations) {
    console.error(`  ${v.id} [${v.impact}] ${v.help}`);
    console.error(`  ${v.helpUrl}`);
    for (const node of v.nodes.slice(0, 5)) {
      console.error(`    at: ${node.target.join(" ")}`);
    }
    if (v.nodes.length > 5) {
      console.error(`    ...and ${v.nodes.length - 5} more instance(s)`);
    }
  }
}

await browser.close();

if (totalViolations > 0) {
  console.error(`\naxe scan failed: ${totalViolations} violation(s) across ${routes.length} route(s).`);
  process.exit(1);
}
console.log(`\naxe scan clean: ${routes.length} route(s), zero violations.`);
