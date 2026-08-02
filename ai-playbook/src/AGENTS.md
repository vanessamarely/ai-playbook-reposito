# AGENTS.md (src/)

This file applies only to `src/` and layers on top of the root `ai-playbook/AGENTS.md` — Codex reads both, and this nearer file wins on anything it restates. It doesn't repeat the root's scope/output rules, only what's specific to frontend source under `src/`.

## Technology Stack

Primary focus: React + TypeScript applications.

## Core Principles

1. Component-driven architecture with clear boundaries.
2. Type safety enforced at compile time.
3. Accessibility as a first-class requirement.
4. Performance considerations in rendering and bundling.

## React + TypeScript Standards

- Use functional components with hooks; define explicit TypeScript interfaces for props.
- `useState` for local state, `useReducer` for complex state logic, lift state only when necessary.
- `useEffect` with explicit dependency arrays; clean up side effects; avoid effects for derived state.
- Prefix handler functions with `handle` (e.g., `handleClick`); type event parameters explicitly (e.g., `React.MouseEvent<HTMLButtonElement>`).

## Accessibility

All frontend code must meet WCAG 2.2 Level AA standards:
- Semantic HTML as foundation; valid ARIA usage; keyboard navigation (Tab, Enter, Escape, Arrow keys).
- Focus management for dynamic content and modals.
- Contrast ratios of 4.5:1 (normal text) / 3:1 (large text); `prefers-reduced-motion` support.
- `eslint-plugin-jsx-a11y` configured and enforced; manual keyboard testing for interactive components.

See `ai-playbook/.agents/skills/react-components/references/a11y-wcag22.md` for the full WCAG 2.2 mapping.

## Testing & Build

- Unit tests for isolated logic, integration tests for component interactions, accessibility tests with axe or similar.
- Code splitting and lazy loading for routes/heavy components; tree shaking for unused code.
- Wrap components that may throw with error boundaries.

## Full Policy

This is a condensed demo — the complete source is `ai-playbook/policies/frontend-policy.md`.
