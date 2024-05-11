function chunk<T>(array: T[][], size: number) {
	const flatArray = array.flat();
	const chunks = [];

	for (let i = 0; i < flatArray.length; i += size) {
		chunks.push(flatArray.slice(i, i + size));
	}

	return chunks;
}

type ButtonsIterator<T> = (options: {
	button: T;
	index: number;
	row: T[];
	rowIndex: number;
}) => boolean;

type CreateButtonIterator<T> = (options: {
	index: number;
	rowIndex: number;
}) => T;

function customWrap<T>(array: T[][], fn: ButtonsIterator<T>) {
	const flatArray = array.flat();
	const chunks = [];
	let currentChunk = [];

	for (const [index, button] of flatArray.entries()) {
		if (fn({ button, index, row: currentChunk, rowIndex: chunks.length })) {
			chunks.push(currentChunk);
			currentChunk = [];
		}
		currentChunk.push(button);
	}

	return currentChunk.length ? [...chunks, currentChunk] : chunks;
}

function pattern<T>(array: T[][], pattern: number[]) {
	return customWrap(
		array,
		({ row, rowIndex }) => row.length === pattern[rowIndex],
	);
}

function filter<T>(array: T[][], fn: ButtonsIterator<T>) {
	const chunks = [];

	for (const [rowIndex, row] of array.entries()) {
		const filtered = row.filter((button, index) =>
			fn({ button, index, row, rowIndex }),
		);

		if (filtered.length) chunks.push(filtered);
	}

	return chunks;
}

/** Base-class for construct keyboard with useful helpers */
export class BaseKeyboardConstructor<T> {
	protected rows: T[][] = [];
	protected currentRow: T[] = [];

	private wrapOptions = {
		columns: undefined as number | undefined,
		fn: undefined as ButtonsIterator<T> | undefined,
		filter: undefined as ButtonsIterator<T> | undefined,
		pattern: undefined as number[] | undefined,
	};

	protected get keyboard() {
		let keyboard = this.currentRow.length
			? [...this.rows, this.currentRow]
			: this.rows;

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
	public row() {
		if (!this.currentRow.length) return this;

		this.rows.push(this.currentRow);
		this.currentRow = [];

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
	public add(...buttons: T[]) {
		this.currentRow.push(...buttons);

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

		if (isShow) this.currentRow.push(...buttons);

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
