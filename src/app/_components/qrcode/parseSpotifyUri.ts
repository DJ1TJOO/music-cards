"use server";

import { formatURI } from "spotify-uri";

export async function parseSpotifyUri(url: string) {
	try {
		console.log("parseSpotifyUri", url, formatURI(url));

		return formatURI(url);
	} catch (error) {
		return "";
	}
}
