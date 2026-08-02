import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  GitBranch,
  FolderTree,
  FileCode,
  CheckCircle2,
  Info,
  AlertCircle,
} from 'lucide-react'

interface ToolColumn {
  id: string
  label: string
  badge: string
  colorClass: string
  tree: { text: string; className?: string }[]
  characteristics: string[]
  policyLoading: string
  agentInvocation: string
  skillEquivalent: string
  examplePaths: { label: string; path: string }[]
}

const COLUMNS: ToolColumn[] = [
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    badge: 'bg-accent text-accent-foreground',
    colorClass: 'text-accent',
    tree: [
      { text: 'project-root/', className: 'text-foreground font-semibold' },
      { text: '├── .github/', className: 'text-accent font-medium' },
      { text: '│   ├── copilot-instructions.md', className: 'text-primary' },
      { text: '│   ├── instructions/' },
      { text: '│   │   ├── frontend.instructions.md', className: 'text-muted-foreground' },
      { text: '│   │   └── backend.instructions.md', className: 'text-muted-foreground' },
      { text: '│   ├── skills/', className: 'text-accent font-medium' },
      { text: '│   │   └── react-components/SKILL.md', className: 'text-accent' },
      { text: '│   ├── agents/' },
      { text: '│   │   └── pr-reviewer.agent.md', className: 'text-accent' },
      { text: '│   └── prompts/' },
      { text: '│       └── react-components.prompt.md', className: 'text-muted-foreground' },
      { text: '└── src/' },
    ],
    characteristics: [
      'Everything lives under .github/',
      'copilot-instructions.md is a single always-on file, not a folder',
      '.github/skills/*/SKILL.md — native since 2026, same format as the other 3 tools',
      '.agent.md files (formerly .chatmode.md) for custom agents — a separate, non-converged mechanism',
    ],
    policyLoading: 'Auto-loads .github/copilot-instructions.md; .instructions.md files apply only when applyTo glob matches',
    agentInvocation: 'Select the agent explicitly in Copilot Chat/CLI',
    skillEquivalent: '.github/skills/*/SKILL.md (native, full folder support) — also checks .claude/skills/ and .agents/skills/; .prompt.md remains as a lighter single-file option',
    examplePaths: [
      { label: 'Always-on instructions', path: '.github/copilot-instructions.md' },
      { label: 'Path-specific rule', path: '.github/instructions/frontend.instructions.md' },
      { label: 'Agent', path: '.github/agents/pr-reviewer.agent.md' },
      { label: 'Skill (native)', path: '.github/skills/react-components/SKILL.md' },
    ],
  },
  {
    id: 'claude',
    label: 'Claude Code',
    badge: 'bg-primary text-primary-foreground',
    colorClass: 'text-primary',
    tree: [
      { text: 'project-root/', className: 'text-foreground font-semibold' },
      { text: '├── CLAUDE.md', className: 'text-primary font-medium' },
      { text: '├── .claude/', className: 'text-accent font-medium' },
      { text: '│   ├── agents/' },
      { text: '│   │   ├── pr-reviewer.md', className: 'text-primary' },
      { text: '│   │   └── code-reviewer.md', className: 'text-primary' },
      { text: '│   └── skills/' },
      { text: '│       └── react-components/' },
      { text: '│           ├── SKILL.md', className: 'text-primary' },
      { text: '│           ├── references/', className: 'text-muted-foreground' },
      { text: '│           └── assets/', className: 'text-muted-foreground' },
      { text: '└── src/' },
    ],
    characteristics: [
      'CLAUDE.md at root is always loaded (plus nested CLAUDE.md per subfolder)',
      '.claude/agents/*.md — one flat file per subagent',
      '.claude/skills/<name>/SKILL.md — full folder with scripts/references/assets',
      'Follows the open Agent Skills standard (agentskills.io)',
    ],
    policyLoading: 'CLAUDE.md read at session start; skills\' descriptions loaded into context, full body loads on invocation',
    agentInvocation: 'Delegated automatically via the Agent tool, or invoked directly',
    skillEquivalent: '.claude/skills/<name>/SKILL.md — the richest format of the four (scripts/references/assets)',
    examplePaths: [
      { label: 'Always-on instructions', path: 'CLAUDE.md' },
      { label: 'Agent', path: '.claude/agents/pr-reviewer.md' },
      { label: 'Skill', path: '.claude/skills/react-components/SKILL.md' },
      { label: 'Supporting file', path: '.claude/skills/react-components/references/a11y-wcag22.md' },
    ],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    badge: 'bg-accent text-accent-foreground',
    colorClass: 'text-accent',
    tree: [
      { text: 'project-root/', className: 'text-foreground font-semibold' },
      { text: '├── .cursor/', className: 'text-accent font-medium' },
      { text: '│   ├── rules/' },
      { text: '│   │   └── workspace-policy.mdc', className: 'text-primary' },
      { text: '│   ├── skills/', className: 'text-accent font-medium' },
      { text: '│   │   └── react-components/SKILL.md', className: 'text-accent' },
      { text: '│   └── commands/' },
      { text: '│       └── ai-tool-setup.md', className: 'text-primary' },
      { text: '├── .cursorrules', className: 'text-muted-foreground line-through' },
      { text: '│   (deprecated — ignored by Agent mode)', className: 'text-muted-foreground text-[10px]' },
      { text: '└── src/' },
    ],
    characteristics: [
      'No single always-loaded file — .mdc rules opt in via alwaysApply or globs',
      '.cursor/skills/*/SKILL.md — native since Cursor 2.4 (2026), same format as Claude/Copilot/Codex',
      'Also reads .claude/agents/ directly for subagents — no separate .cursor/agents/ copy needed',
      'Legacy single .cursorrules file is deprecated, Agent mode ignores it',
    ],
    policyLoading: '.mdc rules with alwaysApply: true load every session; globs-based rules auto-attach by file type',
    agentInvocation: 'Subagents from .cursor/agents/, .claude/agents/, or .codex/agents/ (project wins ties); commands via /name for one-off actions',
    skillEquivalent: '.cursor/skills/*/SKILL.md (native) — also reads .agents/skills/ and, for legacy compatibility, .claude/skills/',
    examplePaths: [
      { label: 'Always-on rule', path: '.cursor/rules/workspace-policy.mdc' },
      { label: 'Skill (native)', path: '.cursor/skills/react-components/SKILL.md' },
      { label: 'Command', path: '.cursor/commands/ai-tool-setup.md' },
      { label: 'Legacy (avoid)', path: '.cursorrules' },
    ],
  },
  {
    id: 'codex',
    label: 'OpenAI Codex CLI',
    badge: 'bg-primary text-primary-foreground',
    colorClass: 'text-primary',
    tree: [
      { text: 'project-root/', className: 'text-foreground font-semibold' },
      { text: '├── AGENTS.md', className: 'text-primary font-medium' },
      { text: '├── src/', className: 'text-muted-foreground' },
      { text: '│   └── AGENTS.md', className: 'text-primary text-[11px]' },
      { text: '│       (nested override, nearest wins)', className: 'text-muted-foreground text-[10px]' },
      { text: '└── .agents/', className: 'text-accent font-medium' },
      { text: '    └── skills/' },
      { text: '        ├── pr-reviewer/SKILL.md', className: 'text-primary' },
      { text: '        └── react-components/SKILL.md', className: 'text-primary' },
    ],
    characteristics: [
      'AGENTS.md at root is always loaded; nested AGENTS.md files override for their subtree',
      'No separate "agent" concept — every procedure is a skill',
      '.agents/skills/<name>/SKILL.md — the most cross-compatible path: Copilot and Cursor read it natively too',
      'Discovery path is .agents/skills/, not .codex/skills/',
    ],
    policyLoading: 'AGENTS.md merged root-to-nearest; skills discovered automatically under .agents/skills/',
    agentInvocation: 'No distinct agent format — invoke the skill directly ($skill-name or by description match)',
    skillEquivalent: '.agents/skills/<name>/SKILL.md — same path Copilot and Cursor also check natively',
    examplePaths: [
      { label: 'Always-on instructions', path: 'AGENTS.md' },
      { label: 'Nested override', path: 'src/AGENTS.md' },
      { label: 'Skill (agent role)', path: '.agents/skills/pr-reviewer/SKILL.md' },
      { label: 'Skill (reference role)', path: '.agents/skills/react-components/SKILL.md' },
    ],
  },
]

export default function StructureComparison() {
  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-accent" />
            Four Tools, Four Structures: Side-by-Side
          </CardTitle>
          <CardDescription>
            Verified against each tool's official documentation — folder structure, frontmatter, and invocation model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>What's actually shared (as of 2026)</AlertTitle>
            <AlertDescription className="text-sm">
              Each tool still has its own always-loaded instructions file and its own custom-agent mechanism — those haven't converged. But the on-demand <strong>skill</strong> layer has: GitHub Copilot and Cursor both added native <code className="bg-muted px-1.5 py-0.5 rounded">SKILL.md</code> support in 2026, so <code className="bg-muted px-1.5 py-0.5 rounded">.agents/skills/</code> is now read natively by <strong>three</strong> of the four tools (Copilot, Cursor, Codex CLI), and <code className="bg-muted px-1.5 py-0.5 rounded">.claude/skills/</code> is read by <strong>Claude Code, Copilot, and Cursor</strong>. Cursor also reads Claude Code's <code className="bg-muted px-1.5 py-0.5 rounded">.claude/agents/</code> directly for subagents.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            {COLUMNS.map((col) => (
              <Card key={col.id} className="bg-muted/20">
                <CardHeader className="pb-4">
                  <Badge className={`w-fit mb-2 ${col.badge}`}>{col.label}</Badge>
                  <CardTitle className="text-lg">Folder Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-background p-4 rounded-lg overflow-x-auto">
                    <div className="font-mono text-xs space-y-0.5 whitespace-pre">
                      {col.tree.map((line, i) => (
                        <div key={i} className={line.className}>{line.text}</div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className={`h-3 w-3 ${col.colorClass}`} />
                      Key Characteristics
                    </h4>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {col.characteristics.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`${col.colorClass} mt-0.5`}>•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileCode className="h-5 w-5 text-accent" />
              How Policies Load & How Agents Get Invoked
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {COLUMNS.map((col) => (
                <Card key={col.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <Badge variant="outline" className="w-fit mb-2">{col.label}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div>
                      <p className="font-medium mb-1">Policy loading</p>
                      <p className="text-muted-foreground">{col.policyLoading}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Agent invocation</p>
                      <p className="text-muted-foreground">{col.agentInvocation}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">"Skill" equivalent</p>
                      <p className="text-muted-foreground">{col.skillEquivalent}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-accent" />
              Path Reference Examples
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {COLUMNS.map((col) => (
                <Card key={col.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <Badge variant="outline" className="w-fit mb-2">{col.label}</Badge>
                    <CardTitle className="text-sm">Example Paths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-[10px] font-mono">
                      {col.examplePaths.map((p, i) => (
                        <div key={i} className="p-2 bg-background rounded">
                          <div className="text-muted-foreground mb-1 font-sans">{p.label}:</div>
                          <div className={col.colorClass}>{p.path}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <Card className="bg-muted/50 border-muted">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-foreground" />
                Which Structure Do I Need?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">You don't choose one — you build all the ones you need</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      These four structures aren't interchangeable options for the same job — they're what each specific tool actually reads. But you no longer need four separate skill copies: put skills in <code className="bg-muted px-1 rounded">.claude/skills/</code> and <code className="bg-muted px-1 rounded">.agents/skills/</code> (identical content, two paths) and all four tools find them. Each tool's always-loaded instructions file and Copilot's <code className="bg-muted px-1 rounded">.agent.md</code> format still need their own dedicated files.
                    </p>
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
