# Project Documentation

Welcome to the project documentation. This directory contains comprehensive guides to help you understand and work with the codebase effectively.

## 📚 Documentation Index

### [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
Complete overview of the project's technology stack, architecture patterns, and development workflow. Start here to understand:
- Technology stack and dependencies
- Project structure and file organization
- State management patterns
- Asset management
- API integration with Spark Runtime SDK
- Design system and styling approach
- Common patterns and best practices

### [ACCESSIBILITY.md](./ACCESSIBILITY.md)
Comprehensive accessibility guidelines following WCAG 2.2 Level AA standards. Covers:
- Core accessibility principles (Perceivable, Operable, Understandable, Robust)
- Component accessibility patterns for common UI elements
- Keyboard navigation requirements
- Screen reader considerations
- ARIA usage guidelines
- Color contrast requirements
- Testing checklist and tools
- Common mistakes and how to avoid them

### [TESTING.md](./TESTING.md)
Complete testing guide for component and integration testing. Includes:
- Testing stack overview (Vitest, React Testing Library, jest-axe)
- How to write component tests
- Accessibility testing with jest-axe
- User interaction testing patterns
- Async behavior testing
- Mocking strategies
- Form validation testing
- Best practices and common patterns
- Coverage goals

## 🚀 Quick Start

### For New Developers

1. **Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)** to understand the tech stack and architecture
2. **Review [ACCESSIBILITY.md](./ACCESSIBILITY.md)** to learn accessibility requirements
3. **Study [TESTING.md](./TESTING.md)** to understand testing expectations
4. **Explore existing components** in `src/components/` to see patterns in action
5. **Run the test suite** with `npm test` to see tests in action

### For Component Development

1. **Design Phase**: Consider accessibility from the start (see [ACCESSIBILITY.md](./ACCESSIBILITY.md))
2. **Implementation**: Follow patterns in [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
3. **Testing**: Write tests following [TESTING.md](./TESTING.md) guidelines
4. **Verification**: Ensure accessibility with jest-axe and manual testing

## 🎯 Key Principles

### Accessibility First
Every component must be accessible. This means:
- ✅ Keyboard navigable
- ✅ Screen reader compatible
- ✅ Proper ARIA attributes
- ✅ Sufficient color contrast
- ✅ Focus management
- ✅ Tested with jest-axe

### Test-Driven Quality
All components should have tests covering:
- ✅ Rendering and basic functionality
- ✅ User interactions
- ✅ Accessibility (jest-axe)
- ✅ Keyboard navigation
- ✅ Error states and edge cases

### Developer Experience
Code should be:
- ✅ Easy to understand
- ✅ Well-documented
- ✅ Following consistent patterns
- ✅ Type-safe with TypeScript
- ✅ Maintainable and testable

## 🛠 Development Workflow

### Creating a New Component

```bash
# 1. Create component file
touch src/components/MyComponent/MyComponent.tsx

# 2. Create test file
touch src/components/MyComponent/MyComponent.test.tsx

# 3. Implement component following PROJECT_CONTEXT.md patterns
# 4. Write tests following TESTING.md guidelines
# 5. Verify accessibility with jest-axe
npm test -- MyComponent

# 6. Run dev server to test visually
npm run dev
```

### Testing Workflow

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm test -- --watch

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- MyComponent
```

### Accessibility Verification

```bash
# 1. Automated testing
npm test -- --grep "accessibility"

# 2. Manual keyboard testing
# - Tab through all interactive elements
# - Verify focus indicators
# - Test with Enter/Space/Escape keys

# 3. Screen reader testing (if available)
# - NVDA (Windows)
# - VoiceOver (macOS)
# - JAWS (Windows)
```

## 📋 Checklists

### Component Checklist

Before considering a component complete:

- [ ] Component renders correctly
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader labels are present (aria-label, aria-labelledby)
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Component has unit tests
- [ ] Component has accessibility tests (jest-axe)
- [ ] User interactions are tested
- [ ] Edge cases are handled
- [ ] TypeScript types are correct
- [ ] Component follows project patterns
- [ ] Documentation/comments added if needed

### Pull Request Checklist

- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Accessibility tests pass
- [ ] Manual keyboard testing completed
- [ ] Code follows existing patterns
- [ ] New components have tests
- [ ] Documentation updated if needed

## 🎓 Learning Resources

### Internal Resources
- **Example Tests**: See `src/components/ui/__tests__/button.test.tsx`
- **Component Patterns**: Browse `src/components/` for examples
- **Styling Examples**: Check `src/index.css` for theme setup

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [React Testing Library](https://testing-library.com/react)
- [Vitest Documentation](https://vitest.dev)

## 🆘 Getting Help

### Common Issues

**Test failures after changes**
- Check TypeScript errors: `npx tsc --noEmit`
- Review test output for specific failures
- Ensure test setup is correct in `src/test-setup.ts`

**Accessibility violations**
- Review [ACCESSIBILITY.md](./ACCESSIBILITY.md) for guidelines
- Check component ARIA attributes
- Verify semantic HTML usage
- Test keyboard navigation manually

**Build errors**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors
- Verify all imports are correct

### Where to Look

- **Architecture questions**: [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- **Accessibility questions**: [ACCESSIBILITY.md](./ACCESSIBILITY.md)
- **Testing questions**: [TESTING.md](./TESTING.md)
- **Component examples**: `src/components/ui/`
- **Test examples**: `src/components/ui/__tests__/`

## 📝 Contributing to Documentation

If you notice gaps or errors in the documentation:

1. Document your findings
2. Update the relevant markdown file
3. Keep documentation concise and actionable
4. Use code examples where helpful
5. Link to external resources when appropriate

## 🔄 Keeping Documentation Updated

This documentation should evolve with the project:

- **When adding new patterns**: Update PROJECT_CONTEXT.md
- **When adding accessibility features**: Update ACCESSIBILITY.md
- **When adding testing utilities**: Update TESTING.md
- **When patterns change**: Update all relevant docs

## 📌 Quick Reference

### Essential Commands
```bash
npm run dev              # Start development server
npm test                 # Run test suite
npm test -- --watch      # Run tests in watch mode
npm test -- --coverage   # Generate coverage report
npm run build            # Build for production
npx tsc --noEmit        # Type check without building
```

### Key Files
```
docs/               # This documentation
src/App.tsx         # Main application component
src/index.css       # Global styles and theme
src/test-setup.ts   # Test configuration
vite.config.ts      # Build configuration
```

### Important Patterns
- **State**: `useState` for temporary, `useKV` for persistent
- **Styling**: Tailwind utility classes only
- **Components**: shadcn/ui as foundation, compose custom components
- **Testing**: Every component needs tests + accessibility tests
- **Icons**: Use Phosphor Icons from `@phosphor-icons/react`

---

**Last Updated**: See git history for latest changes
**Maintained By**: Development Team
