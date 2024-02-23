import getAccessToken from "@/lib/getAccessToken";
import getPlaylist from "@/lib/getPlaylist";
import { parse } from "@/spotify-uri";
import Track from "./Track";
import seedrandom from "seedrandom";
import Print from "./Print";
import { generateQRCode } from "@/lib/generateQRCode";

export default async function Playlist({
	playlistUrl,
	showing,
	pattern,
	light,
	seed,
}: {
	playlistUrl: string;
	showing: string | null;
	pattern: "wave" | "checkered";
	light: boolean;
	seed: string;
}) {
	const random = seedrandom(seed);
	const accessToken = await getAccessToken();
	const playList = await getPlaylist(accessToken, parse(playlistUrl).id);
	const tracks = await Promise.all(
		playList.tracks.items
			.sort(() => 0.5 - random()) // This is pseudo-random, but fine for this use case
			.map(async (track) => ({
				uri: track.track.uri,
				name: track.track.name,
				artistNames: track.track.artists.map((artist) => artist.name),
				year: new Date(track.track.album.release_date).getFullYear(),
				qrDataUrl: await generateQRCode(track.track.uri, light),
			}))
	);

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
