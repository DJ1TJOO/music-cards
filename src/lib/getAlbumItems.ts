import { AlbumItems } from "./spotify-types";

async function getAlbumItems(
	accessToken: string,
	albumId: string
): Promise<AlbumItems> {
	const response = await fetch(
		`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Failed to fetch album items");
	}

	const album = (await response.json()) as AlbumItems;

	while (album.total > album.items.length) {
		const response = await fetch(
			`https://api.spotify.com/v1/playlists/${albumId}/tracks?limit=50&offset=${album.items.length}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch album items");
		}

		const nextAlbum = (await response.json()) as AlbumItems;
		album.items = album.items.concat(nextAlbum.items);
	}

	return album;
}

export default getAlbumItems;
