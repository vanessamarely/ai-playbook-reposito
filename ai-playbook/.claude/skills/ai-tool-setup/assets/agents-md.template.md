# AGENTS.md Template (OpenAI Codex CLI, also read by GitHub Copilot CLI)

Codex loads `AGENTS.md` from the repo root and merges in any nearer `AGENTS.md` found between the repo root and the current working directory (the nearest file wins on conflicts). Use nested files for path-specific overrides instead of frontmatter — Codex has none for this file.

## Root `AGENTS.md`

```markdown
# AGENTS.md

## Skill Routing

Detect project type: `node ai-playbook/tools/project-detect.mjs <targetFolder>`

| Task | Skill |
|------|-------|
<!-- SKILL_ROUTING_TABLE -->

Skills live in `.agents/skills/<name>/SKILL.md` — Codex discovers them automatically.

## Scope Enforcement
- Only modify files within the stated target project folder.
- Run `node ai-playbook/tools/scope-guard.mjs <targetFolder> <changedFiles...>` before finalizing.

## Code Style
- Minimal diffs: change only necessary lines.
- No mass reformatting or unrelated refactors.

## Security
- Never hardcode secrets, API keys, or passwords.
- Validate and sanitize all user inputs.

<!-- TEST_COMMANDS -->
```

## Optional nested override, e.g. `src/AGENTS.md`

```markdown
# AGENTS.md (src/)

<!-- FRONTEND_RULES -->
```

Codex applies the root file first, then this nested file's content afterward for anything under `src/`, so the nested file only needs to state what's different or additional — it doesn't need to repeat the root rules.

## Policy Source

- `ai-playbook/policies/workspace-policy.md`
- `ai-playbook/policies/frontend-policy.md`
- `ai-playbook/policies/backend-policy.md`
- `ai-playbook/policies/style-output.md`
