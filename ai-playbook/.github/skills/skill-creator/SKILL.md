---
name: skill-creator
description: Create new skills following agentskills.io structure with metadata validation and progressive disclosure
triggers:
  - creating a new skill
  - scaffolding skill documentation
  - defining agent procedures
negative_triggers:
  - writing human-facing documentation
  - creating README files
---

# Skill: Skill Creator

## Purpose

Generate new skill documentation that follows the agentskills.io-inspired structure with proper metadata and agent-oriented instructions.

## Inputs

- Skill name (lowercase, numbers, hyphens only)
- Skill purpose and scope
- Target procedures and decision points

## Outputs

- `SKILL.md` file with valid frontmatter
- Optional supporting files (`references/`, `assets/`, `scripts/`)

## Procedures

### 1. Validate Skill Name

Check that the name:
- Contains only lowercase letters, numbers, and hyphens.
- Matches the parent directory name.
- Is unique within `.github/skills/`.

Execute: `python .github/skills/skill-creator/scripts/validate-metadata.py <skillName>`

If validation fails, reject and request correction.

### 2. Load Template

Read: `.github/skills/skill-creator/assets/skill-template.md`

Use as the base structure.

### 3. Populate Frontmatter

Required fields:
- `name`: The skill identifier (must match directory).
- `description`: Action-oriented, 1-2 sentences. No first or second person pronouns.
- `triggers`: List of phrases that indicate this skill should be used.
- `negative_triggers`: List of phrases indicating this skill does NOT apply.

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

Execute: `python .github/skills/skill-creator/scripts/validate-metadata.py <skillPath>`

Check:
- Name format correctness.
- Description length (under 200 characters).
- No prohibited pronouns (I, you, we).

## Error Handling

**Invalid skill name**: Must match `^[a-z0-9-]+$`. Reject and provide example.

**Description too long**: Limit to 200 characters. Request condensed version.

**Pronouns detected**: Rewrite description in third-person imperative.

**File too long**: Move content to `references/` or `assets/`.

## References

- Checklist: `references/checklist.md`
