# Skill Routing Reference

## How Agents Select Skills

Agents load skills based on the YAML frontmatter `name` and `description` fields in each `SKILL.md`. The agent sees only these two fields before deciding to load the skill.

A well-optimized `description` prevents false triggers and ensures the right skill fires for the right task.

## Current Skill Registry

| Skill Name | SKILL.md Path | Triggers On | Does NOT Trigger On |
|---|---|---|---|
| `react-components` | `.github/skills/react-components/SKILL.md` | Building React UI components, TypeScript, WCAG/a11y in components | Backend services, non-React frameworks |
| `a11y-automation` | `.github/skills/a11y-automation/SKILL.md` | Running automated a11y tests, axe-core, eslint-plugin-jsx-a11y | Manual reviews, non-browser environments |
| `node-typescript-service` | `.github/skills/node-typescript-service/SKILL.md` | API endpoints, microservices, Node.js backend | React components, UI work |
| `skill-creator` | `.github/skills/skill-creator/SKILL.md` | Writing new SKILL.md, scaffolding agent skills | Human documentation, README files |
| `ai-tool-setup` | `.github/skills/ai-tool-setup/SKILL.md` | Setting up Copilot/Claude/Cursor config files | Building app code, writing skills |

## Adding a New Skill to the Routing Table

1. Create the skill directory under `.github/skills/<name>/`.
2. Write `SKILL.md` with valid frontmatter (name matches directory).
3. Run `python .github/skills/skill-creator/scripts/validate-metadata.py <skillPath>` to verify.
4. Add the skill to the routing table in `.github/copilot-instructions.md`, `CLAUDE.md`, and `.cursorrules`.
5. Update `ai-playbook/.github/agents/scan-workspace/AGENT.md` routing table.

## Project-Type to Skill Mapping

The `scan-workspace` agent uses this mapping after running `project-detect.mjs`:

```json
{
  "react":           ["react-components", "a11y-automation"],
  "node-typescript": ["node-typescript-service"],
  "java-maven":      [],
  "java-gradle":     [],
  "python":          [],
  "unknown":         []
}
```

Skills not in this map (like `skill-creator` and `ai-tool-setup`) are triggered by user intent, not project type.
