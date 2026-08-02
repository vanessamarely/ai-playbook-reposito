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
            How to install the AI Playbook and configure each of the 4 supported AI tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Terminal className="h-5 w-5 text-accent" />
              Step 1: Choose Your Installation Method
            </h3>
            <p className="text-sm text-muted-foreground">
              These options are the same regardless of which AI tool you use — only the setup in Step 3 differs per tool.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-accent/10 border-accent/40">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 bg-accent text-accent-foreground text-xs">Multi-repo workspaces</Badge>
                  <CardTitle className="text-sm">Workspace Root</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Clone once at the workspace root; see the Setup tab's "Sharing Across Projects" card for which tools support this natively.
                  </p>
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
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-accent" />
              Step 2: Verify the Playbook's Own Structure
            </h3>
            <p className="text-sm text-muted-foreground">
              After cloning/copying, confirm <code className="bg-muted px-1 rounded">ai-playbook/</code> contains all 4 tool trees:{' '}
              <code className="bg-muted px-1 rounded">.claude/</code>, <code className="bg-muted px-1 rounded">.github/</code>,{' '}
              <code className="bg-muted px-1 rounded">.cursor/</code>, and <code className="bg-muted px-1 rounded">AGENTS.md</code> +{' '}
              <code className="bg-muted px-1 rounded">.agents/skills/</code>. See the <strong>Core → Structure</strong> tab for the full breakdown of each.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Configure Your AI Tool</h3>
            <p className="text-sm text-muted-foreground">
              What actually loads automatically differs per tool — pick the one you use:
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
                        {t.label}
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
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 4: Verify Installation</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {TOOL_SETUPS.map((t) => (
                <Card key={t.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{t.label}</CardTitle>
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
              ))}
            </div>
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
                  <li>Claude Code and Codex CLI also support a personal/global scope so you don't need to touch every repo — see the Setup tab</li>
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
