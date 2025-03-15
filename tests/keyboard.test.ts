import { describe, expect, test } from "bun:test";
import { Keyboard } from "../src/index.ts";

describe("Keyboard", () => {
	test("Simple keyboard", () => {
		expect(new Keyboard().build()).toEqual({
			keyboard: [],
			one_time_keyboard: false,
			is_persistent: false,
			resize_keyboard: true,
			selective: false,
		});
	});

	test("Keyboard with text", () => {
		const { keyboard } = new Keyboard().text("test text").build();

		expect(keyboard).toEqual([[{ text: "test text" }]]);
	});

	test("Keyboard with row", () => {
		const { keyboard } = new Keyboard()
			.row()
			.text("test text")
			.row()
			.row()
			.text("test")
			.row()
			.build();

		expect(keyboard).toEqual([[{ text: "test text" }], [{ text: "test" }]]);
	});

	test("Keyboard with wrap columns", () => {
		const { keyboard } = new Keyboard().columns(1).text("1").text("2").build();

		expect(keyboard).toEqual([[{ text: "1" }], [{ text: "2" }]]);
	});

	test("Keyboard with wrap fn", () => {
		const { keyboard } = new Keyboard()
			.wrap(({ button }) => button.text === "3")
			.text("1")
			.text("2")
			.text("3")
			.text("4")
			.build();

		expect(keyboard).toEqual([
			[{ text: "1" }, { text: "2" }],
			[{ text: "3" }, { text: "4" }],
		]);
	});

	test("Keyboard with add", () => {
		const labels = ["test", "test2"];

		const { keyboard } = new Keyboard()
			.pattern([1, 2, 1])
			.text("page 1")
			.add(...labels.map((x) => Keyboard.text(x)))
			.text("next page")
			.build();

		expect(keyboard).toEqual([
			[{ text: "page 1" }],
			[{ text: "test" }, { text: "test2" }],
			[{ text: "next page" }],
		]);
	});

	test("Keyboard with pattern", () => {
		const { keyboard } = new Keyboard()
			.pattern([1, 3, 2])
			.text("1")
			.text("2")
			.text("3")
			.text("4")
			.text("5")
			.text("6")
			.build();

		expect(keyboard).toEqual([
			[{ text: "1" }],
			[{ text: "2" }, { text: "3" }, { text: "4" }],
			[{ text: "5" }, { text: "6" }],
		]);
	});

	test("Keyboard with webApp", () => {
		const { keyboard } = new Keyboard().webApp("test text", "https://").build();

		expect(keyboard).toEqual([
			[{ text: "test text", web_app: { url: "https://" } }],
		]);
	});

	test("Combine", () => {
		const { keyboard } = new Keyboard()
			.combine(new Keyboard())
			.combine(new Keyboard().text("some"))
			.row()
			.combine(new Keyboard().text("test").row().text("second row???"))
			.build();

		expect(keyboard).toEqual([
			[{ text: "some" }],
			[{ text: "test" }],
			[{ text: "second row???" }],
		]);
	});

	test("Keyboard with webApp AND text", () => {
		const { keyboard } = new Keyboard()
			.webApp("test text", "https://")
			.text("other text")
			.build();

		expect(keyboard).toEqual([
			[
				{ text: "test text", web_app: { url: "https://" } },
				{ text: "other text" },
			],
		]);
	});

	test("One-time Keyboard with webApp AND text", () => {
		const { keyboard, one_time_keyboard } = new Keyboard()
			.webApp("test text", "https://")
			.text("other text")
			.oneTime()
			.build();

		expect(one_time_keyboard).toBe(true);
		expect(keyboard).toEqual([
			[
				{ text: "test text", web_app: { url: "https://" } },
				{ text: "other text" },
			],
		]);
	});

	test("Keyboard with all types of button", () => {
		const { keyboard } = new Keyboard()
			.webApp("test text", "https://")
			.text("other text")
			.requestChat("gramio", 255, {
				chat_is_forum: true,
			})
			.requestContact("contact")
			.requestLocation("location")
			.requestPoll("pool", "quiz")
			.requestUsers("test", 666, {
				user_is_premium: true,
			})
			.build();

		expect(keyboard).toEqual([
			[
				{ text: "test text", web_app: { url: "https://" } },
				{ text: "other text" },
				{
					text: "gramio",
					request_chat: {
						request_id: 255,
						chat_is_channel: false,
						chat_is_forum: true,
					},
				},
				{
					text: "contact",
					request_contact: true,
				},
				{
					request_location: true,
					text: "location",
				},
				{
					request_poll: {
						type: "quiz",
					},
					text: "pool",
				},
				{
					request_users: {
						request_id: 666,
						user_is_premium: true,
					},
					text: "test",
				},
			],
		]);
	});
	test("Keyboard with options", () => {
		const {
			one_time_keyboard,
			input_field_placeholder,
			selective,
			resize_keyboard,
			is_persistent,
		} = new Keyboard()
			.oneTime()
			.placeholder("gramio is the best!")
			.selective()
			.selective(false)
			.resized()
			.persistent()
			.build();

		expect(one_time_keyboard).toBe(true);
		expect(input_field_placeholder).toBe("gramio is the best!");
		expect(selective).toBe(false);
		expect(resize_keyboard).toBe(true);
		expect(is_persistent).toBe(true);
	});

	test("Delete placeholder from Keyboard", () => {
		const { input_field_placeholder } = new Keyboard()
			.placeholder("test")
			.placeholder()
			.build();

		expect(input_field_placeholder).toBeUndefined();
	});
});
