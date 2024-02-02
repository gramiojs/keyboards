import {
	TelegramCallbackGame,
	TelegramInlineKeyboardButton,
	TelegramInlineKeyboardMarkup,
	TelegramLoginUrl,
	TelegramSwitchInlineQueryChosenChat,
} from "@gramio/types";
import { Inspectable } from "inspectable";

@Inspectable<InlineKeyboard>({
	serialize: (keyboard) => keyboard.toJSON(),
})
export class InlineKeyboard {
	private rows: TelegramInlineKeyboardButton[][] = [];

	private currentRow: TelegramInlineKeyboardButton[] = [];

	/**
	 * Text button with data to be sent in a [callback query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button is pressed, 1-64 bytes
	 */
	text(text: string, payload: Record<string, unknown>) {
		this.addButton({
			text,
			callback_data:
				typeof payload === "object" ? JSON.stringify(payload) : payload,
		});

		return this;
	}

	/**
	 * HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings.
	 */
	url(text: string, url: string) {
		this.addButton({
			text,
			url,
		});

		return this;
	}

	/**
	 *  Description of the [Web App](https://core.telegram.org/bots/webapps) that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method [answerWebAppQuery](https://core.telegram.org/bots/api/#answerwebappquery). Available only in private chats between a user and the bot.
	 */
	webApp(text: string, url: string) {
		this.addButton({
			text,
			web_app: { url },
		});

		return this;
	}

	/**
	 * An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the [Telegram Login Widget](https://core.telegram.org/widgets/login).
	 */
	login(text: string, url: string | TelegramLoginUrl) {
		this.addButton({
			text,
			login_url: typeof url === "string" ? { url } : url,
		});
	}

	/**
	 * Send a [Pay button](https://core.telegram.org/bots/api/#payments).
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row and can only be used in invoice messages.
	 */
	pay(text: string) {
		this.addButton({
			text,
			pay: true,
		});

		return this;
	}

	/**
	 * If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field.
	 *
	 * By default empty, in which case just the bot's username will be inserted.
	 */
	switchToChat(text: string, query = "") {
		this.addButton({
			text,
			switch_inline_query: query,
		});

		return this;
	}

	/**
	 * Pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field
	 */
	switchToChosenChat(
		text: string,
		query: string | TelegramSwitchInlineQueryChosenChat = "",
	) {
		this.addButton({
			text,
			switch_inline_query_chosen_chat:
				typeof query === "string" ? { query } : query,
		});

		return this;
	}

	/**
	 * Pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.
	 *
	 * This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options.
	 */
	switchToCurrentChat(text: string, query = "") {
		this.addButton({ text, switch_inline_query_current_chat: query });

		return this;
	}

	/**
	 * **NOTE:** TelegramCallbackGame is empty and keyboard is not working yet
	 *
	 * Description of the game that will be launched when the user presses the button.
	 *
	 * **NOTE:** This type of button **must** always be the first button in the first row.
	 */
	game(text: string, gameOptions: TelegramCallbackGame = {}) {
		this.addButton({
			text,
			callback_game: gameOptions,
		});
		return this;
	}

	private addButton(button: TelegramInlineKeyboardButton) {
		this.currentRow.push(button);
	}

	/**
	 * Return {@link TelegramInlineKeyboardMarkup} as JSON
	 */
	toJSON(): TelegramInlineKeyboardMarkup {
		return {
			inline_keyboard: this.rows.concat(this.currentRow),
		};
	}
}
