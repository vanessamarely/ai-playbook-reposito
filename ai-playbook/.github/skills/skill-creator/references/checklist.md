# Skill Creation Checklist

## Before Creating

- [ ] Skill name is unique within `.github/skills/`
- [ ] Skill name uses lowercase, numbers, and hyphens only
- [ ] Skill has a clear, single purpose (not combining multiple unrelated tasks)
- [ ] Similar skills do not already exist (avoid duplication)

## Frontmatter

- [ ] `name` field present and matches directory name
- [ ] `description` is action-oriented and under 200 characters
- [ ] `description` uses third-person imperative voice (no "I", "you", "we")
- [ ] `triggers` list includes at least 2 positive indicators
- [ ] `negative_triggers` list includes at least 1 exclusion

## Content Structure

- [ ] Purpose section is a single paragraph
- [ ] Inputs section lists all required parameters with types
- [ ] Outputs section specifies what the skill produces
- [ ] Procedures section uses numbered steps
- [ ] Each step has clear success criteria
- [ ] Decision branches are explicit (if/else)
- [ ] Error handling section covers common failures

## Progressive Disclosure

- [ ] Dense reference material moved to `references/`
- [ ] Templates and examples moved to `assets/`
- [ ] Executable tools placed in `scripts/`
- [ ] Main SKILL.md references external files rather than inlining
- [ ] SKILL.md is under 500 lines

## File References

- [ ] All paths use forward slashes
- [ ] All paths are relative to the playbook root or skill directory
- [ ] Referenced files actually exist

## Scripts (if applicable)

- [ ] Scripts have shebang line
- [ ] Scripts are executable (`chmod +x`)
- [ ] Scripts output to stdout/stderr appropriately
- [ ] Scripts return non-zero exit codes on errors
- [ ] Scripts include usage message when called incorrectly

## Validation

- [ ] Run `validate-metadata.py` and confirm it passes
- [ ] Verify no first/second person pronouns in description
- [ ] Check for redundancy with other skills or policy files
- [ ] Ensure no hardcoded client-specific references

## Final Review

- [ ] Skill is agent-oriented (instructions for LLMs, not humans)
- [ ] No explanatory comments inside code templates
- [ ] Procedures are deterministic (same input → same output)
- [ ] Error messages are actionable
