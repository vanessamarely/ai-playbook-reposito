import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FileText, Folder, Code2, Play, AlertTriangle } from 'lucide-react'

export default function SkillGuide() {
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
      name: 'waterworks-library',
      description: 'Build components for Waterworks client library',
      badge: 'Client-Specific',
      color: 'text-orange-600',
      triggers: ['+waterworks component', '+client library'],
      antiTriggers: ['General React components', 'Other client projects'],
      assets: ['component-template.tsx'],
      references: ['no-semicolons.md', 'architecture-patterns.md'],
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
