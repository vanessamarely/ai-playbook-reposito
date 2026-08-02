# AGENTS.md

This repository contains an **AI Playbook** — a structured collection of skills and policies for working effectively with AI coding assistants, including OpenAI Codex CLI.

Codex loads this file automatically from the repo root for every task. A nearer `AGENTS.md` in a subdirectory (for example `src/AGENTS.md`) is merged on top of this one for work under that subtree — the nearest file wins on conflicts, and does not need to repeat what's already stated here.

## Quick Start

1. Run `node ai-playbook/tools/project-detect.mjs <targetFolder>` to identify the project type.
2. Load the matching skill from `ai-playbook/.agents/skills/<name>/SKILL.md` — Codex auto-discovers every skill under `.agents/skills/`, so no separate registration step is needed.
3. Apply the scope and output rules in this file.
4. Apply the appropriate domain policy (`ai-playbook/policies/frontend-policy.md` or `ai-playbook/policies/backend-policy.md`) when relevant.

## Skill Routing

Codex does not distinguish an "agent" from a "skill" — every invokable multi-step procedure in this playbook (the 7 former agents and the 6 skills) is a Codex skill, discovered automatically under `.agents/skills/`.

| Task | Skill |
|------|-------|
| Detect workspace type | `ai-playbook/.agents/skills/scan-workspace/SKILL.md` |
| Build a React component | `ai-playbook/.agents/skills/react-component-builder/SKILL.md` |
| Convert Figma designs into components | `ai-playbook/.agents/skills/figma-component-builder/SKILL.md` |
| Accessibility audit on React components | `ai-playbook/.agents/skills/a11y-audit-react/SKILL.md` |
| Build a Node microservice | `ai-playbook/.agents/skills/node-microservice-builder/SKILL.md` |
| Pull request review | `ai-playbook/.agents/skills/pr-reviewer/SKILL.md` |
| Review source code quality | `ai-playbook/.agents/skills/code-reviewer/SKILL.md` |
| React component (create/modify) | `ai-playbook/.agents/skills/react-components/SKILL.md` |
| Accessibility testing automation | `ai-playbook/.agents/skills/a11y-automation/SKILL.md` |
| Node.js/TypeScript service | `ai-playbook/.agents/skills/node-typescript-service/SKILL.md` |
| New skill scaffolding | `ai-playbook/.agents/skills/skill-creator/SKILL.md` |
| AI tool configuration (Copilot/Claude/Cursor/Codex) | `ai-playbook/.agents/skills/ai-tool-setup/SKILL.md` |
| Convert a Figma node into code | `ai-playbook/.agents/skills/figma-component/SKILL.md` |

## Scope Enforcement

Codex operates within a multi-repository workspace structure. Each target project is isolated.

### Project Isolation Rules

1. Identify the target project folder before making any changes.
2. Restrict all file operations to that folder and its descendants.
3. Never traverse upward beyond the target project root.
4. Never modify files in sibling projects unless explicitly instructed.

### Exclusion Patterns

Ignore the following directories during analysis and modification:

- `node_modules/`
- `dist/`, `build/`, `out/`
- `.next/`, `.nuxt/`, `.vite/`
- `coverage/`, `.nyc_output/`
- `.venv/`, `venv/`, `__pycache__/`
- `target/` (Java)
- `.git/`, `.svn/`
- `*.log`, `*.tmp`

### Target Folder Selection Protocol

1. If a specific folder path is provided, validate it exists.
2. If working from a file path, extract the project root by locating:
   - `package.json` (Node/JavaScript)
   - `pom.xml` or `build.gradle` (Java)
   - `pyproject.toml` or `setup.py` (Python)
   - `.git/` as fallback
3. If ambiguous, request explicit clarification before proceeding.
4. Store the resolved target root for the session.

### Cross-Folder Refactor Prohibition

Do NOT perform changes across multiple project folders unless:
- Explicitly requested by the user.
- A workspace-level coordination task is clearly specified.

Default behavior: operate on a single project at a time.

### Scope Validation

Before finalizing changes:
1. Run `node ai-playbook/tools/scope-guard.mjs <targetFolder> <changedFiles...>` with the list of modified file paths.
2. Verify all paths are within the target root.
3. Abort if scope violation detected.

## Output Style

### Minimal Diffs

Produce the smallest possible changeset to accomplish the task.

1. Modify only the lines necessary to implement the feature or fix.
2. Do not reformat unrelated code.
3. Do not reorganize imports unless required for the change.
4. Do not rename variables or functions outside the scope of the task.

If the user explicitly requests refactoring or code cleanup, broader changes are acceptable.

### Path References

All file paths in output must be:
- Relative to the target project root.
- Use forward slashes (`/`) regardless of operating system.
- Omit leading `./` unless semantically required.

Examples:
- `src/components/Button.tsx`
- `tests/unit/api.test.ts`
- `config/database.yml`

### No Mass Reformatting

Do NOT apply automatic code formatters (Prettier, Black, gofmt) unless:
- The project has a pre-commit hook configured.
- The user explicitly requests formatting.

Preserve the existing code style of the target file.

### No Unrelated Refactors

When fixing a bug or adding a feature:
- Do not extract functions "for cleanliness" unless required.
- Do not split files unless the change demands it.
- Do not introduce design patterns (e.g., factory, strategy) unless solving a concrete problem.

### Verification Commands

After proposing changes, suggest commands the user can run to verify correctness:
- Linting: `npm run lint`, `eslint src/`, `pylint module/`
- Type checking: `tsc --noEmit`, `mypy .`
- Tests: `npm test`, `pytest`, `mvn test`
- Build: `npm run build`, `gradle build`, `python -m build`

Provide the specific command relevant to the project's tooling.

### Plan vs. Direct Fix

Plan first for complex changes involving multiple files or modules, architectural decisions, or trade-offs between approaches — provide a brief description of the approach, the list of files to modify, and high-level steps, then execute after confirmation.

Fix directly for simple changes — single-file bug fixes, typo corrections, adding a small utility function, updating configuration values.

### Error Messages

When encountering errors during analysis or execution:
1. State the error clearly.
2. Identify the likely cause.
3. Propose a solution.
4. Do not guess; request additional information if needed.

Avoid vague messages like "something went wrong."

## Core Rules

- Operate only within the stated target folder; never modify sibling projects.
- Produce the smallest possible changeset to accomplish a task.
- All frontend changes must meet WCAG 2.2 Level AA accessibility standards.
- Never log, commit, or output secrets, tokens, or credentials.
- Suggest verification commands after each change.

## Policy Source

- `ai-playbook/policies/workspace-policy.md` and `ai-playbook/policies/style-output.md` — merged into this file.
- `ai-playbook/policies/frontend-policy.md` — React/TypeScript standards and WCAG 2.2 accessibility (see also `ai-playbook/src/AGENTS.md` for a nested-override example of this content).
- `ai-playbook/policies/backend-policy.md` — Node.js/Java/Python backend conventions.

## Other AI Tools

This playbook also supports GitHub Copilot (`.github/copilot-instructions.md`), Claude Code (`CLAUDE.md` + `.claude/`), and Cursor (`.cursor/rules/*.mdc`). Use the `ai-tool-setup` skill (`ai-playbook/.agents/skills/ai-tool-setup/SKILL.md`) to generate or refresh instruction files for any or all of them.
