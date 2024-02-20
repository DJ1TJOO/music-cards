import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class Search extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.Search);
	}
	get query() {
		return this.id;
	}
	public static is(v: any): v is Search {
		return typeof v === "object" && v.type === SpotifyTypes.Search;
	}
}
