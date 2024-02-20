async function pausePlayback(accessToken: string): Promise<boolean> {
	const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return response.ok;
}

export default pausePlayback;
