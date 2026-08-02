---
applyTo: "**/*.tsx,**/*.ts"
---

# Frontend Instructions (React + TypeScript)

Primary stack: React + TypeScript. Component-driven architecture, compile-time type safety, accessibility as a first-class requirement, and performance-aware rendering/bundling.

## Component Structure

- Use functional components with hooks.
- Define explicit TypeScript interfaces for props; avoid `any`. Co-locate types with components when project-specific, extract shared types to dedicated files otherwise.

## State & Effects

- Use `useState` for local state, `useReducer` for complex state logic. Lift state only when necessary; consider context for cross-cutting concerns.
- Use `useEffect` with explicit dependency arrays and clean up side effects (subscriptions, timers, listeners). Don't use effects for derived state — use `useMemo` or direct computation instead.

## Event Handlers

- Prefix handlers with `handle` (e.g. `handleClick`).
- Type event parameters explicitly (e.g. `React.MouseEvent<HTMLButtonElement>`).
- Use inline arrow functions sparingly; prefer named handlers for non-trivial logic.

## Accessibility Policy (WCAG 2.2 Level AA — required)

- Semantic HTML as the foundation; avoid `<div>`/`<span>` for interactive elements.
- Full keyboard navigation support (Tab, Enter, Escape, Arrow keys); no keyboard traps outside intentional modal focus-trapping.
- Valid ARIA usage only where semantic HTML is insufficient (roles, states, properties).
- Focus management for dynamic content and modals (move focus in, trap while open, restore on close).
- Contrast ratios: 4.5:1 normal text, 3:1 large text (18pt+/14pt+ bold) and UI components.
- Respect `prefers-reduced-motion` for animations.
- Tooling assumptions: `eslint-plugin-jsx-a11y` configured; `@axe-core/react` or equivalent for runtime dev checks; manual keyboard testing for interactive components.
- For detailed WCAG 2.2 mapping and code patterns, see `.github/prompts/react-components.prompt.md` and `.github/prompts/a11y-automation.prompt.md`.

## Error Boundaries

Wrap components that may throw with error boundaries to prevent full application crashes.

## Testing

- Unit tests for isolated logic; integration tests for component interactions.
- Accessibility tests using `axe`/`jest-axe` or similar.

## Build Optimization

- Code splitting for large applications; lazy loading for routes and heavy components; tree-shake unused code.
