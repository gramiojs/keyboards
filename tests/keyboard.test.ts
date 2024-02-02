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

	test("One-time Keyboard with webApp AND text", () => {
		const { keyboard, one_time_keyboard } = new Keyboard()
			.webApp("test text", "https://")
			.text("other text")
			.oneTime()
			.toJSON();

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
			.toJSON();

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
			.toJSON();

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
			.toJSON();

		expect(input_field_placeholder).toBeUndefined();
	});
});
