---
name: ai-tool-setup
description: Generates or updates AI tool instruction files for GitHub Copilot (.github/copilot-instructions.md + .github/instructions/), Claude Code (CLAUDE.md + .claude/), Cursor (.cursor/rules/), and OpenAI Codex CLI (AGENTS.md + .agents/skills/) based on the detected project type and this playbook's policies. Use when the user wants to add, update, or synchronize AI tool configuration across multiple assistants. Do not use for writing new skills, building application code, or general documentation tasks.
---

# Skill: AI Tool Setup

## Purpose

Generate or update AI assistant instruction files for GitHub Copilot, Claude Code, Cursor, and OpenAI Codex CLI so all four tools share a consistent set of policies derived from this playbook. Each tool has its own discovery mechanism and file format — this skill does **not** assume they share a folder.

## Inputs

- `targetTool`: One of `copilot`, `claude`, `cursor`, `codex`, or `all`
- `projectRoot`: Absolute path to the repository root
- `playbookRoot`: Path to this playbook directory (default: `ai-playbook`)

## Outputs

| Tool | Files written |
|---|---|
| GitHub Copilot | `.github/copilot-instructions.md`, `.github/instructions/frontend.instructions.md`, `.github/instructions/backend.instructions.md`, `.github/skills/` (copied from playbook, not generated) |
| Claude Code | `CLAUDE.md`, `.claude/agents/`, `.claude/skills/` (copied from playbook, not generated) |
| Cursor | `.cursor/rules/workspace-policy.mdc`, `.cursor/rules/style-output.mdc`, plus file-type rules |
| OpenAI Codex CLI | `AGENTS.md` (root), optional nested `AGENTS.md` per package |

Plus a summary of files created or updated.

## Procedures

### 1. Validate Inputs

Verify `projectRoot` exists and contains a recognizable project (check for `package.json`, `pom.xml`, or `pyproject.toml`).

Verify `playbookRoot` contains `.claude/skills/` and `policies/`.

If either check fails, output an error and exit.

### 2. Detect Project Type

Execute: `node <playbookRoot>/tools/project-detect.mjs <projectRoot>`

Extract:
- `projectType` (react, node-typescript, java-maven, python, unknown)
- `framework`
- `language`

### 3. Load Applicable Policies

Always read: `<playbookRoot>/policies/workspace-policy.md` and `<playbookRoot>/policies/style-output.md`.

If `projectType` is `react` or `node-typescript`:
- Read: `<playbookRoot>/policies/frontend-policy.md`
- Read: `<playbookRoot>/policies/backend-policy.md`

### 4. Build Skill/Agent Routing Table

Map detected project types to the playbook's agents and skills (see `<playbookRoot>/.claude/skills/*/SKILL.md` and `<playbookRoot>/.claude/agents/*.md` frontmatter for the canonical list — also available as `<playbookRoot>/.github/skills/*/SKILL.md` for the Copilot-native equivalents).

| Project Type | Skills |
|---|---|
| `react` | `react-components`, `a11y-automation` |
| `node-typescript` | `node-typescript-service` |
| `java-maven` | backend-policy only (no dedicated skill yet) |
| `python` | backend-policy only (no dedicated skill yet) |

### 5. Generate GitHub Copilot Instructions

If `targetTool` is `copilot` or `all`:

1. Check if `.github/copilot-instructions.md` exists in `projectRoot`.
2. If updating, preserve any project-specific custom sections marked with `<!-- custom -->` tags.
3. Generate content using the template: [assets/copilot-instructions.template.md](assets/copilot-instructions.template.md).
4. Write to `<projectRoot>/.github/copilot-instructions.md`.
5. Generate `<projectRoot>/.github/instructions/frontend.instructions.md` and `backend.instructions.md` with an `applyTo` glob frontmatter field, from `frontend-policy.md`/`backend-policy.md`.
6. Copy `<playbookRoot>/.github/skills/` into `<projectRoot>/.github/skills/` so Copilot auto-discovers the SKILL.md procedures natively, alongside any `.github/agents/*.agent.md` and `.github/prompts/*.prompt.md` files already in use.

### 6. Generate Claude Instructions

If `targetTool` is `claude` or `all`:

1. Check if `CLAUDE.md` exists in `projectRoot`.
2. If updating, preserve any custom sections.
3. Generate content using the template: [assets/claude.template.md](assets/claude.template.md).
4. Write to `<projectRoot>/CLAUDE.md`.
5. Copy (or symlink) `<playbookRoot>/.claude/agents/` and `<playbookRoot>/.claude/skills/` into `<projectRoot>/.claude/` so Claude Code auto-discovers them — Claude does not read files outside `.claude/` for agents/skills.

### 7. Generate Cursor Rules

If `targetTool` is `cursor` or `all`:

1. Check if `<projectRoot>/.cursor/rules/` exists. If a legacy `.cursorrules` file exists instead, note it is deprecated (Agent mode ignores it) and migrate its content.
2. Generate content using the template: [assets/cursor-rules.template.md](assets/cursor-rules.template.md), splitting into one `.mdc` file per policy with correct `alwaysApply`/`globs` frontmatter.
3. Write to `<projectRoot>/.cursor/rules/*.mdc`.

### 8. Generate Codex AGENTS.md

If `targetTool` is `codex` or `all`:

1. Check if `<projectRoot>/AGENTS.md` exists.
2. Generate content using the template: [assets/agents-md.template.md](assets/agents-md.template.md).
3. Write to `<projectRoot>/AGENTS.md`.
4. Optionally copy `<playbookRoot>/.agents/skills/` into `<projectRoot>/.agents/skills/` so Codex CLI discovers the playbook's skills.

### 9. Validate Scope

Execute: `node <playbookRoot>/tools/scope-guard.mjs <projectRoot> <allWrittenFiles>`

Abort if any file falls outside `projectRoot`.

### 10. Output Summary

List each file created or updated with its path and a one-line description of what it contains.

Suggest next steps:
- Reload the AI tool workspace or editor to pick up new instructions.
- Run `node <playbookRoot>/tools/project-detect.mjs <projectRoot>` to confirm detection.

## Error Handling

**Project root not found**: Output `ERROR: <projectRoot> does not exist.` and exit.

**Playbook not found**: Output `ERROR: Playbook directory not found at <playbookRoot>.` and exit.

**Unknown project type**: Generate generic instructions using workspace-policy only; note that project-specific skill routing was skipped.

**File write failure**: Report the path and OS error; do not partially update files.

## References

- Per-tool file format details: [references/tool-formats.md](references/tool-formats.md)
- Skill routing guide: [references/skill-routing.md](references/skill-routing.md)

## Assets

- GitHub Copilot template: [assets/copilot-instructions.template.md](assets/copilot-instructions.template.md)
- Claude template: [assets/claude.template.md](assets/claude.template.md)
- Cursor rules template: [assets/cursor-rules.template.md](assets/cursor-rules.template.md)
- Codex AGENTS.md template: [assets/agents-md.template.md](assets/agents-md.template.md)
