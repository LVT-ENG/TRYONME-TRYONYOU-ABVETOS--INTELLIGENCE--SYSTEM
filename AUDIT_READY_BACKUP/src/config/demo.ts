// === DEMO CONTROL FLAGS ===
export const DEMO_MODE = true;
export const DEMO_GUIDED_FLOW = true;
export const DEMO_MAX_DURATION_MINUTES = 6;
export const DEMO_LANGUAGE = "EN"; // Translation handled externally

// Session tracking
export const SESSION_ID = \`SESSION-\${Math.random().toString(36).substring(2, 10).toUpperCase()}\`;
export const SESSION_START = new Date().toISOString();
