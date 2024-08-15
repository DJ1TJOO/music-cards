import RefreshButton from "@/app/_components/RefreshButton";
import { generateQRCode } from "@/lib/generateQRCode";
import getAccessToken from "@/lib/getAccessToken";
import getAlbum from "@/lib/getAlbum";
import getAlbumItems from "@/lib/getAlbumItems";
import getPlaylistItems from "@/lib/getPlaylistItems";
import { Album, SimplyfiedTrack } from "@/lib/spotify-types";
import { parse } from "@/spotify-uri";
import { SpotifyTypes } from "@/spotify-uri/types-enum";
import { decompress } from "compress-json";
import seedrandom from "seedrandom";
import TrackListClient from "./TrackListClient";

async function getTrackList(
	accessToken: string,
	listUrl: string
): Promise<{
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: (SimplyfiedTrack & { album: Album })[];
} | null> {
	const parsedList = parse(listUrl);

	try {
		if (parsedList.type === SpotifyTypes.Playlist) {
			const playListItems = await getPlaylistItems(
				accessToken,
				parsedList.id
			);

			return {
				...playListItems,
				items: playListItems.items
					.map((item) => item.track)
					.filter(Boolean),
			};
		}

		if (parsedList.type === SpotifyTypes.Album) {
			const album = await getAlbum(accessToken, parsedList.id);
			const albumItems = await getAlbumItems(accessToken, parsedList.id);
			return {
				...albumItems,
				items: albumItems.items
					.map((item) => ({ ...item, album }))
					.filter(Boolean),
			};
		}
	} catch (error) {
		console.log(error);

		return null;
	}

	return null;
}

export default async function TrackList({
	listUrl,
	pattern,
	light,
	seed,
	patches: patchesString,
}: {
	listUrl: string;
	pattern: "wave" | "checkered";
	light: boolean;
	seed: string;
	patches: string | null;
}) {
	const patches = patchesString
		? (decompress(JSON.parse(patchesString)) as {
				[key: string]: {
					name?: string;
					year?: number;
					artistNames?: string[];
				};
		  })
		: null;

	const random = seedrandom(seed);
	const accessToken = await getAccessToken();

	const list = await getTrackList(accessToken, listUrl);
	if (!list) {
		return (
			<div className="w-full max-w-xs flex flex-col gap-2 mt-8">
				<p className="text-white w-full bg-black rounded-3xl p-4 max-w-sm text-center">
					Failed to fetch list items
				</p>
				<RefreshButton />
			</div>
		);
	}

	console.log(list.items.filter((item) => !item));

	const tracks = list
		? await Promise.all(
				list.items
					.sort(() => 0.5 - random()) // This is pseudo-random, but fine for this use case
					.map(async (track) => ({
						uri: track.uri,
						name: track.name,
						artistNames: track.artists.map((artist) => artist.name),
						year: new Date(track.album.release_date).getFullYear(),
						qrDataUrl: await generateQRCode(track.uri, light),
					}))
		  )
		: [];

	return (
		<div className="flex flex-col items-center gap-8 max-w-xs w-full">
			<TrackListClient tracks={tracks} pattern={pattern} light={light} />
		</div>
	);
}
