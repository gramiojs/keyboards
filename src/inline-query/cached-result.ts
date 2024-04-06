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

export class InlineQueryResultCached {
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
