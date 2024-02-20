import { formatURI } from "@/spotify-uri";

export function parseSpotifyUri(url: string) {
	try {
		return formatURI(url);
	} catch (error) {
		return "";
	}
}
