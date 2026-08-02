#!/usr/bin/env bash

set -euo pipefail

TARGET_PATH="${1:-.}"

echo "Running accessibility linting on: $TARGET_PATH"

if [ ! -d "$TARGET_PATH" ] && [ ! -f "$TARGET_PATH" ]; then
  echo "ERROR: Target path does not exist: $TARGET_PATH" >&2
  exit 1
fi

if command -v npm &> /dev/null; then
  if [ -f "package.json" ]; then
    if grep -q "eslint-plugin-jsx-a11y" package.json; then
      echo "Running eslint with jsx-a11y plugin..."
      
      if npm run lint -- "$TARGET_PATH" 2>&1; then
        echo "✓ No accessibility violations found"
        exit 0
      else
        echo "✗ Accessibility violations detected" >&2
        exit 1
      fi
    else
      echo "WARNING: eslint-plugin-jsx-a11y not installed" >&2
      echo "" >&2
      echo "To enable accessibility linting:" >&2
      echo "1. Install: npm install --save-dev eslint-plugin-jsx-a11y" >&2
      echo "2. Add to .eslintrc.json:" >&2
      echo '   {' >&2
      echo '     "extends": ["plugin:jsx-a11y/recommended"]' >&2
      echo '   }' >&2
      exit 2
    fi
  else
    echo "ERROR: package.json not found" >&2
    exit 1
  fi
else
  echo "ERROR: npm not available" >&2
  exit 1
fi
