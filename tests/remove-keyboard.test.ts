import { describe, expect, test } from "bun:test";
import { RemoveKeyboard } from "../src";

describe("RemoveKeyboard", () => {
	test("simple", () => {
		expect(new RemoveKeyboard().toJSON()).toEqual({
			remove_keyboard: true,
			selective: false,
		});
	});

	test("with options", () => {
		expect(new RemoveKeyboard().selective().toJSON()).toEqual({
			remove_keyboard: true,
			selective: true,
		});
	});
});
