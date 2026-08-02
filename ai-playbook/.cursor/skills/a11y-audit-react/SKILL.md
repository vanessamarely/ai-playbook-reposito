---
name: a11y-audit-react
description: Audit React components for WCAG 2.2 compliance and suggest fixes. Use for accessibility audits of React/TypeScript component files or directories.
---

# Accessibility Audit Agent (React)

## Purpose

Identify accessibility violations in React components and provide actionable remediation steps aligned with WCAG 2.2 Level AA.

## Inputs

- `targetPath`: Path to component file(s) or directory to audit.
- `auditScope`: `single-file`, `directory`, or `full-project`.

## Outputs

- Summary of violations with severity (critical, serious, moderate, minor).
- Actionable code fixes with minimal diffs.
- Verification commands to test changes.

## Procedure

### Step 1: Validate Scope

1. Verify `targetPath` exists.
2. Determine file(s) to audit based on `auditScope`.
3. Filter for `.tsx` and `.jsx` files.

### Step 2: Run Automated Lint

Execute: `.cursor/skills/a11y-automation/scripts/run-a11y-lint.sh <targetPath>`

Capture output.

If eslint-plugin-jsx-a11y is configured, parse violations.

### Step 3: Load WCAG Guidelines

Read: `.cursor/skills/react-components/references/a11y-wcag22.md`

Use as reference for manual inspection.

### Step 4: Analyze Each Component

For each component file:

1. **Semantic HTML Check**
   - Detect use of `<div>` or `<span>` for buttons/links.
   - Flag missing landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).

2. **Keyboard Navigation Check**
   - Verify interactive elements have `onClick` and `onKeyDown` handlers.
   - Check for keyboard traps in modals or focus-managed sections.

3. **ARIA Usage Check**
   - Identify missing `aria-label` or `aria-labelledby` on icon buttons.
   - Detect invalid ARIA attribute combinations.
   - Flag redundant ARIA on semantic elements.

4. **Focus Management Check**
   - Verify modals trap focus and restore on close.
   - Check that dynamic content updates announce via `aria-live` if needed.

5. **Contrast and Motion Check**
   - Flag hardcoded colors that may violate contrast ratios (suggest calculation).
   - Detect animations without `prefers-reduced-motion` support.

### Step 5: Categorize Violations

Assign severity:
- **Critical**: Component is unusable via keyboard or screen reader.
- **Serious**: Missing required ARIA or semantic structure.
- **Moderate**: Suboptimal patterns that hinder usability.
- **Minor**: Best practice improvements.

### Step 6: Summarize Findings

Output to chat:
- Summary statistics (total issues, by severity).
- Per-file breakdown with line numbers.
- Brief description of each violation.

### Step 7: Propose Fixes

For each violation:
1. Show the problematic code snippet.
2. Provide corrected version with minimal changes.
3. Explain the accessibility benefit.

Apply fixes using minimal diffs.

### Step 8: Suggest Automated Tests

If Playwright is available:
- Reference `.cursor/skills/a11y-automation/scripts/run-axe-playwright.mjs`.
- Suggest integrating axe checks into the test suite.

## Error Handling

- **No React files found**: Notify and exit.
- **Linter not configured**: Provide setup instructions for eslint-plugin-jsx-a11y.
- **Unable to parse code**: Report syntax errors and suggest fixing before audit.

## Accessibility Checklist

Quick reference for WCAG 2.2 AA compliance.

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
