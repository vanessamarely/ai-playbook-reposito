# Project Context

## Overview
This is a React + TypeScript web application built with Vite, using the Spark template framework. The application is designed for rapid prototyping and production-ready micro-applications.

## Technology Stack

### Core Framework
- **React 19.2.0** - Modern React with latest features
- **TypeScript 5.7.3** - Type-safe JavaScript
- **Vite 7.2.6** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **shadcn/ui v4** - Pre-built accessible component library
- **Framer Motion 12.23.25** - Animation library
- **Radix UI** - Unstyled, accessible component primitives

### State Management & Data
- **React Hooks** - Built-in state management (useState, useEffect, etc.)
- **@github/spark hooks** - Custom hooks including `useKV` for persistence
- **TanStack Query 5.90.11** - Data fetching and caching

### Icons & Assets
- **Phosphor Icons** - Primary icon library
- **Lucide React** - Secondary icon library

### Forms & Validation
- **React Hook Form 7.67.0** - Performant form handling
- **Zod 3.25.76** - Schema validation

### Testing
- **Vitest 3.2.4** - Unit testing framework
- **React Testing Library 16.3.2** - Component testing utilities
- **jest-axe 10.0.0** - Accessibility testing
- **@testing-library/jest-dom 6.9.1** - DOM matchers

### Additional Libraries
- **D3 7.9.0** - Data visualization
- **Three.js 0.175.0** - 3D graphics
- **date-fns 3.6.0** - Date manipulation
- **Recharts 2.15.4** - Chart components
- **Sonner 2.0.7** - Toast notifications

## Architecture Patterns

### Component Structure
```
src/
├── App.tsx              # Root component
├── components/
│   ├── ui/              # shadcn components (do not modify)
│   └── [custom]/        # Custom components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── styles/              # CSS files
└── assets/              # Static assets (images, videos, etc.)
```

### State Persistence
- **Persistent State**: Use `useKV` hook for data that survives page refresh
- **Temporary State**: Use `useState` for UI state that doesn't need persistence
- **Never use**: localStorage or sessionStorage directly

### Styling Approach
- Tailwind utility classes for all styling
- CSS custom properties defined in `index.css` for theming
- Component-specific styles use Tailwind composition
- No inline styles or separate CSS modules

### Component Guidelines
- All interactive components must be keyboard accessible
- Use shadcn components as base building blocks
- Compose complex components from simpler ones
- Follow single responsibility principle

## Development Workflow

### Running the Application
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
```

### Testing
```bash
npm test                      # Run all tests
npm test -- --coverage        # Run with coverage
npm test -- ComponentName     # Run specific test
```

### Code Quality
- TypeScript strict mode enabled
- ESLint for code linting
- Automatic type checking via tsgo
- Component testing with React Testing Library
- Accessibility testing with jest-axe

## Accessibility Requirements

### WCAG 2.2 Level AA Compliance
All components must meet WCAG 2.2 Level AA standards:

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus Management**: Visible focus indicators on all focusable elements
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA**: Correct ARIA attributes when semantic HTML insufficient
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Alternative Text**: All images have meaningful alt text
- **Form Labels**: All inputs properly labeled
- **Heading Hierarchy**: Logical heading structure (h1-h6)

### Testing Strategy
- Unit tests for component logic
- Integration tests for user workflows
- Accessibility tests using jest-axe
- Manual keyboard testing for complex interactions

## API Integration

### Spark Runtime SDK
Global `spark` object provides runtime features:

#### LLM API
```typescript
const prompt = spark.llmPrompt`Generate summary of: ${content}`
const result = await spark.llm(prompt)
```

#### Persistence API
```typescript
import { useKV } from '@github/spark/hooks'
const [data, setData, deleteData] = useKV("key", defaultValue)
```

#### User API
```typescript
const user = await spark.user()
// { avatarUrl, email, id, isOwner, login }
```

## Asset Management

### Asset Organization
```
src/assets/
├── images/      # PNG, JPG, SVG images
├── video/       # MP4, WebM videos
├── audio/       # MP3, WAV audio files
└── documents/   # PDF, text documents
```

### Asset Usage
Always import assets explicitly:
```typescript
import logoImg from '@/assets/images/logo.png'
<img src={logoImg} alt="Logo" />
```

## Design System

### Color Palette
Defined via CSS custom properties in `index.css`:
- `--background` / `--foreground` - Base colors
- `--primary` / `--primary-foreground` - Main actions
- `--secondary` / `--secondary-foreground` - Supporting actions
- `--accent` / `--accent-foreground` - Highlights
- `--muted` / `--muted-foreground` - De-emphasized content
- `--destructive` / `--destructive-foreground` - Warnings/errors

### Spacing
Tailwind spacing scale (0.25rem increments):
- `gap-2` (0.5rem), `gap-4` (1rem), `gap-6` (1.5rem), etc.

### Typography
- Font families loaded via Google Fonts in `index.html`
- Type scale using Tailwind classes (text-sm, text-base, text-lg, etc.)

### Border Radius
Controlled by `--radius` variable:
- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`

## Performance Considerations

### Code Splitting
- Vite handles automatic code splitting
- Use dynamic imports for large dependencies

### Asset Optimization
- Images automatically optimized by Vite
- Use appropriate formats (WebP for photos, SVG for icons)

### Bundle Size
- Tree-shaking enabled by default
- Remove unused imports
- Lazy load heavy components

## Security Best Practices

- Never commit API keys or secrets
- No console.log of sensitive data
- Validate all user inputs
- Sanitize data before rendering
- Use environment variables for configuration

## Common Patterns

### Data Fetching
```typescript
const [data, setData] = useKV("cache-key", null)

useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data')
    const json = await response.json()
    setData(json)
  }
  fetchData()
}, [])
```

### Form Handling
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, "Required"),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

### Toast Notifications
```typescript
import { toast } from 'sonner'

toast.success("Action completed!")
toast.error("Something went wrong")
```

## Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript errors: `npx tsc --noEmit`
- Clear node_modules and reinstall

**Runtime Errors**
- Check browser console for errors
- Verify all imports are correct
- Check for missing environment variables

**Styling Issues**
- Verify Tailwind classes are valid
- Check CSS variable definitions in `index.css`
- Inspect element to see applied styles

## References

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite Guide](https://vite.dev)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
