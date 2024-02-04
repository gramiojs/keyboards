import {
	TelegramCallbackGame,
	TelegramInlineKeyboardButton,
	TelegramInlineKeyboardMarkup,
	TelegramLoginUrl,
	TelegramSwitchInlineQueryChosenChat,
} from "@gramio/types";
import { Inspectable } from "inspectable";
import { BaseKeyboardConstructor } from "./base-keyboard-constructor";

/**
 * **InlineKeyboardMarkup** builder
 *
 * This object represents an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards) that appears right next to the message it belongs to.
 *
 * {@link https://core.telegram.org/bots/api/#inlinekeyboardmarkup | [Documentation]}
 */
@Inspectable<InlineKeyboard>({
	serialize: (keyboard) => keyboard.toJSON(),
})
export class InlineKeyboard extends BaseKeyboardConstructor<TelegramInlineKeyboardButton> {
	/**
	 * Text button with data to be sent in a [callback query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button is pressed, 1-64 bytes
	 */
	text(text: string, payload?: string | Record<string, unknown>) {
		return this.add(InlineKeyboard.text(text, payload));
	}

	/**
	 * Text button with data to be sent in a [callback query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button is pressed, 1-64 bytes
	 */
	static text(
		text: string,
		payload?: string | Record<string, unknown>,
	): TelegramInlineKeyboardButton {
		return {
			text,
			callback_data:
				typeof payload === "object" ? JSON.stringify(payload) : payload,
		};
	}

	/**
	 * HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings.
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
	 * **NOTE:** TelegramCallbackGame is empty and keyboard is not working yet
	 *
	 * Description of the game that will be launched when the user presses the button.
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row.
	 */
	game(text: string, gameOptions: TelegramCallbackGame = {}) {
		if (this.rows.length || this.currentRow.length)
			throw new Error(
				"This type of button must always be the first button in the first row.",
			);

		return this.add(InlineKeyboard.game(text, gameOptions));
	}

	/**
	 * **NOTE:** TelegramCallbackGame is empty and keyboard is not working yet
	 *
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

	/**
	 * Return {@link TelegramInlineKeyboardMarkup} as JSON
	 */
	toJSON(): {
		//![INFO] Some hack for solve grammy union type problem
		//TODO: maybe find better way?
		inline_keyboard: (TelegramInlineKeyboardButton & { pay: boolean })[][];
	} {
		return {
			inline_keyboard: this.keyboard as (TelegramInlineKeyboardButton & {
				pay: boolean;
			})[][],
		};
	}
}
