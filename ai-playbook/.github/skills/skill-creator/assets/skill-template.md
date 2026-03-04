---
name: skill-name
description: Brief action-oriented description of what this skill accomplishes
triggers:
  - keyword or phrase indicating this skill applies
  - another trigger phrase
negative_triggers:
  - keyword indicating this skill does NOT apply
  - another exclusion phrase
---

# Skill: Skill Name

## Purpose

Single paragraph describing what this skill does, when to use it, and what it does not do.

## Inputs

- `inputName`: Type and description
- `optionalInput` (optional): Type and description with default value

## Outputs

- File(s) created or modified
- Data structures returned
- Commands suggested

## Procedures

### 1. First Step Name

Action to perform.

Sub-steps:
1. Specific action
2. Another specific action

If condition:
- Branch action A

Otherwise:
- Branch action B

Expected outcome: Specific result to verify.

### 2. Second Step Name

For dense information, reference external files:
- Read: `references/topic.md`
- Load template: `assets/template.md`
- Execute: `scripts/tool.sh`

### 3. Validation Step

Verify results:
1. Check condition A
2. Check condition B

If validation fails:
- Remediation action

### 4. Output Step

Generate output in specified format.

Provide verification commands.

## Error Handling

**Error Condition A**: Detection method. Remediation action.

**Error Condition B**: Detection method. Remediation action.

## References

- Supporting document: `references/guide.md`
- Related skill: `.github/skills/other-skill/SKILL.md`
