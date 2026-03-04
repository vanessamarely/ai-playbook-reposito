# GitHub Copilot Instructions

This repository contains an **AI Playbook** — agents, skills, and policies for AI-assisted development.

## Repository Layout

```
ai-playbook/
├── .github/
│   ├── agents/              # Agent definitions (AGENT.md)
│   ├── copilot-instructions/# Policy files
│   ├── skills/              # Skill definitions (SKILL.md + references + assets + scripts)
│   └── specs/               # Specification templates
├── tools/                   # Shared CLI utilities
docs/                        # Project documentation
src/                         # Application source
```

## Skill Routing

| Task | Skill |
|------|-------|
<!-- SKILL_ROUTING_TABLE -->

## Universal Rules

- Operate only within the target project folder.
- Produce minimal diffs — change only what is necessary.
- Never hardcode secrets or credentials.
- Suggest verification commands after changes.
- Follow WCAG 2.2 Level AA for all frontend work.

## Policy Files

- `ai-playbook/.github/copilot-instructions/workspace-policy.md` — scope enforcement (always load)
- `ai-playbook/.github/copilot-instructions/frontend-policy.md` — React/TypeScript standards
- `ai-playbook/.github/copilot-instructions/backend-policy.md` — Node/Java/Python conventions
- `ai-playbook/.github/copilot-instructions/style-output.md` — output formatting rules
