## 2026-06-15 - [React Re-render Isolation]
**Learning:** Frequent state updates (e.g., 50ms interval) in a parent component (`PilotExperience`) cause all children to re-render, including heavy components like `Webcam`.
**Action:** Extract the state and the animation logic into a small, leaf-node component (`ScanningOverlay`) to isolate re-renders.
