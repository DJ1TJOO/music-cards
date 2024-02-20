import { generateRandomString } from "@/lib/generateRandomString";
import { redirect } from "next/navigation";
import { encode } from "querystring";

const SCOPES = ["user-modify-playback-state", "user-read-playback-state"];

export async function GET() {
	const state = generateRandomString(16);
	const queryParams = {
		response_type: "code",
		client_id: process.env.CLIENT_ID,
		redirect_uri: process.env.REDIRECT_URI,
		scope: SCOPES.join(" "),
		state: state,
	};

	redirect(`https://accounts.spotify.com/authorize?${encode(queryParams)}`);
}
