export async function runTendency(preferences: any) {
  return {
    palette: "soft-natural",
    eleganceLevel: 0.85,
    hairDirection: "clean",
    makeupStyle: "realistic",
    ...preferences
  };
}
