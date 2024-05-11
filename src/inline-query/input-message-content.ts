import type {
	TelegramInputContactMessageContent,
	TelegramInputInvoiceMessageContent,
	TelegramInputLocationMessageContent,
	TelegramInputTextMessageContent,
	TelegramInputVenueMessageContent,
} from "@gramio/types";

/**
 * This object represents the content of a message to be sent as a result of an inline query.
 *
 * @example
 * ```typescript
 * bot.api.answerInlineQuery({
 * 	inline_query_id: context.id,
 * 	results: [
 * 		InlineQueryResult.article(
 * 			"id-1",
 * 			"some article",
 * 			InputMessageContent.text("my article"),
 * 		),
 * 	],
 * });
 * ```
 *
 * [Documentation](https://core.telegram.org/bots/api/#inputmessagecontent)
 */
export class InputMessageContent {
	/**
	 * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a text message to be sent as the result of an inline query.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inputtextmessagecontent)
	 */
	static text(
		text: string,
		options?: Omit<TelegramInputTextMessageContent, "message_text">,
	): TelegramInputTextMessageContent {
		return { message_text: text, ...options };
	}

	/**
	 * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a location message to be sent as the result of an inline query.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inputlocationmessagecontent)
	 */
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

	/**
	 * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a venue message to be sent as the result of an inline query.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inputvenuemessagecontent)
	 */
	static venue(
		options: TelegramInputVenueMessageContent,
	): TelegramInputLocationMessageContent {
		return options;
	}

	/**
	 * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a contact message to be sent as the result of an inline query.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inputcontactmessagecontent)
	 */
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

	/**
	 * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of an invoice message to be sent as the result of an inline query.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inputinvoicemessagecontent)
	 */
	static invoice(
		options: TelegramInputInvoiceMessageContent,
	): TelegramInputInvoiceMessageContent {
		return options;
	}
}
