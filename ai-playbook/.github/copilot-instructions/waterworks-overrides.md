# Waterworks Library Overrides

## Scope

These rules apply ONLY when working on the Waterworks component library. Do NOT apply these rules to other projects.

## Detection

A project is Waterworks if:
- The project folder name contains "waterworks" (case-insensitive).
- OR a `.waterworks` marker file exists at the project root.
- OR `package.json` contains `"name": "@waterworks/*"` or `"name": "waterworks"`.

## Mandatory Style Rules

### No Semicolons

Do NOT use semicolons in TypeScript or JavaScript files.

Correct:
```typescript
const value = 42
export default Component
```

Incorrect:
```typescript
const value = 42;
export default Component;
```

### No Code Comments

Do NOT add comments inside code blocks unless they existed previously or are explicitly requested.

Avoid:
```typescript
// Calculate total
const total = items.reduce((sum, item) => sum + item.price, 0)
```

Prefer self-documenting code:
```typescript
const total = items.reduce((sum, item) => sum + item.price, 0)
```

Exception: JSDoc for public API documentation is acceptable.

### Architecture Patterns

Follow the existing architecture patterns observed in the Waterworks codebase:
1. Review the project structure before adding new components.
2. Match the existing folder organization (e.g., `components/`, `hooks/`, `utils/`).
3. Follow established naming conventions for files and exports.
4. Use the same state management approach as existing components.
5. Replicate the composition patterns used in similar components.

## Accessibility Emphasis

Waterworks is an accessible-first library. All components MUST meet WCAG 2.2 Level AA requirements:
- Semantic HTML elements.
- Full keyboard navigation support.
- Correct ARIA attributes when semantic HTML is insufficient.
- Focus indicators on all interactive elements.
- Screen reader compatibility.

Refer to `.github/skills/waterworks-library/SKILL.md` for detailed component development guidance.

## Exclusion from Other Projects

If the target project is NOT Waterworks:
- Ignore the no-semicolon rule.
- Ignore the no-comment rule.
- Use the project's local style guide instead.
