#!/usr/bin/env node

import { existsSync } from 'fs'
import { resolve } from 'path'

const targetPath = process.argv[2] || '.'

console.log(`Checking for Playwright + axe configuration...`)

const hasPlaywright = existsSync(resolve(process.cwd(), 'playwright.config.ts')) ||
                     existsSync(resolve(process.cwd(), 'playwright.config.js'))

const hasAxeCore = (() => {
  try {
    const pkg = JSON.parse(
      require('fs').readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8')
    )
    return pkg.devDependencies?.['@axe-core/playwright'] || pkg.dependencies?.['@axe-core/playwright']
  } catch {
    return false
  }
})()

if (!hasPlaywright || !hasAxeCore) {
  console.error('ERROR: Playwright with axe-core not configured')
  console.error('')
  console.error('To enable browser-based accessibility testing:')
  console.error('1. Install Playwright: npm install --save-dev @playwright/test')
  console.error('2. Install axe: npm install --save-dev @axe-core/playwright')
  console.error('3. Create playwright.config.ts')
  console.error('4. Write tests using injectAxe() and checkA11y()')
  console.error('')
  console.error('Example test:')
  console.error(`
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from '@axe-core/playwright'

test('accessibility check', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await injectAxe(page)
  await checkA11y(page)
})
`)
  process.exit(2)
}

console.log('✓ Playwright and axe-core are configured')
console.log('Run your accessibility tests with: npx playwright test')
process.exit(0)
