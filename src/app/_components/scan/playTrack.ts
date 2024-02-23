"use server";
import startPlayback from "@/lib/startPlayback";
import { SpotifyTypes } from "@/spotify-uri/types-enum";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { isContextUri, isUri } from "./trackHelpers";

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
