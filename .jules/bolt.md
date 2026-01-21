## 2024-05-23 - Flat vs Nested Structure Mismatch

**Learning:** The `vite.config.ts` was configured for a nested `client/` structure while the actual source files were flat in the root directory. This mismatch caused broken imports and build failures.
**Action:** When seeing build errors related to missing files, always verify the actual file structure against the build configuration (`root`, `alias`) immediately.

## 2024-05-23 - Code Splitting Impact

**Learning:** Lazy loading heavy route components (`BiometricCapture`, `Wardrobe`, etc.) reduced the initial bundle size by ~26% (155kB).
**Action:** Always verify bundle size reduction with `pnpm build` before and after.
