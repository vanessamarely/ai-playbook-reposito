import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Shield, 
  Workflow, 
  BookOpen, 
  FileText, 
  GitBranch,
  Play,
  RotateCcw
} from 'lucide-react'

type NodeType = 'policy' | 'agent' | 'skill' | 'reference'

interface FlowNode {
  id: string
  type: NodeType
  label: string
  description: string
  files?: string[]
  color: string
}

const flowNodes: FlowNode[] = [
  {
    id: 'policies',
    type: 'policy',
    label: 'Policies',
    description: 'High-level workspace rules, frontend/backend conventions, and output guidelines',
    files: ['workspace-policy.md', 'frontend-policy.md', 'backend-policy.md', 'style-output.md'],
    color: 'bg-accent'
  },
  {
    id: 'agent',
    type: 'agent',
    label: 'Agent',
    description: 'Orchestration layer that coordinates multiple skills to accomplish a task',
    files: ['react-component-builder/AGENT.md', 'a11y-audit-react/AGENT.md'],
    color: 'bg-primary'
  },
  {
    id: 'skill',
    type: 'skill',
    label: 'Skill',
    description: 'Focused procedure for specific task (stays under 500 lines)',
    files: ['react-components/SKILL.md', 'a11y-automation/SKILL.md'],
    color: 'bg-accent'
  },
  {
    id: 'references',
    type: 'reference',
    label: 'References & Assets',
    description: 'Detailed documentation loaded only when needed (JiT)',
    files: ['references/a11y-wcag22.md', 'assets/component-spec.template.md'],
    color: 'bg-muted'
  }
]

export default function DataFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    { from: 'policies', to: 'agent', label: 'Context Loading', description: 'AI loads workspace policies first to understand scope and conventions' },
    { from: 'agent', to: 'skill', label: 'Task Routing', description: 'Agent determines which skill to invoke based on the task' },
    { from: 'skill', to: 'references', label: 'Progressive Disclosure', description: 'Skill loads only necessary references when specific details are needed' },
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setActiveStep(0)
    
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setIsAnimating(false)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const resetAnimation = () => {
    setActiveStep(0)
    setIsAnimating(false)
  }

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'policy': return Shield
      case 'agent': return Workflow
      case 'skill': return BookOpen
      case 'reference': return FileText
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              Interactive Data Flow
            </CardTitle>
            <CardDescription>
              Click play to see how data flows between policies, agents, and skills
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={startAnimation} 
              disabled={isAnimating}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Play
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={resetAnimation}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {flowNodes.map((node, index) => {
                const Icon = getNodeIcon(node.type)
                const isActive = activeStep >= index || (activeStep === steps.length - 1 && index === flowNodes.length - 1)
                
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: isActive ? 1 : 0.95
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card 
                      className={`transition-all duration-300 ${
                        isActive 
                          ? 'border-primary shadow-lg shadow-primary/20' 
                          : 'border-border/50'
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className={`h-12 w-12 rounded-lg ${node.color} ${isActive ? 'opacity-100' : 'opacity-50'} flex items-center justify-center mb-2 transition-opacity`}>
                          <Icon className={`h-6 w-6 ${node.type === 'policy' || node.type === 'skill' ? 'text-accent-foreground' : 'text-primary-foreground'}`} />
                        </div>
                        <CardTitle className="text-base">{node.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {node.description}
                        </p>
                        {node.files && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-foreground/70">Example files:</p>
                            <div className="space-y-1">
                              {node.files.map((file, i) => (
                                <div key={i} className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">
                                  {file}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {index < flowNodes.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <AnimatePresence>
                          {activeStep >= index && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <ArrowRight className="h-6 w-6 text-primary" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              Data Flow Steps
            </h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: activeStep >= index ? 1 : 0.5,
                    x: activeStep === index ? 4 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    activeStep === index 
                      ? 'bg-primary/5 border-primary/30' 
                      : 'bg-muted/20 border-border/50'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    activeStep >= index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{step.label}</h4>
                      <Badge variant="outline" className="text-xs">
                        {step.from} → {step.to}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              Key Principle: Progressive Disclosure
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The AI doesn't load everything at once. It starts with policies (lightweight context), 
              routes through an agent (orchestration), invokes a skill (focused procedure), and only 
              loads detailed references when specifically needed. This keeps the context window lean 
              and prevents redundancy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
