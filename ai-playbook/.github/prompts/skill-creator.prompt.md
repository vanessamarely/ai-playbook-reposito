# Skill / Procedure Creator (Copilot)

Scaffold a new reusable procedure for this playbook in GitHub Copilot's native format — a custom agent (`.github/agents/<name>.agent.md`) or a reusable prompt file (`.github/prompts/<name>.prompt.md`) — with validated frontmatter and agent-oriented, deterministic instructions. Not for human-facing READMEs, changelogs, or general project documentation.

## Inputs

- Procedure name (lowercase, numbers, hyphens only).
- Purpose and scope.
- Target artifact type: `agent` (multi-step, tool-using workflow) or `prompt` (single-shot conventions/checklist reference).
- Target procedures and decision points.

## Choosing the Artifact Type

| Use an **agent** (`.agent.md`) when... | Use a **prompt** (`.prompt.md`) when... |
|---|---|
| The task needs multiple ordered steps with tool access (read/edit/search/runCommands) | It's a self-contained reference: conventions, a checklist, a pattern library |
| It should be invocable as `@<agent-name>` and act autonomously | It's meant to be run with `/<prompt-name>` to inject guidance into the current chat |
| It produces file edits, test runs, or multi-file diffs | It informs but doesn't itself drive multi-step execution |

## Procedure

### 1. Validate the Name
Must match `^[a-z0-9-]+$`, be unique among existing `.agent.md`/`.prompt.md` files, and describe a single, focused purpose (don't combine unrelated tasks). Reject and request a corrected name if it fails.

### 2. Populate Frontmatter

**Agent** (`.github/agents/<name>.agent.md`):
```yaml
---
description: Action-oriented, 1-2 sentences, third person. Required.
name: <matches filename, without .agent.md>
tools: ["read", "edit", "search", "runCommands"]   # only what's actually needed
---
```

**Prompt** (`.github/prompts/<name>.prompt.md`): no frontmatter required — a plain Markdown body is sufficient. Start with an H1 title and a one-line purpose statement.

### 3. Write the Purpose Section
Single paragraph: what it accomplishes, when to invoke it, and explicit scope boundaries (what it does NOT do).

### 4. Define Inputs
List each parameter: name, type, required/optional, default if applicable.

### 5. Define Outputs
What gets created/modified, commands suggested, or data structures returned.

### 6. Write the Procedure Section
Numbered, deterministic steps in third-person imperative ("Validate", "Generate", "Suggest"). Make decision branches explicit (if/else). Keep each step to a few lines — Copilot custom agents and prompts are single, self-contained files with no supporting `references/`/`assets/`/`scripts/` folder, so inline the essential guidance directly rather than pointing to an external file that won't exist. If a step would need a long reference table or code sample, inline a condensed version of it in the file itself.

### 7. Add an Error Handling Section
List common failure modes with detection method and remediation action.

### 8. Validate Before Finishing
- Frontmatter (agents only): `description` present, third-person, no first/second-person pronouns ("I", "you", "we").
- File is self-contained — no dangling references to a `references/`, `assets/`, or `scripts/` folder that doesn't exist in this repo's Copilot layout.
- Procedures are deterministic (same input → same output).
- Error messages are actionable, not vague.
- No hardcoded client/project-specific names — use prompt-supplied values.
- If creating an agent, add it to the routing table in `.github/copilot-instructions.md`. If creating a prompt, add it there too.

## Checklist

**Before creating:**
- [ ] Name is unique and kebab-case
- [ ] Single, clear purpose (no unrelated tasks combined)
- [ ] No similar agent/prompt already exists

**Frontmatter (agents):**
- [ ] `description` present, action-oriented, third-person
- [ ] `name` matches the filename
- [ ] `tools` lists only what's actually needed

**Content:**
- [ ] Purpose is a single paragraph with explicit scope boundaries
- [ ] Inputs list all parameters with types
- [ ] Outputs specify what's produced
- [ ] Procedure uses numbered, third-person-imperative steps with explicit branches
- [ ] Error handling covers common failure modes
- [ ] Dense reference material is inlined (condensed), not pointed at a nonexistent supporting folder

**Final review:**
- [ ] Agent-oriented (instructions for the model, not a human reader)
- [ ] Deterministic: same input → same output
- [ ] Registered in `.github/copilot-instructions.md` routing tables

## Error Handling

- **Invalid name** — must match `^[a-z0-9-]+$`; reject with an example.
- **Description too long or first/second-person** — rewrite in third person, keep under ~200 characters.
- **File too long / too much dense content** — condense; Copilot files can't offload to a supporting folder the way Claude/Codex skills can, so trim to essentials rather than splitting.
- **Missing from routing table** — add an entry in `.github/copilot-instructions.md` so the new agent/prompt is discoverable.

## Related

- `.github/prompts/ai-tool-setup.prompt.md` — regenerates the routing tables across all 4 AI tools after adding a new procedure
- `.github/copilot-instructions.md` — the routing tables that must be updated
