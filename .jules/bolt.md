# Bolt's Journal

## 2024-05-22 - Canvas Performance Anti-Patterns
**Learning:** `ctx.shadowBlur` and full-canvas `ctx.fillRect` with radial gradients are major performance bottlenecks in render loops (MediaPipe overlay).
**Action:** Replace `shadowBlur` with multi-pass strokes (manual glow) and restrict `fillRect` to the gradient's bounding box to reduce fill rate. Also avoid `ctx.save()/restore()` in tight loops when `setTransform` suffices.
