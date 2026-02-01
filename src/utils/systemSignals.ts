// === SYSTEM REALISM SIGNALS ===

export function generateSessionId(): string {
  return "SESSION-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function generateTimestamp(): string {
  return new Date().toISOString();
}

export function generateAnalysisId(): string {
  return "ANALYSIS-" + Date.now().toString(36).toUpperCase();
}
