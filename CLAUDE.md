# Claude AI Instructions

This repository is the **AI Playbook** — a reference guide (this Vite/React app) plus a portable example package at `ai-playbook/` demonstrating the correct file structure for GitHub Copilot, Claude Code, Cursor, and OpenAI Codex CLI. The example package inside `ai-playbook/` is a **template to copy into other projects**, not live configuration for this repository's own React app.

## Quick Start

When asked to perform a development task on the example package itself:

1. Run `node ai-playbook/tools/project-detect.mjs <targetFolder>` to identify a target project's type.
2. Load the matching skill from `ai-playbook/.claude/skills/<name>/SKILL.md` (the canonical, richest-format source — the other three tool trees are adapted from it).
3. Apply `ai-playbook/policies/workspace-policy.md` for scope rules.
4. Apply the appropriate domain policy (`frontend-policy.md` or `backend-policy.md`).

When asked to work on *this repository's own app* (the guide UI under `src/`), see [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) for the tech stack — no playbook lookup needed.

## Skill Routing (canonical source: `ai-playbook/.claude/skills/`)

| Task | Skill |
|------|-------|
| React component (create/modify) | `ai-playbook/.claude/skills/react-components/SKILL.md` |
| Accessibility testing | `ai-playbook/.claude/skills/a11y-automation/SKILL.md` |
| Node.js/TypeScript service | `ai-playbook/.claude/skills/node-typescript-service/SKILL.md` |
| Figma → component | `ai-playbook/.claude/skills/figma-component/SKILL.md` |
| New skill scaffolding | `ai-playbook/.claude/skills/skill-creator/SKILL.md` |
| AI tool configuration (all 4 tools) | `ai-playbook/.claude/skills/ai-tool-setup/SKILL.md` |

## Agent Routing (canonical source: `ai-playbook/.claude/agents/`)

| Task | Agent |
|------|-------|
| Accessibility audit on React components | `ai-playbook/.claude/agents/a11y-audit-react.md` |
| Convert Figma designs into components | `ai-playbook/.claude/agents/figma-component-builder.md` |
| Pull request review | `ai-playbook/.claude/agents/pr-reviewer.md` |
| Build a React component | `ai-playbook/.claude/agents/react-component-builder.md` |
| Build a Node microservice | `ai-playbook/.claude/agents/node-microservice-builder.md` |
| Review source code quality | `ai-playbook/.claude/agents/code-reviewer.md` |
| Detect workspace type | `ai-playbook/.claude/agents/scan-workspace.md` |

## Other Tool Trees (adapted from the canonical Claude source above)

- **GitHub Copilot**: `ai-playbook/.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, `.github/agents/*.agent.md`, `.github/prompts/*.prompt.md`
- **Cursor**: `ai-playbook/.cursor/rules/*.mdc`, `.cursor/commands/*.md`
- **OpenAI Codex CLI**: `ai-playbook/AGENTS.md` (+ nested `src/AGENTS.md` demo), `.agents/skills/*/SKILL.md`

When adding or changing a procedure, edit the canonical `.claude/` version first, then port the change to the other three trees — see `ai-playbook/.claude/skills/ai-tool-setup/references/skill-routing.md` for the full mapping table.

## Core Rules

- Operate only within the stated target folder; never modify sibling projects.
- Produce the smallest possible changeset to accomplish a task.
- All frontend changes must meet WCAG 2.2 Level AA accessibility standards.
- Never log, commit, or output secrets, tokens, or credentials.
- Suggest verification commands (`npm run lint`, `npm test`, `npm run build`) after each change.

## Progressive Context Loading

Load files **only when needed** to keep the context window lean:
- High-level procedure → `SKILL.md`
- Dense reference material → `references/<topic>.md` (referenced from SKILL.md)
- Output templates → `assets/<template>` (referenced from SKILL.md)
- Deterministic scripts → `scripts/<tool>` (executed, not inlined)

## Project Tech Stack

- **React 19 + TypeScript 5** with Vite
- **Tailwind CSS 4** for styling
- **shadcn/ui** as the component foundation
- **Vitest + React Testing Library + jest-axe** for testing
- See `docs/PROJECT_CONTEXT.md` for full details.
