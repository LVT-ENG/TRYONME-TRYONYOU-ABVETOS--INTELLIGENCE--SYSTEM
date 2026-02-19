## 2026-06-15 - [React Re-render Isolation]
**Learning:** Frequent state updates (e.g., 50ms interval) in a parent component (`PilotExperience`) cause all children to re-render, including heavy components like `Webcam`.
**Action:** Extract the state and the animation logic into a small, leaf-node component (`ScanningOverlay`) to isolate re-renders.

## 2026-06-16 - [CSS Animation > JS Interval]
**Learning:** Found `ScanningOverlay` using `setInterval` (20fps) for a simple linear animation, blocking the main thread.
**Action:** Replaced with CSS Keyframes (`@keyframes`). Always prefer CSS for layout-independent animations to offload work to the compositor thread.
