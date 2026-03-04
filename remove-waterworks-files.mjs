import { unlinkSync, rmSync } from 'fs'
import { join } from 'path'

const filesToRemove = [
  'ai-playbook/CLEANUP-WATERWORKS.md',
  'ai-playbook/REMOVE-WATERWORKS-NOW.md',
  'ai-playbook/WATERWORKS-CLEANUP-SUMMARY.md',
  'ai-playbook/tools/cleanup-waterworks.mjs',
  'ai-playbook/tools/cleanup-waterworks.sh'
]

console.log('Removing WATERWORKS files...\n')

for (const file of filesToRemove) {
  try {
    unlinkSync(join(process.cwd(), file))
    console.log('✓ Removed:', file)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.log('✗ Error removing:', file, err.message)
    }
  }
}

console.log('\n✓ All WATERWORKS files removed')
console.log('✓ This script will now remove itself...\n')

try {
  unlinkSync(join(process.cwd(), 'remove-waterworks-files.mjs'))
} catch (err) {
  console.log('Note: Please manually delete remove-waterworks-files.mjs')
}
