import { parseMarkdown } from "chat";
import { describe, expect, it } from "vitest";
import { mentionsUser } from "./mention";

const mentions = (markdown: string, userName = "test-bot") =>
  mentionsUser(parseMarkdown(markdown), userName);

describe("mentionsUser", () => {
  it.each([
    ["plain text", "@test-bot please review"],
    ["the end of a sentence", "thanks @test-bot."],
    ["parentheses", "(@test-bot)"],
    ["a trailing comma", "@test-bot, rerun"],
    ["a different case", "@Test-Bot review"],
    ["emphasis", "**@test-bot** review"],
    ["strikethrough", "~~@test-bot~~"],
    ["a heading", "# @test-bot"],
    ["a list item", "- @test-bot review"],
    ["a table cell", "| a |\n| - |\n| @test-bot |"],
    ["a line after a hard break", "first  \n@test-bot"],
    ["text right after inline code", "`x`@test-bot"],
    ["text right after a link", "[docs](https://example.com)@test-bot"],
    ["text after an html tag", "<b>@test-bot</b>"],
    ["text after a quote", "> earlier\n\n@test-bot thoughts?"],
    ["one of several mentions", "@someone `@test-bot` and @test-bot"],
  ])("counts a mention in %s", (_, markdown) => {
    expect(mentions(markdown)).toBe(true);
  });

  it.each([
    ["inline code", "run `@test-bot review`"],
    ["double backtick code", "run `` @test-bot `x` ``"],
    ["a fenced code block", "```\n@test-bot review\n```"],
    ["a tilde fenced code block", "~~~sh\n@test-bot review\n~~~"],
    ["an indented code block", "text\n\n    @test-bot review"],
    ["a quote", "> @test-bot review"],
    ["a nested quote", "> > @test-bot review"],
    ["a list inside a quote", "> - @test-bot review"],
    ["an html comment", "<!-- @test-bot -->"],
    ["an html block", "<details>\n@test-bot\n</details>"],
    ["link text", "[@test-bot](https://example.com)"],
    ["a reference link", "[@test-bot][ref]\n\n[ref]: https://example.com"],
    ["a url", "see https://github.com/@test-bot"],
    ["a longer name", "@test-botx hi"],
    ["a hyphenated longer name", "@test-bot-two hi"],
    ["an email address", "mail jane@test-bot.com"],
    ["a word prefix", "foo@test-bot"],
    ["an image alt", "![@test-bot](https://example.com/a.png)"],
    ["an empty comment", ""],
  ])("ignores a mention in %s", (_, markdown) => {
    expect(mentions(markdown)).toBe(false);
  });

  it("matches a bot user name with regex characters literally", () => {
    expect(mentions("@my-bot[bot] hi", "my-bot[bot]")).toBe(true);
    expect(mentions("@my-botb hi", "my-bot[bot]")).toBe(false);
    expect(mentions("`@my-bot[bot]`", "my-bot[bot]")).toBe(false);
  });
});
