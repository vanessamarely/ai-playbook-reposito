# Testing Guide

## Overview

This project uses Vitest and React Testing Library for component testing, with jest-axe for accessibility testing. All components should have corresponding test files to ensure reliability and maintainability.

## Testing Stack

- **Vitest 3.2.4** - Fast unit test framework
- **React Testing Library 16.3.2** - Component testing utilities
- **jest-axe 10.0.0** - Accessibility testing
- **@testing-library/jest-dom 6.9.1** - Custom DOM matchers

## Test File Structure

Place test files adjacent to the components they test:

```
src/
├── components/
│   ├── UserCard/
│   │   ├── UserCard.tsx
│   │   └── UserCard.test.tsx
│   └── TodoList/
│       ├── TodoList.tsx
│       └── TodoList.test.tsx
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- UserCard

# Run tests matching pattern
npm test -- --grep "button click"
```

## Writing Component Tests

### Basic Test Structure

```typescript
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

expect.extend(toHaveNoViolations)

describe('MyComponent', () => {
  test('renders without crashing', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  test('has no accessibility violations', async () => {
    const { container } = render(<MyComponent />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('handles user interaction', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<MyComponent onClick={handleClick} />)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Querying Elements

Use queries in this priority order:

1. **Accessible to everyone**: Reflect user experience
   - `getByRole`
   - `getByLabelText`
   - `getByPlaceholderText`
   - `getByText`

2. **Semantic queries**: Only if accessible queries don't work
   - `getByAltText`
   - `getByTitle`

3. **Test IDs**: Last resort
   - `getByTestId`

```typescript
// ✅ Good - Queries by role and accessible name
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { level: 1 })
screen.getByRole('textbox', { name: /email/i })

// ✅ Good - Queries by label
screen.getByLabelText(/email address/i)

// ✅ Good - Queries by text
screen.getByText(/welcome back/i)

// ⚠️ Use sparingly - Test ID
screen.getByTestId('submit-button')
```

### Query Variants

- **getBy**: Throws error if not found (use for elements that should exist)
- **queryBy**: Returns null if not found (use for elements that shouldn't exist)
- **findBy**: Returns promise, waits for element (use for async elements)

```typescript
// Element should be there
expect(screen.getByText('Title')).toBeInTheDocument()

// Element should NOT be there
expect(screen.queryByText('Error')).not.toBeInTheDocument()

// Element appears asynchronously
const message = await screen.findByText('Loaded!')
expect(message).toBeInTheDocument()
```

## Testing User Interactions

### Setup User Events

```typescript
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()
```

### Common Interactions

```typescript
// Click
await user.click(screen.getByRole('button'))

// Type text
await user.type(screen.getByRole('textbox'), 'Hello world')

// Clear and type
await user.clear(screen.getByRole('textbox'))
await user.type(screen.getByRole('textbox'), 'New text')

// Select from dropdown
await user.selectOptions(screen.getByRole('combobox'), 'Option 1')

// Keyboard navigation
await user.tab() // Move focus forward
await user.keyboard('{Shift>}{Tab}{/Shift}') // Move focus backward
await user.keyboard('{Enter}') // Press Enter
await user.keyboard('{Escape}') // Press Escape

// Hover
await user.hover(screen.getByRole('button'))
await user.unhover(screen.getByRole('button'))
```

## Accessibility Testing

### Basic Accessibility Test

Every component should have an accessibility test:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Testing Specific Accessibility Rules

```typescript
test('checks specific a11y rules', async () => {
  const { container } = render(<Form />)
  
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
      'label': { enabled: true },
      'button-name': { enabled: true },
    },
  })
  
  expect(results).toHaveNoViolations()
})
```

### Testing with Different States

```typescript
test('maintains accessibility in error state', async () => {
  const { container } = render(<Input error="Invalid email" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('maintains accessibility when disabled', async () => {
  const { container } = render(<Button disabled>Click</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Keyboard Accessibility Testing

```typescript
test('supports keyboard navigation', async () => {
  const user = userEvent.setup()
  const handleSubmit = vi.fn()
  
  render(<Form onSubmit={handleSubmit} />)
  
  // Tab to first input
  await user.tab()
  expect(screen.getByLabelText(/name/i)).toHaveFocus()
  
  // Type in input
  await user.keyboard('John Doe')
  
  // Tab to next input
  await user.tab()
  expect(screen.getByLabelText(/email/i)).toHaveFocus()
  
  // Type in input
  await user.keyboard('john@example.com')
  
  // Tab to submit button
  await user.tab()
  expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus()
  
  // Submit with Enter
  await user.keyboard('{Enter}')
  expect(handleSubmit).toHaveBeenCalled()
})
```

### Focus Management Testing

```typescript
test('manages focus in modal', async () => {
  const user = userEvent.setup()
  
  render(<DialogExample />)
  
  const trigger = screen.getByRole('button', { name: /open/i })
  await user.click(trigger)
  
  // Focus should move into dialog
  const dialog = screen.getByRole('dialog')
  expect(dialog).toBeInTheDocument()
  
  // Close button should receive focus
  const closeButton = screen.getByRole('button', { name: /close/i })
  expect(closeButton).toHaveFocus()
  
  // Press Escape to close
  await user.keyboard('{Escape}')
  
  // Focus returns to trigger
  expect(trigger).toHaveFocus()
})
```

## Testing Async Behavior

### Waiting for Elements

```typescript
test('displays loading then data', async () => {
  render(<DataComponent />)
  
  // Initially shows loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  
  // Wait for data to appear
  const data = await screen.findByText(/data loaded/i)
  expect(data).toBeInTheDocument()
  
  // Loading should be gone
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
})
```

### Testing with waitFor

```typescript
import { waitFor } from '@testing-library/react'

test('updates after async operation', async () => {
  const user = userEvent.setup()
  render(<AsyncComponent />)
  
  await user.click(screen.getByRole('button', { name: /load/i }))
  
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument()
  })
})
```

## Mocking

### Mocking Functions

```typescript
import { vi } from 'vitest'

test('calls callback on click', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()
  
  render(<Button onClick={handleClick}>Click</Button>)
  
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(handleClick).toHaveBeenCalledWith(expect.any(Object))
})
```

### Mocking useKV Hook

```typescript
import { vi } from 'vitest'

vi.mock('@github/spark/hooks', () => ({
  useKV: (key: string, defaultValue: any) => {
    const [value, setValue] = useState(defaultValue)
    return [value, setValue, vi.fn()]
  },
}))

test('persists data with useKV', async () => {
  const user = userEvent.setup()
  render(<TodoList />)
  
  const input = screen.getByRole('textbox', { name: /new todo/i })
  await user.type(input, 'Buy groceries')
  
  const addButton = screen.getByRole('button', { name: /add/i })
  await user.click(addButton)
  
  expect(screen.getByText('Buy groceries')).toBeInTheDocument()
})
```

### Mocking Fetch

```typescript
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked' }),
    ok: true,
  })
) as any

test('fetches and displays data', async () => {
  render(<DataFetcher />)
  
  const data = await screen.findByText('mocked')
  expect(data).toBeInTheDocument()
  
  expect(fetch).toHaveBeenCalledWith('/api/data')
})
```

## Testing Forms

```typescript
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Too short'),
})

test('validates form inputs', async () => {
  const user = userEvent.setup()
  const handleSubmit = vi.fn()
  
  render(<LoginForm onSubmit={handleSubmit} />)
  
  // Submit empty form
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  // Check for validation errors
  expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
  expect(screen.getByText(/too short/i)).toBeInTheDocument()
  
  // Form should not submit
  expect(handleSubmit).not.toHaveBeenCalled()
  
  // Fill form correctly
  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/password/i), 'securepass123')
  
  // Submit again
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  // Form should submit
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalled()
  })
})
```

## Testing Custom Hooks

```typescript
import { renderHook } from '@testing-library/react'

test('custom hook behavior', () => {
  const { result } = renderHook(() => useCounter(0))
  
  expect(result.current.count).toBe(0)
  
  act(() => {
    result.current.increment()
  })
  
  expect(result.current.count).toBe(1)
})
```

## Snapshot Testing

Use sparingly for static content:

```typescript
test('matches snapshot', () => {
  const { container } = render(<StaticComponent />)
  expect(container).toMatchSnapshot()
})
```

## Common Testing Patterns

### Testing Conditional Rendering

```typescript
test('shows message when no items', () => {
  render(<List items={[]} />)
  expect(screen.getByText(/no items/i)).toBeInTheDocument()
})

test('shows items when provided', () => {
  const items = ['Item 1', 'Item 2']
  render(<List items={items} />)
  
  expect(screen.queryByText(/no items/i)).not.toBeInTheDocument()
  expect(screen.getByText('Item 1')).toBeInTheDocument()
  expect(screen.getByText('Item 2')).toBeInTheDocument()
})
```

### Testing Error States

```typescript
test('displays error message', async () => {
  global.fetch = vi.fn(() => Promise.reject(new Error('Failed')))
  
  render(<DataComponent />)
  
  const error = await screen.findByText(/failed to load/i)
  expect(error).toBeInTheDocument()
})
```

### Testing Loading States

```typescript
test('shows loading indicator', () => {
  render(<AsyncComponent loading={true} />)
  expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
})

test('hides loading when complete', () => {
  render(<AsyncComponent loading={false} data="Result" />)
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
  expect(screen.getByText('Result')).toBeInTheDocument()
})
```

## Best Practices

### Do's ✅

- Test user behavior, not implementation
- Use accessible queries (getByRole, getByLabelText)
- Test accessibility with jest-axe
- Test keyboard interactions
- Wait for async updates with findBy or waitFor
- Use userEvent for realistic interactions
- Keep tests focused and isolated
- Write descriptive test names
- Test error states and edge cases

### Don'ts ❌

- Don't test implementation details
- Don't use getByTestId unless necessary
- Don't test external libraries (e.g., shadcn components)
- Don't use act() directly (use async utilities instead)
- Don't snapshot test frequently changing UI
- Don't mock everything
- Don't write brittle tests coupled to structure
- Don't forget to test accessibility

## Coverage Goals

Aim for:
- **80%+ overall coverage**
- **100% coverage for critical paths**
- **All components have accessibility tests**
- **All user interactions tested**

## Example: Complete Component Test

```typescript
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { TodoList } from './TodoList'

expect.extend(toHaveNoViolations)

describe('TodoList', () => {
  test('renders empty state', () => {
    render(<TodoList />)
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })

  test('has no accessibility violations', async () => {
    const { container } = render(<TodoList />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('adds new todo', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByRole('textbox', { name: /new todo/i })
    const addButton = screen.getByRole('button', { name: /add/i })
    
    await user.type(input, 'Buy groceries')
    await user.click(addButton)
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  test('toggles todo completion', async () => {
    const user = userEvent.setup()
    render(<TodoList initialTodos={[{ id: 1, text: 'Task', done: false }]} />)
    
    const checkbox = screen.getByRole('checkbox', { name: /task/i })
    expect(checkbox).not.toBeChecked()
    
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  test('deletes todo', async () => {
    const user = userEvent.setup()
    render(<TodoList initialTodos={[{ id: 1, text: 'Task', done: false }]} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete task/i })
    await user.click(deleteButton)
    
    expect(screen.queryByText('Task')).not.toBeInTheDocument()
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    await user.tab()
    expect(screen.getByRole('textbox', { name: /new todo/i })).toHaveFocus()
    
    await user.keyboard('New task{Enter}')
    
    expect(screen.getByText('New task')).toBeInTheDocument()
  })
})
```

## Resources

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
