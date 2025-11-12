#!/usr/bin/env node

/**
 * Auto-versioning script for TRYONYOU
 * Automatically generates version numbers and changelogs based on commit messages
 * Follows Semantic Versioning (semver) conventions
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${msg}${colors.reset}\n`),
}

/**
 * Execute shell command and return output
 */
function exec(command) {
  try {
    return execSync(command, { encoding: 'utf-8', cwd: rootDir }).trim()
  } catch (error) {
    return ''
  }
}

/**
 * Get current version from package.json
 */
function getCurrentVersion() {
  const packagePath = join(rootDir, 'package.json')
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'))
  return packageJson.version
}

/**
 * Update version in package.json
 */
function updatePackageVersion(newVersion) {
  const packagePath = join(rootDir, 'package.json')
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'))
  packageJson.version = newVersion
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')
  log.success(`Updated package.json to version ${newVersion}`)
}

/**
 * Get commits since last tag
 */
function getCommitsSinceLastTag() {
  const lastTag = exec('git describe --tags --abbrev=0 2>/dev/null') || 'HEAD'
  const commits = exec(`git log ${lastTag}..HEAD --pretty=format:"%s|%h|%an|%ad" --date=short`)
  
  if (!commits) return []
  
  return commits.split('\n').map(line => {
    const [message, hash, author, date] = line.split('|')
    return { message, hash, author, date }
  })
}

/**
 * Determine version bump type from commits
 */
function determineVersionBump(commits) {
  let bumpType = 'patch' // Default to patch
  
  for (const commit of commits) {
    const msg = commit.message.toLowerCase()
    
    // Major version: breaking changes
    if (msg.includes('breaking') || msg.includes('major:')) {
      return 'major'
    }
    
    // Minor version: new features
    if (msg.includes('feat:') || msg.includes('feature:') || msg.includes('add:')) {
      bumpType = 'minor'
    }
    
    // Patch version: bug fixes, improvements
    // (already default)
  }
  
  return bumpType
}

/**
 * Bump version number
 */
function bumpVersion(currentVersion, bumpType) {
  const [major, minor, patch] = currentVersion.split('.').map(Number)
  
  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    default:
      return currentVersion
  }
}

/**
 * Generate changelog entry
 */
function generateChangelogEntry(version, commits) {
  const date = new Date().toISOString().split('T')[0]
  
  let changelog = `## [${version}] - ${date}\n\n`
  
  // Categorize commits
  const features = commits.filter(c => c.message.match(/^(feat|feature|add):/i))
  const fixes = commits.filter(c => c.message.match(/^(fix|bugfix):/i))
  const improvements = commits.filter(c => c.message.match(/^(improve|refactor|perf|optimize):/i))
  const docs = commits.filter(c => c.message.match(/^(docs|doc):/i))
  const others = commits.filter(c => 
    !features.includes(c) && 
    !fixes.includes(c) && 
    !improvements.includes(c) && 
    !docs.includes(c)
  )
  
  if (features.length > 0) {
    changelog += '### ✨ Features\n\n'
    features.forEach(c => {
      changelog += `- ${c.message.replace(/^(feat|feature|add):\s*/i, '')} ([${c.hash}](../../commit/${c.hash}))\n`
    })
    changelog += '\n'
  }
  
  if (fixes.length > 0) {
    changelog += '### 🐛 Bug Fixes\n\n'
    fixes.forEach(c => {
      changelog += `- ${c.message.replace(/^(fix|bugfix):\s*/i, '')} ([${c.hash}](../../commit/${c.hash}))\n`
    })
    changelog += '\n'
  }
  
  if (improvements.length > 0) {
    changelog += '### 🚀 Improvements\n\n'
    improvements.forEach(c => {
      changelog += `- ${c.message.replace(/^(improve|refactor|perf|optimize):\s*/i, '')} ([${c.hash}](../../commit/${c.hash}))\n`
    })
    changelog += '\n'
  }
  
  if (docs.length > 0) {
    changelog += '### 📚 Documentation\n\n'
    docs.forEach(c => {
      changelog += `- ${c.message.replace(/^(docs|doc):\s*/i, '')} ([${c.hash}](../../commit/${c.hash}))\n`
    })
    changelog += '\n'
  }
  
  if (others.length > 0) {
    changelog += '### 🔧 Other Changes\n\n'
    others.forEach(c => {
      changelog += `- ${c.message} ([${c.hash}](../../commit/${c.hash}))\n`
    })
    changelog += '\n'
  }
  
  return changelog
}

/**
 * Update CHANGELOG.md
 */
function updateChangelog(newEntry) {
  const changelogPath = join(rootDir, 'CHANGELOG.md')
  
  let existingContent = ''
  if (existsSync(changelogPath)) {
    existingContent = readFileSync(changelogPath, 'utf-8')
  } else {
    existingContent = '# Changelog\n\nAll notable changes to TRYONYOU will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n'
  }
  
  // Insert new entry after the header
  const lines = existingContent.split('\n')
  const headerEndIndex = lines.findIndex(line => line.startsWith('## ['))
  
  if (headerEndIndex === -1) {
    // No previous entries, append to end
    existingContent += '\n' + newEntry
  } else {
    // Insert before first entry
    lines.splice(headerEndIndex, 0, newEntry)
    existingContent = lines.join('\n')
  }
  
  writeFileSync(changelogPath, existingContent)
  log.success('Updated CHANGELOG.md')
}

/**
 * Create version file for runtime access
 */
function createVersionFile(version) {
  const versionFilePath = join(rootDir, 'src', 'version.js')
  const content = `// Auto-generated version file
// DO NOT EDIT MANUALLY

export const VERSION = '${version}'
export const BUILD_DATE = '${new Date().toISOString()}'
export const BUILD_TIMESTAMP = ${Date.now()}

export default {
  VERSION,
  BUILD_DATE,
  BUILD_TIMESTAMP,
}
`
  
  writeFileSync(versionFilePath, content)
  log.success(`Created version file: ${version}`)
}

/**
 * Main execution
 */
function main() {
  log.header('🔖 TRYONYOU Auto-Versioning')
  
  // Get current version
  const currentVersion = getCurrentVersion()
  log.info(`Current version: ${currentVersion}`)
  
  // Get commits since last tag
  const commits = getCommitsSinceLastTag()
  
  if (commits.length === 0) {
    log.warning('No new commits since last version')
    return
  }
  
  log.info(`Found ${commits.length} new commit(s)`)
  
  // Determine version bump
  const bumpType = determineVersionBump(commits)
  log.info(`Version bump type: ${bumpType}`)
  
  // Calculate new version
  const newVersion = bumpVersion(currentVersion, bumpType)
  log.success(`New version: ${newVersion}`)
  
  // Generate changelog entry
  const changelogEntry = generateChangelogEntry(newVersion, commits)
  
  // Update files
  updatePackageVersion(newVersion)
  updateChangelog(changelogEntry)
  createVersionFile(newVersion)
  
  log.header('✅ Versioning Complete')
  log.info(`Version ${currentVersion} → ${newVersion}`)
  log.info('Files updated: package.json, CHANGELOG.md, src/version.js')
}

// Run the script
main()

