"use server";
import getPlaybackStatus from "@/lib/getPlaybackStatus";
import pausePlayback from "@/lib/pausePlayback";
import startPlayback from "@/lib/startPlayback";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

async function togglePlayback() {
	const accessToken = cookies().get("guess_song_token")?.value;
	if (!accessToken) {
		throw new Error("No access token found");
	}

	const isPlaying = await getPlaybackStatus(accessToken);

	if (isPlaying) {
		await pausePlayback(accessToken);
	} else {
		await startPlayback(accessToken);
	}

	revalidateTag("playback-status");
}

export default togglePlayback;
