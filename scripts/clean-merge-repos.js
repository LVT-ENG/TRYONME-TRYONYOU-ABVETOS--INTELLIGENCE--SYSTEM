#!/usr/bin/env node

/**
 * Clean & Merge Repos Script
 * 
 * This script creates a clean version of the TRYONYOU project by:
 * 1. Copying essential files and directories
 * 2. Excluding build artifacts, dependencies, and temporary files
 * 3. Creating a ZIP archive for distribution
 */

import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define what to include in the clean version
const INCLUDE_PATTERNS = [
  '.github',
  'docs',
  'public',
  'src',
  'scripts',
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'vercel.json',
  'README.md',
  'CHANGELOG.md',
  'DEPLOYMENT.md',
  '.gitignore'
];

// Define what to exclude
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  'build',
  '.vercel',
  'coverage',
  '.DS_Store',
  '.env',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
  '*.log',
  'tryonyou-clean',
  'tryonyou-clean.zip'
];

// Special case: exclude .git but not .github
const EXCLUDE_EXACT_PATHS = [
  '.git'
];

const rootDir = path.resolve(__dirname, '..');
const outputZip = path.join(rootDir, 'tryonyou-clean.zip');

console.log('🧹 Starting Clean & Merge process...');
console.log(`📂 Working directory: ${rootDir}`);

// Create archive
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Handle archive events
output.on('close', () => {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`✅ Clean project created successfully!`);
  console.log(`📦 Archive size: ${sizeInMB} MB`);
  console.log(`📍 Location: ${outputZip}`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('⚠️  Warning:', err.message);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive to output file
archive.pipe(output);

// Helper function to check if path should be excluded
function shouldExclude(filePath, isTopLevel = false) {
  const relativePath = path.relative(rootDir, filePath);
  
  // Don't exclude top-level items that are explicitly included
  if (isTopLevel) {
    const topLevelName = relativePath.split(path.sep)[0];
    if (INCLUDE_PATTERNS.includes(topLevelName)) {
      return false;
    }
  }
  
  // Check exact path exclusions (e.g., .git but not .github)
  for (const exactPath of EXCLUDE_EXACT_PATHS) {
    if (relativePath === exactPath || relativePath.startsWith(exactPath + path.sep)) {
      return true;
    }
  }
  
  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.includes('*')) {
      // Handle wildcard patterns - make sure to match file ending
      const regexPattern = pattern.replace(/\*/g, '.*');
      const regex = new RegExp(regexPattern + '$');
      if (regex.test(path.basename(filePath))) {
        return true;
      }
    } else {
      // Check if path contains the pattern
      if (relativePath.includes(pattern) || path.basename(filePath) === pattern) {
        return true;
      }
    }
  }
  
  return false;
}

// Helper function to recursively add directory contents
function addDirectoryToArchive(dirPath, archiveBasePath = '', isTopLevel = false) {
  if (shouldExclude(dirPath, isTopLevel)) {
    console.log(`⏭️  Skipping: ${path.relative(rootDir, dirPath)}`);
    return;
  }

  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const archivePath = path.join(archiveBasePath, item);
    
    if (shouldExclude(itemPath, false)) {
      console.log(`⏭️  Skipping: ${path.relative(rootDir, itemPath)}`);
      continue;
    }
    
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      console.log(`📁 Adding directory: ${path.relative(rootDir, itemPath)}`);
      addDirectoryToArchive(itemPath, archivePath, false);
    } else if (stats.isFile()) {
      console.log(`📄 Adding file: ${path.relative(rootDir, itemPath)}`);
      archive.file(itemPath, { name: archivePath });
    }
  }
}

// Add files and directories to archive
console.log('\n📦 Building clean archive...\n');

for (const pattern of INCLUDE_PATTERNS) {
  const fullPath = path.join(rootDir, pattern);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Not found, skipping: ${pattern}`);
    continue;
  }
  
  const stats = fs.statSync(fullPath);
  
  if (stats.isDirectory()) {
    console.log(`📁 Processing directory: ${pattern}`);
    addDirectoryToArchive(fullPath, pattern, true);
  } else if (stats.isFile()) {
    console.log(`📄 Adding file: ${pattern}`);
    archive.file(fullPath, { name: pattern });
  }
}

// Finalize the archive
console.log('\n🔄 Finalizing archive...');
archive.finalize();
