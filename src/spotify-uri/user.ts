import SpotifyUri from "./spotify-uri";
import { SpotifyTypes } from "./types-enum";

export default class User extends SpotifyUri {
	constructor(uri: string, id: string) {
		super(uri, id, SpotifyTypes.User);
	}
	get user() {
		return this.id;
	}
	public static is(v: any): v is User {
		return typeof v === "object" && v.type === SpotifyTypes.User;
	}
}
