# ⚠️ ACTION REQUIRED: Remove Waterworks References

This AI Playbook currently contains example references to "Waterworks" - a private client component library name. **These must be removed** to keep the repository generic and reusable.

## Quick Cleanup (Recommended)

From the `ai-playbook` directory, run:

```bash
node tools/cleanup-waterworks.mjs
```

Or use the shell script:

```bash
chmod +x tools/cleanup-waterworks.sh
./tools/cleanup-waterworks.sh
```

## What Gets Removed

- ✓ `.github/copilot-instructions/waterworks-overrides.md`
- ✓ `.github/skills/waterworks-library/` (entire directory)
- ✓ `CLEANUP-WATERWORKS.md`
- ✓ `tools/cleanup-waterworks.mjs`
- ✓ `tools/cleanup-waterworks.sh`
- ✓ `REMOVE-WATERWORKS-NOW.md` (this file)

## After Cleanup

The visual guide app already uses generic terminology ("component library" instead of "Waterworks"), so it will continue working normally.

When you need to document a client-specific component library:

1. Create: `.github/copilot-instructions/[your-library]-overrides.md`
2. Create: `.github/skills/[your-library]/`
3. Follow the structure shown in the "Client Setup" tab of the visual guide

## Manual Removal (if scripts don't work)

```bash
rm -rf .github/copilot-instructions/waterworks-overrides.md
rm -rf .github/skills/waterworks-library
rm CLEANUP-WATERWORKS.md
rm REMOVE-WATERWORKS-NOW.md
rm tools/cleanup-waterworks.mjs
rm tools/cleanup-waterworks.sh
```
