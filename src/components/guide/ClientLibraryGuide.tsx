import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Shield, FolderOpen, FileText, AlertCircle, Lightbulb, Package } from 'lucide-react'

export default function ClientLibraryGuide() {
  return (
    <div className="space-y-6">
      <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-900 dark:text-orange-100">Client-Specific vs General Framework</AlertTitle>
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          The general AI Playbook framework is reusable across all projects. Client-specific implementations
          (like component libraries with custom conventions) are kept separate to maintain portability and avoid coupling.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Client Component Library Setup
          </CardTitle>
          <CardDescription>
            How to document client-specific component libraries with unique style rules and architectural patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-accent" />
              Where Client Library Documentation Lives
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <FolderOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <code className="font-medium">.github/copilot-instructions/[library-name]-overrides.md</code>
                  <p className="text-muted-foreground mt-1">
                    Copilot-specific overrides for client library style rules (naming conventions, code style, etc.)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FolderOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <code className="font-medium">.github/skills/[library-name]/</code>
                  <p className="text-muted-foreground mt-1">
                    Dedicated skill with references to architecture patterns and code style
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-900 dark:text-green-100">✓ Client Library-Specific</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1.5 text-green-800 dark:text-green-200">
                <li>Custom code style conventions</li>
                <li>Client-specific naming patterns</li>
                <li>Unique architecture patterns</li>
                <li>Private component library documentation</li>
                <li>Design system and token references</li>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-900 dark:text-blue-100">✓ General Framework</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1.5 text-blue-800 dark:text-blue-200">
                <li>Reusable across all clients</li>
                <li>Standard TypeScript conventions</li>
                <li>WCAG 2.2 accessibility requirements</li>
                <li>Generic component building skills</li>
                <li>Multi-language backend support</li>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            How to Document Your Own Client Library
          </CardTitle>
          <CardDescription>
            Follow this pattern when working with client-specific component libraries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">1</Badge>
              <div>
                <h4 className="font-semibold text-sm">Create a dedicated skill directory</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Example: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/skills/your-library-name/</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">2</Badge>
              <div>
                <h4 className="font-semibold text-sm">Add client-specific overrides</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs">copilot-instructions/your-library-overrides.md</code> for
                  style rules that differ from the general framework
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">3</Badge>
              <div>
                <h4 className="font-semibold text-sm">Document architecture patterns</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Store detailed patterns in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">references/architecture-patterns.md</code> to
                  be loaded JiT (Just in Time)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">4</Badge>
              <div>
                <h4 className="font-semibold text-sm">Provide component templates</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Include example code in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">assets/component-template.tsx</code> following
                  your library's conventions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">5</Badge>
              <div>
                <h4 className="font-semibold text-sm">Add additional context resources</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Include design system docs, API references, or other materials that help AI understand your library
                </p>
              </div>
            </div>
          </div>

          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Additional Context Files</AlertTitle>
            <AlertDescription className="text-xs">
              For rich context about specific library components or patterns, create reference files that can be loaded
              on-demand. This keeps the main SKILL.md lean while providing deep context when needed.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Example: Client Library Skill Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg font-mono text-xs space-y-2">
            <div className="text-muted-foreground">[library-name]/</div>
            <div className="ml-4">
              <div className="text-foreground">├── SKILL.md <span className="text-muted-foreground">(Main procedure, under 500 lines)</span></div>
              <div className="text-foreground">├── references/</div>
              <div className="ml-4">
                <div className="text-foreground">│   ├── code-style.md <span className="text-muted-foreground">(Code style rationale)</span></div>
                <div className="text-foreground">│   ├── architecture-patterns.md <span className="text-muted-foreground">(Component patterns)</span></div>
                <div className="text-foreground">│   └── design-system.md <span className="text-muted-foreground">(Optional: design tokens)</span></div>
              </div>
              <div className="text-foreground">└── assets/</div>
              <div className="ml-4">
                <div className="text-foreground">    ├── component-template.tsx <span className="text-muted-foreground">(Example component)</span></div>
                <div className="text-foreground">    └── hook-template.ts <span className="text-muted-foreground">(Optional: hook examples)</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-primary/20 bg-primary/5">
        <Lightbulb className="h-4 w-4 text-primary" />
        <AlertTitle>Best Practice: Keep Client Work Separate</AlertTitle>
        <AlertDescription className="text-sm">
          Never reference client-specific rules in the general framework skills like
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs mx-1">react-components</code>.
          This ensures the AI Playbook remains reusable across all your projects and clients.
        </AlertDescription>
      </Alert>
    </div>
  )
}
