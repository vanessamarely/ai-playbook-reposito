# Output Style Guidelines

## Minimal Diffs

Produce the smallest possible changeset to accomplish the task.

### Rules
1. Modify only the lines necessary to implement the feature or fix.
2. Do not reformat unrelated code.
3. Do not reorganize imports unless required for the change.
4. Do not rename variables or functions outside the scope of the task.

### Exception
If the user explicitly requests refactoring or code cleanup, broader changes are acceptable.

## Path References

All file paths in output must be:
- Relative to the target project root.
- Use forward slashes (`/`) regardless of operating system.
- Omit leading `./` unless semantically required.

Examples:
- `src/components/Button.tsx`
- `tests/unit/api.test.ts`
- `config/database.yml`

## No Mass Reformatting

Do NOT apply automatic code formatters (Prettier, Black, gofmt) unless:
- The project has a pre-commit hook configured.
- The user explicitly requests formatting.

Preserve the existing code style of the target file.

## No Unrelated Refactors

When fixing a bug or adding a feature:
- Do not extract functions "for cleanliness" unless required.
- Do not split files unless the change demands it.
- Do not introduce design patterns (e.g., factory, strategy) unless solving a concrete problem.

## Verification Commands

After proposing changes, suggest commands the user can run to verify correctness:
- Linting: `npm run lint`, `eslint src/`, `pylint module/`
- Type checking: `tsc --noEmit`, `mypy .`
- Tests: `npm test`, `pytest`, `mvn test`
- Build: `npm run build`, `gradle build`, `python -m build`

Provide the specific command relevant to the project's tooling.

## Plan vs. Direct Fix

### When to Plan
For complex changes involving:
- Multiple files or modules.
- Architectural decisions.
- Trade-offs between approaches.

Provide:
1. Brief description of the approach.
2. List of files to modify.
3. High-level steps.

Then execute after confirmation.

### When to Fix Directly
For simple changes:
- Single-file bug fixes.
- Typo corrections.
- Adding a small utility function.
- Updating configuration values.

Proceed immediately with the fix.

## Error Messages

When encountering errors during analysis or execution:
1. State the error clearly.
2. Identify the likely cause.
3. Propose a solution.
4. Do not guess; request additional information if needed.

Avoid vague messages like "something went wrong."
