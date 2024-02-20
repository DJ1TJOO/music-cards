async function startPlayback(
	accessToken: string,
	{
		context_uri,
		uris,
	}: {
		context_uri?: string;
		uris?: string[];
	} = {}
): Promise<boolean> {
	const response = await fetch("https://api.spotify.com/v1/me/player/play", {
		method: "PUT",
		headers: {
			contentType: "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			context_uri,
			uris,
		}),
	});

	return response.ok;
}

export default startPlayback;
