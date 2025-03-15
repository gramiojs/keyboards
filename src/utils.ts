export interface KeyboardFeatureFlags {
	enableSetterKeyboardHelpers: boolean;
}

export const keyboardsFeatureFlagsMap: KeyboardFeatureFlags = {
	enableSetterKeyboardHelpers:
		process.env.GRAMIO_KEYBOARDS_HELPERS_SETTER === "true",
};

export type ButtonsIterator<T> = (options: {
	button: T;
	index: number;
	row: T[];
	rowIndex: number;
}) => boolean;

export type CreateButtonIterator<T> = (options: {
	index: number;
	rowIndex: number;
}) => T;

export interface KeyboardHelperColumns {
	type: "columns";
	columns: number;
}

export interface KeyboardHelperWrap<T> {
	type: "wrap";
	fn: ButtonsIterator<T>;
}

export interface KeyboardHelperFilter<T> {
	type: "filter";
	fn: ButtonsIterator<T>;
}

export interface KeyboardHelperPattern {
	type: "pattern";
	pattern: number[];
}

export type KeyboardHelpers<T> =
	| KeyboardHelperColumns
	| KeyboardHelperWrap<T>
	| KeyboardHelperFilter<T>
	| KeyboardHelperPattern;

export function chunk<T>(array: T[][], size: number) {
	const flatArray = array.flat();
	const chunks = [];

	for (let i = 0; i < flatArray.length; i += size) {
		chunks.push(flatArray.slice(i, i + size));
	}

	return chunks;
}

export function customWrap<T>(array: T[][], fn: ButtonsIterator<T>) {
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

export function pattern<T>(array: T[][], pattern: number[]) {
	return customWrap(
		array,
		({ row, rowIndex }) => row.length === pattern[rowIndex],
	);
}

export function filter<T>(array: T[][], fn: ButtonsIterator<T>) {
	const chunks = [];

	for (const [rowIndex, row] of array.entries()) {
		const filtered = row.filter((button, index) =>
			fn({ button, index, row, rowIndex }),
		);

		if (filtered.length) chunks.push(filtered);
	}

	return chunks;
}
