# AI Tool Setup

Generate or update AI assistant instruction files for all four supported tools — GitHub Copilot, Claude Code, Cursor, and OpenAI Codex CLI — so they share a consistent set of policies derived from this playbook. Use when onboarding a new AI tool or refreshing existing configuration after playbook changes. Not for writing new rules/commands (`/skill-creator`), building application code, or general documentation.

## Inputs

- `targetTool`: one of `copilot`, `claude`, `cursor`, `codex`, or `all`.
- `projectRoot`: absolute path to the repository root.
- `playbookRoot`: path to the playbook directory (default: `ai-playbook`).

## Outputs

Each tool has its own real, native structure — there is no shared folder all four read:

| Tool | Always-loaded file | Modular / additional files |
|---|---|---|
| GitHub Copilot | `.github/copilot-instructions.md` | `.github/instructions/*.instructions.md` (each with `applyTo` frontmatter globs) |
| Claude Code | `CLAUDE.md` (repo root) | `.claude/agents/`, `.claude/skills/`, `.claude/commands/` as needed |
| Cursor | none required | `.cursor/rules/*.mdc` (`alwaysApply: true` for always-on, `globs` for file-type triggers, description-only for Agent Requested) and `.cursor/commands/*.md` for explicit `/name` invocation |
| OpenAI Codex CLI | `AGENTS.md` (nearest wins for nested overrides) | `.agents/skills/<name>/SKILL.md` for bundled procedures |

## Procedure

1. **Validate inputs** — confirm `projectRoot` exists and looks like a real project (`package.json`, `pom.xml`, or `pyproject.toml`); confirm `playbookRoot` contains `policies/` (and, in this reference repo, `.claude/agents/` and `.claude/skills/` as the canonical source material). If either check fails, report the error and stop.
2. **Detect the project type** — inspect `projectRoot` for `package.json` (+React/Express/Nest/Fastify deps), `pom.xml`/`build.gradle`, `pyproject.toml`/`setup.py`/`requirements.txt`. Extract `projectType`, `framework`, `language`.
3. **Load applicable policies** from `<playbookRoot>/policies/`: always read `workspace-policy.md` and `style-output.md`; read `frontend-policy.md` if the project is frontend, `backend-policy.md` if it's backend (both if full-stack).
4. **Build the routing table** mapping project type to relevant procedures:

   | Project Type | Procedures |
   |---|---|
   | `react` | react-components, a11y-automation, figma-component |
   | `node-typescript` | node-typescript-service |
   | `java` / `python` | backend policy only (no dedicated procedure yet) |

5. **Generate GitHub Copilot instructions** (if `targetTool` is `copilot` or `all`):
   - Write always-applicable policy content to `<projectRoot>/.github/copilot-instructions.md`.
   - Write scoped guidance to `<projectRoot>/.github/instructions/<topic>.instructions.md`, each with `applyTo: "<glob>"` frontmatter (e.g. `applyTo: "**/*.tsx,**/*.jsx"` for React/a11y guidance, `applyTo: "server/**,services/**"` for backend guidance).
   - If updating existing files, preserve any content the project has marked as custom (e.g. inside `<!-- custom -->` tags).
6. **Generate Claude Code instructions** (if `targetTool` is `claude` or `all`):
   - Write project overview, routing table, and core rules to `<projectRoot>/CLAUDE.md`.
   - For bundled procedures needing supporting files (scripts, references, templates), create `<projectRoot>/.claude/skills/<name>/SKILL.md` (+ `references/`, `assets/`, `scripts/` as needed); for one-off invokable actions, create `<projectRoot>/.claude/commands/<name>.md`; for autonomous multi-step procedures, `.claude/agents/<name>/AGENT.md`.
   - Preserve any existing custom sections when updating.
7. **Generate Cursor rules and commands** (if `targetTool` is `cursor` or `all`):
   - Do **not** write a `.cursorrules` file — it's deprecated.
   - For each policy or file-type-triggered guideline, write a `.cursor/rules/<name>.mdc` with YAML frontmatter (`description`, and either `alwaysApply: true` or `globs: "<pattern>"`; use description-only with neither for Agent Requested rules).
   - For each explicit, one-off procedure, write a `.cursor/commands/<name>.md` with no frontmatter.
   - Condense supporting-file content (references, templates) inline into the single `.mdc`/`.md` file — Cursor has no bundled-folder concept.
8. **Generate OpenAI Codex CLI instructions** (if `targetTool` is `codex` or `all`):
   - Write project overview and core rules to `<projectRoot>/AGENTS.md`. Nested `AGENTS.md` files in subfolders override the root for that subtree — use them for monorepo-style projects instead of one giant root file.
   - For bundled procedures, create `<projectRoot>/.agents/skills/<name>/SKILL.md` (+ supporting folders as needed).
9. **Validate scope** — confirm every file written is inside `projectRoot`. Abort and report if anything would land outside it.
10. **Report a summary** — list every file created or updated with its path and a one-line description of what it contains. Suggest next steps: reload the AI tool / editor to pick up new instructions; re-run `/scan-workspace` to confirm the updated files are detected.

## Error Handling

- **Project root not found**: report `<projectRoot> does not exist` and stop.
- **Playbook not found**: report `Playbook directory not found at <playbookRoot>` and stop.
- **Unknown project type**: generate generic instructions from `workspace-policy` only; note that project-specific routing was skipped.
- **File write failure**: report the path and the underlying error; do not partially update a file.
