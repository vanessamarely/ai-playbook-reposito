# AGENTS.md

This repository is the AI Playbook: a reference guide app (this React/Vite project, under `src/`) plus a portable example package at `ai-playbook/` demonstrating the correct file structure for GitHub Copilot, Claude Code, Cursor, and OpenAI Codex CLI.

## Working on this repo's own app (`src/`)

React 19 + TypeScript + Vite, Tailwind CSS, shadcn/ui. See `docs/PROJECT_CONTEXT.md` for the full stack.

## Working on the example package (`ai-playbook/`)

The canonical source for every agent/skill is `ai-playbook/.claude/skills/` and `ai-playbook/.claude/agents/`. Edit there first, then port the change to `ai-playbook/.github/`, `ai-playbook/.cursor/`, and `ai-playbook/AGENTS.md` + `ai-playbook/.agents/skills/` — see `ai-playbook/.claude/skills/ai-tool-setup/references/skill-routing.md` for the full mapping.

Detect project type: `node ai-playbook/tools/project-detect.mjs <targetFolder>`

## Scope

- Only modify files within the stated target project folder.
- Run `node ai-playbook/tools/scope-guard.mjs <targetFolder> <changedFiles...>` before finalizing changes to the example package.
- Minimal diffs — change only what's necessary.
- Never hardcode secrets, API keys, or passwords.

## Verification

- `npm test`
- `npm run lint`
- `npx tsc --noEmit`
