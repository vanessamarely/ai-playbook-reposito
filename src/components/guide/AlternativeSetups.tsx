import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Lightbulb, 
  Terminal, 
  FileText, 
  Folder,
  ArrowRight,
  CheckCircle2,
  Code,
  Settings
} from 'lucide-react'

export default function AlternativeSetups() {
  return (
    <div className="space-y-6">
      <Card className="border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" />
            Alternative AI Tool Configurations
          </CardTitle>
          <CardDescription>
            How to adapt the AI Playbook structure for different AI coding assistants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Not using GitHub Copilot?</AlertTitle>
            <AlertDescription className="text-sm">
              The AI Playbook structure works with any AI assistant. The key is adapting the configuration location and loading mechanism to match your tool's conventions.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="copilot" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="copilot" className="text-xs">GitHub Copilot</TabsTrigger>
              <TabsTrigger value="claude" className="text-xs">Claude Projects</TabsTrigger>
              <TabsTrigger value="cursor" className="text-xs">Cursor Rules</TabsTrigger>
              <TabsTrigger value="amazonq" className="text-xs">Amazon Q</TabsTrigger>
              <TabsTrigger value="tabnine" className="text-xs">Tabnine</TabsTrigger>
              <TabsTrigger value="other" className="text-xs">Other Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="copilot" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Structure</h4>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`.github/
├── copilot-instructions/
│   ├── workspace-policy.md
│   ├── frontend-policy.md
│   ├── backend-policy.md
│   └── style-output.md
├── agents/
├── skills/
└── specs/`}
                  </pre>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>GitHub Copilot automatically reads files from <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code></span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>Progressive loading: reference agents/skills by path when needed</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="claude" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Structure Options</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Option 1</Badge>
                      Cursor/Claude Project Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.cursorrules          (or .claude/project.md)
.github/
├── agents/
├── skills/
└── specs/
docs/
└── ai-context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    └── backend-policy.md`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Put high-level policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code> or project config</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Move detailed policies to <code className="bg-muted px-1.5 py-0.5 rounded text-xs">docs/ai-context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference agents/skills by path: "Load .github/skills/react-components/SKILL.md"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Option 2</Badge>
                      Keep Original Structure + Root Pointer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.cursorrules          (or .claude/project.md)
.github/
├── copilot-instructions/  (keep as-is)
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Add root file (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code>) that references policy files</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Example content: "Follow policies in .github/copilot-instructions/*.md"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Maintains compatibility with both Copilot and Claude/Cursor</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-accent/10 border-accent/30">
                <Code className="h-4 w-4" />
                <AlertTitle className="text-sm">Example .cursorrules</AlertTitle>
                <AlertDescription>
                  <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`# AI Playbook Configuration

Follow workspace policies defined in:
- .github/copilot-instructions/workspace-policy.md
- .github/copilot-instructions/frontend-policy.md
- .github/copilot-instructions/backend-policy.md

When asked to perform complex tasks:
1. Check .github/agents/ for orchestration guidance
2. Load specific skills from .github/skills/ as needed
3. Follow progressive disclosure - read references/ only when required`}
                  </pre>
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="cursor" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Cursor-Specific Setup</h4>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`.cursorrules          (main entry point)
.cursor/
├── rules/
│   ├── workspace.md
│   ├── frontend.md
│   └── backend.md
.github/
├── agents/
├── skills/
└── specs/`}
                  </pre>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Cursor reads <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code> automatically</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Optionally organize rules in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursor/rules/</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Reference .github/* structure for agents/skills (same as Copilot)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amazonq" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Amazon Q Developer Setup</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Recommended</Badge>
                      Customization File Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.aws/
└── amazonq/
    ├── customization.json
    └── context/
        ├── workspace-policy.md
        ├── frontend-policy.md
        └── backend-policy.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.aws/amazonq/customization.json</code> with context references</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Store high-level policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.aws/amazonq/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference .github/agents/ and .github/skills/ for detailed workflows</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example customization.json</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`{
  "customizations": [
    {
      "name": "AI Playbook Context",
      "description": "Workspace policies and development standards",
      "contextFiles": [
        ".aws/amazonq/context/workspace-policy.md",
        ".aws/amazonq/context/frontend-policy.md",
        ".aws/amazonq/context/backend-policy.md"
      ]
    },
    {
      "name": "Progressive Agents & Skills",
      "description": "Load specific agents/skills as needed",
      "instructions": [
        "For complex tasks, check .github/agents/ directory",
        "Load .github/skills/ files based on task context",
        "Follow progressive disclosure pattern"
      ]
    }
  ]
}`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Alternative</Badge>
                      Code Comment Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Amazon Q can also read inline code comments. Add references to AI Playbook in key files:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`// package.json or tsconfig.json comments
// AI Context: Follow .github/copilot-instructions/workspace-policy.md
// For React components: .github/skills/react-components/SKILL.md
// For API endpoints: .github/skills/node-typescript-service/SKILL.md`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tabnine" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Tabnine Setup</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 1</Badge>
                      .tabnine Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.tabnine/
├── config.json
└── context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    └── backend-policy.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.tabnine/config.json</code> with learning preferences</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Add context files to <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.tabnine/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Tabnine learns from codebase patterns automatically</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example .tabnine/config.json</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`{
  "team_learning": {
    "enabled": true,
    "context_files": [
      ".tabnine/context/workspace-policy.md",
      ".tabnine/context/frontend-policy.md",
      ".tabnine/context/backend-policy.md"
    ]
  },
  "code_patterns": {
    "learn_from": [
      ".github/skills/**/SKILL.md",
      ".github/agents/**/AGENT.md"
    ]
  },
  "exclude_patterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**"
  ]
}`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 2</Badge>
                      README-Based Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Tabnine can learn from README files. Create a developer-focused README with AI references:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`DEVELOPMENT.md

## AI Assistant Context

This project uses the AI Playbook framework:
- Policies: .github/copilot-instructions/
- Agents: .github/agents/
- Skills: .github/skills/

When generating code:
1. Follow workspace-policy.md for scope rules
2. Check frontend-policy.md or backend-policy.md
3. Reference specific skills for complex tasks`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle className="text-sm">Tabnine Learning</AlertTitle>
                  <AlertDescription className="text-sm">
                    Tabnine learns from your codebase patterns. Consistent file structure and naming conventions in .github/ help it understand your project's AI context organization.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Generic Approach for Any AI Tool</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Universal Pattern</CardTitle>
                    <CardDescription className="text-xs">
                      Works with Cody, Sourcegraph, Kite, and custom AI assistants
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`docs/
└── ai-context/
    ├── 00-index.md         (entry point)
    ├── workspace-policy.md
    ├── frontend-policy.md
    ├── backend-policy.md
    └── style-output.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>For tools without special config locations:</p>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create a <code className="bg-muted px-1.5 py-0.5 rounded text-xs">docs/ai-context/</code> directory</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Add <code className="bg-muted px-1.5 py-0.5 rounded text-xs">00-index.md</code> explaining the structure</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Manually reference files in your AI tool's chat/context window</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example 00-index.md</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`# AI Context Index

This project uses the AI Playbook framework for consistent AI assistance.

## Quick Reference
- **Workspace Rules**: workspace-policy.md
- **Frontend Standards**: frontend-policy.md  
- **Backend Standards**: backend-policy.md
- **Output Style**: style-output.md

## Agents & Skills
Complex tasks follow agent workflows:
- Agents: ../.github/agents/
- Skills: ../.github/skills/

Load specific files as needed using progressive disclosure.`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Tool-Specific Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">Cody</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">Sourcegraph Cody</p>
                          <p className="text-muted-foreground text-xs">Use <code className="bg-muted px-1.5 py-0.5 rounded">.cody/</code> directory or add context via @-mentions in chat</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">Kite</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">Kite</p>
                          <p className="text-muted-foreground text-xs">Learns from local codebase patterns automatically; consistent structure helps</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">Custom</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">Custom AI Assistants</p>
                          <p className="text-muted-foreground text-xs">Add docs/ai-context/ path to system prompt or RAG context retrieval</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">ChatGPT</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">ChatGPT / Web-Based Tools</p>
                          <p className="text-muted-foreground text-xs">Copy-paste relevant policy files as context; reference .github/ paths when needed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Key Principle: Location-Agnostic Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                The <strong>content</strong> of policies, agents, and skills remains the same regardless of tool. Only the <strong>loading mechanism</strong> changes:
              </p>
              <div className="grid gap-2">
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>GitHub Copilot:</strong> <span className="text-muted-foreground">Auto-loads from .github/copilot-instructions/</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Cursor/Claude:</strong> <span className="text-muted-foreground">Use .cursorrules or project config to reference files</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Manual Tools:</strong> <span className="text-muted-foreground">Add docs/ai-context/ and paste into context as needed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
