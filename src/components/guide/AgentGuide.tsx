import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Workflow, Play, CheckCircle, Boxes } from 'lucide-react'

export default function AgentGuide() {
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
        'Generate accessibility report using template',
      ],
      tools: ['run-a11y-lint.sh', 'run-axe-playwright.mjs'],
      skills: ['a11y-automation'],
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
        'Provide actionable feedback',
      ],
      tools: ['scope-guard.mjs', 'diagnostics-summarizer.mjs'],
      skills: ['Depends on file types being reviewed'],
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
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-base font-bold">{agent.name}</code>
                    <Badge className={agent.bgColor + ' ' + agent.color} variant="secondary">
                      {agent.badge}
                    </Badge>
                  </div>
                  <CardDescription>{agent.purpose}</CardDescription>
                </div>
                <Workflow className={'h-8 w-8 ' + agent.color} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
