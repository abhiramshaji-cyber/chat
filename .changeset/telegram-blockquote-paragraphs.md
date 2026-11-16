---
"@chat-adapter/telegram": patch
---

Keep the paragraphs of a Markdown block quote apart in the Telegram MarkdownV2 renderer. It joined the quoted blocks with a single newline, so `> First.\n>\n> Second.` came out as two lines with no gap, unlike the same paragraphs outside a quote. Now a blank quoted line (`>`) separates the blocks, the same as the rich message renderer. Line breaks inside quoted code and inline code no longer get the `>` prefix, which Telegram showed as literal text in the code. Quote children that render to nothing are skipped, and an empty quote renders nothing.
