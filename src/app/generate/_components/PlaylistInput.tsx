"use client";
import { formatURI, parse } from "@/spotify-uri";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function PlaylistInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [playlistURL, setPlaylistURL] = useState(
		searchParams.get("playlistUrl") ?? ""
	);
	const [valid, setValid] = useState(true);

	return (
		<div className="flex flex-col gap-2 max-w-xs w-full">
			<input
				type="text"
				className={`rounded-full bg-black focus:outline-none ring-2 px-4 py-2 ${
					valid
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
				placeholder="Enter a spotify playlist URL"
				value={playlistURL}
				onChange={(e) => {
					setValid(true);
					setPlaylistURL(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					try {
						const parsedPlaylist = parse(playlistURL);
						if (parsedPlaylist.type !== "playlist") {
							// For now we only support playlist URLs
							throw new Error("Invalid playlist URL");
						}

						router.push(
							`/generate?playlistUrl=${formatURI(parsedPlaylist)}`
						);
					} catch (error) {
						setValid(false);
					}
				}}
				className="rounded-full px-4 py-2 font-semibold uppercase bg-green"
			>
				generate
			</button>
		</div>
	);
}
