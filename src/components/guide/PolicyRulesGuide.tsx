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
  AlertTriangle,
  CheckCircle,
  Layers,
  Terminal
} from 'lucide-react'
import { toast } from 'sonner'

export default function PolicyRulesGuide() {
  const [copiedContent, setCopiedContent] = useState<string | null>(null)
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null)

  const copyToClipboard = (content: string, policyName: string) => {
    navigator.clipboard.writeText(content)
    setCopiedContent(policyName)
    toast.success(`${policyName} copied to clipboard!`)
    setTimeout(() => setCopiedContent(null), 2000)
  }

  const workspacePolicy = `# Workspace Policy

## Supported AI Tools

This playbook supports multiple AI coding assistants. The following files serve as the primary instruction entry point for each tool:

| AI Tool | Instruction File | Location |
|---|---|---|
| GitHub Copilot | \`copilot-instructions.md\` | \`<repo-root>/.github/copilot-instructions.md\` |
| Claude (Code / claude.ai) | \`CLAUDE.md\` | \`<repo-root>/CLAUDE.md\` |
| Cursor IDE | \`.cursorrules\` | \`<repo-root>/.cursorrules\` |
| Windsurf (Codeium) | \`.windsurfrules\` | \`<repo-root>/.windsurfrules\` |

All of these files reference the same playbook skills and policies. Use the \`ai-tool-setup\` skill to generate or refresh them.

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
- Use inline arrow functions sparingly (consider performance implications).
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
- Test keyboard navigation and focus management
- Verify ARIA attributes and semantic structure`

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
- Pipes for transformation and validation.

## Java

### Maven Projects
- Standard directory structure: \`src/main/java\`, \`src/test/java\`.
- \`pom.xml\` dependency management.
- Lombok for boilerplate reduction (if present).

### Gradle Projects
- Follow Gradle conventions.
- Multi-module support.

### Spring Boot Patterns
- Controller/Service/Repository layering.
- Spring annotations for dependency injection.
- \`application.properties\` or \`application.yml\` for configuration.

## Python

### Project Structure
- \`pyproject.toml\` for modern projects.
- Virtual environment (\`venv/\`, \`.venv/\`) isolation.
- Clear module hierarchy.

### FastAPI Patterns
- Router-based organization.
- Pydantic models for validation.
- Async/await for I/O-bound operations.

### Django Patterns
- App-based modular structure.
- Models, views, serializers separation.
- Django ORM patterns.

## General Backend Rules

### Error Handling
- Return meaningful error messages.
- Use appropriate HTTP status codes.
- Log errors with sufficient context.

### Validation
- Validate all inputs at entry points.
- Use schema validation libraries appropriate to the ecosystem.

### Testing
- Unit tests for business logic.
- Integration tests for API endpoints.
- Mock external dependencies.

### Security
- Never log sensitive data (passwords, tokens, keys).
- Use parameterized queries to prevent SQL injection.
- Validate and sanitize user input.
- Follow OWASP guidelines for the language.`

  const outputStylePolicy = `# Output Style Guidelines

## Minimal Diffs

Produce the smallest possible changeset to accomplish the task.

### Rules
1. Modify only the lines necessary to implement the feature or fix.
2. Do not reformat unrelated code.
3. Do not reorganize imports unless required for the change.
4. Do not rename variables or functions outside the scope of the task.

### Exception
If the user explicitly requests refactoring or code cleanup, broader changes are acceptable.

## Path References

All file paths in output must be:
- Relative to the target project root.
- Use forward slashes (\`/\`) regardless of operating system.
- Omit leading \`./\` unless semantically required.

Examples:
- \`src/components/Button.tsx\`
- \`tests/unit/api.test.ts\`
- \`config/database.yml\`

## No Mass Reformatting

Do NOT apply automatic code formatters (Prettier, Black, gofmt) unless:
- The project has a pre-commit hook configured.
- The user explicitly requests formatting.

Preserve the existing code style of the target file.

## No Unrelated Refactors

When fixing a bug or adding a feature:
- Do not extract functions "for cleanliness" unless required.
- Do not split files unless the change demands it.
- Do not introduce design patterns (e.g., factory, strategy) unless solving a concrete problem.

## Verification Commands

After proposing changes, suggest commands the user can run to verify correctness:
- Linting: \`npm run lint\`, \`eslint src/\`, \`pylint module/\`
- Type checking: \`tsc --noEmit\`, \`mypy .\`
- Tests: \`npm test\`, \`pytest\`, \`mvn test\`
- Build: \`npm run build\`, \`gradle build\`, \`python -m build\`

Provide the specific command relevant to the project's tooling.

## Plan vs. Direct Fix

### When to Plan
For complex changes involving:
- Multiple files or modules.
- Architectural decisions.
- Trade-offs between approaches.

Provide:
1. Brief description of the approach.
2. List of files to modify.
3. High-level steps.

Then execute after confirmation.

### When to Fix Directly
For simple changes:
- Single-file bug fixes.
- Typo corrections.
- Adding a small utility function.
- Updating configuration values.

Proceed immediately with the fix.`

  const policies = [
    {
      id: 'workspace',
      name: 'Workspace Policy',
      description: 'Project isolation, scope enforcement, and multi-repo workspace rules',
      icon: Layers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      content: workspacePolicy,
      keyPoints: [
        'Multi-repository workspace support',
        'Project isolation and scope enforcement',
        'Exclusion patterns for build artifacts',
        'Target folder selection protocol',
        'Cross-folder refactor prohibition'
      ]
    },
    {
      id: 'frontend',
      name: 'Frontend Policy',
      description: 'React, TypeScript, accessibility, and testing standards',
      icon: Code,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      content: frontendPolicy,
      keyPoints: [
        'React + TypeScript best practices',
        'WCAG 2.2 Level AA accessibility requirements',
        'Component structure and state management',
        'Testing with jest-axe and React Testing Library',
        'Focus management and keyboard navigation'
      ]
    },
    {
      id: 'backend',
      name: 'Backend Policy',
      description: 'Multi-language backend guidelines (Node, Java, Python)',
      icon: Terminal,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      content: backendPolicy,
      keyPoints: [
        'Node.js/TypeScript and Nest.js patterns',
        'Java Spring Boot conventions',
        'Python FastAPI and Django patterns',
        'Error handling and validation',
        'Security best practices (OWASP)'
      ]
    },
    {
      id: 'output',
      name: 'Output Style',
      description: 'How to format responses, diffs, and verification commands',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      content: outputStylePolicy,
      keyPoints: [
        'Minimal diffs - smallest possible changesets',
        'No mass reformatting or unrelated refactors',
        'Relative path references with forward slashes',
        'Include verification commands',
        'Plan complex changes, fix simple ones directly'
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Policy Rules for AI Tools
          </CardTitle>
          <CardDescription>
            Essential guidelines that improve AI assistant performance and code quality across all tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Why These Rules Matter</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    These policies help AI tools understand your workspace structure, enforce accessibility standards, 
                    maintain consistent code style, and prevent common mistakes. They work across GitHub Copilot, 
                    Claude, Cursor, and other AI assistants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {policies.map((policy) => {
          const Icon = policy.icon
          const isExpanded = expandedPolicy === policy.id
          const isCopied = copiedContent === policy.name

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
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key Points</p>
                  <div className="grid gap-2">
                    {policy.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{point}</span>
                      </div>
                    ))}
                  </div>
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
                    <ScrollArea className="h-[400px] w-full rounded-lg border bg-muted/50">
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

      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-accent" />
            How to Use These Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-2">
            <p className="font-medium">For GitHub Copilot:</p>
            <p className="text-muted-foreground">
              Policies are automatically loaded from <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">For Claude/Cursor/Other Tools:</p>
            <p className="text-muted-foreground">
              Copy the policies you need and add them to your tool's configuration file 
              (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code>, etc.)
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Reference in Prompts:</p>
            <p className="text-muted-foreground">
              When asking AI to work on a task, reference specific policies: 
              "Follow the frontend policy for accessibility" or "Apply output style guidelines"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
