import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FolderTree, FileCode, Braces, Wrench, Info, Lightbulb, Share2 } from 'lucide-react'

interface StructureItem {
  name: string
  desc: string
}

interface StructureGroup {
  name: string
  badge: string
  icon: typeof FileCode
  description: string
  items: StructureItem[]
}

interface ToolStructure {
  id: string
  label: string
  tagline: string
  autoLoaded: string
  groups: StructureGroup[]
  frontmatter: { file: string; fields: string }[]
  crossToolNote?: string
  docsUrl: string
  docsLabel: string
}

const TOOLS: ToolStructure[] = [
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    tagline: 'Auto-loads .github/copilot-instructions.md; since 2026 it also natively discovers Agent Skills, the same SKILL.md format Claude/Cursor/Codex use.',
    autoLoaded: '.github/copilot-instructions.md (repo-wide) + .github/instructions/*.instructions.md (matched by applyTo glob)',
    groups: [
      {
        name: '.github/',
        badge: 'Root config',
        icon: FolderTree,
        description: 'Always-on instructions and path-specific rules live under .github/ at the repo root',
        items: [
          { name: 'copilot-instructions.md', desc: 'Single file, repo-wide, always loaded — plain Markdown, no frontmatter' },
          { name: 'instructions/frontend.instructions.md', desc: 'applyTo: "**/*.tsx,**/*.ts" — auto-applies only to matching files' },
          { name: 'instructions/backend.instructions.md', desc: 'applyTo: "server/**,services/**" — path-specific rules' },
        ],
      },
      {
        name: '.github/skills/',
        badge: 'Agent Skills — native since 2026',
        icon: Wrench,
        description: 'Same SKILL.md format as Claude Code and Codex CLI, discovered automatically — Copilot also checks .claude/skills/ and .agents/skills/',
        items: [
          { name: 'react-components/SKILL.md', desc: '+ references/, assets/ — full folder support, not condensed' },
          { name: 'a11y-automation/SKILL.md', desc: '+ scripts/run-a11y-lint.sh' },
        ],
      },
      {
        name: '.github/agents/',
        badge: 'Custom agents',
        icon: Braces,
        description: 'One flat file per agent — a distinct mechanism from skills, selected explicitly rather than auto-discovered',
        items: [
          { name: 'react-component-builder.agent.md', desc: 'description (required) + name/tools/model/target (optional)' },
          { name: 'pr-reviewer.agent.md', desc: 'Formerly .chatmode.md — that format is deprecated, use .agent.md' },
        ],
      },
      {
        name: '.github/prompts/',
        badge: 'Reusable prompts',
        icon: FileCode,
        description: 'Lightweight single-file alternative to a skill, invoked with /prompt-name — still valid, but skills are the more powerful modern option',
        items: [
          { name: 'react-components.prompt.md', desc: 'No bundled scripts/references/assets folder support' },
        ],
      },
    ],
    frontmatter: [
      { file: '.github/skills/*/SKILL.md', fields: 'name (required, lowercase+hyphens), description (required); optional: license, allowed-tools' },
      { file: '.instructions.md', fields: 'applyTo (required glob), excludeAgent (optional: "code-review" | "cloud-agent")' },
      { file: '.agent.md', fields: 'description (required); name, tools, mcp-servers, model, target (optional)' },
      { file: '.prompt.md', fields: 'none required' },
    ],
    crossToolNote: 'Copilot checks .github/skills/, .claude/skills/, and .agents/skills/ (in that order) for project skills — meaning it can read the exact same skill folder Claude Code or Codex CLI already use, with zero duplication.',
    docsUrl: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills',
    docsLabel: 'GitHub Copilot Agent Skills docs',
  },
  {
    id: 'claude',
    label: 'Claude Code',
    tagline: 'CLAUDE.md is always loaded; agents and skills are discovered automatically from .claude/ — the only tool of the 4 that does NOT also read .agents/skills/.',
    autoLoaded: 'CLAUDE.md (root + any nested CLAUDE.md in subfolders you are working in)',
    groups: [
      {
        name: 'CLAUDE.md',
        badge: 'Always loaded',
        icon: FileCode,
        description: 'Root-level project memory — read at session start',
        items: [
          { name: 'CLAUDE.md', desc: 'Routing tables + core rules; nested CLAUDE.md files add subfolder-specific context' },
        ],
      },
      {
        name: '.claude/agents/',
        badge: 'Subagents — also read by Cursor',
        icon: Braces,
        description: 'One flat file per subagent — Cursor 2.4+ natively discovers this same folder too',
        items: [
          { name: 'react-component-builder.md', desc: 'Frontmatter: name, description, tools, model' },
          { name: 'pr-reviewer.md', desc: 'Invoked via the Agent tool or delegated automatically' },
        ],
      },
      {
        name: '.claude/skills/',
        badge: 'Agent Skills',
        icon: Wrench,
        description: 'One folder per skill — supports scripts/, references/, assets/; Copilot and Cursor also read this path',
        items: [
          { name: 'react-components/SKILL.md', desc: '+ references/a11y-wcag22.md, assets/component-spec.template.md' },
          { name: 'a11y-automation/SKILL.md', desc: '+ scripts/run-a11y-lint.sh — executed, not inlined' },
        ],
      },
    ],
    frontmatter: [
      { file: '.claude/agents/*.md', fields: 'name, description, tools, model' },
      { file: '.claude/skills/*/SKILL.md', fields: 'name, description (recommended); optional: disable-model-invocation, allowed-tools, context: fork, when_to_use, model, effort' },
    ],
    crossToolNote: 'Claude Code only reads .claude/skills/ and .claude/agents/ — it does NOT check .agents/skills/. If a team also uses Codex CLI, keep both .claude/skills/ and .agents/skills/ populated (or symlinked) so every tool finds the content.',
    docsUrl: 'https://code.claude.com/docs/en/skills',
    docsLabel: 'Claude Code skills docs',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    tagline: 'Rules auto-attach by glob; since Cursor 2.4 (2026), Skills and Subagents are natively supported too — and Cursor reads .claude/agents/ and .agents/skills/ directly.',
    autoLoaded: '.cursor/rules/*.mdc with alwaysApply: true, or matching globs for the files you touch',
    groups: [
      {
        name: '.cursor/rules/',
        badge: 'Context',
        icon: FolderTree,
        description: 'One .mdc file per rule — short, always-on or glob-scoped guidelines (not multi-step procedures)',
        items: [
          { name: 'workspace-policy.mdc', desc: 'alwaysApply: true — loaded in every session' },
          { name: 'backend-policy.mdc', desc: 'globs: "server/**,services/**" — auto-attaches only for matching files' },
        ],
      },
      {
        name: '.cursor/skills/',
        badge: 'Agent Skills — native since 2.4',
        icon: Wrench,
        description: 'Same SKILL.md format as Claude/Copilot/Codex — Cursor also reads .agents/skills/ and (legacy) .claude/skills/',
        items: [
          { name: 'react-component-builder/SKILL.md', desc: 'Invoked with /react-component-builder, or auto-discovered' },
          { name: 'react-components/SKILL.md', desc: 'paths: "**/*.tsx,**/*.jsx" — optional glob scoping' },
        ],
      },
      {
        name: '.cursor/commands/',
        badge: 'Explicit actions',
        icon: Braces,
        description: 'One .md file per command — simple one-off actions; skills have mostly superseded this for multi-step procedures',
        items: [
          { name: 'ai-tool-setup.md', desc: 'No frontmatter, no supporting-file folder' },
        ],
      },
    ],
    frontmatter: [
      { file: '.cursor/skills/*/SKILL.md', fields: 'name, description; optional: paths (glob string or list)' },
      { file: '.cursor/rules/*.mdc', fields: 'description, globs, alwaysApply' },
      { file: '.cursor/commands/*.md', fields: 'none' },
    ],
    crossToolNote: 'Cursor natively discovers subagents from .cursor/agents/, .claude/agents/, OR .codex/agents/ (project takes precedence on name clashes) — so it reads Claude Code\'s .claude/agents/ with zero extra files. Skills work the same way via .agents/skills/.',
    docsUrl: 'https://cursor.com/help/customization/skills',
    docsLabel: 'Cursor Skills docs',
  },
  {
    id: 'codex',
    label: 'OpenAI Codex CLI',
    tagline: 'AGENTS.md is always loaded (nearest file wins); every invokable procedure is a "skill" — Codex has no separate agent concept.',
    autoLoaded: 'AGENTS.md at repo root, plus any nearer AGENTS.md between root and your working directory',
    groups: [
      {
        name: 'AGENTS.md',
        badge: 'Always loaded',
        icon: FileCode,
        description: 'Root file + nested overrides — nearest directory wins',
        items: [
          { name: 'AGENTS.md', desc: 'Root: workspace + style policy, routing table to .agents/skills/' },
          { name: 'src/AGENTS.md', desc: 'Nested override: layers frontend-specific rules on top of root' },
        ],
      },
      {
        name: '.agents/skills/',
        badge: 'Skills — the shared cross-tool path',
        icon: Wrench,
        description: 'Every one of the 13 procedures becomes a skill folder — this exact path is also read by Copilot and Cursor',
        items: [
          { name: 'react-component-builder/SKILL.md', desc: 'Same open standard as Claude, same path Copilot/Cursor also check' },
          { name: 'react-components/SKILL.md', desc: '+ references/, assets/ — identical subfolder support to Claude' },
        ],
      },
    ],
    frontmatter: [
      { file: 'AGENTS.md', fields: 'none' },
      { file: '.agents/skills/*/SKILL.md', fields: 'name, description (that\'s the whole spec — no optional fields)' },
    ],
    crossToolNote: '.agents/skills/ is the most cross-compatible skill path of the four: Codex CLI, GitHub Copilot, and Cursor all discover it natively. Only Claude Code needs its own separate .claude/skills/ copy.',
    docsUrl: 'https://developers.openai.com/codex/skills',
    docsLabel: 'OpenAI Codex CLI skills docs',
  },
]

export default function StructureView() {
  const renderGroup = (group: StructureGroup, idx: number) => (
    <Card key={idx} className="bg-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <group.icon className="h-4 w-4 text-primary" />
          <code className="text-sm font-medium">{group.name}</code>
          <Badge variant="secondary" className="text-xs">
            {group.badge}
          </Badge>
        </div>
        <CardDescription className="text-xs">{group.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-1.5">
          {group.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="text-accent mt-1">●</span>
              <div>
                <code className="font-medium text-foreground">{item.name}</code>
                <span className="text-muted-foreground ml-2">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary" />
            Repository Structure
          </CardTitle>
          <CardDescription>
            Verified against each tool's official documentation — every tool has its own always-loaded file, but skills increasingly share discovery paths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-accent/5 border-accent/30">
            <Share2 className="h-4 w-4 text-accent" />
            <AlertTitle>2026 update: skills converged into a real cross-tool standard</AlertTitle>
            <AlertDescription className="text-sm">
              GitHub Copilot and Cursor both added native{' '}
              <a href="https://agentskills.io" target="_blank" rel="noreferrer" className="underline">Agent Skills</a>{' '}
              (SKILL.md) support in 2026 — the same format Claude Code and Codex CLI already used. In practice this means a single{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded">.agents/skills/</code> folder is now read natively by <strong>three</strong> of the four tools (Copilot, Cursor, Codex CLI), and{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded">.claude/skills/</code> is read by <strong>Claude Code, Copilot, and Cursor</strong>. Only Claude Code doesn't check <code className="bg-muted px-1.5 py-0.5 rounded">.agents/skills/</code>, so keeping both paths populated covers every tool. Each tool still has its own always-loaded instructions file (copilot-instructions.md/CLAUDE.md/rules/AGENTS.md) and its own agent format — those have NOT converged.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="copilot" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
              {TOOLS.map((tool) => (
                <TabsTrigger key={tool.id} value={tool.id} className="text-xs">
                  {tool.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {TOOLS.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="space-y-4 mt-6">
                <div className="flex items-start gap-2 mb-4">
                  <Badge variant="outline" className="shrink-0">Auto-loaded</Badge>
                  <span className="text-sm text-muted-foreground">{tool.autoLoaded}</span>
                </div>

                <div className="space-y-4">
                  {tool.groups.map((group, idx) => renderGroup(group, idx))}
                </div>

                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Frontmatter reference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-xs">
                      {tool.frontmatter.map((f, i) => (
                        <div key={i} className="p-2 bg-background rounded">
                          <code className="font-medium text-accent">{f.file}</code>
                          <div className="text-muted-foreground mt-1">{f.fields}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {tool.crossToolNote && (
                  <Alert className="bg-muted/50">
                    <Share2 className="h-4 w-4" />
                    <AlertDescription className="text-sm">{tool.crossToolNote}</AlertDescription>
                  </Alert>
                )}

                <Alert className="bg-accent/5 border-accent/20">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-sm">
                    {tool.tagline}{' '}
                    <a href={tool.docsUrl} target="_blank" rel="noreferrer" className="underline font-medium">
                      {tool.docsLabel} ↗
                    </a>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            ))}
          </Tabs>

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>What still doesn't share</AlertTitle>
            <AlertDescription className="text-sm">
              Always-loaded instructions (<code className="bg-muted px-1 rounded">copilot-instructions.md</code> / <code className="bg-muted px-1 rounded">CLAUDE.md</code> / <code className="bg-muted px-1 rounded">.cursor/rules/</code> / <code className="bg-muted px-1 rounded">AGENTS.md</code>) and Copilot's own <code className="bg-muted px-1 rounded">.agent.md</code> format remain tool-specific — only the on-demand skill layer has converged.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
