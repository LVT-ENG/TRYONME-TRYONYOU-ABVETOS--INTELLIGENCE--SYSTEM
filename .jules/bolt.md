## 2025-10-27 - [Backend Concurrency]
**Learning:** `HTTPServer` in Python's standard library is single-threaded by default. This creates a bottleneck where one long-running AI request blocks all other users.
**Action:** Use `ThreadingHTTPServer` (available in Python 3.7+) or `ThreadingMixIn` for any production-like Python HTTP server to ensure concurrent request handling without external WSGI containers.
