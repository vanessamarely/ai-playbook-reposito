# AI Tool Instruction Formats (verified against official docs)

## GitHub Copilot

| Purpose | Path | Frontmatter |
|---|---|---|
| Repo-wide instructions (auto-loaded) | `.github/copilot-instructions.md` | None — plain Markdown |
| Path-specific instructions | `.github/instructions/<name>.instructions.md` | `applyTo: "<glob>"` (required), `excludeAgent` (optional) |
| Reusable prompt file | `.github/prompts/<name>.prompt.md` | None required — VS Code/Visual Studio/JetBrains only |
| Custom agent | `.github/agents/<name>.agent.md` | `description` (required), `name`, `tools`, `mcp-servers`, `model`, `target` (optional) |

Copilot has **no native "skill" concept** with a supporting-file folder (`scripts/`/`references/`/`assets/`). The closest equivalent for a focused, on-demand procedure is a single-file `.prompt.md`.

Copilot CLI also reads `AGENTS.md` or `CLAUDE.md` if present, in addition to `.github/copilot-instructions.md`.

Docs: https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions

---

## Claude Code

| Purpose | Path | Frontmatter |
|---|---|---|
| Always-loaded project memory | `CLAUDE.md` (root; nested `CLAUDE.md` files also load) | None |
| Subagent | `.claude/agents/<name>.md` | `name`, `description`, `tools`, `model` |
| Skill (on-demand procedure + reference content) | `.claude/skills/<name>/SKILL.md` (+ `scripts/`, `references/`, `assets/`) | `name`, `description`, optional `disable-model-invocation`, `allowed-tools`, `context: fork`, `when_to_use`, etc. |

Legacy `.claude/commands/<name>.md` still works and is equivalent to a minimal skill, but skills (with supporting files) are the recommended format. Claude Code skills follow the open [Agent Skills](https://agentskills.io) standard.

Docs: https://code.claude.com/docs/en/skills, https://code.claude.com/docs/en/sub-agents

---

## Cursor

| Purpose | Path | Frontmatter |
|---|---|---|
| Auto-attached or always-on rule | `.cursor/rules/<name>.mdc` | `description`, `globs`, `alwaysApply` |
| Explicit invokable command | `.cursor/commands/<name>.md` (project) or `~/.cursor/commands/<name>.md` (global) | None — single file, no supporting-file folder |

`.cursorrules` at the repo root is **deprecated** — Cursor's Agent mode ignores it. Migrate its content into `.cursor/rules/*.mdc`. `AGENTS.md` is also accepted by Cursor as a plain-markdown, no-frontmatter alternative.

Cursor has no native "skill" concept with bundled scripts — a rule (context) or a command (action) is the closest equivalent depending on whether the content should auto-load or be explicitly invoked.

Docs: https://cursor.com/docs/rules

---

## OpenAI Codex CLI

| Purpose | Path | Frontmatter |
|---|---|---|
| Always-loaded instructions | `AGENTS.md` (repo root and any subdirectory — nearest wins); global `~/.codex/AGENTS.md`, overridable with `~/.codex/AGENTS.override.md` | None |
| Skill (Codex does not distinguish "agent" from "skill" — every invokable procedure is a skill) | `.agents/skills/<name>/SKILL.md` (+ `scripts/`, `references/`, `assets/`, optional `agents/openai.yaml`) | `name`, `description` |

Codex discovers skills at `.agents/skills`, `../.agents/skills`, `$REPO_ROOT/.agents/skills` (repo scopes), `$HOME/.agents/skills` (user scope), and `/etc/codex/skills` (admin scope) — **not** `.codex/skills`. `~/.codex/prompts/*.md` custom prompts exist but are deprecated in favor of skills.

Docs: https://developers.openai.com/codex/guides/agents-md, https://developers.openai.com/codex/skills

---

## Cross-tool summary

There is no single folder that all four tools read. The only thing genuinely shared across tools is the **content** (the instructional prose) and, for Claude and Codex specifically, the `SKILL.md` file format itself (both follow the open Agent Skills standard, just at different discovery paths: `.claude/skills/` vs `.agents/skills/`). Everything else — Copilot's `.agent.md`/`.prompt.md`, Cursor's `.mdc` rules and commands — needs its own adapted file with the correct frontmatter for that tool.
