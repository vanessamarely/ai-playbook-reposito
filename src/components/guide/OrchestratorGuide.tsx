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
  Info,
  Lightbulb,
  Layers,
  AlertCircle,
  Code,
} from 'lucide-react'

interface RoutingTool {
  id: string
  label: string
  badgeClass: string
  alwaysLoaded: string
  onDemand: string
  invocation: string
  steps: { title: string; detail: string }[]
  example: { label: string; code: string }[]
}

const ROUTING: RoutingTool[] = [
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    badgeClass: 'bg-accent text-accent-foreground',
    alwaysLoaded: '.github/copilot-instructions.md (repo-wide) + any .github/instructions/*.instructions.md whose applyTo glob matches the file you\'re editing',
    onDemand: '.github/skills/*/SKILL.md (native since 2026 — Copilot matches your request against skill descriptions, same as Claude); .github/agents/*.agent.md (selected explicitly) and .github/prompts/*.prompt.md (invoked with /prompt-name)',
    invocation: 'Skills route by description match like Claude/Cursor/Codex do. Agents and prompts are still picked explicitly from a menu or typed as /prompt-name — those two mechanisms have not converged.',
    steps: [
      { title: '1. Instructions auto-load', detail: 'copilot-instructions.md loads every conversation; matching .instructions.md files layer on top based on the files in context.' },
      { title: '2. Skill descriptions load', detail: 'Every .github/skills/*/SKILL.md description becomes available; Copilot loads the matching skill\'s full body when relevant, same as Claude Code.' },
      { title: '3. You select an agent or prompt (if needed)', detail: 'For a multi-step task, you explicitly pick a custom agent from .github/agents/, or type /prompt-name for a reusable prompt.' },
      { title: '4. Execution', detail: 'Copilot follows the instructions + whichever skill/agent/prompt content loaded.' },
    ],
    example: [
      { label: 'Repo-wide rule', code: '.github/copilot-instructions.md — always in context' },
      { label: 'Path-specific rule', code: '.github/instructions/frontend.instructions.md\napplyTo: "**/*.tsx,**/*.ts"' },
      { label: 'Skill (model decides)', code: '.github/skills/react-components/SKILL.md' },
      { label: 'Explicit agent pick', code: 'Copilot Chat → Agents → react-component-builder' },
    ],
  },
  {
    id: 'claude',
    label: 'Claude Code',
    badgeClass: 'bg-primary text-primary-foreground',
    alwaysLoaded: 'CLAUDE.md (root, + any nested CLAUDE.md for the directory you\'re working in)',
    onDemand: '.claude/skills/*/SKILL.md — Claude reads every skill\'s name + description at session start, then loads the full body only when it decides a skill is relevant (or you type /skill-name yourself)',
    invocation: 'Claude itself decides which skill to load, based on your message matching a skill\'s description — this is real model-driven routing, not a manual picker.',
    steps: [
      { title: '1. CLAUDE.md loads', detail: 'Read at session start — routing table, core rules, tech stack.' },
      { title: '2. Skill descriptions load', detail: 'Every .claude/skills/*/SKILL.md description (not the full body) is available to Claude as a lightweight index.' },
      { title: '3. Claude matches your request', detail: 'Your message is compared against skill descriptions; the best match\'s full SKILL.md body loads into context.' },
      { title: '4. Subagent delegation (optional)', detail: 'For an isolated, multi-step task, Claude can delegate to a .claude/agents/*.md subagent with its own tool access.' },
      { title: '5. Execution', detail: 'Claude follows the loaded skill\'s procedure, using scripts/references/assets on demand.' },
    ],
    example: [
      { label: 'Always loaded', code: 'CLAUDE.md' },
      { label: 'Model decides to load', code: '.claude/skills/react-components/SKILL.md' },
      { label: 'Explicit invocation', code: '/react-components  (or ask Claude directly — it decides)' },
    ],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    badgeClass: 'bg-accent text-accent-foreground',
    alwaysLoaded: '.cursor/rules/*.mdc with alwaysApply: true',
    onDemand: '.cursor/skills/*/SKILL.md (native since Cursor 2.4 — description-matched like Claude/Copilot/Codex, or typed as /skill-name); .cursor/rules/*.mdc with globs; .cursor/commands/*.md (only when you type /command-name)',
    invocation: 'Skills route by description match, same model-driven mechanism as Claude Code/Copilot/Codex. Rules still auto-attach by glob, and commands still require typing /command-name — three mechanisms coexist, each with its own trigger.',
    steps: [
      { title: '1. Always-on rules load', detail: 'Every .mdc with alwaysApply: true is in context from the start of the session.' },
      { title: '2. Skill descriptions load', detail: 'Every .cursor/skills/*/SKILL.md description becomes available; Cursor loads the matching skill\'s full body when relevant, or you type /skill-name.' },
      { title: '3. Globs auto-attach', detail: 'Opening or editing a file matching a rule\'s globs pulls that rule into context automatically.' },
      { title: '4. You invoke a command', detail: 'Typing /command-name inserts that command\'s full content as the next instruction — always explicit, never automatic.' },
    ],
    example: [
      { label: 'Always-on rule', code: '.cursor/rules/workspace-policy.mdc\nalwaysApply: true' },
      { label: 'Skill (model decides)', code: '.cursor/skills/react-components/SKILL.md' },
      { label: 'Explicit command', code: '/ai-tool-setup  →  .cursor/commands/ai-tool-setup.md' },
    ],
  },
  {
    id: 'codex',
    label: 'OpenAI Codex CLI',
    badgeClass: 'bg-primary text-primary-foreground',
    alwaysLoaded: 'AGENTS.md — root file plus any nearer AGENTS.md between the repo root and your working directory (nearest wins for conflicts)',
    onDemand: '.agents/skills/*/SKILL.md — same model-driven description matching as Claude, at a different discovery path',
    invocation: 'Codex merges AGENTS.md top-to-bottom (root first, nested overrides layered on top) automatically, then matches your request against skill descriptions the same way Claude does — Codex has no separate "agent" file format to pick from.',
    steps: [
      { title: '1. AGENTS.md chain builds', detail: 'Codex walks from the repo root to your working directory, combining every AGENTS.md it finds, nearest content applied last.' },
      { title: '2. Skill descriptions load', detail: 'Every .agents/skills/*/SKILL.md name + description becomes available.' },
      { title: '3. Codex matches your request', detail: 'The best-matching skill\'s full body loads — or you invoke one explicitly with $skill-name.' },
      { title: '4. Execution', detail: 'Codex follows the loaded skill\'s procedure, using its scripts/references/assets on demand.' },
    ],
    example: [
      { label: 'Root policy', code: 'AGENTS.md' },
      { label: 'Nested override', code: 'src/AGENTS.md  (layers on top of root)' },
      { label: 'Skill (no separate "agent" format)', code: '.agents/skills/react-component-builder/SKILL.md' },
    ],
  },
]

export default function OrchestratorGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            How Requests Reach the Right Agent or Skill
          </CardTitle>
          <CardDescription>
            There is no universal "orchestrator.md" file — each tool has its own routing mechanism, built into the tool itself
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>What actually routes a request</AlertTitle>
            <AlertDescription className="text-sm">
              As of 2026, <strong>skills route the same way in all four tools</strong>: every skill's <code className="bg-muted px-1.5 py-0.5 rounded">description</code> is visible to the model, which decides when to load the full body — real model-driven routing, not a hand-written dispatcher. Custom agents, prompts, and commands remain <strong>explicit-only</strong> in every tool (you pick one, or type its name) — that part never converged. None of the four tools reads a file literally named <code className="bg-muted px-1.5 py-0.5 rounded">orchestrator.md</code>.
            </AlertDescription>
          </Alert>

          <div className="bg-background p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Cpu className="h-4 w-4 text-accent" />
              Two Routing Models
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Explicit (all four, for agents/prompts/commands):</strong> you select an agent from a menu, type a slash command or prompt name, or a file-type glob auto-attaches a rule — deterministic, no ambiguity about what will load.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Model-driven (all four, for skills):</strong> every skill's description is always visible to the model; it decides which skill's full body to load based on your actual request — you can still invoke one directly by name. This used to be Claude Code/Codex-only; Copilot and Cursor added it in 2026.
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
            Routing, Tool by Tool
          </CardTitle>
          <CardDescription>
            What loads automatically, what loads on demand, and how invocation actually works
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="copilot" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {ROUTING.map((tool) => (
                <TabsTrigger key={tool.id} value={tool.id}>{tool.label}</TabsTrigger>
              ))}
            </TabsList>

            {ROUTING.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="space-y-4">
                <Card className="bg-muted/20">
                  <CardHeader className="pb-3">
                    <Badge className={`w-fit mb-2 ${tool.badgeClass}`}>{tool.label}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 text-xs">
                    <div>
                      <p className="font-medium text-foreground mb-1">Always loaded</p>
                      <p className="text-muted-foreground">{tool.alwaysLoaded}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Loaded on demand</p>
                      <p className="text-muted-foreground">{tool.onDemand}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">How invocation works</p>
                      <p className="text-muted-foreground">{tool.invocation}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
                        <Code className="h-4 w-4 text-accent" />
                        Request → Response Flow
                      </h3>
                      {tool.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Badge variant="outline" className="shrink-0">{i + 1}</Badge>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{step.title.replace(/^\d+\.\s*/, '')}</p>
                            <p className="text-muted-foreground">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-foreground">Path Examples</h3>
                      {tool.example.map((ex, i) => (
                        <div key={i} className="bg-background p-2 rounded">
                          <p className="text-muted-foreground mb-1">{ex.label}:</p>
                          <pre className="font-mono text-[10px] whitespace-pre-wrap">{ex.code}</pre>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
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
            All four tools share this strategy, even though the file structure differs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Keep the always-loaded file short. Put dense, single-purpose content in a skill/prompt/rule/agent that only loads when it's actually relevant. This prevents overwhelming the model with irrelevant information and keeps responses fast and focused.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Loading Strategy:</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Always</Badge>
                <span className="text-muted-foreground">copilot-instructions.md / CLAUDE.md / alwaysApply rules / AGENTS.md</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">By file type</Badge>
                <span className="text-muted-foreground">.instructions.md (applyTo) / .mdc rules (globs)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">On request match</Badge>
                <span className="text-muted-foreground">SKILL.md descriptions in any of the 4 tools — the model decides</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Explicit only</Badge>
                <span className="text-muted-foreground">.agent.md / .prompt.md / .cursor/commands/*.md</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="shrink-0">Lazy</Badge>
                <span className="text-muted-foreground">scripts/, references/, assets/ inside any tool's skill folder — loaded only if the SKILL.md points to them</span>
              </div>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Why This Matters</AlertTitle>
            <AlertDescription className="text-xs">
              <p className="mb-2">Without this discipline, every conversation would need every agent, every skill, and every reference doc loaded up front. That creates:</p>
              <ul className="space-y-1 list-disc list-inside pl-2">
                <li>Token bloat (wasted context window)</li>
                <li>Slower responses (more to process)</li>
                <li>Lower quality (the model distracted by irrelevant info)</li>
                <li>Higher cost (more tokens processed)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            Common Mistake to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Don't invent a shared <code className="bg-muted px-1 rounded">orchestrator.md</code> and expect every tool to read it — none of them will. For skills, you don't even need to adapt formats anymore: author once and place identical copies (or a symlink) at <code className="bg-muted px-1 rounded">.claude/skills/</code> and <code className="bg-muted px-1 rounded">.agents/skills/</code> and all four tools discover it. Always-loaded instructions and custom agents still need their own tool-specific file — keep that <em>content</em> in sync manually.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
