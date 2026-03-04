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
  Palette,
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
  aiTool?: 'Claude' | 'Copilot' | 'Cursor' | 'All'
}

const promptTemplates: PromptTemplate[] = [
  {
    id: 'scan-workspace',
    title: 'Scan Workspace',
    description: 'Detect project type and suggest relevant skills',
    category: 'agent',
    icon: Search,
    aiTool: 'All',
    tags: ['setup', 'detection', 'initialization'],
    prompt: `Please analyze this workspace and detect the project type. Follow the scan-workspace agent:

1. Read and execute: .github/agents/scan-workspace/AGENT.md
2. Use the detection script to identify the project structure
3. Suggest which skills are relevant for this project
4. Provide a summary of recommended next steps

Focus on the current directory and respect workspace boundaries.`
  },
  {
    id: 'react-component',
    title: 'Build React Component',
    description: 'Create accessible React component with TypeScript',
    category: 'agent',
    icon: Workflow,
    aiTool: 'All',
    tags: ['react', 'component', 'accessibility', 'typescript'],
    prompt: `I need to create a new React component. Follow the react-component-builder agent:

Component Requirements:
- Name: [ComponentName]
- Purpose: [Brief description]
- Props: [List required props]
- Interactions: [User interactions needed]

Please:
1. Read: .github/agents/react-component-builder/AGENT.md
2. Follow: .github/skills/react-components/SKILL.md
3. Reference: .github/skills/react-components/references/a11y-wcag22.md for accessibility
4. Use TypeScript with proper types
5. Ensure WCAG 2.2 AA compliance
6. Include appropriate ARIA attributes
7. Implement keyboard navigation
8. Add focus management

Output the component code with proper structure.`
  },
  {
    id: 'a11y-audit',
    title: 'Accessibility Audit',
    description: 'Review component for WCAG 2.2 compliance',
    category: 'agent',
    icon: Shield,
    aiTool: 'All',
    tags: ['accessibility', 'audit', 'wcag', 'review'],
    prompt: `Please audit this component for accessibility issues:

[Paste component code or file path]

Follow the a11y-audit-react agent:
1. Read: .github/agents/a11y-audit-react/AGENT.md
2. Reference: .github/skills/a11y-automation/SKILL.md
3. Check against: .github/skills/react-components/references/a11y-wcag22.md

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
    aiTool: 'All',
    tags: ['review', 'pr', 'code-quality', 'suggestions'],
    prompt: `Please review this code change following the pr-reviewer agent:

[Paste code or file paths]

Instructions:
1. Read: .github/agents/pr-reviewer/AGENT.md
2. Check code quality, patterns, and best practices
3. Verify accessibility if frontend code
4. Check for security issues
5. Validate error handling

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
    aiTool: 'All',
    tags: ['node', 'backend', 'api', 'typescript'],
    prompt: `Create a new Node.js microservice endpoint following the node-microservice-builder agent:

Requirements:
- Endpoint: [HTTP method and path]
- Purpose: [What it does]
- Input: [Request body/params]
- Output: [Response format]
- Validation: [Rules]

Please:
1. Read: .github/agents/node-microservice-builder/AGENT.md
2. Follow: .github/skills/node-typescript-service/SKILL.md
3. Reference: .github/skills/node-typescript-service/references/validation-and-errors.md
4. Implement proper error handling
5. Add input validation
6. Include TypeScript types
7. Follow RESTful conventions
8. Add appropriate status codes

Output the service code with proper structure.`
  },
  {
    id: 'react-skill',
    title: 'Apply React Component Skill',
    description: 'Use React component building procedures',
    category: 'skill',
    icon: BookOpen,
    aiTool: 'All',
    tags: ['react', 'skill', 'component', 'procedure'],
    prompt: `I need to build a React component using best practices.

Please follow the React Components skill:
1. Read: .github/skills/react-components/SKILL.md
2. Reference as needed:
   - .github/skills/react-components/references/react-ts-patterns.md
   - .github/skills/react-components/references/a11y-wcag22.md
   - .github/skills/react-components/assets/component-spec.template.md

Component details:
[Describe your component]

Apply the procedures from the skill file step by step.`
  },
  {
    id: 'a11y-skill',
    title: 'Apply A11y Automation Skill',
    description: 'Run accessibility testing and validation',
    category: 'skill',
    icon: Shield,
    aiTool: 'All',
    tags: ['accessibility', 'testing', 'automation'],
    prompt: `I need to test this component for accessibility:

[Component name or path]

Please:
1. Read: .github/skills/a11y-automation/SKILL.md
2. Guide me through running the validation scripts
3. If scripts aren't configured, provide setup instructions
4. Explain how to interpret results
5. Suggest fixes for common issues

Walk me through the automation process step by step.`
  },
  {
    id: 'component-library-setup',
    title: 'Component Library Setup',
    description: 'Configure workspace for custom component library',
    category: 'general',
    icon: Palette,
    aiTool: 'All',
    tags: ['library', 'setup', 'configuration'],
    prompt: `I'm working with a custom component library. Help me set up the workspace:

Library details:
- Name: [Library name]
- Package: [npm package or path]
- Documentation: [Link or path to docs]
- Special conventions: [List any unique patterns]

Please:
1. Read: .github/copilot-instructions/client-library.md
2. Guide me on where to place library-specific documentation
3. Suggest which files to create in /client-docs/ folder
4. Explain how agents will use this context
5. Recommend any overrides needed in client-overrides.md

Help me integrate this library into the AI Playbook workflow.`
  },
  {
    id: 'fix-bug',
    title: 'Debug and Fix Issue',
    description: 'Analyze and resolve a bug with context awareness',
    category: 'general',
    icon: Bug,
    aiTool: 'All',
    tags: ['debugging', 'troubleshooting', 'fix'],
    prompt: `I'm experiencing an issue that needs debugging:

Problem description:
[Describe the issue]

Error message (if any):
[Paste error]

Affected code:
[File path or code snippet]

Please:
1. Analyze the issue considering workspace policies
2. Check if it's related to accessibility, if frontend
3. Identify root cause
4. Propose a fix with minimal changes
5. Explain why this fix works
6. Suggest tests to prevent regression

Follow the scope-guard principles - only modify affected files.`
  },
  {
    id: 'mcp-integration',
    title: 'Use MCP Tool',
    description: 'Integrate Model Context Protocol tools in your workflow',
    category: 'general',
    icon: Sparkles,
    aiTool: 'Claude',
    tags: ['mcp', 'tools', 'integration', 'claude'],
    prompt: `I need to use an MCP tool with this task:

Task: [Describe what you need to do]
MCP Tool: [e.g., @playwright, @chrome, @github, @filesystem]

Please:
1. Explain which MCP tool is best for this task
2. Show me how to invoke it in Claude Desktop
3. Combine it with the relevant agent or skill from ai-playbook
4. Guide me through the workflow
5. Explain what the MCP tool provides vs what the agent does

Example: Use @playwright MCP to test component while following a11y-audit-react agent.`
  },
  {
    id: 'create-skill',
    title: 'Create New Skill',
    description: 'Define a new reusable skill for the playbook',
    category: 'skill',
    icon: Lightbulb,
    aiTool: 'All',
    tags: ['creation', 'skill', 'template'],
    prompt: `I want to create a new skill for the AI Playbook:

Skill purpose: [What problem does it solve]
Skill name: [lowercase-with-hyphens]
Target: [frontend/backend/general]

Please:
1. Read: .github/skills/skill-creator/SKILL.md
2. Use template: .github/skills/skill-creator/assets/skill-template.md
3. Follow checklist: .github/skills/skill-creator/references/checklist.md
4. Validate with: .github/skills/skill-creator/scripts/validate-metadata.py

Help me structure this new skill following the framework conventions.`
  },
  {
    id: 'multi-file-refactor',
    title: 'Multi-File Refactor',
    description: 'Refactor across multiple files safely',
    category: 'general',
    icon: FileCode,
    aiTool: 'All',
    tags: ['refactor', 'scope', 'safety'],
    prompt: `I need to refactor code across multiple files:

Goal: [What you want to achieve]
Affected files: [List files or pattern]
Scope: [Specific directory or workspace root]

Please:
1. Verify scope using workspace-policy.md boundaries
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
    aiTool: 'All',
    tags: ['backend', 'detection', 'conventions'],
    prompt: `Analyze this backend project and apply appropriate conventions:

Project directory: [path]

Please:
1. Read: .github/copilot-instructions/backend-policy.md
2. Detect language: Node/TypeScript, Java, Python, or other
3. Identify framework: Express/Nest, Spring, FastAPI/Django, etc.
4. Check for project config: package.json, pom.xml, pyproject.toml
5. Apply language-specific best practices
6. Suggest appropriate skill: node-typescript-service or other

Then help me with: [your backend task]`
  },
  {
    id: 'orchestrator-task',
    title: 'Complex Task (Orchestrator)',
    description: 'Use orchestrator for multi-step complex tasks',
    category: 'agent',
    icon: Workflow,
    aiTool: 'All',
    tags: ['orchestrator', 'complex', 'multi-step'],
    prompt: `I have a complex task that needs multiple steps:

Goal: [High-level objective]
Context: [Project type and relevant details]

Please act as the orchestrator:
1. Read: .github/orchestrator/ORCHESTRATOR.md
2. Break down this task into steps
3. Identify which agents/skills are needed for each step
4. Load them progressively (JiT - Just in Time)
5. Execute step by step
6. Coordinate between different skills
7. Provide status updates after each step

Execute this complex workflow efficiently.`
  },
  {
    id: 'style-output',
    title: 'Request Formatted Output',
    description: 'Ask for output in a specific style',
    category: 'general',
    icon: MessageSquare,
    aiTool: 'All',
    tags: ['formatting', 'output', 'style'],
    prompt: `Please help me with this task and format output according to style-output.md:

Task: [Your request]

Output requirements:
1. Read: .github/copilot-instructions/style-output.md
2. Provide minimal diffs (show only changed lines)
3. Use relative paths from workspace root
4. No mass reformatting or unrelated changes
5. Include verification commands at the end
6. Show plan first if changes affect multiple files

Present the solution clearly and concisely.`
  },
  {
    id: 'wcag-reference',
    title: 'WCAG 2.2 Quick Reference',
    description: 'Get specific accessibility guidance',
    category: 'skill',
    icon: Shield,
    aiTool: 'All',
    tags: ['wcag', 'accessibility', 'reference'],
    prompt: `I need accessibility guidance for:

Element/Pattern: [e.g., modal dialog, form, navigation menu]

Please:
1. Reference: .github/skills/react-components/references/a11y-wcag22.md
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

  const getAIToolBadgeColor = (tool?: string) => {
    switch (tool) {
      case 'Claude': return 'bg-accent/20 text-accent-foreground border-accent/40'
      case 'Copilot': return 'bg-primary/20 text-primary border-primary/40'
      case 'Cursor': return 'bg-secondary text-secondary-foreground border-secondary'
      default: return 'bg-muted text-muted-foreground border-border'
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
            <span>Tip: These prompts work with Claude, GitHub Copilot, Cursor, and other AI tools that support file references.</span>
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
                  {prompt.aiTool && (
                    <Badge variant="outline" className={getAIToolBadgeColor(prompt.aiTool)}>
                      {prompt.aiTool}
                    </Badge>
                  )}
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
                <strong>Paste in your AI tool</strong> - Works with Claude, Copilot Chat, Cursor, and others
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                4
              </div>
              <div>
                <strong>Let the AI guide you</strong> - The prompts reference the correct agent/skill files automatically
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
                <span>Use "Complex Task (Orchestrator)" for multi-step workflows that need coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Combine prompts with MCP tools in Claude Desktop for enhanced capabilities</span>
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
