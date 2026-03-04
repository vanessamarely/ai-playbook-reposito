# AI Tool Instruction Formats

## GitHub Copilot — `copilot-instructions.md`

**Location:** `<repo-root>/.github/copilot-instructions.md`

**Loaded by:** GitHub Copilot when the file exists in the repository's `.github/` directory.

**Format:**
- Plain Markdown (no YAML frontmatter required).
- Copilot reads the full file; keep it under ~200 lines to avoid context overhead.
- Use headings and tables for easy scanning.
- Reference skill and policy files with relative paths from the repo root.

**Key sections to include:**
1. Repository layout (directory tree or table)
2. Skill routing table (task → SKILL.md path)
3. Universal rules (scope, security, output style)
4. Policy file pointers

**Docs:** https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot

---

## Claude — `CLAUDE.md`

**Location:** `<repo-root>/CLAUDE.md`

**Loaded by:** Claude Code and claude.ai when the file exists at the project root.

**Format:**
- Plain Markdown. No special frontmatter required.
- Claude reads the full file at session start; keep it focused and actionable.
- Use imperative instructions ("Run X", "Load Y", "Never do Z").
- Reference skill files by relative path.

**Key sections to include:**
1. Quick start (detect → load skill → apply policy)
2. Skill routing table
3. Agent routing table
4. Core rules
5. Progressive context loading guidance
6. Tech stack summary with link to `docs/PROJECT_CONTEXT.md`

**Docs:** https://docs.anthropic.com/en/docs/claude-code/memory

---

## Cursor — `.cursorrules`

**Location:** `<repo-root>/.cursorrules`

**Loaded by:** Cursor IDE when the file exists at the project root.

**Format:**
- Plain text or Markdown. Cursor reads this as a system prompt prefix.
- Keep rules concise — verbose rules dilute specificity.
- Group rules by category (scope, code style, security, testing).
- Reference policy files for detail; do not inline them.

**Key sections to include:**
1. Skill routing instructions
2. Scope enforcement
3. Code style rules
4. Frontend standards (if applicable)
5. Backend standards (if applicable)
6. Security rules
7. Testing commands

**Docs:** https://docs.cursor.com/context/rules-for-ai

---

## Windsurf — `.windsurfrules`

**Location:** `<repo-root>/.windsurfrules`

**Loaded by:** Windsurf IDE (Codeium) when the file exists at the project root.

**Format:** Same as `.cursorrules` — plain Markdown, imperative instructions.

**Docs:** https://docs.windsurf.com/windsurf/memories

---

## VS Code Copilot (Workspace Instructions)

**Location:** `.github/copilot-instructions.md` (same as the root-level file above).

GitHub Copilot in VS Code automatically loads `.github/copilot-instructions.md` from the repository root. No additional configuration is needed.
