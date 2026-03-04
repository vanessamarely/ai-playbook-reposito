#!/usr/bin/env node

import { readFileSync } from 'fs'

const inputFile = process.argv[2]

if (!inputFile) {
  console.error('Usage: diagnostics-summarizer.mjs <input-file>')
  process.exit(1)
}

let rawText
try {
  rawText = readFileSync(inputFile, 'utf-8')
} catch (e) {
  console.error(`ERROR: Cannot read file: ${inputFile}`)
  process.exit(1)
}

const lines = rawText.split('\n')
const errors = []
const warnings = []

const errorPatterns = [
  /error/i,
  /exception/i,
  /failed/i,
  /cannot/i,
  /unable to/i,
  /not found/i
]

const warningPatterns = [
  /warning/i,
  /deprecated/i,
  /could not/i
]

for (const line of lines) {
  const trimmed = line.trim()
  if (!trimmed) continue

  const isError = errorPatterns.some(p => p.test(trimmed))
  const isWarning = warningPatterns.some(p => p.test(trimmed))

  if (isError) {
    errors.push(trimmed)
  } else if (isWarning) {
    warnings.push(trimmed)
  }
}

const uniqueErrors = [...new Set(errors)]
const uniqueWarnings = [...new Set(warnings)]

const summary = {
  totalErrors: uniqueErrors.length,
  totalWarnings: uniqueWarnings.length,
  topErrors: uniqueErrors.slice(0, 10),
  topWarnings: uniqueWarnings.slice(0, 5)
}

console.log(JSON.stringify(summary, null, 2))

if (uniqueErrors.length > 0) {
  process.exit(1)
} else {
  process.exit(0)
}
