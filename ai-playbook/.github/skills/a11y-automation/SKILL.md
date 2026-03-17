---
name: a11y-automation
description: Automates accessibility testing using eslint-plugin-jsx-a11y linting and Playwright-based axe-core checks. Use when the user wants to run, configure, or integrate automated accessibility tests into a React project. Do not use for manually reviewing component structure, building new components, or non-React/non-browser environments.
triggers:
  - run accessibility tests
  - automate a11y checks
  - set up axe testing
  - configure eslint-plugin-jsx-a11y
  - integrate accessibility into CI
  - a11y audit automation
negative_triggers:
  - manual accessibility review
  - component implementation
  - design accessibility guidelines
  - Python or backend accessibility
---

# Skill: Accessibility Automation

## Purpose

Run automated accessibility checks using linters and browser-based testing tools to identify WCAG violations.

## Inputs

- `targetPath`: Path to files or directory to check
- `checkType`: `lint`, `browser`, or `both`

## Outputs

- Violation summary with counts by severity
- Exit code (0 for pass, non-zero for failures)
- Actionable remediation steps with code fixes

## Procedures

### 1. Validate Target Path

Ensure the path exists and contains testable files.

For `lint`: Look for `.tsx`, `.jsx`, `.ts`, `.js` files.
For `browser`: Look for test files or running application.

### 2. Run Linting Checks

Execute: `.github/skills/a11y-automation/scripts/run-a11y-lint.sh <targetPath>`

This script:
1. Checks if `eslint-plugin-jsx-a11y` is configured.
2. Runs eslint on the target path.
3. Outputs violations grouped by rule.

If linter is not configured, output setup instructions.

### 3. Run Browser-Based Checks (Optional)

If `checkType` is `browser` or `both`:

Execute: `node .github/skills/a11y-automation/scripts/run-axe-playwright.mjs <targetPath>`

This script:
1. Checks if Playwright and @axe-core/playwright are available.
2. Runs axe checks on rendered components or pages.
3. Outputs violations by severity.

If not configured, provide setup guidance.

### 4. Parse Results

Extract:
- Total violation count
- Violations by severity (critical, serious, moderate, minor)
- Violations by rule (grouped)
- File and line number for each violation

### 5. Summarize Findings

Output to chat:
- Summary statistics (total violations, by severity, by rule)
- Per-file breakdown with line numbers
- Brief descriptions of each violation type

### 6. Propose Fixes

For critical and serious violations:
- Show code snippet with issue
- Provide corrected version
- Reference applicable WCAG guideline
- Apply fixes using minimal diffs

### 6. Output Remediation Steps

For each violation type, provide:
- WCAG guideline reference (e.g., 2.4.7 Focus Visible)
- Explanation of why it matters
- Code example of correct implementation

Refer to: `.github/skills/react-components/references/a11y-wcag22.md`

### 7. Suggest Integration

If checks are not part of CI/CD:
- Provide npm script examples
- Suggest pre-commit hook setup
- Recommend automated PR checks

## Error Handling

**Linter not configured**: Output installation and configuration steps for eslint-plugin-jsx-a11y.

**Playwright not available**: Provide installation instructions for Playwright and @axe-core/playwright.

**No violations found**: Output success message and confirm checks ran.

**Critical violations found**: Return non-zero exit code for CI/CD integration.

## References

- WCAG 2.2 Guidelines: `.github/skills/react-components/references/a11y-wcag22.md`

## Accessibility Checklist

Quick reference for WCAG 2.1 AA compliance. Use alongside the `frontend-ui-engineering` skill.

### Essential Checks

#### Keyboard Navigation
- [ ] All interactive elements focusable via Tab key
- [ ] Focus order follows visual/logical order
- [ ] Focus is visible (outline/ring on focused elements)
- [ ] Custom widgets have keyboard support (Enter to activate, Escape to close)
- [ ] No keyboard traps (user can always Tab away from a component)
- [ ] Skip-to-content link at top of page
- [ ] Modals trap focus while open, return focus on close

#### Screen Readers
- [ ] All images have `alt` text (or `alt=""` for decorative images)
- [ ] All form inputs have associated labels (`<label>` or `aria-label`)
- [ ] Buttons and links have descriptive text (not "Click here")
- [ ] Icon-only buttons have `aria-label`
- [ ] Page has one `<h1>` and headings don't skip levels
- [ ] Dynamic content changes announced (`aria-live` regions)
- [ ] Tables have `<th>` headers with scope

#### Visual
- [ ] Text contrast ≥ 4.5:1 (normal text) or ≥ 3:1 (large text, 18px+)
- [ ] UI components contrast ≥ 3:1 against background
- [ ] Color is not the only way to convey information
- [ ] Text resizable to 200% without breaking layout
- [ ] No content that flashes more than 3 times per second

#### Forms
- [ ] Every input has a visible label
- [ ] Required fields indicated (not by color alone)
- [ ] Error messages specific and associated with the field
- [ ] Error state visible by more than color (icon, text, border)
- [ ] Form submission errors summarized and focusable

#### Content
- [ ] Language declared (`<html lang="en">`)
- [ ] Page has a descriptive `<title>`
- [ ] Links distinguish from surrounding text (not by color alone)
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Meaningful empty states (not blank screens)

### Common HTML Patterns

#### Buttons vs. Links

```html
<!-- Use <button> for actions -->
<button onClick={handleDelete}>Delete Task</button>

<!-- Use <a> for navigation -->
<a href="/tasks/123">View Task</a>

<!-- NEVER use div/span as buttons -->
<div onClick={handleDelete}>Delete</div>  <!-- BAD -->
```

#### Form Labels

```html
<!-- Explicit label association -->
<label htmlFor="email">Email address</label>
<input id="email" type="email" required />

<!-- Implicit wrapping -->
<label>
  Email address
  <input type="email" required />
</label>

<!-- Hidden label (visible label preferred) -->
<input type="search" aria-label="Search tasks" />
```

#### ARIA Roles

```html
<!-- Navigation -->
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer links">...</nav>

<!-- Status messages -->
<div role="status" aria-live="polite">Task saved</div>

<!-- Alert messages -->
<div role="alert">Error: Title is required</div>

<!-- Modal dialogs -->
<dialog aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
  ...
</dialog>

<!-- Loading states -->
<div aria-busy="true" aria-label="Loading tasks">
  <Spinner />
</div>
```

#### Accessible Lists

```html
<ul role="list" aria-label="Tasks">
  <li>
    <input type="checkbox" id="task-1" aria-label="Complete: Buy groceries" />
    <label htmlFor="task-1">Buy groceries</label>
  </li>
</ul>
```

### Testing Tools

```bash
# Automated audit
npx axe-core          # Programmatic accessibility testing
npx pa11y             # CLI accessibility checker

# In browser
# Chrome DevTools → Lighthouse → Accessibility
# Chrome DevTools → Elements → Accessibility tree

# Screen reader testing
# macOS: VoiceOver (Cmd + F5)
# Windows: NVDA (free) or JAWS
# Linux: Orca
```

### Quick Reference: ARIA Live Regions

| Value | Behavior | Use For |
|-------|----------|---------|
| `aria-live="polite"` | Announced at next pause | Status updates, saved confirmations |
| `aria-live="assertive"` | Announced immediately | Errors, time-sensitive alerts |
| `role="status"` | Same as `polite` | Status messages |
| `role="alert"` | Same as `assertive` | Error messages |

### Common Anti-Patterns

| Anti-Pattern | Problem | Fix |
|---|---|---|
| `div` as button | Not focusable, no keyboard support | Use `<button>` |
| Missing `alt` text | Images invisible to screen readers | Add descriptive `alt` |
| Color-only states | Invisible to color-blind users | Add icons, text, or patterns |
| Autoplaying media | Disorienting, can't be stopped | Add controls, don't autoplay |
| Custom dropdown with no ARIA | Unusable by keyboard/screen reader | Use native `<select>` or proper ARIA listbox |
| Removing focus outlines | Users can't see where they are | Style outlines, don't remove them |
| Empty links/buttons | "Link" announced with no description | Add text or `aria-label` |
| `tabindex > 0` | Breaks natural tab order | Use `tabindex="0"` or `-1` only |


## Scripts

- Lint Script: `scripts/run-a11y-lint.sh`
- Playwright Script: `scripts/run-axe-playwright.mjs`

## Assets

- Report Template: `assets/a11y-report.template.md`
