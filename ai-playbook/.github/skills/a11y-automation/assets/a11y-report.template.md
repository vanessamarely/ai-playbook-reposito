# Accessibility Audit Report

**Date**: [YYYY-MM-DD]  
**Target**: [Path or Component Name]  
**Checker**: [Tool Name/Version]

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0     |
| Serious  | 0     |
| Moderate | 0     |
| Minor    | 0     |
| **Total** | **0** |

## Violations by WCAG Guideline

### [WCAG X.X.X - Guideline Name]

**Severity**: [Critical/Serious/Moderate/Minor]  
**Impact**: [Description of user impact]  
**Occurrences**: [Number]

#### Violation Details

**File**: `path/to/file.tsx`  
**Line**: [Line Number]

**Current Code**:
```tsx
<div onClick={handleClick}>Click me</div>
```

**Issue**: Non-semantic element used for interactive functionality. Not keyboard accessible.

**Fix**:
```tsx
<button type="button" onClick={handleClick}>
  Click me
</button>
```

**WCAG Reference**: 2.1.1 Keyboard (Level A), 4.1.2 Name, Role, Value (Level A)

---

### [Next Guideline]

[Repeat structure above]

## Files Checked

- `src/components/Button.tsx` - [Pass/Fail]
- `src/components/Modal.tsx` - [Pass/Fail]

## Recommendations

1. **Priority 1** (Critical/Serious): [Action to take]
2. **Priority 2** (Moderate): [Action to take]
3. **Priority 3** (Minor): [Action to take]

## Next Steps

- [ ] Fix all critical and serious violations
- [ ] Review moderate violations with design team
- [ ] Add automated accessibility tests to CI/CD
- [ ] Schedule manual testing with assistive technologies
- [ ] Document accessibility patterns in component library

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- Project accessibility reference: `.github/skills/react-components/references/a11y-wcag22.md`
