# Skill Creator

Scaffold a new Cursor rule or command that follows this playbook's conventions — proper structure, and agent-oriented procedural instructions. Use when the user wants to add a new automated procedure, convert prose documentation into a rule/command, or validate an existing one. Not for human-facing README files, changelogs, or general project documentation.

## Inputs

- Name (lowercase, numbers, hyphens only).
- Purpose and scope.
- Target procedures and decision points.
- Whether it should be a **rule** (passive, auto-loaded context) or a **command** (explicit `/name` invocation).

## Outputs

- A new `.cursor/rules/<name>.mdc` or `.cursor/commands/<name>.md` file.

## Procedure

1. **Validate the name** — lowercase letters, numbers, and hyphens only (`^[a-z0-9-]+$`); must match the filename; must be unique within `.cursor/rules/` and `.cursor/commands/`. Reject and give an example if invalid.
2. **Decide rule vs. command**:
   - **Rule** (`.cursor/rules/<name>.mdc`) — passive context that should apply automatically. Choose `alwaysApply: true` for policies that always matter, `globs: "<pattern>"` for file-type-triggered guidance, or a strong `description` with neither for "Agent Requested" (loaded when relevant to the task at hand).
   - **Command** (`.cursor/commands/<name>.md`) — an explicit, one-off invokable action. No frontmatter needed.
3. **Write the frontmatter** (rules only): `description` (action-oriented, third person, under ~200 characters, no first/second-person pronouns), plus `globs` or `alwaysApply` as decided in step 2.
4. **Write the purpose** — one paragraph: what it accomplishes, when it should apply/be invoked, and explicit scope boundaries (what it does NOT do).
5. **Write inputs** — parameter name, type, description, default if applicable.
6. **Write outputs** — files created/modified, commands to run, data returned.
7. **Write the procedure** — numbered, deterministic steps in third-person imperative ("Validate", "Generate", "Verify"), with explicit if/else branches where behavior differs.
8. **Write error handling** — failure mode, how it's detected, the remediation step.
9. **Keep it single-file** — Cursor has no native folder of bundled scripts/references/assets like some other tools. Inline the essential guidance directly in the `.mdc`/`.md` file; condense verbose examples rather than splitting into a supporting-files tree.
10. **Keep it focused** — if the file is growing unwieldy, split into a narrower rule/command rather than adding a references folder that Cursor won't auto-load.
11. **Validate metadata** — name format, description length, no first/second-person pronouns ("I", "you", "we").

## Error Handling

- **Invalid name**: must match `^[a-z0-9-]+$`; reject with an example.
- **Description too long**: keep it to roughly 200 characters; ask for a condensed version.
- **Pronouns detected**: rewrite in third-person imperative.
- **File too long**: condense examples and split overly broad procedures into a separate, narrower rule/command instead of adding subfolders.
