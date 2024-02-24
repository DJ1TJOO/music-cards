import { Album } from "./spotify-types";

async function getAlbum(accessToken: string, albumId: string): Promise<Album> {
	const response = await fetch(
		`https://api.spotify.com/v1/albums/${albumId}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Failed to fetch album");
	}

	const album = (await response.json()) as Album;
	return album;
}

export default getAlbum;
