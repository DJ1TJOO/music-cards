"use server";
import startPlayback from "@/lib/startPlayback";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

async function playTrack(uri: string) {
	const accessToken = cookies().get("guess_song_token")?.value;
	console.log("playTrack", uri, accessToken);

	if (!accessToken) {
		throw new Error("No access token found");
	}

	await startPlayback(accessToken, [uri]);

	revalidateTag("playback-status");
}

export default playTrack;
