---
name: react-components
description: Build accessible React components with TypeScript following WCAG 2.2 and semantic HTML patterns
triggers:
  - creating a React component
  - building a component
  - implement component
  - accessibility requirements
negative_triggers:
  - backend service
  - API endpoint
  - database schema
---

# Skill: React Components

## Purpose

Create or modify React components using TypeScript with strict accessibility compliance (WCAG 2.2 Level AA), semantic HTML, and type safety.

## Inputs

- `componentName`: PascalCase component identifier
- `functionality`: Description of component behavior and interactions
- `props`: Expected component props with types
- `accessibility`: Specific accessibility requirements (keyboard, screen reader, ARIA)

## Outputs

- Component file (`.tsx`)
- TypeScript prop interface
- Accessibility attributes and handlers
- Optional: test file, style file

## Procedures

### 1. Validate Component Name

Ensure name follows PascalCase convention.

Check for conflicts with existing components in the target directory.

### 2. Load Accessibility Guidelines

Read: `.github/skills/react-components/references/a11y-wcag22.md`

Identify applicable WCAG requirements based on component type (button, form, modal, etc.).

### 3. Define TypeScript Interface

Create interface for component props:
- Required props without `?`
- Optional props with `?`
- Use specific types (avoid `any`)
- Include event handler types (e.g., `onClick?: (event: React.MouseEvent) => void`)

Refer to: `.github/skills/react-components/references/react-ts-patterns.md`

### 4. Choose Semantic HTML

Select appropriate HTML element:
- `<button>` for actions
- `<a>` for navigation
- `<input>`, `<select>`, `<textarea>` for form fields
- `<nav>`, `<header>`, `<main>`, `<footer>` for landmarks
- `<article>`, `<section>` for content structure

Avoid `<div>` or `<span>` for interactive elements.

### 5. Implement Keyboard Support

For interactive components:
- Add `onKeyDown` handler for Enter and Space keys.
- Implement arrow key navigation for lists or menus.
- Manage focus for modals (trap focus, restore on close).
- Ensure all interactive elements are reachable via Tab.

Pattern:
```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleAction()
  }
}
```

### 6. Add ARIA Attributes

Apply ARIA only when semantic HTML is insufficient:
- `aria-label` for icon buttons without visible text
- `aria-labelledby` to reference visible labels
- `aria-describedby` for additional context
- `aria-expanded` for toggles and dropdowns
- `aria-live` for dynamic content updates

Validate against: `.github/skills/react-components/references/a11y-wcag22.md`

### 7. Implement Focus Management

For modals and dialogs:
1. Move focus to modal when opened.
2. Trap focus within modal (prevent Tab from escaping).
3. Restore focus to trigger element when closed.

Use `useEffect` with ref:
```tsx
const modalRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (isOpen && modalRef.current) {
    modalRef.current.focus()
  }
}, [isOpen])
```

### 8. Apply Project-Specific Conventions

Follow the project's existing style and conventions.

### 9. Generate Component File

Structure:
1. Imports
2. TypeScript interface
3. Component function with typed props
4. Return JSX with semantic elements and accessibility attributes
5. Export

### 10. Validate Accessibility

Check:
- Semantic HTML used correctly
- Keyboard handlers present for interactive elements
- ARIA attributes valid and necessary
- Focus management implemented for modals
- Color contrast meets 4.5:1 for normal text, 3:1 for large text

### 11. Suggest Testing

Recommend:
- Unit tests for logic
- Accessibility tests with `@axe-core/react`
- Keyboard navigation manual testing

Commands:
- `npm run lint` (if eslint-plugin-jsx-a11y configured)
- `npm test -- <ComponentName>`

## Error Handling

**Non-semantic element used for interaction**: Suggest replacing `<div>` with `<button>` or appropriate element.

**Missing keyboard handler**: Add `onKeyDown` handler for Enter/Space.

**Invalid ARIA combination**: Refer to `.github/skills/react-components/references/a11y-wcag22.md` for correct usage.

**Focus trap missing in modal**: Implement focus management with refs and event listeners.

## References

- WCAG 2.2 Guidelines: `references/a11y-wcag22.md`
- TypeScript Patterns: `references/react-ts-patterns.md`
- Component Specification Template: `assets/component-spec.template.md`
