# WCAG 2.2 Level AA - React Implementation Guide

## Overview

This reference provides actionable WCAG 2.2 Level AA requirements mapped to React component development.

## 1. Perceivable

### 1.1 Text Alternatives

**1.1.1 Non-text Content (A)**

All non-text content must have a text alternative.

Images:
```tsx
<img src="logo.png" alt="Company Logo" />
<img src="decorative.png" alt="" />
```

Icon buttons:
```tsx
<button aria-label="Close dialog">
  <XIcon />
</button>
```

### 1.3 Adaptable

**1.3.1 Info and Relationships (A)**

Use semantic HTML to convey structure:
```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main>
  <h1>Page Title</h1>
  <section>
    <h2>Section Title</h2>
  </section>
</main>
```

**1.3.2 Meaningful Sequence (A)**

Ensure DOM order matches visual order for screen readers.

**1.3.4 Orientation (AA)**

Do not restrict content to a single orientation unless essential.

**1.3.5 Identify Input Purpose (AA)**

Use autocomplete attributes on form inputs:
```tsx
<input type="email" name="email" autoComplete="email" />
<input type="tel" name="phone" autoComplete="tel" />
```

### 1.4 Distinguishable

**1.4.3 Contrast (Minimum) (AA)**

Text contrast ratios:
- Normal text: 4.5:1
- Large text (18pt+ or 14pt+ bold): 3:1

Check colors programmatically or with tools.

**1.4.10 Reflow (AA)**

Content must reflow to 320px width without horizontal scrolling.

**1.4.11 Non-text Contrast (AA)**

UI components and graphical objects: 3:1 contrast ratio.

**1.4.12 Text Spacing (AA)**

Support user-adjusted spacing:
- Line height: 1.5x font size
- Paragraph spacing: 2x font size
- Letter spacing: 0.12x font size
- Word spacing: 0.16x font size

**1.4.13 Content on Hover or Focus (AA)**

Tooltips and popovers must be:
- Dismissible (Escape key)
- Hoverable (pointer can move to the content)
- Persistent (does not disappear on timeout unless user dismisses)

```tsx
<Tooltip dismissible>
  <button>Info</button>
</Tooltip>
```

## 2. Operable

### 2.1 Keyboard Accessible

**2.1.1 Keyboard (A)**

All functionality must be operable via keyboard.

Interactive elements:
```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }}
>
  Action
</button>
```

**2.1.2 No Keyboard Trap (A)**

Users must be able to navigate away from any component using standard navigation.

Modal focus trap (acceptable exception):
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [onClose])
```

**2.1.4 Character Key Shortcuts (A)**

Single character shortcuts must be remappable or disabled when not in focus.

### 2.4 Navigable

**2.4.3 Focus Order (A)**

Focus order must be logical and intuitive (follows DOM order).

**2.4.7 Focus Visible (AA)**

All focusable elements must have a visible focus indicator:
```css
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

**2.4.11 Focus Not Obscured (Minimum) (AA) [NEW in 2.2]**

When an element receives focus, it must not be fully obscured by other content.

### 2.5 Input Modalities

**2.5.3 Label in Name (A)**

Visible label text must be included in the accessible name:
```tsx
<button aria-label="Submit form">Submit</button>
```

**2.5.7 Dragging Movements (AA) [NEW in 2.2]**

Provide single-pointer alternative for drag operations.

**2.5.8 Target Size (Minimum) (AA) [NEW in 2.2]**

Interactive targets must be at least 24×24 CSS pixels unless:
- Inline text links
- Essential functionality requires smaller size

```css
button {
  min-width: 44px;
  min-height: 44px;
}
```

## 3. Understandable

### 3.1 Readable

**3.1.2 Language of Parts (AA)**

Specify language changes:
```tsx
<p>This is English. <span lang="es">Esto es español.</span></p>
```

### 3.2 Predictable

**3.2.6 Consistent Help (A) [NEW in 2.2]**

If help mechanisms are provided, they must be in a consistent order.

### 3.3 Input Assistance

**3.3.1 Error Identification (A)**

Identify form errors clearly:
```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && <span id="email-error">Please enter a valid email</span>}
```

**3.3.2 Labels or Instructions (A)**

Provide labels for all inputs:
```tsx
<label htmlFor="username">Username</label>
<input id="username" type="text" />
```

**3.3.7 Redundant Entry (A) [NEW in 2.2]**

Avoid requiring users to re-enter information unless necessary for security.

**3.3.8 Accessible Authentication (Minimum) (AA) [NEW in 2.2]**

Cognitive function tests must have an alternative method (e.g., password managers for passwords).

## 4. Robust

### 4.1 Compatible

**4.1.3 Status Messages (AA)**

Use `aria-live` for dynamic status messages:
```tsx
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

Alerts:
```tsx
<div role="alert">
  Error: Form submission failed
</div>
```

## Common ARIA Patterns

### Buttons
```tsx
<button type="button" aria-pressed={isPressed}>
  Toggle
</button>
```

### Expandable Sections
```tsx
<button aria-expanded={isOpen} aria-controls="content-id">
  Expand
</button>
<div id="content-id" hidden={!isOpen}>
  Content
</div>
```

### Dialogs
```tsx
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Dialog Title</h2>
  <div>Content</div>
  <button onClick={onClose}>Close</button>
</div>
```

### Forms
```tsx
<form>
  <fieldset>
    <legend>Personal Information</legend>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" required />
  </fieldset>
</form>
```

## Motion and Animation

Respect user preference:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

In React:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
/>
```

## Testing Checklist

- [ ] Tab through interface (logical order, visible focus)
- [ ] Use Enter and Space on all interactive elements
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Run axe DevTools or similar automated checker
- [ ] Verify color contrast with contrast checker
- [ ] Test at 320px width (reflow)
- [ ] Test with 200% zoom
- [ ] Verify keyboard trap prevention
- [ ] Check ARIA attribute validity
