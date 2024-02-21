import React from "react";
import PlaylistInput from "./_components/PlaylistInput";
import Playlist from "./_components/Playlist";

export default async function Generate({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const playlistUrl = searchParams?.playlistUrl;
	const hasPlaylist = typeof playlistUrl === "string";
	const seed = searchParams?.seed;
	const hasSeed = typeof seed === "string";

	return (
		<main className="w-full flex items-center py-32 flex-col gap-8">
			<PlaylistInput />
			{hasPlaylist && hasSeed ? (
				<Playlist
					playlistUrl={playlistUrl}
					seed={seed}
					showing={
						typeof searchParams?.showing === "string"
							? searchParams.showing
							: null
					}
					style={
						searchParams?.style === "wave"
							? "wave"
							: searchParams?.style === "checkered"
							? "checkered"
							: "wave"
					}
					light={typeof searchParams?.light !== "undefined"}
				/>
			) : null}
		</main>
	);
}
