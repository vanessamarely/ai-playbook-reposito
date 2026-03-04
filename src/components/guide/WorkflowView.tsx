import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, GitBranch } from 'lucide-react'

export default function WorkflowView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          Typical AI Workflow
        </CardTitle>
        <CardDescription>
          How the AI loads and uses the playbook progressively
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">AI loads workspace policies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                High-level rules from <code className="bg-muted px-1.5 py-0.5 rounded text-xs">copilot-instructions/</code> are
                loaded to understand project scope, frontend/backend conventions, and output style.
              </p>
              <div className="bg-muted/30 p-2 rounded text-xs space-y-1">
                <div>• workspace-policy.md</div>
                <div>• frontend-policy.md or backend-policy.md</div>
                <div>• style-output.md</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Detect project type (if needed)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The <code className="bg-muted px-1.5 py-0.5 rounded text-xs">scan-workspace</code> agent runs
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">project-detect.mjs</code> to identify
                framework, language, and tooling.
              </p>
              <div className="bg-muted/30 p-2 rounded text-xs">
                Output: "React + TypeScript" or "Node + Express" or "Python + FastAPI"
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Load appropriate agent</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Based on the task, an agent is selected (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">react-component-builder</code>).
                The agent AGENT.md file is loaded with its high-level procedure.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">4</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Load skill procedure</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The agent invokes a skill (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs">react-components</code>).
                Only the SKILL.md is loaded initially (keeping context under 500 lines).
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
              <span className="text-sm font-bold text-accent">5</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Progressive disclosure (JiT loading)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                As the AI needs more detail, it loads specific reference files or templates:
              </p>
              <div className="bg-accent/5 p-2 rounded text-xs space-y-1">
                <div>• <code className="bg-muted px-1.5 py-0.5 rounded">references/a11y-wcag22.md</code> when checking accessibility</div>
                <div>• <code className="bg-muted px-1.5 py-0.5 rounded">assets/component-spec.template.md</code> when creating a spec</div>
                <div>• <code className="bg-muted px-1.5 py-0.5 rounded">references/architecture-patterns.md</code> for Waterworks components</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                This prevents overwhelming the AI with unnecessary context up front.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">6</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Execute and validate</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The AI generates code, runs validation scripts if needed, and produces output following
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">style-output.md</code> guidelines.
              </p>
              <div className="bg-muted/30 p-2 rounded text-xs space-y-1">
                <div>• Minimal diffs</div>
                <div>• Relative paths from target folder</div>
                <div>• Verification commands suggested</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
