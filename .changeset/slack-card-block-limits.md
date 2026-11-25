---
"@chat-adapter/slack": patch
---

Split card `Actions` with more than 25 elements into consecutive `actions` blocks, and `Fields` with more than 10 fields into consecutive `section` blocks, so larger cards and modals fit Slack's Block Kit limits instead of failing with `invalid_blocks`. Empty `Actions` and `Fields` no longer emit an empty block.
