import { PlaylistItems } from "./spotify-types";

async function getPlaylistItems(
	accessToken: string,
	playlistId: string
): Promise<PlaylistItems> {
	const response = await fetch(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		console.log(response.status);
		throw new Error("Failed to fetch playlist items");
	}

	const playlist = (await response.json()) as PlaylistItems;

	while (playlist.total > playlist.items.length) {
		const response = await fetch(
			`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50&offset=${playlist.items.length}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!response.ok) {
			console.log(response.status);
			throw new Error("Failed to fetch playlist items");
		}

		const nextPlaylist = (await response.json()) as PlaylistItems;
		playlist.items = playlist.items.concat(nextPlaylist.items);
	}

	return playlist;
}

export default getPlaylistItems;
