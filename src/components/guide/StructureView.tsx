import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FolderTree, FileCode, Braces, Wrench } from 'lucide-react'

export default function StructureView() {
  const structure = [
    {
      name: '.github/',
      type: 'directory',
      icon: FolderTree,
      description: 'Root GitHub configuration directory',
      children: [
        {
          name: 'copilot-instructions/',
          type: 'directory',
          icon: FileCode,
          badge: 'Policies',
          description: 'High-level rules loaded by GitHub Copilot',
          items: [
            { name: 'workspace-policy.md', desc: 'Project isolation & scope rules' },
            { name: 'frontend-policy.md', desc: 'React/TS + accessibility guidelines' },
            { name: 'backend-policy.md', desc: 'Multi-language backend conventions' },
            { name: '[library-name]-overrides.md', desc: 'Client-specific style rules (optional)' },
            { name: 'style-output.md', desc: 'Output formatting standards' },
          ],
        },
        {
          name: 'agents/',
          type: 'directory',
          icon: Braces,
          badge: 'Orchestration',
          description: 'Complex task coordinators',
          items: [
            { name: 'scan-workspace/', desc: 'Detect project type & route to skills' },
            { name: 'react-component-builder/', desc: 'Build accessible React components' },
            { name: 'a11y-audit-react/', desc: 'Audit accessibility compliance' },
            { name: 'node-microservice-builder/', desc: 'Create Node.js services' },
            { name: 'pr-reviewer/', desc: 'Review pull requests' },
          ],
        },
        {
          name: 'skills/',
          type: 'directory',
          icon: Wrench,
          badge: 'Procedures',
          description: 'Focused task procedures',
          items: [
            { name: 'skill-creator/', desc: 'Generate new skills with templates' },
            { name: 'react-components/', desc: 'Build React/TS components' },
            { name: '[library-name]/', desc: 'Client component library (optional)' },
            { name: 'node-typescript-service/', desc: 'Node/TS service development' },
            { name: 'a11y-automation/', desc: 'Accessibility testing automation' },
          ],
        },
        {
          name: 'specs/',
          type: 'directory',
          icon: FileCode,
          badge: 'Templates',
          description: 'Specification templates',
          items: [
            { name: 'templates/react-component.spec.md', desc: 'Component spec template' },
            { name: 'templates/node-endpoint.spec.md', desc: 'Endpoint spec template' },
          ],
        },
      ],
    },
    {
      name: 'tools/',
      type: 'directory',
      icon: Wrench,
      description: 'Deterministic utility scripts',
      items: [
        { name: 'project-detect.mjs', desc: 'Detect project type from structure' },
        { name: 'scope-guard.mjs', desc: 'Validate file changes stay in scope' },
        { name: 'diagnostics-summarizer.mjs', desc: 'Summarize build/lint errors' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary" />
            Repository Structure
          </CardTitle>
          <CardDescription>
            Organization of policies, agents, skills, and tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {structure.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-accent" />
                  <code className="text-sm font-semibold bg-muted px-2 py-1 rounded">
                    {item.name}
                  </code>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </div>

                {item.children && (
                  <div className="ml-8 space-y-4 border-l-2 border-border pl-6">
                    {item.children.map((child, childIdx) => (
                      <Card key={childIdx} className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <child.icon className="h-4 w-4 text-primary" />
                            <code className="text-sm font-medium">{child.name}</code>
                            <Badge variant="secondary" className="text-xs">
                              {child.badge}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">{child.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-1.5">
                            {child.items.map((subItem, subIdx) => (
                              <li key={subIdx} className="flex items-start gap-2 text-xs">
                                <span className="text-accent mt-1">●</span>
                                <div>
                                  <code className="font-medium text-foreground">{subItem.name}</code>
                                  <span className="text-muted-foreground ml-2">{subItem.desc}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {item.items && !item.children && (
                  <div className="ml-8 border-l-2 border-border pl-6">
                    <ul className="space-y-1.5">
                      {item.items.map((subItem, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-accent mt-1">●</span>
                          <div>
                            <code className="font-medium text-foreground">{subItem.name}</code>
                            <span className="text-muted-foreground ml-2">{subItem.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
