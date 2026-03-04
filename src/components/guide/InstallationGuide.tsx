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
              Step 1: Clone or Copy the AI Playbook
            </h3>
            <p className="text-sm text-muted-foreground">
              You have two options to integrate the AI Playbook into your workspace:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-muted/30">
                <CardHeader>
                  <Badge className="w-fit mb-2" variant="outline">Option A</Badge>
                  <CardTitle className="text-base">Git Submodule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Keep the playbook synced with the main repository for easy updates
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
                  <Badge className="w-fit mb-2" variant="outline">Option B</Badge>
                  <CardTitle className="text-base">Direct Copy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Copy the playbook directly into your project for full customization
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

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-accent" />
              Step 2: Repository Structure
            </h3>
            <p className="text-sm text-muted-foreground">
              After installation, your project should contain this structure:
            </p>
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-1">
              <div>your-project/</div>
              <div className="pl-4">├── ai-playbook/</div>
              <div className="pl-8 text-primary">├── .github/</div>
              <div className="pl-12 text-muted-foreground">├── copilot-instructions/</div>
              <div className="pl-12 text-muted-foreground">├── agents/</div>
              <div className="pl-12 text-muted-foreground">└── skills/</div>
              <div className="pl-8 text-primary">└── tools/</div>
              <div className="pl-4">├── src/</div>
              <div className="pl-4">└── ...</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Configure Your AI Tool</h3>
            <p className="text-sm text-muted-foreground">
              Choose your AI tool and follow the appropriate setup:
            </p>

            <div className="space-y-3">
              <Card className="bg-accent/5 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    GitHub Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Copilot automatically reads instructions from <code className="bg-muted px-1 py-0.5 rounded text-xs">.github/copilot-instructions.md</code>
                  </p>
                  <div className="rounded-lg bg-background p-3 space-y-2">
                    <p className="text-xs font-medium">Create a symlink in your project root:</p>
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
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Claude (Cursor, Cline, etc.)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Claude uses the orchestrator to route requests to agents
                  </p>
                  <div className="rounded-lg bg-background p-3 space-y-2">
                    <p className="text-xs font-medium">Reference the orchestrator in your prompts or .cursorrules:</p>
                    <div className="bg-muted/50 p-2 rounded text-xs font-mono">
                      Use the AI Playbook orchestrator at ai-playbook/.github/orchestrator.md
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
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Manually reference agent files when requesting specific tasks
                  </p>
                  <div className="rounded-lg bg-background p-3 space-y-2">
                    <p className="text-xs">Example prompt:</p>
                    <div className="bg-muted/50 p-2 rounded text-xs">
                      "Follow the instructions in ai-playbook/.github/agents/code-reviewer/AGENT.md to review this file"
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
                        Verify <code className="bg-muted px-1 py-0.5 rounded">ai-playbook/.github/agents/</code> contains agent files
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
                        Customize policies in <code className="bg-muted px-1 py-0.5 rounded">.github/copilot-instructions/</code> as needed
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
              <div className="space-y-1">
                <p className="text-sm font-medium">Important Notes</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>The AI Playbook is designed to be client-agnostic and reusable</li>
                  <li>Customize client-specific overrides in your project's documentation, not in the playbook itself</li>
                  <li>Keep the playbook updated by pulling changes if using git submodules</li>
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
