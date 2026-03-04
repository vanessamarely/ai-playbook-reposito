---
description: Scan a workspace folder to detect project type and route to appropriate skills
tools:
  - file-system-read
  - command-execution
---

# Scan Workspace Agent

## Purpose

Identify the project type within a target folder and determine which skills apply.

## Inputs

- `targetFolder`: Absolute or relative path to the project root.

## Outputs

- JSON structure containing:
  - `projectType`: Detected type (e.g., `react`, `node-service`, `java-spring`, `python-fastapi`).
  - `skills`: List of applicable skill identifiers.
  - `warnings`: Any issues detected (missing dependencies, inconsistent configuration).

## Procedure

### Step 1: Validate Target Folder

1. Verify the folder exists.
2. Check read permissions.
3. If validation fails, output error and exit.

### Step 2: Run Project Detection

Execute: `node tools/project-detect.mjs <targetFolder>`

Expected output: JSON with project metadata.

If the script fails:
- Check that Node.js is available.
- Verify the script path is correct relative to the playbook root.
- Output the stderr and exit.

### Step 3: Parse Detection Results

Extract:
- `projectType`
- `framework` (if applicable)
- `language`
- Configuration file paths

### Step 4: Map to Skills

Use the following routing table:

| Project Type       | Skills                                                  |
|--------------------|---------------------------------------------------------|
| `react`            | `react-components`, `a11y-automation`                   |
| `node-typescript`  | `node-typescript-service`                               |
| `java-spring`      | (Refer to backend-policy.md; no specific skill yet)     |
| `python-fastapi`   | (Refer to backend-policy.md; no specific skill yet)     |
| `unknown`          | Fallback to manual inspection                           |

### Step 5: Apply Scope Guard

Execute: `node tools/scope-guard.mjs <targetFolder>`

This ensures subsequent operations remain within the target folder.

If scope violations are detected, abort and notify.

### Step 6: Output Recommendations

Print:
- Detected project type.
- List of recommended skills to load.
- Relevant policy files (workspace-policy.md, frontend-policy.md, backend-policy.md).

Example output:
```json
{
  "projectType": "react",
  "framework": "vite",
  "language": "typescript",
  "skills": ["react-components", "a11y-automation"],
  "policies": [
    ".github/copilot-instructions/workspace-policy.md",
    ".github/copilot-instructions/frontend-policy.md"
  ],
  "warnings": []
}
```

## Error Handling

- **Folder not found**: Output clear error message with the attempted path.
- **Detection script failure**: Output stderr from `project-detect.mjs`.
- **Ambiguous project type**: List candidates and request clarification.
