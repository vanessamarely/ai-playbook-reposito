import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Folder, Code2, Play, AlertTriangle, Copy, Check, ChevronDown, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SkillGuide() {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const copyToClipboard = (content: string, skillName: string) => {
    navigator.clipboard.writeText(content)
    setCopiedSkill(skillName)
    toast.success(`${skillName} skill copied to clipboard!`)
    setTimeout(() => setCopiedSkill(null), 2000)
  }
  const skills = [
    {
      name: 'skill-creator',
      description: 'Generate new skills following the standard template',
      badge: 'Meta',
      color: 'text-indigo-600',
      triggers: ['+create skill', '+new procedure'],
      antiTriggers: ['Creating agents', 'General questions'],
      assets: ['skill-template.md'],
      references: ['checklist.md'],
      scripts: ['validate-metadata.py'],
      filePath: 'ai-playbook/.github/skills/skill-creator/SKILL.md',
      markdown: `---
name: skill-creator
description: Scaffolds new agent skill documentation following the agentskills.io structure with validated YAML frontmatter, progressive disclosure, and agent-oriented procedural instructions. Use when the user wants to author a new skill, convert prose documentation into an agent skill, or validate an existing SKILL.md. Do not use for writing human-facing README files, changelogs, or general project documentation.
triggers:
  - create a new skill
  - scaffold skill documentation
  - add agent skill
  - write SKILL.md
  - define agent procedures
negative_triggers:
  - write README
  - update changelog
  - create human documentation
  - write user guide
---

# Skill: Skill Creator

## Purpose

Generate new skill documentation that follows the agentskills.io-inspired structure with proper metadata and agent-oriented instructions.

## Inputs

- Skill name (lowercase, numbers, hyphens only)
- Skill purpose and scope
- Target procedures and decision points

## Outputs

- \`SKILL.md\` file with valid frontmatter
- Optional supporting files (\`references/\`, \`assets/\`, \`scripts/\`)

## Procedures

### 1. Validate Skill Name

Check that the name:
- Contains only lowercase letters, numbers, and hyphens.
- Matches the parent directory name.
- Is unique within \`.github/skills/\`.

Execute: \`python .github/skills/skill-creator/scripts/validate-metadata.py <skillName>\`

If validation fails, reject and request correction.

### 2. Load Template

Read: \`.github/skills/skill-creator/assets/skill-template.md\`

Use as the base structure.

### 3. Populate Frontmatter

Required fields:
- \`name\`: The skill identifier (must match directory).
- \`description\`: Action-oriented, 1-2 sentences. No first or second person pronouns.
- \`triggers\`: List of phrases that indicate this skill should be used.
- \`negative_triggers\`: List of phrases indicating this skill does NOT apply.

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
\`\`\`
### 1. Step Name

Action to perform.

If condition A:
- Sub-action 1
- Sub-action 2

Otherwise:
- Alternative action

Expected outcome: [specific result]
\`\`\`

### 8. Define Error Handling Section

List common failure modes and recovery steps:
- Error condition
- Detection method
- Remediation action

### 9. Apply Progressive Disclosure

If any procedure step exceeds 10 lines:
1. Extract to \`references/<topic>.md\` or \`assets/<artifact>\`.
2. Replace with: "Read: \`references/<topic>.md\`"

### 10. Add Supporting Files

Create as needed:
- \`references/\`: Conceptual guides, best practices, checklists.
- \`assets/\`: Templates, schemas, configuration examples.
- \`scripts/\`: Executable tools for validation or automation.

### 11. Validate Line Count

Verify \`SKILL.md\` is under 500 lines.

If exceeded:
- Move dense content to references.
- Split large procedures into sub-skills.

### 12. Validate Metadata

Execute: \`python .github/skills/skill-creator/scripts/validate-metadata.py <skillPath>\`

Check:
- Name format correctness.
- Description length (under 200 characters).
- No prohibited pronouns (I, you, we).

## Error Handling

**Invalid skill name**: Must match \`^[a-z0-9-]+$\`. Reject and provide example.

**Description too long**: Limit to 200 characters. Request condensed version.

**Pronouns detected**: Rewrite description in third-person imperative.

**File too long**: Move content to \`references/\` or \`assets/\`.

## References

- Checklist: \`references/checklist.md\``
    },
    {
      name: 'react-components',
      description: 'Build accessible React/TypeScript components',
      badge: 'Frontend',
      color: 'text-blue-600',
      triggers: ['+build component', '+create react', '+accessibility'],
      antiTriggers: ['Backend code', 'Non-React frameworks'],
      assets: ['component-spec.template.md', 'pr-checklist.md'],
      references: ['a11y-wcag22.md', 'react-ts-patterns.md'],
      scripts: [],
    },
    {
      name: 'client-library',
      description: 'Build components for client-specific component libraries',
      badge: 'Client-Specific',
      color: 'text-orange-600',
      triggers: ['+client library', '+custom component library'],
      antiTriggers: ['General React components', 'Other client projects'],
      assets: ['component-template.tsx'],
      references: ['code-style.md', 'architecture-patterns.md'],
      scripts: [],
    },
    {
      name: 'node-typescript-service',
      description: 'Build Node.js/TypeScript backend services',
      badge: 'Backend',
      color: 'text-green-600',
      triggers: ['+api endpoint', '+microservice', '+node service'],
      antiTriggers: ['Frontend code', 'Other backend languages'],
      assets: ['service-spec.template.md'],
      references: ['validation-and-errors.md'],
      scripts: [],
    },
    {
      name: 'a11y-automation',
      description: 'Automate accessibility testing with jest-axe',
      badge: 'Testing',
      color: 'text-purple-600',
      triggers: ['+a11y test', '+accessibility audit', '+wcag check'],
      antiTriggers: ['Manual testing only', 'Non-React testing'],
      assets: ['a11y-report.template.md'],
      references: [],
      scripts: ['run-a11y-lint.sh', 'run-axe-playwright.mjs'],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            What are Skills?
          </CardTitle>
          <CardDescription>
            Skills are focused procedures for specific tasks. Each skill is self-contained with clear triggers,
            steps, and progressive disclosure of detailed context.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-3">
            <div>
              <p className="font-medium mb-2">Skill Structure:</p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">SKILL.md</span>
                    <span className="text-muted-foreground ml-2">(Main procedure, must be under 500 lines)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Folder className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">references/</span>
                    <span className="text-muted-foreground ml-2">(Dense material like WCAG checklists, loaded JiT)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Folder className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">assets/</span>
                    <span className="text-muted-foreground ml-2">(Templates and example files, loaded when needed)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Folder className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">scripts/</span>
                    <span className="text-muted-foreground ml-2">(Executable validation and automation tools)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {skills.map((skill, idx) => (
          <Card key={idx} className="border-l-4" style={{ borderLeftColor: skill.color.replace('text-', '') }}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-base font-bold">{skill.name}</code>
                    <Badge className={skill.color} variant="secondary">
                      {skill.badge}
                    </Badge>
                  </div>
                  <CardDescription>{skill.description}</CardDescription>
                </div>
                <BookOpen className={'h-8 w-8 ' + skill.color} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-900 dark:text-green-100">Positive Triggers</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.triggers.map((trigger, triggerIdx) => (
                      <code key={triggerIdx} className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        {trigger}
                      </code>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-900">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-900 dark:text-red-100">Negative Triggers</span>
                  </div>
                  <div className="space-y-1">
                    {skill.antiTriggers.map((trigger, triggerIdx) => (
                      <div key={triggerIdx} className="text-xs text-red-700 dark:text-red-300">
                        ✗ {trigger}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                {skill.assets.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">ASSETS</p>
                    <div className="space-y-1">
                      {skill.assets.map((asset, assetIdx) => (
                        <code key={assetIdx} className="text-xs block text-foreground/80">
                          {asset}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
                {skill.references.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">REFERENCES</p>
                    <div className="space-y-1">
                      {skill.references.map((ref, refIdx) => (
                        <code key={refIdx} className="text-xs block text-foreground/80">
                          {ref}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
                {skill.scripts.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">SCRIPTS</p>
                    <div className="space-y-1">
                      {skill.scripts.map((script, scriptIdx) => (
                        <code key={scriptIdx} className="text-xs block text-foreground/80">
                          {script}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Collapsible 
                open={expandedSkill === skill.name} 
                onOpenChange={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
              >
                <div className="flex items-center justify-between gap-2 pt-2 border-t">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Full SKILL.md
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedSkill === skill.name ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => skill.markdown && copyToClipboard(skill.markdown, skill.name)}
                    className="flex items-center gap-2"
                    disabled={!skill.markdown}
                  >
                    {copiedSkill === skill.name ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Skill
                      </>
                    )}
                  </Button>
                </div>
                <CollapsibleContent>
                  {skill.markdown ? (
                    <>
                      {skill.filePath && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded mt-4">
                          <FolderOpen className="h-3.5 w-3.5" />
                          <code>{skill.filePath}</code>
                        </div>
                      )}
                      <div className="mt-4">
                        <ScrollArea className="h-96 w-full rounded-lg border bg-muted/30">
                          <pre className="p-4 text-xs font-mono whitespace-pre-wrap">
                            {skill.markdown}
                          </pre>
                        </ScrollArea>
                      </div>
                    </>
                  ) : (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                      Markdown content not available for this skill.
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Code2 className="h-5 w-5 text-accent" />
            SKILL.md File Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg font-mono text-xs space-y-3">
            <div>
              <p className="text-muted-foreground">YAML frontmatter (required):</p>
              <pre className="text-foreground mt-1">
{`---
name: skill-directory-name
description: |
  Action-oriented description with positive and 
  negative triggers clearly stated
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">Required sections:</p>
              <ul className="text-foreground space-y-1 mt-1 ml-4">
                <li>• Description (with triggers)</li>
                <li>• Procedures (numbered, deterministic steps)</li>
                <li>• Error Handling (specific, actionable)</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground">Rules:</p>
              <ul className="text-foreground space-y-1 mt-1 ml-4">
                <li>• Must be under 500 lines</li>
                <li>• Use third-person imperative (e.g., "Inspect...", "Run...")</li>
                <li>• Reference assets/references using relative paths</li>
                <li>• No first/second person pronouns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
