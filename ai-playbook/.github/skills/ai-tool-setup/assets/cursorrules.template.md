# Cursor Rules

## Overview
This repository uses an AI Playbook. Follow these rules when assisting with any task.

## Skill Routing
Before implementing, check project type and load the relevant skill:

<!-- SKILL_ROUTING_RULES -->

Detect project type: `node ai-playbook/tools/project-detect.mjs <targetFolder>`

## Scope Enforcement
- Only modify files within the stated target project folder.
- Run `node ai-playbook/tools/scope-guard.mjs <targetFolder> <changedFiles...>` before finalizing.

## Code Style
- Minimal diffs: change only necessary lines.
- No mass reformatting or unrelated refactors.
- Forward slashes in all file paths.

<!-- FRONTEND_RULES -->

<!-- BACKEND_RULES -->

## Security
- Never hardcode secrets, API keys, or passwords.
- Validate and sanitize all user inputs.

## Testing
<!-- TEST_COMMANDS -->

## Policy Files
For detailed rules:
- `ai-playbook/.github/copilot-instructions/workspace-policy.md`
- `ai-playbook/.github/copilot-instructions/frontend-policy.md`
- `ai-playbook/.github/copilot-instructions/backend-policy.md`
- `ai-playbook/.github/copilot-instructions/style-output.md`
