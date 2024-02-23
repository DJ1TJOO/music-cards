import { SpotifyTypes } from "@/spotify-uri/types-enum";

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
