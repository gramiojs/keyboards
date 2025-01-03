import type {
	TelegramKeyboardButton,
	TelegramKeyboardButtonPollType,
	TelegramKeyboardButtonRequestChat,
	TelegramKeyboardButtonRequestUsers,
	TelegramReplyKeyboardMarkup,
} from "@gramio/types";
import { BaseKeyboardConstructor } from "./base-keyboard-constructor.js";

/**
 * **ReplyKeyboardMarkup** builder
 *
 * This object represents a [custom keyboard](https://core.telegram.org/bots/features#keyboards) with reply options (see [Introduction to bots](https://core.telegram.org/bots/features#keyboards) for details and examples).
 *
 * {@link https://core.telegram.org/bots/api/#replykeyboardmarkup | [Documentation]}
 */
export class Keyboard extends BaseKeyboardConstructor<TelegramKeyboardButton> {
	options = {
		isOneTime: false,
		isPersistent: false,
		isResized: true,
		isSelective: false,
		placeholder: undefined as string | undefined,
	};

	/**
	 * Text of the button. It will be sent as a message when the button is pressed
	 * @example
	 * ```ts
	 * new Keyboard().text("some button text");
	 * ```
	 */
	text(text: string) {
		return this.add(Keyboard.text(text));
	}

	/**
	 * Text of the button. It will be sent as a message when the button is pressed
	 */
	static text(text: string): TelegramKeyboardButton {
		return { text };
	}

	/**
	 * If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “users\_shared” service message. Available in private chats only.
	 * @example
	 * ```ts
	 * new Keyboard().requestUsers("some button text", 228, {
	 *     user_is_premium: true,
	 * });
	 * ```
	 */
	requestUsers(
		text: string,
		requestId: number,
		options: Omit<TelegramKeyboardButtonRequestUsers, "request_id"> = {},
	) {
		return this.add(Keyboard.requestUsers(text, requestId, options));
	}

	/**
	 * If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “users\_shared” service message. Available in private chats only.
	 */
	static requestUsers(
		text: string,
		requestId: number,
		options: Omit<TelegramKeyboardButtonRequestUsers, "request_id"> = {},
	): TelegramKeyboardButton {
		return {
			text,
			request_users: {
				...options,
				request_id: requestId,
			},
		};
	}

	/**
	 * If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat\_shared” service message. Available in private chats only.
	 * @example
	 * ```ts
	 * new Keyboard().requestChat("gramio", 255, {
	 *     chat_is_forum: true,
	 * });
	 * ```
	 */
	requestChat(
		text: string,
		requestId: number,
		options?: Omit<
			TelegramKeyboardButtonRequestChat,
			"request_id" | "chat_is_channel"
		> & { chat_is_channel?: boolean },
	) {
		return this.add(Keyboard.requestChat(text, requestId, options));
	}

	/**
	 * If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat\_shared” service message. Available in private chats only.
	 */
	static requestChat(
		text: string,
		requestId: number,
		options?: Omit<
			TelegramKeyboardButtonRequestChat,
			"request_id" | "chat_is_channel"
		> & { chat_is_channel?: boolean },
	): TelegramKeyboardButton {
		return {
			text,
			request_chat: {
				// [INFO] Why not false by default?
				chat_is_channel: false,
				...options,
				request_id: requestId,
			},
		};
	}

	/**
	 * If *True*, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only.
	 * @example
	 * ```ts
	 * new Keyboard().requestContact("some button text");
	 * ```
	 */
	requestContact(text: string) {
		return this.add(Keyboard.requestContact(text));
	}

	/**
	 * If *True*, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only.
	 */
	static requestContact(text: string): TelegramKeyboardButton {
		return {
			text,
			request_contact: true,
		};
	}

	/**
	 * If *True*, the user's current location will be sent when the button is pressed. Available in private chats only.
	 * @example
	 * ```ts
	 * new Keyboard().requestLocation("some button text");
	 * ```
	 */
	requestLocation(text: string) {
		return this.add(Keyboard.requestLocation(text));
	}

	/**
	 * If *True*, the user's current location will be sent when the button is pressed. Available in private chats only.
	 */
	static requestLocation(text: string): TelegramKeyboardButton {
		return {
			text,
			request_location: true,
		};
	}

	/**
	 * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only.
	 *
	 * If *quiz* is passed, the user will be allowed to create only polls in the quiz mode. If *regular* is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type.
	 * @example
	 * ```ts
	 * new Keyboard().requestPoll("some button text", "quiz");
	 * ```
	 */
	requestPoll(text: string, type?: TelegramKeyboardButtonPollType["type"]) {
		return this.add(Keyboard.requestPoll(text, type));
	}

	/**
	 * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only.
	 *
	 * If *quiz* is passed, the user will be allowed to create only polls in the quiz mode. If *regular* is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type.
	 */
	static requestPoll(
		text: string,
		type?: TelegramKeyboardButtonPollType["type"],
	): TelegramKeyboardButton {
		return {
			text,
			request_poll: {
				type,
			},
		};
	}

	/**
	 * If specified, the described [Web App](https://core.telegram.org/bots/webapps) will be launched when the button is pressed. The Web App will be able to send a “web\_app\_data” service message. Available in private chats only.
	 * @example
	 * ```ts
	 * new Keyboard().webApp("some button text", "https://...");
	 * ```
	 */
	webApp(text: string, url: string) {
		return this.add(Keyboard.webApp(text, url));
	}

	/**
	 * If specified, the described [Web App](https://core.telegram.org/bots/webapps) will be launched when the button is pressed. The Web App will be able to send a “web\_app\_data” service message. Available in private chats only.
	 */
	static webApp(text: string, url: string): TelegramKeyboardButton {
		return {
			text,
			web_app: {
				url,
			},
		};
	}

	/**
	 * Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to *false*.
	 * @example
	 * ```ts
	 * new Keyboard().text("some text").oneTime(); // to enable
	 * new Keyboard().text("some text").oneTime(false); // to disable
	 * ```
	 */
	oneTime(isEnabled = true) {
		this.options.isOneTime = isEnabled;

		return this;
	}

	/**
	 * Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to *false*, in which case the custom keyboard can be hidden and opened with a keyboard icon.
	 * @example
	 * ```ts
	 * new Keyboard().text("some text").persistent(); // to enable
	 * new Keyboard().text("some text").persistent(false); // to disable
	 * ```
	 */
	persistent(isEnabled = true) {
		this.options.isPersistent = isEnabled;

		return this;
	}

	/**
	 * The placeholder to be shown in the input field when the keyboard is active; 1-64 characters
	 * @example
	 * ```ts
	 * new Keyboard().text("some text").placeholder("some text"); // to enable
	 * new Keyboard().text("some text").placeholder(); // to disable
	 * ```
	 */
	placeholder(value?: string) {
		this.options.placeholder = value;

		return this;
	}

	/**
	 * !**Note** Keyboard is resized by default! For disable it you can use `.resized(false)`
	 *
	 * Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to *false*, in which case the custom keyboard is always of the same height as the app's standard keyboard.
	 * @example
	 * ```ts
	 * new Keyboard().text("some text").resized(); // to enable
	 * new Keyboard().text("some text").resized(false); // to disable
	 * ```
	 */
	resized(isEnabled = true) {
		this.options.isResized = isEnabled;

		return this;
	}

	/**
	 * Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are \@mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 *
	 * *Example:* A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard.
	 * @example
	 * ```ts
	 * new Keyboard().text("some text").selective(); // to enable
	 * new Keyboard().text("some text").selective(false); // to disable
	 * ```
	 */
	selective(isEnabled = true) {
		this.options.isSelective = isEnabled;

		return this;
	}

	/**
	 * Allows you to combine keyboards. Only keyboards are combined. You need to call the `.row()` method to line-break after combine.
	 *
	 * @example
	 * ```ts
	 * new Keyboard()
	 * 			.combine(new Keyboard().text("first"))
	 * 			.row()
	 * 			.combine(new Keyboard().text("second").row().text("third"))
	 * ```
	 */
	combine(
		keyboard:
			| TelegramKeyboardButton[][]
			| TelegramReplyKeyboardMarkup
			| { toJSON: () => TelegramReplyKeyboardMarkup },
	) {
		const json = "toJSON" in keyboard ? keyboard.toJSON() : keyboard;

		const buttons = Array.isArray(json) ? json : json.keyboard;

		for (const row of buttons) {
			if (row.length) this.row().add(...row);
		}

		return this;
	}

	/**
	 * Return {@link TelegramReplyKeyboardMarkup} as object
	 */
	build() {
		return this.toJSON();
	}

	/**
	 * Serializing a class into an {@link TelegramReplyKeyboardMarkup} object (used by JSON.stringify)
	 */
	toJSON(): TelegramReplyKeyboardMarkup {
		return {
			keyboard: this.keyboard,
			one_time_keyboard: this.options.isOneTime,
			is_persistent: this.options.isPersistent,
			input_field_placeholder: this.options.placeholder,
			selective: this.options.isSelective,
			resize_keyboard: this.options.isResized,
		};
	}
}
