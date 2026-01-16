## 2024-05-22 - [Missing Infrastructure]
**Learning:** The environment seems to lack `package.json` and build scripts, despite memory indicating otherwise. This forces "blind" optimization based on code patterns rather than runtime profiling.
**Action:** When working in incomplete environments, rely on static analysis and established React patterns (memoization, style extraction) that are safe and generally beneficial.
