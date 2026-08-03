import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Shield,
  Code,
  FileText,
  Copy,
  Check,
  ChevronDown,
  CheckCircle,
  Layers,
  Terminal,
  FolderOpen,
} from 'lucide-react'
import { toast } from 'sonner'

const workspacePolicy = `# Workspace Policy

## Scope Enforcement

The agent operates within a multi-repository workspace structure. Each target project is isolated.

### Project Isolation Rules

1. Identify the target project folder before making any changes.
2. Restrict all file operations to that folder and its descendants.
3. Never traverse upward beyond the target project root.
4. Never modify files in sibling projects unless explicitly instructed.

### Exclusion Patterns

Ignore the following directories during analysis and modification:

- \`node_modules/\`
- \`dist/\`, \`build/\`, \`out/\`
- \`.next/\`, \`.nuxt/\`, \`.vite/\`
- \`coverage/\`, \`.nyc_output/\`
- \`.venv/\`, \`venv/\`, \`__pycache__/\`
- \`target/\` (Java)
- \`.git/\`, \`.svn/\`
- \`*.log\`, \`*.tmp\`

### Target Folder Selection Protocol

1. If a specific folder path is provided, validate it exists.
2. If working from a file path, extract the project root by locating:
   - \`package.json\` (Node/JavaScript)
   - \`pom.xml\` or \`build.gradle\` (Java)
   - \`pyproject.toml\` or \`setup.py\` (Python)
   - \`.git/\` as fallback
3. If ambiguous, request explicit clarification before proceeding.
4. Store the resolved target root for the session.

### Cross-Folder Refactor Prohibition

Do NOT perform changes across multiple project folders unless:
- Explicitly requested by the user.
- A workspace-level coordination task is clearly specified.

Default behavior: operate on a single project at a time.`

const frontendPolicy = `# Frontend Policy

## Technology Stack

Primary focus: React + TypeScript applications.

## Core Principles

1. Component-driven architecture with clear boundaries.
2. Type safety enforced at compile time.
3. Accessibility as a first-class requirement.
4. Performance considerations in rendering and bundling.

## React + TypeScript Standards

### Component Structure
- Use functional components with hooks.
- Define explicit TypeScript interfaces for props.
- Co-locate types with components when project-specific.
- Extract shared types to dedicated type definition files.

### State Management
- Use \`useState\` for local component state.
- Use \`useReducer\` for complex state logic.
- Lift state only when necessary.
- Consider context for cross-cutting concerns.

### Effect Management
- Use \`useEffect\` with explicit dependency arrays.
- Clean up side effects (subscriptions, timers, listeners).
- Avoid effects for derived state; use \`useMemo\` or direct computation.

### Event Handlers
- Prefix handler functions with \`handle\` (e.g., \`handleClick\`).
- Type event parameters explicitly (e.g., \`React.MouseEvent<HTMLButtonElement>\`).

## Accessibility Policy

All frontend code must meet WCAG 2.2 Level AA standards.

### Requirements Summary
- Semantic HTML as foundation.
- Keyboard navigation support (Tab, Enter, Escape, Arrow keys).
- Valid ARIA usage (roles, states, properties).
- Focus management for dynamic content and modals.
- Perceivable contrast ratios (4.5:1 for normal text, 3:1 for large text).
- Reduced motion support via \`prefers-reduced-motion\`.

### Tooling Assumptions
- \`eslint-plugin-jsx-a11y\` configured and enforced.
- \`@axe-core/react\` or equivalent for runtime checks in development.
- Manual keyboard testing required for interactive components.

### Testing with Jest + React Testing Library
- Use \`@testing-library/react\` for component tests
- Use \`jest-axe\` for automated accessibility testing
- Include \`toHaveNoViolations()\` matcher in component tests
- Test keyboard navigation and focus management`

const backendPolicy = `# Backend Policy

## Multi-Language Support

This playbook supports backend development in multiple ecosystems. Follow the conventions specific to each language and framework.

## Node.js / TypeScript

### Project Structure
- Use clear separation: routes, controllers, services, models.
- Configuration via environment variables.
- Centralized error handling middleware.

### TypeScript Patterns
- Strict mode enabled.
- Explicit return types for public functions.
- Avoid \`any\`; use \`unknown\` or proper types.

### Nest.js Conventions
- Module-based organization.
- Dependency injection via decorators.
- DTOs for request/response validation.

## Java

### Maven / Gradle Projects
- Standard directory structure: \`src/main/java\`, \`src/test/java\`.
- Lombok for boilerplate reduction (if present).

### Spring Boot Patterns
- Controller/Service/Repository layering.
- Spring annotations for dependency injection.

## Python

### Project Structure
- \`pyproject.toml\` for modern projects.
- Virtual environment (\`venv/\`, \`.venv/\`) isolation.

### FastAPI / Django Patterns
- Router-based organization; Pydantic models for validation (FastAPI).
- App-based modular structure; Django ORM patterns (Django).

## General Backend Rules

- Return meaningful error messages with appropriate HTTP status codes.
- Validate all inputs at entry points.
- Never log sensitive data (passwords, tokens, keys).
- Use parameterized queries to prevent SQL injection.
- Unit tests for business logic, integration tests for API endpoints.`

const outputStylePolicy = `# Output Style Guidelines

## Minimal Diffs

Produce the smallest possible changeset to accomplish the task.

1. Modify only the lines necessary to implement the feature or fix.
2. Do not reformat unrelated code.
3. Do not reorganize imports unless required for the change.
4. Do not rename variables or functions outside the scope of the task.

Exception: if the user explicitly requests refactoring or cleanup, broader changes are acceptable.

## Path References

All file paths in output must be relative to the target project root, use forward slashes, and omit a leading \`./\` unless semantically required.

## No Mass Reformatting

Do NOT apply automatic code formatters (Prettier, Black, gofmt) unless the project has a pre-commit hook configured or the user explicitly requests it. Preserve the existing code style of the target file.

## No Unrelated Refactors

Do not extract functions "for cleanliness," split files, or introduce design patterns unless the change actually demands it.

## Verification Commands

After proposing changes, suggest the specific commands relevant to the project's tooling:
- Linting: \`npm run lint\`, \`eslint src/\`, \`pylint module/\`
- Type checking: \`tsc --noEmit\`, \`mypy .\`
- Tests: \`npm test\`, \`pytest\`, \`mvn test\`
- Build: \`npm run build\`, \`gradle build\`, \`python -m build\`

## Plan vs. Direct Fix

Plan first (approach, files to modify, high-level steps) for multi-file or architectural changes. Fix directly for single-file bugs, typos, or small utility additions.`

interface PolicyDef {
  id: string
  name: string
  description: string
  icon: typeof Shield
  color: string
  bgColor: string
  content: string
  keyPoints: string[]
}

const POLICIES: PolicyDef[] = [
  {
    id: 'workspace',
    name: 'Workspace Policy',
    description: 'Project isolation, scope enforcement, and multi-repo workspace rules',
    icon: Layers,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    content: workspacePolicy,
    keyPoints: ['Multi-repository workspace support', 'Project isolation and scope enforcement', 'Exclusion patterns for build artifacts'],
  },
  {
    id: 'frontend',
    name: 'Frontend Policy',
    description: 'React, TypeScript, accessibility, and testing standards',
    icon: Code,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    content: frontendPolicy,
    keyPoints: ['React + TypeScript best practices', 'WCAG 2.2 Level AA accessibility requirements', 'Testing with jest-axe and React Testing Library'],
  },
  {
    id: 'backend',
    name: 'Backend Policy',
    description: 'Multi-language backend guidelines (Node, Java, Python)',
    icon: Terminal,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    content: backendPolicy,
    keyPoints: ['Node.js/TypeScript and Nest.js patterns', 'Java Spring Boot & Python FastAPI/Django patterns', 'Security best practices (OWASP)'],
  },
  {
    id: 'output',
    name: 'Output Style',
    description: 'How to format responses, diffs, and verification commands',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    content: outputStylePolicy,
    keyPoints: ['Minimal diffs — smallest possible changesets', 'Relative path references with forward slashes', 'Include verification commands'],
  },
]

interface ToolInfo {
  id: string
  label: string
  realTerm: string
  realTermExplain: string
  locations: Record<string, { file: string; note: string }>
}

const TOOLS: ToolInfo[] = [
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    realTerm: 'Instructions',
    realTermExplain: 'Copilot never calls this "rules" — its docs and UI call it "custom instructions."',
    locations: {
      workspace: { file: '.github/copilot-instructions.md', note: 'merged with Output Style, always loaded' },
      output: { file: '.github/copilot-instructions.md', note: 'merged with Workspace Policy, always loaded' },
      frontend: { file: '.github/instructions/frontend.instructions.md', note: 'applyTo: "**/*.tsx,**/*.ts"' },
      backend: { file: '.github/instructions/backend.instructions.md', note: 'applyTo: "server/**,services/**"' },
    },
  },
  {
    id: 'claude',
    label: 'Claude Code',
    realTerm: 'CLAUDE.md',
    realTermExplain: 'Claude doesn\'t use the word "rules" either — everything always-loaded lives in one memory file.',
    locations: {
      workspace: { file: 'CLAUDE.md', note: 'read in full at session start' },
      output: { file: 'CLAUDE.md', note: 'read in full at session start' },
      frontend: { file: 'CLAUDE.md', note: 'read in full at session start' },
      backend: { file: 'CLAUDE.md', note: 'read in full at session start' },
    },
  },
  {
    id: 'cursor',
    label: 'Cursor',
    realTerm: 'Rules',
    realTermExplain: 'The only one of the four that genuinely calls this "rules" in its own docs and file path.',
    locations: {
      workspace: { file: '.cursor/rules/workspace-policy.mdc', note: 'alwaysApply: true' },
      output: { file: '.cursor/rules/style-output.mdc', note: 'alwaysApply: true' },
      frontend: { file: '.cursor/rules/frontend-policy.mdc', note: 'globs: "**/*.tsx,**/*.ts"' },
      backend: { file: '.cursor/rules/backend-policy.mdc', note: 'globs: "server/**,services/**"' },
    },
  },
  {
    id: 'codex',
    label: 'OpenAI Codex CLI',
    realTerm: 'AGENTS.md',
    realTermExplain: 'No "rules" concept — one instructions file per directory, nearest wins.',
    locations: {
      workspace: { file: 'AGENTS.md', note: 'root, always loaded' },
      output: { file: 'AGENTS.md', note: 'root, always loaded' },
      frontend: { file: 'src/AGENTS.md', note: 'nested override — layers on top of root' },
      backend: { file: 'AGENTS.md', note: 'root (no dedicated nested override in this example)' },
    },
  },
]

export default function PolicyRulesGuide() {
  const [copiedContent, setCopiedContent] = useState<string | null>(null)
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState('copilot')

  const copyToClipboard = (content: string, policyName: string) => {
    navigator.clipboard.writeText(content)
    setCopiedContent(policyName)
    toast.success(`${policyName} copied to clipboard!`)
    setTimeout(() => setCopiedContent(null), 2000)
  }

  const tool = TOOLS.find((t) => t.id === activeTool) ?? TOOLS[0]

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Always-Loaded Policies
          </CardTitle>
          <CardDescription>
            Every tool calls this something different — pick yours to see its real name, real file, and where each policy lives in it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTool} onValueChange={setActiveTool} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {TOOLS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs">{t.label}</TabsTrigger>
              ))}
            </TabsList>
            {TOOLS.map((t) => (
              <TabsContent key={t.id} value={t.id} className="mt-4">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {t.label} calls this <Badge variant="outline">{t.realTerm}</Badge>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{t.realTermExplain}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {POLICIES.map((policy) => {
          const Icon = policy.icon
          const isExpanded = expandedPolicy === policy.id
          const isCopied = copiedContent === policy.name
          const location = tool.locations[policy.id]

          return (
            <Card key={policy.id} className="border-l-4" style={{ borderLeftColor: `var(--color-${policy.color.split('-')[1]})` }}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`h-10 w-10 rounded-lg ${policy.bgColor} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-5 w-5 ${policy.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg">{policy.name}</CardTitle>
                      <CardDescription className="mt-1">{policy.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(policy.content, policy.name)}
                    className="shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-xs bg-muted/40 px-3 py-2 rounded">
                  <FolderOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground">In {tool.label}:</span>
                  <code className="text-accent">{location.file}</code>
                  <span className="text-muted-foreground">— {location.note}</span>
                </div>

                <div className="grid gap-1.5">
                  {policy.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{point}</span>
                    </div>
                  ))}
                </div>

                <Collapsible
                  open={isExpanded}
                  onOpenChange={(open) => setExpandedPolicy(open ? policy.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span className="text-xs font-medium">
                        {isExpanded ? 'Hide' : 'View'} Full Policy Content
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <ScrollArea className="h-[350px] w-full rounded-lg border bg-muted/50">
                      <pre className="p-4 text-xs font-mono leading-relaxed whitespace-pre-wrap">
                        {policy.content}
                      </pre>
                    </ScrollArea>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
