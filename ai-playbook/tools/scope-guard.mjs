#!/usr/bin/env node

import { resolve, relative } from 'path'

const targetRoot = process.argv[2]
const changedFiles = process.argv.slice(3)

if (!targetRoot) {
  console.error('Usage: scope-guard.mjs <target-root> <file1> [file2] ...')
  process.exit(1)
}

const targetRootResolved = resolve(process.cwd(), targetRoot)
const violations = []

for (const file of changedFiles) {
  const fileResolved = resolve(process.cwd(), file)
  const relativePath = relative(targetRootResolved, fileResolved)

  if (relativePath.startsWith('..') || relativePath.startsWith('/')) {
    violations.push({
      file,
      reason: 'File is outside target root'
    })
  }
}

if (violations.length > 0) {
  console.error('ERROR: Scope violations detected')
  console.error('')
  console.error(`Target root: ${targetRootResolved}`)
  console.error('')
  console.error('Violations:')
  for (const v of violations) {
    console.error(`  - ${v.file}: ${v.reason}`)
  }
  console.error('')
  process.exit(1)
}

console.log('✓ All files within target scope')
process.exit(0)
