import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Folder, Code2, Play, AlertTriangle, Copy, Check, ChevronDown, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ToolPath {
  tool: string
  path: string
  note?: string
}

export default function SkillGuide() {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const copyToClipboard = (content: string, skillName: string) => {
    navigator.clipboard.writeText(content)
    setCopiedSkill(skillName)
    toast.success(`${skillName} skill copied to clipboard!`)
    setTimeout(() => setCopiedSkill(null), 2000)
  }

  const pathsFor = (name: string): ToolPath[] => [
    { tool: 'Claude Code', path: `.claude/skills/${name}/SKILL.md` },
    { tool: 'Codex CLI', path: `.agents/skills/${name}/SKILL.md`, note: 'same path Copilot & Cursor also read' },
    { tool: 'GitHub Copilot', path: `.github/skills/${name}/SKILL.md`, note: 'native since 2026 — also checks .claude/skills/ & .agents/skills/' },
    { tool: 'Cursor', path: `.cursor/skills/${name}/SKILL.md`, note: 'native since Cursor 2.4 — also checks .agents/skills/' },
  ]

  const skills = [
    {
      name: 'skill-creator',
      description: 'Scaffold new skills following the Agent Skills open standard',
      badge: 'Meta',
      color: 'text-indigo-600',
      triggers: ['create a new skill', 'write SKILL.md', 'define agent procedures'],
      antiTriggers: ['Writing README/changelog', 'General questions'],
      assets: ['skill-template.md'],
      references: ['checklist.md'],
      scripts: ['validate-metadata.py'],
      markdown: `---
name: skill-creator
description: Scaffolds new Claude Code skills following the official Agent Skills format (SKILL.md with YAML frontmatter, progressive disclosure, agent-oriented procedural instructions). Use when the user wants to author a new skill for this playbook, convert prose documentation into a skill, or validate an existing SKILL.md. Do not use for writing human-facing README files, changelogs, or general project documentation.
when_to_use: create a new skill, scaffold skill documentation, add agent skill, write SKILL.md, define agent procedures
disable-model-invocation: true
---

# Skill: Skill Creator

## Purpose

Generate new \`SKILL.md\` documentation that follows Claude Code's official Agent Skills format (see agentskills.io) with valid frontmatter and agent-oriented instructions.

## Inputs

- Skill name (lowercase, numbers, hyphens only)
- Skill purpose and scope
- Target procedures and decision points

## Outputs

- \`SKILL.md\` file with valid frontmatter, placed at \`.claude/skills/<name>/SKILL.md\`
- Optional supporting files (\`references/\`, \`assets/\`, \`scripts/\`)

## Procedures

### 1. Validate Skill Name

Check that the name contains only lowercase letters, numbers, and hyphens; matches the parent directory name; and is unique.

Execute: \`python \${CLAUDE_SKILL_DIR}/scripts/validate-metadata.py <skillName>\`

### 2. Load Template

Read: \`assets/skill-template.md\`

### 3. Populate Frontmatter

Real Claude Code frontmatter fields (all optional except \`description\`, which is strongly recommended):
- \`name\`: Display name; defaults to the directory name.
- \`description\`: What the skill does and when to use it.
- \`when_to_use\`: Extra trigger phrases or example requests.
- \`disable-model-invocation\`: \`true\` for skills only run via explicit \`/skill-name\`.
- \`allowed-tools\`, \`context: fork\`, \`agent\`: advanced execution controls.

Do not invent fields outside this list.

### 4-8. Purpose, Inputs, Outputs, Procedures, Error Handling

Write a single-paragraph purpose (what/when/what-it-does-NOT-do), list inputs/outputs, write numbered third-person-imperative steps with explicit decision branches, and list failure modes with remediation.

### 9. Apply Progressive Disclosure

If any procedure step exceeds 10 lines, extract it to \`references/<topic>.md\` and replace with a pointer.

### 10. Add Supporting Files

\`references/\` for conceptual guides, \`assets/\` for templates, \`scripts/\` for executable tools.

### 11-12. Validate Line Count & Metadata

Keep \`SKILL.md\` under 500 lines. Run \`python \${CLAUDE_SKILL_DIR}/scripts/validate-metadata.py <skillPath>\` to check name format, combined description length (under 1,536 characters), and pronoun usage.

## Error Handling

**Invalid skill name**: Must match \`^[a-z0-9-]+$\`.

**Pronouns detected**: Rewrite description in third-person imperative.

**File too long**: Move content to \`references/\` or \`assets/\`.

## References

- Checklist: \`references/checklist.md\`
- Cross-tool adaptation: see \`.agents/skills/skill-creator/SKILL.md\` (Codex) and \`.cursor/commands/skill-creator.md\` (Cursor).`,
    },
    {
      name: 'react-components',
      description: 'Build accessible React/TypeScript components',
      badge: 'Frontend',
      color: 'text-blue-600',
      triggers: ['build a UI component', 'add keyboard navigation', 'fix accessibility in a component'],
      antiTriggers: ['Backend code', 'Non-React frameworks'],
      assets: ['component-spec.template.md', 'pr-checklist.md'],
      references: ['a11y-wcag22.md', 'react-ts-patterns.md'],
      scripts: [],
    },
    {
      name: 'figma-component',
      description: 'Convert Figma designs into reusable React/TypeScript components',
      badge: 'Design-to-Code',
      color: 'text-orange-600',
      triggers: ['convert figma to component', 'build component from figma node'],
      antiTriggers: ['Backend code', 'No UI/design context'],
      assets: [],
      references: [],
      scripts: [],
    },
    {
      name: 'node-typescript-service',
      description: 'Build Node.js/TypeScript backend services',
      badge: 'Backend',
      color: 'text-green-600',
      triggers: ['create API endpoint', 'build microservice', 'add route handler'],
      antiTriggers: ['Frontend code', 'Other backend languages'],
      assets: ['service-spec.template.md'],
      references: ['validation-and-errors.md'],
      scripts: [],
    },
    {
      name: 'a11y-automation',
      description: 'Automate accessibility testing with eslint-plugin-jsx-a11y and Playwright/axe-core',
      badge: 'Testing',
      color: 'text-purple-600',
      triggers: ['run accessibility tests', 'set up axe testing', 'integrate accessibility into CI'],
      antiTriggers: ['Manual review only', 'Non-browser environments'],
      assets: ['a11y-report.template.md'],
      references: [],
      scripts: ['run-a11y-lint.sh', 'run-axe-playwright.mjs'],
    },
    {
      name: 'ai-tool-setup',
      description: 'Generate and update AI instruction files for all 4 supported tools',
      badge: 'Setup',
      color: 'text-teal-600',
      triggers: ['set up AI tool instructions', 'add AGENTS.md for Codex', 'sync AI assistant config'],
      antiTriggers: ['Feature implementation', 'Code refactoring'],
      assets: ['copilot-instructions.template.md', 'claude.template.md', 'cursor-rules.template.md', 'agents-md.template.md'],
      references: ['tool-formats.md', 'skill-routing.md'],
      scripts: [],
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
            Skills are focused, self-contained procedures using the open Agent Skills standard (SKILL.md). As of 2026 all four
            tools support this same folder-based format natively — GitHub Copilot and Cursor added it that year, joining Claude Code and Codex CLI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-3">
            <div>
              <p className="font-medium mb-2">Full Skill Structure (all 4 tools support this since 2026):</p>
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
              <div className="grid sm:grid-cols-2 gap-1.5">
                {pathsFor(skill.name).map((p) => (
                  <div key={p.tool} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded">
                    <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-medium text-foreground shrink-0">{p.tool}:</span>
                    <code className="truncate">{p.path}</code>
                    {p.note && <span className="text-[10px] italic shrink-0">({p.note})</span>}
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-900 dark:text-green-100">when_to_use phrases</span>
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
                    <span className="text-sm font-semibold text-red-900 dark:text-red-100">"Do not use for" (in description)</span>
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
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded mt-4">
                        <FolderOpen className="h-3.5 w-3.5" />
                        <code>.claude/skills/{skill.name}/SKILL.md</code>
                      </div>
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
                      Full markdown not shown here — see the file paths above for where this skill's real content lives per tool.
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
            SKILL.md Frontmatter, By Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg font-mono text-xs space-y-3">
            <div>
              <p className="text-muted-foreground">Claude Code — .claude/skills/&lt;name&gt;/SKILL.md:</p>
              <pre className="text-foreground mt-1">
{`---
name: skill-directory-name
description: What it does and when to use it
when_to_use: extra trigger phrases (optional)
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">Codex CLI — .agents/skills/&lt;name&gt;/SKILL.md (spec is deliberately minimal):</p>
              <pre className="text-foreground mt-1">
{`---
name: skill-directory-name
description: What it does and when to use it
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">GitHub Copilot — .github/skills/&lt;name&gt;/SKILL.md (native since 2026; also checks .claude/skills/ and .agents/skills/):</p>
              <pre className="text-foreground mt-1">
{`---
name: skill-directory-name
description: What it does and when to use it
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">Cursor — .cursor/skills/&lt;name&gt;/SKILL.md (native since Cursor 2.4; also checks .agents/skills/ and, for legacy compatibility, .claude/skills/):</p>
              <pre className="text-foreground mt-1">
{`---
name: skill-directory-name
description: What it does and when to use it
paths: "**/*.tsx,**/*.jsx"  # optional glob scoping
---`}
              </pre>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            All four formats support the full folder (SKILL.md + scripts/references/assets) — keep SKILL.md under 500 lines,
            write third-person imperative procedure steps, and reference supporting files with relative paths. Cursor and Copilot's
            .cursor/rules/ and .github/instructions/ remain separate mechanisms for short always-on or glob-scoped guidelines, not skills.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
