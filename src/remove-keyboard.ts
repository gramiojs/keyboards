import { TelegramReplyKeyboardRemove } from "@gramio/types";
import { Inspectable } from "inspectable";

/**
 * **ReplyKeyboardRemove** builder
 *
 * {@link https://core.telegram.org/bots/api/#replykeyboardremove | [Documentation]}
 */
@Inspectable<RemoveKeyboard>({
	serialize: (keyboard) => keyboard.toJSON(),
})
export class RemoveKeyboard {
	options = {
		isSelective: false,
	};

	/**
	 * Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are \@mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 *
	 * *Example:* A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.
	 */
	selective(isEnabled = true) {
		this.options.isSelective = isEnabled;
	}

	/**
	 * Return {@link TelegramReplyKeyboardRemove} as JSON
	 */
	toJSON(): TelegramReplyKeyboardRemove {
		return {
			remove_keyboard: true,
			selective: this.options.isSelective,
		};
	}
}
