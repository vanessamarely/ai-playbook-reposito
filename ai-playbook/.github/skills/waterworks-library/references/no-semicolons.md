# No-Semicolon JavaScript/TypeScript

## Overview

Waterworks enforces a no-semicolon style for all JavaScript and TypeScript code.

## Rules

1. Do NOT place semicolons at the end of statements.
2. Do NOT place semicolons after object or array literals.
3. Do NOT place semicolons after function declarations or expressions.
4. Do NOT place semicolons after class declarations.

## Examples

### Variable Declarations

Correct:
```tsx
const name = 'Waterworks'
let count = 0
const items = [1, 2, 3]
```

Incorrect:
```tsx
const name = 'Waterworks';
let count = 0;
const items = [1, 2, 3];
```

### Functions

Correct:
```tsx
function greet(name: string) {
  return `Hello, ${name}`
}

const greet = (name: string) => {
  return `Hello, ${name}`
}
```

Incorrect:
```tsx
function greet(name: string) {
  return `Hello, ${name}`;
}

const greet = (name: string) => {
  return `Hello, ${name}`;
};
```

### Imports and Exports

Correct:
```tsx
import React from 'react'
import { useState } from 'react'

export default Component
export { Helper }
```

Incorrect:
```tsx
import React from 'react';
import { useState } from 'react';

export default Component;
export { Helper };
```

### Objects and Arrays

Correct:
```tsx
const config = {
  theme: 'light',
  lang: 'en'
}

const values = [
  1,
  2,
  3
]
```

Incorrect:
```tsx
const config = {
  theme: 'light',
  lang: 'en'
};

const values = [
  1,
  2,
  3
];
```

### Classes

Correct:
```tsx
class Component {
  state = { count: 0 }

  increment() {
    this.setState({ count: this.state.count + 1 })
  }
}
```

Incorrect:
```tsx
class Component {
  state = { count: 0 };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }
}
```

## Edge Cases

### Immediately Invoked Function Expressions (IIFE)

Prefix with semicolon when necessary:

```tsx
;(function() {
  console.log('IIFE')
})()
```

### Array Access After Statement

Prefix with semicolon when line starts with `[`:

```tsx
const value = getValue()
;[1, 2, 3].forEach(n => console.log(n))
```

### Parentheses After Statement

Prefix with semicolon when line starts with `(`:

```tsx
const result = calculate()
;(async () => {
  await process(result)
})()
```

## Tooling

### ESLint Configuration

Add to `.eslintrc.json`:
```json
{
  "rules": {
    "semi": ["error", "never"]
  }
}
```

### Prettier Configuration

Add to `.prettierrc`:
```json
{
  "semi": false
}
```

### TypeScript Compiler

TypeScript does not require or enforce semicolons; the no-semicolon style is fully supported.

## Rationale

The no-semicolon style:
- Reduces visual noise
- Aligns with modern JavaScript practices
- Is supported by automatic semicolon insertion (ASI) rules
- Matches the style of many popular projects (Vue, Svelte, etc.)
