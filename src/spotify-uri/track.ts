import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class Track extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.Track);
	}
	public static is(v: any): v is Track {
		return typeof v === "object" && v.type === SpotifyTypes.Track;
	}
}
