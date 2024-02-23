import { generateRandomString } from "@/lib/generateRandomString";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { encode } from "querystring";

const SCOPES = [
	"user-modify-playback-state",
	"user-read-playback-state",
	"playlist-read-private",
];

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const to = searchParams.get("to");

	const state = generateRandomString(16);
	cookies().set("spotify_auth_state", state, {
		expires: new Date(Date.now() + 1000 * 60 * 10),
	});
	cookies().set("spotify_auth_to", to ?? "/", {
		expires: new Date(Date.now() + 1000 * 60 * 10),
	});

	const queryParams = {
		response_type: "code",
		client_id: process.env.CLIENT_ID,
		redirect_uri: process.env.REDIRECT_URI,
		scope: SCOPES.join(" "),
		state: state,
	};

	redirect(`https://accounts.spotify.com/authorize?${encode(queryParams)}`);
}
