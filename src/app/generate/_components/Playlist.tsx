import getAccessToken from "@/lib/getAccessToken";
import getPlaylist from "@/lib/getPlaylist";
import { parse } from "@/spotify-uri";
import Track from "./Track";
import seedrandom from "seedrandom";

export default async function Playlist({
	playlistUrl,
	showing,
	style,
	light,
	seed,
}: {
	playlistUrl: string;
	showing: string | null;
	style: "wave" | "checkered";
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
			}))
	);

	return (
		<div className="flex flex-col gap-8">
			{tracks.map((track, i) => (
				<Track
					key={i}
					track={track}
					style={style}
					light={light}
					show={track.uri === showing}
				/>
			))}
		</div>
	);
}
