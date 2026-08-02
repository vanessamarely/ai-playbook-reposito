---
name: skill-creator
description: Scaffolds new SKILL.md files following the official Agent Skills format (SKILL.md with YAML frontmatter, progressive disclosure, agent-oriented procedural instructions). Use when the user wants to author a new skill for this playbook, convert prose documentation into a skill, or validate an existing SKILL.md. Do not use for writing human-facing README files, changelogs, or general project documentation.
---

# Skill: Skill Creator

## Purpose

Generate new `SKILL.md` documentation that follows the official Agent Skills format (see [agentskills.io](https://agentskills.io)) with valid frontmatter and agent-oriented instructions.

## Inputs

- Skill name (lowercase, numbers, hyphens only)
- Skill purpose and scope
- Target procedures and decision points

## Outputs

- `SKILL.md` file with valid frontmatter, placed at `.github/skills/<name>/SKILL.md`
- Optional supporting files (`references/`, `assets/`, `scripts/`)

## Procedures

### 1. Validate Skill Name

Check that the name:
- Contains only lowercase letters, numbers, and hyphens.
- Matches the parent directory name.
- Is unique within `.github/skills/` (project) and `~/.copilot/skills/` (personal).

Execute: `python scripts/validate-metadata.py <skillName>`

If validation fails, reject and request correction.

### 2. Load Template

Read: [assets/skill-template.md](assets/skill-template.md)

Use as the base structure.

### 3. Populate Frontmatter

GitHub Copilot's supported SKILL.md frontmatter fields:

- `name`: lowercase, hyphens — should match the parent directory name.
- `description`: What the skill does and when to use it — Copilot uses this to decide when to load the skill. Write it in third person, no "I"/"you"/"we". Required.
- `license`: Optional license identifier for the skill content.
- `allowed-tools`: Optional list of tool names pre-approved for the turn that invokes this skill (keep it a simple list, e.g. `shell`, `bash` — omit entirely unless genuinely simple).

Do not invent fields outside this list — unknown frontmatter is parsed but ignored, and it misleads readers about what the platform actually supports.

### 4. Define Purpose Section

Write a single paragraph stating:
- What the skill accomplishes.
- When it should be invoked.
- What it does NOT do (scope boundaries).

### 5. Define Inputs Section

List required and optional inputs:
- Parameter name
- Type
- Description
- Default value (if applicable)

### 6. Define Outputs Section

List what the skill produces:
- Files created or modified
- Commands to run
- Data structures returned

### 7. Define Procedures Section

Write numbered, deterministic steps.

Rules:
- Use third-person imperative ("Execute", "Verify", "Generate").
- Include explicit decision branches (if/else).
- Reference external files for dense information (progressive disclosure).
- Use paths relative to the skill's own directory (e.g. `scripts/<tool>`) when referencing bundled scripts so the skill works regardless of where it's installed (project or personal).

Pattern:
```
### 1. Step Name

Action to perform.

If condition A:
- Sub-action 1
- Sub-action 2

Otherwise:
- Alternative action

Expected outcome: [specific result]
```

### 8. Define Error Handling Section

List common failure modes and recovery steps:
- Error condition
- Detection method
- Remediation action

### 9. Apply Progressive Disclosure

If any procedure step exceeds 10 lines:
1. Extract to `references/<topic>.md` or `assets/<artifact>`.
2. Replace with: "Read: `references/<topic>.md`"

### 10. Add Supporting Files

Create as needed:
- `references/`: Conceptual guides, best practices, checklists.
- `assets/`: Templates, schemas, configuration examples.
- `scripts/`: Executable tools for validation or automation.

### 11. Validate Line Count

Verify `SKILL.md` is under 500 lines.

If exceeded:
- Move dense content to references.
- Split large procedures into sub-skills.

### 12. Validate Metadata

Execute: `python scripts/validate-metadata.py <skillPath>`

Check:
- Name format correctness.
- Description length (under 1,536 characters).
- No prohibited pronouns (I, you, we).

## Error Handling

**Invalid skill name**: Must match `^[a-z0-9-]+$`. Reject and provide example.

**Description too long**: Trim so `description` stays under 1,536 characters.

**Pronouns detected**: Rewrite description in third-person imperative.

**File too long**: Move content to `references/` or `assets/`.

## References

- Checklist: [references/checklist.md](references/checklist.md)
- Cross-tool adaptation: see `ai-playbook/.claude/skills/skill-creator/SKILL.md` for the canonical Claude Code source, `ai-playbook/.agents/skills/skill-creator/SKILL.md` for the OpenAI Codex equivalent, and `ai-playbook/.cursor/commands/skill-creator.md` for Cursor.
