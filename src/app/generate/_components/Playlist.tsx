import getAccessToken from "@/lib/getAccessToken";
import getPlaylist from "@/lib/getPlaylist";
import { parse } from "@/spotify-uri";
import Track from "./Track";

export default async function Playlist({
	playlistUrl,
	style,
	light,
}: {
	playlistUrl: string;
	style: "wave" | "checkered";
	light: boolean;
}) {
	const accessToken = await getAccessToken();
	const playList = await getPlaylist(accessToken, parse(playlistUrl).id);
	const tracks = await Promise.all(
		playList.tracks.items.map(async (track) => ({
			url: track.track.href,
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
					url={track.url}
					name={track.name}
					artistNames={track.artistNames}
					year={track.year}
					style={style}
					light={light}
				/>
			))}
		</div>
	);
}
