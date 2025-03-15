import {
	type ButtonsIterator,
	type CreateButtonIterator,
	type KeyboardFeatureFlags,
	type KeyboardHelpers,
	chunk,
	customWrap,
	filter,
	keyboardsFeatureFlagsMap,
	pattern,
} from "./utils.ts";

/** Base-class for construct keyboard with useful helpers */
export class BaseKeyboardConstructor<T> {
	protected rows: T[][] = [];
	protected currentRow: T[] = [];
	protected featureFlags = keyboardsFeatureFlagsMap;

	constructor(featureFlags?: KeyboardFeatureFlags) {
		this.featureFlags = featureFlags ?? keyboardsFeatureFlagsMap;
	}

	private wrapOptions = {
		columns: undefined as number | undefined,
		fn: undefined as ButtonsIterator<T> | undefined,
		filter: undefined as ButtonsIterator<T> | undefined,
		pattern: undefined as number[] | undefined,
	};

	private appliedHelper: KeyboardHelpers<T> | undefined;
	// Can be combined with other helpers
	private appliedFilter: ButtonsIterator<T> | undefined;

	protected get keyboard() {
		let keyboard = this.currentRow.length
			? [...this.rows, this.currentRow]
			: this.rows;

		if (this.featureFlags.enableSetterKeyboardHelpers) return keyboard;

		if (this.wrapOptions.columns)
			keyboard = chunk(keyboard, this.wrapOptions.columns);
		if (this.wrapOptions.fn)
			keyboard = customWrap(keyboard, this.wrapOptions.fn);
		if (this.wrapOptions.pattern)
			keyboard = pattern(keyboard, this.wrapOptions.pattern);
		if (this.wrapOptions.filter)
			keyboard = filter(keyboard, this.wrapOptions.filter);

		return keyboard;
	}

	/**
	 * Adds a `line break`. Call this method to make sure that the next added buttons will be on a new row.
	 * @example
	 * ```ts
	 * new InlineKeyboard()
	 *     .text("first row", "payload")
	 *     .row()
	 *     .text("second row", "payload");
	 * ```
	 */
	public row(removeAppliedHelper = true) {
		if (!this.currentRow.length) return this;

		this.rows.push(this.currentRow);
		this.currentRow = [];
		if (removeAppliedHelper) this.appliedHelper = undefined;

		return this;
	}

	/**
	 * Allows you to limit the number of columns in the keyboard.
	 * @example
	 * ```ts
	 * new InlineKeyboard()
	 *     .columns(1)
	 *     .text("first row", "payload")
	 *     .text("second row", "payload");
	 *     .text("third row", "payload");
	 * ```
	 */
	public columns(length?: number) {
		this.wrapOptions.columns = length;

		if (length) this.appliedHelper = { type: "columns", columns: length };
		else this.appliedHelper = undefined;

		return this;
	}

	/**
	 * A custom handler that controls row wrapping.
	 * @example
	 * ```ts
	 * new InlineKeyboard()
	 *     .wrap(({ button }) => button.callback_data === "2")
	 *     .text("first row", "1")
	 *     .text("first row", "1");
	 *     .text("second row", "2");
	 * ```
	 */
	public wrap(fn?: ButtonsIterator<T>) {
		this.wrapOptions.fn = fn;

		if (fn) this.appliedHelper = { type: "wrap", fn };
		else this.appliedHelper = undefined;

		return this;
	}

	/**
	 * A handler that helps filter keyboard buttons
	 * @example
	 * ```ts
	 * new InlineKeyboard()
	 *     .filter(({ button }) => button.callback_data !== "hidden")
	 *     .text("button", "pass")
	 *     .text("button", "hidden")
	 *     .text("button", "pass");
	 * ```
	 */
	public filter(fn?: ButtonsIterator<T>) {
		this.wrapOptions.filter = fn;

		this.appliedFilter = fn;

		return this;
	}

	/**
	 * An array with the number of columns per row. Allows you to set a "template"
	 * @example
	 * ```ts
	 * new InlineKeyboard()
	 *     .pattern([1, 3, 2])
	 *     .text("1", "payload")
	 *     .text("2", "payload")
	 *     .text("2", "payload")
	 *     .text("2", "payload")
	 *     .text("3", "payload")
	 *     .text("3", "payload");
	 * ```
	 */
	public pattern(pattern?: number[]) {
		this.wrapOptions.pattern = pattern;

		if (pattern) this.appliedHelper = { type: "pattern", pattern };
		else this.appliedHelper = undefined;

		return this;
	}

	/**
	 * Allows you to add multiple buttons in raw format.
	 * @example
	 * ```ts
	 * const labels = ["some", "buttons"];
	 *
	 * new InlineKeyboard()
	 *     .add({ text: "raw button", callback_data: "payload" })
	 *     .add(InlineKeyboard.text("raw button by InlineKeyboard.text", "payload"))
	 *     .add(...labels.map((x) => InlineKeyboard.text(x, `${x}payload`)));
	 * ```
	 */
	// TODO: cleanup and refactor
	public add(...buttons: T[]) {
		if (this.featureFlags.enableSetterKeyboardHelpers) {
			const applyFilter = this.appliedFilter
				? (button: T) =>
						this.appliedFilter?.({
							button,
							index: this.currentRow.length - 1,
							row: this.currentRow,
							rowIndex: this.rows.length - 1,
						})
				: undefined;

			if (this.appliedHelper?.type === "columns") {
				for (const button of buttons) {
					if (applyFilter && !applyFilter(button)) continue;
					this.currentRow.push(button);

					if (this.currentRow.length === this.appliedHelper.columns) {
						this.row(false);
					}
				}
			} else if (this.appliedHelper?.type === "wrap") {
				for (const button of buttons) {
					if (applyFilter && !applyFilter(button)) continue;
					this.currentRow.push(button);

					if (
						this.appliedHelper.fn({
							button,
							index: this.currentRow.length - 1,
							row: this.currentRow,
							rowIndex: this.rows.length - 1,
						})
					) {
						this.row(false);
					}
				}
			} else if (this.appliedHelper?.type === "pattern") {
				for (const button of buttons) {
					if (applyFilter && !applyFilter(button)) continue;
					this.currentRow.push(button);

					if (
						this.appliedHelper &&
						this.currentRow.length >= this.appliedHelper.pattern[0]
					) {
						this.row(false);
						this.appliedHelper.pattern.shift();
						if (this.appliedHelper.pattern.length === 0)
							this.appliedHelper = undefined;
					}
				}
			} else {
				if (this.appliedFilter) {
					for (const button of buttons) {
						if (applyFilter && !applyFilter(button)) continue;
						this.currentRow.push(button);
					}
				} else this.currentRow.push(...buttons);
			}
		} else this.currentRow.push(...buttons);

		return this;
	}

	/**
	 * Allows you to dynamically substitute buttons depending on something
	 * @example
	 * ```ts
	 * const labels = ["some", "buttons"];
	 * const isAdmin = true;
	 *
	 * new InlineKeyboard()
	 *     .addIf(1 === 2, { text: "raw button", callback_data: "payload" })
	 *     .addIf(
	 *         isAdmin,
	 *         InlineKeyboard.text("raw button by InlineKeyboard.text", "payload")
	 *     )
	 *     .addIf(
	 *         ({ index, rowIndex }) => rowIndex === index,
	 *         ...labels.map((x) => InlineKeyboard.text(x, `${x}payload`))
	 *     );
	 * ```
	 */

	public addIf(
		condition:
			| ((options: { rowIndex: number; index: number }) => boolean)
			| boolean,
		...buttons: T[]
	) {
		const isShow =
			typeof condition === "boolean"
				? condition
				: condition({
						rowIndex: this.rows.length - 1,
						index: this.currentRow.length - 1,
					});

		if (isShow) this.add(...buttons); // currentRow.push

		return this;
	}

	/**
	 * Allows you to create a button matrix.
	 * @example
	 * ```ts
	 * import { randomInt } from "node:crypto";
	 *
	 * const bomb = [randomInt(0, 9), randomInt(0, 9)] as const;
	 *
	 * new InlineKeyboard().matrix(10, 10, ({ rowIndex, index }) =>
	 *    InlineKeyboard.text(
	 *        rowIndex === bomb[0] && index === bomb[1] ? "💣" : "ㅤ",
	 *        "payload"
	 *    )
	 *);
	 * ```
	 */
	public matrix(rows: number, columns: number, fn: CreateButtonIterator<T>) {
		if (rows < 1 || columns < 1)
			throw new Error("The number of rows and columns must be greater than 0");

		this.row();

		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			this.add(
				//TODO: maybe add row property to iterator?
				...[...new Array(columns)].map((_, index) => fn({ rowIndex, index })),
			);

			this.row();
		}

		return this;
	}
}
