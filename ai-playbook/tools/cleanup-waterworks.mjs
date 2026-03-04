#!/usr/bin/env node

/**
 * Complete cleanup script to remove ALL waterworks-specific files from ai-playbook
 * This removes private client-specific references to keep the repository generic.
 * 
 * Usage: node cleanup-waterworks.mjs
 * 
 * This script removes:
 * - .github/copilot-instructions/waterworks-overrides.md
 * - .github/skills/waterworks-library/ (entire directory)
 * - CLEANUP-WATERWORKS.md
 * - tools/cleanup-waterworks.mjs (this file)
 * - tools/cleanup-waterworks.sh
 */

import { existsSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const itemsToRemove = [
  { path: '.github/copilot-instructions/waterworks-overrides.md', type: 'file' },
  { path: '.github/skills/waterworks-library', type: 'directory' },
  { path: 'CLEANUP-WATERWORKS.md', type: 'file' },
  { path: 'tools/cleanup-waterworks.mjs', type: 'file' },
  { path: 'tools/cleanup-waterworks.sh', type: 'file' }
]

console.log('🧹 Removing ALL waterworks-specific files and cleanup scripts...\n')

let removedCount = 0
let notFoundCount = 0

for (const item of itemsToRemove) {
  const fullPath = join(rootDir, item.path)
  
  if (existsSync(fullPath)) {
    try {
      rmSync(fullPath, { recursive: true, force: true })
      console.log(`✓ Removed ${item.path}`)
      removedCount++
    } catch (error) {
      console.error(`✗ Failed to remove ${item.path}: ${error.message}`)
    }
  } else {
    console.log(`⚠ ${item.path} not found (may already be deleted)`)
    notFoundCount++
  }
}

console.log('\n' + '='.repeat(70))
console.log(`✅ Cleanup complete!`)
console.log(`   Removed: ${removedCount} item(s)`)
console.log(`   Already gone: ${notFoundCount} item(s)`)
console.log('='.repeat(70))
console.log('\nThe AI Playbook is now generic and reusable across all projects.')
console.log('\nTo add client-specific library documentation, create:')
console.log('  • .github/copilot-instructions/[your-library]-overrides.md')
console.log('  • .github/skills/[your-library]/')
console.log('')
