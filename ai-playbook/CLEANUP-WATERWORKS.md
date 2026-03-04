# Removing Waterworks References

## Background

The AI Playbook was initially developed with example references to "Waterworks" - a private client component library. These references need to be removed to keep the repository generic and reusable across all projects.

## What Needs to Be Removed

1. **`.github/copilot-instructions/waterworks-overrides.md`** - Client-specific style overrides
2. **`.github/skills/waterworks-library/`** - Client-specific skill directory

## How to Remove

### Option 1: Automated Script (Recommended)

From the `ai-playbook` root directory, run:

```bash
node tools/cleanup-waterworks.mjs
```

Or use the shell script:

```bash
chmod +x tools/cleanup-waterworks.sh
./tools/cleanup-waterworks.sh
```

### Option 2: Manual Removal

From the `ai-playbook` root directory:

```bash
# Remove the waterworks-overrides.md file
rm .github/copilot-instructions/waterworks-overrides.md

# Remove the waterworks-library skill directory
rm -rf .github/skills/waterworks-library
```

## After Removal

The AI Playbook will be completely generic. When you need to add client-specific library documentation:

1. **Create client-specific override file:**
   ```
   .github/copilot-instructions/[your-library-name]-overrides.md
   ```

2. **Create client-specific skill:**
   ```
   .github/skills/[your-library-name]/
   ├── SKILL.md
   ├── references/
   │   ├── code-style.md
   │   └── architecture-patterns.md
   └── assets/
       └── component-template.tsx
   ```

3. **Update your orchestrator configuration** to reference your client library instead of waterworks

## Verification

After running the cleanup, verify that:
- [ ] `waterworks-overrides.md` is removed
- [ ] `waterworks-library/` directory is removed
- [ ] The visual guide app still works (it already uses generic references)
- [ ] No remaining references to "waterworks" exist in the codebase

To check for remaining references:

```bash
# From ai-playbook root
grep -r "waterworks" . --exclude-dir=node_modules --exclude-dir=.git
```
