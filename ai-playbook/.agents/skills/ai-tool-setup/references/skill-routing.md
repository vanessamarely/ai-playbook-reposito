# Skill Routing Reference

## How Each Tool Selects a Skill/Agent/Rule

- **Claude Code**: reads the `name`/`description` (+ `when_to_use`) frontmatter of every `.claude/skills/*/SKILL.md` and decides which to load based on the conversation.
- **Codex CLI**: same mechanism, over `.agents/skills/*/SKILL.md` (`name`/`description` only).
- **Cursor**: `.cursor/rules/*.mdc` with `globs` auto-attach by file type; rules with `description` and no `globs` are "Agent Requested" (the agent decides); `.cursor/commands/*.md` only run when the user explicitly types `/name`.
- **GitHub Copilot**: `.github/instructions/*.instructions.md` auto-apply by `applyTo` glob; `.github/agents/*.agent.md` and `.github/prompts/*.prompt.md` only run when explicitly selected/invoked.

A well-optimized `description` prevents false triggers and ensures the right skill fires for the right task, regardless of tool.

## Current Skill/Agent Registry (canonical source: `.claude/`)

| Name | Claude | Codex | Cursor | Copilot |
|---|---|---|---|---|
| `react-components` | `.claude/skills/react-components/SKILL.md` | `.agents/skills/react-components/SKILL.md` | `.cursor/rules/react-components.mdc` (globs: `**/*.tsx`) | `.github/prompts/react-components.prompt.md` |
| `a11y-automation` | `.claude/skills/a11y-automation/SKILL.md` | `.agents/skills/a11y-automation/SKILL.md` | `.cursor/rules/a11y-automation.mdc` | `.github/prompts/a11y-automation.prompt.md` |
| `node-typescript-service` | `.claude/skills/node-typescript-service/SKILL.md` | `.agents/skills/node-typescript-service/SKILL.md` | `.cursor/rules/node-typescript-service.mdc` | `.github/prompts/node-typescript-service.prompt.md` |
| `figma-component` | `.claude/skills/figma-component/SKILL.md` | `.agents/skills/figma-component/SKILL.md` | `.cursor/rules/figma-component.mdc` | `.github/prompts/figma-component.prompt.md` |
| `skill-creator` | `.claude/skills/skill-creator/SKILL.md` | `.agents/skills/skill-creator/SKILL.md` | `.cursor/commands/skill-creator.md` | `.github/prompts/skill-creator.prompt.md` |
| `ai-tool-setup` | `.claude/skills/ai-tool-setup/SKILL.md` | `.agents/skills/ai-tool-setup/SKILL.md` | `.cursor/commands/ai-tool-setup.md` | `.github/prompts/ai-tool-setup.prompt.md` |
| `scan-workspace` (agent) | `.claude/agents/scan-workspace.md` | `.agents/skills/scan-workspace/SKILL.md` | `.cursor/commands/scan-workspace.md` | `.github/agents/scan-workspace.agent.md` |
| `react-component-builder` (agent) | `.claude/agents/react-component-builder.md` | `.agents/skills/react-component-builder/SKILL.md` | `.cursor/commands/react-component-builder.md` | `.github/agents/react-component-builder.agent.md` |
| `figma-component-builder` (agent) | `.claude/agents/figma-component-builder.md` | `.agents/skills/figma-component-builder/SKILL.md` | `.cursor/commands/figma-component-builder.md` | `.github/agents/figma-component-builder.agent.md` |
| `a11y-audit-react` (agent) | `.claude/agents/a11y-audit-react.md` | `.agents/skills/a11y-audit-react/SKILL.md` | `.cursor/commands/a11y-audit-react.md` | `.github/agents/a11y-audit-react.agent.md` |
| `node-microservice-builder` (agent) | `.claude/agents/node-microservice-builder.md` | `.agents/skills/node-microservice-builder/SKILL.md` | `.cursor/commands/node-microservice-builder.md` | `.github/agents/node-microservice-builder.agent.md` |
| `pr-reviewer` (agent) | `.claude/agents/pr-reviewer.md` | `.agents/skills/pr-reviewer/SKILL.md` | `.cursor/commands/pr-reviewer.md` | `.github/agents/pr-reviewer.agent.md` |
| `code-reviewer` (agent) | `.claude/agents/code-reviewer.md` | `.agents/skills/code-reviewer/SKILL.md` | `.cursor/commands/code-reviewer.md` | `.github/agents/code-reviewer.agent.md` |

Codex doesn't distinguish "agent" from "skill" — the 7 agents above are all Codex skills too. Cursor's 4 file-type-triggered skills (`react-components`, `a11y-automation`, `node-typescript-service`, `figma-component`) are rules (auto-attach); everything else that's an explicit multi-step action is a command.

## Adding a New Skill

1. Author it once under `.claude/skills/<name>/` (the richest format — supports supporting files).
2. Run `python .claude/skills/skill-creator/scripts/validate-metadata.py <skillPath>` to verify.
3. Adapt it to the other three trees using the mapping above and the frontmatter rules in [tool-formats.md](tool-formats.md).
4. Add a row to this table and to the routing sections of `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, and `AGENTS.md`.

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
