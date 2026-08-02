# AI Tool Setup

Generate or refresh AI assistant instruction files for all four AI coding tools this playbook supports — GitHub Copilot, Claude Code, Cursor, and OpenAI Codex CLI — from this playbook's tool-agnostic policies and procedures, so every tool enforces the same rules through its own native discovery mechanism. Not for writing new procedures from scratch (see `.github/prompts/skill-creator.prompt.md`), building application code, or general documentation.

## Inputs

- `targetTool`: one of `copilot`, `claude`, `cursor`, `codex`, or `all`.
- `projectRoot`: absolute path to the target repository root.
- `playbookRoot`: path to this playbook directory (default `ai-playbook`).

## Outputs

Per tool, the files listed in the reference table below, plus a summary of what was created or updated.

## The Four Native Structures — Source of Truth

There is no shared folder all four tools read. Each has its own discovery mechanism; do not invent a fifth shared format.

| Tool | Always-loaded file | Path-specific / reusable content | Custom agents / procedures |
|---|---|---|---|
| **GitHub Copilot** | `.github/copilot-instructions.md` (plain Markdown, no frontmatter, auto-loaded) | `.github/instructions/<name>.instructions.md` (YAML frontmatter: `applyTo: "<glob>"` required, `excludeAgent` optional) | `.github/agents/<name>.agent.md` (frontmatter: `description` required, `name`, `tools`, `model`, `target` optional) — flat files, no subfolders. Reusable snippets: `.github/prompts/<name>.prompt.md` (plain Markdown, run with `/<name>`) |
| **Claude Code** | `CLAUDE.md` at repo root (plain Markdown, always loaded) | N/A — path-specific behavior isn't a first-class concept; encode it in skill descriptions instead | `.claude/agents/<name>.md` (frontmatter: `name`, `description`, `tools`) for autonomous subagents; `.claude/skills/<name>/SKILL.md` (frontmatter: `name`, `description`, `triggers`, `negative_triggers`) with optional `references/`, `assets/`, `scripts/` subfolders for progressive disclosure |
| **Cursor** | `.cursor/rules/*.mdc` with `alwaysApply: true` (YAML frontmatter: `description`, `globs`, `alwaysApply`) — the legacy single-file `.cursorrules` at repo root still works but the `.mdc` rules directory is preferred for new setups | `.cursor/rules/<name>.mdc` with `alwaysApply: false` and a `globs` pattern for path-specific rules | `.cursor/commands/<name>.md` (plain Markdown, invoked with `/<name>`) |
| **OpenAI Codex CLI** | `AGENTS.md` at repo root (plain Markdown; nearest `AGENTS.md` wins for nested overrides in subdirectories) | Nested `AGENTS.md` files closer to the edited files | `.agents/skills/<name>/SKILL.md` (same progressive-disclosure shape as Claude skills: optional `references/`, `assets/`, `scripts/`) |

## Procedure

### 1. Validate Inputs
Confirm `projectRoot` exists and looks like a real project (`package.json`, `pom.xml`, or `pyproject.toml`). Confirm `playbookRoot` contains `policies/` and the procedure directories (`.github/agents/`, `.github/prompts/`, `.claude/`, `.cursor/`, `.agents/`). Error and exit if either check fails.

### 2. Detect Project Type
Run the project's detection tooling (or inspect manifests directly) to determine `projectType` (`react`, `node-typescript`, `java-maven`, `python`, `unknown`), `framework`, and `language`.

### 3. Load the Tool-Agnostic Policies
Always read `<playbookRoot>/policies/workspace-policy.md` and `<playbookRoot>/policies/style-output.md` — these are the source content for Copilot's `copilot-instructions.md`, Claude's `CLAUDE.md` core rules, Cursor's always-applied rule, and Codex's `AGENTS.md`.
If `projectType` touches frontend code, also load `<playbookRoot>/policies/frontend-policy.md`. If it touches backend code, also load `<playbookRoot>/policies/backend-policy.md`. These map to Copilot's `applyTo`-scoped instructions files and Cursor's `globs`-scoped rules.

### 4. Build the Routing Table
Map the playbook's 7 agent-shaped procedures and 6 reference-shaped procedures to each tool's native routing:

| Procedure | Copilot | Claude | Cursor | Codex |
|---|---|---|---|---|
| scan-workspace | `.github/agents/scan-workspace.agent.md` | `.claude/agents/scan-workspace.md` | `.cursor/commands/scan-workspace.md` | `.agents/skills/scan-workspace/SKILL.md` |
| react-component-builder | `.github/agents/react-component-builder.agent.md` | `.claude/agents/react-component-builder.md` | `.cursor/commands/react-component-builder.md` | `.agents/skills/react-component-builder/SKILL.md` |
| figma-component-builder | `.github/agents/figma-component-builder.agent.md` | `.claude/agents/figma-component-builder.md` | `.cursor/commands/figma-component-builder.md` | `.agents/skills/figma-component-builder/SKILL.md` |
| a11y-audit-react | `.github/agents/a11y-audit-react.agent.md` | `.claude/agents/a11y-audit-react.md` | `.cursor/commands/a11y-audit-react.md` | `.agents/skills/a11y-audit-react/SKILL.md` |
| node-microservice-builder | `.github/agents/node-microservice-builder.agent.md` | `.claude/agents/node-microservice-builder.md` | `.cursor/commands/node-microservice-builder.md` | `.agents/skills/node-microservice-builder/SKILL.md` |
| pr-reviewer | `.github/agents/pr-reviewer.agent.md` | `.claude/agents/pr-reviewer.md` | `.cursor/commands/pr-reviewer.md` | `.agents/skills/pr-reviewer/SKILL.md` |
| code-reviewer | `.github/agents/code-reviewer.agent.md` | `.claude/agents/code-reviewer.md` | `.cursor/commands/code-reviewer.md` | `.agents/skills/code-reviewer/SKILL.md` |
| react-components (reference) | `.github/prompts/react-components.prompt.md` | `.claude/skills/react-components/SKILL.md` | `.cursor/rules/react-components.mdc` | `.agents/skills/react-components/SKILL.md` |
| a11y-automation (reference) | `.github/prompts/a11y-automation.prompt.md` | `.claude/skills/a11y-automation/SKILL.md` | `.cursor/rules/a11y-automation.mdc` | `.agents/skills/a11y-automation/SKILL.md` |
| node-typescript-service (reference) | `.github/prompts/node-typescript-service.prompt.md` | `.claude/skills/node-typescript-service/SKILL.md` | `.cursor/rules/node-typescript-service.mdc` | `.agents/skills/node-typescript-service/SKILL.md` |
| skill-creator (reference) | `.github/prompts/skill-creator.prompt.md` | `.claude/skills/skill-creator/SKILL.md` | `.cursor/commands/skill-creator.md` | `.agents/skills/skill-creator/SKILL.md` |
| figma-component (reference) | `.github/prompts/figma-component.prompt.md` | `.claude/skills/figma-component/SKILL.md` | `.cursor/rules/figma-component.mdc` | `.agents/skills/figma-component/SKILL.md` |
| ai-tool-setup (this procedure) | `.github/prompts/ai-tool-setup.prompt.md` | `.claude/skills/ai-tool-setup/SKILL.md` | n/a (meta-procedure) | n/a (meta-procedure) |

### 5. Generate Files, Per Tool

**GitHub Copilot** (`targetTool` is `copilot` or `all`):
1. Write `.github/copilot-instructions.md` — plain Markdown, merges workspace-policy + style-output into a concise always-on file, with routing tables to `.github/agents/*.agent.md` and `.github/prompts/*.prompt.md`.
2. Write `.github/instructions/frontend.instructions.md` (`applyTo: "**/*.tsx,**/*.ts"`) and `.github/instructions/backend.instructions.md` (`applyTo: "server/**,services/**,**/*.service.ts"`) from the domain policies.
3. Write/refresh each `.github/agents/<name>.agent.md` and `.github/prompts/<name>.prompt.md` per the routing table.

**Claude Code** (`targetTool` is `claude` or `all`):
1. Write `CLAUDE.md` at the repo root — quick-start steps, skill/agent routing tables, core rules summary.
2. Write/refresh `.claude/agents/<name>.md` (frontmatter `name`, `description`, `tools`) for each agent-shaped procedure.
3. Write/refresh `.claude/skills/<name>/SKILL.md` (frontmatter `name`, `description`, `triggers`, `negative_triggers`) for each reference-shaped procedure, moving dense material into `references/`, templates into `assets/`, and executables into `scripts/`.

**Cursor** (`targetTool` is `cursor` or `all`):
1. Write `.cursor/rules/workspace-policy.mdc` and `.cursor/rules/style-output.mdc` with `alwaysApply: true`.
2. Write `.cursor/rules/frontend-policy.mdc` and `.cursor/rules/backend-policy.mdc` with `alwaysApply: false` and an appropriate `globs` pattern.
3. Write `.cursor/rules/<name>.mdc` for reference-shaped procedures (globs-scoped) and `.cursor/commands/<name>.md` for agent-shaped procedures.

**OpenAI Codex CLI** (`targetTool` is `codex` or `all`):
1. Write `AGENTS.md` at the repo root with routing to `.agents/skills/<name>/SKILL.md` for every procedure (Codex has no separate "agent" vs. "skill" file type — everything is a skill).
2. Write/refresh `.agents/skills/<name>/SKILL.md` per procedure, with the same progressive-disclosure subfolders as Claude skills where useful.
3. If the project has meaningful subdirectory-specific conventions, add nested `AGENTS.md` files closer to those files — nearest wins.

### 6. Cross-Tool Consistency Check
Confirm all four tools route to the same 13 procedures and enforce the same workspace/style/frontend/backend policy content — only the file format and frontmatter schema should differ between tools. Flag any tool whose routing table is missing an entry the others have.

### 7. Output Summary
List every file created or updated, grouped by tool, with a one-line description. Suggest reloading each editor/CLI so it picks up the new instructions.

## Error Handling

- **`projectRoot` not found** — report the path and stop.
- **`playbookRoot` missing expected directories** — report which are missing and stop rather than generating partial/inconsistent output.
- **Unknown project type** — generate the tool-agnostic (workspace + style) files only; note that domain-specific (frontend/backend) routing was skipped pending clarification.
- **File write failure** — report the path and the underlying error; do not leave a tool half-updated (e.g. routing table updated but the target file not written).

## Related

- `<playbookRoot>/policies/workspace-policy.md`, `frontend-policy.md`, `backend-policy.md`, `style-output.md` — the tool-agnostic source content
- `.github/copilot-instructions.md` — this repo's own Copilot instructions, generated by this same procedure
- `.github/prompts/skill-creator.prompt.md` — use first when a *new* procedure needs to be authored, before routing it here
