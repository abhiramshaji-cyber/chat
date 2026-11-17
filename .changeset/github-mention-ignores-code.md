---
"@chat-adapter/github": patch
---

Only count a bot mention in the normal text of a GitHub comment. The adapter now sets `isMention` on `issue_comment` and `pull_request_review_comment` messages from the parsed Markdown, so `@bot` inside inline code, a code block, a quote, HTML, or a link no longer fires `onNewMention`.
