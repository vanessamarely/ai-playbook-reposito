# Waterworks Architecture Patterns

## Overview

Waterworks follows consistent architectural patterns across all components. Before adding or modifying components, review existing code to understand established conventions.

## Component Organization

### Directory Structure

```
waterworks/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
├── hooks/
│   ├── useAccessibility.ts
│   ├── useFocusTrap.ts
│   └── useKeyboard.ts
├── utils/
│   ├── a11y.ts
│   ├── classNames.ts
│   └── keyboard.ts
└── types/
    └── index.ts
```

Each component:
- Lives in its own directory
- Has a main `.tsx` file matching the component name
- Has a test file
- Exports through `index.ts` for clean imports

## Component Composition Patterns

### Compound Components

Preferred for complex components with sub-parts:

```tsx
interface TabsProps {
  children: React.ReactNode
  defaultValue: string
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent
```

Usage:
```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

### Render Props

Used for flexible rendering:

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>
}
```

### Slots Pattern

For layout components with named content areas:

```tsx
interface CardProps {
  header?: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
}

export function Card({ header, content, footer }: CardProps) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">{content}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
```

## State Management

### Local State (useState)

Use for component-specific state:
- UI state (open/closed, active tab)
- Form input values
- Transient selections

```tsx
const [isOpen, setIsOpen] = useState(false)
```

### Complex Local State (useReducer)

Use for multi-field state with interdependencies:

```tsx
const [state, dispatch] = useReducer(reducer, initialState)
```

### Context

Use for cross-cutting concerns within a component tree:
- Theme
- Accessibility settings
- Shared component state (compound components)

Avoid for general application state (use external state management instead).

## Custom Hooks

Extract reusable logic into custom hooks:

### Focus Management

```tsx
function useFocusTrap(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [containerRef])
}
```

### Keyboard Navigation

```tsx
function useKeyboard(handlers: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = handlers[e.key]
      if (handler) {
        e.preventDefault()
        handler()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
```

## Accessibility Utilities

### ID Generation

```tsx
function useUniqueId(prefix: string): string {
  const idRef = useRef<string>()
  if (!idRef.current) {
    idRef.current = `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }
  return idRef.current
}
```

### ARIA Announcements

```tsx
function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', priority)
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  document.body.appendChild(announcer)

  setTimeout(() => {
    announcer.textContent = message
  }, 100)

  setTimeout(() => {
    document.body.removeChild(announcer)
  }, 1000)
}
```

## Styling

### CSS Modules (if used)

```tsx
import styles from './Button.module.css'

export function Button() {
  return <button className={styles.button}>Click</button>
}
```

### ClassName Utility

```tsx
function classNames(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

const buttonClass = classNames(
  'btn',
  variant === 'primary' && 'btn-primary',
  disabled && 'btn-disabled'
)
```

## Testing Patterns

### Accessibility Testing

Every component test includes axe checks:

```tsx
import { axe } from 'jest-axe'

test('should have no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Keyboard Testing

```tsx
test('should trigger onClick with Enter key', () => {
  const handleClick = jest.fn()
  const { getByRole } = render(<Button onClick={handleClick}>Click</Button>)
  const button = getByRole('button')

  fireEvent.keyDown(button, { key: 'Enter' })
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## Documentation

Use JSDoc for public APIs:

```tsx
/**
 * Button component with full accessibility support
 */
interface ButtonProps {
  /**
   * Button label text
   */
  children: React.ReactNode
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * Visual style variant
   */
  variant?: 'primary' | 'secondary'
}
```
