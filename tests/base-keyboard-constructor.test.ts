import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { BaseKeyboardConstructor } from "../src/base-keyboard-constructor.ts";
import { keyboardsFeatureFlagsMap } from "../src/utils.ts";

interface TestButton {
	text: string;
	callback_data: string;
}

describe("BaseKeyboardConstructor - add() method", () => {
	// Helper function to create test buttons
	const createTestButton = (text: string): TestButton => ({
		text,
		callback_data: `callback_${text}`,
	});

	test("should add buttons without helpers", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("1"),
			createTestButton("2"),
			createTestButton("3"),
		];

		keyboard.add(...buttons);
		expect(keyboard["currentRow"]).toEqual(buttons);
		expect(keyboard["rows"]).toEqual([]);
	});

	describe("with enableSetterKeyboardHelpers enabled", () => {
		beforeEach(() => {
			keyboardsFeatureFlagsMap.enableSetterKeyboardHelpers = true;
		});

		afterEach(() => {
			keyboardsFeatureFlagsMap.enableSetterKeyboardHelpers = false;
		});

		test("should handle columns helper", () => {
			const keyboard = new BaseKeyboardConstructor<TestButton>();
			const buttons = [
				createTestButton("1"),
				createTestButton("2"),
				createTestButton("3"),
				createTestButton("4"),
			];

			keyboard.columns(2).add(...buttons);

			expect(keyboard["rows"]).toEqual([
				[buttons[0], buttons[1]],
				[buttons[2], buttons[3]],
			]);
			expect(keyboard["currentRow"]).toEqual([]);
		});

		test("should handle wrap helper", () => {
			const keyboard = new BaseKeyboardConstructor<TestButton>();
			const buttons = [
				createTestButton("1"),
				createTestButton("2"),
				createTestButton("3"),
			];

			keyboard.wrap(({ index }) => index === 1).add(...buttons);

			expect(keyboard["rows"]).toEqual([[buttons[0], buttons[1]]]);
			expect(keyboard["currentRow"]).toEqual([buttons[2]]);
		});

		test("should handle pattern helper", () => {
			const keyboard = new BaseKeyboardConstructor<TestButton>();
			const buttons = [
				createTestButton("1"),
				createTestButton("2"),
				createTestButton("3"),
				createTestButton("4"),
			];

			keyboard.pattern([1, 2, 1]).add(...buttons);

			expect(keyboard["rows"]).toEqual([
				[buttons[0]],
				[buttons[1], buttons[2]],
				[buttons[3]],
			]);
			expect(keyboard["currentRow"]).toEqual([]);
		});

		test("should handle filter helper", () => {
			const keyboard = new BaseKeyboardConstructor<TestButton>();
			const buttons = [
				createTestButton("1"),
				createTestButton("skip"),
				createTestButton("3"),
			];

			keyboard.filter(({ button }) => button.text !== "skip").add(...buttons);

			expect(keyboard["currentRow"]).toEqual([buttons[0], buttons[2]]);
		});

		test("should combine filter with columns helper", () => {
			const keyboard = new BaseKeyboardConstructor<TestButton>();
			const buttons = [
				createTestButton("1"),
				createTestButton("skip"),
				createTestButton("2"),
				createTestButton("3"),
			];

			keyboard
				.filter(({ button }) => button.text !== "skip")
				.columns(2)
				.add(...buttons);

			expect(keyboard["rows"]).toEqual([[buttons[0], buttons[2]]]);
			expect(keyboard["currentRow"]).toEqual([buttons[3]]);
		});

		test("should handle empty pattern array", () => {
			const keyboard = new BaseKeyboardConstructor<TestButton>();
			const buttons = [createTestButton("1"), createTestButton("2")];

			keyboard.pattern([1]).add(...buttons);

			expect(keyboard["rows"]).toEqual([[buttons[0]]]);
			expect(keyboard["currentRow"]).toEqual([buttons[1]]);

			expect(keyboard["appliedHelper"]).toBeUndefined();
		});
	});
});
