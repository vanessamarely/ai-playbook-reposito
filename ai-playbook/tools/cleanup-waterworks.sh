#!/bin/bash

# Cleanup script to remove all waterworks-specific files from ai-playbook
# Run this from the ai-playbook root directory

set -e

echo "🧹 Cleaning up waterworks-specific files..."

# Remove waterworks-overrides.md
if [ -f ".github/copilot-instructions/waterworks-overrides.md" ]; then
    rm ".github/copilot-instructions/waterworks-overrides.md"
    echo "✓ Removed .github/copilot-instructions/waterworks-overrides.md"
else
    echo "⚠ waterworks-overrides.md not found (may already be deleted)"
fi

# Remove waterworks-library skill directory
if [ -d ".github/skills/waterworks-library" ]; then
    rm -rf ".github/skills/waterworks-library"
    echo "✓ Removed .github/skills/waterworks-library/ directory"
else
    echo "⚠ waterworks-library skill directory not found (may already be deleted)"
fi

echo ""
echo "✅ Cleanup complete! All waterworks-specific references have been removed."
echo ""
echo "The AI Playbook is now generic and can be used across any client project."
echo "To add client-specific library documentation, create:"
echo "  - .github/copilot-instructions/[your-library]-overrides.md"
echo "  - .github/skills/[your-library]/"
