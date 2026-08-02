---
description: Scan a workspace folder to detect project type and route to the appropriate prompts and AI tool configurations
name: scan-workspace
tools: ["read", "search", "runCommands"]
---

# Scan Workspace Agent

## Purpose

Identify the project type within a target folder, determine which prompt files apply, and verify that AI tool instruction files (GitHub Copilot, Claude, Cursor, Codex CLI) are present and up to date.

## Inputs

- `targetFolder`: absolute or relative path to the project root.

## Outputs

JSON structure containing:
- `projectType`: detected type (e.g. `react`, `node-typescript`, `java-spring`, `python-fastapi`).
- `prompts`: list of applicable prompt-file identifiers.
- `aiTools`: status of AI instruction files present in the project.
- `warnings`: issues detected (missing dependencies, inconsistent configuration, missing AI tool files).

## Procedure

1. **Validate target folder** — verify it exists and is readable. If not, output an error and exit.
2. **Run project detection** — execute `node tools/project-detect.mjs <targetFolder>`. If it fails, check Node is available, verify the script path relative to the playbook root, and output stderr.
3. **Parse results** — extract `projectType`, `framework`, `language`, and config file paths.
4. **Map project type to prompts:**

   | Project Type | Prompts |
   |---|---|
   | `react` | `react-components`, `a11y-automation` |
   | `node-typescript` | `node-typescript-service` |
   | `java-spring` | (backend.instructions.md only; no dedicated prompt yet) |
   | `python-fastapi` | (backend.instructions.md only; no dedicated prompt yet) |
   | `unknown` | fallback to manual inspection |

5. **Check AI tool instruction files** exist in `targetFolder`:

   | AI Tool | File | Required |
   |---|---|---|
   | GitHub Copilot | `.github/copilot-instructions.md` | Recommended |
   | Claude Code | `CLAUDE.md` | Recommended |
   | Cursor | `.cursor/rules/*.mdc` | Optional |
   | OpenAI Codex CLI | `AGENTS.md` | Optional |

   For any missing recommended file, add a warning, e.g. `WARNING: .github/copilot-instructions.md not found. Run the ai-tool-setup prompt to generate it.`

6. **Apply scope guard** — execute `node tools/scope-guard.mjs <targetFolder>`. Abort and notify on violations.
7. **Output recommendations** — detected project type, recommended prompts, relevant instructions files, AI tool status. Example:

```json
{
  "projectType": "react",
  "framework": "vite",
  "language": "typescript",
  "prompts": ["react-components", "a11y-automation"],
  "instructions": [
    ".github/copilot-instructions.md",
    ".github/instructions/frontend.instructions.md"
  ],
  "aiTools": {
    "copilot": { "present": true, "path": ".github/copilot-instructions.md" },
    "claude":  { "present": true, "path": "CLAUDE.md" },
    "cursor":  { "present": false, "path": ".cursor/rules" }
  },
  "warnings": [
    "WARNING: .cursor/rules not found. Run the ai-tool-setup prompt to generate it."
  ]
}
```

## Error Handling

- **Folder not found**: output a clear error with the attempted path.
- **Detection script failure**: output stderr from `project-detect.mjs`.
- **Ambiguous project type**: list candidates and request clarification.
- **Missing AI tool files**: include in warnings; suggest running `.github/prompts/ai-tool-setup.prompt.md`.
