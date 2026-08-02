# AI Playbook

A reference guide (this app) plus a portable example package showing how to structure **agents**, **skills**, **prompts**, **commands**, and **policies** correctly for four AI coding tools: **GitHub Copilot**, **Claude Code**, **Cursor**, and **OpenAI Codex CLI**.

Each tool still has its own always-loaded instructions file and its own custom-agent format — those haven't converged. But as of 2026, the **skill** layer has: GitHub Copilot and Cursor both added native `SKILL.md` support (the open [Agent Skills](https://agentskills.io) standard already used by Claude Code and Codex CLI), and Cursor also reads Claude Code's subagents directly. This repo verifies all of this against each tool's official documentation and gives a working example of all four, side by side.

---

## 🗂 What's in This Repository

```
ai-playbook/                  # Portable example package — copy this into your own project
├── .claude/                  # Claude Code — canonical/richest source
│   ├── agents/*.md           # Subagents (name, description, tools frontmatter) — Cursor reads these directly too
│   └── skills/<name>/SKILL.md  (+ scripts/, references/, assets/)
├── .github/                  # GitHub Copilot
│   ├── copilot-instructions.md      # Repo-wide, always loaded
│   ├── instructions/*.instructions.md  # Path-specific (applyTo glob)
│   ├── skills/<name>/SKILL.md       # Native since 2026 — same format as Claude/Cursor/Codex
│   ├── agents/*.agent.md     # Custom agents (separate mechanism, not converged)
│   └── prompts/*.prompt.md   # Lightweight single-file alternative to a skill
├── .cursor/                  # Cursor
│   ├── rules/*.mdc           # Auto-attached or always-on context (short guidelines only)
│   ├── skills/<name>/SKILL.md  # Native since Cursor 2.4 (Jan 2026) — same format as Claude/Copilot/Codex
│   └── commands/*.md         # Explicit /command actions
├── AGENTS.md                 # OpenAI Codex CLI — always-loaded (root + nested overrides)
├── src/AGENTS.md             # Example nested override (frontend-specific)
├── .agents/skills/<name>/SKILL.md  # Codex CLI skills — the most cross-compatible path (Copilot & Cursor read it too)
├── policies/                 # Shared policy source content (tool-agnostic prose)
├── specs/templates/          # Shared spec templates (tool-agnostic)
└── tools/                    # Shared Node.js CLI utilities
docs/                         # This repo's own project documentation
src/                          # This repo's own React + TypeScript guide app
```

---

## 🤖 Supported AI Tools

| AI Tool | Always-loaded instructions | Agent format | Skill format |
|---|---|---|---|
| **GitHub Copilot** | `.github/copilot-instructions.md` | `.github/agents/*.agent.md` | `.github/skills/*/SKILL.md` (native since 2026; also reads `.claude/skills/`, `.agents/skills/`) |
| **Claude Code** | `CLAUDE.md` | `.claude/agents/*.md` | `.claude/skills/*/SKILL.md` |
| **Cursor** | `.cursor/rules/*.mdc` (`alwaysApply: true`) | `.cursor/agents/` or `.claude/agents/*.md` (read directly) or `.cursor/commands/*.md` | `.cursor/skills/*/SKILL.md` (native since 2.4; also reads `.agents/skills/`, legacy `.claude/skills/`) |
| **OpenAI Codex CLI** | `AGENTS.md` (nearest wins) | *(no separate format — see skills)* | `.agents/skills/*/SKILL.md` |

**The key 2026 insight:** skills no longer need four separate copies. Put a skill in `.claude/skills/` **and** `.agents/skills/` (identical content, two paths) and all four tools discover it natively — Copilot and Cursor both check `.agents/skills/`, and Copilot/Cursor also check `.claude/skills/`. Only Claude Code doesn't read `.agents/skills/`, so that's the one path every skill still needs. Always-loaded instructions and custom agents remain genuinely tool-specific (except Cursor, which reads Claude Code's `.claude/agents/` natively too).

Use the `ai-tool-setup` skill (`ai-playbook/.claude/skills/ai-tool-setup/SKILL.md`) to generate or refresh all four trees for a target project.

---

## 🛠 Skills & Agents (13 procedures, present in all 4 tool trees)

| Name | Purpose |
|---|---|
| `react-components` | Build React/TypeScript components with WCAG 2.2 accessibility |
| `a11y-automation` | Run automated accessibility tests with axe-core and eslint-plugin-jsx-a11y |
| `node-typescript-service` | Create Node.js/TypeScript microservice endpoints with validation and tests |
| `figma-component` | Convert Figma designs into React/TypeScript components |
| `skill-creator` | Scaffold new skills following the Agent Skills open standard |
| `ai-tool-setup` | Generate/update AI tool instruction files for all 4 tools |
| `scan-workspace` | Detect project type, map to skills, and check AI tool config health |
| `react-component-builder` | End-to-end React component creation with accessibility and tests |
| `figma-component-builder` | Convert Figma designs into components with accessibility validation |
| `node-microservice-builder` | End-to-end Node.js service creation with validation and tests |
| `a11y-audit-react` | Audit React components for WCAG violations and suggest fixes |
| `pr-reviewer` | Review pull requests for quality, security, tests, and policy compliance |
| `code-reviewer` | Review source code for quality, security, performance, and maintainability |

Every procedure is authored once at `ai-playbook/.claude/` (the richest format — supports `scripts/`, `references/`, `assets/`) and mirrored into `.agents/skills/`, `.github/skills/`, and `.cursor/skills/` (same SKILL.md content, tool-appropriate frontmatter subset). The 7 "agent" procedures additionally get a dedicated `.claude/agents/*.md` / `.github/agents/*.agent.md` / `.cursor/commands/*.md` file for tools that distinguish agents from skills. See `ai-playbook/.claude/skills/ai-tool-setup/references/skill-routing.md` for the full per-tool path mapping and `ai-playbook/.claude/skills/ai-tool-setup/references/tool-formats.md` for the verified frontmatter spec of each tool.

---

## 📋 Policies

Shared, tool-agnostic policy content lives in `ai-playbook/policies/` and is embedded/adapted into each tool's native format (merged into `CLAUDE.md`/`copilot-instructions.md`/`AGENTS.md`, or split into individual `.cursor/rules/*.mdc` files):

| Policy | Scope |
|---|---|
| `workspace-policy.md` | Multi-tool support, scope enforcement, project isolation |
| `frontend-policy.md` | React/TypeScript standards, accessibility, state management |
| `backend-policy.md` | Node.js, Java, Python conventions |
| `style-output.md` | Minimal diffs, path formatting, verification commands |

---

## 🚀 Getting Started

### 1. Set Up AI Tool Instructions

Copy `ai-playbook/` into your project, then detect the project type:

```bash
node ai-playbook/tools/project-detect.mjs .
```

Use the `ai-tool-setup` skill/prompt/command (per your tool) to generate the missing instruction files for your project.

### 2. Use a Skill

Ask your AI tool to use a specific skill. For example:

> "Create an accessible Button component with a loading state. Use the react-components skill."

Any of the four tools discovers this the same way now: `.claude/skills/react-components/SKILL.md`, `.github/skills/react-components/SKILL.md`, `.cursor/skills/react-components/SKILL.md`, or `.agents/skills/react-components/SKILL.md` — same content, matched by description, full body loaded on demand.

### 3. Create a New Skill

Use the `skill-creator` skill/prompt/command to scaffold a new skill — author it at `.claude/skills/<name>/SKILL.md` first, then copy it into `.agents/skills/`, `.github/skills/`, and `.cursor/skills/` (trim any Claude-specific frontmatter fields down to `name` + `description`).

### 4. Run the Development Server

```bash
npm run dev      # Start development server
npm test         # Run tests
npm run build    # Build for production
```

---

## 📚 Documentation

| Document | Description |
|---|---|
| [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) | Tech stack, architecture, patterns for this repo's own app |
| [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | WCAG 2.2 guidelines and component patterns |
| [`docs/TESTING.md`](docs/TESTING.md) | Vitest + React Testing Library + jest-axe guide |
| [`docs/README.md`](docs/README.md) | Full documentation index |
| [`ai-playbook/.claude/skills/ai-tool-setup/references/tool-formats.md`](ai-playbook/.claude/skills/ai-tool-setup/references/tool-formats.md) | Verified per-tool file format spec (source of truth) |

---

## 🏗 Best Practices

- **Trigger-optimized descriptions** — each skill/agent description explains when to use it *and* when NOT to use it, preventing false triggers.
- **Progressive disclosure** — `SKILL.md` stays under 500 lines; dense content lives in `references/` and is loaded on demand. All four tools now support the full folder (`scripts/`/`references/`/`assets/`).
- **Third-person imperative** — procedures are written as commands to the agent ("Execute", "Verify", "Generate").
- **Deterministic scripts** — fragile/repetitive tasks use tested scripts rather than asking the LLM to regenerate them each time.
- **Author skills once, mirror twice** — `.claude/skills/` + `.agents/skills/` covers all four tools' native skill discovery. Always-loaded instructions and custom agents still need their own tool-specific file.

---

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
