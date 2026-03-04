---
description: Audit React components for WCAG 2.2 compliance and suggest fixes
tools:
  - file-system-read
  - command-execution
  - report-generation
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

Execute: `.github/skills/a11y-automation/scripts/run-a11y-lint.sh <targetPath>`

Capture output.

If eslint-plugin-jsx-a11y is configured, parse violations.

### Step 3: Load WCAG Guidelines

Read: `.github/skills/react-components/references/a11y-wcag22.md`

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
- Reference `.github/skills/a11y-automation/scripts/run-axe-playwright.mjs`.
- Suggest integrating axe checks into the test suite.

## Error Handling

- **No React files found**: Notify and exit.
- **Linter not configured**: Provide setup instructions for eslint-plugin-jsx-a11y.
- **Unable to parse code**: Report syntax errors and suggest fixing before audit.
