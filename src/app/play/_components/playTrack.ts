"use server";
import startPlayback from "@/lib/startPlayback";
import { SpotifyTypes } from "@/spotify-uri/types-enum";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

async function playUri(uri: string) {
	const accessToken = cookies().get("guess_song_token")?.value;

	if (!accessToken) {
		throw new Error("No access token found");
	}

	const isContextUri =
		uri.includes(SpotifyTypes.Album) ||
		uri.includes(SpotifyTypes.Playlist) ||
		uri.includes(SpotifyTypes.Artist);
	const isUri = uri.includes(SpotifyTypes.Track);

	await startPlayback(accessToken, {
		context_uri: isContextUri ? uri : undefined,
		uris: isUri ? [uri] : undefined,
	});

	revalidateTag("playback-status");
}

export default playUri;
