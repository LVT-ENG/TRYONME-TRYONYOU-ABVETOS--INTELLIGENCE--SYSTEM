// === OPERATOR CONTROLS (HIDDEN) ===
// Keyboard shortcuts for live demo control

declare global {
  interface Window {
    DEMO_MODE?: boolean;
    __FORCE_RESULT__?: string;
    __SKIP_TO_RESULT__?: boolean;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener("keydown", (e) => {
    if (!window.DEMO_MODE) return;

    switch (e.key) {
      case "r": // reset
        window.location.reload();
        break;
      case "h": // force HERO
        window.__FORCE_RESULT__ = "HERO";
        break;
      case "c": // force CAP
        window.__FORCE_RESULT__ = "CAP";
        break;
      case "s": // skip to result
        window.__SKIP_TO_RESULT__ = true;
        break;
      default:
        break;
    }
  });
}

export {};
