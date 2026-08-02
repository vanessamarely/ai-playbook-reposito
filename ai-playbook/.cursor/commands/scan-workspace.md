# Scan Workspace

Identify the project type within a target folder, determine which rules/commands apply, and verify that AI tool instruction files (GitHub Copilot, Claude Code, Cursor, OpenAI Codex CLI) are present and up to date.

## Inputs

- `targetFolder`: absolute or relative path to the project root.

## Outputs

A structured report containing:
- `projectType`: detected type (e.g., `react`, `node-typescript`, `java-spring`, `python-fastapi`).
- `rules`/`commands`: applicable Cursor rules and commands for this project type.
- `aiTools`: presence/absence of each AI tool's instruction files.
- `warnings`: issues detected (missing dependencies, inconsistent configuration, missing AI tool files).

## Procedure

1. **Validate the target folder** — verify it exists and is readable. If validation fails, report the error and stop.
2. **Detect the project type** — inspect the folder for `package.json` (+ `tsconfig.json` for TypeScript, and dependencies for React/Express/Nest/Fastify), `pom.xml`/`build.gradle` (Java), `pyproject.toml`/`setup.py`/`requirements.txt` (Python). Extract `projectType`, `framework`, `language`.
3. **Map to rules and commands**:

   | Project Type | Auto-loaded rules | Relevant commands |
   |---|---|---|
   | `react` | `react-components`, `a11y-automation`, `frontend-policy` | `/react-component-builder`, `/a11y-audit-react`, `/figma-component-builder` |
   | `node-typescript` | `node-typescript-service`, `backend-policy` | `/node-microservice-builder` |
   | `java-spring` / `python-fastapi` | `backend-policy` only (no dedicated rule yet) | — |
   | `unknown` | — | fall back to manual inspection |

4. **Check AI tool instruction files** in `targetFolder`:

   | AI Tool | File(s) |
   |---|---|
   | GitHub Copilot | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` |
   | Claude Code | `CLAUDE.md`, `.claude/` |
   | Cursor | `.cursor/rules/*.mdc` |
   | OpenAI Codex CLI | `AGENTS.md`, `.agents/skills/` |

   For each missing file, add a warning, e.g. `.cursor/rules/ not found or empty. Run /ai-tool-setup to generate it.`

5. **Report recommendations**: detected project type, list of rules/commands that apply, relevant policy rules, and AI tool instruction file status. Example:
   ```json
   {
     "projectType": "react",
     "framework": "vite",
     "language": "typescript",
     "rules": ["react-components", "a11y-automation", "frontend-policy"],
     "aiTools": {
       "copilot": { "present": true, "path": ".github/copilot-instructions.md" },
       "claude": { "present": true, "path": "CLAUDE.md" },
       "cursor": { "present": false, "path": ".cursor/rules/" }
     },
     "warnings": [".cursor/rules/ not found. Run /ai-tool-setup to generate it."]
   }
   ```

## Error Handling

- **Folder not found**: report the attempted path clearly.
- **Ambiguous project type**: list candidates and ask for clarification.
- **Missing AI tool files**: include in warnings; suggest running `/ai-tool-setup`.
