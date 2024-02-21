"use client";
import getPlaylist from "@/lib/getPlaylist";
import { parse } from "@/spotify-uri";
import React, { useState } from "react";
import QRCode from "qrcode";

export default function PlaylistInfo({ accessToken }: { accessToken: string }) {
	const [uri, setURI] = useState("");
	const [tracks, setTracks] = useState<
		{
			qr: string;
			name: string;
			artistNames: string;
			year: number;
		}[]
	>([]);

	const getInfo = async () => {
		const playlist = await getPlaylist(accessToken, parse(uri).id);

		const tracks = await Promise.all(
			playlist.tracks.items.map(async (track) => ({
				qr: await QRCode.toDataURL(track.track.uri),
				name: track.track.name,
				artistNames: track.track.artists
					.map((artist) => artist.name)
					.join(", "),
				year: new Date(track.track.album.release_date).getFullYear(),
			}))
		);

		setTracks(tracks);
	};

	return (
		<div>
			<input
				type="text"
				value={uri}
				onChange={async (e) => setURI(e.target.value)}
			/>
			<button onClick={getInfo}>Info</button>
			{tracks.map((track, i) => (
				<div key={i}>
					<img src={track.qr} alt="QR Code" />
					<p>{track.name}</p>
					<p>{track.artistNames}</p>
					<p>{track.year}</p>
				</div>
			))}
		</div>
	);
}
