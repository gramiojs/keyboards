import type {
	TelegramInputContactMessageContent,
	TelegramInputInvoiceMessageContent,
	TelegramInputLocationMessageContent,
	TelegramInputTextMessageContent,
	TelegramInputVenueMessageContent,
} from "@gramio/types";

export class InputMessageContent {
	static text(
		text: string,
		options?: Omit<TelegramInputTextMessageContent, "message_text">,
	): TelegramInputTextMessageContent {
		return { message_text: text, ...options };
	}

	static location(
		latitude: number,
		longitude: number,
		options?: Omit<
			TelegramInputLocationMessageContent,
			"latitude" | "longitude"
		>,
	): TelegramInputLocationMessageContent {
		return { latitude, longitude, ...options };
	}

	static venue(
		options: TelegramInputVenueMessageContent,
	): TelegramInputLocationMessageContent {
		return options;
	}

	static contact(
		phoneNumber: string,
		firstName: string,
		options?: Omit<
			TelegramInputContactMessageContent,
			"phone_number" | "first_name"
		>,
	): TelegramInputContactMessageContent {
		return { phone_number: phoneNumber, first_name: firstName, ...options };
	}

	static invoice(
		options: TelegramInputInvoiceMessageContent,
	): TelegramInputInvoiceMessageContent {
		return options;
	}
}
