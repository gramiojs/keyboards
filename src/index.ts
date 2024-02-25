// INFO: Temp polyfill, more info https://github.com/microsoft/TypeScript/issues/55453#issuecomment-1687496648
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export * from "./keyboard";
export * from "./inline-keyboard";
export * from "./remove-keyboard";
export * from "./force-reply-keyboard";
export * from "./base-keyboard-constructor";
