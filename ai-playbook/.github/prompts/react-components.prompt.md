# React Components

Create or modify React components using TypeScript with strict accessibility compliance (WCAG 2.2 Level AA), semantic HTML, and type safety. Not for Node.js services, API endpoints, database schemas, or non-React frameworks (Vue, Svelte, Angular).

## Inputs

- `componentName`: PascalCase identifier.
- `functionality`: description of behavior and interactions.
- `props`: expected component props with types.
- `accessibility`: specific keyboard/screen-reader/ARIA requirements.

## Procedure

1. **Validate the name** — PascalCase; check for conflicts with existing components in the target directory.
2. **Identify applicable WCAG requirements** for the component type (button, form, modal, etc.) using the checklist below.
3. **Define the TypeScript prop interface** — required props without `?`, optional with `?`, specific types (no `any`), typed event handlers (e.g. `onClick?: (event: React.MouseEvent) => void`). See patterns below.
4. **Choose semantic HTML** — `<button>` for actions, `<a>` for navigation, `<input>`/`<select>`/`<textarea>` for form fields, `<nav>`/`<header>`/`<main>`/`<footer>` for landmarks, `<article>`/`<section>` for content. Never `<div>`/`<span>` for interactive elements.
5. **Implement keyboard support** — `onKeyDown` for Enter/Space, arrow-key navigation for lists/menus, focus trap + restore for modals, Tab reachability for all interactive elements.
   ```tsx
   const handleKeyDown = (event: React.KeyboardEvent) => {
     if (event.key === 'Enter' || event.key === ' ') {
       event.preventDefault()
       handleAction()
     }
   }
   ```
6. **Add ARIA only where semantic HTML is insufficient** — `aria-label` (icon buttons without visible text), `aria-labelledby`, `aria-describedby`, `aria-expanded` (toggles/dropdowns), `aria-live` (dynamic updates).
7. **Implement focus management for modals/dialogs** — move focus in on open, trap while open, restore to trigger element on close:
   ```tsx
   const modalRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
     if (isOpen && modalRef.current) modalRef.current.focus()
   }, [isOpen])
   ```
8. **Apply project-specific conventions** — follow the project's existing style; check for a local component-library override doc.
9. **Generate the file**: imports → TypeScript interface → component function with typed props → JSX with semantic elements + a11y attributes → export.
10. **Validate accessibility** — semantic HTML, keyboard handlers present, ARIA valid/necessary, focus management for modals, contrast ≥ 4.5:1 normal text / ≥ 3:1 large text.
11. **Generate a test file** (`<componentName>.test.tsx`): render test (React Testing Library) + accessibility test (`jest-axe`/`@axe-core/react`):
    ```tsx
    import { axe, toHaveNoViolations } from 'jest-axe'
    expect.extend(toHaveNoViolations)
    test('should have no accessibility violations', async () => {
      const { container } = render(<Component {...props} />)
      expect(await axe(container)).toHaveNoViolations()
    })
    ```
12. **Suggest verification commands**: `npm run lint` (if `eslint-plugin-jsx-a11y` configured), `npm test -- <ComponentName>`, `npm run type-check`.

## TypeScript Patterns

Functional component with typed props:
```tsx
interface ButtonProps {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}
export function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return <button type="button" onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>{label}</button>
}
```

Discriminated union for async state:
```tsx
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
```

Extending HTML attributes:
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}
```

Error boundary (class component):
```tsx
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  render() { return this.state.hasError ? <div>Error: {this.state.error?.message}</div> : this.props.children }
}
```

Memoization: `React.memo`, `useMemo(() => computeExpensiveValue(a, b), [a, b])`, `useCallback(() => doSomething(a, b), [a, b])`.

## WCAG 2.2 AA Quick Reference

- **1.1.1 Non-text content**: `<img alt="...">` (or `alt=""` if decorative); `aria-label` on icon buttons.
- **1.3.1 Info & relationships**: use semantic landmarks/headings, not styled `<div>`s.
- **1.3.5 Identify input purpose**: `autoComplete="email"` / `"tel"` etc.
- **1.4.3 Contrast (min)**: 4.5:1 normal text, 3:1 large text (18pt+/14pt+ bold).
- **1.4.10 Reflow**: usable at 320px width, no horizontal scroll.
- **1.4.11 Non-text contrast**: UI components/graphics ≥ 3:1.
- **1.4.13 Content on hover/focus**: dismissible (Escape), hoverable, persistent.
- **2.1.1 Keyboard**: all functionality operable via keyboard.
- **2.1.2 No keyboard trap**: except intentional modal focus-trapping (with Escape to close).
- **2.4.3 Focus order**: logical, follows DOM order.
- **2.4.7 Focus visible**: `:focus-visible { outline: 2px solid ...; outline-offset: 2px }`.
- **2.4.11 Focus not obscured (new in 2.2)**: focused element must not be fully covered.
- **2.5.3 Label in name**: visible label text included in the accessible name.
- **2.5.8 Target size (new in 2.2)**: interactive targets ≥ 24×24 CSS px (44×44 recommended), except inline text links.
- **3.3.1/3.3.2 Errors & labels**: every input has a visible `<label>`; errors use `aria-invalid` + `aria-describedby`.
- **3.3.8 Accessible authentication (new in 2.2)**: no cognitive-function-only auth without an alternative.
- **4.1.3 Status messages**: `aria-live="polite"` for status, `role="alert"` for errors.

Common ARIA patterns: toggle button `aria-pressed`; expandable section `aria-expanded` + `aria-controls`; dialog `role="dialog" aria-modal="true" aria-labelledby="..."`; form `<fieldset><legend>`.

Motion: respect `prefers-reduced-motion` — set animation/transition duration near-zero when the media query matches.

## Anti-Patterns to Flag

`div`/`span` as button · missing `alt` · color-only state · autoplaying media · custom dropdown without ARIA · removed focus outlines · empty links/buttons · `tabindex > 0`.

## Error Handling

- **Non-semantic element used for interaction** — replace with `<button>`/appropriate element.
- **Missing keyboard handler** — add `onKeyDown` for Enter/Space.
- **Invalid ARIA combination** — recheck against the reference above.
- **Focus trap missing in modal** — implement focus management with refs + event listeners.

## Related

- `.github/instructions/frontend.instructions.md` (auto-applied to `**/*.tsx`, `**/*.ts`)
- `.github/prompts/a11y-automation.prompt.md` — automated a11y testing setup
- `.github/agents/react-component-builder.agent.md` — full agent workflow for scaffolding components
