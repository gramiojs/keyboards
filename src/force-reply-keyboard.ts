import { TelegramForceReply } from "@gramio/types";
import { Inspectable } from "inspectable";

/**
 * **ForceReply** builder
 *
 * Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice [privacy mode](https://core.telegram.org/bots/features#privacy-mode).
 *
 * {@link https://core.telegram.org/bots/api/#forcereply | [Documentation]}
 */
@Inspectable<ForceReplyKeyboard>({
	serialize: (keyboard) => keyboard.toJSON(),
})
export class ForceReplyKeyboard {
	options = {
		isSelective: false,
		placeholder: undefined as string | undefined,
	};

	/**
	 * Use this parameter if you want to force reply from specific users only. Targets: 1) users that are \@mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.
	 */
	selective(isEnabled = true) {
		this.options.isSelective = isEnabled;

		return this;
	}

	/**
	 * The placeholder to be shown in the input field when the reply is active; 1-64 characters
	 */
	placeholder(value: string) {
		this.options.placeholder = value;

		return this;
	}

	/**
	 * Return {@link TelegramForceReply} as JSON
	 */
	toJSON(): TelegramForceReply {
		return {
			force_reply: true,
			selective: this.options.isSelective,
			input_field_placeholder: this.options.placeholder,
		};
	}
}
