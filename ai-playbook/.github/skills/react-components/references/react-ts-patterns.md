# React + TypeScript Patterns

## Component Structure

### Functional Component with Props

```tsx
interface ButtonProps {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  )
}
```

### Children Props

```tsx
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={className}>{children}</div>
}
```

### Generic Props

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  )
}
```

## Hooks Patterns

### State with Type Inference

```tsx
const [count, setCount] = useState(0)
const [text, setText] = useState('')
const [user, setUser] = useState<User | null>(null)
```

### Complex State with useReducer

```tsx
interface State {
  count: number
  error: string | null
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'error'; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'error':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null })
```

### Refs with Typed Elements

```tsx
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [])

return <input ref={inputRef} type="text" />
```

### Custom Hooks

```tsx
interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

## Event Handlers

### Typed Event Handlers

```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
  console.log('Clicked')
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value)
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    handleSubmit()
  }
}

const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  console.log('Focused')
}
```

### Inline vs. Named Handlers

Prefer named handlers for complex logic:
```tsx
function Form() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

Use inline for simple operations:
```tsx
<button onClick={() => setOpen(true)}>Open</button>
```

## Component Composition

### Compound Components

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

### Render Props

```tsx
interface DataProviderProps<T> {
  data: T[]
  render: (data: T[]) => React.ReactNode
}

function DataProvider<T>({ data, render }: DataProviderProps<T>) {
  return <>{render(data)}</>
}
```

## Context

### Typed Context

```tsx
interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## Type Utilities

### Component Props from Element

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<'button'>

export function CustomButton(props: ButtonProps) {
  return <button {...props} />
}
```

### Extending HTML Attributes

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...inputProps }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span>{error}</span>}
    </div>
  )
}
```

### Discriminated Unions

```tsx
interface LoadingState {
  status: 'loading'
}

interface SuccessState<T> {
  status: 'success'
  data: T
}

interface ErrorState {
  status: 'error'
  error: Error
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState

function DataDisplay<T>({ state }: { state: AsyncState<T> }) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>
    case 'success':
      return <div>{JSON.stringify(state.data)}</div>
    case 'error':
      return <div>Error: {state.error.message}</div>
  }
}
```

## Performance

### Memoization

```tsx
const MemoizedComponent = React.memo(function Component({ value }: { value: string }) {
  return <div>{value}</div>
})

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

## Error Boundaries

```tsx
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message}</div>
    }
    return this.props.children
  }
}
```
