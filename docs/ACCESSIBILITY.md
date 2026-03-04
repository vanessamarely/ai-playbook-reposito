# Accessibility Guidelines

## WCAG 2.2 Level AA Compliance

This project follows Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. All components and features must meet these standards.

## Core Principles

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.

#### Color & Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio for borders, icons, states
- **Do not rely on color alone** to convey information

#### Text Alternatives
- All `<img>` elements require meaningful `alt` attributes
- Decorative images use `alt=""` or `role="presentation"`
- Icon buttons require `aria-label` or visible text

#### Multimedia
- Provide captions for videos
- Provide transcripts for audio
- Ensure media players are keyboard accessible

### 2. Operable
UI components and navigation must be operable by all users.

#### Keyboard Accessibility
All functionality available via mouse must also be available via keyboard:

- **Tab**: Move focus forward
- **Shift+Tab**: Move focus backward
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within components (menus, tabs, etc.)
- **Escape**: Close dialogs, menus, popovers

#### Focus Management
- Visible focus indicators on all interactive elements
- Focus order follows logical reading order
- No keyboard traps (users can navigate away from any element)
- When opening modals/dialogs, focus moves into them
- When closing modals/dialogs, focus returns to trigger element

#### Target Size
- Interactive elements minimum 44×44 CSS pixels
- Adequate spacing between adjacent targets

#### No Time Limits
- Users can disable, adjust, or extend time limits
- Or provide at least 20 seconds warning with option to extend

### 3. Understandable
Information and operation of UI must be understandable.

#### Semantic HTML
Use appropriate HTML elements:

```typescript
<button> for actions
<a href="..."> for navigation
<nav> for navigation regions
<main> for main content
<header> for page/section headers
<footer> for page/section footers
<article> for self-contained content
<aside> for tangentially related content
<section> for thematic grouping
<h1>-<h6> for headings (logical hierarchy)
```

#### Form Labels
- Every `<input>`, `<select>`, `<textarea>` has an associated `<label>`
- Use `<label htmlFor="input-id">` or wrap input in label
- Provide clear error messages associated with fields
- Use `aria-describedby` for help text and errors

#### Headings
- Use heading elements (`<h1>`-`<h6>`) to establish page structure
- Don't skip heading levels
- One `<h1>` per page
- Headings describe the content that follows

#### Link Purpose
- Link text clearly describes destination or purpose
- Avoid "click here" or "read more" without context
- Use `aria-label` when link text alone is insufficient

### 4. Robust
Content must be robust enough to work with current and future assistive technologies.

#### Valid HTML
- Use semantic HTML elements correctly
- Close all tags properly
- Unique `id` attributes
- Valid ARIA usage

#### ARIA Usage
Only use ARIA when semantic HTML is insufficient.

**Common ARIA Attributes:**
- `aria-label`: Provides accessible name when no visible text
- `aria-labelledby`: References element(s) that label this element
- `aria-describedby`: References element(s) that describe this element
- `aria-hidden="true"`: Hides decorative elements from screen readers
- `aria-live`: Announces dynamic content changes
- `aria-expanded`: Indicates expanded/collapsed state
- `aria-selected`: Indicates selected state in widgets
- `aria-checked`: Indicates checked state for checkboxes/radios
- `aria-disabled`: Indicates disabled state
- `aria-current`: Indicates current item in navigation

**ARIA Rules:**
1. Use semantic HTML first, ARIA second
2. Don't change native semantics (e.g., `<button role="heading">`)
3. All interactive elements must be keyboard accessible
4. Don't use `aria-label` on static elements
5. Validate ARIA roles, states, and properties

## Component Accessibility Patterns

### Buttons
```typescript
// Good: Semantic button with visible text
<Button>Submit Form</Button>

// Good: Icon button with aria-label
<Button aria-label="Close dialog">
  <X />
</Button>

// Bad: Missing accessible name
<Button><X /></Button>

// Bad: Non-button element
<div onClick={...}>Click me</div>
```

### Forms
```typescript
// Good: Label association
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />

// Good: Error messaging
<Input 
  id="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && <p id="email-error" className="text-destructive">Invalid email</p>}

// Good: Required field indication
<Label htmlFor="name">
  Name <span aria-label="required">*</span>
</Label>
<Input id="name" required />
```

### Dialogs/Modals
```typescript
// Use shadcn Dialog component (already accessible)
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Description of dialog purpose
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>

// Requirements:
// - Focus trapped within dialog when open
// - Escape key closes dialog
// - Focus returns to trigger on close
// - Title and description for screen readers
```

### Custom Dropdowns/Menus
```typescript
// Use shadcn DropdownMenu (already accessible)
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button aria-label="Open menu">
      <DotsThree />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={...}>
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onSelect={...}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Requirements:
// - Arrow keys navigate items
// - Enter/Space activates items
// - Escape closes menu
// - Focus returns to trigger on close
```

### Navigation
```typescript
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/" aria-current={isHome ? "page" : undefined}>
        Home
      </a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
  </ul>
</nav>

// Multiple nav regions need unique labels
<nav aria-label="Primary">...</nav>
<nav aria-label="Footer">...</nav>
```

### Images
```typescript
// Informative image
<img src={photo} alt="Sunset over mountains" />

// Decorative image
<img src={pattern} alt="" />

// Icon with text
<Button>
  <Save />
  Save Document
</Button>

// Icon without text
<Button aria-label="Save document">
  <Save />
</Button>

// Background image with content
<div 
  style={{backgroundImage: `url(${hero})`}}
  role="img"
  aria-label="Team collaboration"
>
  <h1>Welcome</h1>
</div>
```

### Live Regions
```typescript
// Announcements (non-intrusive)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Urgent announcements
<div aria-live="assertive" aria-atomic="true">
  {errorMessage}
</div>

// Use Sonner for toast notifications (already accessible)
toast.success("Item saved")
```

### Tables
```typescript
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
    </tr>
  </tbody>
</table>
```

### Skip Links
```typescript
// Add at top of page for keyboard users
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

## Testing Accessibility

### Automated Testing with jest-axe

```typescript
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('component has no accessibility violations', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist

#### Keyboard Testing
- [ ] Tab through all interactive elements
- [ ] Verify focus is always visible
- [ ] Verify focus order is logical
- [ ] Test all keyboard shortcuts
- [ ] Ensure no keyboard traps
- [ ] Test Escape key closes modals/menus

#### Screen Reader Testing
- [ ] All images have appropriate alt text
- [ ] All form inputs have labels
- [ ] Page structure uses headings correctly
- [ ] Landmarks identify page regions
- [ ] Dynamic content changes are announced
- [ ] Error messages are associated with fields

#### Visual Testing
- [ ] Text contrast meets 4.5:1 minimum
- [ ] UI component contrast meets 3:1 minimum
- [ ] Focus indicators are visible
- [ ] Content readable at 200% zoom
- [ ] No horizontal scrolling at 320px width
- [ ] Color is not sole means of conveying information

#### Interaction Testing
- [ ] Touch targets are at least 44×44px
- [ ] Adequate spacing between targets
- [ ] No time limits or they are adjustable
- [ ] Forms provide clear error messages
- [ ] Error recovery is possible

### Browser Extensions
- **axe DevTools**: Automated accessibility testing
- **WAVE**: Visual accessibility evaluation
- **Lighthouse**: Accessibility audit in Chrome DevTools

### Screen Readers
- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

## Common Mistakes to Avoid

### ❌ Don't Do This
```typescript
// Missing alt text
<img src={photo} />

// Non-semantic button
<div onClick={handleClick}>Click me</div>

// Icon button without label
<Button><X /></Button>

// Invalid heading hierarchy
<h1>Page Title</h1>
<h3>Section</h3>  // Skipped h2

// Color-only indication
<span className="text-red-500">Error</span>

// Inaccessible custom control
<div onClick={toggle}>{isOpen ? '▼' : '▶'}</div>

// Missing form labels
<Input placeholder="Enter email" />

// Redundant ARIA
<button role="button">Click</button>

// Incorrect ARIA
<div role="button">Not keyboard accessible</div>
```

### ✅ Do This Instead
```typescript
// Meaningful alt text
<img src={photo} alt="Sunset over mountains" />

// Semantic button
<Button onClick={handleClick}>Click me</Button>

// Icon button with label
<Button aria-label="Close"><X /></Button>

// Valid heading hierarchy
<h1>Page Title</h1>
<h2>Section</h2>

// Multiple indicators
<span className="text-destructive flex items-center gap-2">
  <AlertCircle aria-hidden="true" />
  <span>Error: Invalid input</span>
</span>

// Accessible custom control
<Button 
  onClick={toggle}
  aria-expanded={isOpen}
  aria-label="Toggle section"
>
  {isOpen ? <CaretDown /> : <CaretRight />}
</Button>

// Proper form labels
<Label htmlFor="email">Email Address</Label>
<Input id="email" placeholder="you@example.com" />

// Use semantic HTML
<button>Click</button>

// Make div keyboard accessible (but prefer button)
<div 
  role="button" 
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Custom button
</div>
```

## Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)
- [Inclusive Components](https://inclusive-components.design/)

## Support

When implementing new features, always consider:
1. Can this be used with keyboard only?
2. Will screen readers understand this?
3. Is the contrast sufficient?
4. Are focus indicators visible?
5. Have I tested with automated tools?

Accessibility is not optional—it's a core requirement for all components and features.
