import { describe, expect, test } from "bun:test";
import { InlineQueryResult, InputMessageContent } from "../../src";

describe("InlineQueryResult", () => {
	test("not cached", () => {
		InlineQueryResult.article("", "", InputMessageContent.text("teest"), {});
		InlineQueryResult.audio("", "", "", {});
		InlineQueryResult.contact("", "", "", {});
		InlineQueryResult.documentPdf("", "", "", {});
		InlineQueryResult.documentZip("", "", "", {});
		InlineQueryResult.game("", "", {});
		InlineQueryResult.gif("", "", "", {});
		InlineQueryResult.location("", 1, 2, "", {});
		InlineQueryResult.mpeg4Gif("", "", "", {});
		InlineQueryResult.photo("", "", "", {});
		// InlineQueryResult.venue("", {});
		InlineQueryResult.videoHtml("", "", "", "", {});
		InlineQueryResult.voice("", "", "", {});
	});
	test("cached", () => {
		InlineQueryResult.cached.audio("", "", {});
		InlineQueryResult.cached.document("", "", "", {});
		InlineQueryResult.cached.gif("", "", {});
		InlineQueryResult.cached.mpeg4Gif("", "", {});
		InlineQueryResult.cached.photo("", "", {});
		InlineQueryResult.cached.sticker("", "", {});
		InlineQueryResult.cached.video("", "", "", {});
		InlineQueryResult.cached.voice("", "", "", {});
	});
});
