#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs'
import { resolve, join } from 'path'

const targetFolder = process.argv[2] || '.'
const targetPath = resolve(process.cwd(), targetFolder)

if (!existsSync(targetPath)) {
  console.error(`ERROR: Target folder does not exist: ${targetPath}`)
  process.exit(1)
}

const result = {
  projectType: 'unknown',
  framework: null,
  language: null,
  configFiles: [],
  warnings: []
}

const checkFile = (filename) => {
  const path = join(targetPath, filename)
  if (existsSync(path)) {
    result.configFiles.push(filename)
    return path
  }
  return null
}

const readPackageJson = () => {
  const pkgPath = checkFile('package.json')
  if (pkgPath) {
    try {
      return JSON.parse(readFileSync(pkgPath, 'utf-8'))
    } catch (e) {
      result.warnings.push('Invalid package.json')
    }
  }
  return null
}

const detectProject = () => {
  const pkg = readPackageJson()

  if (pkg) {
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }

    const hasReact = deps.react
    const hasTypeScript = deps.typescript || existsSync(join(targetPath, 'tsconfig.json'))
    const hasVite = deps.vite
    const hasNext = deps.next
    const hasExpress = deps.express
    const hasNest = deps['@nestjs/core']
    const hasFastify = deps.fastify

    const isWaterworks = 
      pkg.name?.includes('waterworks') ||
      pkg.name?.startsWith('@waterworks/') ||
      existsSync(join(targetPath, '.waterworks'))

    if (hasReact && isWaterworks) {
      result.projectType = 'react-waterworks'
      result.framework = hasVite ? 'vite' : hasNext ? 'next' : 'react'
      result.language = hasTypeScript ? 'typescript' : 'javascript'
      return
    }

    if (hasReact) {
      result.projectType = 'react'
      result.framework = hasVite ? 'vite' : hasNext ? 'next' : 'react'
      result.language = hasTypeScript ? 'typescript' : 'javascript'
      return
    }

    if (hasNest) {
      result.projectType = 'node-typescript'
      result.framework = 'nest'
      result.language = 'typescript'
      return
    }

    if (hasExpress || hasFastify) {
      result.projectType = 'node-typescript'
      result.framework = hasExpress ? 'express' : 'fastify'
      result.language = hasTypeScript ? 'typescript' : 'javascript'
      return
    }

    if (hasTypeScript) {
      result.projectType = 'node-typescript'
      result.language = 'typescript'
      return
    }

    if (pkg.type === 'module' || pkg.main || pkg.exports) {
      result.projectType = 'node'
      result.language = 'javascript'
      return
    }
  }

  if (checkFile('pom.xml')) {
    result.projectType = 'java-maven'
    result.framework = 'spring-boot'
    result.language = 'java'
    return
  }

  if (checkFile('build.gradle') || checkFile('build.gradle.kts')) {
    result.projectType = 'java-gradle'
    result.framework = 'spring-boot'
    result.language = 'java'
    return
  }

  if (checkFile('pyproject.toml') || checkFile('setup.py')) {
    result.projectType = 'python'
    result.language = 'python'
    
    const reqPath = checkFile('requirements.txt')
    if (reqPath) {
      const reqs = readFileSync(reqPath, 'utf-8')
      if (reqs.includes('fastapi')) {
        result.framework = 'fastapi'
      } else if (reqs.includes('django')) {
        result.framework = 'django'
      } else if (reqs.includes('flask')) {
        result.framework = 'flask'
      }
    }
    return
  }

  result.warnings.push('Unable to determine project type')
}

detectProject()

console.log(JSON.stringify(result, null, 2))
process.exit(result.projectType === 'unknown' ? 1 : 0)
