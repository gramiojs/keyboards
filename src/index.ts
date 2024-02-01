import type {
	TelegramKeyboardButton,
	TelegramKeyboardButtonPollType,
	TelegramKeyboardButtonRequestChat,
	TelegramKeyboardButtonRequestUsers,
	TelegramReplyKeyboardMarkup,
} from "@gramio/types";
import { Inspectable } from "inspectable";
import "reflect-metadata";

@Inspectable<Keyboard>({
	serialize: (keyboard) => keyboard.toJSON(),
})
export class Keyboard {
	private rows: TelegramKeyboardButton[][] = [];

	private currentRow: TelegramKeyboardButton[] = [];

	isOneTime = false;
	isPersistent = false;
	isResized = false;
	placeholderValue: string | undefined = undefined;

	text(text: string) {
		this.addButton({ text });

		return this;
	}

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

	requestContact(text: string) {
		this.addButton({
			text,
			request_contact: true,
		});

		return this;
	}

	requestLocation(text: string) {
		this.addButton({
			text,
			request_location: true,
		});

		return this;
	}

	requestPoll(text: string, type?: TelegramKeyboardButtonPollType["type"]) {
		this.addButton({
			text,
			request_poll: {
				type,
			},
		});

		return this;
	}

	webApp(text: string, url: string) {
		this.addButton({
			text,
			web_app: {
				url,
			},
		});

		return this;
	}

	oneTime(isEnabled = true) {
		this.isOneTime = isEnabled;

		return this;
	}

	persistent(isEnabled = true) {
		this.isPersistent = isEnabled;

		return this;
	}

	placeholder(value?: string) {
		this.placeholderValue = value;

		return this;
	}

	resized(isEnabled = true) {
		this.isResized = isEnabled;

		return this;
	}

	private addButton(button: TelegramKeyboardButton) {
		this.currentRow.push(button);
	}

	private toJSON(): TelegramReplyKeyboardMarkup {
		return {
			keyboard: this.rows.concat(this.currentRow),
			one_time_keyboard: this.isOneTime,
			is_persistent: this.isPersistent,
			input_field_placeholder: this.placeholderValue,
			resize_keyboard: this.isResized,
		};
	}
}
