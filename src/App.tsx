import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  FolderTree, 
  GitBranch, 
  FileCode, 
  Workflow, 
  BookOpen, 
  Shield,
  Sparkles,
  FileText,
  Terminal,
  Info,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Download,
  HelpCircle,
  MessageSquare,
  Settings,
  Layers
} from 'lucide-react'
import StructureView from '@/components/guide/StructureView'
import AgentGuide from '@/components/guide/AgentGuide'
import SkillGuide from '@/components/guide/SkillGuide'
import ClientLibraryGuide from '@/components/guide/ClientLibraryGuide'
import WorkflowView from '@/components/guide/WorkflowView'
import DataFlowDiagram from '@/components/guide/DataFlowDiagram'
import AlternativeSetups from '@/components/guide/AlternativeSetups'
import OrchestratorGuide from '@/components/guide/OrchestratorGuide'
import MCPIntegrationGuide from '@/components/guide/MCPIntegrationGuide'
import InstallationGuide from '@/components/guide/InstallationGuide'
import UsageGuide from '@/components/guide/UsageGuide'
import ExamplePromptsLibrary from '@/components/guide/ExamplePromptsLibrary'
import WorkspaceRootSetup from '@/components/guide/WorkspaceRootSetup'
import SearchBar from '@/components/guide/SearchBar'
import PolicyRulesGuide from '@/components/guide/PolicyRulesGuide'
import { toast } from 'sonner'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const handleSearchItemSelect = (item: { id: string; title: string; type: string; path: string }) => {
    if (item.type === 'agent') {
      setActiveTab('core')
      toast.success(`Opening ${item.title}`, {
        description: 'Check the Agents section for details'
      })
    } else if (item.type === 'skill') {
      setActiveTab('core')
      toast.success(`Opening ${item.title}`, {
        description: 'Check the Skills section for details'
      })
    } else if (item.type === 'policy') {
      setActiveTab('core')
      toast.success(`Opening ${item.title}`, {
        description: 'Check the Core section for policy details'
      })
    } else if (item.type === 'tool') {
      setActiveTab('core')
      toast.success(`Opening ${item.title}`, {
        description: 'Check the Core section for tool details'
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">AI Playbook Visual Guide</h1>
                <p className="text-sm text-muted-foreground">Understanding agents, skills, and client-specific resources</p>
              </div>
            </div>
            <div className="flex justify-center">
              <SearchBar onItemSelect={handleSearchItemSelect} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <Info className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <Settings className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Setup</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Rules</span>
            </TabsTrigger>
            <TabsTrigger value="core" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <Layers className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Core</span>
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <Terminal className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">AI Tools</span>
            </TabsTrigger>
            <TabsTrigger value="mcp" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <FileCode className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">MCP</span>
            </TabsTrigger>
            <TabsTrigger value="client" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
              <Shield className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Client</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Installation
                  </CardTitle>
                  <CardDescription>How to set up the AI Playbook in your workspace</CardDescription>
                </CardHeader>
              </Card>
              <InstallationGuide />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Workspace Configuration
                  </CardTitle>
                  <CardDescription>Setting up config files at your workspace root</CardDescription>
                </CardHeader>
              </Card>
              <WorkspaceRootSetup />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Usage Guide
                  </CardTitle>
                  <CardDescription>How to use agents and skills effectively</CardDescription>
                </CardHeader>
              </Card>
              <UsageGuide />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Example Prompts
                  </CardTitle>
                  <CardDescription>Ready-to-use prompts for common tasks</CardDescription>
                </CardHeader>
              </Card>
              <ExamplePromptsLibrary />
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <PolicyRulesGuide />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  What is the AI Playbook?
                </CardTitle>
                <CardDescription>
                  A reusable framework for improving developer performance with AI tools across multiple clients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  The AI Playbook is a structured repository that separates concerns into distinct layers:
                  policies, agents, skills, and tools. This separation allows AI assistants to load context
                  progressively (JiT - Just in Time) without overwhelming the model with redundant information.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-muted/50 border-accent/30">
                    <CardHeader className="pb-3">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                        <Shield className="h-5 w-5 text-accent" />
                      </div>
                      <CardTitle className="text-base">Policies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        <Workflow className="h-5 w-5 text-primary" />
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                        <Workflow className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Orchestration layer that coordinates multiple skills to accomplish complex tasks
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-accent/30">
                    <CardHeader className="pb-3">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                        <BookOpen className="h-5 w-5 text-accent" />
                      </div>
                      <CardTitle className="text-base">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Focused procedures for specific tasks like building React components or auditing accessibility
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Key Principles
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Progressive Disclosure:</strong> Load detailed context only when needed to keep AI context lean</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Single Source of Truth:</strong> Each rule lives in exactly one authoritative file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Client Agnostic:</strong> General framework with client-specific extensions kept separate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Multi-Language:</strong> Backend supports Node, Java, Python with ecosystem-specific conventions</span>
                    </li>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-destructive" />
                    What Not to Include
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                      <span>No human-centric documentation (README.md, CHANGELOG.md, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                      <span>No client-specific references in general framework files</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                      <span>No redundant rules across multiple files</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <DataFlowDiagram />

            <WorkflowView />
          </TabsContent>

          <TabsContent value="core" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-primary" />
                    Orchestrator
                  </CardTitle>
                  <CardDescription>Understanding the AI orchestration layer</CardDescription>
                </CardHeader>
              </Card>
              <OrchestratorGuide />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderTree className="h-5 w-5 text-primary" />
                    Repository Structure
                  </CardTitle>
                  <CardDescription>File and folder organization explained</CardDescription>
                </CardHeader>
              </Card>
              <StructureView />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    Agents
                  </CardTitle>
                  <CardDescription>Specialized AI agents and their capabilities</CardDescription>
                </CardHeader>
              </Card>
              <AgentGuide />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Skills
                  </CardTitle>
                  <CardDescription>Reusable skill modules for specific tasks</CardDescription>
                </CardHeader>
              </Card>
              <SkillGuide />
            </div>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-6">
            <AlternativeSetups />
          </TabsContent>

          <TabsContent value="mcp" className="space-y-6">
            <MCPIntegrationGuide />
          </TabsContent>

          <TabsContent value="client" className="space-y-6">
            <ClientLibraryGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
