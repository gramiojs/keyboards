import { describe, expect, test } from "bun:test";
import { ForceReplyKeyboard } from "../src";

describe("ForceReplyKeyboard", () => {
	test("simple", () => {
		expect(new ForceReplyKeyboard().build()).toEqual({
			force_reply: true,
			selective: false,
			input_field_placeholder: undefined,
		});
	});

	test("with options", () => {
		expect(
			new ForceReplyKeyboard().selective().placeholder("GRAMIO").build(),
		).toEqual({
			force_reply: true,
			selective: true,
			input_field_placeholder: "GRAMIO",
		});
	});
});
