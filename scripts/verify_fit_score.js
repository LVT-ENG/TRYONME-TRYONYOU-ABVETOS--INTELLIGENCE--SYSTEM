
import { selectHormaAngel, extractUserProfile, computeFullRanking } from '../src/engine/fitScoreEngine.js';
import { HORMA_ANGEL } from '../src/data/catalog_elena_grandini.js';

// Mock landmarks for profile extraction
const MOCK_LANDMARKS = Array(33).fill({ x: 0.5, y: 0.5, z: 0.0, visibility: 0.99 });
// Adjust specific landmarks for reasonable measurements
MOCK_LANDMARKS[11] = { x: 0.4, y: 0.2, z: 0.0, visibility: 0.9 }; // Left Shoulder
MOCK_LANDMARKS[12] = { x: 0.6, y: 0.2, z: 0.0, visibility: 0.9 }; // Right Shoulder
MOCK_LANDMARKS[23] = { x: 0.45, y: 0.6, z: 0.0, visibility: 0.9 }; // Left Hip
MOCK_LANDMARKS[24] = { x: 0.55, y: 0.6, z: 0.0, visibility: 0.9 }; // Right Hip
// Foot landmarks (needed for extractUserProfile internal logic?)
// Actually extractUserProfile uses body proportions for 'foot' property estimation in current code.
// But we want to ensure horma is calculated.

console.log('Running Fit Score Optimization Verification...');

// 1. Test selectHormaAngel logic
console.log('\n--- Testing selectHormaAngel ---');
const testCases = [
  { w: 8, h: 4, expected: 'A' }, // Narrow Low
  { w: 8, h: 6, expected: 'B' }, // Narrow Medium
  { w: 10, h: 4, expected: 'C' }, // Standard Low
  { w: 10, h: 6, expected: 'D' }, // Standard Medium
  { w: 10, h: 8, expected: 'E' }, // Standard High
  { w: 11, h: 6, expected: 'F' }, // Wide Medium
  { w: 11, h: 8, expected: 'G' }, // Wide High
  { w: 13, h: 8, expected: 'H' }, // Extra Wide High
];

let passed = 0;
testCases.forEach(({ w, h, expected }) => {
  const footData = { estimatedMetatarsalWidth: w, estimatedInstepHeight: h };
  const result = selectHormaAngel(footData);
  if (result === expected) {
    passed++;
  } else {
    console.error(`FAIL: Input {w:${w}, h:${h}} Expected ${expected}, Got ${result}`);
  }
});

if (passed === testCases.length) {
  console.log(`PASS: selectHormaAngel logic correct (${passed}/${testCases.length})`);
} else {
  console.error(`FAIL: selectHormaAngel logic failed (${passed}/${testCases.length})`);
  process.exit(1);
}


// 2. Test extractUserProfile optimization (Pre-calculation of horma)
console.log('\n--- Testing extractUserProfile Optimization ---');
const profile = extractUserProfile(MOCK_LANDMARKS);

if (profile && profile.foot) {
  console.log('Profile extracted successfully.');

  const expectedHorma = selectHormaAngel(profile.foot);

  if (profile.foot.horma) {
      if (profile.foot.horma === expectedHorma) {
          console.log(`PASS: profile.foot.horma is correctly pre-calculated: ${profile.foot.horma}`);
      } else {
          console.error(`FAIL: profile.foot.horma (${profile.foot.horma}) does not match expected (${expectedHorma})`);
          process.exit(1);
      }
  } else {
      console.log('WARN: profile.foot.horma is not yet pre-calculated (Expected before optimization)');
  }

} else {
  console.error('FAIL: extractUserProfile returned null');
  process.exit(1);
}

// 3. Test computeFullRanking (End-to-End)
// This ensures calculateSingleFitScore works correctly with or without the optimization
console.log('\n--- Testing computeFullRanking ---');

// Use a profile with known foot dimensions that map to 'D'
const profileForRanking = {
    ...profile,
    foot: {
        estimatedMetatarsalWidth: 10,
        estimatedInstepHeight: 6,
        // horma: 'D' // Will be added by extractUserProfile in optimized version
    },
    // Mock other required fields
    idealCaidaRange: { min: 100, max: 400 },
    idealElasticidadRange: { min: 0, max: 30 },
    idealHormas: ['slim', 'regular'],
};

// We need to filter for footwear to test the horma logic
const results = computeFullRanking(profileForRanking, { category: 'footwear', maxResults: 1 });

if (results && results.length > 0) {
    console.log(`PASS: computeFullRanking returned ${results.length} results.`);
    console.log(`Top match: ${results[0].name} (Score: ${results[0].fitScore})`);
} else {
    console.error('FAIL: computeFullRanking returned no results');
    process.exit(1);
}

console.log('\nVerification Complete.');
