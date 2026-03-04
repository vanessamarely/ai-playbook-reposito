import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Plug, 
  Chrome, 
  GitBranch, 
  Code,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Lightbulb,
  FileText,
  Globe,
  Database,
  Package
} from 'lucide-react'

export default function MCPIntegrationGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-accent" />
            MCP (Model Context Protocol) Integration
          </CardTitle>
          <CardDescription>
            Enhance your AI agents with MCP servers for Chrome automation, Playwright testing, GitHub integration, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>What is MCP?</AlertTitle>
            <AlertDescription className="text-sm">
              Model Context Protocol (MCP) provides standardized servers that AI tools can connect to for enhanced capabilities like browser automation, API access, file system operations, and database queries.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Chrome className="h-4 w-4 text-primary" />
                  Browser Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  MCP Chrome & Playwright servers for UI testing, screenshot capture, and web scraping
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  GitHub Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  MCP GitHub server for repository operations, PR reviews, and issue management
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Available MCP Servers for AI Tools
          </CardTitle>
          <CardDescription>
            Official and community MCP servers that work with Claude, Cursor, and other AI assistants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browser" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="browser" className="text-xs">Browser/Testing</TabsTrigger>
              <TabsTrigger value="github" className="text-xs">GitHub</TabsTrigger>
              <TabsTrigger value="filesystem" className="text-xs">File System</TabsTrigger>
              <TabsTrigger value="database" className="text-xs">Databases</TabsTrigger>
            </TabsList>

            <TabsContent value="browser" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Card className="bg-muted/50 border-accent/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Chrome className="h-4 w-4 text-accent" />
                      @modelcontextprotocol/server-puppeteer
                    </CardTitle>
                    <CardDescription className="text-xs">Chrome automation using Puppeteer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Installation</p>
                      <pre className="text-xs font-mono">
{`npm install -g @modelcontextprotocol/server-puppeteer`}
                      </pre>
                    </div>

                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration (Claude Desktop)</p>
                      <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-puppeteer"
      ]
    }
  }
}`}
                      </pre>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-xs">Capabilities:</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Navigate to URLs and interact with pages</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Take screenshots for visual validation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Click elements, fill forms, extract content</span>
                      </div>
                    </div>

                    <Alert className="bg-primary/10 border-primary/30">
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle className="text-xs">Use with a11y-audit-react Agent</AlertTitle>
                      <AlertDescription className="text-xs">
                        Combine Puppeteer MCP with your accessibility audit agent to automatically navigate components and verify WCAG compliance
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-accent/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Code className="h-4 w-4 text-accent" />
                      @executeautomation/playwright-mcp-server
                    </CardTitle>
                    <CardDescription className="text-xs">Full Playwright automation with testing capabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Installation</p>
                      <pre className="text-xs font-mono">
{`npm install -g @executeautomation/playwright-mcp-server`}
                      </pre>
                    </div>

                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration (Claude Desktop)</p>
                      <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@executeautomation/playwright-mcp-server"
      ]
    }
  }
}`}
                      </pre>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-xs">Capabilities:</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Multi-browser testing (Chrome, Firefox, Safari)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Network interception and mocking</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Advanced selectors and wait strategies</span>
                      </div>
                    </div>

                    <Alert className="bg-primary/10 border-primary/30">
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle className="text-xs">Use with react-component-builder Agent</AlertTitle>
                      <AlertDescription className="text-xs">
                        Let the agent build React components and immediately test them with Playwright to verify functionality and accessibility
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="github" className="space-y-4 mt-4">
              <Card className="bg-muted/50 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-accent" />
                    @modelcontextprotocol/server-github
                  </CardTitle>
                  <CardDescription className="text-xs">Full GitHub API access for repository operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-background p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Installation</p>
                    <pre className="text-xs font-mono">
{`npm install -g @modelcontextprotocol/server-github`}
                    </pre>
                  </div>

                  <div className="bg-background p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration (Claude Desktop)</p>
                    <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}`}
                    </pre>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-xs">Capabilities:</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">Create/update issues and pull requests</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">Search repositories, code, and commits</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">Manage branches, tags, and releases</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">Read/write repository files</span>
                    </div>
                  </div>

                  <Alert className="bg-primary/10 border-primary/30">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle className="text-xs">Use with pr-reviewer Agent</AlertTitle>
                    <AlertDescription className="text-xs">
                      Enable the PR reviewer agent to automatically fetch PR diffs, analyze code changes, and post review comments directly to GitHub
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="filesystem" className="space-y-4 mt-4">
              <Card className="bg-muted/50 border-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    @modelcontextprotocol/server-filesystem
                  </CardTitle>
                  <CardDescription className="text-xs">Safe file system operations with scoped access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-background p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Installation</p>
                    <pre className="text-xs font-mono">
{`npm install -g @modelcontextprotocol/server-filesystem`}
                    </pre>
                  </div>

                  <div className="bg-background p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration (Claude Desktop)</p>
                    <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}`}
                    </pre>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-xs">Capabilities:</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">Read, write, and delete files safely</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">List directory contents and search files</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">Scope-guarded operations (prevents path traversal)</span>
                    </div>
                  </div>

                  <Alert className="bg-primary/10 border-primary/30">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle className="text-xs">Use with scan-workspace Agent</AlertTitle>
                    <AlertDescription className="text-xs">
                      Combine with the workspace scanner to safely analyze project structure and detect frameworks without exposing sensitive areas
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Card className="bg-muted/50 border-accent/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-accent" />
                      @modelcontextprotocol/server-postgres
                    </CardTitle>
                    <CardDescription className="text-xs">PostgreSQL database operations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration (Claude Desktop)</p>
                      <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost/dbname"
      ]
    }
  }
}`}
                      </pre>
                    </div>

                    <Alert className="bg-primary/10 border-primary/30">
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle className="text-xs">Use with node-microservice-builder Agent</AlertTitle>
                      <AlertDescription className="text-xs">
                        Enable the backend agent to query schema, generate migrations, and build API endpoints based on actual database structure
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-accent/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-accent" />
                      @modelcontextprotocol/server-sqlite
                    </CardTitle>
                    <CardDescription className="text-xs">SQLite database operations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration (Claude Desktop)</p>
                      <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "/path/to/database.db"
      ]
    }
  }
}`}
                      </pre>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground mt-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>Perfect for local development and testing with backend agents</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Integrating MCP with AI Playbook Agents
          </CardTitle>
          <CardDescription>
            How to update your agent configurations to leverage MCP capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-accent/10 border-accent/30">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Agent Integration Pattern</AlertTitle>
            <AlertDescription className="text-sm">
              Add MCP tool references to agent frontmatter so AI assistants know which capabilities to use for specific tasks.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Example: Enhanced a11y-audit-react Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`---
description: Audit React components for WCAG 2.2 compliance
tools:
  - file-operations
  - code-analysis
mcp-servers:
  - puppeteer        # For visual testing
  - playwright       # For interaction testing
  - filesystem       # For reading component files
---

# Purpose
Comprehensive accessibility audit combining static analysis 
and runtime testing using MCP browser automation.

## Procedure
1. Read component source using filesystem MCP server
2. Analyze JSX for semantic HTML and ARIA patterns
3. Use puppeteer MCP to:
   - Navigate to component in Storybook/dev server
   - Capture screenshots of different states
   - Test keyboard navigation
   - Verify focus indicators
4. Use playwright MCP to:
   - Run automated axe-core tests
   - Test across multiple browsers
5. Generate findings report with code changes`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Example: Enhanced pr-reviewer Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`---
description: Review pull requests for code quality and standards
tools:
  - code-analysis
  - diff-review
mcp-servers:
  - github           # For fetching PRs and posting comments
  - filesystem       # For reading local workspace files
---

# Purpose
Automated PR review with direct GitHub integration.

## Procedure
1. Use github MCP to:
   - Fetch PR details and file diffs
   - Read existing review comments
   - Check linked issues
2. Use filesystem MCP to read full file context
3. Analyze changes against policies:
   - Load .github/copilot-instructions/workspace-policy.md
   - Load frontend-policy.md or backend-policy.md
   - Check for violations
4. Use github MCP to:
   - Post inline comments on specific lines
   - Request changes or approve
   - Suggest specific code improvements`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Example: Enhanced react-component-builder Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`---
description: Build accessible React components with automated testing
tools:
  - code-generation
  - component-scaffolding
mcp-servers:
  - filesystem       # For writing component files
  - playwright       # For immediate testing
  - github           # For creating feature branches (optional)
---

# Purpose
Build, test, and verify React components in one workflow.

## Procedure
1. Load .github/skills/react-components/SKILL.md
2. Generate component code following accessibility patterns
3. Use filesystem MCP to:
   - Write component file
   - Write test file
   - Write Storybook story
4. Use playwright MCP to:
   - Start dev server if needed
   - Run component tests
   - Capture visual snapshots
5. Verify all tests pass before completing
6. (Optional) Use github MCP to create PR`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-accent" />
            Setting Up MCP Servers by AI Tool
          </CardTitle>
          <CardDescription>
            Tool-specific configuration instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="claude" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="claude" className="text-xs">Claude Desktop</TabsTrigger>
              <TabsTrigger value="cursor" className="text-xs">Cursor</TabsTrigger>
              <TabsTrigger value="cline" className="text-xs">Cline (VSCode)</TabsTrigger>
              <TabsTrigger value="custom" className="text-xs">Custom Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="claude" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Configuration File Location</p>
                  <div className="space-y-1 text-xs font-mono">
                    <div><strong>macOS:</strong> ~/Library/Application Support/Claude/claude_desktop_config.json</div>
                    <div><strong>Windows:</strong> %APPDATA%\Claude\claude_desktop_config.json</div>
                  </div>
                </div>

                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Full Example Configuration</p>
                  <pre className="text-xs font-mono">
{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects"
      ]
    }
  }
}`}
                  </pre>
                </div>

                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle className="text-xs">After Configuration</AlertTitle>
                  <AlertDescription className="text-xs">
                    Restart Claude Desktop to load MCP servers. They'll appear in the tool list when chatting.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="cursor" className="space-y-4 mt-4">
              <Alert className="bg-accent/10 border-accent/30">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle className="text-xs">Cursor MCP Support</AlertTitle>
                <AlertDescription className="text-xs">
                  Cursor is adding native MCP support. Until then, use Cursor's built-in terminal and command execution features, or integrate via API.
                </AlertDescription>
              </Alert>

              <div className="bg-background p-4 rounded-lg">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Workaround: Command-Based Approach</p>
                <pre className="text-xs font-mono">
{`# In .cursorrules or agent instructions
When testing components:
1. Use terminal to run: npx playwright test
2. Ask to execute: npx playwright codegen [url]
3. For GitHub ops: Use gh CLI: gh pr view, gh pr review

When using a11y-audit agent:
1. Run: npm run test:a11y
2. Capture output and analyze
3. Generate fixes based on violations`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="cline" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Cline MCP Configuration</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Cline (VSCode extension) supports MCP servers via settings.json
                  </p>
                  <pre className="text-xs font-mono">
{`// .vscode/settings.json or User Settings
{
  "cline.mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "\${env:GITHUB_TOKEN}"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}`}
                  </pre>
                </div>

                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle className="text-xs">Environment Variables</AlertTitle>
                  <AlertDescription className="text-xs">
                    Store sensitive tokens in environment variables or .env files, reference them with $&#123;env:VAR_NAME&#125;
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 mt-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  For custom AI integrations, MCP servers expose standard stdio interfaces you can connect to programmatically.
                </p>

                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Example: Node.js Integration</p>
                  <pre className="text-xs font-mono">
{`import { spawn } from 'child_process'

// Start MCP server
const mcpServer = spawn('npx', [
  '-y',
  '@modelcontextprotocol/server-github'
], {
  env: { ...process.env, GITHUB_TOKEN: 'ghp_token' }
})

// Communicate via JSON-RPC over stdio
mcpServer.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  method: 'tools/list',
  id: 1
}) + '\\n')

mcpServer.stdout.on('data', (data) => {
  const response = JSON.parse(data.toString())
  // Process available tools
})`}
                  </pre>
                </div>

                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Example: Python Integration</p>
                  <pre className="text-xs font-mono">
{`import subprocess
import json

# Start MCP server
process = subprocess.Popen(
    ['npx', '-y', '@modelcontextprotocol/server-github'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    env={'GITHUB_TOKEN': 'ghp_token'}
)

# Send JSON-RPC request
request = {
    'jsonrpc': '2.0',
    'method': 'tools/call',
    'params': {'name': 'get_repo', 'arguments': {'repo': 'user/repo'}},
    'id': 1
}
process.stdin.write((json.dumps(request) + '\\n').encode())
process.stdin.flush()

# Read response
response = json.loads(process.stdout.readline())`}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Best Practices for MCP with AI Playbook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Document MCP Requirements:</strong>
                <p className="text-xs text-muted-foreground mt-1">
                  In each agent's frontmatter, list required MCP servers so users know what to install
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Graceful Degradation:</strong>
                <p className="text-xs text-muted-foreground mt-1">
                  Agents should provide fallback instructions if MCP servers aren't available
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Scope MCP Access:</strong>
                <p className="text-xs text-muted-foreground mt-1">
                  Configure filesystem MCP with specific allowed directories, use read-only GitHub tokens when possible
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Test Agent + MCP Combos:</strong>
                <p className="text-xs text-muted-foreground mt-1">
                  Validate that agents correctly invoke MCP tools and handle responses before deploying to team
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
