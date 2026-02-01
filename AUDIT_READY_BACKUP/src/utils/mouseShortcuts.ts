// === MOUSE OPERATOR SHORTCUTS ===

declare global {
  interface Window {
    __FORCE_NEXT_STEP__?: boolean;
    __FORCE_RESULT__?: string;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "r": // reset demo
        window.location.reload();
        break;
      case "n": // next step
        window.__FORCE_NEXT_STEP__ = true;
        break;
      case "h": // force HERO
        window.__FORCE_RESULT__ = "HERO";
        break;
      case "c": // force CAP
        window.__FORCE_RESULT__ = "CAP";
        break;
      default:
        break;
    }
  });
}

export {};
