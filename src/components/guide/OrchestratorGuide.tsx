import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Network, 
  Cpu, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Info,
  Lightbulb,
  GitBranch,
  Layers,
  Route
} from 'lucide-react'

export default function OrchestratorGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            General Orchestrator System
          </CardTitle>
          <CardDescription>
            A unified agent and skill system that works across GitHub Copilot, Claude, Cursor, Amazon Q, and other AI tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Core Principle: Write Once, Use Everywhere</AlertTitle>
            <AlertDescription className="text-sm">
              The general orchestrator lets you define agents and skills once, then use them across different AI tools
              by adapting only the loading mechanism, not the content.
            </AlertDescription>
          </Alert>

          <div className="bg-background p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Cpu className="h-4 w-4 text-accent" />
              How It Works
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Common Core:</strong> All policies, agents, and skills live in 
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs mx-1">.github/</code> directory
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Tool-Specific Loaders:</strong> Each AI tool has a root configuration 
                  file that references the common core
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Progressive Loading:</strong> Agents reference skills as needed, 
                  skills reference detailed docs only when required
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            Repository Structure with Orchestrator
          </CardTitle>
          <CardDescription>
            A unified structure that supports multiple AI tools simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-2">
            <div className="text-foreground">
              <div className="text-accent mb-2"># Core framework (tool-agnostic)</div>
              <div>.github/</div>
              <div className="ml-4">
                <div>├── agents/          <span className="text-muted-foreground"># Orchestration workflows</span></div>
                <div>├── skills/          <span className="text-muted-foreground"># Task procedures</span></div>
                <div>└── specs/           <span className="text-muted-foreground"># Templates</span></div>
              </div>
              
              <div className="text-accent mt-4 mb-2"># Tool-specific loaders (choose based on your AI tool)</div>
              <div>├── .github/copilot-instructions/  <span className="text-muted-foreground"># GitHub Copilot</span></div>
              <div>├── .cursorrules                    <span className="text-muted-foreground"># Cursor IDE</span></div>
              <div>├── .claude/project.md              <span className="text-muted-foreground"># Claude Projects</span></div>
              <div>├── .aws/amazonq/customization.json <span className="text-muted-foreground"># Amazon Q</span></div>
              <div>└── .tabnine/config.json            <span className="text-muted-foreground"># Tabnine</span></div>
              
              <div className="text-accent mt-4 mb-2"># Optional: Manual context directory</div>
              <div>docs/ai-context/                    <span className="text-muted-foreground"># For tools without auto-loading</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Multi-Tool Setup Strategies
          </CardTitle>
          <CardDescription>
            Different approaches for supporting multiple AI tools in the same repository
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-muted/50 border-accent/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Badge variant="outline">Strategy 1</Badge>
                Universal Loader Files (Recommended)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Create loader files for all tools you use, each pointing to the same core content.
              </p>
              
              <div className="space-y-3">
                <div className="bg-background p-3 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Example: .cursorrules</p>
                  <pre className="text-xs font-mono">
{`# AI Playbook Orchestrator

Follow policies in .github/copilot-instructions/
Load agents from .github/agents/ as needed
Load skills from .github/skills/ as needed`}
                  </pre>
                </div>

                <div className="bg-background p-3 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Example: .aws/amazonq/customization.json</p>
                  <pre className="text-xs font-mono">
{`{
  "contextFiles": [
    ".github/copilot-instructions/workspace-policy.md",
    ".github/copilot-instructions/frontend-policy.md",
    ".github/copilot-instructions/backend-policy.md"
  ]
}`}
                  </pre>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Benefit:</strong> Team members can use different AI tools on the same codebase
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-accent/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Badge variant="outline">Strategy 2</Badge>
                Symlinks for Consistency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Create symlinks from tool-specific locations to the canonical <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code> folder.
              </p>
              
              <div className="bg-background p-4 rounded-lg">
                <pre className="text-xs font-mono">
{`# Create symlinks to avoid duplication
ln -s .github/copilot-instructions .cursor/rules
ln -s .github/copilot-instructions docs/ai-context`}
                </pre>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Benefit:</strong> Zero duplication, all tools read the exact same files
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-accent/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Badge variant="outline">Strategy 3</Badge>
                Runtime Model Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Define agents and skills with model hints, allowing the orchestrator to adapt based on the AI tool in use.
              </p>
              
              <div className="bg-background p-4 rounded-lg">
                <pre className="text-xs font-mono">
{`# In AGENT.md frontmatter
---
description: React component builder
models:
  copilot: "Load full context progressively"
  claude: "Load all references upfront"
  cursor: "Use codebase search first"
---`}
                </pre>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Benefit:</strong> Optimized behavior per tool while maintaining unified content
                </span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Agent Reusability Pattern
          </CardTitle>
          <CardDescription>
            How agents reference skills without duplication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Progressive Disclosure Example</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Step 1</Badge>
                <span className="text-muted-foreground">AI tool loads appropriate loader file (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code>, etc.)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Step 2</Badge>
                <span className="text-muted-foreground">Loader references high-level policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code></span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Step 3</Badge>
                <span className="text-muted-foreground">On complex task, policy directs to appropriate agent in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/agents/</code></span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Step 4</Badge>
                <span className="text-muted-foreground">Agent loads specific skills from <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/skills/</code></span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Step 5</Badge>
                <span className="text-muted-foreground">Skills load references/assets only when needed</span>
              </div>
            </div>
          </div>

          <Alert className="bg-accent/10 border-accent/30">
            <Info className="h-4 w-4" />
            <AlertTitle>Key Insight: Same Content, Different Entry Points</AlertTitle>
            <AlertDescription className="text-sm">
              GitHub Copilot starts at <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code>,
              Cursor starts at <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code>,
              but both end up reading the same agents and skills. The orchestrator pattern eliminates duplication.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Implementation Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>Create core framework in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/</code> (agents, skills, specs)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>Define high-level policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>Add loader files for each AI tool your team uses</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>Ensure all loaders reference the same core <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/</code> structure</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>Document the orchestrator pattern in your team's onboarding</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>Test with multiple AI tools to verify consistency</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5 text-accent" />
            Skill Routing by AI Tool
          </CardTitle>
          <CardDescription>
            Common skills and their file paths across different AI assistants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="github-copilot" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="github-copilot" className="text-xs">GitHub Copilot</TabsTrigger>
              <TabsTrigger value="claude" className="text-xs">Claude</TabsTrigger>
              <TabsTrigger value="cursor" className="text-xs">Cursor</TabsTrigger>
              <TabsTrigger value="cline" className="text-xs">Cline</TabsTrigger>
              <TabsTrigger value="other" className="text-xs">Other Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="github-copilot" className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm">GitHub Copilot Structure</AlertTitle>
                <AlertDescription className="text-xs">
                  GitHub Copilot automatically reads from <code className="bg-muted px-1 py-0.5 rounded">.github/</code> directories
                </AlertDescription>
              </Alert>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Task</th>
                      <th className="text-left p-3 font-semibold">Skill Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Build or modify React components</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          ai-playbook/.github/skills/react-components/SKILL.md
                        </code>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Run or integrate accessibility tests</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          ai-playbook/.github/skills/a11y-automation/SKILL.md
                        </code>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create or extend Node.js/TypeScript services</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          ai-playbook/.github/skills/node-typescript-service/SKILL.md
                        </code>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create a new skill</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          ai-playbook/.github/skills/skill-creator/SKILL.md
                        </code>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Configure AI tool instructions</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          ai-playbook/.github/skills/ai-tool-setup/SKILL.md
                        </code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="claude" className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm">Claude Projects Structure</AlertTitle>
                <AlertDescription className="text-xs">
                  Claude Projects can reference skills from <code className="bg-muted px-1 py-0.5 rounded">.github/</code> or use <code className="bg-muted px-1 py-0.5 rounded">.claude/</code> directory
                </AlertDescription>
              </Alert>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Task</th>
                      <th className="text-left p-3 font-semibold">Skill Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Build or modify React components</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .claude/skills/react-components/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Run or integrate accessibility tests</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .claude/skills/a11y-automation/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create or extend Node.js/TypeScript services</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .claude/skills/node-typescript-service/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create a new skill</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .claude/skills/skill-creator/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Configure AI tool instructions</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .claude/skills/ai-tool-setup/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="cursor" className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm">Cursor Structure</AlertTitle>
                <AlertDescription className="text-xs">
                  Cursor uses <code className="bg-muted px-1 py-0.5 rounded">.cursor/</code> or <code className="bg-muted px-1 py-0.5 rounded">.cursorrules</code> to reference skills
                </AlertDescription>
              </Alert>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Task</th>
                      <th className="text-left p-3 font-semibold">Skill Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Build or modify React components</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cursor/skills/react-components/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .cursorrules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Run or integrate accessibility tests</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cursor/skills/a11y-automation/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .cursorrules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create or extend Node.js/TypeScript services</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cursor/skills/node-typescript-service/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .cursorrules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create a new skill</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cursor/skills/skill-creator/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .cursorrules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Configure AI tool instructions</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cursor/skills/ai-tool-setup/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .cursorrules</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="cline" className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm">Cline Structure</AlertTitle>
                <AlertDescription className="text-xs">
                  Cline uses <code className="bg-muted px-1 py-0.5 rounded">.cline/</code> or <code className="bg-muted px-1 py-0.5 rounded">.clinerules</code> to configure skills
                </AlertDescription>
              </Alert>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Task</th>
                      <th className="text-left p-3 font-semibold">Skill Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Build or modify React components</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cline/skills/react-components/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .clinerules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Run or integrate accessibility tests</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cline/skills/a11y-automation/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .clinerules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create or extend Node.js/TypeScript services</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cline/skills/node-typescript-service/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .clinerules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create a new skill</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cline/skills/skill-creator/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .clinerules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Configure AI tool instructions</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          .cline/skills/ai-tool-setup/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or reference via .clinerules</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm">Other AI Tools</AlertTitle>
                <AlertDescription className="text-xs">
                  For tools without auto-loading, use <code className="bg-muted px-1 py-0.5 rounded">docs/ai-context/</code> or manually reference paths
                </AlertDescription>
              </Alert>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Task</th>
                      <th className="text-left p-3 font-semibold">Skill Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Build or modify React components</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          docs/ai-context/skills/react-components/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Run or integrate accessibility tests</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          docs/ai-context/skills/a11y-automation/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create or extend Node.js/TypeScript services</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          docs/ai-context/skills/node-typescript-service/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Create a new skill</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          docs/ai-context/skills/skill-creator/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3">Configure AI tool instructions</td>
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          docs/ai-context/skills/ai-tool-setup/SKILL.md
                        </code>
                        <div className="text-xs text-muted-foreground mt-1">or ai-playbook/.github/skills/...</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          <Alert className="bg-accent/10 border-accent/30 mt-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle className="text-sm">Key Principle</AlertTitle>
            <AlertDescription className="text-xs">
              The skill content remains identical across all tools - only the directory structure changes. 
              You can symlink or reference the same <code className="bg-muted px-1 py-0.5 rounded">ai-playbook/.github/skills/</code> 
              from any AI tool's configuration.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
