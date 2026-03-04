# Frontend Policy

## Technology Stack

Primary focus: React + TypeScript applications.

## Core Principles

1. Component-driven architecture with clear boundaries.
2. Type safety enforced at compile time.
3. Accessibility as a first-class requirement.
4. Performance considerations in rendering and bundling.

## React + TypeScript Standards

### Component Structure
- Use functional components with hooks.
- Define explicit TypeScript interfaces for props.
- Co-locate types with components when project-specific.
- Extract shared types to dedicated type definition files.

### State Management
- Use `useState` for local component state.
- Use `useReducer` for complex state logic.
- Lift state only when necessary.
- Consider context for cross-cutting concerns.

### Effect Management
- Use `useEffect` with explicit dependency arrays.
- Clean up side effects (subscriptions, timers, listeners).
- Avoid effects for derived state; use `useMemo` or direct computation.

### Event Handlers
- Prefix handler functions with `handle` (e.g., `handleClick`).
- Use inline arrow functions sparingly (consider performance implications).
- Type event parameters explicitly (e.g., `React.MouseEvent<HTMLButtonElement>`).

## Accessibility Policy

All frontend code must meet WCAG 2.2 Level AA standards.

### Requirements Summary
- Semantic HTML as foundation.
- Keyboard navigation support (Tab, Enter, Escape, Arrow keys).
- Valid ARIA usage (roles, states, properties).
- Focus management for dynamic content and modals.
- Perceivable contrast ratios (4.5:1 for normal text, 3:1 for large text).
- Reduced motion support via `prefers-reduced-motion`.

### Tooling Assumptions
- `eslint-plugin-jsx-a11y` configured and enforced.
- `@axe-core/react` or equivalent for runtime checks in development.
- Manual keyboard testing required for interactive components.

### Detailed Guidelines
Refer to `.github/skills/react-components/references/a11y-wcag22.md` for comprehensive WCAG 2.2 mapping and implementation patterns.

## Error Boundaries

Wrap components that may throw errors with error boundaries to prevent full application crashes.

## Testing Expectations

- Unit tests for isolated logic.
- Integration tests for component interactions.
- Accessibility tests using axe or similar tools.

## Build Optimization

- Code splitting for large applications.
- Lazy loading for routes and heavy components.
- Tree shaking for unused code elimination.
