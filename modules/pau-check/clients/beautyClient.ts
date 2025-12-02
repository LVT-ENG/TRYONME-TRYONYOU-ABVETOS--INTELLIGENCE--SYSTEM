export async function analyzeBeauty(img: Buffer | string) {
  return {
    passed: true,
    skinSmoothing: 0.42,
    makeupIntensity: 0.63,
    lightScore: 0.82
  };
}
