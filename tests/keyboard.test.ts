import { describe, expect, test } from "bun:test";
import { Keyboard } from "../src";

describe("Keyboard", () => {
	test("Simple keyboard", () => {
		expect(new Keyboard().toJSON()).toEqual({
			keyboard: [[]],
			one_time_keyboard: false,
			is_persistent: false,
			resize_keyboard: false,
			selective: false,
		});
	});

	test("Keyboard with text", () => {
		const { keyboard } = new Keyboard().text("test text").toJSON();

		expect(keyboard).toEqual([[{ text: "test text" }]]);
	});

	test("Keyboard with webApp", () => {
		const { keyboard } = new Keyboard()
			.webApp("test text", "https://")
			.toJSON();

		expect(keyboard).toEqual([
			[{ text: "test text", web_app: { url: "https://" } }],
		]);
	});

	test("Keyboard with webApp AND text", () => {
		const { keyboard } = new Keyboard()
			.webApp("test text", "https://")
			.text("other text")
			.toJSON();

		expect(keyboard).toEqual([
			[
				{ text: "test text", web_app: { url: "https://" } },
				{ text: "other text" },
			],
		]);
	});
});
