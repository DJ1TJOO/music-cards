"use server";
import startPlayback from "@/lib/startPlayback";
import { SpotifyTypes } from "@/spotify-uri/types-enum";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export function isContextUri(uri: string) {
	return (
		uri.includes(SpotifyTypes.Album) ||
		uri.includes(SpotifyTypes.Playlist) ||
		uri.includes(SpotifyTypes.Artist)
	);
}

export function isUri(uri: string) {
	return uri.includes(SpotifyTypes.Track);
}

async function playUri(uri: string) {
	const accessToken = cookies().get("music_cards_token")?.value;

	if (!accessToken) {
		throw new Error("No access token found");
	}

	if (!isContextUri(uri) && !isUri(uri)) {
		throw new Error("Invalid URI");
	}

	await startPlayback(accessToken, {
		context_uri: isContextUri(uri) ? uri : undefined,
		uris: isUri(uri) ? [uri] : undefined,
	});

	revalidateTag("playback-status");
}

export default playUri;
