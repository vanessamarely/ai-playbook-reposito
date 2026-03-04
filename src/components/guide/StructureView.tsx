import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FolderTree, FileCode, Braces, Wrench, Info, Lightbulb } from 'lucide-react'

export default function StructureView() {
  const githubStructure = [
    {
      name: '.github/',
      type: 'directory',
      icon: FolderTree,
      description: 'Root GitHub configuration directory',
      children: [
        {
          name: 'copilot-instructions/',
          type: 'directory',
          icon: FileCode,
          badge: 'Policies',
          description: 'High-level rules loaded by GitHub Copilot',
          items: [
            { name: 'workspace-policy.md', desc: 'Project isolation & scope rules' },
            { name: 'frontend-policy.md', desc: 'React/TS + accessibility guidelines' },
            { name: 'backend-policy.md', desc: 'Multi-language backend conventions' },
            { name: '[library-name]-overrides.md', desc: 'Client-specific style rules (optional)' },
            { name: 'style-output.md', desc: 'Output formatting standards' },
          ],
        },
        {
          name: 'agents/',
          type: 'directory',
          icon: Braces,
          badge: 'Orchestration',
          description: 'Complex task coordinators (shared across all AI tools)',
          items: [
            { name: 'scan-workspace/', desc: 'Detect project type & route to skills' },
            { name: 'react-component-builder/', desc: 'Build accessible React components' },
            { name: 'a11y-audit-react/', desc: 'Audit accessibility compliance' },
            { name: 'node-microservice-builder/', desc: 'Create Node.js services' },
            { name: 'pr-reviewer/', desc: 'Review pull requests' },
          ],
        },
        {
          name: 'skills/',
          type: 'directory',
          icon: Wrench,
          badge: 'Procedures',
          description: 'Focused task procedures (shared across all AI tools)',
          items: [
            { name: 'skill-creator/', desc: 'Generate new skills with templates' },
            { name: 'react-components/', desc: 'Build React/TS components' },
            { name: '[library-name]/', desc: 'Client component library (optional)' },
            { name: 'node-typescript-service/', desc: 'Node/TS service development' },
            { name: 'a11y-automation/', desc: 'Accessibility testing automation' },
          ],
        },
        {
          name: 'specs/',
          type: 'directory',
          icon: FileCode,
          badge: 'Templates',
          description: 'Specification templates (shared across all AI tools)',
          items: [
            { name: 'templates/react-component.spec.md', desc: 'Component spec template' },
            { name: 'templates/node-endpoint.spec.md', desc: 'Endpoint spec template' },
          ],
        },
      ],
    },
    {
      name: 'tools/',
      type: 'directory',
      icon: Wrench,
      description: 'Deterministic utility scripts',
      items: [
        { name: 'project-detect.mjs', desc: 'Detect project type from structure' },
        { name: 'scope-guard.mjs', desc: 'Validate file changes stay in scope' },
        { name: 'diagnostics-summarizer.mjs', desc: 'Summarize build/lint errors' },
      ],
    },
  ]

  const alternativeStructures = [
    {
      name: 'Claude / Cursor / Cline',
      structure: [
        { path: '.cursorrules (or .clinerules)', desc: 'Main entry point' },
        { path: '.github/agents/', desc: '✓ Shared agents (same as Copilot)' },
        { path: '.github/skills/', desc: '✓ Shared skills (same as Copilot)' },
        { path: 'docs/ai-context/', desc: 'Alternative location for policies' },
      ],
      note: 'Reference .github/copilot-instructions/*.md files from .cursorrules or move policies to docs/ai-context/'
    },
    {
      name: 'Gemini CLI',
      structure: [
        { path: '.gemini/config.yaml', desc: 'Configuration file' },
        { path: '.gemini/context/', desc: 'Policy files (workspace, frontend, backend)' },
        { path: '.github/agents/', desc: '✓ Shared agents (same as Copilot)' },
        { path: '.github/skills/', desc: '✓ Shared skills (same as Copilot)' },
      ],
      note: 'Use --context flag in CLI to reference specific agents/skills'
    },
    {
      name: 'OpenAI Codex API',
      structure: [
        { path: '.openai/config.json', desc: 'API configuration' },
        { path: '.openai/context/', desc: 'Policy files loaded as system prompts' },
        { path: '.github/agents/', desc: '✓ Shared agents (same as Copilot)' },
        { path: '.github/skills/', desc: '✓ Shared skills (same as Copilot)' },
      ],
      note: 'Load policies and skills programmatically via OpenAI API'
    },
    {
      name: 'Amazon Q',
      structure: [
        { path: '.aws/amazonq/customization.json', desc: 'Customization config' },
        { path: '.aws/amazonq/context/', desc: 'Policy files' },
        { path: '.github/agents/', desc: '✓ Shared agents (same as Copilot)' },
        { path: '.github/skills/', desc: '✓ Shared skills (same as Copilot)' },
      ],
      note: 'Reference context files in customization.json'
    },
    {
      name: 'Tabnine',
      structure: [
        { path: '.tabnine/config.json', desc: 'Team learning configuration' },
        { path: '.tabnine/context/', desc: 'Policy files for team learning' },
        { path: '.github/agents/', desc: '✓ Shared agents (same as Copilot)' },
        { path: '.github/skills/', desc: '✓ Shared skills (same as Copilot)' },
      ],
      note: 'Tabnine learns from codebase patterns automatically'
    },
  ]

  const renderGithubStructure = () => (
    <div className="space-y-6">
      {githubStructure.map((item, idx) => (
        <div key={idx} className="space-y-3">
          <div className="flex items-center gap-2">
            <item.icon className="h-5 w-5 text-accent" />
            <code className="text-sm font-semibold bg-muted px-2 py-1 rounded">
              {item.name}
            </code>
            <span className="text-sm text-muted-foreground">{item.description}</span>
          </div>

          {item.children && (
            <div className="ml-8 space-y-4 border-l-2 border-border pl-6">
              {item.children.map((child, childIdx) => (
                <Card key={childIdx} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <child.icon className="h-4 w-4 text-primary" />
                      <code className="text-sm font-medium">{child.name}</code>
                      <Badge variant="secondary" className="text-xs">
                        {child.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{child.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5">
                      {child.items.map((subItem, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-2 text-xs">
                          <span className="text-accent mt-1">●</span>
                          <div>
                            <code className="font-medium text-foreground">{subItem.name}</code>
                            <span className="text-muted-foreground ml-2">{subItem.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {item.items && !item.children && (
            <div className="ml-8 border-l-2 border-border pl-6">
              <ul className="space-y-1.5">
                {item.items.map((subItem, subIdx) => (
                  <li key={subIdx} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1">●</span>
                    <div>
                      <code className="font-medium text-foreground">{subItem.name}</code>
                      <span className="text-muted-foreground ml-2">{subItem.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary" />
            Repository Structure
          </CardTitle>
          <CardDescription>
            Organization of policies, agents, skills, and tools across different AI tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Multi-Tool Compatible</AlertTitle>
            <AlertDescription className="text-sm">
              The core structure (.github/agents/ and .github/skills/) is shared across all AI tools. Only the policy location and loading mechanism differ per tool.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="github" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="github" className="text-xs">GitHub Copilot</TabsTrigger>
              <TabsTrigger value="claude" className="text-xs">Claude/Cursor</TabsTrigger>
              <TabsTrigger value="gemini" className="text-xs">Gemini</TabsTrigger>
              <TabsTrigger value="openai" className="text-xs">OpenAI</TabsTrigger>
              <TabsTrigger value="amazon" className="text-xs">Amazon Q</TabsTrigger>
              <TabsTrigger value="tabnine" className="text-xs">Tabnine</TabsTrigger>
            </TabsList>

            <TabsContent value="github" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">Standard Structure</Badge>
                <span className="text-sm text-muted-foreground">GitHub Copilot reads .github/copilot-instructions/ automatically</span>
              </div>
              {renderGithubStructure()}
            </TabsContent>

            {alternativeStructures.map((alt) => (
              <TabsContent 
                key={alt.name.toLowerCase().replace(/\s+/g, '-')} 
                value={alt.name.toLowerCase().split('/')[0].trim()}
                className="space-y-4 mt-6"
              >
                <Card className="bg-accent/5 border-accent/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-accent" />
                      {alt.name} Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-background p-4 rounded-lg border border-border">
                      <ul className="space-y-2">
                        {alt.structure.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-accent mt-1">●</span>
                            <div className="flex-1">
                              <code className="font-medium text-foreground bg-muted px-1.5 py-0.5 rounded text-xs">
                                {item.path}
                              </code>
                              <span className="text-muted-foreground ml-2">{item.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {alt.note}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Shared Components</CardTitle>
                    <CardDescription className="text-xs">
                      These directories are identical across all AI tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Braces className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <code className="text-sm font-medium">.github/agents/</code>
                          <p className="text-xs text-muted-foreground mt-1">Orchestration layer for complex tasks</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Wrench className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <code className="text-sm font-medium">.github/skills/</code>
                          <p className="text-xs text-muted-foreground mt-1">Focused procedures for specific tasks</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <FileCode className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <code className="text-sm font-medium">.github/specs/</code>
                          <p className="text-xs text-muted-foreground mt-1">Specification templates</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Key Principle: Shared Core, Tool-Specific Loaders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                The <strong>agents and skills</strong> are <strong>universal</strong> - they work with any AI tool. Only the <strong>policy files location and loading mechanism</strong> differ:
              </p>
              <div className="grid gap-2 text-xs">
                <div className="flex items-start gap-2 p-2 bg-background rounded">
                  <Badge variant="outline" className="shrink-0">Copilot</Badge>
                  <span className="text-muted-foreground">Auto-loads from .github/copilot-instructions/</span>
                </div>
                <div className="flex items-start gap-2 p-2 bg-background rounded">
                  <Badge variant="outline" className="shrink-0">Claude</Badge>
                  <span className="text-muted-foreground">References from .cursorrules or .clinerules</span>
                </div>
                <div className="flex items-start gap-2 p-2 bg-background rounded">
                  <Badge variant="outline" className="shrink-0">Others</Badge>
                  <span className="text-muted-foreground">Tool-specific config files point to policies, agents loaded on demand</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
