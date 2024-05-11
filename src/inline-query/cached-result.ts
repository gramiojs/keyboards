import type {
	TelegramInlineQueryResultCachedAudio,
	TelegramInlineQueryResultCachedDocument,
	TelegramInlineQueryResultCachedGif,
	TelegramInlineQueryResultCachedMpeg4Gif,
	TelegramInlineQueryResultCachedPhoto,
	TelegramInlineQueryResultCachedSticker,
	TelegramInlineQueryResultCachedVideo,
	TelegramInlineQueryResultCachedVoice,
} from "@gramio/types";

/** Cached result of InlineQuery builder. */
export class InlineQueryResultCached {
	/**
	 * Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedaudio)
	 */
	static audio(
		id: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedAudio,
			"type" | "audio_file_id" | "id"
		>,
	): TelegramInlineQueryResultCachedAudio {
		return { type: "audio", id, audio_file_id: fileId, ...options };
	}

	/**
	 * Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcacheddocument)
	 */
	static document(
		id: string,
		title: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedDocument,
			"type" | "document_file_id" | "id" | "title"
		>,
	): TelegramInlineQueryResultCachedDocument {
		return {
			type: "document",
			id,
			title,
			document_file_id: fileId,
			...options,
		};
	}

	/**
	 * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with specified content instead of the animation.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedgif)
	 */
	static gif(
		id: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedGif,
			"type" | "gif_file_id" | "id"
		>,
	): TelegramInlineQueryResultCachedGif {
		return { type: "gif", id, gif_file_id: fileId, ...options };
	}

	/**
	 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedmpeg4gif)
	 */
	static mpeg4Gif(
		id: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedMpeg4Gif,
			"type" | "mpeg4_file_id" | "id"
		>,
	): TelegramInlineQueryResultCachedMpeg4Gif {
		return { type: "mpeg4_gif", id, mpeg4_file_id: fileId, ...options };
	}

	/**
	 * Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedphoto)
	 */
	static photo(
		id: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedPhoto,
			"type" | "photo_file_id" | "id"
		>,
	): TelegramInlineQueryResultCachedPhoto {
		return { type: "photo", id, photo_file_id: fileId, ...options };
	}

	/**
	 * Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the sticker.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedsticker)
	 */
	static sticker(
		id: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedSticker,
			"type" | "sticker_file_id" | "id"
		>,
	): TelegramInlineQueryResultCachedSticker {
		return { type: "sticker", id, sticker_file_id: fileId, ...options };
	}

	/**
	 * Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedvideo)
	 */
	static video(
		id: string,
		title: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedVideo,
			"type" | "video_file_id" | "id" | "title"
		>,
	): TelegramInlineQueryResultCachedVideo {
		return {
			type: "video",
			id,
			title,
			video_file_id: fileId,
			...options,
		};
	}

	/**
	 * Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the voice message.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultcachedvoice)
	 */
	static voice(
		id: string,
		title: string,
		fileId: string,
		options?: Omit<
			TelegramInlineQueryResultCachedVoice,
			"type" | "voice_file_id" | "id" | "title"
		>,
	): TelegramInlineQueryResultCachedVoice {
		return {
			type: "voice",
			id,
			title,
			voice_file_id: fileId,
			...options,
		};
	}
}
