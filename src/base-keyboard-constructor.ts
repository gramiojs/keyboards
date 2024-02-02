export class BaseKeyboardConstructor<T> {
	protected rows: T[][] = [];
	protected currentRow: T[] = [];

	protected get keyboard() {
		return [...this.rows, this.currentRow];
	}

	protected addButton(button: T) {
		this.currentRow.push(button);
	}
}
