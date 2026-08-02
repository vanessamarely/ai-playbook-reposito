# GitHub Copilot Instructions

This repository contains an **AI Playbook** — agents, prompts, and policies for AI-assisted development.

## Repository Layout

```
ai-playbook/
├── .github/
│   ├── copilot-instructions.md   # This file
│   ├── instructions/              # Path-specific rules (applyTo glob)
│   ├── agents/                    # Custom agents (*.agent.md)
│   └── prompts/                   # Reusable prompt files (*.prompt.md)
├── policies/                      # Shared policy source (tool-agnostic)
├── tools/                         # Shared CLI utilities
docs/                               # Project documentation
src/                                 # Application source
```

## Skill Routing (as prompt files)

| Task | Prompt |
|------|-------|
<!-- SKILL_ROUTING_TABLE -->

## Universal Rules

- Operate only within the target project folder.
- Produce minimal diffs — change only what is necessary.
- Never hardcode secrets or credentials.
- Suggest verification commands after changes.
- Follow WCAG 2.2 Level AA for all frontend work.

## Path-Specific Instructions

- `.github/instructions/frontend.instructions.md` (`applyTo: "**/*.tsx,**/*.ts"`) — React/TypeScript standards
- `.github/instructions/backend.instructions.md` (`applyTo: "server/**,services/**"`) — Node/Java/Python conventions

## Policy Source

- `ai-playbook/policies/workspace-policy.md` — scope enforcement (always load)
- `ai-playbook/policies/style-output.md` — output formatting rules
