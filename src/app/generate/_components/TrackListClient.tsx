"use client";
import React, { useState } from "react";
import Print from "./Print";
import Track from "./Track";
import { useSearchParams } from "next/navigation";
import { decompress } from "compress-json";

export default function TrackListClient({
	tracks,
	pattern,
	light,
}: {
	tracks: {
		uri: string;
		name: string;
		artistNames: string[];
		year: number;
		qrDataUrl: string;
	}[];
	pattern: "wave" | "checkered";
	light: boolean;
}) {
	const searchParams = useSearchParams();
	const patches = searchParams.has("patches")
		? (decompress(JSON.parse(searchParams.get("patches")!)) as {
				[key: string]: {
					name?: string;
					year?: number;
					artistNames?: string[];
				};
		  })
		: null;

	const [updatedTracks, setUpdatedTracks] = useState(
		tracks.map((track) => ({
			...track,
			name: patches?.[track.uri]?.name ?? track.name,
			artistNames: patches?.[track.uri]?.artistNames ?? track.artistNames,
			year: patches?.[track.uri]?.year ?? track.year,
		}))
	);

	const updateTrack = (
		uri: string,
		track: {
			name?: string;
			artistNames?: string[];
			year?: number;
		}
	) => {
		setUpdatedTracks((prev) => {
			const index = prev.findIndex((track) => track.uri === uri);
			const updatedTrack = { ...prev[index], ...track };

			const updatedTracks = [...prev];
			updatedTracks[index] = updatedTrack;

			return updatedTracks;
		});
	};

	return (
		<>
			<Print tracks={updatedTracks} pattern={pattern} light={light} />
			<p className="text-white w-full bg-black rounded-3xl p-4 max-w-sm text-center">
				Preview how the cards will look, click print when you are happy
				with the result.
			</p>
			<p className="text-xs font-semibold text-center">
				Click to see year, name and artist
			</p>

			{updatedTracks.map((track, i) => (
				<Track
					key={track.uri}
					originalTrack={tracks[i]}
					track={track}
					pattern={pattern}
					light={light}
					updateTrack={updateTrack}
				/>
			))}
		</>
	);
}
