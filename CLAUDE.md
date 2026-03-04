# Claude AI Instructions

This repository contains an **AI Playbook** — a structured collection of agents, skills, and policies designed to help developers work effectively with AI coding assistants including Claude.

## Quick Start

When asked to perform a development task, follow this sequence:

1. Run `node ai-playbook/tools/project-detect.mjs <targetFolder>` to identify the project type.
2. Load the matching skill from `ai-playbook/.github/skills/<name>/SKILL.md`.
3. Apply `ai-playbook/.github/copilot-instructions/workspace-policy.md` for scope rules.
4. Apply the appropriate domain policy (`frontend-policy.md` or `backend-policy.md`).

## Skill Routing

| Task | Skill |
|------|-------|
| React component (create/modify) | `ai-playbook/.github/skills/react-components/SKILL.md` |
| Accessibility testing | `ai-playbook/.github/skills/a11y-automation/SKILL.md` |
| Node.js/TypeScript service | `ai-playbook/.github/skills/node-typescript-service/SKILL.md` |
| New skill scaffolding | `ai-playbook/.github/skills/skill-creator/SKILL.md` |
| AI tool configuration | `ai-playbook/.github/skills/ai-tool-setup/SKILL.md` |

## Agent Routing

| Task | Agent |
|------|-------|
| Accessibility audit on React components | `ai-playbook/.github/agents/a11y-audit-react/AGENT.md` |
| Pull request review | `ai-playbook/.github/agents/pr-reviewer/AGENT.md` |
| Build a React component | `ai-playbook/.github/agents/react-component-builder/AGENT.md` |
| Build a Node microservice | `ai-playbook/.github/agents/node-microservice-builder/AGENT.md` |
| Detect workspace type | `ai-playbook/.github/agents/scan-workspace/AGENT.md` |

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
