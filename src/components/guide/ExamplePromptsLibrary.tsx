import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Copy,
  MessageSquare,
  Sparkles,
  Workflow,
  BookOpen,
  FileCode,
  GitPullRequest,
  Search,
  Bug,
  Shield,
  Lightbulb,
  CheckCircle2
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface PromptTemplate {
  id: string
  title: string
  description: string
  category: 'agent' | 'skill' | 'general' | 'review'
  icon: typeof Workflow
  prompt: string
  tags: string[]
}

const promptTemplates: PromptTemplate[] = [
  {
    id: 'scan-workspace',
    title: 'Scan Workspace',
    description: 'Detect project type and suggest relevant skills',
    category: 'agent',
    icon: Search,
    tags: ['setup', 'detection', 'initialization'],
    prompt: `Please analyze this workspace and detect the project type, following the scan-workspace agent/skill for whichever AI tool you are (Claude Code: .claude/agents/scan-workspace.md, Copilot: .github/agents/scan-workspace.agent.md, Cursor: .cursor/commands/scan-workspace.md, Codex CLI: .agents/skills/scan-workspace/SKILL.md):

1. Run the project detection tool on the current directory
2. Identify the project structure and applicable skills
3. Confirm this project's AI tool instruction files are present and up to date
4. Provide a summary of recommended next steps

Focus on the current directory and respect workspace boundaries.`
  },
  {
    id: 'react-component',
    title: 'Build React Component',
    description: 'Create accessible React component with TypeScript',
    category: 'agent',
    icon: Workflow,
    tags: ['react', 'component', 'accessibility', 'typescript'],
    prompt: `I need to create a new React component. Please use the react-component-builder agent/skill for whichever AI tool you are.

Component Requirements:
- Name: [ComponentName]
- Purpose: [Brief description]
- Props: [List required props]
- Interactions: [User interactions needed]

Please:
1. Follow the react-component-builder procedure (agent, prompt, command, or skill — depending on your tool)
2. Apply the react-components skill's accessibility references
3. Use TypeScript with proper types
4. Ensure WCAG 2.2 AA compliance
5. Include appropriate ARIA attributes
6. Implement keyboard navigation
7. Add focus management

Output the component code with proper structure.`
  },
  {
    id: 'a11y-audit',
    title: 'Accessibility Audit',
    description: 'Review component for WCAG 2.2 compliance',
    category: 'agent',
    icon: Shield,
    tags: ['accessibility', 'audit', 'wcag', 'review'],
    prompt: `Please audit this component for accessibility issues, following the a11y-audit-react agent/skill:

[Paste component code or file path]

Review for:
- Semantic HTML structure
- ARIA attributes and roles
- Keyboard navigation
- Focus management
- Color contrast
- Screen reader compatibility
- Reduced motion support
- Touch target sizes

Provide specific code suggestions for each issue found.`
  },
  {
    id: 'pr-review',
    title: 'Pull Request Review',
    description: 'Review code changes with inline suggestions',
    category: 'review',
    icon: GitPullRequest,
    tags: ['review', 'pr', 'code-quality', 'suggestions'],
    prompt: `Please review this code change following the pr-reviewer agent/skill:

[Paste code or file paths]

Instructions:
1. Check code quality, patterns, and best practices
2. Verify accessibility if frontend code
3. Check for security issues
4. Validate error handling
5. Confirm this playbook's AI tool instruction files are still consistent if this PR touches agents/skills/policies

Provide inline comments with:
- Line numbers for each suggestion
- Severity level (critical/major/minor/suggestion)
- Specific improvement recommendation
- Code example when applicable

Format: "Line X: [severity] - [comment]"`
  },
  {
    id: 'node-service',
    title: 'Build Node.js Microservice',
    description: 'Create a Node.js/TypeScript microservice endpoint',
    category: 'agent',
    icon: FileCode,
    tags: ['node', 'backend', 'api', 'typescript'],
    prompt: `Create a new Node.js microservice endpoint following the node-microservice-builder agent/skill.

Requirements:
- Endpoint: [HTTP method and path]
- Purpose: [What it does]
- Input: [Request body/params]
- Output: [Response format]
- Validation: [Rules]

Please:
1. Follow the node-microservice-builder procedure and the node-typescript-service skill's validation/error reference
2. Implement proper error handling
3. Add input validation
4. Include TypeScript types
5. Follow RESTful conventions
6. Add appropriate status codes

Output the service code with proper structure.`
  },
  {
    id: 'react-skill',
    title: 'Apply React Component Skill',
    description: 'Use React component building procedures',
    category: 'skill',
    icon: BookOpen,
    tags: ['react', 'skill', 'component', 'procedure'],
    prompt: `I need to build a React component using best practices.

Please follow the react-components skill (or its Cursor rule / Copilot prompt equivalent) step by step, referencing the WCAG guidelines and TypeScript pattern material it points to.

Component details:
[Describe your component]`
  },
  {
    id: 'a11y-skill',
    title: 'Apply A11y Automation Skill',
    description: 'Run accessibility testing and validation',
    category: 'skill',
    icon: Shield,
    tags: ['accessibility', 'testing', 'automation'],
    prompt: `I need to test this component for accessibility:

[Component name or path]

Please:
1. Follow the a11y-automation skill (or its Cursor rule / Copilot prompt equivalent)
2. Guide me through running the validation scripts
3. If scripts aren't configured, provide setup instructions
4. Explain how to interpret results
5. Suggest fixes for common issues

Walk me through the automation process step by step.`
  },
  {
    id: 'fix-bug',
    title: 'Debug and Fix Issue',
    description: 'Analyze and resolve a bug with context awareness',
    category: 'general',
    icon: Bug,
    tags: ['debugging', 'troubleshooting', 'fix'],
    prompt: `I'm experiencing an issue that needs debugging:

Problem description:
[Describe the issue]

Error message (if any):
[Paste error]

Affected code:
[File path or code snippet]

Please:
1. Analyze the issue considering the workspace policy's scope rules
2. Check if it's related to accessibility, if frontend
3. Identify root cause
4. Propose a fix with minimal changes
5. Explain why this fix works
6. Suggest tests to prevent regression

Important: only modify files within this project's scope.`
  },
  {
    id: 'mcp-integration',
    title: 'Use MCP Tool',
    description: 'Integrate Model Context Protocol tools in your workflow',
    category: 'general',
    icon: Sparkles,
    tags: ['mcp', 'tools', 'integration'],
    prompt: `I need to use an MCP tool with this task:

Task: [Describe what you need to do]
MCP Tool: [e.g., Playwright, Chrome, GitHub, filesystem]

Please:
1. Explain which MCP tool is best for this task
2. Show me how to invoke it
3. Combine it with the relevant agent/skill from this playbook
4. Guide me through the workflow
5. Explain what the MCP tool provides vs. what the agent/skill does

Example: Use the Chrome MCP server to test a component while following the figma-component-builder or a11y-audit-react procedure.`
  },
  {
    id: 'create-skill',
    title: 'Create New Skill',
    description: 'Define a new reusable skill for the playbook',
    category: 'skill',
    icon: Lightbulb,
    tags: ['creation', 'skill', 'template'],
    prompt: `I want to create a new skill for the AI Playbook:

Skill purpose: [What problem does it solve]
Skill name: [lowercase-with-hyphens]
Target: [frontend/backend/general]

Please:
1. Follow the skill-creator skill/prompt/command for your AI tool
2. Author the canonical version first at .claude/skills/<name>/SKILL.md
3. Then help me adapt it to the other 3 tool formats (Copilot .prompt.md/.agent.md, Cursor .mdc/.md, Codex SKILL.md) using the frontmatter rules in the Structure tab

Help me structure this new skill following the framework conventions.`
  },
  {
    id: 'multi-file-refactor',
    title: 'Multi-File Refactor',
    description: 'Refactor across multiple files safely',
    category: 'general',
    icon: FileCode,
    tags: ['refactor', 'scope', 'safety'],
    prompt: `I need to refactor code across multiple files:

Goal: [What you want to achieve]
Affected files: [List files or pattern]
Scope: [Specific directory or workspace root]

Please:
1. Verify scope against the workspace policy's boundaries
2. Create a refactoring plan before making changes
3. Show which files will be modified
4. Explain impact on other parts of the codebase
5. Apply changes with minimal diffs
6. Suggest verification commands

Important: Stay within the specified scope and don't modify unrelated files.`
  },
  {
    id: 'backend-language-detect',
    title: 'Backend Language Detection',
    description: 'Identify backend language and apply correct conventions',
    category: 'general',
    icon: Search,
    tags: ['backend', 'detection', 'conventions'],
    prompt: `Analyze this backend project and apply appropriate conventions:

Project directory: [path]

Please:
1. Apply the backend policy's conventions
2. Detect language: Node/TypeScript, Java, Python, or other
3. Identify framework: Express/Nest, Spring, FastAPI/Django, etc.
4. Check for project config: package.json, pom.xml, pyproject.toml
5. Apply language-specific best practices
6. Suggest the node-typescript-service skill if applicable

Then help me with: [your backend task]`
  },
  {
    id: 'style-output',
    title: 'Request Formatted Output',
    description: 'Ask for output in a specific style',
    category: 'general',
    icon: MessageSquare,
    tags: ['formatting', 'output', 'style'],
    prompt: `Please help me with this task and format output according to the style-output policy:

Task: [Your request]

Output requirements:
1. Provide minimal diffs (show only changed lines)
2. Use relative paths from the project root
3. No mass reformatting or unrelated changes
4. Include verification commands at the end
5. Show a plan first if changes affect multiple files

Present the solution clearly and concisely.`
  },
  {
    id: 'wcag-reference',
    title: 'WCAG 2.2 Quick Reference',
    description: 'Get specific accessibility guidance',
    category: 'skill',
    icon: Shield,
    tags: ['wcag', 'accessibility', 'reference'],
    prompt: `I need accessibility guidance for:

Element/Pattern: [e.g., modal dialog, form, navigation menu]

Please:
1. Pull from the react-components skill's WCAG 2.2 reference material
2. Extract relevant WCAG 2.2 AA requirements for this pattern
3. Provide code examples
4. Explain keyboard interactions needed
5. Show proper ARIA usage
6. List common mistakes to avoid

Give me actionable accessibility implementation guidance.`
  }
]

const categories = [
  { value: 'all', label: 'All Prompts', icon: MessageSquare },
  { value: 'agent', label: 'Agents', icon: Workflow },
  { value: 'skill', label: 'Skills', icon: BookOpen },
  { value: 'review', label: 'Code Review', icon: GitPullRequest },
  { value: 'general', label: 'General', icon: Sparkles }
]

export default function ExamplePromptsLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPrompts = selectedCategory === 'all'
    ? promptTemplates
    : promptTemplates.filter(p => p.category === selectedCategory)

  const copyToClipboard = async (prompt: PromptTemplate) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      setCopiedId(prompt.id)
      toast.success('Prompt copied to clipboard!')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      toast.error('Failed to copy prompt')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Example Prompts Library
          </CardTitle>
          <CardDescription>
            Copy-paste templates for interacting with agents and skills. Customize the placeholders [in brackets] for your specific needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            <span>These prompts intentionally avoid hardcoding one tool's file paths — see the Structure tab for the exact path per tool.</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.value)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </Button>
          )
        })}
      </div>

      <div className="grid gap-4">
        {filteredPrompts.map((prompt) => {
          const Icon = prompt.icon
          return (
            <Card key={prompt.id} className="hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                      <CardDescription>{prompt.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(prompt)}
                    className="shrink-0"
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border bg-muted/30 p-4">
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono">
                    {prompt.prompt}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-accent/5 border-accent/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            How to Use These Prompts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                1
              </div>
              <div>
                <strong>Copy the prompt template</strong> - Click the "Copy" button on any prompt card
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                2
              </div>
              <div>
                <strong>Customize placeholders</strong> - Replace [bracketed text] with your specific details
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                3
              </div>
              <div>
                <strong>Paste in your AI tool</strong> - Works with Claude Code, Copilot, Cursor, and Codex CLI
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                4
              </div>
              <div>
                <strong>Let the AI pick the right file</strong> - It resolves the correct agent/skill/rule/prompt path for whichever tool you're in
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Pro Tips:</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Start with "Scan Workspace" to detect your project type and get personalized recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Combine prompts with MCP tools for enhanced capabilities (Figma, Chrome, filesystem, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Keep workspace scope in mind - the AI will respect project boundaries automatically</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
