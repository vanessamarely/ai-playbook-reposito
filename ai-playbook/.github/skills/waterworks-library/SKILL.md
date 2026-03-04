---
name: waterworks-library
description: Build components for the Waterworks accessible component library with no semicolons and architecture-first patterns
triggers:
  - waterworks component
  - accessible component library
  - waterworks library
negative_triggers:
  - backend service
  - API endpoint
  - non-waterworks project
---

# Skill: Waterworks Library

## Purpose

Create or modify components within the Waterworks accessible component library, following strict style rules (no semicolons, no code comments) and existing architecture patterns.

## Inputs

- `componentName`: PascalCase component identifier
- `functionality`: Component behavior and interaction model
- `accessibilityRequirements`: WCAG 2.2 compliance specifics

## Outputs

- Component file without semicolons
- Self-documenting code without inline comments
- Full WCAG 2.2 Level AA compliance
- Tests with accessibility coverage

## Procedures

### 1. Verify Waterworks Context

Confirm the target project is Waterworks by checking:
- Project folder name contains "waterworks" (case-insensitive)
- `.waterworks` marker file exists
- `package.json` name field matches `@waterworks/*` or `waterworks`

If NOT Waterworks, redirect to `.github/skills/react-components/SKILL.md` instead.

### 2. Load Waterworks Policies

Read: `.github/copilot-instructions/waterworks-overrides.md`

Mandatory rules:
- No semicolons
- No code comments
- Follow existing architecture patterns

### 3. Analyze Existing Architecture

Before creating or modifying:
1. Survey the project structure (folders, naming conventions).
2. Identify patterns in similar components.
3. Note state management approach (hooks, context, external state).
4. Review composition patterns (compound components, render props, etc.).

Read: `references/architecture-patterns.md`

### 4. Apply No-Semicolon Rule

Write all code without semicolons:
```tsx
const value = 42
export default Component
```

NOT:
```tsx
const value = 42;
export default Component;
```

Read: `references/no-semicolons.md` for edge cases and tooling.

### 5. Write Self-Documenting Code

Avoid inline comments:
- Use descriptive variable and function names
- Extract complex logic to named functions
- Prefer explicit types over type inference where clarity improves

Exception: JSDoc for public API is acceptable.

### 6. Load Component Template

Read: `assets/component-template.tsx`

Use as the structural foundation.

### 7. Implement WCAG 2.2 Compliance

Refer to: `.github/skills/react-components/references/a11y-wcag22.md`

Waterworks components MUST:
- Use semantic HTML exclusively
- Support full keyboard navigation (Tab, Enter, Space, Escape, Arrows)
- Provide correct ARIA attributes
- Manage focus for modals and dynamic content
- Meet contrast ratios (4.5:1 normal text, 3:1 large text)
- Respect `prefers-reduced-motion`
- Meet target size requirements (24×24px minimum)

### 8. Follow TypeScript Patterns

Refer to: `.github/skills/react-components/references/react-ts-patterns.md`

Define explicit prop interfaces.
Avoid `any` types.
Use discriminated unions for complex state.

### 9. Test Accessibility

Create test file with:
- Unit tests for component logic
- Accessibility tests using axe
- Keyboard navigation tests

Suggested commands:
- `npm run lint`
- `npm test -- <ComponentName>`
- `npm run a11y`

### 10. Validate Against Architecture

Check:
- Component fits within existing folder structure
- Naming follows established conventions
- Composition pattern matches similar components
- State management aligns with project approach

## Error Handling

**Semicolon detected**: Remove all semicolons. Review code before submission.

**Code comment added**: Remove unless it is JSDoc for public API.

**Architecture mismatch**: Review existing components and align approach. Do not introduce new patterns without justification.

**Accessibility violation**: Refer to `a11y-wcag22.md` and correct. Run axe tests.

## References

- No-Semicolon Guide: `references/no-semicolons.md`
- Architecture Patterns: `references/architecture-patterns.md`
- WCAG 2.2 Guidelines: `.github/skills/react-components/references/a11y-wcag22.md`
- TypeScript Patterns: `.github/skills/react-components/references/react-ts-patterns.md`

## Assets

- Component Template: `assets/component-template.tsx`
