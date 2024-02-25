import { TelegramReplyKeyboardRemove } from "@gramio/types";

/**
 * **ReplyKeyboardRemove** builder
 *
 * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see [ReplyKeyboardMarkup](https://core.telegram.org/bots/api/#replykeyboardmarkup)).
 *
 * {@link https://core.telegram.org/bots/api/#replykeyboardremove | [Documentation]}
 */
export class RemoveKeyboard {
	options = {
		isSelective: false,
	};

	/**
	 * Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are \@mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 *
	 * *Example:* A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.
	 * @example
	 * ```ts
	 * new RemoveKeyboard().selective(); // to enable
	 * new RemoveKeyboard().selective(false); // to disable
	 * ```
	 */
	selective(isEnabled = true) {
		this.options.isSelective = isEnabled;

		return this;
	}

	/**
	 * Return {@link TelegramReplyKeyboardRemove} as object
	 */
	build() {
		return this.toJSON();
	}

	toJSON(): TelegramReplyKeyboardRemove {
		return {
			remove_keyboard: true,
			selective: this.options.isSelective,
		};
	}
}
