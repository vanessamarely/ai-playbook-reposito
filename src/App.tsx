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
  XCircle
} from 'lucide-react'
import StructureView from '@/components/guide/StructureView'
import AgentGuide from '@/components/guide/AgentGuide'
import SkillGuide from '@/components/guide/SkillGuide'
import ClientLibraryGuide from '@/components/guide/ClientLibraryGuide'
import WorkflowView from '@/components/guide/WorkflowView'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Playbook Visual Guide</h1>
              <p className="text-sm text-muted-foreground">Understanding agents, skills, and client-specific resources</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FolderTree className="h-4 w-4" />
              <span className="hidden sm:inline">Structure</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Workflow className="h-4 w-4" />
              <span className="hidden sm:inline">Agents</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="client" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Client Setup</span>
            </TabsTrigger>
          </TabsList>

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
                        High-level rules for workspace scope, frontend/backend standards, and output style
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

            <WorkflowView />
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <StructureView />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentGuide />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillGuide />
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
