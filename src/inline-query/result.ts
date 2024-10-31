import type {
	TelegramInlineQueryResultArticle,
	TelegramInlineQueryResultAudio,
	TelegramInlineQueryResultContact,
	TelegramInlineQueryResultDocument,
	TelegramInlineQueryResultGame,
	TelegramInlineQueryResultGif,
	TelegramInlineQueryResultLocation,
	TelegramInlineQueryResultMpeg4Gif,
	TelegramInlineQueryResultPhoto,
	TelegramInlineQueryResultVenue,
	TelegramInlineQueryResultVideo,
	TelegramInlineQueryResultVoice,
	TelegramInputMessageContent,
} from "@gramio/types";
import { InlineQueryResultCached } from "./cached-result.js";

/**
 * Result of InlineQuery builder.
 *
 * @example
 * ```ts
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
 * [Documentation](https://core.telegram.org/bots/api#inlinequeryresult)
 */
export class InlineQueryResult {
	/** Cached result of InlineQuery builder. */
	static cached = InlineQueryResultCached;

	/**
	 * Represents a link to an article or web page.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultarticle)
	 */
	static article(
		id: string,
		title: string,
		inputMessageContent: TelegramInputMessageContent,
		options?: Omit<
			TelegramInlineQueryResultArticle,
			"type" | "title" | "id" | "input_message_content"
		>,
	): TelegramInlineQueryResultArticle {
		return {
			type: "article",
			id,
			title,
			input_message_content: inputMessageContent,
			...options,
		};
	}

	/**
	 * Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultaudio)
	 */
	static audio(
		id: string,
		title: string,
		audioUrl: string,
		options?: Omit<
			TelegramInlineQueryResultAudio,
			"type" | "title" | "id" | "audio_url"
		>,
	): TelegramInlineQueryResultAudio {
		return {
			type: "audio",
			id,
			title,
			audio_url: audioUrl,
			...options,
		};
	}

	/**
	 * Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the contact.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcontact)
	 */
	static contact(
		id: string,
		phoneNumber: string,
		firstName: string,
		options?: Omit<
			TelegramInlineQueryResultContact,
			"type" | "phone_number" | "id" | "first_name"
		>,
	): TelegramInlineQueryResultContact {
		return {
			type: "contact",
			id,
			first_name: firstName,
			phone_number: phoneNumber,
			...options,
		};
	}

	/**
	 * Represents a [Game](https://core.telegram.org/bots/api/#games).
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultgame)
	 */
	static game(
		id: string,
		gameShortName: string,
		options?: Omit<
			TelegramInlineQueryResultGame,
			"type" | "game_short_name" | "id"
		>,
	): TelegramInlineQueryResultGame {
		return {
			type: "game",
			id,
			game_short_name: gameShortName,
			...options,
		};
	}

	/**
	 * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultdocument)
	 */
	static documentPdf(
		id: string,
		title: string,
		url: string,
		options?: Omit<
			TelegramInlineQueryResultDocument,
			"type" | "mime_type" | "id" | "title" | "document_url"
		>,
	): TelegramInlineQueryResultDocument {
		return {
			type: "document",
			id,
			title: title,
			document_url: url,
			mime_type: "application/pdf",
			...options,
		};
	}

	/**
	 * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultdocument)
	 */
	static documentZip(
		id: string,
		title: string,
		url: string,
		options?: Omit<
			TelegramInlineQueryResultDocument,
			"type" | "mime_type" | "id" | "title" | "document_url"
		>,
	): TelegramInlineQueryResultDocument {
		return {
			type: "document",
			id,
			title: title,
			document_url: url,
			mime_type: "application/zip",
			...options,
		};
	}

	/**
	 * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultgif)
	 */
	static gif(
		id: string,
		gifUrl: string,
		thumbnailUrl: string,
		options?: Omit<
			TelegramInlineQueryResultGif,
			"type" | "gif_url" | "id" | "thumbnail_url"
		>,
	): TelegramInlineQueryResultGif {
		return {
			type: "gif",
			id,
			gif_url: gifUrl,
			thumbnail_url: thumbnailUrl,
			...options,
		};
	}

	/**
	 * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the location.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultlocation)
	 */
	static location(
		id: string,
		latitude: number,
		longitude: number,
		title: string,
		options?: Omit<
			TelegramInlineQueryResultLocation,
			"type" | "latitude" | "id" | "longitude" | "title"
		>,
	): TelegramInlineQueryResultLocation {
		return {
			type: "location",
			id,
			latitude,
			longitude,
			title,
			...options,
		};
	}

	/**
	 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultmpeg4gif)
	 */
	static mpeg4Gif(
		id: string,
		mpeg4Url: string,
		thumbnailUrl: string,
		options?: Omit<
			TelegramInlineQueryResultMpeg4Gif,
			"type" | "mpeg4_url" | "id" | "thumbnail_url"
		>,
	): TelegramInlineQueryResultMpeg4Gif {
		return {
			type: "mpeg4_gif",
			id,
			mpeg4_url: mpeg4Url,
			thumbnail_url: thumbnailUrl,
			...options,
		};
	}

	/**
	 * Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultphoto)
	 */
	static photo(
		id: string,
		photoUrl: string,
		thumbnailUrl: string,
		options?: Omit<
			TelegramInlineQueryResultPhoto,
			"type" | "photo_url" | "id" | "thumbnail_url"
		>,
	): TelegramInlineQueryResultPhoto {
		return {
			type: "photo",
			id,
			photo_url: photoUrl,
			thumbnail_url: thumbnailUrl,
			...options,
		};
	}

	/**
	 * Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the venue.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultvenue)
	 */
	static venue(
		id: string,
		options: Omit<TelegramInlineQueryResultVenue, "type" | "id">,
	): TelegramInlineQueryResultVenue {
		return { type: "venue", id, ...options };
	}

	/**
	 * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
	 *
	 * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultvideo)
	 */
	static videoHtml(
		id: string,
		title: string,
		videoUrl: string,
		thumbnailUrl: string,
		options?: Omit<
			TelegramInlineQueryResultVideo,
			"type" | "video_url" | "id" | "thumbnail_url" | "mime_type" | "title"
		>,
	): TelegramInlineQueryResultVideo {
		return {
			type: "video",
			id,
			title,
			video_url: videoUrl,
			thumbnail_url: thumbnailUrl,
			mime_type: "text/html",
			...options,
		};
	}

	/**
	 * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
	 *
	 * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultvideo)
	 */
	static videoMp4(
		id: string,
		title: string,
		videoUrl: string,
		thumbnailUrl: string,
		options?: Omit<
			TelegramInlineQueryResultVideo,
			"type" | "video_url" | "id" | "thumbnail_url" | "mime_type" | "title"
		>,
	): TelegramInlineQueryResultVideo {
		return {
			type: "video",
			id,
			title,
			video_url: videoUrl,
			thumbnail_url: thumbnailUrl,
			mime_type: "video/mp4",
			...options,
		};
	}

	/**
	 * Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the the voice message.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultvoice)
	 */
	static voice(
		id: string,
		title: string,
		url: string,
		options?: Omit<
			TelegramInlineQueryResultVoice,
			"type" | "voice_url" | "id" | "title"
		>,
	): TelegramInlineQueryResultVoice {
		return {
			type: "voice",
			id,
			title,
			voice_url: url,
			...options,
		};
	}
}
