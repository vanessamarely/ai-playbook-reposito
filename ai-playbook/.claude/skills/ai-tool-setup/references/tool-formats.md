# AI Tool Instruction Formats (verified against official docs)

## GitHub Copilot

| Purpose | Path | Frontmatter |
|---|---|---|
| Repo-wide instructions (auto-loaded) | `.github/copilot-instructions.md` | None — plain Markdown |
| Path-specific instructions | `.github/instructions/<name>.instructions.md` | `applyTo: "<glob>"` (required), `excludeAgent` (optional) |
| Skill (native since 2026) | `.github/skills/<name>/SKILL.md` (+ `scripts/`, `references/`, `assets/`) | `name` (required, lowercase+hyphens), `description` (required); optional `license`, `allowed-tools` |
| Reusable prompt file | `.github/prompts/<name>.prompt.md` | None required — VS Code/Visual Studio/JetBrains only |
| Custom agent | `.github/agents/<name>.agent.md` | `description` (required), `name`, `tools`, `mcp-servers`, `model`, `target` (optional) |

Copilot added native Agent Skills support in 2026 — it now reads the same `SKILL.md` format Claude Code and Codex CLI use, checking `.github/skills/`, `.claude/skills/`, and `.agents/skills/` (project) or `~/.copilot/skills/`, `~/.agents/skills/` (personal), in that order. `.prompt.md` remains as a lighter single-file alternative for simple reusable snippets, but skills are the more capable modern option (full folder support).

Copilot CLI also reads `AGENTS.md` or `CLAUDE.md` if present, in addition to `.github/copilot-instructions.md`.

Docs: https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions, https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills

---

## Claude Code

| Purpose | Path | Frontmatter |
|---|---|---|
| Always-loaded project memory | `CLAUDE.md` (root; nested `CLAUDE.md` files also load) | None |
| Subagent | `.claude/agents/<name>.md` | `name`, `description`, `tools`, `model` |
| Skill (on-demand procedure + reference content) | `.claude/skills/<name>/SKILL.md` (+ `scripts/`, `references/`, `assets/`) | `name`, `description`, optional `disable-model-invocation`, `allowed-tools`, `context: fork`, `when_to_use`, etc. |

Legacy `.claude/commands/<name>.md` still works and is equivalent to a minimal skill, but skills (with supporting files) are the recommended format. Claude Code skills follow the open [Agent Skills](https://agentskills.io) standard.

**Claude Code is the one tool that does NOT read `.agents/skills/`** — it only checks `.claude/skills/`. Cursor and GitHub Copilot both read `.claude/agents/` and/or `.claude/skills/` directly (see below), so this remains the most important path to keep populated.

Docs: https://code.claude.com/docs/en/skills, https://code.claude.com/docs/en/sub-agents

---

## Cursor

| Purpose | Path | Frontmatter |
|---|---|---|
| Auto-attached or always-on rule (short guidelines only) | `.cursor/rules/<name>.mdc` | `description`, `globs`, `alwaysApply` |
| Skill (native since Cursor 2.4, Jan 2026) | `.cursor/skills/<name>/SKILL.md` (+ `scripts/`, `references/`, `assets/`) | `name`, `description`, optional `paths` (glob string or list) |
| Subagent | `.cursor/agents/<name>.md`, **or reads `.claude/agents/<name>.md` / `.codex/agents/<name>.md` directly** | `name`, `description`, `model` |
| Explicit invokable command | `.cursor/commands/<name>.md` (project) or `~/.cursor/commands/<name>.md` (global) | None — single file, no supporting-file folder |

`.cursorrules` at the repo root is **deprecated** — Cursor's Agent mode ignores it. Migrate its content into `.cursor/rules/*.mdc`. `AGENTS.md` is also accepted by Cursor as a plain-markdown, no-frontmatter alternative.

Cursor added native Skills and Subagents in version 2.4 (2026). Skills are discovered at `.cursor/skills/`, `.agents/skills/` (project) and `~/.cursor/skills/`, `~/.agents/skills/` (global), plus legacy compatibility with `.claude/skills/` and `.codex/skills/`. Subagents are discovered from `.cursor/agents/`, `.claude/agents/`, or `.codex/agents/` — project scope wins on name conflicts, and `.cursor/` wins over `.claude/`/`.codex/` at the same scope. This means a Claude Code subagent or a Codex/Copilot skill often needs **zero extra files** to also work in Cursor.

Docs: https://cursor.com/docs/rules, https://cursor.com/help/customization/skills

---

## OpenAI Codex CLI

| Purpose | Path | Frontmatter |
|---|---|---|
| Always-loaded instructions | `AGENTS.md` (repo root and any subdirectory — nearest wins); global `~/.codex/AGENTS.md`, overridable with `~/.codex/AGENTS.override.md` | None |
| Skill (Codex does not distinguish "agent" from "skill" — every invokable procedure is a skill) | `.agents/skills/<name>/SKILL.md` (+ `scripts/`, `references/`, `assets/`, optional `agents/openai.yaml`) | `name`, `description` |

Codex discovers skills at `.agents/skills`, `../.agents/skills`, `$REPO_ROOT/.agents/skills` (repo scopes), `$HOME/.agents/skills` (user scope), and `/etc/codex/skills` (admin scope) — **not** `.codex/skills`. `~/.codex/prompts/*.md` custom prompts exist but are deprecated in favor of skills.

**`.agents/skills/` is the single most cross-compatible path**: Codex CLI, GitHub Copilot, and Cursor all discover it natively (only Claude Code doesn't).

Docs: https://developers.openai.com/codex/guides/agents-md, https://developers.openai.com/codex/skills

---

## Cross-tool summary (2026 convergence)

The on-demand **skill** layer has genuinely converged: GitHub Copilot and Cursor both added native `SKILL.md` support in 2026, joining Claude Code and Codex CLI. In practice, two physical copies cover all four tools:

- `.agents/skills/<name>/SKILL.md` — read natively by Codex CLI, GitHub Copilot, and Cursor
- `.claude/skills/<name>/SKILL.md` — read natively by Claude Code, GitHub Copilot, and Cursor (legacy compatibility)

Only Claude Code needs its own dedicated copy; the other three tools happily discover either shared path. Cursor additionally reads Claude Code's `.claude/agents/` folder directly for subagents.

What has **not** converged: each tool's always-loaded instructions file (`copilot-instructions.md` / `CLAUDE.md` / `.cursor/rules/*.mdc` / `AGENTS.md`) and Copilot's own `.agent.md` custom-agent format remain genuinely tool-specific and need their own file with the correct frontmatter.
