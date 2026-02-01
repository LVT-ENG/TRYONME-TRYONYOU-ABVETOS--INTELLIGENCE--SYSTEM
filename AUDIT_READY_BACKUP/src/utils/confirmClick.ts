// === CLICK CONFIRMATION FOR MOUSE DEMO ===

export function confirmDemoClick(label: string, onConfirm: () => void) {
  const confirmed = window.confirm(`Confirm action: ${label}`);
  if (confirmed && typeof onConfirm === "function") {
    onConfirm();
  }
}
