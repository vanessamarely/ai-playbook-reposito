import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Workflow, Play, CheckCircle, Boxes, Copy, Check, FileText, ChevronDown, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AgentGuide() {
  const [copiedAgent, setCopiedAgent] = useState<string | null>(null)
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  const copyToClipboard = (content: string, agentName: string) => {
    navigator.clipboard.writeText(content)
    setCopiedAgent(agentName)
    toast.success(`${agentName} agent copied to clipboard!`)
    setTimeout(() => setCopiedAgent(null), 2000)
  }

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
description: Scan a workspace folder to detect project type and route to appropriate skills and AI tool configurations
tools:
  - file-system-read
  - command-execution
---

# Scan Workspace Agent

## Purpose

Identify the project type within a target folder, determine which skills apply, and verify that AI tool instruction files (GitHub Copilot, Claude, Cursor) are present and up to date.

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

If the script fails:
- Check that Node.js is available.
- Verify the script path is correct relative to the playbook root.
- Output the stderr and exit.

### Step 3: Parse Detection Results

Extract:
- \`projectType\`
- \`framework\` (if applicable)
- \`language\`
- Configuration file paths

### Step 4: Map to Skills

Use the following routing table:

| Project Type       | Skills                                                  |
|--------------------|---------------------------------------------------------|
| \`react\`            | \`react-components\`, \`a11y-automation\`                   |
| \`node-typescript\`  | \`node-typescript-service\`                               |
| \`java-spring\`      | (Refer to backend-policy.md; no specific skill yet)     |
| \`python-fastapi\`   | (Refer to backend-policy.md; no specific skill yet)     |
| \`unknown\`          | Fallback to manual inspection                           |

### Step 5: Check AI Tool Instruction Files

For each AI tool, verify the instruction file exists in \`targetFolder\`:

| AI Tool | File | Required |
|---|---|---|
| GitHub Copilot | \`.github/copilot-instructions.md\` | Recommended |
| Claude | \`CLAUDE.md\` | Recommended |
| Cursor | \`.cursorrules\` | Optional |
| Windsurf | \`.windsurfrules\` | Optional |

For any missing recommended file, add a warning:
\`\`\`
WARNING: .github/copilot-instructions.md not found. Run the ai-tool-setup skill to generate it.
\`\`\`

### Step 6: Apply Scope Guard

Execute: \`node tools/scope-guard.mjs <targetFolder>\`

This ensures subsequent operations remain within the target folder.

If scope violations are detected, abort and notify.

### Step 7: Output Recommendations

Print:
- Detected project type.
- List of recommended skills to load.
- Relevant policy files.
- AI tool instruction file status.

Example output:
\`\`\`json
{
  "projectType": "react",
  "framework": "vite",
  "language": "typescript",
  "skills": ["react-components", "a11y-automation"],
  "policies": [
    ".github/copilot-instructions/workspace-policy.md",
    ".github/copilot-instructions/frontend-policy.md"
  ],
  "aiTools": {
    "copilot": { "present": true, "path": ".github/copilot-instructions.md" },
    "claude":  { "present": true, "path": "CLAUDE.md" },
    "cursor":  { "present": false, "path": ".cursorrules" }
  },
  "warnings": [
    "WARNING: .cursorrules not found. Run the ai-tool-setup skill to generate it."
  ]
}
\`\`\`

## Error Handling

- **Folder not found**: Output clear error message with the attempted path.
- **Detection script failure**: Output stderr from \`project-detect.mjs\`.
- **Ambiguous project type**: List candidates and request clarification.
- **Missing AI tool files**: Include in warnings; suggest running \`ai-tool-setup\` skill.`,
      filePath: 'ai-playbook/.github/agents/scan-workspace/AGENT.md'
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
description: Build accessible React components following TypeScript and WCAG 2.2 standards
tools:
  - file-system-read
  - file-system-write
  - command-execution
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

Read: \`.github/skills/react-components/SKILL.md\`

Follow the procedures defined in that skill.

### Step 3: Generate Component Structure

1. Create the component file at \`<targetFolder>/<componentName>.tsx\`.
2. Define TypeScript interface for props.
3. Implement the component with semantic HTML.
4. Add accessibility attributes (ARIA roles, labels, keyboard handlers).

Refer to: \`.github/skills/react-components/references/a11y-wcag22.md\` for WCAG 2.2 requirements.

### Step 4: Apply Project-Specific Overrides

Check for project-specific style guides or component library documentation:
- If the project has \`.github/component-library-overrides.md\`, read and apply those rules.
- Otherwise, follow the project's existing code style and conventions.

### Step 5: Validate Accessibility

1. Check for semantic HTML usage.
2. Verify keyboard event handlers are present for interactive elements.
3. Ensure focus management for modals or dynamic content.
4. Confirm ARIA attributes are valid and necessary.

If \`eslint-plugin-jsx-a11y\` is configured, suggest running: \`npm run lint\`

### Step 6: Generate Test File (Optional)

If tests are expected:
1. Create \`<componentName>.test.tsx\` in the appropriate test directory.
2. Include basic rendering test.
3. Include accessibility test using \`@axe-core/react\` or similar.

### Step 7: Output Summary

Provide:
- Path to created component file.
- Brief description of implemented functionality.
- Suggested verification commands:
  - \`npm run lint\`
  - \`npm test -- <componentName>\`
  - \`npm run type-check\`

## Error Handling

- **Component already exists**: Notify and ask if modification or overwrite is intended.
- **Invalid props specification**: Request clarification on expected types.
- **Missing dependencies**: Suggest installing required packages.`
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
description: Audit React components for WCAG 2.2 compliance and suggest fixes
tools:
  - file-system-read
  - command-execution
  - report-generation
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

1. Verify \`targetPath\` exists.
2. Determine file(s) to audit based on \`auditScope\`.
3. Filter for \`.tsx\` and \`.jsx\` files.

### Step 2: Run Automated Lint

Execute: \`.github/skills/a11y-automation/scripts/run-a11y-lint.sh <targetPath>\`

Capture output.

If eslint-plugin-jsx-a11y is configured, parse violations.

### Step 3: Load WCAG Guidelines

Read: \`.github/skills/react-components/references/a11y-wcag22.md\`

Use as reference for manual inspection.

### Step 4: Analyze Each Component

For each component file:

1. **Semantic HTML Check**
   - Detect use of \`<div>\` or \`<span>\` for buttons/links.
   - Flag missing landmarks (\`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`).

2. **Keyboard Navigation Check**
   - Verify interactive elements have \`onClick\` and \`onKeyDown\` handlers.
   - Check for keyboard traps in modals or focus-managed sections.

3. **ARIA Usage Check**
   - Identify missing \`aria-label\` or \`aria-labelledby\` on icon buttons.
   - Detect invalid ARIA attribute combinations.
   - Flag redundant ARIA on semantic elements.

4. **Focus Management Check**
   - Verify modals trap focus and restore on close.
   - Check that dynamic content updates announce via \`aria-live\` if needed.

5. **Contrast and Motion Check**
   - Flag hardcoded colors that may violate contrast ratios (suggest calculation).
   - Detect animations without \`prefers-reduced-motion\` support.

### Step 5: Categorize Violations

Assign severity:
- **Critical**: Component is unusable via keyboard or screen reader.
- **Serious**: Missing required ARIA or semantic structure.
- **Moderate**: Suboptimal patterns that hinder usability.
- **Minor**: Best practice improvements.

### Step 6: Summarize Findings

Output to chat:
- Summary statistics (total issues, by severity).
- Per-file breakdown with line numbers.
- Brief description of each violation.

### Step 7: Propose Fixes

For each violation:
1. Show the problematic code snippet.
2. Provide corrected version with minimal changes.
3. Explain the accessibility benefit.

Apply fixes using minimal diffs.

### Step 8: Suggest Automated Tests

If Playwright is available:
- Reference \`.github/skills/a11y-automation/scripts/run-axe-playwright.mjs\`.
- Suggest integrating axe checks into the test suite.

## Error Handling

- **No React files found**: Notify and exit.
- **Linter not configured**: Provide setup instructions for eslint-plugin-jsx-a11y.
- **Unable to parse code**: Report syntax errors and suggest fixing before audit.`
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
description: Scaffold or extend Node.js/TypeScript microservices with validation, error handling, and testing
tools:
  - file-system-read
  - file-system-write
  - command-execution
---

# Node Microservice Builder Agent

## Purpose

Create or modify Node.js/TypeScript microservice endpoints following backend conventions and best practices.

## Inputs

- \`serviceName\`: Name of the service or module.
- \`endpointSpec\`: HTTP method, path, request/response schemas, and business logic description.
- \`targetFolder\`: Service directory within the project.

## Outputs

- Controller or route handler file.
- Validation schemas (Zod, Joi, or class-validator).
- Test file with unit and integration tests.
- Updated routing configuration if needed.

## Procedure

### Step 1: Validate Inputs

1. Ensure \`serviceName\` follows the project's naming convention.
2. Verify \`targetFolder\` is a valid Node.js project (contains \`package.json\`).
3. Check for \`tsconfig.json\` to confirm TypeScript usage.

### Step 2: Load Skill

Read: \`.github/skills/node-typescript-service/SKILL.md\`

Follow the procedures defined in that skill.

### Step 3: Detect Framework

Check \`package.json\` dependencies:
- \`express\` → Express.js
- \`@nestjs/core\` → Nest.js
- \`fastify\` → Fastify

Adjust code patterns accordingly.

### Step 4: Generate Endpoint Handler

1. Create handler function with typed parameters.
2. Implement request validation using the project's validation library.
3. Add error handling with appropriate HTTP status codes.
4. Structure response with consistent format.

For Nest.js:
- Use controller class with decorators (\`@Controller\`, \`@Post\`, etc.).
- Inject dependencies via constructor.
- Use DTOs with validation decorators.

For Express:
- Create route handler function.
- Use middleware for validation.
- Return responses via \`res.status().json()\`.

### Step 5: Add Validation Schema

Refer to: \`.github/skills/node-typescript-service/references/validation-and-errors.md\`

1. Define input schema (request body, query params, path params).
2. Use appropriate validation library (Zod, Joi, class-validator).
3. Attach validation middleware or decorator.

### Step 6: Implement Error Handling

1. Use custom error classes if available.
2. Map business logic errors to HTTP status codes:
   - 400 for validation errors.
   - 401 for authentication failures.
   - 403 for authorization failures.
   - 404 for not found.
   - 500 for unexpected errors.
3. Return structured error responses with message and optional error code.

### Step 7: Generate Tests

Create test file adjacent to the handler:
1. Unit tests for business logic.
2. Integration tests for HTTP endpoints (use supertest or similar).
3. Include test cases for:
   - Successful request.
   - Validation failures.
   - Error conditions.

### Step 8: Update Routing

If the project has centralized routing:
1. Register the new endpoint in the routing module.
2. Ensure route conflicts are avoided.

### Step 9: Output Summary

Provide:
- Path to created handler file.
- Path to validation schema.
- Path to test file.
- Suggested verification commands:
  - \`npm run lint\`
  - \`npm test -- <serviceName>\`
  - \`npm run build\`

## Error Handling

- **Framework mismatch**: If the detected framework differs from expectation, clarify before proceeding.
- **Missing validation library**: Suggest installing an appropriate package.
- **Route conflict**: Notify and suggest alternative path or method.`
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
        'Run diagnostics-summarizer.mjs on errors',
        'Provide actionable feedback in chat',
      ],
      tools: ['scope-guard.mjs', 'diagnostics-summarizer.mjs'],
      skills: ['Depends on file types being reviewed'],
      markdown: `---
tools:
  - file-system-read
  - diff-analysis
  - command-execution
---

# Pull Request Reviewer Agent

## Purpose

Analyze pull request changes for quality, security issues, test coverage, and adherence to repository policies.

## Inputs

- \`diffFile\`: Path to git diff or list of changed files.
- \`projectRoot\`: Root directory of the target project.

## Outputs

- Review summary with findings categorized by severity.
- Inline comments for specific issues.
- Approval or change request recommendation.

## Procedure

### Step 1: Parse Diff

1. Extract list of modified, added, and deleted files.
2. Identify file types (source code, tests, config, documentation).
3. Calculate scope of changes (lines added/removed).

### Step 2: Run Scope Guard

Execute: \`node tools/scope-guard.mjs <projectRoot> <changedFiles>\`

Ensure all changes are within the allowed scope.

Flag any violations.

### Step 3: Detect Project Type

Execute: \`node tools/project-detect.mjs <projectRoot>\`

Determine applicable policies and skills.

### Step 4: Load Relevant Policies

Based on project type, read:
- \`.github/copilot-instructions/workspace-policy.md\` (always)
- \`.github/copilot-instructions/frontend-policy.md\` (if frontend)
- \`.github/copilot-instructions/backend-policy.md\` (if backend)

### Step 5: Code Quality Check

For each changed source file:

1. **Style Consistency**
   - Verify adherence to project conventions.
   - Check for unrelated formatting changes (flag as noise).

2. **Type Safety** (TypeScript/Java/Python with types)
   - Identify \`any\` types or missing type annotations.
   - Flag type assertions without justification.

3. **Error Handling**
   - Check for unhandled promise rejections.
   - Verify appropriate error responses in API endpoints.

4. **Security**
   - Detect hardcoded secrets or credentials.
   - Identify SQL injection risks (string concatenation in queries).
   - Flag unvalidated user input.

5. **Performance**
   - Identify inefficient loops or algorithms.
   - Flag synchronous operations in async contexts.

### Step 6: Accessibility Check (Frontend Only)

If frontend changes detected:
1. Read: \`.github/skills/react-components/references/a11y-wcag22.md\`
2. Check for:
   - Use of non-semantic elements for interactive components.
   - Missing ARIA labels on icon buttons.
   - Keyboard handler omissions.

### Step 7: Test Coverage Check

1. Identify if tests were added or modified.
2. Correlate test changes with source changes.
3. Flag new functionality without corresponding tests.

Suggest running:
- \`npm test -- --coverage\` (or equivalent)

### Step 8: AI Tool Instruction Check

If the PR modifies playbook files (agents, skills, or policies):
1. Check that \`.github/copilot-instructions.md\`, \`CLAUDE.md\`, and \`.cursorrules\` are consistent with any updated skill routing.
2. Flag if a new skill was added but not referenced in the AI tool instruction files.
3. Suggest running the \`ai-tool-setup\` skill to regenerate instruction files if they are stale.

### Step 9: Documentation Check

1. Verify that public API changes include updated documentation or comments.
2. For breaking changes, ensure migration notes are provided.

### Step 10: Summarize Findings

Categorize issues:
- **Blocking**: Security vulnerabilities, breaking changes without migration path, scope violations.
- **Required**: Missing tests, accessibility violations, type safety issues.
- **Recommended**: Style improvements, performance optimizations, documentation enhancements, stale AI tool config.
- **Nitpick**: Minor style or naming suggestions.

### Step 11: Generate Review

Format:
- Summary section with metrics (files changed, lines added/removed).
- Findings by category.
- Inline comments with file path and line number.
- Overall recommendation: Approve, Request Changes, or Comment.

## Error Handling

- **Diff parsing failure**: Request valid git diff format.
- **Project detection failure**: Ask for explicit project type.
- **Policy file missing**: Proceed with general best practices only.`
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
description: Review code files for quality, security, performance, and best practices, providing inline comments and actionable suggestions in chat without creating additional files
tools: [read_file, list_directory]
---

# Code Reviewer Agent

## Purpose
Analyze source code to identify potential improvements, bugs, security issues, and violations of best practices. Provide line-by-line feedback directly in the AI tool's chat interface with specific suggestions for enhancement.

## Inputs
- File path or directory to review
- Optional: specific focus areas (performance, security, accessibility, maintainability)
- Optional: language/framework context (auto-detected if not provided)

## Outputs
- Inline comments with line numbers and specific suggestions
- Categorized feedback (critical, warning, suggestion, style)
- Actionable recommendations for each issue
- Summary of review findings

## Procedure

### 1. Context Detection
Inspect the target file(s) and detect:
- Programming language
- Framework (React, Vue, Angular, Express, NestJS, etc.)
- File type (component, service, utility, configuration)
- Related dependencies and imports

### 2. Code Analysis
Examine the code for:

**Critical Issues:**
- Security vulnerabilities (SQL injection, XSS, exposed secrets)
- Memory leaks or resource exhaustion
- Null/undefined errors
- Race conditions or concurrency issues
- Incorrect error handling

**Performance Issues:**
- Inefficient algorithms or data structures
- Unnecessary re-renders (React)
- Missing memoization opportunities
- Large bundle size contributors
- Blocking operations

**Best Practices:**
- Naming conventions
- Code organization and structure
- Separation of concerns
- DRY violations
- SOLID principles
- Framework-specific patterns

**Accessibility (Frontend):**
- Missing ARIA attributes
- Keyboard navigation support
- Semantic HTML usage
- Color contrast issues in styled components
- Focus management

**Maintainability:**
- Code complexity (cyclomatic complexity)
- Function/component size
- Missing documentation for complex logic
- Type safety issues (TypeScript)
- Test coverage gaps

### 3. Format Output
For each issue found, output in chat:

\`\`\`
📍 Line [LINE_NUMBER]: [ISSUE_CATEGORY]
Current code:
  [CODE_SNIPPET]

Issue: [DESCRIPTION]

Suggested fix:
  [IMPROVED_CODE]

Reason: [EXPLANATION]
\`\`\`

### 4. Categorization
Use emojis to indicate severity:
- 🔴 Critical: Security issues, bugs, breaking errors
- 🟠 Warning: Performance problems, potential bugs
- 🟡 Suggestion: Best practices, code quality improvements
- 🔵 Style: Formatting, naming conventions

### 5. Summary
Conclude with a summary:
\`\`\`
Review Summary:
✓ [COUNT] critical issues found
✓ [COUNT] warnings
✓ [COUNT] suggestions
✓ [COUNT] style recommendations

Priority Actions:
1. [MOST_IMPORTANT_FIX]
2. [SECOND_MOST_IMPORTANT_FIX]
3. [THIRD_MOST_IMPORTANT_FIX]
\`\`\`

## Framework-Specific Checks

### React/TypeScript
- Proper use of hooks (dependency arrays, exhaustive deps)
- Component composition over inheritance
- Props interface definitions
- Key props in lists
- Event handler naming
- State management patterns
- Accessibility in JSX

### Node.js/Express
- Input validation
- Error middleware usage
- Async error handling
- Security headers
- Rate limiting
- Environment variable usage
- Database connection pooling

### Python
- PEP 8 compliance
- Type hints usage
- Exception handling
- Context managers for resources
- List comprehensions vs loops
- Generator usage for large datasets

### Java
- Exception handling patterns
- Resource management (try-with-resources)
- Immutability where appropriate
- Stream API usage
- Null safety patterns
- Design patterns application

## Error Handling
If the target file cannot be read:
- Suggest checking file path
- Verify file permissions
- Confirm file exists in current workspace

If the language is not recognized:
- Perform generic code review (structure, naming, complexity)
- Suggest manual specification of language

## Example Usage

### Request:
"Review the code in src/components/UserCard.tsx"

### Response:
\`\`\`
Reviewing: src/components/UserCard.tsx (React TypeScript Component)

🔴 Line 23: Critical - Potential null reference
Current code:
  const userName = user.name.toUpperCase()

Issue: No null check on user or user.name before calling toUpperCase()

Suggested fix:
  const userName = user?.name?.toUpperCase() ?? 'Unknown'

Reason: If user or user.name is null/undefined, this will throw a runtime error

---

🟠 Line 45: Warning - Missing dependency in useEffect
Current code:
  useEffect(() => {
    fetchUserData(userId)
  }, [])

Issue: userId is used but not included in dependency array

Suggested fix:
  useEffect(() => {
    fetchUserData(userId)
  }, [userId, fetchUserData])

Reason: Effect won't re-run when userId changes, causing stale data

---

🟡 Line 12: Suggestion - Extract magic number to constant
Current code:
  if (user.age < 18) {

Suggested fix:
  const MINIMUM_AGE = 18
  if (user.age < MINIMUM_AGE) {

Reason: Improves readability and makes the business rule explicit

---

Review Summary:
✓ 1 critical issue found
✓ 2 warnings
✓ 3 suggestions
✓ 1 style recommendation

Priority Actions:
1. Add null checks on line 23 to prevent runtime errors
2. Fix useEffect dependency array on line 45
3. Add ARIA label to button on line 67 for accessibility
\`\`\`

## Integration Notes
This agent provides feedback **only in chat**. It does not:
- Create or modify files automatically
- Generate separate report documents
- Commit changes to version control

The developer reviews the suggestions and applies them manually, maintaining full control over code changes.

## Related Skills
- \`.github/skills/react-components/SKILL.md\` - For React-specific patterns
- \`.github/skills/node-typescript-service/SKILL.md\` - For backend patterns
- \`.github/skills/a11y-automation/SKILL.md\` - For accessibility checks

## References
- Load frontend policy: \`.github/copilot-instructions/frontend-policy.md\`
- Load backend policy: \`.github/copilot-instructions/backend-policy.md\`
- Load style guidelines: \`.github/copilot-instructions/style-output.md\``
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
            Agents orchestrate multiple skills to accomplish complex tasks. They coordinate workflows, load context
            progressively, and manage tool execution.
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
              {agent.filePath && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded">
                  <FolderOpen className="h-3.5 w-3.5" />
                  <code>{agent.filePath}</code>
                </div>
              )}
              
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
                      View Full AGENT.md
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
                  <div className="mt-4">
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
            AGENT.md File Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg font-mono text-xs space-y-3">
            <div>
              <p className="text-muted-foreground">YAML frontmatter:</p>
              <pre className="text-foreground mt-1">
{`---
description: Brief action-oriented description
tools: [tool1, tool2]
---`}
              </pre>
            </div>
            <div>
              <p className="text-muted-foreground">Required sections:</p>
              <ul className="text-foreground space-y-1 mt-1 ml-4">
                <li>• Purpose</li>
                <li>• Inputs (what the agent receives)</li>
                <li>• Outputs (what the agent produces)</li>
                <li>• Step-by-step procedure</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}