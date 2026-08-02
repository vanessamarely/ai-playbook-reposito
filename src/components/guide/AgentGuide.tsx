import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Workflow, Play, CheckCircle, Boxes, Copy, Check, FileText, ChevronDown, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ToolPath {
  tool: string
  path: string
  note?: string
}

export default function AgentGuide() {
  const [copiedAgent, setCopiedAgent] = useState<string | null>(null)
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  const copyToClipboard = (content: string, agentName: string) => {
    navigator.clipboard.writeText(content)
    setCopiedAgent(agentName)
    toast.success(`${agentName} agent copied to clipboard!`)
    setTimeout(() => setCopiedAgent(null), 2000)
  }

  const pathsFor = (name: string): ToolPath[] => [
    { tool: 'Claude Code', path: `.claude/agents/${name}.md`, note: 'Cursor reads this file directly too' },
    { tool: 'GitHub Copilot', path: `.github/agents/${name}.agent.md` },
    { tool: 'Cursor', path: `.cursor/commands/${name}.md`, note: 'optional — Cursor already auto-discovers .claude/agents/' },
    { tool: 'Codex CLI', path: `.agents/skills/${name}/SKILL.md` },
  ]

  const agents = [
    {
      name: 'scan-workspace',
      purpose: 'Detect project type and route to appropriate skills',
      badge: 'Entry Point',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      when: 'Starting work in a new workspace or unknown project',
      steps: [
        'Run project-detect.mjs tool on target folder',
        'Identify framework, language, and tooling',
        'Route to appropriate skill(s) based on detection',
        'Enforce scope using scope-guard.mjs',
      ],
      tools: ['project-detect.mjs', 'scope-guard.mjs'],
      skills: ['Any skill based on detection results'],
      markdown: `---
name: scan-workspace
description: Scan a workspace folder to detect project type and route to appropriate skills and AI tool configurations
tools: Read, Bash, Grep, Glob
---

# Scan Workspace Agent

## Purpose

Identify the project type within a target folder, determine which skills apply, and verify that AI tool instruction files (GitHub Copilot, Claude, Cursor, Codex) are present and up to date.

## Inputs

- \`targetFolder\`: Absolute or relative path to the project root.

## Outputs

- JSON structure containing:
  - \`projectType\`: Detected type (e.g., \`react\`, \`node-service\`, \`java-spring\`, \`python-fastapi\`).
  - \`skills\`: List of applicable skill identifiers.
  - \`aiTools\`: Status of AI instruction files present in the project.
  - \`warnings\`: Any issues detected (missing dependencies, inconsistent configuration, missing AI tool files).

## Procedure

### Step 1: Validate Target Folder

1. Verify the folder exists.
2. Check read permissions.
3. If validation fails, output error and exit.

### Step 2: Run Project Detection

Execute: \`node tools/project-detect.mjs <targetFolder>\`

Expected output: JSON with project metadata.

### Step 3: Parse Detection Results

Extract \`projectType\`, \`framework\`, \`language\`, and configuration file paths.

### Step 4: Map to Skills

| Project Type       | Skills                                                  |
|--------------------|---------------------------------------------------------|
| \`react\`            | \`react-components\`, \`a11y-automation\`                   |
| \`node-typescript\`  | \`node-typescript-service\`                               |
| \`unknown\`          | Fallback to manual inspection                           |

### Step 5: Check AI Tool Instruction Files

For each AI tool, verify the always-loaded file exists in \`targetFolder\`:

| AI Tool | File |
|---|---|
| GitHub Copilot | \`.github/copilot-instructions.md\` |
| Claude Code | \`CLAUDE.md\` |
| Cursor | \`.cursor/rules/*.mdc\` (an \`alwaysApply: true\` rule) |
| Codex CLI | \`AGENTS.md\` |

### Step 6: Apply Scope Guard

Execute: \`node tools/scope-guard.mjs <targetFolder>\`

### Step 7: Output Recommendations

\`\`\`json
{
  "projectType": "react",
  "framework": "vite",
  "language": "typescript",
  "skills": ["react-components", "a11y-automation"],
  "policies": ["../policies/workspace-policy.md", "../policies/frontend-policy.md"],
  "aiTools": {
    "copilot": { "present": true, "path": ".github/copilot-instructions.md" },
    "claude":  { "present": true, "path": "CLAUDE.md" },
    "cursor":  { "present": false, "path": ".cursor/rules/workspace-policy.mdc" },
    "codex":   { "present": false, "path": "AGENTS.md" }
  },
  "warnings": ["WARNING: AGENTS.md not found. Run the ai-tool-setup skill to generate it."]
}
\`\`\`

## Error Handling

- **Folder not found**: Output clear error message with the attempted path.
- **Detection script failure**: Output stderr from \`project-detect.mjs\`.
- **Missing AI tool files**: Include in warnings; suggest running \`ai-tool-setup\`.`,
    },
    {
      name: 'react-component-builder',
      purpose: 'Build accessible React components with proper structure',
      badge: 'Frontend',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      when: 'Creating new React components',
      steps: [
        'Load react-components skill',
        'Reference a11y-wcag22.md for accessibility requirements',
        'Generate component with proper TypeScript types',
        'Include keyboard support and ARIA attributes',
        'Suggest tests using React Testing Library + jest-axe',
      ],
      tools: [],
      skills: ['react-components', 'a11y-automation'],
      markdown: `---
name: react-component-builder
description: Build accessible React components following TypeScript and WCAG 2.2 standards
tools: Read, Write, Edit, Bash, Grep, Glob
---

# React Component Builder Agent

## Purpose

Create or modify React components with TypeScript, ensuring accessibility compliance and adherence to project conventions.

## Inputs

- \`componentName\`: Name of the component (PascalCase).
- \`specification\`: Component behavior, props, and requirements.
- \`targetFolder\`: Location within the project for the new component.

## Outputs

- Component file (\`.tsx\`).
- Optional: associated test file, Storybook story, or style file.
- Verification command suggestions.

## Procedure

### Step 1: Validate Inputs

1. Ensure \`componentName\` follows PascalCase convention.
2. Verify \`targetFolder\` exists and is within project scope.
3. Check for naming conflicts with existing components.

### Step 2: Load Skill

Read: \`.claude/skills/react-components/SKILL.md\`

### Step 3: Generate Component Structure

1. Create the component file at \`<targetFolder>/<componentName>.tsx\`.
2. Define TypeScript interface for props with explicit types.
3. Implement the component with semantic HTML.
4. Add accessibility attributes (ARIA roles, labels, keyboard handlers).
5. Use explicit return type; avoid \`any\`.

Refer to: \`.claude/skills/react-components/references/a11y-wcag22.md\`

### Step 4: Apply Project-Specific Overrides

Follow the target project's existing style and conventions (its own \`CLAUDE.md\`/\`.github/copilot-instructions.md\` take precedence over this playbook's defaults).

### Step 5: Validate Accessibility

Check semantic HTML, keyboard handlers, focus management, and valid ARIA usage.

### Step 6: Error Handling and Edge Cases

Use an \`AsyncState\` discriminated union for async data, add error boundaries, handle loading states with ARIA announcements.

### Step 7: Generate Test File (Required)

Create \`<componentName>.test.tsx\` with a rendering test and a \`jest-axe\` accessibility test.

### Step 8: Output Summary

Provide file paths, TypeScript patterns used, accessibility features implemented, and verification commands (\`npm run lint\`, \`npm test -- <componentName>\`, \`npm run type-check\`).

## Error Handling

- **Component already exists**: Notify and ask if modification or overwrite is intended.
- **Invalid props specification**: Request clarification on expected types.
- **Missing dependencies**: Suggest installing required packages.`,
    },
    {
      name: 'figma-component-builder',
      purpose: 'Convert Figma designs into project-ready React/TypeScript components',
      badge: 'Design-to-Code',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      when: 'Implementing UI from Figma nodes or screenshots',
      steps: [
        'Confirm scope, destination folder, component library, and client context from prompt',
        'Fetch design context from Figma MCP using figma_url or fileKey/nodeId',
        'If Figma access fails, use attached screenshot or request screenshot from user',
        'Map to existing reusable components before creating new primitives',
        'Apply minimal, reviewable edits and run Chrome MCP accessibility checks',
      ],
      tools: ['Figma MCP', 'Chrome MCP'],
      skills: ['figma-component', 'a11y-automation'],
      markdown: `---
name: figma-component-builder
description: Convert Figma designs into React/TypeScript components (or screenshot-driven fallback), then verify them with Chrome MCP visual and accessibility checks. Use when a user wants a Figma design turned into working component code.
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Agent: figma-component-builder

## Purpose

Automate conversion of Figma designs into React/TypeScript components and supporting artifacts for the selected project scope, using the Figma MCP server for design context and the Chrome MCP server to verify accessibility.

## Required initial prompt context

- \`scope\` (required): target project folder under workspace root.
- \`destination_folder\` (required): exact destination folder for generated component files.
- \`component_library\` (required): preferred reusable component library, or \`none\`.
- \`client_context\` (required): project-specific coding conventions.
- \`figma_url\` or \`{fileKey,nodeId}\` (required unless \`screenshot_image\` is supplied instead).

Optional: \`screenshot_image\`, \`dev_url\`, \`create_mode\` (\`preview\`|\`apply\`), \`preferences\`.

## Operational rules

1. **Scope isolation** — treat each top-level folder as an independent project; confirm \`scope\` before editing.
2. **Safety** — never edit \`node_modules/\`, \`dist/\`, \`build/\`, \`.git/\`, \`.github/workflows/\`.
3. **Minimal diffs** — prefer focused, reviewable edits (1-3 files).
4. **Reuse first** — search \`component_library\` for existing components before creating new primitives.
5. **Tests & stories** — only create \`.test.tsx\`/\`.stories.tsx\` if Jest/Storybook are already configured.
6. **Chrome MCP accessibility checks are mandatory** after every component creation or modification: inject axe-core, run WCAG 2.2 AA checks, report violations by impact level, and do not mark the task complete until violations are fixed.
7. **Figma fallback** — if the Figma MCP server is unavailable, use \`screenshot_image\`; if neither is available, ask the user for one.

## Outputs

1. Human-readable plan of changes.
2. Applied edits (or a preview, depending on \`create_mode\`).
3. Chrome MCP accessibility report: \`{violations, passes, incomplete}\` + remediation steps.
4. Short verification checklist.

## Security

Never attempt to exfiltrate credentials. If a Figma or Chrome MCP token is required, ask the user to provide it via environment variables — never embed secrets in output.

## When to escalate

- Refactors affecting exported types used by other projects.
- Dev server unreachable or Chrome MCP can't connect.
- Ambiguous interaction rules or missing design assets.

## Related skills

Use the \`figma-component\` skill for design→code conventions: \`.claude/skills/figma-component/SKILL.md\`.`,
    },
    {
      name: 'a11y-audit-react',
      purpose: 'Audit React components for WCAG 2.2 accessibility compliance',
      badge: 'Audit',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      when: 'Reviewing existing components for accessibility issues',
      steps: [
        'Load a11y-automation skill',
        'Run automated checks (jest-axe, eslint jsx-a11y)',
        'Validate keyboard navigation patterns',
        'Check ARIA usage and semantic HTML',
      ],
      tools: ['run-a11y-lint.sh', 'run-axe-playwright.mjs'],
      skills: ['a11y-automation'],
      markdown: `---
name: a11y-audit-react
description: Audit React components for WCAG 2.2 compliance and suggest fixes. Use for accessibility audits of React/TypeScript component files or directories.
tools: Read, Grep, Glob, Bash
---

# Accessibility Audit Agent (React)

## Purpose

Identify accessibility violations in React components and provide actionable remediation steps aligned with WCAG 2.2 Level AA.

## Inputs

- \`targetPath\`: Path to component file(s) or directory to audit.
- \`auditScope\`: \`single-file\`, \`directory\`, or \`full-project\`.

## Outputs

- Summary of violations with severity (critical, serious, moderate, minor).
- Actionable code fixes with minimal diffs.
- Verification commands to test changes.

## Procedure

### Step 1: Validate Scope

Verify \`targetPath\` exists and filter for \`.tsx\`/\`.jsx\` files based on \`auditScope\`.

### Step 2: Run Automated Lint

Execute: \`.claude/skills/a11y-automation/scripts/run-a11y-lint.sh <targetPath>\`

### Step 3: Load WCAG Guidelines

Read: \`.claude/skills/react-components/references/a11y-wcag22.md\`

### Step 4: Analyze Each Component

Check semantic HTML, keyboard navigation, ARIA usage, focus management, and contrast/motion.

### Step 5: Categorize Violations

Critical / Serious / Moderate / Minor.

### Step 6: Summarize Findings

Summary statistics, per-file breakdown with line numbers.

### Step 7: Propose Fixes

Show the problematic snippet, the corrected version, and the accessibility benefit — apply with minimal diffs.

### Step 8: Suggest Automated Tests

If Playwright is available, reference \`.claude/skills/a11y-automation/scripts/run-axe-playwright.mjs\`.

## Error Handling

- **No React files found**: Notify and exit.
- **Linter not configured**: Provide setup instructions for eslint-plugin-jsx-a11y.
- **Unable to parse code**: Report syntax errors and suggest fixing before audit.`,
    },
    {
      name: 'node-microservice-builder',
      purpose: 'Create Node.js/TypeScript backend services',
      badge: 'Backend',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      when: 'Building new API endpoints or microservices',
      steps: [
        'Load node-typescript-service skill',
        'Generate service structure with proper error handling',
        'Include validation and type safety',
        'Follow ecosystem conventions (Nest, Express, etc.)',
        'Suggest appropriate tests',
      ],
      tools: [],
      skills: ['node-typescript-service'],
      markdown: `---
name: node-microservice-builder
description: Scaffold or extend Node.js/TypeScript microservices with validation, error handling, and testing
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Node Microservice Builder Agent

## Purpose

Create or modify Node.js/TypeScript microservice endpoints following backend conventions and best practices.

## Inputs

- \`serviceName\`, \`endpointSpec\`, \`targetFolder\`.

## Outputs

- Controller/route handler file, validation schemas, test file, updated routing.

## Procedure

### Step 1: Validate Inputs

Confirm \`targetFolder\` is a valid Node.js/TypeScript project.

### Step 2: Load Skill

Read: \`.claude/skills/node-typescript-service/SKILL.md\`

### Step 3: Detect Framework

Express / Nest.js / Fastify, from \`package.json\` dependencies.

### Step 4: Generate Endpoint Handler

Typed handler with request validation and consistent HTTP status codes.

### Step 5: Add Validation Schema

Refer to: \`.claude/skills/node-typescript-service/references/validation-and-errors.md\` — Zod/Joi/class-validator, explicit types, no \`any\`.

### Step 6: Implement Error Handling

Result-type pattern in the service layer, custom error classes, structured error responses mapped to HTTP status codes.

### Step 7: Generate Tests

Unit tests for business logic, integration tests for the HTTP endpoint (supertest or equivalent).

### Step 8: Update Routing

Register the endpoint; verify no route conflicts.

### Step 9: Output Summary

File paths, TypeScript patterns used, verification commands (\`npm run lint\`, \`npm test -- <serviceName>\`, \`npm run build\`).

## Error Handling

- **Framework mismatch**: clarify before proceeding.
- **Missing validation library**: suggest installing one.
- **Route conflict**: notify and suggest an alternative.`,
    },
    {
      name: 'pr-reviewer',
      purpose: 'Review pull requests for code quality and standards',
      badge: 'Quality',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      when: 'Reviewing code changes before merge',
      steps: [
        'Check changed files against scope rules',
        'Validate against workspace policy',
        'Check frontend/backend specific conventions',
        'Check AI tool instruction files stayed in sync',
        'Provide actionable feedback in chat',
      ],
      tools: ['scope-guard.mjs', 'project-detect.mjs'],
      skills: ['Depends on file types being reviewed'],
      markdown: `---
name: pr-reviewer
description: Review pull requests for code quality, security, tests, policy compliance, and AI tool instruction consistency
tools: Read, Bash, Grep, Glob
---

# Pull Request Reviewer Agent

## Purpose

Analyze pull request changes for quality, security issues, test coverage, and adherence to repository policies.

## Inputs

- \`diffFile\`: Path to git diff or list of changed files.
- \`projectRoot\`: Root directory of the target project.

## Procedure

### Step 1: Parse Diff

Extract modified/added/deleted files, file types, scope of change.

### Step 2: Run Scope Guard

Execute: \`node tools/scope-guard.mjs <projectRoot> <changedFiles>\`

### Step 3: Detect Project Type

Execute: \`node tools/project-detect.mjs <projectRoot>\`

### Step 4: Load Relevant Policies

Always \`../policies/workspace-policy.md\`; \`frontend-policy.md\`/\`backend-policy.md\` as applicable.

### Step 5: Code Quality Check

Style consistency, type safety, error handling, security (hardcoded secrets, injection risks), performance.

### Step 6: Accessibility Check (Frontend Only)

Read \`.claude/skills/react-components/references/a11y-wcag22.md\`; check semantic HTML, ARIA labels, keyboard handlers.

### Step 7: Test Coverage Check

Flag new functionality without corresponding tests.

### Step 8: AI Tool Instruction Check

If the PR touches this playbook's agents/skills/policies: verify \`.github/copilot-instructions.md\`, \`CLAUDE.md\`, \`.cursor/rules/\`, and \`AGENTS.md\` are all still consistent with the routing table, and suggest running \`ai-tool-setup\` if any is stale.

### Step 9-11: Documentation, Summarize, Generate Review

Categorize findings as Blocking / Required / Recommended / Nitpick, then produce the review with an overall recommendation.

## Error Handling

- **Diff parsing failure**: request valid git diff format.
- **Project detection failure**: ask for explicit project type.
- **Policy file missing**: proceed with general best practices only.`,
    },
    {
      name: 'code-reviewer',
      purpose: 'Review code files for quality, security, and best practices',
      badge: 'Review',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      when: 'Analyzing code for improvements and potential issues',
      steps: [
        'Detect programming language and framework',
        'Analyze for critical issues, performance, and best practices',
        'Check accessibility (frontend) and security patterns',
        'Provide line-by-line feedback with specific suggestions',
        'Output categorized review summary in chat',
      ],
      tools: [],
      skills: ['react-components', 'node-typescript-service', 'a11y-automation'],
      markdown: `---
name: code-reviewer
description: Senior code reviewer that evaluates changes across five dimensions — correctness, readability, architecture, security, and performance. Use for thorough code review before merge.
tools: Read, Grep, Glob
---

# Senior Code Reviewer

## Purpose

Act as an experienced Staff Engineer performing a thorough code review. Evaluate proposed changes across a focused framework and produce actionable, categorized feedback.

## Review Framework

Evaluate every change across five dimensions: **Correctness**, **Readability**, **Architecture**, **Security**, **Performance**.

## Output Format

Categorize every finding as **Critical** (must fix before merge), **Important** (should fix before merge), or **Suggestion**.

\`\`\`markdown
## Review Summary
**Verdict:** APPROVE | REQUEST CHANGES
**Overview:** [1-2 sentences]

### Critical Issues
- [File:line] [Description and recommended fix]

### Important Issues
- [File:line] [Description and recommended fix]

### Suggestions
- [File:line] [Description]

### What's Done Well
- [Positive observation]

### Verification Story
- Tests reviewed / Build verified / Security checked
\`\`\`

## Rules

1. Always review the tests first — they reveal intent and coverage.
2. Read the spec or task description before reviewing code.
3. Every Critical and Important finding needs a specific fix recommendation.
4. Never approve code with Critical issues.
5. Always acknowledge what's done well.

## Framework-Specific Checks

React/TypeScript (hooks, composition, props types, a11y), Node.js/Express (validation, error middleware, security headers), and language-appropriate checks for Python/Java.

## Related Skills

- \`.claude/skills/react-components/SKILL.md\`
- \`.claude/skills/node-typescript-service/SKILL.md\`
- \`.claude/skills/a11y-automation/SKILL.md\`

## References

- \`../policies/frontend-policy.md\`
- \`../policies/backend-policy.md\`
- \`../policies/style-output.md\``,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-primary" />
            What are Agents?
          </CardTitle>
          <CardDescription>
            Agents coordinate multi-step tasks. Claude Code and GitHub Copilot each have a dedicated agent file format; Codex CLI has
            no separate agent concept (it's just another skill). Cursor has its own subagent format too, but — as of Cursor 2.4 (2026) —
            it also natively discovers subagents straight from <code className="bg-muted px-1 rounded">.claude/agents/</code>, so a
            Claude Code agent works in Cursor with no extra file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
            <p className="font-medium">Key characteristics:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Coordinate multiple skills in sequence or parallel</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Load detailed context only when needed (JiT loading)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Execute deterministic tools for validation and detection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Enforce workspace policies and scope boundaries</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {agents.map((agent, idx) => (
          <Card key={idx} className="border-l-4" style={{ borderLeftColor: agent.color.replace('text-', '') }}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-base font-bold">{agent.name}</code>
                    <Badge className={agent.bgColor + ' ' + agent.color} variant="secondary">
                      {agent.badge}
                    </Badge>
                  </div>
                  <CardDescription>{agent.purpose}</CardDescription>
                </div>
                <Workflow className={'h-8 w-8 shrink-0 ' + agent.color} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-1.5">
                {pathsFor(agent.name).map((p) => (
                  <div key={p.tool} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded">
                    <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-medium text-foreground shrink-0">{p.tool}:</span>
                    <code className="truncate">{p.path}</code>
                    {p.note && <span className="text-[10px] italic shrink-0">({p.note})</span>}
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold">When to use</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{agent.when}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold">Execution steps</span>
                </div>
                <ol className="text-sm space-y-1 ml-6 list-decimal list-inside">
                  {agent.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-foreground/80">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {agent.tools.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">TOOLS USED</p>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.tools.map((tool, toolIdx) => (
                        <code key={toolIdx} className="text-xs bg-background px-2 py-1 rounded">
                          {tool}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">SKILLS INVOKED</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.skills.map((skill, skillIdx) => (
                      <Badge key={skillIdx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Collapsible
                open={expandedAgent === agent.name}
                onOpenChange={() => setExpandedAgent(expandedAgent === agent.name ? null : agent.name)}
              >
                <div className="flex items-center justify-between gap-2 pt-2 border-t">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Full .claude/agents/{agent.name}.md
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedAgent === agent.name ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(agent.markdown, agent.name)}
                    className="flex items-center gap-2"
                  >
                    {copiedAgent === agent.name ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Agent
                      </>
                    )}
                  </Button>
                </div>
                <CollapsibleContent>
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Shown in Claude Code's format (the richest of the four). See the Structure tab for how the same
                      procedure is adapted to Copilot's <code className="bg-muted px-1 rounded">.agent.md</code>, Cursor's{' '}
                      <code className="bg-muted px-1 rounded">.cursor/commands/*.md</code>, and Codex's{' '}
                      <code className="bg-muted px-1 rounded">.agents/skills/*/SKILL.md</code>.
                    </p>
                    <ScrollArea className="h-96 w-full rounded-lg border bg-muted/30">
                      <pre className="p-4 text-xs font-mono whitespace-pre-wrap">
                        {agent.markdown}
                      </pre>
                    </ScrollArea>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Boxes className="h-5 w-5 text-accent" />
            Agent File Format, By Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg font-mono text-xs space-y-3">
            <div>
              <p className="text-muted-foreground">Claude Code — .claude/agents/&lt;name&gt;.md:</p>
              <pre className="text-foreground mt-1">
{`---
name: agent-name
description: What it does and when to use it
tools: Read, Write, Edit, Bash, Grep, Glob
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">GitHub Copilot — .github/agents/&lt;name&gt;.agent.md:</p>
              <pre className="text-foreground mt-1">
{`---
description: Required — what it does and when to use it
name: agent-name
tools: ["read", "edit", "search"]
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">Cursor — reads .claude/agents/&lt;name&gt;.md directly (same frontmatter as Claude Code, no copy needed), or its own .cursor/agents/&lt;name&gt;.md. .cursor/commands/&lt;name&gt;.md remains available for simple explicit /name actions with no frontmatter.</p>
            </div>
            <div>
              <p className="text-muted-foreground">Codex CLI — .agents/skills/&lt;name&gt;/SKILL.md:</p>
              <pre className="text-foreground mt-1">
{`---
name: agent-name
description: What it does and when to use it
---`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
