import type { Content, Root } from "chat";

const REGEX_SPECIAL_PATTERN = /[.*+?^${}()|[\]\\]/g;
const INLINE_PARENT_TYPES = new Set([
  "paragraph",
  "heading",
  "emphasis",
  "strong",
  "delete",
  "link",
  "linkReference",
  "tableCell",
]);

export function mentionsUser(ast: Root, userName: string): boolean {
  const pattern = new RegExp(
    `(?<!\\w)@${userName.replace(REGEX_SPECIAL_PATTERN, "\\$&")}(?![\\w-])`,
    "i"
  );
  return pattern.test(mentionableText(ast));
}

function mentionableText(node: Content | Root): string {
  if (
    node.type === "code" ||
    node.type === "inlineCode" ||
    node.type === "blockquote" ||
    node.type === "html"
  ) {
    return " ";
  }
  if (node.type === "break") {
    return "\n";
  }
  if (node.type === "text") {
    return node.value;
  }
  if (!("children" in node)) {
    return " ";
  }
  const separator = INLINE_PARENT_TYPES.has(node.type) ? "" : "\n";
  return node.children
    .map((child) => mentionableText(child as Content))
    .join(separator);
}
