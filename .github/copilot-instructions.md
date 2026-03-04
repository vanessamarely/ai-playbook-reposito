# GitHub Copilot Instructions

This repository contains an **AI Playbook** — a structured collection of agents, skills, and policies designed to help developers work effectively with AI coding assistants.

## Repository Layout

```
ai-playbook/
├── .github/
│   ├── agents/              # Agent definitions (AGENT.md files)
│   ├── copilot-instructions/# Policy files loaded by agents
│   ├── skills/              # Skill definitions (SKILL.md + references + assets + scripts)
│   └── specs/               # Specification templates
├── tools/                   # Shared Node.js utilities (project-detect, scope-guard, diagnostics-summarizer)
docs/                        # Project documentation
src/                         # React + TypeScript application source
```

## How to Use This Playbook

When responding to requests in this repository, load and follow the relevant skill or agent from `ai-playbook/.github/`:

1. **Detect the project type** by running `node ai-playbook/tools/project-detect.mjs <targetFolder>`.
2. **Load the matching skill** from `ai-playbook/.github/skills/<skill-name>/SKILL.md`.
3. **Apply workspace policies** from `ai-playbook/.github/copilot-instructions/workspace-policy.md`.
4. **Apply domain policies** (frontend or backend) as appropriate.

## Skill Routing

| Task | Skill to Load |
|------|--------------|
| Build or modify React components | `ai-playbook/.github/skills/react-components/SKILL.md` |
| Run or integrate accessibility tests | `ai-playbook/.github/skills/a11y-automation/SKILL.md` |
| Create or extend Node.js/TypeScript services | `ai-playbook/.github/skills/node-typescript-service/SKILL.md` |
| Create a new skill | `ai-playbook/.github/skills/skill-creator/SKILL.md` |
| Configure AI tool instructions | `ai-playbook/.github/skills/ai-tool-setup/SKILL.md` |

## Universal Rules

- Restrict file operations to the target project folder; never traverse above it.
- Produce minimal diffs — change only what is necessary.
- Never hardcode secrets or credentials.
- Always suggest verification commands after changes.
- Follow WCAG 2.2 Level AA for all frontend work.

## Policy Files

For full details on each domain, load:
- `ai-playbook/.github/copilot-instructions/workspace-policy.md` — scope enforcement (always)
- `ai-playbook/.github/copilot-instructions/frontend-policy.md` — React/TypeScript standards
- `ai-playbook/.github/copilot-instructions/backend-policy.md` — Node/Java/Python conventions
- `ai-playbook/.github/copilot-instructions/style-output.md` — output formatting rules
