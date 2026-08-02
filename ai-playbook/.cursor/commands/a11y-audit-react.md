# Accessibility Audit (React)

Identify accessibility violations in React components and provide actionable remediation aligned with WCAG 2.2 Level AA. This is the guided audit workflow that applies the standards defined in the `a11y-automation` and `react-components` rules.

## Inputs

- `targetPath`: path to component file(s) or directory to audit.
- `auditScope`: `single-file`, `directory`, or `full-project`.

## Outputs

- Summary of violations by severity (critical, serious, moderate, minor).
- Actionable code fixes with minimal diffs.
- Verification commands to confirm the fixes.

## Procedure

1. **Validate scope** — confirm `targetPath` exists, determine files to audit per `auditScope`, filter to `.tsx`/`.jsx`.
2. **Run automated lint** — execute the project's `eslint-plugin-jsx-a11y` checks over `targetPath` and capture violations (see the `a11y-automation` rule for setup guidance if it's not configured).
3. **Analyze each component manually**:
   - *Semantic HTML*: flag `<div>`/`<span>` used for buttons/links; flag missing landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
   - *Keyboard navigation*: verify interactive elements have both `onClick` and `onKeyDown`; check for keyboard traps in modals/focus-managed sections.
   - *ARIA usage*: flag missing `aria-label`/`aria-labelledby` on icon buttons, invalid ARIA combinations, redundant ARIA on already-semantic elements.
   - *Focus management*: verify modals trap and restore focus; verify dynamic content announces via `aria-live` where needed.
   - *Contrast and motion*: flag hardcoded colors that may violate contrast ratios; flag animations without `prefers-reduced-motion` handling.
4. **Categorize violations**:
   - **Critical**: component unusable via keyboard or screen reader.
   - **Serious**: missing required ARIA or semantic structure.
   - **Moderate**: suboptimal patterns that hinder usability.
   - **Minor**: best-practice improvements.
5. **Summarize findings** in chat — total counts, per-file breakdown with line numbers, brief description per violation.
6. **Propose fixes** — for each violation, show the problematic snippet, the corrected version, and the accessibility benefit; apply as minimal diffs.
7. **Suggest automated regression tests** — if Playwright/axe-core is available in the project, suggest wiring the checks into the test suite (see `a11y-automation`).

## Error Handling

- **No React files found**: report and stop.
- **Linter not configured**: give setup instructions for `eslint-plugin-jsx-a11y`.
- **Unable to parse code**: report syntax errors and suggest fixing them before the audit continues.

## Reference Checklist

**Keyboard**: Tab-focusable interactive elements, logical focus order, visible focus indicator, Enter/Escape support, no traps, skip-to-content link, modal focus trap + restore.

**Screen readers**: `alt` text on images, labeled form inputs, descriptive link/button text, `aria-label` on icon buttons, single `<h1>` with no skipped levels, `aria-live` for dynamic content, `<th scope>` on tables.

**Visual**: contrast ≥ 4.5:1 (normal text) / 3:1 (large text); UI component contrast ≥ 3:1; color never the sole signal; reflows at 320px and 200% zoom; no flashing >3×/second.

**Forms**: visible labels; required fields marked beyond color; specific errors tied to the field; error state shown by more than color; submission errors summarized and focusable.

### Common Anti-Patterns

| Anti-Pattern | Problem | Fix |
|---|---|---|
| `div` as button | Not focusable, no keyboard support | Use `<button>` |
| Missing `alt` text | Invisible to screen readers | Add descriptive `alt` |
| Color-only states | Invisible to color-blind users | Add icons/text/patterns |
| Custom dropdown, no ARIA | Unusable by keyboard/screen reader | Use native `<select>` or ARIA listbox |
| Removing focus outlines | Users lose their place | Style, don't remove |
| `tabindex > 0` | Breaks natural tab order | Use `0` or `-1` only |
