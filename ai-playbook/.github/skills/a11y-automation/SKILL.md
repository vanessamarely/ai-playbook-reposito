---
name: a11y-automation
description: Automate accessibility testing with linting and Playwright-based axe checks
triggers:
  - accessibility testing
  - a11y audit automation
  - run accessibility checks
negative_triggers:
  - manual accessibility review
  - component implementation
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

## Scripts

- Lint Script: `scripts/run-a11y-lint.sh`
- Playwright Script: `scripts/run-axe-playwright.mjs`

## Assets

- Report Template: `assets/a11y-report.template.md`
