---
"@chat-adapter/discord": patch
---

Prune expired entries from the Discord thread parent cache whenever a new entry is written, so long running gateway processes no longer keep one entry per thread they have ever seen.
