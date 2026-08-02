# Component Specification: [Component Name]

## Overview

Brief description of the component's purpose and primary use cases.

## Props

```tsx
interface ComponentNameProps {
  prop1: string
  prop2?: number
  onAction?: (value: T) => void
}
```

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `prop1` | `string` | Yes | - | Description |
| `prop2` | `number` | No | `0` | Description |
| `onAction` | `(value: T) => void` | No | - | Callback description |

## Behavior

### User Interactions

- Click: [What happens]
- Keyboard: [Tab, Enter, Space, Escape, Arrows]
- Touch: [Tap, swipe, etc.]

### State Management

- `state1`: [Purpose and transitions]
- `state2`: [Purpose and transitions]

## Accessibility

### Semantic HTML

Base element: `<button>` / `<a>` / `<input>` / etc.

### Keyboard Support

| Key | Action |
|-----|--------|
| Tab | Move focus to/from component |
| Enter | Activate primary action |
| Space | Activate primary action |
| Escape | Cancel/close (if applicable) |

### ARIA Attributes

Required:
- `aria-label` or `aria-labelledby`: [When needed]
- `aria-expanded`: [For toggles]
- `aria-pressed`: [For toggle buttons]
- `role`: [If non-semantic element required]

### Focus Management

- Initial focus: [Target element]
- Focus trap: [Yes/No, when applicable]
- Focus restoration: [On close/unmount]

## Visual States

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error

## Responsive Design

- Mobile: [Adjustments]
- Tablet: [Adjustments]
- Desktop: [Default layout]

## Edge Cases

- Empty data
- Long text content
- Many items
- Network errors

## Testing

### Unit Tests

- Prop validation
- Event handler invocation
- State transitions

### Integration Tests

- User interaction flows
- Component composition

### Accessibility Tests

- Axe automated checks
- Keyboard navigation
- Screen reader compatibility

## Example Usage

```tsx
<ComponentName
  prop1="value"
  onAction={(value) => console.log(value)}
/>
```

## Related Components

- Link to similar components
