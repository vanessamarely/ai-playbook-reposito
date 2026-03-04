#!/bin/bash

# Complete cleanup script to remove ALL waterworks-specific files from ai-playbook
# Run this from the ai-playbook root directory

set -e

echo "🧹 Removing ALL waterworks-specific files and cleanup scripts..."
echo ""

REMOVED_COUNT=0
NOT_FOUND_COUNT=0

# Function to safely remove file or directory
remove_item() {
    local path="$1"
    local type="$2"
    
    if [ -e "$path" ]; then
        rm -rf "$path"
        echo "✓ Removed $path"
        REMOVED_COUNT=$((REMOVED_COUNT + 1))
    else
        echo "⚠ $path not found (may already be deleted)"
        NOT_FOUND_COUNT=$((NOT_FOUND_COUNT + 1))
    fi
}

# Remove waterworks policy file
remove_item ".github/copilot-instructions/waterworks-overrides.md" "file"

# Remove waterworks skill directory
remove_item ".github/skills/waterworks-library" "directory"

# Remove cleanup documentation
remove_item "CLEANUP-WATERWORKS.md" "file"

# Remove cleanup scripts (including this script itself)
remove_item "tools/cleanup-waterworks.mjs" "file"

echo ""
echo "========================================================================"
echo "✅ Cleanup complete!"
echo "   Removed: $REMOVED_COUNT item(s)"
echo "   Already gone: $NOT_FOUND_COUNT item(s)"
echo "========================================================================"
echo ""
echo "The AI Playbook is now generic and reusable across all projects."
echo ""
echo "To add client-specific library documentation:"
echo "  • .github/copilot-instructions/[your-library]-overrides.md"
echo "  • .github/skills/[your-library]/"
echo ""
echo "⚠️  Note: This cleanup script (tools/cleanup-waterworks.sh) will"
echo "   self-destruct after execution. Remove it manually if still present."
echo ""

# Self-destruct (remove this script)
if [ -f "tools/cleanup-waterworks.sh" ]; then
    rm "tools/cleanup-waterworks.sh"
    echo "✓ Cleanup script removed"
fi
