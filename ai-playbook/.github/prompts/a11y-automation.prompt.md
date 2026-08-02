# Accessibility Automation

Run automated accessibility checks (linting + browser-based) to identify WCAG violations in a React project. Not for manual component-structure review, building new components, or non-React/non-browser environments.

## Inputs

- `targetPath`: path to files or directory to check.
- `checkType`: `lint`, `browser`, or `both`.

## Outputs

- Violation summary with counts by severity.
- Exit code (0 pass, non-zero on failures) for CI/CD.
- Actionable remediation steps with code fixes.

## Procedure

1. **Validate target path** — must exist and contain testable files (`.tsx`/`.jsx`/`.ts`/`.js` for lint; test files or a running app for browser checks).
2. **Run linting**:
   - Check `package.json` for `eslint-plugin-jsx-a11y`.
   - If present, run `npm run lint -- <targetPath>` and capture violations grouped by rule.
   - If absent, output setup instructions (see below) instead of failing silently.
3. **Run browser-based checks** (if `checkType` is `browser` or `both`):
   - Check for `playwright.config.ts`/`.js` and `@axe-core/playwright` in `package.json`.
   - If configured, run `npx playwright test` (with `injectAxe`/`checkA11y` in the test suite).
   - If not configured, output the setup instructions below instead of failing silently.
4. **Parse results** — total violation count; grouped by severity (critical/serious/moderate/minor) and by rule; file + line number per violation.
5. **Summarize findings** — summary stats, per-file breakdown, brief description per violation type.
6. **Propose fixes for critical/serious violations** — show the offending snippet, a corrected version, and the WCAG guideline reference; apply as minimal diffs.
7. **Suggest CI integration if missing** — npm script example, pre-commit hook, automated PR check.

## Setup Instructions (when tooling is missing)

**eslint-plugin-jsx-a11y not installed:**
```bash
npm install --save-dev eslint-plugin-jsx-a11y
```
```json
{ "extends": ["plugin:jsx-a11y/recommended"] }
```

**Playwright + axe-core not configured:**
```bash
npm install --save-dev @playwright/test @axe-core/playwright
```
```ts
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from '@axe-core/playwright'

test('accessibility check', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await injectAxe(page)
  await checkA11y(page)
})
```

## Accessibility Checklist (WCAG 2.2 AA)

**Keyboard navigation:** all interactive elements Tab-focusable · logical focus order · visible focus indicator · Enter/Escape support on custom widgets · no keyboard traps · skip-to-content link · modals trap focus and return it on close.

**Screen readers:** images have `alt` (`alt=""` if decorative) · form inputs have associated labels · buttons/links have descriptive text (not "click here") · icon-only buttons have `aria-label` · one `<h1>`, no heading-level skips · dynamic changes use `aria-live` · tables have `<th scope="...">`.

**Visual:** text contrast ≥ 4.5:1 normal / ≥ 3:1 large (18px+) · UI components ≥ 3:1 against background · color is never the sole signal · resizable to 200% without breaking layout · nothing flashes > 3×/sec.

**Forms:** every input has a visible label · required fields marked beyond color · errors are specific, field-associated, and focusable on submit.

**Content:** `<html lang="...">` declared · descriptive `<title>` · links distinguishable from text without relying on color alone · touch targets ≥ 44×44px on mobile · meaningful empty states.

## Common Patterns

```html
<!-- Buttons vs. links -->
<button onClick={handleDelete}>Delete Task</button>
<a href="/tasks/123">View Task</a>
<!-- Never: <div onClick={handleDelete}>Delete</div> -->

<!-- Form labels -->
<label htmlFor="email">Email address</label>
<input id="email" type="email" required />

<!-- ARIA roles -->
<nav aria-label="Main navigation">...</nav>
<div role="status" aria-live="polite">Task saved</div>
<div role="alert">Error: Title is required</div>
<dialog aria-modal="true" aria-labelledby="dialog-title">...</dialog>
```

**ARIA live regions:** `aria-live="polite"` / `role="status"` for status updates; `aria-live="assertive"` / `role="alert"` for errors and time-sensitive alerts.

## Common Anti-Patterns

| Anti-Pattern | Problem | Fix |
|---|---|---|
| `div` as button | Not focusable, no keyboard support | Use `<button>` |
| Missing `alt` text | Invisible to screen readers | Add descriptive `alt` |
| Color-only state | Invisible to color-blind users | Add icons, text, or patterns |
| Autoplaying media | Disorienting, can't be stopped | Add controls, don't autoplay |
| Custom dropdown, no ARIA | Unusable by keyboard/screen reader | Use native `<select>` or proper ARIA listbox |
| Removed focus outlines | Users can't see where they are | Style outlines, don't remove them |
| Empty links/buttons | "Link" announced with no description | Add text or `aria-label` |
| `tabindex > 0` | Breaks natural tab order | Use `tabindex="0"` or `-1` only |

## Manual Testing Tools

```bash
npx axe-core   # programmatic accessibility testing
npx pa11y      # CLI accessibility checker
```
Chrome DevTools → Lighthouse → Accessibility; Chrome DevTools → Elements → Accessibility tree.
Screen readers: VoiceOver (macOS, Cmd+F5) · NVDA/JAWS (Windows) · Orca (Linux).

## Error Handling

- **Linter not configured** — output the eslint-plugin-jsx-a11y setup steps.
- **Playwright/axe not available** — output the installation steps.
- **No violations found** — report success, confirm checks ran.
- **Critical violations found** — return a non-zero exit code for CI/CD.

## Related

- `.github/prompts/react-components.prompt.md` — full WCAG 2.2 mapping and component patterns
- `.github/instructions/frontend.instructions.md` — auto-applied accessibility policy
- `.github/agents/a11y-audit-react.agent.md` — full agent workflow for auditing existing components
