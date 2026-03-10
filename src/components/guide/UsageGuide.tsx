import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BookOpen, MessageSquare, Code2, Workflow, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function UsageGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Usage Guide
          </CardTitle>
          <CardDescription>
            Learn how to effectively use agents and skills in your daily workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-accent/5 border-accent/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                What is the AI Playbook?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                The AI Playbook is a <strong>reusable guide and framework</strong> you copy into your individual project or workspace. 
                It contains agents, skills, and policies that work with your IDE's AI tool (GitHub Copilot, Claude, Cursor, Cline, etc.) 
                to help you build components, review code, audit accessibility, and more.
              </p>
              <p className="text-sm text-muted-foreground">
                Think of it as a <strong>cookbook of best practices</strong> that your AI assistant can reference when working on your code. 
                You install it once per project or once at workspace root, then use your AI tool's chat interface to invoke agents as needed.
              </p>
              <div className="rounded-lg bg-background p-3 mt-3">
                <p className="text-xs font-medium mb-2">Key Points:</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Copy the playbook structure into your project or workspace root</li>
                  <li>AI agents and skills are markdown files that guide your AI tool</li>
                  <li>Works with multiple AI tools (Copilot, Claude, Cursor, Cline, etc.)</li>
                  <li>No scripts to run - just reference files in your AI chat</li>
                  <li>Customize for your project's specific needs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              Basic Workflow
            </h3>
            <p className="text-sm text-muted-foreground">
              The AI Playbook uses an orchestrator pattern that routes your requests to the appropriate agent based on your task. 
              The exact syntax differs slightly between AI tools, but the concept is the same.
            </p>

            <div className="space-y-3">
              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">Step 1</Badge>
                    <CardTitle className="text-base">Describe Your Task</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Simply describe what you want to do in natural language:
                  </p>
                  <div className="rounded-lg bg-background p-3 space-y-2">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-accent">Example 1:</p>
                      <p className="text-sm font-mono">"Create a React button component with accessibility support"</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-accent">Example 2:</p>
                      <p className="text-sm font-mono">"Review the code in UserCard.tsx for improvements"</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-accent">Example 3:</p>
                      <p className="text-sm font-mono">"Audit this page for accessibility issues"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">Step 2</Badge>
                    <CardTitle className="text-base">Agent Routing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    The orchestrator analyzes your request and routes it to the appropriate agent:
                  </p>
                  <div className="grid gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded bg-background">
                      <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                      <span className="font-medium">React component</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">react-component-builder</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-background">
                      <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                      <span className="font-medium">Code review</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">code-reviewer</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-background">
                      <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                      <span className="font-medium">A11y audit</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">a11y-audit-react</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">Step 3</Badge>
                    <CardTitle className="text-base">Agent Execution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    The selected agent loads relevant skills and executes the task following best practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Code2 className="h-5 w-5 text-accent" />
              Common Usage Patterns
            </h3>

            <div className="space-y-3">
              <Card className="border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-accent" />
                    Building Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">When to use:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Creating new React components</li>
                      <li>Adding features to existing components</li>
                      <li>Ensuring accessibility compliance</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <p className="text-xs font-medium">Example prompts:</p>
                    <div className="space-y-1 text-xs font-mono">
                      <div>"Create a modal dialog component with ARIA support"</div>
                      <div>"Add keyboard navigation to the dropdown menu"</div>
                      <div>"Build a data table with sorting and filtering"</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-accent" />
                      What you'll get:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Component code with TypeScript types</li>
                      <li>• Accessibility features built-in</li>
                      <li>• Styling with Tailwind CSS</li>
                      <li>• Best practice patterns applied</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-accent" />
                    Code Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">When to use:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Reviewing code before committing</li>
                      <li>Getting suggestions for improvements</li>
                      <li>Finding potential bugs or issues</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <p className="text-xs font-medium">Example prompts:</p>
                    <div className="space-y-1 text-xs font-mono">
                      <div>"Review the code in UserProfile.tsx"</div>
                      <div>"Check this component for performance issues"</div>
                      <div>"Suggest improvements for this function"</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-accent" />
                      What you'll get:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Inline comments with suggestions</li>
                      <li>• Line-by-line feedback in chat</li>
                      <li>• Security and performance tips</li>
                      <li>• Best practice recommendations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-accent" />
                    Accessibility Audits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">When to use:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Checking WCAG 2.2 compliance</li>
                      <li>Finding keyboard navigation issues</li>
                      <li>Validating ARIA usage</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <p className="text-xs font-medium">Example prompts:</p>
                    <div className="space-y-1 text-xs font-mono">
                      <div>"Audit this page for accessibility"</div>
                      <div>"Check if the form meets WCAG AA standards"</div>
                      <div>"Review keyboard navigation in the sidebar"</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-accent" />
                      What you'll get:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• WCAG 2.2 compliance report in chat</li>
                      <li>• Specific issues with line numbers</li>
                      <li>• Suggested fixes for each issue</li>
                      <li>• Priority levels for remediation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-accent" />
                    Building Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">When to use:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Creating backend APIs or microservices</li>
                      <li>Adding endpoints to existing services</li>
                      <li>Implementing validation and error handling</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <p className="text-xs font-medium">Example prompts:</p>
                    <div className="space-y-1 text-xs font-mono">
                      <div>"Create a REST endpoint for user registration"</div>
                      <div>"Add validation to the POST /orders endpoint"</div>
                      <div>"Build a microservice for payment processing"</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-accent" />
                      What you'll get:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Service code with proper structure</li>
                      <li>• Input validation and error handling</li>
                      <li>• Type-safe implementations</li>
                      <li>• Following ecosystem conventions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              Pro Tips
            </h3>

            <div className="space-y-2">
              <Card className="bg-accent/5 border-accent/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Be Specific</p>
                      <p className="text-xs text-muted-foreground">
                        Include file names, component names, or specific features in your requests for better results
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Iterate</p>
                      <p className="text-xs text-muted-foreground">
                        Start with a basic request, then refine based on the output. The AI maintains context across messages
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Reference Files</p>
                      <p className="text-xs text-muted-foreground">
                        Mention specific files or folders to help the agent understand context and scope
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Ask for Explanations</p>
                      <p className="text-xs text-muted-foreground">
                        Request explanations for suggestions or changes to understand the reasoning
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Use MCP Tools</p>
                      <p className="text-xs text-muted-foreground">
                        Leverage MCP integrations (Chrome, Playwright, GitHub) for enhanced capabilities like testing and deployment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
