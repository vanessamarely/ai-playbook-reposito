# Pull Request Reviewer

Analyze pull request changes for quality, security issues, test coverage, and adherence to repository policies (`workspace-policy`, `frontend-policy`, `backend-policy`, `style-output` rules).

## Inputs

- `diffFile`: path to a git diff, or a list of changed files.
- `projectRoot`: root directory of the target project.

## Outputs

- Review summary with findings categorized by severity.
- Inline comments for specific issues (file + line).
- Approval or change-request recommendation.

## Procedure

1. **Parse the diff** — extract modified/added/deleted files, identify file types (source, tests, config, docs), compute scope of change (lines added/removed).
2. **Enforce scope** — confirm every changed file stays within `projectRoot` and doesn't touch sibling projects or excluded directories (`node_modules/`, `dist/`, `.git/`, etc., per `workspace-policy`). Flag violations.
3. **Detect project type** — inspect `projectRoot` for `package.json`/`tsconfig.json`/`pom.xml`/`pyproject.toml` to determine applicable policies.
4. **Load relevant policy rules** — always apply `workspace-policy` and `style-output`; apply `frontend-policy` for frontend changes and `backend-policy` for backend changes.
5. **Code quality check** per changed source file:
   - *Style consistency*: adherence to project conventions; flag unrelated formatting noise.
   - *Type safety*: `any` types or missing annotations; unjustified type assertions.
   - *Error handling*: unhandled promise rejections; missing error responses on API endpoints.
   - *Security*: hardcoded secrets/credentials; SQL injection risk (string concatenation in queries); unvalidated user input.
   - *Performance*: inefficient loops/algorithms; synchronous operations in async contexts.
6. **Accessibility check (frontend only)** — if frontend files changed, apply the `react-components`/`a11y-automation` rules: check for non-semantic interactive elements, missing ARIA labels on icon buttons, missing keyboard handlers.
7. **Test coverage check** — confirm tests were added/modified alongside new functionality; flag functionality without corresponding tests. Suggest `npm test -- --coverage` or the project equivalent.
8. **AI tool instruction check** — if the PR touches playbook rules/commands/policies, confirm `.cursor/rules/*.mdc`, `.cursor/commands/*.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and `AGENTS.md` stay consistent with any routing changes. Suggest running `/ai-tool-setup` if instructions look stale.
9. **Documentation check** — public API changes have updated docs/comments; breaking changes include migration notes.
10. **Summarize findings** by severity:
    - **Blocking**: security vulnerabilities, breaking changes with no migration path, scope violations.
    - **Required**: missing tests, accessibility violations, type-safety issues.
    - **Recommended**: style/performance improvements, doc gaps, stale AI tool config.
    - **Nitpick**: minor style/naming suggestions.
11. **Generate the review** — summary metrics (files changed, lines added/removed), findings by category, inline file:line comments, overall recommendation (Approve / Request Changes / Comment).

## Error Handling

- **Diff parsing failure**: ask for a valid diff.
- **Project detection failure**: ask for explicit project type.
- **Policy rule missing**: proceed with general best practices only.
