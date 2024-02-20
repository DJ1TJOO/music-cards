async function getPlaybackStatus(accessToken: string): Promise<boolean> {
	const response = await fetch("https://api.spotify.com/v1/me/player", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		next: {
			tags: ["playback-status"],
		},
	});

	if (response.status === 200) {
		const data = await response.json();
		return data.is_playing;
	} else {
		throw new Error("Failed to fetch playback status");
	}
}

export default getPlaybackStatus;
