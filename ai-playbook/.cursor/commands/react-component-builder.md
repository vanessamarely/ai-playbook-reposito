# React Component Builder

Create or modify a React component with TypeScript, ensuring accessibility compliance and adherence to project conventions. This follows the same standards as the always-applied `react-components` rule, run as a guided end-to-end build.

## Inputs

- `componentName`: PascalCase component name.
- `specification`: component behavior, props, and requirements.
- `targetFolder`: location within the project for the new component.

## Outputs

- Component file (`.tsx`), and — required — a matching test file.
- Optional: Storybook story or style file.
- Verification command suggestions.

## Procedure

1. **Validate inputs** — `componentName` is PascalCase, `targetFolder` exists and is within project scope, check for naming conflicts with existing components.
2. **Follow the `react-components` rule** for the full accessibility/TypeScript procedure (semantic HTML, keyboard support, ARIA, focus management).
3. **Generate the component structure** at `<targetFolder>/<componentName>.tsx`:
   - Explicit TypeScript prop interface — discriminated unions for variants, `readonly` where appropriate, `React.ReactNode` for children, JSDoc on complex props:
     ```typescript
     interface ButtonProps {
       /** Visual style variant */
       variant: 'primary' | 'secondary' | 'danger'
       onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
       disabled?: boolean
       children: React.ReactNode
     }
     ```
   - Semantic HTML, accessibility attributes, explicit return type (`const Component = (props: Props): JSX.Element => { ... }`), no `any` (use `unknown` + type guards instead).
4. **Apply project-specific overrides** — check for an existing style guide or component-library documentation in the project and follow it; otherwise follow the project's existing conventions.
5. **Validate accessibility** — semantic HTML, keyboard handlers on interactive elements, focus management for modals/dynamic content, ARIA valid and necessary. If `eslint-plugin-jsx-a11y` is configured, suggest `npm run lint`.
6. **Handle errors and edge cases**:
   - Async data: use an `AsyncState<T>` discriminated union (`idle` | `loading` | `success` | `error`).
   - Add error boundaries for top-level components.
   - Loading states get proper ARIA announcements; use exhaustive `never`-type checks for state machines.
7. **Generate a test file (required)** — `<componentName>.test.tsx`: basic render test with RTL, an accessibility test with `jest-axe`:
   ```typescript
   import { axe, toHaveNoViolations } from 'jest-axe'
   expect.extend(toHaveNoViolations)
   test('should have no accessibility violations', async () => {
     const { container } = render(<Component {...props} />)
     expect(await axe(container)).toHaveNoViolations()
   })
   ```
   Plus keyboard-interaction tests and error-state tests where applicable.
8. **Report a summary**: paths to the component and test files, functionality description, TypeScript patterns used, accessibility features implemented, and verification commands (`npm run lint`, `npm test -- <componentName>`, `npm run type-check`, `npm run lint:a11y` if available).

## Error Handling

- **Component already exists**: ask whether to modify or overwrite.
- **Invalid props specification**: ask for clarification on expected types.
- **Missing dependencies**: suggest installing the required packages.
