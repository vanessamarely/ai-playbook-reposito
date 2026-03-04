---
description: Build accessible React components following TypeScript and WCAG 2.2 standards
tools:
  - file-system-read
  - file-system-write
  - command-execution
---

# React Component Builder Agent

## Purpose

Create or modify React components with TypeScript, ensuring accessibility compliance and adherence to project conventions.

## Inputs

- `componentName`: Name of the component (PascalCase).
- `specification`: Component behavior, props, and requirements.
- `targetFolder`: Location within the project for the new component.

## Outputs

- Component file (`.tsx`).
- Optional: associated test file, Storybook story, or style file.
- Verification command suggestions.

## Procedure

### Step 1: Validate Inputs

1. Ensure `componentName` follows PascalCase convention.
2. Verify `targetFolder` exists and is within project scope.
3. Check for naming conflicts with existing components.

### Step 2: Load Skill

Read: `.github/skills/react-components/SKILL.md`

Follow the procedures defined in that skill.

### Step 3: Generate Component Structure

1. Create the component file at `<targetFolder>/<componentName>.tsx`.
2. Define TypeScript interface for props.
3. Implement the component with semantic HTML.
4. Add accessibility attributes (ARIA roles, labels, keyboard handlers).

Refer to: `.github/skills/react-components/references/a11y-wcag22.md` for WCAG 2.2 requirements.

### Step 4: Apply Project-Specific Overrides

Check for project-specific style guides or component library documentation:
- If the project has `.github/component-library-overrides.md`, read and apply those rules.
- Otherwise, follow the project's existing code style and conventions.

### Step 5: Validate Accessibility

1. Check for semantic HTML usage.
2. Verify keyboard event handlers are present for interactive elements.
3. Ensure focus management for modals or dynamic content.
4. Confirm ARIA attributes are valid and necessary.

If `eslint-plugin-jsx-a11y` is configured, suggest running: `npm run lint`

### Step 6: Generate Test File (Optional)

If tests are expected:
1. Create `<componentName>.test.tsx` in the appropriate test directory.
2. Include basic rendering test.
3. Include accessibility test using `@axe-core/react` or similar.

### Step 7: Output Summary

Provide:
- Path to created component file.
- Brief description of implemented functionality.
- Suggested verification commands:
  - `npm run lint`
  - `npm test -- <componentName>`
  - `npm run type-check`

## Error Handling

- **Component already exists**: Notify and ask if modification or overwrite is intended.
- **Invalid props specification**: Request clarification on expected types.
- **Missing dependencies**: Suggest installing required packages.
