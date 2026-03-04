# Workspace Policy

## Supported AI Tools

This playbook supports multiple AI coding assistants. The following files serve as the primary instruction entry point for each tool:

| AI Tool | Instruction File | Location |
|---|---|---|
| GitHub Copilot | `copilot-instructions.md` | `<repo-root>/.github/copilot-instructions.md` |
| Claude (Code / claude.ai) | `CLAUDE.md` | `<repo-root>/CLAUDE.md` |
| Cursor IDE | `.cursorrules` | `<repo-root>/.cursorrules` |
| Windsurf (Codeium) | `.windsurfrules` | `<repo-root>/.windsurfrules` |

All of these files reference the same playbook skills and policies. Use the `ai-tool-setup` skill to generate or refresh them:
```
Skill: ai-playbook/.github/skills/ai-tool-setup/SKILL.md
```

## Scope Enforcement

The agent operates within a multi-repository workspace structure. Each target project is isolated.

### Project Isolation Rules

1. Identify the target project folder before making any changes.
2. Restrict all file operations to that folder and its descendants.
3. Never traverse upward beyond the target project root.
4. Never modify files in sibling projects unless explicitly instructed.

### Exclusion Patterns

Ignore the following directories during analysis and modification:

- `node_modules/`
- `dist/`, `build/`, `out/`
- `.next/`, `.nuxt/`, `.vite/`
- `coverage/`, `.nyc_output/`
- `.venv/`, `venv/`, `__pycache__/`
- `target/` (Java)
- `.git/`, `.svn/`
- `*.log`, `*.tmp`

### Target Folder Selection Protocol

1. If a specific folder path is provided, validate it exists.
2. If working from a file path, extract the project root by locating:
   - `package.json` (Node/JavaScript)
   - `pom.xml` or `build.gradle` (Java)
   - `pyproject.toml` or `setup.py` (Python)
   - `.git/` as fallback
3. If ambiguous, request explicit clarification before proceeding.
4. Store the resolved target root for the session.

### Cross-Folder Refactor Prohibition

Do NOT perform changes across multiple project folders unless:
- Explicitly requested by the user.
- A workspace-level coordination task is clearly specified.

Default behavior: operate on a single project at a time.

### Scope Validation

Before committing changes:
1. Run `tools/scope-guard.mjs` with the list of modified file paths.
2. Verify all paths are within the target root.
3. Abort if scope violation detected.

