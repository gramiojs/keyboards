export class BaseKeyboardConstructor<T> {
	protected rows: T[][] = [];
	protected currentRow: T[] = [];

	protected get keyboard() {
		return [...this.rows, this.currentRow];
	}

	public row() {
		if (!this.rows.length || !this.currentRow.length) return this;

		this.rows.push(this.currentRow);
		this.currentRow = [];

		return this;
	}

	protected addButton(button: T) {
		this.currentRow.push(button);
	}
}
