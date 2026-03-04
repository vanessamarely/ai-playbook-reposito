import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Lightbulb, 
  Terminal, 
  FileText, 
  Folder,
  ArrowRight,
  CheckCircle2,
  Code,
  Settings
} from 'lucide-react'

export default function AlternativeSetups() {
  return (
    <div className="space-y-6">
      <Card className="border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" />
            Alternative AI Tool Configurations
          </CardTitle>
          <CardDescription>
            How to adapt the AI Playbook structure for different AI coding assistants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Not using GitHub Copilot?</AlertTitle>
            <AlertDescription className="text-sm">
              The AI Playbook structure works with any AI assistant. The key is adapting the configuration location and loading mechanism to match your tool's conventions.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="copilot" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 h-auto gap-2 bg-muted/50 p-2">
              <TabsTrigger value="copilot" className="text-xs">GitHub Copilot</TabsTrigger>
              <TabsTrigger value="claude" className="text-xs">Claude Projects</TabsTrigger>
              <TabsTrigger value="cursor" className="text-xs">Cursor Rules</TabsTrigger>
              <TabsTrigger value="openai" className="text-xs">OpenAI Codex</TabsTrigger>
              <TabsTrigger value="gemini" className="text-xs">Gemini CLI</TabsTrigger>
              <TabsTrigger value="cline" className="text-xs">Cline</TabsTrigger>
              <TabsTrigger value="amazonq" className="text-xs">Amazon Q</TabsTrigger>
              <TabsTrigger value="tabnine" className="text-xs">Tabnine</TabsTrigger>
              <TabsTrigger value="other" className="text-xs">Other Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="copilot" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Structure</h4>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`.github/
├── copilot-instructions/
│   ├── workspace-policy.md
│   ├── frontend-policy.md
│   ├── backend-policy.md
│   └── style-output.md
├── agents/
├── skills/
└── specs/`}
                  </pre>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>GitHub Copilot automatically reads files from <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/copilot-instructions/</code></span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>Progressive loading: reference agents/skills by path when needed</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="claude" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Structure Options</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Option 1</Badge>
                      Cursor/Claude Project Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.cursorrules          (or .claude/project.md)
.github/
├── agents/
├── skills/
└── specs/
docs/
└── ai-context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    └── backend-policy.md`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Put high-level policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code> or project config</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Move detailed policies to <code className="bg-muted px-1.5 py-0.5 rounded text-xs">docs/ai-context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference agents/skills by path: "Load .github/skills/react-components/SKILL.md"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Option 2</Badge>
                      Keep Original Structure + Root Pointer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.cursorrules          (or .claude/project.md)
.github/
├── copilot-instructions/  (keep as-is)
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Add root file (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code>) that references policy files</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Example content: "Follow policies in .github/copilot-instructions/*.md"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Maintains compatibility with both Copilot and Claude/Cursor</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-accent/10 border-accent/30">
                <Code className="h-4 w-4" />
                <AlertTitle className="text-sm">Example .cursorrules</AlertTitle>
                <AlertDescription>
                  <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`# AI Playbook Configuration

Follow workspace policies defined in:
- .github/copilot-instructions/workspace-policy.md
- .github/copilot-instructions/frontend-policy.md
- .github/copilot-instructions/backend-policy.md

When asked to perform complex tasks:
1. Check .github/agents/ for orchestration guidance
2. Load specific skills from .github/skills/ as needed
3. Follow progressive disclosure - read references/ only when required`}
                  </pre>
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="cursor" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Cursor-Specific Setup</h4>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs font-mono">
{`.cursorrules          (main entry point)
.cursor/
├── rules/
│   ├── workspace.md
│   ├── frontend.md
│   └── backend.md
.github/
├── agents/
├── skills/
└── specs/`}
                  </pre>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Cursor reads <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code> automatically</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Optionally organize rules in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursor/rules/</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>Reference .github/* structure for agents/skills (same as Copilot)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="openai" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">OpenAI Codex Integration</h4>
                </div>
                
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>What is OpenAI Codex?</AlertTitle>
                  <AlertDescription className="text-sm">
                    OpenAI Codex powers GitHub Copilot and is also available via OpenAI's API. You can integrate it directly into custom editors, CLI tools, or IDEs using the API or specialized clients.
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 1</Badge>
                      OpenAI API with System Prompts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use OpenAI's Chat Completions API to send code context from your AI Playbook:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`# Project Structure
.openai/
├── config.json
└── context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    └── backend-policy.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Store policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.openai/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Load policies as system messages in API calls</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference agents/skills dynamically based on task type</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example Python Integration</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`import openai
import os

def load_policy(policy_file):
    """Load a policy file from .openai/context/"""
    with open(f'.openai/context/{policy_file}', 'r') as f:
        return f.read()

def load_skill(skill_path):
    """Load a skill from .github/skills/"""
    with open(f'.github/skills/{skill_path}/SKILL.md', 'r') as f:
        return f.read()

def codegen_with_playbook(task_description, task_type="frontend"):
    """Generate code using OpenAI with AI Playbook context"""
    
    # Load base policies
    workspace_policy = load_policy('workspace-policy.md')
    
    if task_type == "frontend":
        specific_policy = load_policy('frontend-policy.md')
        # Load React component skill if needed
        skill_context = load_skill('react-components')
    elif task_type == "backend":
        specific_policy = load_policy('backend-policy.md')
        skill_context = load_skill('node-typescript-service')
    else:
        specific_policy = ""
        skill_context = ""
    
    # Build system prompt with policies
    system_prompt = f"""You are a code generation assistant following the AI Playbook framework.

## Workspace Policy
{workspace_policy}

## Specific Policy
{specific_policy}

## Skill Context
{skill_context}

Follow these guidelines strictly when generating code. Use progressive disclosure - only apply detailed rules when relevant to the task."""

    # Call OpenAI API
    response = openai.chat.completions.create(
        model="gpt-4",  # or "gpt-3.5-turbo"
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": task_description}
        ],
        temperature=0.7
    )
    
    return response.choices[0].message.content

# Example usage
result = codegen_with_playbook(
    "Create an accessible button component with hover states",
    task_type="frontend"
)
print(result)`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 2</Badge>
                      OpenAI Functions for Agent Routing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use OpenAI function calling to dynamically route to appropriate agents:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`# Define functions that map to your agents
functions = [
    {
        "name": "react_component_builder",
        "description": "Build React components following WCAG 2.2",
        "parameters": {
            "type": "object",
            "properties": {
                "component_name": {"type": "string"},
                "requirements": {"type": "string"}
            }
        }
    },
    {
        "name": "a11y_audit",
        "description": "Audit code for accessibility issues",
        "parameters": {
            "type": "object",
            "properties": {
                "code": {"type": "string"},
                "framework": {"type": "string"}
            }
        }
    },
    {
        "name": "pr_reviewer",
        "description": "Review pull requests for code quality",
        "parameters": {
            "type": "object",
            "properties": {
                "diff": {"type": "string"},
                "focus_areas": {"type": "array"}
            }
        }
    }
]

# OpenAI will automatically route to the right function
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": user_task}],
    functions=functions,
    function_call="auto"
)`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Each function maps to an agent in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.github/agents/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>OpenAI automatically selects the right agent based on user input</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Load agent AGENT.md file and execute its procedure</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 3</Badge>
                      VS Code Extension with OpenAI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Build a custom VS Code extension that uses OpenAI Codex with your AI Playbook:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`// VS Code Extension (TypeScript)
import * as vscode from 'vscode';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    // Register command
    let disposable = vscode.commands.registerCommand(
        'ai-playbook.generateCode',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
            if (!workspaceRoot) return;

            // Load policies from .openai/context/
            const workspacePolicy = fs.readFileSync(
                path.join(workspaceRoot, '.openai/context/workspace-policy.md'),
                'utf-8'
            );

            // Determine file type and load appropriate policy
            const fileName = editor.document.fileName;
            let specificPolicy = '';
            
            if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
                specificPolicy = fs.readFileSync(
                    path.join(workspaceRoot, '.openai/context/frontend-policy.md'),
                    'utf-8'
                );
            }

            // Get user input
            const prompt = await vscode.window.showInputBox({
                prompt: 'Describe what you want to generate'
            });

            if (!prompt) return;

            // Call OpenAI with policies as system context
            const completion = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: \`Follow these policies:\\n\\n\${workspacePolicy}\\n\\n\${specificPolicy}\`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            });

            // Insert generated code
            const code = completion.choices[0].message.content;
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, code || '');
            });
        }
    );

    context.subscriptions.push(disposable);
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 4</Badge>
                      CLI Tool with OpenAI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Create a command-line tool for code generation with AI Playbook context:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`#!/usr/bin/env node
// ai-playbook-cli.js

const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generate(taskType, description) {
  const root = process.cwd();
  
  // Load workspace policy
  const workspacePolicy = fs.readFileSync(
    path.join(root, '.openai/context/workspace-policy.md'),
    'utf-8'
  );
  
  // Load task-specific policy and skill
  let policy = '';
  let skill = '';
  
  if (taskType === 'component') {
    policy = fs.readFileSync(
      path.join(root, '.openai/context/frontend-policy.md'),
      'utf-8'
    );
    skill = fs.readFileSync(
      path.join(root, '.github/skills/react-components/SKILL.md'),
      'utf-8'
    );
  } else if (taskType === 'service') {
    policy = fs.readFileSync(
      path.join(root, '.openai/context/backend-policy.md'),
      'utf-8'
    );
    skill = fs.readFileSync(
      path.join(root, '.github/skills/node-typescript-service/SKILL.md'),
      'utf-8'
    );
  }
  
  const systemPrompt = \`AI Playbook Context:

\${workspacePolicy}

\${policy}

\${skill}

Generate code following these guidelines.\`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: description }
    ]
  });
  
  return completion.choices[0].message.content;
}

// CLI usage
const [,, taskType, ...descriptionParts] = process.argv;
const description = descriptionParts.join(' ');

if (!taskType || !description) {
  console.error('Usage: ai-playbook-cli <component|service> <description>');
  process.exit(1);
}

generate(taskType, description)
  .then(code => console.log(code))
  .catch(err => console.error(err));

// Example usage:
// $ ai-playbook-cli component "accessible button with icon"
// $ ai-playbook-cli service "REST endpoint for user auth"`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example .openai/config.json</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`{
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 2000,
  "context_files": {
    "workspace": ".openai/context/workspace-policy.md",
    "frontend": ".openai/context/frontend-policy.md",
    "backend": ".openai/context/backend-policy.md",
    "style": ".openai/context/style-output.md"
  },
  "agents": {
    "directory": ".github/agents",
    "available": [
      "react-component-builder",
      "node-microservice-builder",
      "a11y-audit-react",
      "pr-reviewer"
    ]
  },
  "skills": {
    "directory": ".github/skills",
    "load_on_demand": true
  },
  "progressive_disclosure": true
}`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Advanced</Badge>
                      Embeddings for Semantic Search
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use OpenAI embeddings to find relevant skills/agents based on task description:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`import openai
import numpy as np
from pathlib import Path

def embed_text(text):
    """Get embedding for text"""
    response = openai.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding

def cosine_similarity(a, b):
    """Calculate similarity between embeddings"""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def find_relevant_skills(task_description):
    """Find skills relevant to the task"""
    
    # Embed the task
    task_embedding = embed_text(task_description)
    
    # Embed all skills (cache these in production)
    skills_dir = Path('.github/skills')
    skill_scores = []
    
    for skill_path in skills_dir.glob('*/SKILL.md'):
        skill_content = skill_path.read_text()
        skill_embedding = embed_text(skill_content[:1000])  # First 1000 chars
        
        similarity = cosine_similarity(task_embedding, skill_embedding)
        skill_scores.append((skill_path, similarity))
    
    # Return top 3 most relevant skills
    skill_scores.sort(key=lambda x: x[1], reverse=True)
    return [str(path) for path, score in skill_scores[:3]]

# Usage
task = "Build an accessible form with validation"
relevant_skills = find_relevant_skills(task)
print(f"Most relevant skills: {relevant_skills}")

# Load those skills as context for OpenAI
for skill_path in relevant_skills:
    skill_content = Path(skill_path).read_text()
    # Add to system prompt...`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Automatically finds relevant skills without manual routing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Cache embeddings to avoid repeated API calls</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Load only the most relevant context (progressive disclosure)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="text-sm">OpenAI vs GitHub Copilot</AlertTitle>
                  <AlertDescription className="text-sm space-y-2">
                    <p><strong>GitHub Copilot:</strong> Built-in IDE integration, reads .github/copilot-instructions/ automatically</p>
                    <p><strong>OpenAI API:</strong> More flexible, requires custom integration, but allows full control over context loading and routing logic</p>
                    <p className="text-xs text-muted-foreground mt-2">Both use the same underlying Codex models, so your AI Playbook content works with both approaches.</p>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span><strong>Progressive Loading:</strong> Don't send all policies/skills at once - load based on task type</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span><strong>Token Limits:</strong> Keep system prompts under 4000 tokens; use embeddings for larger context</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span><strong>Caching:</strong> Cache policy content and embeddings to reduce API calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span><strong>Function Calling:</strong> Use OpenAI functions to map user tasks to agents automatically</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span><strong>Versioning:</strong> Store API responses in version control for reproducibility</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gemini" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Google Gemini CLI Setup</h4>
                </div>
                
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Gemini Code Assist</AlertTitle>
                  <AlertDescription className="text-sm">
                    Google's Gemini Code Assist (formerly Duet AI) works in VS Code, JetBrains, and CLI. Configuration uses project-level context files.
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 1</Badge>
                      .gemini Directory Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.gemini/
├── config.yaml
└── context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    ├── backend-policy.md
    └── style-output.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.gemini/config.yaml</code> to reference context files</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Store policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.gemini/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference .github/agents/ and .github/skills/ for progressive loading</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example .gemini/config.yaml</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`# Gemini Code Assist Configuration
version: 1
project:
  name: "AI Playbook Workspace"
  context_files:
    - "context/workspace-policy.md"
    - "context/frontend-policy.md"
    - "context/backend-policy.md"
    - "context/style-output.md"
  
  # Progressive disclosure pattern
  agent_workflows:
    directory: "../.github/agents"
    load_on_demand: true
  
  skill_library:
    directory: "../.github/skills"
    load_on_demand: true

# Exclude patterns
exclude:
  - "node_modules/**"
  - "dist/**"
  - "build/**"
  - ".next/**"
  - "coverage/**"
  - ".venv/**"`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 2</Badge>
                      CLI Usage with Context Flag
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use Gemini CLI with explicit context file references:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`# Pass context files to Gemini CLI
gemini code \\
  --context .gemini/context/workspace-policy.md \\
  --context .gemini/context/frontend-policy.md \\
  "Create a React component following accessibility standards"

# Reference specific agent
gemini code \\
  --context .github/agents/react-component-builder/AGENT.md \\
  "Build an accessible button component"

# Load skill on demand
gemini code \\
  --context .github/skills/react-components/SKILL.md \\
  "Audit this component for WCAG 2.2 compliance"`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 3</Badge>
                      .google-cloud Directory (Enterprise)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      For Google Cloud Workstations or enterprise setups:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.google-cloud/
└── code-assist/
    ├── policies/
    │   ├── workspace-policy.md
    │   ├── frontend-policy.md
    │   └── backend-policy.md
    └── config.json`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Enterprise teams can centralize policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.google-cloud/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>config.json references agent/skill directories for progressive loading</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="text-sm">VS Code Extension Integration</AlertTitle>
                  <AlertDescription className="text-sm">
                    Gemini Code Assist VS Code extension reads both <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.gemini/</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.google-cloud/</code> directories. Use @-mentions in chat to reference specific agents or skills.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="cline" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Cline (formerly Claude-Dev) Setup</h4>
                </div>
                
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>What is Cline?</AlertTitle>
                  <AlertDescription className="text-sm">
                    Cline is an autonomous coding agent VS Code extension that uses Claude AI. It reads project context and can execute terminal commands, edit files, and reason about your codebase.
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Recommended</Badge>
                      .clinerules Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.clinerules           (main entry point)
.cline/
└── context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    ├── backend-policy.md
    └── style-output.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Cline reads <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.clinerules</code> automatically on startup</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Additional context in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cline/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Reference agents/skills by path for complex tasks</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example .clinerules</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`# Cline AI Agent Configuration

## Project Context
This workspace follows the AI Playbook framework for consistent code generation and task execution.

## Core Policies
Read these policies before executing tasks:
- .cline/context/workspace-policy.md (project scope, exclusions, isolation rules)
- .cline/context/frontend-policy.md (React, TypeScript, WCAG 2.2 accessibility)
- .cline/context/backend-policy.md (Node/Java/Python conventions)
- .cline/context/style-output.md (output format, minimal diffs, verification commands)

## Task Execution Pattern
When given a complex task:
1. Identify the task type (frontend component, backend service, code review, etc.)
2. Check if an agent exists in .github/agents/ for this task type
3. If agent exists, read the AGENT.md file and follow its procedure
4. Load specific skills from .github/skills/ as needed (progressive disclosure)
5. Apply policies and generate minimal, focused changes

## Progressive Context Loading
Do NOT load all files at once. Use this pattern:
- Start: Load only the relevant policy file(s)
- Complex task: Load the matching agent from .github/agents/
- Detailed execution: Load specific skills from .github/skills/
- Reference only: Read references/ and assets/ directories only when the skill/agent instructs

## Examples
Task: "Build an accessible React button component"
→ Read: frontend-policy.md
→ Load: .github/agents/react-component-builder/AGENT.md
→ Execute: Follow agent procedure, loading skills as needed

Task: "Review this PR for accessibility issues"
→ Read: frontend-policy.md
→ Load: .github/agents/pr-reviewer/AGENT.md
→ Load: .github/skills/a11y-automation/SKILL.md
→ Execute: Provide code review comments in chat

## Important Rules
- Always respect workspace-policy.md isolation rules
- Never modify files outside the current project scope
- Generate minimal diffs (only change what's necessary)
- Provide verification commands after making changes
- Use semantic HTML and proper ARIA for frontend components
- Follow existing project conventions over opinionated patterns`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Alternative</Badge>
                      Shared with Cursor (.cursorrules)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Since both Cline and Cursor can use the same configuration format, you can use a single <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code> file:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.cursorrules          (shared by Cursor & Cline)
.github/
├── copilot-instructions/  (also readable by Cline)
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Cline can read <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.cursorrules</code> if <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.clinerules</code> doesn't exist</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference existing .github/copilot-instructions/ for policies</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Maintains compatibility across multiple AI tools</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="text-sm">Cline Interaction Tips</AlertTitle>
                  <AlertDescription className="text-sm space-y-2">
                    <p>When working with Cline, explicitly reference agents/skills in your prompts:</p>
                    <ul className="list-disc list-inside text-xs space-y-1 mt-2">
                      <li>"Follow the react-component-builder agent to create this component"</li>
                      <li>"Use the a11y-automation skill to check accessibility"</li>
                      <li>"Apply the pr-reviewer agent to this pull request"</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Cline vs Claude Desktop</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="shrink-0 mt-0.5">Cline</Badge>
                      <span>VS Code extension with file system access, terminal execution, and project context awareness</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="shrink-0 mt-0.5">Claude Desktop</Badge>
                      <span>Standalone app requiring MCP servers for tool access; use same .github/ structure but load context manually</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="amazonq" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Amazon Q Developer Setup</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Recommended</Badge>
                      Customization File Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.aws/
└── amazonq/
    ├── customization.json
    └── context/
        ├── workspace-policy.md
        ├── frontend-policy.md
        └── backend-policy.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.aws/amazonq/customization.json</code> with context references</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Store high-level policies in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.aws/amazonq/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Reference .github/agents/ and .github/skills/ for detailed workflows</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example customization.json</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`{
  "customizations": [
    {
      "name": "AI Playbook Context",
      "description": "Workspace policies and development standards",
      "contextFiles": [
        ".aws/amazonq/context/workspace-policy.md",
        ".aws/amazonq/context/frontend-policy.md",
        ".aws/amazonq/context/backend-policy.md"
      ]
    },
    {
      "name": "Progressive Agents & Skills",
      "description": "Load specific agents/skills as needed",
      "instructions": [
        "For complex tasks, check .github/agents/ directory",
        "Load .github/skills/ files based on task context",
        "Follow progressive disclosure pattern"
      ]
    }
  ]
}`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Alternative</Badge>
                      Code Comment Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Amazon Q can also read inline code comments. Add references to AI Playbook in key files:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`// package.json or tsconfig.json comments
// AI Context: Follow .github/copilot-instructions/workspace-policy.md
// For React components: .github/skills/react-components/SKILL.md
// For API endpoints: .github/skills/node-typescript-service/SKILL.md`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tabnine" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Tabnine Setup</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 1</Badge>
                      .tabnine Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`.tabnine/
├── config.json
└── context/
    ├── workspace-policy.md
    ├── frontend-policy.md
    └── backend-policy.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.tabnine/config.json</code> with learning preferences</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Add context files to <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.tabnine/context/</code></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Tabnine learns from codebase patterns automatically</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example .tabnine/config.json</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`{
  "team_learning": {
    "enabled": true,
    "context_files": [
      ".tabnine/context/workspace-policy.md",
      ".tabnine/context/frontend-policy.md",
      ".tabnine/context/backend-policy.md"
    ]
  },
  "code_patterns": {
    "learn_from": [
      ".github/skills/**/SKILL.md",
      ".github/agents/**/AGENT.md"
    ]
  },
  "exclude_patterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**"
  ]
}`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Badge variant="outline">Method 2</Badge>
                      README-Based Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Tabnine can learn from README files. Create a developer-focused README with AI references:
                    </p>
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`DEVELOPMENT.md

## AI Assistant Context

This project uses the AI Playbook framework:
- Policies: .github/copilot-instructions/
- Agents: .github/agents/
- Skills: .github/skills/

When generating code:
1. Follow workspace-policy.md for scope rules
2. Check frontend-policy.md or backend-policy.md
3. Reference specific skills for complex tasks`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle className="text-sm">Tabnine Learning</AlertTitle>
                  <AlertDescription className="text-sm">
                    Tabnine learns from your codebase patterns. Consistent file structure and naming conventions in .github/ help it understand your project's AI context organization.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Generic Approach for Any AI Tool</h4>
                </div>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Universal Pattern</CardTitle>
                    <CardDescription className="text-xs">
                      Works with Cody, Sourcegraph, Kite, and custom AI assistants
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-background p-4 rounded-lg">
                      <pre className="text-xs font-mono">
{`docs/
└── ai-context/
    ├── 00-index.md         (entry point)
    ├── workspace-policy.md
    ├── frontend-policy.md
    ├── backend-policy.md
    └── style-output.md
.github/
├── agents/
├── skills/
└── specs/`}
                      </pre>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>For tools without special config locations:</p>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Create a <code className="bg-muted px-1.5 py-0.5 rounded text-xs">docs/ai-context/</code> directory</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Add <code className="bg-muted px-1.5 py-0.5 rounded text-xs">00-index.md</code> explaining the structure</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Manually reference files in your AI tool's chat/context window</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-accent/10 border-accent/30">
                  <Code className="h-4 w-4" />
                  <AlertTitle className="text-sm">Example 00-index.md</AlertTitle>
                  <AlertDescription>
                    <pre className="text-xs font-mono mt-2 bg-background/50 p-3 rounded overflow-x-auto">
{`# AI Context Index

This project uses the AI Playbook framework for consistent AI assistance.

## Quick Reference
- **Workspace Rules**: workspace-policy.md
- **Frontend Standards**: frontend-policy.md  
- **Backend Standards**: backend-policy.md
- **Output Style**: style-output.md

## Agents & Skills
Complex tasks follow agent workflows:
- Agents: ../.github/agents/
- Skills: ../.github/skills/

Load specific files as needed using progressive disclosure.`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Tool-Specific Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">Cody</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">Sourcegraph Cody</p>
                          <p className="text-muted-foreground text-xs">Use <code className="bg-muted px-1.5 py-0.5 rounded">.cody/</code> directory or add context via @-mentions in chat</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">Kite</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">Kite</p>
                          <p className="text-muted-foreground text-xs">Learns from local codebase patterns automatically; consistent structure helps</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">Custom</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">Custom AI Assistants</p>
                          <p className="text-muted-foreground text-xs">Add docs/ai-context/ path to system prompt or RAG context retrieval</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 mt-0.5">ChatGPT</Badge>
                        <div className="space-y-1">
                          <p className="font-medium">ChatGPT / Web-Based Tools</p>
                          <p className="text-muted-foreground text-xs">Copy-paste relevant policy files as context; reference .github/ paths when needed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Key Principle: Location-Agnostic Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                The <strong>content</strong> of policies, agents, and skills remains the same regardless of tool. Only the <strong>loading mechanism</strong> changes:
              </p>
              <div className="grid gap-2">
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>GitHub Copilot:</strong> <span className="text-muted-foreground">Auto-loads from .github/copilot-instructions/</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Cursor/Claude:</strong> <span className="text-muted-foreground">Use .cursorrules or project config to reference files</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Manual Tools:</strong> <span className="text-muted-foreground">Add docs/ai-context/ and paste into context as needed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
