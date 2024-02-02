import type {
	TelegramKeyboardButton,
	TelegramKeyboardButtonPollType,
	TelegramKeyboardButtonRequestChat,
	TelegramKeyboardButtonRequestUsers,
	TelegramReplyKeyboardMarkup,
} from "@gramio/types";
import { Inspectable } from "inspectable";
import "reflect-metadata";

/**
 * **ReplyKeyboardMarkup** builder
 *
 * {@link https://core.telegram.org/bots/api/#replykeyboardmarkup | [Documentation]}
 */
@Inspectable<Keyboard>({
	serialize: (keyboard) => keyboard.toJSON(),
})
export class Keyboard {
	private rows: TelegramKeyboardButton[][] = [];

	private currentRow: TelegramKeyboardButton[] = [];

	options = {
		isOneTime: false,
		isPersistent: false,
		isResized: false,
		isSelective: false,
		placeholder: undefined as string | undefined,
	};

	/**
	 * Text of the button. It will be sent as a message when the button is pressed
	 */
	text(text: string) {
		this.addButton({ text });

		return this;
	}

	/**
	 * If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “users\_shared” service message. Available in private chats only.
	 */
	requestUsers(
		text: string,
		requestId: number,
		options: Omit<TelegramKeyboardButtonRequestUsers, "request_id">,
	) {
		this.addButton({
			text,
			request_users: {
				...options,
				request_id: requestId,
			},
		});

		return this;
	}

	/**
	 * If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat\_shared” service message. Available in private chats only.
	 */
	requestChat(
		text: string,
		requestId: number,
		options?: Omit<TelegramKeyboardButtonRequestChat, "request_id">,
	) {
		this.addButton({
			text,
			request_chat: {
				// [INFO] Why not false by default?
				chat_is_channel: false,
				...options,
				request_id: requestId,
			},
		});

		return this;
	}

	/**
	 * If *True*, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only.
	 */
	requestContact(text: string) {
		this.addButton({
			text,
			request_contact: true,
		});

		return this;
	}

	/**
	 * If *True*, the user's current location will be sent when the button is pressed. Available in private chats only.
	 */
	requestLocation(text: string) {
		this.addButton({
			text,
			request_location: true,
		});

		return this;
	}

	/**
	 * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only.
	 */
	requestPoll(text: string, type?: TelegramKeyboardButtonPollType["type"]) {
		this.addButton({
			text,
			request_poll: {
				type,
			},
		});

		return this;
	}

	/**
	 * If specified, the described [Web App](https://core.telegram.org/bots/webapps) will be launched when the button is pressed. The Web App will be able to send a “web\_app\_data” service message. Available in private chats only.
	 */
	webApp(text: string, url: string) {
		this.addButton({
			text,
			web_app: {
				url,
			},
		});

		return this;
	}

	/**
	 * Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to *false*.
	 */
	oneTime(isEnabled = true) {
		this.options.isOneTime = isEnabled;

		return this;
	}

	/**
	 * *Optional*. Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to *false*, in which case the custom keyboard can be hidden and opened with a keyboard icon.
	 */
	persistent(isEnabled = true) {
		this.options.isPersistent = isEnabled;

		return this;
	}

	/**
	 * The placeholder to be shown in the input field when the keyboard is active; 1-64 characters
	 */
	placeholder(value?: string) {
		this.options.placeholder = value;

		return this;
	}

	/**
	 * Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to *false*, in which case the custom keyboard is always of the same height as the app's standard keyboard.
	 */
	resized(isEnabled = true) {
		this.options.isResized = isEnabled;

		return this;
	}

	/**
	 * Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are \@mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 *
	 * *Example:* A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard.
	 */
	selective(isEnabled = true) {
		this.options.isSelective = isEnabled;

		return this;
	}

	private addButton(button: TelegramKeyboardButton) {
		this.currentRow.push(button);
	}

	/**
	 * Return {@link TelegramReplyKeyboardMarkup} as JSON
	 */
	toJSON(): TelegramReplyKeyboardMarkup {
		return {
			keyboard: [...this.rows, this.currentRow],
			one_time_keyboard: this.options.isOneTime,
			is_persistent: this.options.isPersistent,
			input_field_placeholder: this.options.placeholder,
			resize_keyboard: this.options.isResized,
		};
	}
}