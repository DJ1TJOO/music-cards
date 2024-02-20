import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class Show extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.Show);
	}
	public static is(v: any): v is Show {
		return typeof v === "object" && v.type === SpotifyTypes.Show;
	}
}
