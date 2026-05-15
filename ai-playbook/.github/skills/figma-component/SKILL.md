---
name: figma-component
description: Converts Figma nodes into production-ready React/TypeScript components using project-provided conventions and reusable component libraries. Use when implementing or updating UI from Figma in any project scope.
triggers:
  - convert figma to component
  - figma component generation
  - build component from figma node
  - map figma design system component
  - generate tsx from figma
negative_triggers:
  - backend endpoint
  - database migration
  - infra automation
---

# Skill: figma-component

## Purpose

Provide reusable, project-agnostic rules and templates for converting Figma designs into code.

The skill must not assume any fixed client name, repository name, or component-library name.

## Required Input Contract

The caller must provide these values in the initial prompt:

- `scope`: target top-level project folder.
- `destination_folder`: exact folder where generated files should be created/updated.
- `component_library`: preferred reusable component library or `none`.
- `client_context`: concise project conventions (tokens, styling model, naming, export rules, test expectations).
- `figma_url` or `{fileKey,nodeId}`.

If Figma is not accessible, the caller must provide:

- `screenshot_image`: attached screenshot(s) of the target component/frame.

Optional:

- `dev_url`: URL for browser-based validation.
- `create_mode`: `preview` or `apply`.
- `preferences`: request-level overrides.

If required input is missing, stop and request clarification before generating code.

If Figma access fails and no screenshot is provided, request screenshot input before generating code.

## Core Rules

### 1) Reuse Existing Components First

- Search `scope` for existing components and wrappers before creating new primitives.
- Prioritize composition/adapters around `component_library` when available.
- If `component_library` is `none`, follow local component patterns in `scope`.

### 2) Scope Isolation

- Edit only files under `scope`.
- Do not modify sibling projects or root-level shared exports without explicit confirmation.

### 3) Minimal Patch Strategy

- Prefer focused diffs (usually 1-3 files).
- Only include `.test.tsx` and `.stories.tsx` when tooling is present in `scope/package.json`.

### 4) File Layout

Default layout for a new component `Xyz` (adjust to project conventions in `client_context`):

- `<destination_folder>/Xyz.tsx`
- `<destination_folder>/Xyz.styles.ts` (or project style equivalent)
- `<destination_folder>/Xyz.test.tsx` (only if Jest/Vitest is configured)
- `<destination_folder>/Xyz.stories.tsx` (only if Storybook is configured)

### 5) TypeScript and React Standards

- Prefer functional components.
- Use strict typing and avoid `any` unless unavoidable.
- Keep naming consistent with local conventions from `client_context`.

### 6) Accessibility Baseline

- Meet WCAG 2.2 AA requirements for generated UI.
- Ensure semantic markup, keyboard support, and appropriate ARIA usage.

### 7) Figma Fallback Workflow

- Attempt to load design context from Figma MCP first.
- If unavailable or incomplete, switch to screenshot-driven implementation.
- Use attached screenshot(s) to infer structure, spacing, typography, states, and interactions.
- If screenshots are insufficient (missing states or responsive behavior), ask the user for additional screenshots.
- Clearly state in output whether implementation source was Figma context or screenshot fallback.

## Verification and Quality Gates

Before completion, provide project-specific commands based on available scripts in `scope/package.json`:

- type check
- lint
- unit tests
- Storybook (if available)

If `dev_url` is provided, run browser validation via Chrome MCP:

- capture visual state screenshots
- run automated `axe-core` accessibility checks
- gather console and network issues
- return JSON report in the shape:

```json
{
  "violations": [],
  "passes": 0,
  "incomplete": 0
}
```

If violations are found, include concrete remediation guidance and do not mark work complete until fixes are proposed.

## Apply Patch Output Requirement

When generating code changes, output `apply_patch`-compatible diffs with minimal, reviewable edits.

## Generic Prompt Examples

1) Create component from Figma

"agent:figma-component-builder scope:web-client destination_folder:src/components/account component_library:acme-ui client_context:TypeScript strict, CSS modules, named exports figma_url:https://figma.com/design/FILEKEY/NAME?node-id=1-2 dev_url:http://localhost:6006 create_mode:preview"

2) Build adapter around an existing library component

"agent:figma-component-builder scope:portal-app destination_folder:src/ui component_library:design-system-react client_context:Tailwind, barrel exports by feature fileKey:ABC nodeId:1:2 dev_url:http://localhost:3000 create_mode:apply"

3) Local-only generation without shared library

"agent:figma-component-builder scope:admin-console destination_folder:src/components component_library:none client_context:SCSS modules, PascalCase components figma_url:https://figma.com/design/FILEKEY/FRAME?node-id=2-8 create_mode:preview"

4) Screenshot fallback when Figma is unavailable

"agent:figma-component-builder scope:admin-console destination_folder:src/components component_library:none client_context:SCSS modules, PascalCase components screenshot_image:<attached image> create_mode:preview"

## Deliverables

- `apply_patch` diffs
- concise human-readable change summary
- Chrome MCP a11y/visual JSON report when `dev_url` is supplied
- verification checklist

## Maintenance

Keep this skill generic and free of client-specific names. Put client-specific details only in runtime prompt inputs (`scope`, `destination_folder`, `component_library`, `client_context`).