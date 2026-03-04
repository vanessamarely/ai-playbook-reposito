# Pull Request Checklist

## Code Quality

- [ ] Code follows project conventions and style guide
- [ ] No unrelated changes included (formatting, refactoring)
- [ ] Variable and function names are descriptive
- [ ] Complex logic has clear structure or extraction
- [ ] No commented-out code (unless with explanation)
- [ ] No console.log or debugging statements
- [ ] Imports are organized and unused imports removed

## Type Safety (TypeScript)

- [ ] No use of `any` without justification
- [ ] Props interfaces are explicit and accurate
- [ ] Event handlers are properly typed
- [ ] Null/undefined cases are handled
- [ ] Type assertions are avoided or justified

## Accessibility

- [ ] Semantic HTML elements used correctly
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators visible on interactive elements
- [ ] ARIA attributes used appropriately (not overused)
- [ ] Form inputs have associated labels
- [ ] Modals trap focus and restore on close
- [ ] Dynamic content updates are announced (aria-live)
- [ ] Color contrast meets WCAG 2.2 AA (4.5:1 normal, 3:1 large)
- [ ] Animations respect prefers-reduced-motion
- [ ] Interactive targets meet minimum size (24×24px)

## Functionality

- [ ] Component renders correctly in all expected states
- [ ] Edge cases handled (empty, loading, error states)
- [ ] Event handlers attached and functional
- [ ] Props are validated and defaults provided
- [ ] State updates are predictable
- [ ] Side effects are cleaned up (useEffect return)

## Testing

- [ ] Unit tests added for new functionality
- [ ] Integration tests added for user flows
- [ ] Accessibility tests included (axe or manual)
- [ ] Tests cover edge cases and error conditions
- [ ] All tests pass locally
- [ ] No test files skipped or commented out

## Performance

- [ ] No unnecessary re-renders
- [ ] Large lists use virtualization if needed
- [ ] Images are optimized and lazy-loaded if appropriate
- [ ] Expensive computations use useMemo or moved outside render
- [ ] Event handlers use useCallback when passed as props

## Security

- [ ] User input is validated and sanitized
- [ ] No hardcoded secrets or API keys
- [ ] XSS risks mitigated (avoid dangerouslySetInnerHTML without sanitization)
- [ ] Dependencies are up to date (no known vulnerabilities)

## Documentation

- [ ] Complex components have JSDoc comments
- [ ] Props are documented if not self-explanatory
- [ ] README or docs updated if API changed
- [ ] Breaking changes noted with migration guidance

## Project-Specific

- [ ] Framework-specific patterns followed (Nest, Express, etc.)

## Verification Commands Run

- [ ] `npm run lint` (or equivalent)
- [ ] `npm test` (or equivalent)
- [ ] `npm run type-check` (TypeScript)
- [ ] `npm run build` (if applicable)

## Review Notes

Add any additional context, decisions, or trade-offs made:

-
