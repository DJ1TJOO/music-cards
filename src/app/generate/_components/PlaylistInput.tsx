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
	const [pattern, setPattern] = useState(
		searchParams.get("pattern") ?? "select"
	);
	const [mode, setMode] = useState(
		searchParams.has("light")
			? searchParams.get("light") === "true"
				? "light"
				: "dark"
			: "select"
	);

	const [invalid, setInvalid] = useState<string | null>(null);

	return (
		<div className="flex flex-col gap-2 max-w-xs w-full">
			<input
				type="text"
				className={`rounded-full bg-black focus:outline-none ring-2 px-4 py-2 ${
					invalid !== "url"
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
				placeholder="Enter a spotify playlist URL"
				value={playlistURL}
				onChange={(e) => {
					if (invalid === "url") setInvalid(null);
					setPlaylistURL(e.target.value);
				}}
			/>
			<select
				value={pattern}
				onChange={(e) => {
					if (invalid === "pattern") setInvalid(null);
					setPattern(e.target.value);
				}}
				className={`rounded-full bg-black focus:outline-none border-r-[16px] border-transparent ring-2 px-4 py-2 ${
					invalid !== "pattern"
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
			>
				<option value={"select"} disabled>
					Select a pattern
				</option>
				<option value={"wave"}>Wave</option>
				<option value={"checkered"}>Checkered</option>
			</select>
			<select
				value={mode}
				onChange={(e) => {
					if (invalid === "mode") setInvalid(null);
					setMode(e.target.value);
				}}
				className={`rounded-full bg-black focus:outline-none border-r-[16px] border-transparent ring-2 px-4 py-2 ${
					invalid !== "mode"
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
			>
				<option value={"select"} disabled>
					Select a mode
				</option>
				<option value={"dark"}>Dark</option>
				<option value={"light"}>Light</option>
			</select>
			<button
				onClick={() => {
					try {
						const parsedPlaylist = parse(playlistURL);
						if (parsedPlaylist.type !== "playlist") {
							// For now we only support playlist URLs
							throw new Error("url");
						}

						if (pattern === "select") {
							throw new Error("pattern");
						}

						if (mode === "select") {
							throw new Error("mode");
						}

						router.push(
							`/generate?playlistUrl=${formatURI(
								parsedPlaylist
							)}&pattern=${pattern}&light=${mode === "light"}`
						);
					} catch (error) {
						if (error instanceof Error) {
							setInvalid(error.message);
						}
					}
				}}
				className="rounded-full px-4 py-2 font-semibold uppercase bg-green"
			>
				generate
			</button>
		</div>
	);
}
