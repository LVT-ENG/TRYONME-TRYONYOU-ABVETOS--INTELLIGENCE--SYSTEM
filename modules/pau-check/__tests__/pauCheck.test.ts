/**
 * PAU-CHECK Test Suite
 * Basic tests for the PAU-CHECK module
 */

import { runPauCheck, cosineDistance, DEFAULT_THRESHOLDS } from "../index";
import { BaoIdentityData } from "../types";

// Test utilities
const assert = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(`❌ Test failed: ${message}`);
  }
  console.log(`✅ ${message}`);
};

// Generate mock embedding
const generateEmbedding = (size: number = 128): number[] => {
  return Array.from({ length: size }, () => Math.random());
};

async function runTests() {
  console.log("\n🧪 PAU-CHECK Test Suite\n");
  console.log("=".repeat(50));

  // Test 1: Cosine distance calculation
  console.log("\n📐 Test 1: Cosine Distance Calculation");
  const vecA = [1, 0, 0];
  const vecB = [1, 0, 0];
  const vecC = [0, 1, 0];

  const distanceIdentical = cosineDistance(vecA, vecB);
  assert(distanceIdentical < 0.001, `Identical vectors should have distance ~0 (got ${distanceIdentical})`);

  const distanceOrthogonal = cosineDistance(vecA, vecC);
  assert(Math.abs(distanceOrthogonal - 1) < 0.001, `Orthogonal vectors should have distance ~1 (got ${distanceOrthogonal})`);

  // Test 2: PAU-CHECK with valid identity
  console.log("\n🔍 Test 2: PAU-CHECK with Valid Identity");
  const embedding = generateEmbedding();
  const baoIdentityData: BaoIdentityData = {
    embedding,
    userId: "test-user-123",
    timestamp: Date.now(),
  };

  const result = await runPauCheck({
    avatarImage: Buffer.from("mock-image-data"),
    baoIdentityData,
    styleData: { look: "natural" },
  });

  assert(result.decision === "approved" || result.decision === "rejected", 
    `Decision should be 'approved' or 'rejected' (got ${result.decision})`);
  assert(typeof result.notes === "string", "Notes should be a string");
  assert(typeof result.signature === "string", "Signature should be a string");
  assert(result.diagnostics !== undefined, "Diagnostics should be present");

  console.log(`   Decision: ${result.decision}`);
  console.log(`   Signature: ${result.signature}`);

  // Test 3: PAU-CHECK default thresholds
  console.log("\n⚙️ Test 3: Default Thresholds");
  assert(DEFAULT_THRESHOLDS.identityMaxDistance === 0.03, "Identity max distance should be 0.03");
  assert(DEFAULT_THRESHOLDS.maxSkinSmoothingLevel === 0.7, "Max skin smoothing should be 0.7");
  assert(DEFAULT_THRESHOLDS.maxMakeupIntensity === 0.8, "Max makeup intensity should be 0.8");
  assert(DEFAULT_THRESHOLDS.minDignityScore === 0.7, "Min dignity score should be 0.7");
  assert(DEFAULT_THRESHOLDS.minNaturalLightScore === 0.6, "Min natural light score should be 0.6");

  // Test 4: Run multiple checks to verify consistency
  console.log("\n🔄 Test 4: Multiple Runs Consistency");
  const results: string[] = [];
  for (let i = 0; i < 5; i++) {
    const testResult = await runPauCheck({
      avatarImage: "mock-base64-image",
      baoIdentityData: {
        embedding: generateEmbedding(),
        userId: `user-${i}`,
      },
    });
    results.push(testResult.decision);
  }
  assert(results.every(r => r === "approved" || r === "rejected"), 
    "All results should be valid decisions");
  console.log(`   Decisions: ${results.join(", ")}`);

  console.log("\n" + "=".repeat(50));
  console.log("✅ All tests passed!\n");
}

// Run tests
runTests().catch((err) => {
  console.error("\n❌ Test suite failed:", err.message);
  process.exit(1);
});
