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
import { InlineQueryResultCached } from "./cached-result";

export class InlineQueryResult {
	static cached = InlineQueryResultCached;

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

	static venue(
		id: string,
		options: Omit<TelegramInlineQueryResultVenue, "type" | "id">,
	): TelegramInlineQueryResultVenue {
		return { type: "venue", id, ...options };
	}

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
