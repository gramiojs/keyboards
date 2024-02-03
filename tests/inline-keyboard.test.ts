import { describe, expect, test } from "bun:test";
import { InlineKeyboard } from "../src";

describe("InlineKeyboard", () => {
	test("simple", () => {
		expect(new InlineKeyboard().toJSON()).toEqual({
			inline_keyboard: [],
		});
	});

	test("with text", () => {
		const { inline_keyboard } = new InlineKeyboard().text("gramio").toJSON();

		expect(inline_keyboard).toEqual([[{ text: "gramio" }]]);
	});

	test("with row", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.text("gramio", "test")
			.row()
			.text("gramio")
			.toJSON();

		expect(inline_keyboard).toEqual([
			[{ text: "gramio", callback_data: "test" }],
			[{ text: "gramio", callback_data: undefined }],
		]);
	});

	test("with filter", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.text("gramio", "test")
			.row()
			.text("gramio")
			.filter(({ button }) => button.callback_data !== "test")
			.toJSON();

		expect(inline_keyboard).toEqual([
			[{ text: "gramio", callback_data: undefined }],
		]);
	});

	test("with all types of inline keyboard", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.columns(1)
			.pay("pay")
			.login("link", "https://")
			.text("gramio", {
				payload: true,
			})
			.switchToChat("toChat", "query")
			.switchToChosenChat("toChosenChat", "query2")
			.switchToCurrentChat("toCurrentChat")
			.webApp("test", "https://")
			.toJSON();

		expect(inline_keyboard).toEqual([
			[{ pay: true, text: "pay" }],
			[
				{
					login_url: { url: "https://" },
					text: "link",
				},
			],
			[{ text: "gramio", callback_data: `{"payload":true}` }],
			[{ switch_inline_query: "query", text: "toChat" }],
			[
				{
					switch_inline_query_chosen_chat: {
						query: "query2",
					},
					text: "toChosenChat",
				},
			],
			[
				{
					switch_inline_query_current_chat: "",
					text: "toCurrentChat",
				},
			],
			[
				{
					text: "test",
					web_app: {
						url: "https://",
					},
				},
			],
		]);
	});
});
