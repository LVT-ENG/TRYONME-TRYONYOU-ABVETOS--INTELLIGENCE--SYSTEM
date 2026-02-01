// === CURSOR GUIDANCE (DEMO ASSIST) ===

export function guideCursorTo(elementId: string) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.classList.add("demo-clickable");
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}
