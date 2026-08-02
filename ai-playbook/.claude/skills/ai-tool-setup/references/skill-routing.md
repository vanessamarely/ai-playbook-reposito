# Skill Routing Reference

## How Each Tool Selects a Skill/Agent/Rule

- **Claude Code**: reads the `name`/`description` (+ `when_to_use`) frontmatter of every `.claude/skills/*/SKILL.md` and decides which to load based on the conversation. Does NOT read `.agents/skills/`.
- **Codex CLI**: same description-matching mechanism, over `.agents/skills/*/SKILL.md` (`name`/`description` only).
- **GitHub Copilot** (native since 2026): same mechanism, checking `.github/skills/`, `.claude/skills/`, and `.agents/skills/` (project) in that order. `.github/instructions/*.instructions.md` still auto-applies by `applyTo` glob; `.github/agents/*.agent.md` and `.github/prompts/*.prompt.md` still only run when explicitly selected/invoked — those two have not converged.
- **Cursor** (native since 2.4, Jan 2026): same mechanism, checking `.cursor/skills/`, `.agents/skills/` (project), and legacy `.claude/skills/`. `.cursor/rules/*.mdc` with `globs` still auto-attach by file type; rules with only `description` are "Agent Requested"; `.cursor/commands/*.md` still only run when the user explicitly types `/name`. Cursor also auto-discovers subagents from `.claude/agents/` directly (no copy needed).

A well-optimized `description` prevents false triggers and ensures the right skill fires for the right task, regardless of tool.

## Current Skill/Agent Registry (canonical source: `.claude/`)

All 13 procedures exist as a real `SKILL.md` in all four trees. The 7 "agent" procedures additionally get a dedicated agent-format file for tools that distinguish agents from skills (Claude, Copilot) or read agents directly (Cursor).

| Name | Claude Code | Codex CLI | Cursor | GitHub Copilot |
|---|---|---|---|---|
| `react-components` | `.claude/skills/react-components/SKILL.md` | `.agents/skills/react-components/SKILL.md` | `.cursor/skills/react-components/SKILL.md` | `.github/skills/react-components/SKILL.md` |
| `a11y-automation` | `.claude/skills/a11y-automation/SKILL.md` | `.agents/skills/a11y-automation/SKILL.md` | `.cursor/skills/a11y-automation/SKILL.md` | `.github/skills/a11y-automation/SKILL.md` |
| `node-typescript-service` | `.claude/skills/node-typescript-service/SKILL.md` | `.agents/skills/node-typescript-service/SKILL.md` | `.cursor/skills/node-typescript-service/SKILL.md` | `.github/skills/node-typescript-service/SKILL.md` |
| `figma-component` | `.claude/skills/figma-component/SKILL.md` | `.agents/skills/figma-component/SKILL.md` | `.cursor/skills/figma-component/SKILL.md` | `.github/skills/figma-component/SKILL.md` |
| `skill-creator` | `.claude/skills/skill-creator/SKILL.md` | `.agents/skills/skill-creator/SKILL.md` | `.cursor/skills/skill-creator/SKILL.md` | `.github/skills/skill-creator/SKILL.md` |
| `ai-tool-setup` | `.claude/skills/ai-tool-setup/SKILL.md` | `.agents/skills/ai-tool-setup/SKILL.md` | `.cursor/skills/ai-tool-setup/SKILL.md` | `.github/skills/ai-tool-setup/SKILL.md` |
| `scan-workspace` | `.claude/skills/scan-workspace/SKILL.md` + `.claude/agents/scan-workspace.md` | `.agents/skills/scan-workspace/SKILL.md` | `.cursor/skills/scan-workspace/SKILL.md` (+ reads `.claude/agents/` directly) | `.github/skills/scan-workspace/SKILL.md` + `.github/agents/scan-workspace.agent.md` |
| `react-component-builder` | `.claude/skills/.../SKILL.md` + `.claude/agents/react-component-builder.md` | `.agents/skills/react-component-builder/SKILL.md` | `.cursor/skills/react-component-builder/SKILL.md` | `.github/skills/.../SKILL.md` + `.github/agents/react-component-builder.agent.md` |
| `figma-component-builder` | `.claude/agents/figma-component-builder.md` | `.agents/skills/figma-component-builder/SKILL.md` | `.cursor/skills/figma-component-builder/SKILL.md` | `.github/agents/figma-component-builder.agent.md` |
| `a11y-audit-react` | `.claude/agents/a11y-audit-react.md` | `.agents/skills/a11y-audit-react/SKILL.md` | `.cursor/skills/a11y-audit-react/SKILL.md` | `.github/agents/a11y-audit-react.agent.md` |
| `node-microservice-builder` | `.claude/agents/node-microservice-builder.md` | `.agents/skills/node-microservice-builder/SKILL.md` | `.cursor/skills/node-microservice-builder/SKILL.md` | `.github/agents/node-microservice-builder.agent.md` |
| `pr-reviewer` | `.claude/agents/pr-reviewer.md` | `.agents/skills/pr-reviewer/SKILL.md` | `.cursor/skills/pr-reviewer/SKILL.md` | `.github/agents/pr-reviewer.agent.md` |
| `code-reviewer` | `.claude/agents/code-reviewer.md` | `.agents/skills/code-reviewer/SKILL.md` | `.cursor/skills/code-reviewer/SKILL.md` | `.github/agents/code-reviewer.agent.md` |

Codex doesn't distinguish "agent" from "skill" — all 13 are Codex skills. `.cursor/commands/*.md` and `.github/prompts/*.prompt.md` still exist as lighter, explicit-only alternatives for a subset of these (see `.cursor/commands/` and `.github/prompts/`), but skills are now the primary mechanism in all four tools.

## Adding a New Skill

1. Author it once under `.claude/skills/<name>/` (the richest format — supports supporting files).
2. Run `python .claude/skills/skill-creator/scripts/validate-metadata.py <skillPath>` to verify.
3. Copy it into `.agents/skills/<name>/`, `.github/skills/<name>/`, and `.cursor/skills/<name>/` — trim Claude-specific frontmatter fields (`when_to_use`, `disable-model-invocation`, `allowed-tools`, `context: fork`) down to `name` + `description` (+ optional `paths` for Cursor, `license`/`allowed-tools` for Copilot if genuinely simple).
4. Add a row to this table and to the always-loaded routing sections of `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/workspace-policy.mdc`, and `AGENTS.md`.

## Project-Type to Skill Mapping

Used by the `scan-workspace` procedure after running `project-detect.mjs`:

```json
{
  "react":           ["react-components", "a11y-automation"],
  "node-typescript": ["node-typescript-service"],
  "java-maven":      [],
  "java-gradle":     [],
  "python":          [],
  "unknown":         []
}
```

Skills not in this map (like `skill-creator` and `ai-tool-setup`) are triggered by user intent, not project type.
