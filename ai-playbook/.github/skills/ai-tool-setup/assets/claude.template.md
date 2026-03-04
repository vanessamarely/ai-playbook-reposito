# Claude AI Instructions

This repository contains an **AI Playbook** for AI-assisted development.

## Quick Start

1. Run `node ai-playbook/tools/project-detect.mjs <targetFolder>` to identify the project type.
2. Load the matching skill from `ai-playbook/.github/skills/<name>/SKILL.md`.
3. Apply `ai-playbook/.github/copilot-instructions/workspace-policy.md` for scope rules.

## Skill Routing

| Task | Skill |
|------|-------|
<!-- SKILL_ROUTING_TABLE -->

## Agent Routing

| Task | Agent |
|------|-------|
<!-- AGENT_ROUTING_TABLE -->

## Core Rules

- Operate only within the stated target folder.
- Produce the smallest possible changeset.
- All frontend changes must meet WCAG 2.2 Level AA.
- Never commit, log, or output secrets or credentials.
- Suggest verification commands after each change.

## Progressive Context Loading

Load files only when needed to keep the context window lean:
- High-level procedure → `SKILL.md`
- Dense reference material → `references/<topic>.md`
- Output templates → `assets/<template>`
- Deterministic scripts → `scripts/<tool>` (execute, do not inline)

## Tech Stack

<!-- PROJECT_TECH_STACK -->

See `docs/PROJECT_CONTEXT.md` for full details.
