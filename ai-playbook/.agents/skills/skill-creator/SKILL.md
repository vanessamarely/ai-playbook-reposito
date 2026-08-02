---
name: skill-creator
description: Scaffolds new agent skill documentation following the OpenAI Codex CLI SKILL.md format (name + description frontmatter only, progressive disclosure via references/assets/scripts, agent-oriented procedural instructions). Use when the user wants to author a new skill, convert prose documentation into an agent skill, or validate an existing SKILL.md. Do not use for writing human-facing README files, changelogs, or general project documentation.
---

# Skill: Skill Creator

## Purpose

Generate new skill documentation that follows Codex CLI's `SKILL.md` structure — minimal frontmatter, progressive disclosure, and agent-oriented instructions — for skills placed under `.agents/skills/<name>/`.

## Inputs

- Skill name (lowercase, numbers, hyphens only)
- Skill purpose and scope
- Target procedures and decision points

## Outputs

- `SKILL.md` file with valid frontmatter, placed at `.agents/skills/<name>/SKILL.md`
- Optional supporting files (`references/`, `assets/`, `scripts/`)

## Procedures

### 1. Validate Skill Name

Check that the name:
- Contains only lowercase letters, numbers, and hyphens.
- Matches the parent directory name.
- Is unique within `.agents/skills/`.

Execute: `python .agents/skills/skill-creator/scripts/validate-metadata.py <skillName>`

If validation fails, reject and request correction.

### 2. Load Template

Read: `.agents/skills/skill-creator/assets/skill-template.md`

Use as the base structure.

### 3. Populate Frontmatter

Codex CLI's `SKILL.md` frontmatter supports exactly two fields:

- `name`: The skill identifier (must match the directory name).
- `description`: Action-oriented, states both what the skill does and when to use it — Codex matches this text against the user's request to decide when to load the skill. Write it in third person, no first or second person pronouns.

Do not add fields that exist in other tools' formats but not Codex's — no `triggers`, `negative_triggers`, `when_to_use`, `allowed-tools`, `disable-model-invocation`, `context: fork`, or `tools:`. Codex ignores unknown frontmatter and it misleads readers about what the platform actually supports. Put any trigger phrasing directly into the `description` sentence instead of a separate field.

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
- Use paths relative to the skill directory (e.g. `references/topic.md`) or relative to the playbook root (e.g. `../../../policies/backend-policy.md`) — Codex resolves skill-relative paths from the `SKILL.md` file's own directory.

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

Create as needed, alongside `SKILL.md` in the same skill directory — Codex's skill format supports the same subfolder layout as Claude Code's:
- `references/`: Conceptual guides, best practices, checklists.
- `assets/`: Templates, schemas, configuration examples.
- `scripts/`: Executable tools for validation or automation.

### 11. Validate Line Count

Verify `SKILL.md` is under 500 lines.

If exceeded:
- Move dense content to references.
- Split large procedures into sub-skills.

### 12. Validate Metadata

Execute: `python .agents/skills/skill-creator/scripts/validate-metadata.py <skillPath>`

Check:
- Name format correctness.
- Description length (under 200 characters).
- No prohibited pronouns (I, you, we).
- No frontmatter fields beyond `name` and `description`.

## Error Handling

**Invalid skill name**: Must match `^[a-z0-9-]+$`. Reject and provide example.

**Description too long**: Limit to 200 characters. Request condensed version.

**Pronouns detected**: Rewrite description in third-person imperative.

**Extra frontmatter fields**: Remove anything besides `name` and `description`; fold the intent into the description text.

**File too long**: Move content to `references/` or `assets/`.

## References

- Checklist: `references/checklist.md`
