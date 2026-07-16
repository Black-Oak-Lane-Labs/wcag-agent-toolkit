# ci-setup.md
### Turning the rules into a hard control, step by step

Written for someone comfortable with source control but new to GitHub specifically. Twenty minutes, no prior Actions experience assumed.

## What you're building

Two automated checks that run on every pull request. If either fails, the code cannot merge. This is the difference between "the agent says it checked" and "the pipeline refuses code that fails." The agent instructions prevent violations; this proves prevention happened.

## Step 1: put the files in place

From this toolkit, copy into your repository:

- `ci/a11y.yml` goes to `.github/workflows/a11y.yml` (create both folders if they don't exist; the leading dot on `.github` matters)
- `ci/axe-scan.mjs` goes to `ci/axe-scan.mjs` in your repo

GitHub runs any workflow file it finds in `.github/workflows/` automatically. There is nothing to enable.

## Step 2: install the scan dependencies

In your project root, in the VS Code terminal:

```
npm install --save-dev playwright @axe-core/playwright wait-on
```

## Step 3: adjust the three marked spots in a11y.yml

Open `.github/workflows/a11y.yml`. Three lines are marked ADJUST:

1. **Build command.** Whatever builds your app (`npm run build` for most). If your app runs without a build step, delete that block.
2. **Start command and port.** Whatever serves your app locally, and the port in the wait-on URL must match it.
3. **Routes.** Every page of your app, comma separated. A route you leave out is a route that never gets scanned. When you add a page to the app, add it here in the same pull request.

## Step 4: test it locally before pushing

```
npm run build
npm run start &
A11Y_ROUTES="/,/about" node ci/axe-scan.mjs
```

You want to see PASS lines, or real violations you then fix. Sorting this out locally beats debugging it through CI logs.

## Step 5: commit and push

Commit both files and push. On GitHub, open your repository, click the **Actions** tab, and watch the workflow run. Green check means the gate works. Red X means it caught something; the log shows each violation with the rule, the impact, and the exact element.

## Step 6: make it a required check (the actual teeth)

Until this step, a failing check is a warning someone can ignore. This step makes it a veto.

1. On GitHub: your repo, then **Settings**, then **Branches** (under "Code and automation")
2. **Add branch protection rule**; branch name pattern: `main`
3. Check **Require status checks to pass before merging**
4. In the search box, add **axe** and **lint** (they appear after the workflow has run at least once)
5. Save

Now nothing merges to main with an accessibility violation, no matter who or what wrote it.

## The lint half

The `lint` job assumes `npm run lint` exists and includes accessibility rules.

**React projects:**

```
npm install --save-dev eslint-plugin-jsx-a11y
```

Then in your ESLint config, extend `plugin:jsx-a11y/recommended` (add `"jsx-a11y"` to plugins and the extends entry; flat config users add `jsxA11y.flatConfigs.recommended`). This catches missing alt, unlabeled inputs, and click-handler divs at lint time, before the app even builds.

**Vue projects:** use `eslint-plugin-vuejs-accessibility` the same way.

**Plain HTML or other stacks:** delete the lint job from a11y.yml and rely on the axe job, or wire in `pa11y-ci` if you want a second scanner.

## Honest limits

This gate catches roughly a third to half of real accessibility issues: the mechanically detectable ones. It does not replace the keyboard pass, screen reader testing, or the manual checks in accessibility.md. What it guarantees is narrower and still valuable: the detectable defects can never quietly ship again.
