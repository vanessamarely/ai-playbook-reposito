# AI Playbook

A structured collection of **agents**, **skills**, and **policies** that makes AI coding assistants more effective for developers.

This playbook works with **GitHub Copilot**, **Claude**, **Cursor**, and other AI tools by providing them with consistent, project-aware instructions, procedural skills, and deterministic helper scripts.

---

## 🗂 What's in This Repository

```
ai-playbook/
├── .github/
│   ├── agents/              # Agent definitions for multi-step tasks
│   ├── copilot-instructions/# Policy files (frontend, backend, workspace, style)
│   ├── skills/              # Skill definitions following progressive disclosure
│   └── specs/               # Specification templates
├── tools/                   # Shared Node.js CLI utilities
docs/                        # Project documentation (tech stack, testing, a11y)
src/                         # React + TypeScript application source
```

---

## 🤖 Supported AI Tools

| AI Tool | Instruction File |
|---|---|
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Claude** (Code / claude.ai) | `CLAUDE.md` |
| **Cursor IDE** | `.cursorrules` |
| **Windsurf** | `.windsurfrules` *(generate with ai-tool-setup skill)* |

Each file routes the AI tool to the correct skill, policy, and helper scripts for the detected project type.

---

## 🛠 Skills

Skills are agent-readable procedure files following the [agentskills.io](https://agentskills.io) structure. Each skill lives in `ai-playbook/.github/skills/<name>/` and contains:

- `SKILL.md` — YAML frontmatter + step-by-step procedures (under 500 lines)
- `references/` — Dense reference material loaded on demand
- `assets/` — Output templates and examples
- `scripts/` — Executable tools for deterministic tasks

| Skill | Purpose |
|---|---|
| `react-components` | Build React/TypeScript components with WCAG 2.2 accessibility |
| `a11y-automation` | Run automated accessibility tests with axe-core and eslint-plugin-jsx-a11y |
| `node-typescript-service` | Create Node.js/TypeScript microservice endpoints with validation and tests |
| `skill-creator` | Scaffold new skills following agentskills.io best practices |
| `ai-tool-setup` | Generate/update AI tool instruction files for Copilot, Claude, and Cursor |

---

## 🧑‍💼 Agents

Agents are multi-step procedures that orchestrate skills and tools to complete larger tasks.

| Agent | Purpose |
|---|---|
| `scan-workspace` | Detect project type, map to skills, and check AI tool config health |
| `react-component-builder` | End-to-end React component creation with accessibility and tests |
| `node-microservice-builder` | End-to-end Node.js service creation with validation and tests |
| `a11y-audit-react` | Audit React components for WCAG violations and suggest fixes |
| `pr-reviewer` | Review pull requests for quality, security, tests, and policy compliance |

---

## 📋 Policies

Policy files in `ai-playbook/.github/copilot-instructions/` define rules that agents apply:

| Policy | Scope |
|---|---|
| `workspace-policy.md` | Multi-tool support, scope enforcement, project isolation |
| `frontend-policy.md` | React/TypeScript standards, accessibility, state management |
| `backend-policy.md` | Node.js, Java, Python conventions |
| `style-output.md` | Minimal diffs, path formatting, verification commands |

---

## 🚀 Getting Started

### 1. Set Up AI Tool Instructions

Run the workspace scanner to detect your project type:

```bash
node ai-playbook/tools/project-detect.mjs .
```

Then use the `ai-tool-setup` skill to generate missing instruction files.

### 2. Use a Skill

Ask your AI tool to use a specific skill. For example, with GitHub Copilot or Claude:

> "Create an accessible Button component with a loading state. Use the react-components skill."

The AI tool will:
1. Load `ai-playbook/.github/skills/react-components/SKILL.md`
2. Follow the numbered procedures
3. Load reference material from `references/` as needed
4. Suggest verification commands when done

### 3. Create a New Skill

Use the `skill-creator` skill to scaffold new skills:

> "Create a new skill for building Storybook stories. Use the skill-creator skill."

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
| [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) | Tech stack, architecture, patterns |
| [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | WCAG 2.2 guidelines and component patterns |
| [`docs/TESTING.md`](docs/TESTING.md) | Vitest + React Testing Library + jest-axe guide |
| [`docs/README.md`](docs/README.md) | Full documentation index |

---

## 🏗 Best Practices

This playbook follows the [skills best practices](https://github.com/mgechev/skills-best-practices) guide:

- **Trigger-optimized descriptions** — each skill description explains when to use it *and* when NOT to use it, preventing false triggers.
- **Progressive disclosure** — `SKILL.md` stays under 500 lines; dense content lives in `references/` and is loaded on demand.
- **Third-person imperative** — skill procedures are written as commands to the agent ("Execute", "Verify", "Generate").
- **Deterministic scripts** — fragile/repetitive tasks use tested scripts in `scripts/` rather than asking the LLM to generate them each time.
- **Explicit paths** — all file references use relative forward-slash paths.

---

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
