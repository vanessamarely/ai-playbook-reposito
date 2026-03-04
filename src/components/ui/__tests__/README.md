# Component Testing Examples

This directory contains example tests for shadcn/ui components demonstrating:

- Basic rendering tests
- Accessibility testing with jest-axe  
- User interaction testing with React Testing Library
- Keyboard accessibility verification

## Running These Tests

```bash
# Run all tests
npm test

# Run button tests specifically  
npm test -- button

# Run with coverage
npm test -- --coverage
```

## Test Patterns

### 1. Basic Rendering
```typescript
test('renders component', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})
```

### 2. Accessibility Testing
```typescript
test('has no accessibility violations', async () => {
  const { container } = render(<Button>Accessible</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### 3. User Interactions
```typescript
test('handles click events', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()
  
  render(<Button onClick={handleClick}>Click me</Button>)
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).toHaveBeenCalled()
})
```

### 4. Keyboard Accessibility
```typescript
test('supports keyboard navigation', async () => {
  const user = userEvent.setup()
  render(<Button>Press me</Button>)
  
  await user.tab()
  expect(screen.getByRole('button')).toHaveFocus()
  
  await user.keyboard('{Enter}')
})
```

## Adding Tests for Your Components

When creating custom components, follow these guidelines:

1. **Always test accessibility** - Every component should have an `axe` test
2. **Test user interactions** - Click, type, keyboard navigation
3. **Test different states** - Default, hover, focus, disabled, error
4. **Use accessible queries** - Prefer `getByRole` and `getByLabelText`
5. **Test edge cases** - Empty states, error states, loading states

See `/docs/TESTING.md` for comprehensive testing guide.
