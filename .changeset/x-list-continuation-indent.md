---
"@chat-adapter/x": patch
---

Keep every line of a multi line block indented inside a list item in the X converter. A code block or a hard line break in a list item only indented its first line, so `- item` followed by a fenced `a` and `b` came out as `• item\n\n  a\nb`, with `b` flush left. The X converter now turns on `indentListContinuationLines`, the same as Teams, so every line stays under its item.
