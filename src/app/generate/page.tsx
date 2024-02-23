import React from "react";
import PlaylistInput from "./_components/PlaylistInput";
import Playlist from "./_components/Playlist";
import Print from "./_components/Print";
import Link from "next/link";

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
		<main className="w-full flex items-center pb-32 pt-8 px-4 flex-col gap-2">
			<Link
				href={"/"}
				className="max-w-xs w-full rounded-full px-4 py-2 font-semibold uppercase text-center mb-32 bg-green"
			>
				Back
			</Link>
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
					pattern={
						searchParams?.pattern === "wave"
							? "wave"
							: searchParams?.pattern === "checkered"
							? "checkered"
							: "wave"
					}
					light={
						typeof searchParams?.light !== "undefined" &&
						searchParams.light === "true"
					}
				/>
			) : null}
		</main>
	);
}
