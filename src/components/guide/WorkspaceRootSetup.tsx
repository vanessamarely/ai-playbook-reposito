import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FolderTree, Copy, CheckCircle2, FileCode, Terminal, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WorkspaceRootSetup() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const cursorRulesContent = `# AI Playbook Workspace Root Configuration (GitHub Copilot)
# This file enables Cursor to use ai-playbook from workspace root across all projects

# Reference the orchestrator for intelligent routing
orchestrator: ./ai-playbook/.github/orchestrator.md

# Project isolation - only work within the current project
workspace_policy: ./ai-playbook/.github/copilot-instructions/workspace-policy.md

# Load policies based on project type
frontend_policy: ./ai-playbook/.github/copilot-instructions/frontend-policy.md
backend_policy: ./ai-playbook/.github/copilot-instructions/backend-policy.md

# Output style for all AI responses
style_output: ./ai-playbook/.github/copilot-instructions/style-output.md

# Available agents (use via @ai-playbook path)
agents:
  - ./ai-playbook/.github/agents/scan-workspace/AGENT.md
  - ./ai-playbook/.github/agents/react-component-builder/AGENT.md
  - ./ai-playbook/.github/agents/a11y-audit-react/AGENT.md
  - ./ai-playbook/.github/agents/node-microservice-builder/AGENT.md
  - ./ai-playbook/.github/agents/pr-reviewer/AGENT.md
  - ./ai-playbook/.github/agents/code-reviewer/AGENT.md

# Available skills (loaded JIT by agents)
skills:
  - ./ai-playbook/.github/skills/react-components/SKILL.md
  - ./ai-playbook/.github/skills/node-typescript-service/SKILL.md
  - ./ai-playbook/.github/skills/a11y-automation/SKILL.md
  - ./ai-playbook/.github/skills/component-library-integration/SKILL.md

# Usage examples:
# - "Use @ai-playbook orchestrator to scan this project"
# - "Apply react-component-builder agent to create LoginForm component"
# - "Run code-reviewer agent on src/components/UserCard.tsx"
# - "Use a11y-audit-react agent to check accessibility"
`

  const clineRulesContent = `# AI Playbook Configuration for Cline
# Location: ~/.clinerules or workspace-root/.clinerules

# Core Orchestration
orchestrator_path: "./ai-playbook/.github/orchestrator.md"

# Policy References (loaded automatically based on project detection)
policies:
  workspace: "./ai-playbook/.github/copilot-instructions/workspace-policy.md"
  frontend: "./ai-playbook/.github/copilot-instructions/frontend-policy.md"
  backend: "./ai-playbook/.github/copilot-instructions/backend-policy.md"
  output_style: "./ai-playbook/.github/copilot-instructions/style-output.md"

# Agent Registry
# Cline will use these agents when invoked via natural language
agents:
  scan_workspace:
    path: "./ai-playbook/.github/agents/scan-workspace/AGENT.md"
    triggers: ["analyze project", "scan workspace", "detect project type"]
  
  react_builder:
    path: "./ai-playbook/.github/agents/react-component-builder/AGENT.md"
    triggers: ["create react component", "build component", "new react"]
  
  a11y_audit:
    path: "./ai-playbook/.github/agents/a11y-audit-react/AGENT.md"
    triggers: ["accessibility audit", "check a11y", "wcag check"]
  
  node_service:
    path: "./ai-playbook/.github/agents/node-microservice-builder/AGENT.md"
    triggers: ["create service", "build api", "new endpoint"]
  
  code_reviewer:
    path: "./ai-playbook/.github/agents/code-reviewer/AGENT.md"
    triggers: ["review code", "code review", "check code quality"]
  
  pr_reviewer:
    path: "./ai-playbook/.github/agents/pr-reviewer/AGENT.md"
    triggers: ["review pr", "check pull request", "review changes"]

# Skill Registry (lazy-loaded by agents)
skills:
  react_components: "./ai-playbook/.github/skills/react-components/SKILL.md"
  node_typescript: "./ai-playbook/.github/skills/node-typescript-service/SKILL.md"
  a11y_automation: "./ai-playbook/.github/skills/a11y-automation/SKILL.md"
  component_library: "./ai-playbook/.github/skills/component-library-integration/SKILL.md"

# Project Scoping Rules
scope:
  # Cline should only modify files in the current project folder
  respect_boundaries: true
  # Never cross into sibling project folders
  cross_project_edits: false
  # Reference ai-playbook but never modify it
  readonly_paths: ["./ai-playbook"]

# Usage Instructions
# 1. From any project folder: "Use the scan_workspace agent to analyze this project"
# 2. Direct agent call: "Apply react_builder to create a UserProfile component"
# 3. Natural trigger: "Check a11y on src/components/Modal.tsx" (auto-uses a11y_audit)
# 4. Code review: "Review code in src/api/userService.ts" (auto-uses code_reviewer)
`

  const claudeProjectContent = `{
  "name": "Workspace with AI Playbook (Claude AI)",
  "description": "Multi-repository workspace using centralized AI Playbook with Claude structure",
  "version": "1.0.0",
  
  "customInstructions": {
    "orchestrator": "../ai-playbook/orchestrator.md",
    "policies": [
      "../ai-playbook/policies/workspace-policy.md",
      "../ai-playbook/policies/frontend-policy.md",
      "../ai-playbook/policies/backend-policy.md",
      "../ai-playbook/policies/style-output.md"
    ]
  },
  
  "agents": [
    {
      "name": "scan-workspace",
      "path": "../ai-playbook/agents/scan-workspace/agent.md",
      "description": "Detect project type and route to appropriate skills"
    },
    {
      "name": "react-component-builder",
      "path": "../ai-playbook/agents/react-component-builder/agent.md",
      "description": "Build accessible React components following best practices"
    },
    {
      "name": "a11y-audit-react",
      "path": "../ai-playbook/agents/a11y-audit-react/agent.md",
      "description": "Audit React components for WCAG 2.2 compliance"
    },
    {
      "name": "node-microservice-builder",
      "path": "../ai-playbook/agents/node-microservice-builder/agent.md",
      "description": "Build Node.js/TypeScript microservices"
    },
    {
      "name": "code-reviewer",
      "path": "../ai-playbook/agents/code-reviewer/agent.md",
      "description": "Review code quality and suggest improvements inline"
    },
    {
      "name": "pr-reviewer",
      "path": "../ai-playbook/agents/pr-reviewer/agent.md",
      "description": "Review pull requests for quality and standards compliance"
    }
  ],
  
  "knowledgeBase": {
    "skills": [
      "../ai-playbook/skills/react-components/skill.md",
      "../ai-playbook/skills/node-typescript-service/skill.md",
      "../ai-playbook/skills/a11y-automation/skill.md",
      "../ai-playbook/skills/component-library-integration/skill.md"
    ]
  },
  
  "scopingRules": {
    "workspaceRoot": "~/workspace",
    "projectFolders": ["project-a", "project-b", "project-c"],
    "sharedResources": ["ai-playbook"],
    "isolationPolicy": "strict",
    "readonlyPaths": ["ai-playbook"]
  },
  
  "usage": [
    "Reference @ai-playbook to use orchestrator: 'Use @ai-playbook/orchestrator.md to scan this React project'",
    "Direct agent invocation: 'Apply @ai-playbook/agents/react-component-builder/agent.md to create UserCard'",
    "Inline code review: 'Review this component using @ai-playbook/agents/code-reviewer/agent.md'"
  ]
}
`

  const vscodeSettingsContent = `{
  "github.copilot.advanced": {
    "aiPlaybookPath": "../ai-playbook"
  },
  
  "files.associations": {
    "*.cursorrules": "yaml",
    "*.clinerules": "yaml"
  },
  
  "files.watcherExclude": {
    "**/ai-playbook/.git/**": true,
    "**/ai-playbook/node_modules/**": true
  },
  
  "search.exclude": {
    "**/ai-playbook/.git": true,
    "**/ai-playbook/node_modules": true
  },
  
  "cline.agentPaths": [
    "../ai-playbook/.github/agents"
  ],
  
  "cursor.aiPlaybook": {
    "enabled": true,
    "rootPath": "../ai-playbook",
    "autoLoadOrchestrator": true
  }
}
`

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary" />
            Workspace Root Configuration Files
          </CardTitle>
          <CardDescription>
            Example configuration files for using AI Playbook from workspace root across multiple projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Why Use Workspace Root Setup?</p>
                <p className="text-xs text-muted-foreground">
                  Install ai-playbook once at workspace root instead of copying it into every project. 
                  This eliminates duplication and makes updates easier when working with multiple repositories.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              Workspace Structure Overview
            </h3>
            
            <Tabs defaultValue="copilot" className="space-y-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="copilot">GitHub Copilot Structure</TabsTrigger>
                <TabsTrigger value="claude">Claude AI Structure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="copilot" className="space-y-2">
                <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-0.5">
                  <div>~/workspace/</div>
                  <div className="pl-4 text-accent">├── .cursorrules  <span className="text-muted-foreground">← Add this file (Cursor)</span></div>
                  <div className="pl-4 text-accent">├── .clinerules  <span className="text-muted-foreground">← Add this file (Cline)</span></div>
                  <div className="pl-4 text-accent">├── .vscode/</div>
                  <div className="pl-8 text-accent">└── settings.json  <span className="text-muted-foreground">← Workspace settings</span></div>
                  <div className="pl-4 text-primary">├── ai-playbook/  <span className="text-muted-foreground">← GitHub Copilot version</span></div>
                  <div className="pl-8 text-accent">├── .github/  <span className="text-muted-foreground">← Uses .github directory</span></div>
                  <div className="pl-12 text-muted-foreground">│   ├── orchestrator.md</div>
                  <div className="pl-12 text-muted-foreground">│   ├── copilot-instructions/</div>
                  <div className="pl-16 text-muted-foreground">│   │   ├── workspace-policy.md</div>
                  <div className="pl-16 text-muted-foreground">│   │   ├── frontend-policy.md</div>
                  <div className="pl-16 text-muted-foreground">│   │   └── backend-policy.md</div>
                  <div className="pl-12 text-muted-foreground">│   ├── agents/</div>
                  <div className="pl-16 text-muted-foreground">│   │   ├── scan-workspace/</div>
                  <div className="pl-16 text-muted-foreground">│   │   └── react-component-builder/</div>
                  <div className="pl-12 text-muted-foreground">│   └── skills/</div>
                  <div className="pl-8">└── tools/</div>
                  <div className="pl-4">├── project-a/  <span className="text-muted-foreground">← Your repositories</span></div>
                  <div className="pl-4">├── project-b/</div>
                  <div className="pl-4">└── project-c/</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Key:</strong> Uses <code className="bg-muted px-1 rounded">.github/</code> directory for all AI configurations, following GitHub Copilot conventions.
                </p>
              </TabsContent>
              
              <TabsContent value="claude" className="space-y-2">
                <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-0.5">
                  <div>~/workspace/</div>
                  <div className="pl-4 text-accent">├── .cursorrules  <span className="text-muted-foreground">← Add this file (Cursor)</span></div>
                  <div className="pl-4 text-accent">├── .clinerules  <span className="text-muted-foreground">← Add this file (Cline)</span></div>
                  <div className="pl-4 text-accent">├── .vscode/</div>
                  <div className="pl-8 text-accent">└── settings.json  <span className="text-muted-foreground">← Workspace settings</span></div>
                  <div className="pl-4 text-primary">├── ai-playbook/  <span className="text-muted-foreground">← Claude AI version</span></div>
                  <div className="pl-8 text-accent">├── orchestrator.md  <span className="text-muted-foreground">← At root level</span></div>
                  <div className="pl-8 text-accent">├── policies/  <span className="text-muted-foreground">← Root-level directory</span></div>
                  <div className="pl-12 text-muted-foreground">│   ├── workspace-policy.md</div>
                  <div className="pl-12 text-muted-foreground">│   ├── frontend-policy.md</div>
                  <div className="pl-12 text-muted-foreground">│   └── backend-policy.md</div>
                  <div className="pl-8 text-accent">├── agents/  <span className="text-muted-foreground">← Root-level directory</span></div>
                  <div className="pl-12 text-muted-foreground">│   ├── scan-workspace/</div>
                  <div className="pl-16 text-muted-foreground">│   │   └── agent.md</div>
                  <div className="pl-12 text-muted-foreground">│   └── react-component-builder/</div>
                  <div className="pl-16 text-muted-foreground">│       └── agent.md</div>
                  <div className="pl-8 text-accent">├── skills/  <span className="text-muted-foreground">← Root-level directory</span></div>
                  <div className="pl-12 text-muted-foreground">│   └── react-components/</div>
                  <div className="pl-16 text-muted-foreground">│       └── skill.md</div>
                  <div className="pl-8">└── tools/</div>
                  <div className="pl-4">├── project-a/  <span className="text-muted-foreground">← Your repositories</span></div>
                  <div className="pl-4">├── project-b/</div>
                  <div className="pl-4">└── project-c/</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Key:</strong> Uses root-level directories (<code className="bg-muted px-1 rounded">policies/</code>, <code className="bg-muted px-1 rounded">agents/</code>, <code className="bg-muted px-1 rounded">skills/</code>) with lowercase filenames.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <Separator />

          <Tabs defaultValue="cursorrules" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cursorrules">
                <FileCode className="h-3 w-3 mr-1" />
                .cursorrules
              </TabsTrigger>
              <TabsTrigger value="clinerules">
                <FileCode className="h-3 w-3 mr-1" />
                .clinerules
              </TabsTrigger>
              <TabsTrigger value="claude">
                <FileCode className="h-3 w-3 mr-1" />
                Claude Project
              </TabsTrigger>
              <TabsTrigger value="vscode">
                <FileCode className="h-3 w-3 mr-1" />
                VS Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cursorrules" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Cursor Rules File</CardTitle>
                    <Badge variant="outline">~/workspace/.cursorrules</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Place this file at workspace root to configure Cursor AI across all projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">File Contents:</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs"
                        onClick={() => copyToClipboard(cursorRulesContent, '.cursorrules content')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{cursorRulesContent}</code>
                    </pre>
                  </div>

                  <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 space-y-2">
                    <p className="text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Usage in Cursor:
                    </p>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Open any project folder in your workspace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Type: <code className="bg-muted px-1 rounded">@ai-playbook orchestrator scan this project</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Or: <code className="bg-muted px-1 rounded">Use react-component-builder agent to create LoginForm</code></span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clinerules" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Cline Rules File</CardTitle>
                    <Badge variant="outline">~/workspace/.clinerules</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Configure Cline to use AI Playbook agents with natural language triggers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">File Contents:</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs"
                        onClick={() => copyToClipboard(clineRulesContent, '.clinerules content')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{clineRulesContent}</code>
                    </pre>
                  </div>

                  <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 space-y-2">
                    <p className="text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Usage in Cline:
                    </p>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Natural language: <code className="bg-muted px-1 rounded">Analyze project structure</code> (auto-triggers scan_workspace)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Direct agent: <code className="bg-muted px-1 rounded">Use react_builder to create UserCard component</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Code review: <code className="bg-muted px-1 rounded">Review code in src/components/Modal.tsx</code></span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="claude" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Claude Desktop Project Configuration</CardTitle>
                    <Badge variant="outline">claude_desktop_config.json</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Configure Claude Desktop to reference AI Playbook from workspace root
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Configuration JSON:</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs"
                        onClick={() => copyToClipboard(claudeProjectContent, 'Claude config')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{claudeProjectContent}</code>
                    </pre>
                  </div>

                  <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 space-y-2">
                    <p className="text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Usage with Claude:
                    </p>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Reference with <code className="bg-muted px-1 rounded">@ai-playbook</code> prefix in prompts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Example: <code className="bg-muted px-1 rounded">Use @ai-playbook orchestrator to scan this React project</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Example: <code className="bg-muted px-1 rounded">Apply react-component-builder to create LoginForm</code></span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vscode" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">VS Code Workspace Settings</CardTitle>
                    <Badge variant="outline">~/workspace/.vscode/settings.json</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Configure VS Code to recognize and use AI Playbook across all workspace projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Settings JSON:</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs"
                        onClick={() => copyToClipboard(vscodeSettingsContent, 'VS Code settings')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{vscodeSettingsContent}</code>
                    </pre>
                  </div>

                  <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 space-y-2">
                    <p className="text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      What This Configures:
                    </p>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>GitHub Copilot: Sets ai-playbook path for reference</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Cline Extension: Registers agent paths</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>Cursor Extension: Enables auto-loading of orchestrator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">→</span>
                        <span>File Associations: Recognizes .cursorrules and .clinerules</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-accent" />
              Important Notes
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Project Isolation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    AI tools will only modify files in the current project folder, never crossing into sibling projects. 
                    The ai-playbook folder is read-only and should never be modified by AI agents.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Relative Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    All paths use <code className="bg-muted px-1 rounded">../ai-playbook</code> to reference from project folders. 
                    Adjust based on your workspace structure if ai-playbook is located elsewhere.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Update ai-playbook once at workspace root with <code className="bg-muted px-1 rounded">git pull</code>. 
                    All projects immediately benefit from updates without individual syncing.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Team Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Commit these config files to your workspace-level repository or share via dotfiles. 
                    Team members can use the same setup instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
