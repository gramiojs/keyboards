// @ts-nocheck
//![INFO] Some hack for solve grammy union type problem
//TODO: maybe find better way?
import { describe, expect, test } from "bun:test";
import { InlineKeyboard } from "../src";

describe("InlineKeyboard", () => {
	test("simple", () => {
		expect(new InlineKeyboard().build()).toEqual({
			inline_keyboard: [],
		});
	});

	test("with text", () => {
		const { inline_keyboard } = new InlineKeyboard().text("gramio").build();

		expect(inline_keyboard).toEqual([[{ text: "gramio" }]]);
	});

	test("with row", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.text("gramio", "test")
			.row()
			.text("gramio", "some")
			.build();

		expect(inline_keyboard).toEqual([
			[{ text: "gramio", callback_data: "test" }],
			[{ text: "gramio", callback_data: "some" }],
		]);
	});

	test("with filter", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.text("gramio", "test")
			.row()
			.text("gramio", "other")
			.filter(({ button }) => button.callback_data !== "test")
			.build();

		expect(inline_keyboard).toEqual([
			[{ text: "gramio", callback_data: "other" }],
		]);
	});

	test("with addIf", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.text("gramio", "test")
			.row()
			.addIf(1 === 2, InlineKeyboard.text("test", "gramio"))
			.build();

		expect(inline_keyboard).toEqual([
			[{ text: "gramio", callback_data: "test" }],
		]);
	});

	test("matrix", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.matrix(2, 2, ({ rowIndex, index }) =>
				InlineKeyboard.text(
					rowIndex === 1 && index === 0 ? "💣" : "ㅤ",
					"payload",
				),
			)
			.build();

		expect(inline_keyboard).toEqual([
			[
				{ text: "ㅤ", callback_data: "payload" },
				{ text: "ㅤ", callback_data: "payload" },
			],
			[
				{ text: "💣", callback_data: "payload" },
				{ text: "ㅤ", callback_data: "payload" },
			],
		]);
	});

	test("combine", () => {
		const { inline_keyboard } = new InlineKeyboard()
			.combine(new InlineKeyboard())
			.combine(new InlineKeyboard().text("some", "payload"))
			.row()
			.combine(
				new InlineKeyboard()
					.text("test", "payload")
					.row()
					.text("second row???", "payload"),
			)
			.build();

		expect(inline_keyboard).toEqual([
			[{ text: "some", callback_data: "payload" }],
			[{ text: "test", callback_data: "payload" }],
			[{ text: "second row???", callback_data: "payload" }],
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
			.build();

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
