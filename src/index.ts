/**
 * @module
 *
 * Framework-agnostic Telegram bot keyboard (and inline query result) builder with many cool features!
 *
 * @example usage
 * ```ts
 * import { Keyboard } from "@gramio/keyboards";
 *
 * const keyboard = new Keyboard()
 *     .text("first row")
 *     .row()
 *     .text("second row")
 *     .build(); // NOTE: In GramIO, you don't have to use the ".build" method
 * ```
 *
 */

// INFO: Temp polyfill, more info https://github.com/microsoft/TypeScript/issues/55453#issuecomment-1687496648
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export * from "./keyboard.js";
export * from "./inline-keyboard.js";
export * from "./remove-keyboard.js";
export * from "./force-reply-keyboard.js";
export * from "./base-keyboard-constructor.js";
export * from "./inline-query/index.js";
