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
2. Define TypeScript interface for props with explicit types:
   - Use discriminated unions for variant props
   - Mark readonly properties appropriately
   - Use `React.ReactNode` for children
   - Provide JSDoc comments for complex props
   - Example:
   ```typescript
   interface ButtonProps {
     /** Visual style variant */
     variant: 'primary' | 'secondary' | 'danger'
     /** Button click handler */
     onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
     /** Disable button interaction */
     disabled?: boolean
     children: React.ReactNode
   }
   ```
3. Implement the component with semantic HTML.
4. Add accessibility attributes (ARIA roles, labels, keyboard handlers).
5. Use explicit return type: `const Component = (props: Props): JSX.Element => { ... }`
6. Avoid `any` types - use `unknown` with type guards if needed.

Refer to:
- `.github/skills/react-components/references/a11y-wcag22.md` for WCAG 2.2 requirements
- `.github/copilot-instructions.md` for TypeScript best practices

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

### Step 6: Error Handling and Edge Cases

Implement proper error handling:
1. For async data components, use AsyncState discriminated union:
   ```typescript
   type AsyncState<T> = 
     | { status: 'idle' }
     | { status: 'loading' }
     | { status: 'success'; data: T }
     | { status: 'error'; error: Error }
   ```
2. Add error boundaries for component failures (if top-level component).
3. Handle loading states with proper ARIA announcements.
4. Use exhaustive checks with `never` type for state machines.

### Step 7: Generate Test File (Required)

Create comprehensive tests:
1. Create `<componentName>.test.tsx` in the appropriate test directory.
2. Include basic rendering test with RTL.
3. Include accessibility test using `@axe-core/react` or `jest-axe`:
   ```typescript
   import { axe, toHaveNoViolations } from 'jest-axe'
   expect.extend(toHaveNoViolations)
   
   test('should have no accessibility violations', async () => {
     const { container } = render(<Component {...props} />)
     const results = await axe(container)
     expect(results).toHaveNoViolations()
   })
   ```
4. Test keyboard interactions for interactive components.
5. Test error states if component handles errors.

### Step 8: Output Summary

Provide:
- Path to created component file with markdown link: `[ComponentName.tsx](path/to/ComponentName.tsx)`
- Path to test file with link
- Brief description of implemented functionality
- List of TypeScript patterns used (discriminated unions, type guards, etc.)
- Accessibility features implemented
- Suggested verification commands:
  - `npm run lint` (from project folder)
  - `npm test -- <componentName>`
  - `npm run type-check`
  - `npm run lint:a11y` (if available)

**Mission Control Context**: When this agent completes, session logs should show:
- Component structure decisions and reasoning
- Accessibility considerations applied
- TypeScript type safety measures
- Any deviations from standard patterns with justification

## Error Handling

- **Component already exists**: Notify and ask if modification or overwrite is intended.
- **Invalid props specification**: Request clarification on expected types.
- **Missing dependencies**: Suggest installing required packages.
