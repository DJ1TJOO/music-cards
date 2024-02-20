import { cookies } from "next/headers";

async function getAccessToken() {
	const accessToken = cookies().get("guess_song_token")?.value;
	if (!accessToken) {
		throw new Error("No access token found");
	}

	return accessToken;
}

export default getAccessToken;
