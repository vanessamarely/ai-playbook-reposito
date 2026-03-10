import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  GitBranch,
  FolderTree,
  FileCode,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
  AlertCircle,
  Layers
} from 'lucide-react'

export default function StructureComparison() {
  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-accent" />
            GitHub Copilot vs Claude AI: Visual Structure Comparison
          </CardTitle>
          <CardDescription>
            Side-by-side comparison of folder structures, file naming, and orchestration patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Key Takeaway</AlertTitle>
            <AlertDescription className="text-sm">
              Both tools use the same concepts (orchestrator, agents, skills, policies) but organize them differently. GitHub Copilot uses <code className="bg-muted px-1.5 py-0.5 rounded">.github/</code> with UPPERCASE files, Claude AI uses root-level directories with lowercase files.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-accent/10 border-accent/40">
              <CardHeader className="pb-4">
                <Badge className="w-fit mb-2 bg-accent text-accent-foreground">GitHub Copilot</Badge>
                <CardTitle className="text-lg">Folder Structure</CardTitle>
                <CardDescription className="text-xs">Uses .github/ directory pattern</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg">
                  <div className="font-mono text-xs space-y-0.5">
                    <div className="text-foreground font-semibold">project-root/</div>
                    <div className="pl-4 text-accent font-medium">├── .github/</div>
                    <div className="pl-8 text-primary">│   ├── orchestrator.md</div>
                    <div className="pl-8 text-foreground">│   ├── copilot-instructions/</div>
                    <div className="pl-12 text-muted-foreground">│   │   ├── workspace-policy.md</div>
                    <div className="pl-12 text-muted-foreground">│   │   ├── frontend-policy.md</div>
                    <div className="pl-12 text-muted-foreground">│   │   ├── backend-policy.md</div>
                    <div className="pl-12 text-muted-foreground">│   │   └── style-output.md</div>
                    <div className="pl-8 text-foreground">│   ├── agents/</div>
                    <div className="pl-12 text-muted-foreground">│   │   ├── scan-workspace/</div>
                    <div className="pl-16 text-accent">│   │   │   └── AGENT.md</div>
                    <div className="pl-12 text-muted-foreground">│   │   ├── react-component-builder/</div>
                    <div className="pl-16 text-accent">│   │   │   └── AGENT.md</div>
                    <div className="pl-12 text-muted-foreground">│   │   └── code-reviewer/</div>
                    <div className="pl-16 text-accent">│   │       └── AGENT.md</div>
                    <div className="pl-8 text-foreground">│   ├── skills/</div>
                    <div className="pl-12 text-muted-foreground">│   │   ├── react-components/</div>
                    <div className="pl-16 text-accent">│   │   │   └── SKILL.md</div>
                    <div className="pl-12 text-muted-foreground">│   │   └── node-typescript-service/</div>
                    <div className="pl-16 text-accent">│   │       └── SKILL.md</div>
                    <div className="pl-8 text-foreground">│   └── specs/</div>
                    <div className="pl-12 text-muted-foreground">│       └── templates/</div>
                    <div className="pl-4">└── src/</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    Key Characteristics
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>Everything inside <code className="bg-muted px-1 rounded">.github/</code> directory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>Policies in <code className="bg-muted px-1 rounded">copilot-instructions/</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>UPPERCASE filenames: <code className="bg-muted px-1 rounded">AGENT.md</code>, <code className="bg-muted px-1 rounded">SKILL.md</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>Orchestrator at <code className="bg-muted px-1 rounded">.github/orchestrator.md</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>Native GitHub integration</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/40">
              <CardHeader className="pb-4">
                <Badge className="w-fit mb-2 bg-primary text-primary-foreground">Claude AI</Badge>
                <CardTitle className="text-lg">Folder Structure</CardTitle>
                <CardDescription className="text-xs">Uses root-level directories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg">
                  <div className="font-mono text-xs space-y-0.5">
                    <div className="text-foreground font-semibold">project-root/</div>
                    <div className="pl-4 text-muted-foreground">├── .cursorrules</div>
                    <div className="pl-4 text-muted-foreground">├── .clinerules</div>
                    <div className="pl-4 text-primary font-medium">├── orchestrator.md</div>
                    <div className="pl-4 text-accent font-medium">├── policies/</div>
                    <div className="pl-8 text-muted-foreground">│   ├── workspace-policy.md</div>
                    <div className="pl-8 text-muted-foreground">│   ├── frontend-policy.md</div>
                    <div className="pl-8 text-muted-foreground">│   ├── backend-policy.md</div>
                    <div className="pl-8 text-muted-foreground">│   └── style-output.md</div>
                    <div className="pl-4 text-accent font-medium">├── agents/</div>
                    <div className="pl-8 text-muted-foreground">│   ├── scan-workspace/</div>
                    <div className="pl-12 text-primary">│   │   └── agent.md</div>
                    <div className="pl-8 text-muted-foreground">│   ├── react-component-builder/</div>
                    <div className="pl-12 text-primary">│   │   └── agent.md</div>
                    <div className="pl-8 text-muted-foreground">│   └── code-reviewer/</div>
                    <div className="pl-12 text-primary">│       └── agent.md</div>
                    <div className="pl-4 text-accent font-medium">├── skills/</div>
                    <div className="pl-8 text-muted-foreground">│   ├── react-components/</div>
                    <div className="pl-12 text-primary">│   │   └── skill.md</div>
                    <div className="pl-8 text-muted-foreground">│   └── node-typescript-service/</div>
                    <div className="pl-12 text-primary">│       └── skill.md</div>
                    <div className="pl-4 text-accent font-medium">├── specs/</div>
                    <div className="pl-8 text-muted-foreground">│   └── templates/</div>
                    <div className="pl-4">└── src/</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    Key Characteristics
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>No <code className="bg-muted px-1 rounded">.github/</code> - everything at root level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Policies in <code className="bg-muted px-1 rounded">policies/</code> directory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>lowercase filenames: <code className="bg-muted px-1 rounded">agent.md</code>, <code className="bg-muted px-1 rounded">skill.md</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Orchestrator at root: <code className="bg-muted px-1 rounded">orchestrator.md</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Works with any codebase</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-accent" />
              File Naming Comparison
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2" variant="outline">GitHub Copilot</Badge>
                  <CardTitle className="text-sm">File Naming Convention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Orchestrator:</span>
                      <code className="font-mono text-accent">orchestrator.md</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Agent files:</span>
                      <code className="font-mono text-accent">AGENT.md</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Skill files:</span>
                      <code className="font-mono text-accent">SKILL.md</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Policy folder:</span>
                      <code className="font-mono text-accent">copilot-instructions/</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2" variant="outline">Claude AI</Badge>
                  <CardTitle className="text-sm">File Naming Convention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Orchestrator:</span>
                      <code className="font-mono text-primary">orchestrator.md</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Agent files:</span>
                      <code className="font-mono text-primary">agent.md</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Skill files:</span>
                      <code className="font-mono text-primary">skill.md</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Policy folder:</span>
                      <code className="font-mono text-primary">policies/</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileCode className="h-5 w-5 text-accent" />
              Usage Pattern Comparison
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-accent/5 border-accent/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 bg-accent text-accent-foreground">GitHub Copilot</Badge>
                  <CardTitle className="text-sm">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Policy Loading:</p>
                    <div className="bg-background p-2 rounded text-[10px] font-mono">
                      Auto-loads from<br/>
                      .github/copilot-instructions/
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Orchestrator Reference:</p>
                    <div className="bg-background p-2 rounded text-[10px] font-mono">
                      @workspace Use the scan-workspace agent
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium">Direct Agent Call:</p>
                    <div className="bg-background p-2 rounded text-[10px] font-mono">
                      @workspace<br/>
                      ../ai-playbook/.github/agents/<br/>
                      react-component-builder/AGENT.md
                    </div>
                  </div>

                  <Alert className="bg-accent/10 border-accent/30">
                    <CheckCircle2 className="h-3 w-3" />
                    <AlertDescription className="text-[10px]">
                      Policies automatically apply to all conversations
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 bg-primary text-primary-foreground">Claude AI</Badge>
                  <CardTitle className="text-sm">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Policy Loading:</p>
                    <div className="bg-background p-2 rounded text-[10px] font-mono">
                      Referenced in<br/>
                      .cursorrules or .clinerules
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Orchestrator Reference:</p>
                    <div className="bg-background p-2 rounded text-[10px] font-mono">
                      @orchestrator.md scan this project
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium">Direct Agent Call:</p>
                    <div className="bg-background p-2 rounded text-[10px] font-mono">
                      @../ai-playbook/agents/<br/>
                      react-component-builder/<br/>
                      agent.md create LoginForm
                    </div>
                  </div>

                  <Alert className="bg-primary/10 border-primary/30">
                    <CheckCircle2 className="h-3 w-3" />
                    <AlertDescription className="text-[10px]">
                      Explicit @ mentions give full control over what's loaded
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-accent" />
              Path Reference Examples
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2" variant="outline">GitHub Copilot</Badge>
                  <CardTitle className="text-sm">Example Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Orchestrator:</div>
                      <div className="text-accent">.github/orchestrator.md</div>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Policy:</div>
                      <div className="text-accent">.github/copilot-instructions/frontend-policy.md</div>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Agent:</div>
                      <div className="text-accent">.github/agents/code-reviewer/AGENT.md</div>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Skill:</div>
                      <div className="text-accent">.github/skills/react-components/SKILL.md</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2" variant="outline">Claude AI</Badge>
                  <CardTitle className="text-sm">Example Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Orchestrator:</div>
                      <div className="text-primary">orchestrator.md</div>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Policy:</div>
                      <div className="text-primary">policies/frontend-policy.md</div>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Agent:</div>
                      <div className="text-primary">agents/code-reviewer/agent.md</div>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <div className="text-muted-foreground mb-1">Skill:</div>
                      <div className="text-primary">skills/react-components/skill.md</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <Card className="bg-muted/50 border-muted">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-foreground" />
                Decision Matrix: Which Structure Should I Use?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Use GitHub Copilot Structure If:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside pl-2">
                      <li>Primary tool is GitHub Copilot</li>
                      <li>Working with GitHub-hosted repositories</li>
                      <li>Want automatic policy loading</li>
                      <li>Prefer GitHub-native conventions</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Use Claude AI Structure If:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside pl-2">
                      <li>Primary tool is Cursor, Cline, or Claude Desktop</li>
                      <li>Need flexibility across different codebases</li>
                      <li>Want explicit control over what's loaded</li>
                      <li>Prefer simpler root-level organization</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg">
                  <XCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Can I Use Both?</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You can maintain two versions of your AI Playbook with different structures, or use the GitHub Copilot version and manually reference it in Claude AI tools via <code className="bg-muted px-1 rounded">.cursorrules</code> / <code className="bg-muted px-1 rounded">.clinerules</code>. However, it's recommended to choose one structure that matches your primary AI tool.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-primary/5 border-primary/20">
            <Info className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription className="text-sm space-y-2">
              <p>The <strong>concepts remain identical</strong> between both structures:</p>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <Badge variant="outline">Orchestrator</Badge>
                <ArrowRight className="h-3 w-3" />
                <Badge variant="outline">Agents</Badge>
                <ArrowRight className="h-3 w-3" />
                <Badge variant="outline">Skills</Badge>
                <ArrowRight className="h-3 w-3" />
                <Badge variant="outline">Policies</Badge>
              </div>
              <p className="mt-2">Only the <strong>file locations and naming conventions differ</strong>. The orchestration logic and progressive disclosure patterns work the same way.</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
