import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Terminal, Download, FolderGit2, Copy, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function InstallationGuide() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Installation Guide
          </CardTitle>
          <CardDescription>
            How to install and configure the AI Playbook in your projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Terminal className="h-5 w-5 text-accent" />
              Step 1: Choose Your Installation Method
            </h3>
            <p className="text-sm text-muted-foreground">
              You have three options to integrate the AI Playbook into your workspace:
            </p>

            <div className="space-y-4">
              <Card className="bg-accent/10 border-accent/40">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent text-accent-foreground">Recommended for Multi-Repo Workspaces</Badge>
                  <CardTitle className="text-base">Option A: Workspace Root Installation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Install once at the workspace root to use across all project repositories without duplication. 
                    Perfect for IDEs with multiple repo folders open simultaneously.
                  </p>
                  <div className="rounded-lg bg-background p-3 font-mono text-xs space-y-2">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-[10px]">Clone at workspace root:</p>
                      <div className="flex items-center justify-between gap-2">
                        <code className="flex-1">cd ~/workspace && git clone &lt;repo-url&gt; ai-playbook</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('cd ~/workspace && git clone <repo-url> ai-playbook', 'Workspace clone command')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-xs space-y-2">
                    <p className="font-medium">Workspace Structure:</p>
                    <div className="font-mono text-[10px] space-y-0.5">
                      <div>~/workspace/</div>
                      <div className="pl-3 text-accent">├── ai-playbook/  <span className="text-muted-foreground">← Shared resource</span></div>
                      <div className="pl-3">├── project-a/  <span className="text-muted-foreground">← Repository 1</span></div>
                      <div className="pl-3">├── project-b/  <span className="text-muted-foreground">← Repository 2</span></div>
                      <div className="pl-3">└── project-c/  <span className="text-muted-foreground">← Repository 3</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 space-y-2">
                    <p className="text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Usage with AI Tools:
                    </p>
                    <div className="space-y-2 text-[10px] text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-foreground min-w-[70px]">Claude/Cursor:</span>
                        <code className="bg-muted px-1 rounded flex-1">@ai-playbook/.github/orchestrator.md scan this project</code>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-foreground min-w-[70px]">Copilot:</span>
                        <code className="bg-muted px-1 rounded flex-1">Reference ../ai-playbook/.github/agents/[agent]/AGENT.md</code>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-foreground min-w-[70px]">Cline:</span>
                        <code className="bg-muted px-1 rounded flex-1">Use agent from ../ai-playbook/.github/agents/code-reviewer/</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-muted/30">
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Option B</Badge>
                    <CardTitle className="text-base">Git Submodule Per Project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Keep the playbook synced within each project repository for easy updates
                    </p>
                    <div className="rounded-lg bg-background p-3 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <code className="flex-1">git submodule add &lt;repo-url&gt; ai-playbook</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('git submodule add <repo-url> ai-playbook', 'Submodule command')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <code className="flex-1">git submodule update --init --recursive</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('git submodule update --init --recursive', 'Update command')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Option C</Badge>
                    <CardTitle className="text-base">Direct Copy Per Project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Copy the playbook directly into each project for full customization
                    </p>
                    <div className="rounded-lg bg-background p-3 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <code className="flex-1">cp -r ai-playbook /path/to/project/</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('cp -r ai-playbook /path/to/project/', 'Copy command')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      Then commit to version control for team sharing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-accent" />
              Step 2: Verify Repository Structure
            </h3>
            <p className="text-sm text-muted-foreground">
              After installation, verify the AI Playbook structure exists. The structure differs based on your AI tool:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-accent/5 border border-accent/30 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-accent/20">GitHub Copilot</Badge>
                  <p className="text-xs font-medium">Uses .github/ directory structure</p>
                </div>
                <div className="font-mono text-xs space-y-0.5">
                  <div>ai-playbook/</div>
                  <div className="pl-4 text-primary">├── .github/</div>
                  <div className="pl-8 text-accent">│   ├── copilot-instructions/  <span className="text-muted-foreground">← Policies & rules</span></div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── workspace-policy.md</div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── frontend-policy.md</div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── backend-policy.md</div>
                  <div className="pl-12 text-muted-foreground">│   │   └── style-output.md</div>
                  <div className="pl-8 text-accent">│   ├── agents/  <span className="text-muted-foreground">← Agent definitions</span></div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── scan-workspace/</div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── react-component-builder/</div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── a11y-audit-react/</div>
                  <div className="pl-12 text-muted-foreground">│   │   └── code-reviewer/</div>
                  <div className="pl-8 text-accent">│   ├── skills/  <span className="text-muted-foreground">← Reusable skills</span></div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── react-components/</div>
                  <div className="pl-12 text-muted-foreground">│   │   ├── node-typescript-service/</div>
                  <div className="pl-12 text-muted-foreground">│   │   └── a11y-automation/</div>
                  <div className="pl-8 text-accent">│   └── orchestrator.md  <span className="text-muted-foreground">← Main routing logic</span></div>
                  <div className="pl-4 text-primary">└── tools/</div>
                </div>
                <div className="rounded-lg bg-background p-3 mt-2">
                  <p className="text-xs text-muted-foreground">
                    <strong>Usage:</strong> GitHub Copilot automatically reads from <code className="bg-muted px-1 rounded">.github/copilot-instructions/</code>
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/30 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/20">Claude AI</Badge>
                  <p className="text-xs font-medium">Uses root-level directory structure</p>
                </div>
                <div className="font-mono text-xs space-y-0.5">
                  <div>ai-playbook/</div>
                  <div className="pl-4 text-accent">├── policies/  <span className="text-muted-foreground">← Core rules & constraints</span></div>
                  <div className="pl-8 text-muted-foreground">│   ├── workspace-policy.md</div>
                  <div className="pl-8 text-muted-foreground">│   ├── frontend-policy.md</div>
                  <div className="pl-8 text-muted-foreground">│   ├── backend-policy.md</div>
                  <div className="pl-8 text-muted-foreground">│   └── style-output.md</div>
                  <div className="pl-4 text-accent">├── agents/  <span className="text-muted-foreground">← Specialized AI agents</span></div>
                  <div className="pl-8 text-muted-foreground">│   ├── scan-workspace/</div>
                  <div className="pl-8 text-muted-foreground">│   │   └── agent.md</div>
                  <div className="pl-8 text-muted-foreground">│   ├── react-component-builder/</div>
                  <div className="pl-8 text-muted-foreground">│   │   └── agent.md</div>
                  <div className="pl-8 text-muted-foreground">│   ├── a11y-audit-react/</div>
                  <div className="pl-8 text-muted-foreground">│   │   └── agent.md</div>
                  <div className="pl-8 text-muted-foreground">│   └── code-reviewer/</div>
                  <div className="pl-8 text-muted-foreground">│       └── agent.md</div>
                  <div className="pl-4 text-accent">├── skills/  <span className="text-muted-foreground">← Task-specific modules</span></div>
                  <div className="pl-8 text-muted-foreground">│   ├── react-components/</div>
                  <div className="pl-8 text-muted-foreground">│   │   └── skill.md</div>
                  <div className="pl-8 text-muted-foreground">│   ├── node-typescript-service/</div>
                  <div className="pl-8 text-muted-foreground">│   │   └── skill.md</div>
                  <div className="pl-8 text-muted-foreground">│   └── a11y-automation/</div>
                  <div className="pl-8 text-muted-foreground">│       └── skill.md</div>
                  <div className="pl-4 text-accent">├── orchestrator.md  <span className="text-muted-foreground">← Central coordination</span></div>
                  <div className="pl-4 text-primary">└── tools/</div>
                </div>
                <div className="rounded-lg bg-background p-3 mt-2">
                  <p className="text-xs text-muted-foreground">
                    <strong>Usage:</strong> Reference with <code className="bg-muted px-1 rounded">@ai-playbook/orchestrator.md</code> or specific agents via <code className="bg-muted px-1 rounded">@ai-playbook/agents/[agent-name]/agent.md</code>
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted/30 border border-muted p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Structural Differences</p>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1.5">
                        <p className="font-medium text-foreground">GitHub Copilot Structure:</p>
                        <ul className="space-y-1 text-muted-foreground list-disc list-inside pl-2">
                          <li>Policies in <code className="bg-muted px-1 rounded">.github/copilot-instructions/</code></li>
                          <li>Agents in <code className="bg-muted px-1 rounded">.github/agents/</code></li>
                          <li>Orchestrator at <code className="bg-muted px-1 rounded">.github/orchestrator.md</code></li>
                          <li>Agent files named <code className="bg-muted px-1 rounded">AGENT.md</code></li>
                        </ul>
                      </div>
                      <div className="space-y-1.5">
                        <p className="font-medium text-foreground">Claude AI Structure:</p>
                        <ul className="space-y-1 text-muted-foreground list-disc list-inside pl-2">
                          <li>Policies in <code className="bg-muted px-1 rounded">policies/</code> at root</li>
                          <li>Agents in <code className="bg-muted px-1 rounded">agents/</code> at root</li>
                          <li>Orchestrator at <code className="bg-muted px-1 rounded">orchestrator.md</code> at root</li>
                          <li>Agent files named <code className="bg-muted px-1 rounded">agent.md</code> (lowercase)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <p className="text-xs font-medium">Complete Workspace Example (Option A):</p>
                <div className="font-mono text-xs space-y-0.5">
                  <div>~/workspace/</div>
                  <div className="pl-4 text-accent">├── ai-playbook/  <span className="text-muted-foreground">← Shared resource (choose structure above)</span></div>
                  <div className="pl-4">├── project-a/  <span className="text-muted-foreground">← Your repositories</span></div>
                  <div className="pl-4">├── project-b/</div>
                  <div className="pl-4">└── project-c/</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Configure Your AI Tool</h3>
            <p className="text-sm text-muted-foreground">
              Choose your AI tool and follow the appropriate setup for your installation method:
            </p>

            <div className="space-y-3">
              <Card className="bg-accent/5 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    GitHub Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Workspace Root Setup (Option A):</p>
                    <p className="text-xs text-muted-foreground">
                      Reference the orchestrator with relative paths from your project
                    </p>
                    <div className="rounded-lg bg-background p-3 space-y-2">
                      <div className="bg-muted/50 p-2 rounded text-[10px] font-mono space-y-1">
                        <div className="text-muted-foreground"># In GitHub Copilot Chat from project-a/:</div>
                        <div>@workspace Use ../ai-playbook/.github/orchestrator.md to scan this project</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Per-Project Setup (Options B & C):</p>
                    <p className="text-xs text-muted-foreground">
                      Copilot reads instructions from <code className="bg-muted px-1 py-0.5 rounded text-xs">.github/copilot-instructions.md</code> automatically
                    </p>
                    <div className="rounded-lg bg-background p-3 space-y-2">
                      <p className="text-xs">Create a symlink in your project root:</p>
                      <div className="flex items-center justify-between gap-2">
                        <code className="flex-1 text-xs">ln -s ai-playbook/.github/copilot-instructions .github/</code>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('ln -s ai-playbook/.github/copilot-instructions .github/', 'Symlink command')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Claude (Cursor, Cline, etc.)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Workspace Root Setup (Option A - Recommended):</p>
                    <p className="text-xs text-muted-foreground">
                      Reference the orchestrator using @ mentions or relative paths
                    </p>
                    <div className="rounded-lg bg-background p-3 space-y-2">
                      <div className="bg-muted/50 p-2 rounded text-[10px] font-mono space-y-1">
                        <div className="text-muted-foreground"># From any project in workspace:</div>
                        <div>@../ai-playbook/.github/orchestrator.md scan this project</div>
                        <div className="mt-2 text-muted-foreground"># Or use a specific agent:</div>
                        <div>@../ai-playbook/.github/agents/code-reviewer/AGENT.md review this file</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Per-Project Setup (Options B & C):</p>
                    <div className="rounded-lg bg-background p-3 space-y-2">
                      <p className="text-xs">Add to your .cursorrules or .clinerules:</p>
                      <div className="bg-muted/50 p-2 rounded text-[10px] font-mono">
                        Use the AI Playbook orchestrator at ai-playbook/.github/orchestrator.md
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Other AI Tools (Amazon Q, Tabnine, etc.)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Workspace Root Setup (Option A):</p>
                    <p className="text-xs text-muted-foreground">
                      Manually reference files using relative paths from your current project
                    </p>
                    <div className="rounded-lg bg-background p-3 space-y-2">
                      <div className="bg-muted/50 p-2 rounded text-[10px] font-mono space-y-1">
                        <div className="text-muted-foreground"># Example prompt from project-a/:</div>
                        <div>Follow ../ai-playbook/.github/agents/code-reviewer/AGENT.md to review this code</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Per-Project Setup (Options B & C):</p>
                    <div className="rounded-lg bg-background p-3 space-y-2">
                      <div className="bg-muted/50 p-2 rounded text-[10px]">
                        "Follow the instructions in ai-playbook/.github/agents/code-reviewer/AGENT.md to review this file"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 4: Verify Installation</h3>
            <div className="space-y-3">
              <Card className="bg-muted/30">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Check Files Exist</p>
                      <p className="text-xs text-muted-foreground">
                        Verify the ai-playbook directory contains <code className="bg-muted px-1 py-0.5 rounded">.github/agents/</code> and <code className="bg-muted px-1 py-0.5 rounded">.github/orchestrator.md</code>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Test Path References</p>
                      <p className="text-xs text-muted-foreground">
                        If using workspace root (Option A), verify relative paths work from your projects
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Test an Agent</p>
                      <p className="text-xs text-muted-foreground">
                        Ask your AI tool to scan your workspace or create a component
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Review Policies</p>
                      <p className="text-xs text-muted-foreground">
                        Customize policies in <code className="bg-muted px-1 py-0.5 rounded">ai-playbook/.github/copilot-instructions/</code> as needed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Important Notes</p>
                <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li><strong>Workspace Root (Option A) Benefits:</strong> Single installation serves all projects, no duplication, easier updates</li>
                  <li><strong>Workspace Root Considerations:</strong> Requires using relative paths (../) when referencing from projects</li>
                  <li><strong>Per-Project (Options B & C) Benefits:</strong> Self-contained, can customize per project, easier team sharing via git</li>
                  <li>The AI Playbook is designed to be client-agnostic and reusable</li>
                  <li>Customize client-specific overrides in your project's documentation, not in the playbook itself</li>
                  <li>Keep the playbook updated by pulling changes if using git submodules or workspace root installation</li>
                  <li>Agents work across different AI tools with the orchestrator pattern</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
