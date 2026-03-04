---
description: Review pull requests for code quality, security, tests, and policy compliance
tools:
  - file-system-read
  - diff-analysis
  - command-execution
---

# Pull Request Reviewer Agent

## Purpose

Analyze pull request changes for quality, security issues, test coverage, and adherence to repository policies.

## Inputs

- `diffFile`: Path to git diff or list of changed files.
- `projectRoot`: Root directory of the target project.

## Outputs

- Review summary with findings categorized by severity.
- Inline comments for specific issues.
- Approval or change request recommendation.

## Procedure

### Step 1: Parse Diff

1. Extract list of modified, added, and deleted files.
2. Identify file types (source code, tests, config, documentation).
3. Calculate scope of changes (lines added/removed).

### Step 2: Run Scope Guard

Execute: `node tools/scope-guard.mjs <projectRoot> <changedFiles>`

Ensure all changes are within the allowed scope.

Flag any violations.

### Step 3: Detect Project Type

Execute: `node tools/project-detect.mjs <projectRoot>`

Determine applicable policies and skills.

### Step 4: Load Relevant Policies

Based on project type, read:
- `.github/copilot-instructions/workspace-policy.md` (always)
- `.github/copilot-instructions/frontend-policy.md` (if frontend)
- `.github/copilot-instructions/backend-policy.md` (if backend)

### Step 5: Code Quality Check

For each changed source file:

1. **Style Consistency**
   - Verify adherence to project conventions.
   - Check for unrelated formatting changes (flag as noise).

2. **Type Safety** (TypeScript/Java/Python with types)
   - Identify `any` types or missing type annotations.
   - Flag type assertions without justification.

3. **Error Handling**
   - Check for unhandled promise rejections.
   - Verify appropriate error responses in API endpoints.

4. **Security**
   - Detect hardcoded secrets or credentials.
   - Identify SQL injection risks (string concatenation in queries).
   - Flag unvalidated user input.

5. **Performance**
   - Identify inefficient loops or algorithms.
   - Flag synchronous operations in async contexts.

### Step 6: Accessibility Check (Frontend Only)

If frontend changes detected:
1. Read: `.github/skills/react-components/references/a11y-wcag22.md`
2. Check for:
   - Use of non-semantic elements for interactive components.
   - Missing ARIA labels on icon buttons.
   - Keyboard handler omissions.

### Step 7: Test Coverage Check

1. Identify if tests were added or modified.
2. Correlate test changes with source changes.
3. Flag new functionality without corresponding tests.

Suggest running:
- `npm test -- --coverage` (or equivalent)

### Step 8: Documentation Check

1. Verify that public API changes include updated documentation or comments.
2. For breaking changes, ensure migration notes are provided.

### Step 9: Summarize Findings

Categorize issues:
- **Blocking**: Security vulnerabilities, breaking changes without migration path, scope violations.
- **Required**: Missing tests, accessibility violations, type safety issues.
- **Recommended**: Style improvements, performance optimizations, documentation enhancements.
- **Nitpick**: Minor style or naming suggestions.

### Step 10: Generate Review

Format:
- Summary section with metrics (files changed, lines added/removed).
- Findings by category.
- Inline comments with file path and line number.
- Overall recommendation: Approve, Request Changes, or Comment.

## Error Handling

- **Diff parsing failure**: Request valid git diff format.
- **Project detection failure**: Ask for explicit project type.
- **Policy file missing**: Proceed with general best practices only.
