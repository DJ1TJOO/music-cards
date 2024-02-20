"use server";

import { formatURI } from "spotify-uri";

export async function parseSpotifyUri(url: string) {
	try {
		return formatURI(url);
	} catch (error) {
		return "";
	}
}
