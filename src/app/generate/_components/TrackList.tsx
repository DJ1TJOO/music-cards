import getAccessToken from "@/lib/getAccessToken";
import getPlaylistItems from "@/lib/getPlaylistItems";
import { parse } from "@/spotify-uri";
import Track from "./Track";
import seedrandom from "seedrandom";
import Print from "./Print";
import { generateQRCode } from "@/lib/generateQRCode";
import { SpotifyTypes } from "@/spotify-uri/types-enum";
import getAlbumItems from "@/lib/getAlbumItems";
import { Album, SimplyfiedTrack } from "@/lib/spotify-types";
import getAlbum from "@/lib/getAlbum";
import { decompress } from "compress-json";
import RefreshButton from "@/app/_components/RefreshButton";

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
				items: playListItems.items.map((item) => item.track),
			};
		}

		if (parsedList.type === SpotifyTypes.Album) {
			const album = await getAlbum(accessToken, parsedList.id);
			const albumItems = await getAlbumItems(accessToken, parsedList.id);
			return {
				...albumItems,
				items: albumItems.items.map((item) => ({ ...item, album })),
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
	showing,
	pattern,
	light,
	seed,
	patches: patchesString,
}: {
	listUrl: string;
	showing: string | null;
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

	const tracks = list
		? await Promise.all(
				list.items
					.sort(() => 0.5 - random()) // This is pseudo-random, but fine for this use case
					.map(async (track) => ({
						uri: track.uri,
						name: patches?.[track.uri]?.name ?? track.name,
						artistNames:
							patches?.[track.uri]?.artistNames ??
							track.artists.map((artist) => artist.name),
						year:
							patches?.[track.uri]?.year ??
							new Date(track.album.release_date).getFullYear(),
						qrDataUrl: await generateQRCode(track.uri, light),
					}))
		  )
		: [];

	return (
		<div className="flex flex-col items-center gap-8 max-w-xs w-full">
			<Print tracks={tracks} pattern={pattern} light={light} />
			<p className="text-white w-full bg-black rounded-3xl p-4 max-w-sm text-center">
				Preview how the cards will look, click print when you are happy
				with the result.
			</p>
			<p className="text-xs font-semibold text-center">
				Click to see year, name and artist
			</p>

			{tracks.map((track, i) => (
				<Track
					key={i}
					track={track}
					pattern={pattern}
					light={light}
					show={track.uri === showing}
				/>
			))}
		</div>
	);
}
