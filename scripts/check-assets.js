#!/usr/bin/env node

/**
 * TryOnYou Asset Validation Script
 * 
 * This script validates all assets in the TryOnYou 70 Image Pack:
 * - Checks file naming conventions
 * - Verifies file sizes
 * - Validates file formats
 * - Ensures all referenced paths exist
 * 
 * @version 1.0.0
 * @agent Agente 70 - Visual Integration & Orchestration
 */

import { existsSync, statSync, readdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
// CONFIGURATION
// ============================================================================

const BASE_PATH = join(__dirname, '..', 'assets', 'images', 'tryonyou');
const MAX_SIZES = {
  png: 2.5 * 1024 * 1024,  // 2.5 MB
  jpg: 1.8 * 1024 * 1024,  // 1.8 MB
  jpeg: 1.8 * 1024 * 1024, // 1.8 MB
  webp: 500 * 1024,        // 500 KB
};

const VALID_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a file should be skipped during validation
 */
function shouldSkipFile(filename) {
  // Skip .gitkeep files
  if (filename === '.gitkeep') return true;
  
  // Skip README files (README.md, README_*.md, etc.)
  if (/^README.*\.md$/i.test(filename)) return true;
  
  return false;
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Check if filename follows naming conventions
 */
function validateNaming(filename) {
  const errors = [];
  
  // No spaces
  if (filename.includes(' ')) {
    errors.push('Contains spaces');
  }
  
  // No uppercase (except extension)
  const dotIndex = filename.lastIndexOf('.');
  const nameWithoutExt = dotIndex > -1 ? filename.substring(0, dotIndex) : filename;
  if (nameWithoutExt !== nameWithoutExt.toLowerCase()) {
    errors.push('Contains uppercase characters');
  }
  
  // No accents or special characters
  const validPattern = /^[a-z0-9_-]+\.(png|jpg|jpeg|webp)$/;
  if (!validPattern.test(filename)) {
    errors.push('Contains invalid characters (use only a-z, 0-9, _, -)');
  }
  
  // Should follow pattern: {category}_{subcategory}_{descriptor}_{variant}.{ext}
  const parts = nameWithoutExt.split('_');
  if (parts.length < 3) {
    errors.push('Does not follow naming pattern: {category}_{subcategory}_{descriptor}_{variant}.{ext}');
  }
  
  return errors;
}

/**
 * Check if file size is within limits
 */
function validateFileSize(filepath, ext) {
  const stats = statSync(filepath);
  const sizeInBytes = stats.size;
  const maxSize = MAX_SIZES[ext.replace('.', '')];
  
  if (!maxSize) {
    return [`Unknown extension: ${ext}`];
  }
  
  if (sizeInBytes > maxSize) {
    const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    const maxMB = (maxSize / (1024 * 1024)).toFixed(2);
    return [`File too large: ${sizeMB}MB (max: ${maxMB}MB)`];
  }
  
  return [];
}

/**
 * Check if file format is valid
 */
function validateFormat(filename) {
  const ext = extname(filename).toLowerCase();
  
  if (!VALID_EXTENSIONS.includes(ext)) {
    return [`Invalid extension: ${ext} (allowed: ${VALID_EXTENSIONS.join(', ')})`];
  }
  
  return [];
}

/**
 * Recursively get all files in directory
 */
function getAllFiles(dir, fileList = []) {
  if (!existsSync(dir)) {
    return fileList;
  }
  
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filepath = join(dir, file);
    const stat = statSync(filepath);
    
    if (stat.isDirectory()) {
      getAllFiles(filepath, fileList);
    } else if (stat.isFile() && !shouldSkipFile(file)) {
      fileList.push(filepath);
    }
  });
  
  return fileList;
}

/**
 * Validate all assets
 */
function validateAssets() {
  console.log('🔍 TryOnYou Asset Validator\n');
  console.log(`📁 Scanning: ${BASE_PATH}\n`);
  
  if (!existsSync(BASE_PATH)) {
    console.log('❌ Error: Assets directory not found!');
    console.log(`   Expected: ${BASE_PATH}`);
    console.log('\n💡 Please create the directory structure first.');
    process.exit(1);
  }
  
  const files = getAllFiles(BASE_PATH);
  
  if (files.length === 0) {
    console.log('⚠️  Warning: No asset files found!');
    console.log('\n💡 The directory structure exists but contains no images.');
    console.log('   This is expected if you haven\'t added the images yet.');
    process.exit(0);
  }
  
  console.log(`📊 Found ${files.length} file(s) to validate\n`);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  const results = [];
  
  files.forEach(filepath => {
    const filename = basename(filepath);
    const ext = extname(filename).toLowerCase();
    const relativePath = filepath.replace(BASE_PATH, '').replace(/^\//, '');
    
    const errors = [];
    
    // Validate naming
    const namingErrors = validateNaming(filename);
    errors.push(...namingErrors);
    
    // Validate format
    const formatErrors = validateFormat(filename);
    errors.push(...formatErrors);
    
    // Validate file size
    const sizeErrors = validateFileSize(filepath, ext);
    errors.push(...sizeErrors);
    
    if (errors.length > 0) {
      totalErrors += errors.length;
      results.push({
        file: relativePath,
        errors,
      });
    }
  });
  
  // Print results
  if (results.length === 0) {
    console.log('✅ All assets passed validation!\n');
    console.log('Summary:');
    console.log(`  • Files checked: ${files.length}`);
    console.log(`  • Errors: 0`);
    console.log(`  • Status: PASS ✓`);
  } else {
    console.log('❌ Validation failed!\n');
    
    results.forEach(({ file, errors }) => {
      console.log(`\n📄 ${file}`);
      errors.forEach(error => {
        console.log(`   ❌ ${error}`);
      });
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('Summary:');
    console.log(`  • Files checked: ${files.length}`);
    console.log(`  • Files with errors: ${results.length}`);
    console.log(`  • Total errors: ${totalErrors}`);
    console.log(`  • Status: FAIL ✗`);
    console.log('='.repeat(60));
    
    process.exit(1);
  }
}

/**
 * Print naming guide
 */
function printNamingGuide() {
  console.log('\n📖 Naming Convention Guide:\n');
  console.log('Format: {category}_{subcategory}_{descriptor}_{variant}.{ext}\n');
  console.log('Examples:');
  console.log('  ✅ pau_avatar_fullbody_01.png');
  console.log('  ✅ ui_wardrobe_grid_desktop.png');
  console.log('  ✅ marketing_hero_homepage_v2.jpg');
  console.log('  ✅ outfit_female_casual_summer.png\n');
  console.log('Rules:');
  console.log('  • All lowercase');
  console.log('  • Use underscores (_) instead of spaces');
  console.log('  • No accents or special characters');
  console.log('  • Valid extensions: .png, .jpg, .jpeg, .webp');
  console.log('  • At least 3 parts: category_subcategory_descriptor\n');
}

// ============================================================================
// MAIN
// ============================================================================

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('TryOnYou Asset Validator\n');
  console.log('Usage: node check-assets.js [options]\n');
  console.log('Options:');
  console.log('  --help, -h     Show this help message');
  console.log('  --guide, -g    Show naming convention guide');
  console.log('\nDefault: Validates all assets in /assets/images/tryonyou/');
  process.exit(0);
}

if (args.includes('--guide') || args.includes('-g')) {
  printNamingGuide();
  process.exit(0);
}

validateAssets();
