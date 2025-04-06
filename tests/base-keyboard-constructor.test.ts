import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { BaseKeyboardConstructor } from "../src/base-keyboard-constructor.ts";
import { keyboardsFeatureFlagsMap } from "../src/utils.ts";

interface TestButton {
	text: string;
	callback_data: string;
}

function createTestButton(text: string): TestButton {
	return {
		text,
		callback_data: `callback_${text}`,
	};
}

describe("BaseKeyboardConstructor - add() method", () => {
	beforeEach(() => {
		keyboardsFeatureFlagsMap.enableSetterKeyboardHelpers = true;
	});

	afterEach(() => {
		keyboardsFeatureFlagsMap.enableSetterKeyboardHelpers = false;
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

	test("should combine filter and pattern helpers", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("1"),
			createTestButton("skip"),
			createTestButton("2"),
			createTestButton("skip"),
			createTestButton("3"),
			createTestButton("4"),
		];

		keyboard
			.filter(({ button }) => button.text !== "skip")
			.pattern([2, 1])
			.add(...buttons);

		expect(keyboard["rows"]).toEqual([[buttons[0], buttons[2]], [buttons[4]]]);
		expect(keyboard["currentRow"]).toEqual([buttons[5]]);
	});

	test("should handle changing helpers mid-flow", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons1 = [
			createTestButton("1"),
			createTestButton("2"),
			createTestButton("3"),
		];
		const buttons2 = [
			createTestButton("4"),
			createTestButton("5"),
			createTestButton("6"),
		];

		keyboard
			.columns(2)
			.add(...buttons1)
			.row()
			.pattern([1, 2])
			.add(...buttons2);

		console.log(keyboard["rows"]);

		expect(keyboard["rows"]).toEqual([
			[buttons1[0], buttons1[1]],
			[buttons1[2]],
			[buttons2[0]],
			[buttons2[1], buttons2[2]],
		]);
	});

	test("should handle wrap with filter combination", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("1"),
			createTestButton("break"),
			createTestButton("skip"),
			createTestButton("2"),
			createTestButton("break"),
			createTestButton("3"),
		];

		keyboard
			.filter(({ button }) => button.text !== "skip")
			.wrap(({ button }) => button.text === "break")
			.add(...buttons);

		expect(keyboard["rows"]).toEqual([
			[buttons[0], buttons[1]],
			[buttons[3], buttons[4]],
		]);
		expect(keyboard["currentRow"]).toEqual([buttons[5]]);
	});

	test("should handle complex pattern with filter", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = Array.from({ length: 10 }, (_, i) =>
			createTestButton(i % 2 === 0 ? String(i) : "skip"),
		);

		keyboard
			.filter(({ button }) => button.text !== "skip")
			.pattern([1, 2, 1])
			.add(...buttons);

		expect(keyboard["rows"]).toEqual([
			[buttons[0]],
			[buttons[2], buttons[4]],
			[buttons[6]],
		]);
		expect(keyboard["currentRow"]).toEqual([buttons[8]]);
	});

	test("should handle columns override pattern", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("1"),
			createTestButton("2"),
			createTestButton("3"),
			createTestButton("4"),
		];

		keyboard
			.pattern([1, 2])
			.add(buttons[0])
			.columns(2)
			.add(buttons[1], buttons[2], buttons[3]);

		expect(keyboard["rows"]).toEqual([[buttons[0]], [buttons[1], buttons[2]]]);
		expect(keyboard["currentRow"]).toEqual([buttons[3]]);
	});

	test("should handle filter with empty result", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("skip"),
			createTestButton("skip"),
			createTestButton("skip"),
		];

		keyboard
			.filter(({ button }) => button.text !== "skip")
			.columns(2)
			.add(...buttons);

		expect(keyboard["rows"]).toEqual([]);
		expect(keyboard["currentRow"]).toEqual([]);
	});

	test("should maintain helper state after row()", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("1"),
			createTestButton("2"),
			createTestButton("3"),
			createTestButton("4"),
		];

		keyboard
			.columns(2)
			.add(buttons[0], buttons[1])
			.row()
			.add(buttons[2], buttons[3]);

		expect(keyboard["rows"]).toEqual([
			[buttons[0], buttons[1]],
			[buttons[2], buttons[3]],
		]);
		expect(keyboard["currentRow"]).toEqual([]);
	});

	test("should not reset helper state after row()", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>();
		const buttons = [
			createTestButton("1"),
			createTestButton("2"),
			createTestButton("3"),
			createTestButton("4"),
			createTestButton("5"),
		];

		keyboard
			.columns(2)
			.add(buttons[0], buttons[1])
			.row()
			.add(buttons[2], buttons[3], buttons[4]);

		console.log(keyboard["rows"]);

		expect(keyboard["keyboard"]).toEqual([
			[buttons[0], buttons[1]],
			[buttons[2], buttons[3]],
			[buttons[4]],
		]);
	});

	test("should reset helpers", () => {
		const keyboard = new BaseKeyboardConstructor<TestButton>()
			.columns(2)
			.add(createTestButton("1"), createTestButton("2"))
			.resetHelpers()
			.add(createTestButton("3"), createTestButton("4"), createTestButton("5"));

		expect(keyboard["appliedHelper"]).toBeUndefined();
		expect(keyboard["appliedFilter"]).toBeUndefined();

		expect(keyboard["keyboard"]).toEqual([
			[createTestButton("1"), createTestButton("2")],
			[createTestButton("3"), createTestButton("4"), createTestButton("5")],
		]);
	});
});
