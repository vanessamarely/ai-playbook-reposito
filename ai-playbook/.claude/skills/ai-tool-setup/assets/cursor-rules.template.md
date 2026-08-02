# Cursor Rules Template

Cursor reads every `.mdc` file in `.cursor/rules/`, not a single file. Generate one file per policy below (the legacy single `.cursorrules` file is deprecated and ignored by Agent mode).

## `.cursor/rules/workspace-policy.mdc`

```
---
description: Workspace scope and skill routing for the AI Playbook
alwaysApply: true
---

# Workspace Policy

Before implementing, detect project type and load the relevant rule/command:

<!-- SKILL_ROUTING_RULES -->

Detect project type: `node ai-playbook/tools/project-detect.mjs <targetFolder>`

## Scope Enforcement
- Only modify files within the stated target project folder.
- Run `node ai-playbook/tools/scope-guard.mjs <targetFolder> <changedFiles...>` before finalizing.

## Security
- Never hardcode secrets, API keys, or passwords.
- Validate and sanitize all user inputs.
```

## `.cursor/rules/style-output.mdc`

```
---
description: Output style and diff conventions
alwaysApply: true
---

- Minimal diffs: change only necessary lines.
- No mass reformatting or unrelated refactors.
- Forward slashes in all file paths.

<!-- TEST_COMMANDS -->
```

## `.cursor/rules/frontend-policy.mdc` (only if project is frontend)

```
---
description: React/TypeScript standards and WCAG 2.2 accessibility
globs: "**/*.tsx,**/*.ts"
---

<!-- FRONTEND_RULES -->
```

## `.cursor/rules/backend-policy.mdc` (only if project is backend)

```
---
description: Node/Java/Python backend conventions
globs: "server/**,services/**"
---

<!-- BACKEND_RULES -->
```

## Policy Source

- `ai-playbook/policies/workspace-policy.md`
- `ai-playbook/policies/frontend-policy.md`
- `ai-playbook/policies/backend-policy.md`
- `ai-playbook/policies/style-output.md`
