---
"@chat-adapter/github": patch
---

Set `message.isMention` on issue comments and pull request review comments. It was left unset, so Chat fell back to matching `@userName` in the plain text, and a comment that mentioned the bot only inside inline code, a code block, a block quote, or HTML still reached `onNewMention`. A comment now counts as a mention only when `@userName` appears outside those, the same rule the GitLab adapter uses. This applies to webhook comments and to messages from `fetchMessages` and `parseMessage`.
