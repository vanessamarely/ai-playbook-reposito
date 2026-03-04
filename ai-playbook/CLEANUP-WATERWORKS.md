# ⚠️ DEPRECATED - This File Should Be Deleted

## This file and all waterworks-related content has been removed

All references to "Waterworks" (a private client component library) have been removed from the AI Playbook to keep it generic and reusable.

## Files to Delete

The following files should no longer exist in the repository:

1. **`CLEANUP-WATERWORKS.md`** (this file)
2. **`tools/cleanup-waterworks.mjs`** 
3. **`tools/cleanup-waterworks.sh`**
4. **`.github/copilot-instructions/waterworks-overrides.md`**
5. **`.github/skills/waterworks-library/`** (entire directory)

## For Future Client-Specific Libraries

When you need to add client-specific library documentation, follow the pattern in the visual guide app or reference the "Client Setup" tab.

Create:
- `.github/copilot-instructions/[your-library-name]-overrides.md`
- `.github/skills/[your-library-name]/` with SKILL.md, references/, and assets/

The orchestrator will automatically detect and use these files when appropriate.
