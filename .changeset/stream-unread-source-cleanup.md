---
"chat": patch
---

Close the source stream passed to `thread.post()` when posting fails before anything read from it. If the adapter's `stream()` threw before its first read, or the post and edit fallback failed to post its placeholder, the source was never opened by the stream pipeline, so the abort handling had no cleanup to run and a source with a request already in flight, such as an AI SDK `ReadableStream`, was never cancelled. `thread.post()` now calls `return()` on a source it never read when it throws.
