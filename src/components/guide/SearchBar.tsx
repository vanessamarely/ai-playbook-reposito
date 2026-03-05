import { useState, useEffect, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, X, FileCode, BookOpen, FileText, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchableItem {
  id: string
  title: string
  description: string
  type: 'agent' | 'skill' | 'policy' | 'tool'
  category?: string
  triggers?: string[]
  path: string
  content?: string
}

interface SearchBarProps {
  onItemSelect?: (item: SearchableItem) => void
}

const SEARCHABLE_DATA: SearchableItem[] = [
  {
    id: 'scan-workspace',
    title: 'Scan Workspace',
    description: 'Scan a workspace folder to detect project type and route to appropriate skills',
    type: 'agent',
    category: 'Detection',
    path: 'ai-playbook/.github/agents/scan-workspace/AGENT.md',
  },
  {
    id: 'react-component-builder',
    title: 'React Component Builder',
    description: 'Build React components with TypeScript, accessibility, and best practices',
    type: 'agent',
    category: 'Frontend',
    path: 'ai-playbook/.github/agents/react-component-builder/AGENT.md',
  },
  {
    id: 'a11y-audit-react',
    title: 'Accessibility Audit React',
    description: 'Audit React components for WCAG 2.2 compliance and accessibility issues',
    type: 'agent',
    category: 'Accessibility',
    path: 'ai-playbook/.github/agents/a11y-audit-react/AGENT.md',
  },
  {
    id: 'node-microservice-builder',
    title: 'Node Microservice Builder',
    description: 'Build Node.js/TypeScript microservices with validation and error handling',
    type: 'agent',
    category: 'Backend',
    path: 'ai-playbook/.github/agents/node-microservice-builder/AGENT.md',
  },
  {
    id: 'pr-reviewer',
    title: 'PR Reviewer',
    description: 'Review pull requests for code quality, security, and best practices',
    type: 'agent',
    category: 'Quality',
    path: 'ai-playbook/.github/agents/pr-reviewer/AGENT.md',
  },
  {
    id: 'code-reviewer',
    title: 'Code Reviewer',
    description: 'Review code inline with actionable suggestions and enhancement recommendations',
    type: 'agent',
    category: 'Quality',
    path: 'ai-playbook/.github/agents/code-reviewer/AGENT.md',
  },
  {
    id: 'react-components-skill',
    title: 'React Components',
    description: 'Creates and modifies React components using TypeScript, Tailwind CSS, shadcn/ui, and WCAG 2.2 Level AA accessibility patterns',
    type: 'skill',
    category: 'Frontend',
    triggers: ['creating a React component', 'building a UI component', 'implement component', 'add keyboard navigation', 'fix accessibility'],
    path: 'ai-playbook/.github/skills/react-components/SKILL.md',
  },
  {
    id: 'a11y-automation-skill',
    title: 'Accessibility Automation',
    description: 'Automated accessibility testing using jest-axe, React Testing Library, and Playwright',
    type: 'skill',
    category: 'Accessibility',
    triggers: ['test accessibility', 'run a11y tests', 'automated accessibility', 'axe testing'],
    path: 'ai-playbook/.github/skills/a11y-automation/SKILL.md',
  },
  {
    id: 'node-typescript-service-skill',
    title: 'Node TypeScript Service',
    description: 'Build Node.js/TypeScript services with validation, error handling, and testing',
    type: 'skill',
    category: 'Backend',
    triggers: ['create service', 'build endpoint', 'Node.js service', 'TypeScript API'],
    path: 'ai-playbook/.github/skills/node-typescript-service/SKILL.md',
  },
  {
    id: 'skill-creator-skill',
    title: 'Skill Creator',
    description: 'Create new skill definitions following the AI Playbook structure and conventions',
    type: 'skill',
    category: 'Meta',
    triggers: ['create skill', 'new skill', 'define skill'],
    path: 'ai-playbook/.github/skills/skill-creator/SKILL.md',
  },
  {
    id: 'ai-tool-setup-skill',
    title: 'AI Tool Setup',
    description: 'Configure AI tools (GitHub Copilot, Claude, Cursor, Cline) with proper instruction files',
    type: 'skill',
    category: 'Setup',
    triggers: ['setup AI tool', 'configure Copilot', 'configure Claude', 'configure Cursor'],
    path: 'ai-playbook/.github/skills/ai-tool-setup/SKILL.md',
  },
  {
    id: 'workspace-policy',
    title: 'Workspace Policy',
    description: 'Project isolation rules for multi-repo workspaces with exclusions and scope management',
    type: 'policy',
    category: 'Policy',
    path: 'ai-playbook/.github/copilot-instructions/workspace-policy.md',
  },
  {
    id: 'frontend-policy',
    title: 'Frontend Policy',
    description: 'React + TypeScript best practices with WCAG 2.2 accessibility requirements',
    type: 'policy',
    category: 'Policy',
    path: 'ai-playbook/.github/copilot-instructions/frontend-policy.md',
  },
  {
    id: 'backend-policy',
    title: 'Backend Policy',
    description: 'Multi-language backend guidelines for Node, Java, and Python projects',
    type: 'policy',
    category: 'Policy',
    path: 'ai-playbook/.github/copilot-instructions/backend-policy.md',
  },
  {
    id: 'style-output',
    title: 'Style Output',
    description: 'Output formatting rules for minimal diffs and clear verification commands',
    type: 'policy',
    category: 'Policy',
    path: 'ai-playbook/.github/copilot-instructions/style-output.md',
  },
  {
    id: 'project-detect',
    title: 'Project Detect',
    description: 'Detect project type by checking for common indicators and configuration files',
    type: 'tool',
    category: 'Detection',
    path: 'ai-playbook/tools/project-detect.mjs',
  },
  {
    id: 'scope-guard',
    title: 'Scope Guard',
    description: 'Validate that file changes stay within target scope and prevent cross-folder modifications',
    type: 'tool',
    category: 'Validation',
    path: 'ai-playbook/tools/scope-guard.mjs',
  },
  {
    id: 'diagnostics-summarizer',
    title: 'Diagnostics Summarizer',
    description: 'Summarize error logs and diagnostics into actionable insights',
    type: 'tool',
    category: 'Analysis',
    path: 'ai-playbook/tools/diagnostics-summarizer.mjs',
  },
]

const TYPE_ICONS = {
  agent: FileCode,
  skill: BookOpen,
  policy: FileText,
  tool: Zap,
}

const TYPE_COLORS = {
  agent: 'bg-primary/10 text-primary border-primary/30',
  skill: 'bg-accent/10 text-accent border-accent/30',
  policy: 'bg-secondary text-secondary-foreground border-border',
  tool: 'bg-muted text-muted-foreground border-border',
}

export default function SearchBar({ onItemSelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredResults = useMemo(() => {
    if (!query.trim() && selectedType === 'all') return []

    let results = SEARCHABLE_DATA

    if (selectedType !== 'all') {
      results = results.filter((item) => item.type === selectedType)
    }

    if (query.trim()) {
      const lowerQuery = query.toLowerCase()
      results = results.filter((item) => {
        const matchesTitle = item.title.toLowerCase().includes(lowerQuery)
        const matchesDescription = item.description.toLowerCase().includes(lowerQuery)
        const matchesCategory = item.category?.toLowerCase().includes(lowerQuery)
        const matchesTriggers = item.triggers?.some((trigger) =>
          trigger.toLowerCase().includes(lowerQuery)
        )
        return matchesTitle || matchesDescription || matchesCategory || matchesTriggers
      })
    }

    return results
  }, [query, selectedType])

  useEffect(() => {
    if (query.trim() || selectedType !== 'all') {
      setIsOpen(true)
    }
  }, [query, selectedType])

  const handleItemClick = (item: SearchableItem) => {
    onItemSelect?.(item)
    setQuery('')
    setIsOpen(false)
    setSelectedType('all')
  }

  const handleClear = () => {
    setQuery('')
    setSelectedType('all')
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search agents, skills, policies, or tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => (query.trim() || selectedType !== 'all') && setIsOpen(true)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {(query || selectedType !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        <Badge
          variant={selectedType === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedType('all')}
        >
          All
        </Badge>
        <Badge
          variant={selectedType === 'agent' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedType('agent')}
        >
          <FileCode className="h-3 w-3 mr-1" />
          Agents
        </Badge>
        <Badge
          variant={selectedType === 'skill' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedType('skill')}
        >
          <BookOpen className="h-3 w-3 mr-1" />
          Skills
        </Badge>
        <Badge
          variant={selectedType === 'policy' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedType('policy')}
        >
          <FileText className="h-3 w-3 mr-1" />
          Policies
        </Badge>
        <Badge
          variant={selectedType === 'tool' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedType('tool')}
        >
          <Zap className="h-3 w-3 mr-1" />
          Tools
        </Badge>
      </div>

      {isOpen && filteredResults.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg border-primary/20">
          <ScrollArea className="max-h-[400px]">
            <CardContent className="p-2">
              <div className="space-y-1">
                {filteredResults.map((item) => {
                  const Icon = TYPE_ICONS[item.type]
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${TYPE_COLORS[item.type]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            {item.category && (
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          {item.triggers && item.triggers.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {item.triggers.slice(0, 3).map((trigger, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs px-1.5 py-0"
                                >
                                  {trigger}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      )}

      {isOpen && filteredResults.length === 0 && (query.trim() || selectedType !== 'all') && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg border-border">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search or filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
