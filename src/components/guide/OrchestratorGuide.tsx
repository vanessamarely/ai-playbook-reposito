import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
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
  AlertCircle,
  FolderOpen,
  Code
} from 'lucide-react'

export default function OrchestratorGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Understanding the Orchestrator
          </CardTitle>
          <CardDescription>
            The orchestrator is the central coordination layer that routes tasks to the appropriate agents and skills based on your AI tool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Core Purpose</AlertTitle>
            <AlertDescription className="text-sm">
              The orchestrator analyzes your request, detects your project type, and automatically loads the right agent or skill without overwhelming the AI with unnecessary context. It works differently depending on whether you're using GitHub Copilot or Claude AI (Cursor, Cline, etc.).
            </AlertDescription>
          </Alert>

          <div className="bg-background p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Cpu className="h-4 w-4 text-accent" />
              How Orchestration Works
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">1. Request Analysis:</strong> You ask the AI to perform a task (build a component, review code, etc.)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">2. Orchestrator Routes:</strong> The orchestrator examines your request and project structure
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">3. Agent Selection:</strong> It loads the appropriate specialized agent (React builder, code reviewer, etc.)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">4. Skill Loading:</strong> The agent then loads only the specific skills it needs
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">5. Task Execution:</strong> The AI executes the task with focused, relevant context
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-accent" />
            Orchestrator: GitHub Copilot vs Claude AI
          </CardTitle>
          <CardDescription>
            The orchestrator works differently depending on your AI tool due to their unique architectures and file structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="copilot">GitHub Copilot</TabsTrigger>
              <TabsTrigger value="claude">Claude AI</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <Alert className="bg-accent/10 border-accent/30">
                <Info className="h-4 w-4" />
                <AlertTitle>Key Difference</AlertTitle>
                <AlertDescription className="text-sm">
                  GitHub Copilot uses a <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/</code> directory structure with automatic policy loading.
                  Claude AI (Cursor, Cline, etc.) uses root-level directories with manual references via config files.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-accent/5 border-accent/30">
                  <CardHeader className="pb-3">
                    <Badge className="w-fit mb-2">GitHub Copilot</Badge>
                    <CardTitle className="text-base">Structure & Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Directory Structure:</p>
                      <div className="font-mono bg-background p-2 rounded text-[10px] space-y-0.5">
                        <div>.github/</div>
                        <div className="pl-3">├── orchestrator.md</div>
                        <div className="pl-3">├── copilot-instructions/</div>
                        <div className="pl-6">├── workspace-policy.md</div>
                        <div className="pl-6">└── frontend-policy.md</div>
                        <div className="pl-3">├── agents/</div>
                        <div className="pl-6">└── [agent-name]/AGENT.md</div>
                        <div className="pl-3">└── skills/</div>
                        <div className="pl-6">└── [skill-name]/SKILL.md</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-medium text-foreground">How It Works:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                          <span>Auto-loads from <code className="bg-muted px-1 rounded">.github/copilot-instructions/</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                          <span>Orchestrator at <code className="bg-muted px-1 rounded">.github/orchestrator.md</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                          <span>Files named with UPPERCASE (AGENT.md, SKILL.md)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                          <span>Policies applied automatically to all conversations</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Usage Example:</p>
                      <div className="font-mono bg-background p-2 rounded text-[10px]">
                        @workspace Use the scan-workspace agent<br/>
                        # Copilot automatically knows to look in<br/>
                        # .github/agents/scan-workspace/AGENT.md
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/30">
                  <CardHeader className="pb-3">
                    <Badge className="w-fit mb-2" variant="outline">Claude AI (Cursor, Cline)</Badge>
                    <CardTitle className="text-base">Structure & Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Directory Structure:</p>
                      <div className="font-mono bg-background p-2 rounded text-[10px] space-y-0.5">
                        <div>ai-playbook/</div>
                        <div className="pl-3">├── orchestrator.md</div>
                        <div className="pl-3">├── policies/</div>
                        <div className="pl-6">├── workspace-policy.md</div>
                        <div className="pl-6">└── frontend-policy.md</div>
                        <div className="pl-3">├── agents/</div>
                        <div className="pl-6">└── [agent-name]/agent.md</div>
                        <div className="pl-3">└── skills/</div>
                        <div className="pl-6">└── [skill-name]/skill.md</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-medium text-foreground">How It Works:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                          <span>Manually referenced via <code className="bg-muted px-1 rounded">.cursorrules</code> or <code className="bg-muted px-1 rounded">.clinerules</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                          <span>Orchestrator at root level <code className="bg-muted px-1 rounded">orchestrator.md</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                          <span>Files named with lowercase (agent.md, skill.md)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                          <span>Policies loaded via @ mentions or config references</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Usage Example:</p>
                      <div className="font-mono bg-background p-2 rounded text-[10px]">
                        @../ai-playbook/agents/scan-workspace/agent.md<br/>
                        # OR in your .cursorrules:<br/>
                        # Use ai-playbook orchestrator
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Why The Difference?</AlertTitle>
                <AlertDescription className="text-xs">
                  <p className="mb-2">GitHub Copilot is tightly integrated with GitHub and expects configuration in the <code className="bg-muted px-1 rounded">.github/</code> directory. It automatically reads policies from <code className="bg-muted px-1 rounded">.github/copilot-instructions/</code>.</p>
                  <p>Claude AI tools (Cursor, Cline) are IDE extensions that work with any codebase. They use simpler root-level directories and require explicit references via config files or @ mentions.</p>
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="copilot" className="space-y-4">
              <Card className="bg-accent/5 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="h-5 w-5 text-accent" />
                    GitHub Copilot Orchestrator Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-primary" />
                      Directory Structure
                    </h3>
                    <div className="font-mono text-xs bg-background p-4 rounded-lg space-y-0.5">
                      <div>project-root/</div>
                      <div className="pl-4 text-accent">├── .github/  <span className="text-muted-foreground">← Required directory</span></div>
                      <div className="pl-8 text-primary">│   ├── orchestrator.md  <span className="text-muted-foreground">← Main coordination</span></div>
                      <div className="pl-8">│   ├── copilot-instructions/  <span className="text-muted-foreground">← Auto-loaded policies</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── workspace-policy.md  <span className="text-muted-foreground/60">← Project isolation rules</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── frontend-policy.md  <span className="text-muted-foreground/60">← React/TypeScript rules</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── backend-policy.md  <span className="text-muted-foreground/60">← Node/Java/Python rules</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   └── style-output.md  <span className="text-muted-foreground/60">← Response formatting</span></div>
                      <div className="pl-8">│   ├── agents/  <span className="text-muted-foreground">← Specialized workflows</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── scan-workspace/AGENT.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── react-component-builder/AGENT.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── a11y-audit-react/AGENT.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   └── code-reviewer/AGENT.md</div>
                      <div className="pl-8">│   └── skills/  <span className="text-muted-foreground">← Reusable procedures</span></div>
                      <div className="pl-12 text-muted-foreground">│       ├── react-components/SKILL.md</div>
                      <div className="pl-12 text-muted-foreground">│       ├── node-typescript-service/SKILL.md</div>
                      <div className="pl-12 text-muted-foreground">│       └── a11y-automation/SKILL.md</div>
                      <div className="pl-4">└── src/  <span className="text-muted-foreground">← Your code</span></div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Code className="h-4 w-4 text-accent" />
                      Orchestrator Execution Flow
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">1</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Auto-Load Policies</p>
                          <p className="text-muted-foreground">GitHub Copilot automatically reads all files in <code className="bg-muted px-1 rounded">.github/copilot-instructions/</code> for every conversation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">2</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User Makes Request</p>
                          <p className="text-muted-foreground">You ask Copilot to perform a task: "Build a React login form"</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">3</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Orchestrator Routes</p>
                          <p className="text-muted-foreground">The orchestrator in <code className="bg-muted px-1 rounded">.github/orchestrator.md</code> analyzes the request and routes to <code className="bg-muted px-1 rounded">agents/react-component-builder/AGENT.md</code></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">4</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Agent Loads Skills</p>
                          <p className="text-muted-foreground">The agent references <code className="bg-muted px-1 rounded">skills/react-components/SKILL.md</code> for detailed procedures</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">5</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Execute with Context</p>
                          <p className="text-muted-foreground">Copilot builds the component following policies, agent workflow, and skill procedures</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Usage Examples</h3>
                    <div className="space-y-3">
                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Example 1: Scan project structure</p>
                        <pre className="text-[10px] font-mono">
@workspace Scan this project and suggest improvements
</pre>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          → Orchestrator routes to <code className="bg-muted px-1 rounded">agents/scan-workspace/AGENT.md</code>
                        </p>
                      </div>

                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Example 2: Build React component</p>
                        <pre className="text-[10px] font-mono">
@workspace Create an accessible UserCard component
</pre>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          → Orchestrator routes to <code className="bg-muted px-1 rounded">agents/react-component-builder/AGENT.md</code><br/>
                          → Agent loads <code className="bg-muted px-1 rounded">skills/react-components/SKILL.md</code>
                        </p>
                      </div>

                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Example 3: Code review</p>
                        <pre className="text-[10px] font-mono">
@workspace Review src/components/LoginForm.tsx
</pre>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          → Orchestrator routes to <code className="bg-muted px-1 rounded">agents/code-reviewer/AGENT.md</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-accent/10 border-accent/30">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Key Benefit</AlertTitle>
                    <AlertDescription className="text-xs">
                      With GitHub Copilot, policies are always active. You just reference agents or let the orchestrator route automatically. The <code className="bg-muted px-1 rounded">.github/</code> structure is GitHub-native and works seamlessly.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="claude" className="space-y-4">
              <Card className="bg-primary/5 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Claude AI Orchestrator Pattern
                  </CardTitle>
                  <CardDescription className="text-xs">
                    For Cursor, Cline, and other Claude-powered tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-primary" />
                      Directory Structure
                    </h3>
                    <div className="font-mono text-xs bg-background p-4 rounded-lg space-y-0.5">
                      <div>project-root/</div>
                      <div className="pl-4 text-accent">├── .cursorrules  <span className="text-muted-foreground">← Cursor config (references playbook)</span></div>
                      <div className="pl-4 text-accent">├── .clinerules  <span className="text-muted-foreground">← Cline config (references playbook)</span></div>
                      <div className="pl-4 text-primary">├── ai-playbook/  <span className="text-muted-foreground">← Root-level directory</span></div>
                      <div className="pl-8 text-primary">│   ├── orchestrator.md  <span className="text-muted-foreground">← At root, not in .github/</span></div>
                      <div className="pl-8">│   ├── policies/  <span className="text-muted-foreground">← Root-level, not copilot-instructions/</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── workspace-policy.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── frontend-policy.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── backend-policy.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   └── style-output.md</div>
                      <div className="pl-8">│   ├── agents/  <span className="text-muted-foreground">← Root-level agents/</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── scan-workspace/</div>
                      <div className="pl-16 text-muted-foreground">│   │   │   └── agent.md  <span className="text-muted-foreground/60">← lowercase!</span></div>
                      <div className="pl-12 text-muted-foreground">│   │   ├── react-component-builder/</div>
                      <div className="pl-16 text-muted-foreground">│   │   │   └── agent.md</div>
                      <div className="pl-12 text-muted-foreground">│   │   └── code-reviewer/</div>
                      <div className="pl-16 text-muted-foreground">│   │       └── agent.md</div>
                      <div className="pl-8">│   └── skills/  <span className="text-muted-foreground">← Root-level skills/</span></div>
                      <div className="pl-12 text-muted-foreground">│       ├── react-components/</div>
                      <div className="pl-16 text-muted-foreground">│       │   └── skill.md  <span className="text-muted-foreground/60">← lowercase!</span></div>
                      <div className="pl-12 text-muted-foreground">│       └── node-typescript-service/</div>
                      <div className="pl-16 text-muted-foreground">│           └── skill.md</div>
                      <div className="pl-4">└── src/  <span className="text-muted-foreground">← Your code</span></div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      Orchestrator Execution Flow
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">1</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Load Config File</p>
                          <p className="text-muted-foreground">Claude reads <code className="bg-muted px-1 rounded">.cursorrules</code> or <code className="bg-muted px-1 rounded">.clinerules</code> which points to the orchestrator</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">2</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User Makes Request</p>
                          <p className="text-muted-foreground">You ask Claude: "Build a React login form" or explicitly mention: "@ai-playbook/orchestrator.md scan project"</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">3</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Orchestrator Routes</p>
                          <p className="text-muted-foreground">The orchestrator at <code className="bg-muted px-1 rounded">ai-playbook/orchestrator.md</code> analyzes and routes to <code className="bg-muted px-1 rounded">agents/react-component-builder/agent.md</code></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">4</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Load Policies</p>
                          <p className="text-muted-foreground">Agent references policies from <code className="bg-muted px-1 rounded">policies/frontend-policy.md</code> as needed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">5</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Agent Loads Skills</p>
                          <p className="text-muted-foreground">The agent references <code className="bg-muted px-1 rounded">skills/react-components/skill.md</code> for procedures</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">6</Badge>
                        <div className="flex-1">
                          <p className="font-medium">Execute with Context</p>
                          <p className="text-muted-foreground">Claude builds the component following the loaded policies and procedures</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Configuration File Example</h3>
                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">.cursorrules (at project root)</p>
                      <pre className="text-[10px] font-mono">
{`# AI Playbook Configuration
orchestrator: ./ai-playbook/orchestrator.md

# Policies to apply
policies:
  - ./ai-playbook/policies/workspace-policy.md
  - ./ai-playbook/policies/frontend-policy.md
  - ./ai-playbook/policies/style-output.md

# Available agents (loaded on demand)
agents:
  - ./ai-playbook/agents/scan-workspace/agent.md
  - ./ai-playbook/agents/react-component-builder/agent.md
  - ./ai-playbook/agents/code-reviewer/agent.md`}
                      </pre>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Usage Examples</h3>
                    <div className="space-y-3">
                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Example 1: Using @ mention</p>
                        <pre className="text-[10px] font-mono">
@ai-playbook/orchestrator.md scan this project
</pre>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          → Explicitly loads orchestrator → Routes to appropriate agent
                        </p>
                      </div>

                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Example 2: Via .cursorrules reference</p>
                        <pre className="text-[10px] font-mono">
Create an accessible UserCard component
</pre>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          → Claude reads .cursorrules → Loads orchestrator<br/>
                          → Routes to <code className="bg-muted px-1 rounded">agents/react-component-builder/agent.md</code><br/>
                          → Agent loads <code className="bg-muted px-1 rounded">skills/react-components/skill.md</code>
                        </p>
                      </div>

                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Example 3: Direct agent reference</p>
                        <pre className="text-[10px] font-mono">
@ai-playbook/agents/code-reviewer/agent.md review this file
</pre>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          → Directly loads code-reviewer agent (bypasses orchestrator)
                        </p>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-primary/10 border-primary/30">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Key Benefit</AlertTitle>
                    <AlertDescription className="text-xs">
                      With Claude AI tools, you have flexible control. Use the orchestrator for smart routing, or reference agents directly via @ mentions. The root-level structure is simple and works across any codebase.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Progressive Disclosure Pattern
          </CardTitle>
          <CardDescription>
            Both GitHub Copilot and Claude AI use the same progressive disclosure strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The orchestrator keeps AI context lean by loading detailed documentation only when needed. This prevents overwhelming the model with irrelevant information and improves response quality.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Loading Strategy:</h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Always</Badge>
                <span className="text-muted-foreground">Policies (GitHub Copilot auto-loads, Claude AI via config)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">On Request</Badge>
                <span className="text-muted-foreground">Orchestrator (analyzes and routes)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">When Needed</Badge>
                <span className="text-muted-foreground">Agents (specialized workflows for specific tasks)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">JIT</Badge>
                <span className="text-muted-foreground">Skills (detailed procedures loaded by agents)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Lazy</Badge>
                <span className="text-muted-foreground">References (specs, examples loaded only if skill needs them)</span>
              </div>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Why This Matters</AlertTitle>
            <AlertDescription className="text-xs">
              <p className="mb-2">Without orchestration, you'd need to load all agents, all skills, and all documentation into every AI conversation. This creates:</p>
              <ul className="space-y-1 list-disc list-inside pl-2">
                <li>Token bloat (wasted context window)</li>
                <li>Slower responses (more to process)</li>
                <li>Lower quality (AI distracted by irrelevant info)</li>
                <li>Higher costs (more tokens = more $)</li>
              </ul>
              <p className="mt-2">The orchestrator solves this by loading exactly what's needed, when it's needed.</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Quick Reference: Which Structure Do I Use?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Using GitHub Copilot?</p>
                <p className="text-xs text-muted-foreground mt-1">Use the <code className="bg-muted px-1 rounded">.github/</code> directory structure with UPPERCASE filenames (AGENT.md, SKILL.md)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Using Cursor, Cline, or Claude?</p>
                <p className="text-xs text-muted-foreground mt-1">Use root-level directories with lowercase filenames (agent.md, skill.md)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Info className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Want to support both?</p>
                <p className="text-xs text-muted-foreground mt-1">Maintain two versions of your AI Playbook with different structures, or use the GitHub Copilot version and reference it manually in Claude AI tools</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
