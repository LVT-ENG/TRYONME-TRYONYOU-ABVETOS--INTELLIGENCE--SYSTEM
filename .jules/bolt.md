## 2025-05-18 - Canvas Performance
**Learning:** `ctx.setTransform(1, 0, 0, 1, 0, 0)` is faster than `ctx.restore()` but risks wiping out global context state (e.g. DPI scaling).
**Action:** Prefer `ctx.save()`/`ctx.restore()` for robustness unless context state is tightly controlled and verified to be identity.

## 2025-05-18 - Canvas Shadows
**Learning:** `ctx.shadowBlur` triggers expensive CPU-based gaussian blurs.
**Action:** Replace with multi-pass stroking (layered opacity/width) for glow effects in animation loops.
