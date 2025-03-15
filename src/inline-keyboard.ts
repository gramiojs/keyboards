import type {
	TelegramCallbackGame,
	TelegramCopyTextButton,
	TelegramInlineKeyboardButton,
	TelegramInlineKeyboardMarkup,
	TelegramLoginUrl,
	TelegramSwitchInlineQueryChosenChat,
	TelegramWebAppInfo,
} from "@gramio/types";
import { BaseKeyboardConstructor } from "./base-keyboard-constructor.ts";

// types compatibility layer with https://github.com/grammyjs/types/blob/fbbb7c54c0b67cd9e168d5584b0e993d05db3fe3/markup.ts#L10
declare namespace InlineKeyboardButton {
	interface AbstractInlineKeyboardButton {
		text: string;
	}
	export interface UrlButton extends AbstractInlineKeyboardButton {
		url: string;
	}
	export interface CallbackButton extends AbstractInlineKeyboardButton {
		callback_data: string;
	}
	export interface WebAppButton extends AbstractInlineKeyboardButton {
		web_app: TelegramWebAppInfo;
	}
	export interface LoginButton extends AbstractInlineKeyboardButton {
		login_url: TelegramLoginUrl;
	}
	export interface SwitchInlineButton extends AbstractInlineKeyboardButton {
		switch_inline_query: string;
	}
	export interface SwitchInlineCurrentChatButton
		extends AbstractInlineKeyboardButton {
		switch_inline_query_current_chat: string;
	}
	export interface SwitchInlineChosenChatButton
		extends AbstractInlineKeyboardButton {
		switch_inline_query_chosen_chat: TelegramSwitchInlineQueryChosenChat;
	}
	export interface GameButton extends AbstractInlineKeyboardButton {
		callback_game: TelegramCallbackGame;
	}
	export interface PayButton extends AbstractInlineKeyboardButton {
		pay: boolean;
	}
	export interface CopyTextButtonButton extends AbstractInlineKeyboardButton {
		/** Description of the button that copies the specified text to the clipboard. */
		copy_text: TelegramCopyTextButton;
	}
}
interface TelegramInlineKeyboardMarkupFix {
	//![INFO] Some hack for solve union type problem with grammy
	//TODO: maybe find better way?
	inline_keyboard: (
		| TelegramInlineKeyboardButton
		| InlineKeyboardButton.CallbackButton
		| InlineKeyboardButton.GameButton
		| InlineKeyboardButton.LoginButton
		| InlineKeyboardButton.PayButton
		| InlineKeyboardButton.SwitchInlineButton
		| InlineKeyboardButton.SwitchInlineCurrentChatButton
		| InlineKeyboardButton.SwitchInlineChosenChatButton
		| InlineKeyboardButton.CopyTextButtonButton
		| InlineKeyboardButton.UrlButton
		| InlineKeyboardButton.WebAppButton
	)[][];
}

/**
 * **InlineKeyboardMarkup** builder
 *
 * This object represents an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards) that appears right next to the message it belongs to.
 *
 * {@link https://core.telegram.org/bots/api/#inlinekeyboardmarkup | [Documentation]}
 */
export class InlineKeyboard extends BaseKeyboardConstructor<TelegramInlineKeyboardButton> {
	/**
	 * Text button with data to be sent in a [callback query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button is pressed, 1-64 bytes
	 * @example
	 * ```ts
	 * new InlineKeyboard().text("some text", "payload");
	 * // or
	 * new InlineKeyboard().text("some text", {
	 *     json: "payload",
	 * }); // it uses JSON.stringify
	 * ```
	 */
	text(text: string, payload: string | Record<string, unknown>) {
		return this.add(InlineKeyboard.text(text, payload));
	}

	/**
	 * Text button with data to be sent in a [callback query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button is pressed, 1-64 bytes
	 */
	static text(
		text: string,
		payload: string | Record<string, unknown>,
	): TelegramInlineKeyboardButton {
		return {
			text,
			callback_data:
				typeof payload === "object" ? JSON.stringify(payload) : payload,
		};
	}

	/**
	 * HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings.
	 * @example
	 * ```ts
	 * new InlineKeyboard().url("GitHub", "https://github.com/gramiojs/gramio");
	 * ```
	 */
	url(text: string, url: string) {
		return this.add(InlineKeyboard.url(text, url));
	}

	/**
	 * HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings.
	 */
	static url(text: string, url: string): TelegramInlineKeyboardButton {
		return {
			text,
			url,
		};
	}

	/**
	 *  Description of the [Web App](https://core.telegram.org/bots/webapps) that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method [answerWebAppQuery](https://core.telegram.org/bots/api/#answerwebappquery). Available only in private chats between a user and the bot.
	 * @example
	 * ```ts
	 * new InlineKeyboard().webApp("some text", "https://...");
	 * ```
	 */
	webApp(text: string, url: string) {
		return this.add(InlineKeyboard.webApp(text, url));
	}

	/**
	 *  Description of the [Web App](https://core.telegram.org/bots/webapps) that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method [answerWebAppQuery](https://core.telegram.org/bots/api/#answerwebappquery). Available only in private chats between a user and the bot.
	 */
	static webApp(text: string, url: string): TelegramInlineKeyboardButton {
		return {
			text,
			web_app: { url },
		};
	}

	/**
	 * An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the [Telegram Login Widget](https://core.telegram.org/widgets/login).
	 * @example
	 * ```ts
	 * new InlineKeyboard().login("some text", "https://...");
	 * // or
	 * new InlineKeyboard().login("some text", {
	 *    url: "https://...",
	 *    request_write_access: true,
	 *});
	 * ```
	 */
	login(text: string, url: string | TelegramLoginUrl) {
		return this.add(InlineKeyboard.login(text, url));
	}

	/**
	 * An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the [Telegram Login Widget](https://core.telegram.org/widgets/login).
	 */
	static login(
		text: string,
		url: string | TelegramLoginUrl,
	): TelegramInlineKeyboardButton {
		return {
			text,
			login_url: typeof url === "string" ? { url } : url,
		};
	}

	/**
	 * Send a [Pay button](https://core.telegram.org/bots/api/#payments).
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row and can only be used in invoice messages.
	 * @example
	 * ```ts
	 * new InlineKeyboard().pay("5 coins");
	 * ```
	 */
	pay(text: string) {
		if (this.rows.length || this.currentRow.length)
			throw new Error(
				"This type of button must always be the first button in the first row and can only be used in invoice messages.",
			);

		return this.add(InlineKeyboard.pay(text));
	}

	/**
	 * Send a [Pay button](https://core.telegram.org/bots/api/#payments).
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row and can only be used in invoice messages.
	 */
	static pay(text: string): TelegramInlineKeyboardButton {
		return {
			text,
			pay: true,
		};
	}

	/**
	 * Pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field.
	 *
	 * By default empty, in which case just the bot's username will be inserted.
	 * @example
	 * ```ts
	 * new InlineKeyboard().switchToChat("Select chat");
	 * // or
	 * new InlineKeyboard().switchToChat("Select chat", "InlineQuery");
	 * ```
	 */
	switchToChat(text: string, query = "") {
		return this.add(InlineKeyboard.switchToChat(text, query));
	}

	/**
	 * If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field.
	 *
	 * By default empty, in which case just the bot's username will be inserted.
	 */
	static switchToChat(text: string, query = ""): TelegramInlineKeyboardButton {
		return {
			text,
			switch_inline_query: query,
		};
	}

	/**
	 * Pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field
	 * @example
	 * ```ts
	 * new InlineKeyboard().switchToChosenChat("Select chat");
	 * // or
	 * new InlineKeyboard().switchToChosenChat("Select chat", "InlineQuery");
	 * // or
	 * new InlineKeyboard().switchToChosenChat("Select chat", {
	 *     query: "InlineQuery",
	 *     allow_channel_chats: true,
	 *     allow_group_chats: true,
	 *     allow_bot_chats: true,
	 *     allow_user_chats: true,
	 * });
	 * ```
	 */
	switchToChosenChat(
		text: string,
		query: string | TelegramSwitchInlineQueryChosenChat = "",
	) {
		return this.add(InlineKeyboard.switchToChosenChat(text, query));
	}

	/**
	 * Pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field
	 */
	static switchToChosenChat(
		text: string,
		query: string | TelegramSwitchInlineQueryChosenChat = "",
	): TelegramInlineKeyboardButton {
		return {
			text,
			switch_inline_query_chosen_chat:
				typeof query === "string" ? { query } : query,
		};
	}

	/**
	 * Pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.
	 *
	 * This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options.
	 * @example
	 * ```ts
	 * new InlineKeyboard().switchToChosenChat("Open Inline mod");
	 * // or
	 * new InlineKeyboard().switchToChosenChat("Open Inline mod", "InlineQuery");
	 * ```
	 */
	switchToCurrentChat(text: string, query = "") {
		return this.add(InlineKeyboard.switchToCurrentChat(text, query));
	}

	/**
	 * Pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.
	 *
	 * This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options.
	 */
	static switchToCurrentChat(
		text: string,
		query = "",
	): TelegramInlineKeyboardButton {
		return { text, switch_inline_query_current_chat: query };
	}

	/**
	 * Description of the game that will be launched when the user presses the button.
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row.
	 * @example
	 * ```ts
	 * new InlineKeyboard().game("text", ???);
	 * ```
	 */
	game(text: string, gameOptions: TelegramCallbackGame = {}) {
		if (this.rows.length || this.currentRow.length)
			throw new Error(
				"This type of button must always be the first button in the first row.",
			);

		return this.add(InlineKeyboard.game(text, gameOptions));
	}

	/**
	 * Description of the game that will be launched when the user presses the button.
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row.
	 */
	static game(
		text: string,
		gameOptions: TelegramCallbackGame = {},
	): TelegramInlineKeyboardButton {
		return {
			text,
			callback_game: gameOptions,
		};
	}

	copy(text: string, textToCopy: string | TelegramCopyTextButton) {
		return this.add(InlineKeyboard.copy(text, textToCopy));
	}

	static copy(
		text: string,
		textToCopy: string | TelegramCopyTextButton,
	): TelegramInlineKeyboardButton {
		return {
			text,
			copy_text:
				typeof textToCopy === "string" ? { text: textToCopy } : textToCopy,
		};
	}

	/**
	 * Allows you to combine keyboards. Only keyboards are combined. You need to call the `.row()` method to line-break after combine.
	 *
	 * @example
	 * ```ts
	 * new InlineKeyboard()
	 * 			.combine(new InlineKeyboard().text("some", "payload"))
	 * 			.row()
	 * 			.combine(
	 * 				new InlineKeyboard()
	 * 					.text("test", "payload")
	 * 					.row()
	 * 					.text("second row???", "payload"),
	 * 			)
	 * ```
	 */
	combine(
		keyboard:
			| TelegramInlineKeyboardButton[][]
			| TelegramInlineKeyboardMarkup
			| { toJSON: () => TelegramInlineKeyboardMarkup },
	) {
		const json = "toJSON" in keyboard ? keyboard.toJSON() : keyboard;

		const buttons = Array.isArray(json) ? json : json.inline_keyboard;

		for (const row of buttons) {
			this.row().add(...row);
		}

		return this;
	}

	/**
	 * Return {@link TelegramInlineKeyboardMarkup} as JSON
	 */
	build() {
		return this.toJSON();
	}

	/**
	 * Serializing a class into an {@link TelegramInlineKeyboardMarkupFix} object (used by JSON.stringify)
	 */
	toJSON(): TelegramInlineKeyboardMarkupFix {
		return {
			inline_keyboard: this
				.keyboard as TelegramInlineKeyboardMarkupFix["inline_keyboard"],
		};
	}
}
