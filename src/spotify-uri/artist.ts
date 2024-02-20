import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class Artist extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.Artist);
	}

	public static is(v: any): v is Artist {
		return typeof v === "object" && v.type === SpotifyTypes.Artist;
	}
}
