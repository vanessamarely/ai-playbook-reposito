import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FolderTree, Copy, CheckCircle2, FileCode, Terminal, AlertTriangle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WorkspaceRootSetup() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const claudeGlobalSetup = `# Claude Code has a REAL personal scope — no symlink needed.
# Personal skills/agents apply to every project on your machine.

mkdir -p ~/.claude/skills ~/.claude/agents
cp -r ai-playbook/.claude/skills/* ~/.claude/skills/
cp -r ai-playbook/.claude/agents/* ~/.claude/agents/

# Now every "claude" session on this machine sees these skills/agents,
# regardless of which repo you're in. Update by re-running the cp above
# (or symlink instead of copy if you want them to stay in sync automatically):

# ln -s "$(pwd)/ai-playbook/.claude/skills"/* ~/.claude/skills/
`

  const codexGlobalSetup = `# Codex CLI also has a real personal scope: ~/.codex/AGENTS.md (global instructions)
# and $HOME/.agents/skills/ (user-scope skills) — both load in every project.

cp ai-playbook/AGENTS.md ~/.codex/AGENTS.md
mkdir -p ~/.agents/skills
cp -r ai-playbook/.agents/skills/* ~/.agents/skills/

# Codex merges ~/.codex/AGENTS.md with each repo's own AGENTS.md automatically —
# you don't need to touch the repos themselves for the global part.
`

  const cursorGlobalSetup = `# Cursor 2.4+ has a real global scope for SKILLS and COMMANDS — not rules.
# Global skills: ~/.cursor/skills/ (or the shared ~/.agents/skills/)
# Global commands: ~/.cursor/commands/

mkdir -p ~/.cursor/skills ~/.cursor/commands
cp -r ai-playbook/.claude/skills/* ~/.cursor/skills/
cp ai-playbook/.cursor/commands/*.md ~/.cursor/commands/

# Rules are still project-scoped only — there is no global .cursor/rules/.
# For rules, symlink (not copy) from each repo so they stay in sync:

# cd your-project && mkdir -p .cursor && \\
#   ln -s "$(pwd)/../ai-playbook/.cursor/rules" .cursor/rules
`

  const copilotPerRepoSetup = `# GitHub Copilot has a real global scope for SKILLS since 2026:
# ~/.copilot/skills/ or the shared ~/.agents/skills/ — but NOT for
# custom instructions, agents, or prompts, which still need each
# repo's own .github/. Symlinking keeps those three in sync.

mkdir -p ~/.copilot/skills
cp -r ai-playbook/.claude/skills/* ~/.copilot/skills/

cd your-project
ln -s "$(pwd)/../ai-playbook/.github/copilot-instructions.md" .github/copilot-instructions.md
ln -s "$(pwd)/../ai-playbook/.github/instructions" .github/instructions
ln -s "$(pwd)/../ai-playbook/.github/agents" .github/agents
ln -s "$(pwd)/../ai-playbook/.github/prompts" .github/prompts
`

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary" />
            Sharing the Playbook Across Multiple Projects
          </CardTitle>
          <CardDescription>
            Only some tools have a real "install once, use everywhere" mechanism — the rest need a symlink strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">There is no universal workspace-root config</p>
                <p className="text-xs text-muted-foreground">
                  Claude Code and Codex CLI support a personal/global scope for everything (<code className="bg-muted px-1 rounded">~/.claude/</code>, <code className="bg-muted px-1 rounded">~/.codex/</code> + <code className="bg-muted px-1 rounded">$HOME/.agents/skills/</code>). Since 2026, Copilot and Cursor also have a global scope, but <strong>only for skills</strong> (<code className="bg-muted px-1 rounded">~/.copilot/skills/</code>, <code className="bg-muted px-1 rounded">~/.cursor/skills/</code>, or the shared <code className="bg-muted px-1 rounded">~/.agents/skills/</code>) — their always-loaded instructions, custom agents, and (for Copilot) prompts still need each repo's own files, so a symlink into the shared <code className="bg-muted px-1 rounded">ai-playbook/</code> checkout remains the practical fix for those.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <Badge className="w-fit bg-primary text-primary-foreground text-xs">Claude Code</Badge>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                Real personal scope — copy/symlink once to <code className="bg-background px-1 rounded">~/.claude/</code>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <Badge className="w-fit bg-primary text-primary-foreground text-xs">Codex CLI</Badge>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                Real personal scope — <code className="bg-background px-1 rounded">~/.codex/AGENTS.md</code> + <code className="bg-background px-1 rounded">$HOME/.agents/skills/</code>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <Badge className="w-fit bg-accent text-accent-foreground text-xs">Cursor</Badge>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground flex items-start gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                Skills &amp; commands only (since 2.4) — rules are always project-scoped, symlink per repo
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <Badge className="w-fit bg-accent text-accent-foreground text-xs">GitHub Copilot</Badge>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground flex items-start gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                Skills only (since 2026) — instructions/agents/prompts symlink <code className="bg-background px-1 rounded">.github/</code> per repo
              </CardContent>
            </Card>
          </div>

          <Separator />

          <Tabs defaultValue="claude" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="claude">
                <FileCode className="h-3 w-3 mr-1" />
                Claude Code
              </TabsTrigger>
              <TabsTrigger value="codex">
                <FileCode className="h-3 w-3 mr-1" />
                Codex CLI
              </TabsTrigger>
              <TabsTrigger value="cursor">
                <FileCode className="h-3 w-3 mr-1" />
                Cursor
              </TabsTrigger>
              <TabsTrigger value="copilot">
                <FileCode className="h-3 w-3 mr-1" />
                Copilot
              </TabsTrigger>
            </TabsList>

            <TabsContent value="claude" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Personal skills &amp; agents</CardTitle>
                    <Badge variant="outline">~/.claude/skills/, ~/.claude/agents/</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Applies to every project on this machine — no per-repo file needed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Setup:</p>
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => copyToClipboard(claudeGlobalSetup, 'Claude global setup')}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{claudeGlobalSetup}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codex" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Personal AGENTS.md &amp; skills</CardTitle>
                    <Badge variant="outline">~/.codex/AGENTS.md, $HOME/.agents/skills/</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Codex merges the global AGENTS.md with each repo's own — no per-repo copy needed for the global part
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Setup:</p>
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => copyToClipboard(codexGlobalSetup, 'Codex global setup')}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{codexGlobalSetup}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cursor" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Global commands + per-repo rules</CardTitle>
                    <Badge variant="outline">~/.cursor/commands/</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Only commands have a global scope — rules must be symlinked into each repo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Setup:</p>
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => copyToClipboard(cursorGlobalSetup, 'Cursor global setup')}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{cursorGlobalSetup}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="copilot" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Symlink .github/ per repo</CardTitle>
                    <Badge variant="outline">No personal/global scope exists</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Copilot only ever reads from the current repository's own .github/ — this is the closest thing to "install once"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg bg-muted/80 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Setup (run inside each project repo):</p>
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => copyToClipboard(copilotPerRepoSetup, 'Copilot per-repo setup')}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{copilotPerRepoSetup}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              Workspace Layout
            </h3>
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-0.5">
              <div>~/workspace/</div>
              <div className="pl-4 text-primary">├── ai-playbook/ <span className="text-muted-foreground">← the shared checkout from this repo</span></div>
              <div className="pl-4">├── project-a/</div>
              <div className="pl-8 text-accent">└── .github/ → symlink into ../ai-playbook/.github/ <span className="text-muted-foreground">(Copilot only)</span></div>
              <div className="pl-4">├── project-b/</div>
              <div className="pl-4">└── project-c/</div>
              <div className="pl-4 text-muted-foreground"># Claude Code and Codex CLI don't need any of the above —</div>
              <div className="pl-4 text-muted-foreground"># their personal scope already covers every project folder.</div>
            </div>
          </div>

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
                    AI tools should only modify files in the current project folder — enforce this with the workspace policy, not by relying on the playbook's location.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Symlinks vs. copies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Prefer symlinks over copies wherever a tool allows it (Claude, Codex, Cursor commands) so a single{' '}
                    <code className="bg-muted px-1 rounded">git pull</code> in <code className="bg-muted px-1 rounded">ai-playbook/</code> updates every project instantly.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Copilot's instructions/agents/prompts remain per-repo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Copilot's skills scope is global since 2026, but copilot-instructions.md, custom agents, and prompt files still don't have a personal scope — plan for a symlink (or a small setup script) for those in every repository that uses Copilot.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Team Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Commit the symlink setup script to your team's dotfiles or a bootstrap script so everyone gets the same layout instantly.
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
