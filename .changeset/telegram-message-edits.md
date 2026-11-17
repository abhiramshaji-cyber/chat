---
"@chat-adapter/telegram": patch
"@chat-adapter/catalog": patch
---

The Telegram adapter reports `edited_message`, `edited_channel_post`, and `edited_business_message` to `onMessageUpdated`. Edits used to go through `processMessage` with the original message ID, so the dedupe dropped them for 10 minutes and answered them as new messages after that. Edits no longer start the typing indicator or run slash commands.

`previousMessage` is the last version the adapter saw, from an earlier edit, the process cache, or persisted thread history, and `undefined` when it never saw the message. An edit older than one already reported for the same message is ignored.

The catalog lists Telegram message edit events as supported.
