import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Terminal, Download, FolderGit2, Copy, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ToolSetup {
  id: string
  label: string
  alwaysOn: string
  verifyCommand: string
  testPrompt: string
  checklist: string[]
  hasGlobalScope: boolean
  globalScopeNote: string
  globalSetupScript: string
}

const TOOL_SETUPS: ToolSetup[] = [
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    alwaysOn: '.github/copilot-instructions.md is read automatically; .github/skills/*/SKILL.md is discovered natively too (since 2026).',
    verifyCommand: 'ls .github/copilot-instructions.md .github/instructions/ .github/skills/ .github/agents/ .github/prompts/',
    testPrompt: 'Ask Copilot to build a React component and confirm it pulls in the react-components skill',
    checklist: [
      '.github/copilot-instructions.md exists at the repo root',
      '.github/instructions/*.instructions.md files have a valid applyTo glob',
      '.github/skills/<name>/SKILL.md exists for each skill (name + description frontmatter)',
      '.github/agents/*.agent.md files have a description field; select one explicitly from the Copilot Chat agent picker to test it',
    ],
    hasGlobalScope: false,
    globalScopeNote: 'Skills only (since 2026) — copilot-instructions.md, custom agents, and prompt files have no personal scope and still need each repo\'s own .github/. Symlinking keeps them in sync.',
    globalSetupScript: `# GitHub Copilot has a real global scope for SKILLS since 2026:
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
`,
  },
  {
    id: 'claude',
    label: 'Claude Code',
    alwaysOn: 'CLAUDE.md is read at session start — .claude/skills/ and .claude/agents/ are auto-discovered from the project root.',
    verifyCommand: 'ls CLAUDE.md .claude/skills/ .claude/agents/',
    testPrompt: 'What skills are available? / Scan this workspace',
    checklist: [
      'CLAUDE.md exists at the repo root',
      '.claude/skills/<name>/SKILL.md exists for each skill',
      '.claude/agents/<name>.md exists for each subagent',
      'Ask Claude "what skills are available?" to confirm discovery',
    ],
    hasGlobalScope: true,
    globalScopeNote: 'Real personal scope for everything — no symlink needed. Skills/agents copied to ~/.claude/ apply to every project on this machine.',
    globalSetupScript: `# Claude Code has a REAL personal scope — no symlink needed.
# Personal skills/agents apply to every project on your machine.

mkdir -p ~/.claude/skills ~/.claude/agents
cp -r ai-playbook/.claude/skills/* ~/.claude/skills/
cp -r ai-playbook/.claude/agents/* ~/.claude/agents/

# Now every "claude" session on this machine sees these skills/agents,
# regardless of which repo you're in. Update by re-running the cp above
# (or symlink instead of copy if you want them to stay in sync automatically):

# ln -s "$(pwd)/ai-playbook/.claude/skills"/* ~/.claude/skills/
`,
  },
  {
    id: 'cursor',
    label: 'Cursor',
    alwaysOn: '.cursor/rules/*.mdc with alwaysApply: true load every session; .cursor/skills/*/SKILL.md is discovered natively too (since Cursor 2.4).',
    verifyCommand: 'ls .cursor/rules/ .cursor/skills/ .cursor/commands/',
    testPrompt: '/react-component-builder (or just ask — Cursor matches skills by description too)',
    checklist: [
      '.cursor/rules/*.mdc files parse with valid frontmatter (description, globs, or alwaysApply)',
      '.cursor/skills/<name>/SKILL.md exists for each skill (name + description, optional paths)',
      '.cursor/commands/*.md files appear in the / command menu',
      'No leftover .cursorrules file (legacy, ignored by Agent mode)',
    ],
    hasGlobalScope: true,
    globalScopeNote: 'Skills & commands only (since 2.4) — rules are always project-scoped, so those still need a symlink per repo.',
    globalSetupScript: `# Cursor 2.4+ has a real global scope for SKILLS and COMMANDS — not rules.
# Global skills: ~/.cursor/skills/ (or the shared ~/.agents/skills/)
# Global commands: ~/.cursor/commands/

mkdir -p ~/.cursor/skills ~/.cursor/commands
cp -r ai-playbook/.claude/skills/* ~/.cursor/skills/
cp ai-playbook/.cursor/commands/*.md ~/.cursor/commands/

# Rules are still project-scoped only — there is no global .cursor/rules/.
# For rules, symlink (not copy) from each repo so they stay in sync:

# cd your-project && mkdir -p .cursor && \\
#   ln -s "$(pwd)/../ai-playbook/.cursor/rules" .cursor/rules
`,
  },
  {
    id: 'codex',
    label: 'OpenAI Codex CLI',
    alwaysOn: 'AGENTS.md is read automatically (root + nested); .agents/skills/ is auto-discovered.',
    verifyCommand: 'ls AGENTS.md .agents/skills/',
    testPrompt: '/skills',
    checklist: [
      'AGENTS.md exists at the repo root',
      '.agents/skills/<name>/SKILL.md exists for each skill (not .codex/skills/)',
      'Run /skills in Codex CLI to confirm they were discovered',
      'If using a nested AGENTS.md, confirm it only contains what differs from root',
    ],
    hasGlobalScope: true,
    globalScopeNote: 'Real personal scope for everything — Codex merges ~/.codex/AGENTS.md with each repo\'s own automatically.',
    globalSetupScript: `# Codex CLI has a real personal scope: ~/.codex/AGENTS.md (global instructions)
# and $HOME/.agents/skills/ (user-scope skills) — both load in every project.

cp ai-playbook/AGENTS.md ~/.codex/AGENTS.md
mkdir -p ~/.agents/skills
cp -r ai-playbook/.agents/skills/* ~/.agents/skills/

# Codex merges ~/.codex/AGENTS.md with each repo's own AGENTS.md automatically —
# you don't need to touch the repos themselves for the global part.
`,
  },
]

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
            Pick the AI tool you actually use — each tab below has everything for that tool in one place: what loads automatically, how to install, how to verify, and how to share it across projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Terminal className="h-5 w-5 text-accent" />
              Step 1: Get the Playbook
            </h3>
            <p className="text-sm text-muted-foreground">
              Same regardless of which AI tool you use — only Step 2 below differs per tool.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-accent/10 border-accent/40">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 bg-accent text-accent-foreground text-xs">Multi-repo workspaces</Badge>
                  <CardTitle className="text-sm">Workspace Root</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-lg bg-background p-2 font-mono text-[10px] flex items-center justify-between gap-2">
                    <code className="flex-1">cd ~/workspace && git clone &lt;repo-url&gt; ai-playbook</code>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0" onClick={() => copyToClipboard('cd ~/workspace && git clone <repo-url> ai-playbook', 'Clone command')}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 text-xs" variant="outline">Option B</Badge>
                  <CardTitle className="text-sm">Git Submodule Per Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-lg bg-background p-2 font-mono text-[10px] flex items-center justify-between gap-2">
                    <code className="flex-1">git submodule add &lt;repo-url&gt; ai-playbook</code>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0" onClick={() => copyToClipboard('git submodule add <repo-url> ai-playbook', 'Submodule command')}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 text-xs" variant="outline">Option C</Badge>
                  <CardTitle className="text-sm">Direct Copy Per Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-lg bg-background p-2 font-mono text-[10px] flex items-center justify-between gap-2">
                    <code className="flex-1">cp -r ai-playbook /path/to/project/</code>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0" onClick={() => copyToClipboard('cp -r ai-playbook /path/to/project/', 'Copy command')}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p className="text-xs text-muted-foreground">
              After cloning/copying, <code className="bg-muted px-1 rounded">ai-playbook/</code> should contain all 4 tool trees (<code className="bg-muted px-1 rounded">.claude/</code>, <code className="bg-muted px-1 rounded">.github/</code>, <code className="bg-muted px-1 rounded">.cursor/</code>, <code className="bg-muted px-1 rounded">AGENTS.md</code> + <code className="bg-muted px-1 rounded">.agents/skills/</code>) — see the <strong>Core</strong> tab for the full breakdown of each.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 2: Set Up Your AI Tool</h3>
            <p className="text-sm text-muted-foreground">
              Pick the one you use — everything you need for it lives in its own tab.
            </p>

            <Tabs defaultValue="copilot" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                {TOOL_SETUPS.map((t) => (
                  <TabsTrigger key={t.id} value={t.id} className="text-xs">{t.label}</TabsTrigger>
                ))}
              </TabsList>

              {TOOL_SETUPS.map((t) => (
                <TabsContent key={t.id} value={t.id} className="space-y-3">
                  <Card className="bg-accent/5 border-accent/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        {t.label} — what loads automatically
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-muted-foreground">{t.alwaysOn}</p>
                      <div className="rounded-lg bg-background p-3 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <code className="flex-1 text-xs">{t.verifyCommand}</code>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0" onClick={() => copyToClipboard(t.verifyCommand, `${t.label} verify command`)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-2 text-[10px] font-mono">
                        <span className="text-muted-foreground"># Test it: </span>{t.testPrompt}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Use it across every project (no per-repo copy)</CardTitle>
                        <Badge variant={t.hasGlobalScope ? 'default' : 'outline'} className="text-xs">
                          {t.hasGlobalScope ? 'Global scope available' : 'Symlink per repo'}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">{t.globalScopeNote}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-muted-foreground">Setup:</p>
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => copyToClipboard(t.globalSetupScript, `${t.label} sharing setup`)}>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <pre className="text-[10px] leading-relaxed overflow-x-auto max-h-72 overflow-y-auto bg-muted/50 rounded-lg p-3">
                        <code>{t.globalSetupScript}</code>
                      </pre>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Verify Installation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {t.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <Separator />

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Important Notes</p>
                <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li>Always-loaded instructions and custom agents are independent per tool — installing for one doesn't configure the others</li>
                  <li>Skills are the exception: <code className="bg-muted px-1 rounded">.claude/skills/</code> and <code className="bg-muted px-1 rounded">.agents/skills/</code> together cover all 4 tools natively, so you only need to author/update a skill once</li>
                  <li>Prefer symlinks over copies wherever a tool allows it, so a single <code className="bg-muted px-1 rounded">git pull</code> in <code className="bg-muted px-1 rounded">ai-playbook/</code> updates every project instantly</li>
                  <li>Customize client-specific overrides in your project's own instructions, not in the shared playbook</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
