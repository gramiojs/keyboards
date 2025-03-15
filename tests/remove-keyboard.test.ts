import { describe, expect, test } from "bun:test";
import { RemoveKeyboard } from "../src/index.ts";

describe("RemoveKeyboard", () => {
	test("simple", () => {
		expect(new RemoveKeyboard().build()).toEqual({
			remove_keyboard: true,
			selective: false,
		});
	});

	test("with options", () => {
		expect(new RemoveKeyboard().selective().build()).toEqual({
			remove_keyboard: true,
			selective: true,
		});
	});
});
