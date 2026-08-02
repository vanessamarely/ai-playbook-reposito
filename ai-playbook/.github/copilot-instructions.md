# Copilot Instructions — AI Playbook

This repository is an **AI Playbook**: a structured collection of custom agents, prompt files, skills, and policies for working with GitHub Copilot on this codebase. This file is always loaded by Copilot; it stays short and points to deeper material on demand.

## Native Skill Discovery (2026+)

As of 2026, GitHub Copilot natively discovers `SKILL.md` files — the same open Agent Skills format used by Claude Code and Codex CLI — from project-level `.github/skills/`, `.claude/skills/`, and `.agents/skills/` (plus personal `~/.copilot/skills/` and `~/.agents/skills/`), checked in that order. This repository's Copilot-native skills live under [`.github/skills/`](.github/skills/); see the routing table below. The existing `.github/agents/*.agent.md` custom agents and `.github/prompts/*.prompt.md` prompt files remain valid, lightweight, single-file alternatives — but skills are now the more powerful modern option since Copilot reads them natively, including any bundled `references/`, `assets/`, and `scripts/` alongside `SKILL.md`.

## Scope Enforcement

- Identify the target project folder before making any changes; restrict all file operations to that folder and its descendants.
- Never traverse upward beyond the target project root, and never modify sibling projects unless explicitly instructed.
- Ignore these directories during analysis and edits: `node_modules/`, `dist/`, `build/`, `out/`, `.next/`, `.nuxt/`, `.vite/`, `coverage/`, `.nyc_output/`, `.venv/`, `venv/`, `__pycache__/`, `target/`, `.git/`, `.svn/`, `*.log`, `*.tmp`.
- If a target folder isn't specified, derive the project root from the nearest `package.json`, `pom.xml`/`build.gradle`, `pyproject.toml`/`setup.py`, or `.git/`. If ambiguous, ask before proceeding.
- Do not perform changes across multiple project folders unless explicitly requested or the task is clearly workspace-level.

## Output Style

- Produce the smallest possible changeset to accomplish the task — modify only the lines necessary, don't reformat unrelated code, don't reorder imports or rename things outside scope. Broader changes are fine only when the user explicitly asks for refactoring/cleanup.
- All file paths in output should be relative to the target project root, use forward slashes, and omit a leading `./` unless required.
- Do not run automatic formatters (Prettier, Black, gofmt) unless a pre-commit hook already enforces them or the user asks for it. Preserve existing code style.
- Avoid unrelated refactors: don't extract functions "for cleanliness," split files, or introduce design patterns unless the change actually requires it.
- After proposing changes, suggest the specific verification commands for the project's tooling (e.g. `npm run lint`, `tsc --noEmit`, `npm test`, `npm run build`).
- For complex, multi-file, or architectural changes: outline the approach, files to touch, and high-level steps before executing. For simple, single-file fixes: proceed directly.
- When something fails, state the error, the likely cause, and a proposed fix — don't guess silently or produce vague messages like "something went wrong."
- Never log, commit, or output secrets, tokens, or credentials.

## Routing — Skills (native SKILL.md)

Copilot loads these automatically based on `name`/`description` frontmatter — no explicit invocation needed, though `.github/skills/<name>/SKILL.md` can also be opened directly for reference:

| Task | Skill |
|---|---|
| React component (create/modify) | [`.github/skills/react-components/SKILL.md`](.github/skills/react-components/SKILL.md) |
| Accessibility testing automation | [`.github/skills/a11y-automation/SKILL.md`](.github/skills/a11y-automation/SKILL.md) |
| Node.js/TypeScript service | [`.github/skills/node-typescript-service/SKILL.md`](.github/skills/node-typescript-service/SKILL.md) |
| Figma → component conventions | [`.github/skills/figma-component/SKILL.md`](.github/skills/figma-component/SKILL.md) |
| New skill scaffolding | [`.github/skills/skill-creator/SKILL.md`](.github/skills/skill-creator/SKILL.md) |
| AI tool configuration (all 4 tools) | [`.github/skills/ai-tool-setup/SKILL.md`](.github/skills/ai-tool-setup/SKILL.md) |
| Detect workspace/project type and recommend skills | [`.github/skills/scan-workspace/SKILL.md`](.github/skills/scan-workspace/SKILL.md) |
| Build a React component (full workflow) | [`.github/skills/react-component-builder/SKILL.md`](.github/skills/react-component-builder/SKILL.md) |
| Convert Figma designs into components (full workflow) | [`.github/skills/figma-component-builder/SKILL.md`](.github/skills/figma-component-builder/SKILL.md) |
| Accessibility audit on React components | [`.github/skills/a11y-audit-react/SKILL.md`](.github/skills/a11y-audit-react/SKILL.md) |
| Build a Node.js/TypeScript microservice endpoint | [`.github/skills/node-microservice-builder/SKILL.md`](.github/skills/node-microservice-builder/SKILL.md) |
| Pull request review | [`.github/skills/pr-reviewer/SKILL.md`](.github/skills/pr-reviewer/SKILL.md) |
| Five-axis source code quality review | [`.github/skills/code-reviewer/SKILL.md`](.github/skills/code-reviewer/SKILL.md) |

## Routing — Custom Agents

Use `@<agent-name>` (Copilot Chat custom agent) or select the agent for the matching task:

| Task | Agent |
|---|---|
| Detect workspace/project type and recommend skills | [`.github/agents/scan-workspace.agent.md`](.github/agents/scan-workspace.agent.md) |
| Build a React component | [`.github/agents/react-component-builder.agent.md`](.github/agents/react-component-builder.agent.md) |
| Convert Figma designs into components | [`.github/agents/figma-component-builder.agent.md`](.github/agents/figma-component-builder.agent.md) |
| Accessibility audit on React components | [`.github/agents/a11y-audit-react.agent.md`](.github/agents/a11y-audit-react.agent.md) |
| Build a Node.js/TypeScript microservice endpoint | [`.github/agents/node-microservice-builder.agent.md`](.github/agents/node-microservice-builder.agent.md) |
| Pull request review | [`.github/agents/pr-reviewer.agent.md`](.github/agents/pr-reviewer.agent.md) |
| Five-axis source code quality review | [`.github/agents/code-reviewer.agent.md`](.github/agents/code-reviewer.agent.md) |

## Routing — Prompt Files

Run with `/<prompt-name>` in Copilot Chat:

| Task | Prompt |
|---|---|
| React component conventions & a11y patterns | [`.github/prompts/react-components.prompt.md`](.github/prompts/react-components.prompt.md) |
| Automated accessibility testing (lint + axe) | [`.github/prompts/a11y-automation.prompt.md`](.github/prompts/a11y-automation.prompt.md) |
| Node.js/TypeScript service conventions | [`.github/prompts/node-typescript-service.prompt.md`](.github/prompts/node-typescript-service.prompt.md) |
| Scaffold a new agent/skill/prompt procedure | [`.github/prompts/skill-creator.prompt.md`](.github/prompts/skill-creator.prompt.md) |
| Generate/refresh AI tool instruction files (all 4 tools) | [`.github/prompts/ai-tool-setup.prompt.md`](.github/prompts/ai-tool-setup.prompt.md) |
| Figma-to-code conversion conventions | [`.github/prompts/figma-component.prompt.md`](.github/prompts/figma-component.prompt.md) |

## Path-Specific Instructions

Copilot auto-applies these based on the file being edited (see `applyTo` glob in each):

| File | Applies To |
|---|---|
| [`.github/instructions/frontend.instructions.md`](.github/instructions/frontend.instructions.md) | `**/*.tsx`, `**/*.ts` |
| [`.github/instructions/backend.instructions.md`](.github/instructions/backend.instructions.md) | `server/**`, `services/**`, `**/*.service.ts` |

## Core Rules Summary

- All frontend changes must meet WCAG 2.2 Level AA accessibility standards.
- Backend services follow the conventions of their detected language/framework (Node/TS, Java, Python) — do not apply frontend rules to backend code or vice versa.
- Prefer minimal diffs and always propose verification commands after a change.
