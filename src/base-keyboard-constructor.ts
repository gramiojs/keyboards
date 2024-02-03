function chunk<T>(array: T[][], size: number) {
	const flatArray = array.flat();
	const chunks = [];

	for (let i = 0; i < flatArray.length; i += size) {
		chunks.push(flatArray.slice(i, i + size));
	}

	return chunks;
}

function customWrap<T>(
	array: T[][],
	fn: (options: {
		button: T;
		index: number;
		row: T[];
		rowIndex: number;
	}) => boolean,
) {
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

export class BaseKeyboardConstructor<T> {
	protected rows: T[][] = [];
	protected currentRow: T[] = [];

	private wrapOptions = {
		columns: undefined as number | undefined,
		fn: undefined as Parameters<typeof customWrap<T>>[1] | undefined,
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

		return keyboard;
	}

	public row() {
		if (!this.currentRow.length) return this;

		this.rows.push(this.currentRow);
		this.currentRow = [];

		return this;
	}

	public columns(length?: number) {
		this.wrapOptions.columns = length;

		return this;
	}

	public wrap(fn?: Parameters<typeof customWrap<T>>[1]) {
		this.wrapOptions.fn = fn;

		return this;
	}

	public pattern(pattern?: number[]) {
		this.wrapOptions.pattern = pattern;

		return this;
	}

	add(...buttons: T[]) {
		this.currentRow.push(...buttons);

		return this;
	}
}
