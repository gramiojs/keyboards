function chunk<T>(array: T[][], size: number) {
	const flatArray = array.flat();
	const chunk = [];

	for (let i = 0; i < flatArray.length; i += size) {
		chunk.push(flatArray.slice(i, i + size));
	}

	return chunk;
}

export class BaseKeyboardConstructor<T> {
	protected rows: T[][] = [];
	protected currentRow: T[] = [];

	private wrapOptions = {
		columns: undefined as number | undefined,
	};

	protected get keyboard() {
		let keyboard = this.currentRow.length
			? [...this.rows, this.currentRow]
			: this.rows;

		if (this.wrapOptions.columns)
			keyboard = chunk(keyboard, this.wrapOptions.columns);

		return keyboard;
	}

	public row() {
		if (!this.currentRow.length) return this;

		this.rows.push(this.currentRow);
		this.currentRow = [];

		return this;
	}

	public wrap({ columns }: { columns: number }) {
		this.wrapOptions.columns = columns;

		return this;
	}

	protected addButton(button: T) {
		this.currentRow.push(button);
	}
}
