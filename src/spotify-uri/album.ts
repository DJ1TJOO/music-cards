import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class Album extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.Album);
	}

	public static is(v: any): v is Album {
		return typeof v === "object" && v.type === SpotifyTypes.Album;
	}
}
