import getPlaybackStatus from "@/lib/getPlaybackStatus";
import React from "react";
import PlaybackButton from "./PlaybackButton";
import getAccessToken from "@/lib/getAccessToken";

export default async function Playback() {
	const accessToken = await getAccessToken();
	const isPlaying = await getPlaybackStatus(accessToken);

	return <PlaybackButton isPlaying={isPlaying} />;
}
