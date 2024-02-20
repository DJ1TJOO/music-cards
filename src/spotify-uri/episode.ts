import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class Episode extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.Episode);
	}
	public static is(v: any): v is Episode {
		return typeof v === "object" && v.type === SpotifyTypes.Episode;
	}
}
