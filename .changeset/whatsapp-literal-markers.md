---
"@chat-adapter/whatsapp": patch
---

Bold and strikethrough in incoming WhatsApp messages now follow the same rule WhatsApp uses: the markers must wrap text with no space just inside them and must not touch a letter or digit outside. Markers inside inline code stay as typed. Text such as `2 * 3`, `5*3=15`, `~5 to ~10`, and `` `a*b*c` `` now stays literal.
