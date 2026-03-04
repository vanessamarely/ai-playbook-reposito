# Component Name: [Component Name]

## Overview

Brief description of the component's purpose and primary use cases.

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `prop1` | `string` | Yes | - | Description of prop1 |
| `prop2` | `number` | No | `0` | Description of prop2 |
| `onAction` | `(value: T) => void` | No | - | Callback when action occurs |

## Behavior

### Interaction Model

Describe how users interact with the component:
- Click behavior
- Keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
- Touch gestures (if applicable)
- Drag-and-drop (if applicable)

### State Management

List internal state:
- State variable 1: Purpose and transitions
- State variable 2: Purpose and transitions

## Accessibility Requirements

### Semantic HTML

Specify the base HTML element(s):
- `<button>` for actions
- `<a>` for navigation
- `<input>` for form fields
- Custom element structure

### Keyboard Support

| Key | Function |
|-----|----------|
| Tab | Focus the component |
| Enter | Activate primary action |
| Space | Activate primary action |
| Escape | Close/cancel (if applicable) |
| Arrow keys | Navigate sub-items (if applicable) |

### ARIA Attributes

Required ARIA:
- `role`: Specify if non-semantic element used
- `aria-label`: When no visible label
- `aria-labelledby`: Reference to visible label ID
- `aria-describedby`: Additional context
- `aria-expanded`: For toggles
- `aria-pressed`: For toggle buttons
- `aria-live`: For dynamic updates
- `aria-modal`: For dialogs

### Focus Management

- Initial focus target when component mounts (if applicable)
- Focus trap behavior (if modal/dialog)
- Focus restoration on unmount

### Screen Reader Announcements

List what should be announced:
- State changes
- Error messages
- Success confirmations
- Loading states

## Visual Requirements

### States

- Default
- Hover
- Focus
- Active/Pressed
- Disabled
- Loading
- Error

### Color Contrast

Verify:
- Text on background: 4.5:1 (normal), 3:1 (large)
- Interactive elements: 3:1 against adjacent colors

### Responsive Behavior

- Mobile breakpoint adjustments
- Tablet considerations
- Desktop layout

## Edge Cases

- Empty state (no data)
- Long text content (truncation or wrapping)
- Many items (virtualization or pagination)
- Network errors
- Permissions issues

## Testing Criteria

### Unit Tests

- Prop validation
- State transitions
- Event handler invocation

### Integration Tests

- User interaction flows
- Component composition
- Context integration

### Accessibility Tests

- Automated axe checks
- Keyboard navigation manual test
- Screen reader compatibility

## Dependencies

- React version requirement
- Third-party libraries (if any)
- Icon library (if icons used)

## Example Usage

```tsx
<ComponentName
  prop1="value"
  prop2={42}
  onAction={(value) => console.log(value)}
/>
```

## Related Components

- Link to similar or complementary components
