#!/usr/bin/env node

/**
 * Cleanup script to remove all waterworks-specific files from ai-playbook
 * This removes private client-specific references to keep the repository generic.
 * 
 * Usage: node cleanup-waterworks.mjs
 */

import { existsSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const filesToRemove = [
  '.github/copilot-instructions/waterworks-overrides.md',
  '.github/skills/waterworks-library'
]

console.log('🧹 Cleaning up waterworks-specific files...\n')

let removedCount = 0
let notFoundCount = 0

for (const filePath of filesToRemove) {
  const fullPath = join(rootDir, filePath)
  
  if (existsSync(fullPath)) {
    try {
      rmSync(fullPath, { recursive: true, force: true })
      console.log(`✓ Removed ${filePath}`)
      removedCount++
    } catch (error) {
      console.error(`✗ Failed to remove ${filePath}: ${error.message}`)
    }
  } else {
    console.log(`⚠ ${filePath} not found (may already be deleted)`)
    notFoundCount++
  }
}

console.log('\n' + '='.repeat(70))
console.log(`✅ Cleanup complete! Removed ${removedCount} item(s), ${notFoundCount} already gone.`)
console.log('='.repeat(70))
console.log('\nThe AI Playbook is now generic and reusable across any client project.')
console.log('\nTo add client-specific library documentation, create:')
console.log('  • .github/copilot-instructions/[your-library]-overrides.md')
console.log('  • .github/skills/[your-library]/')
console.log('')
