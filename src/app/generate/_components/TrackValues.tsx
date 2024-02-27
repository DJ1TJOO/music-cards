"use client";
import { compress, decompress } from "compress-json";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function arraysEqual(a: string[], b: string[]) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

export default function TrackValues({
	originalTrack,
	updateTrack,
	track: { uri, name, artistNames, year },
}: {
	originalTrack: {
		name: string;
		artistNames: string[];
		year: number;
	};
	track: {
		uri: string;
		name: string;
		artistNames: string[];
		year: number;
		qrDataUrl: string;
	};
	updateTrack: (
		uri: string,
		track: { name?: string; artistNames?: string[]; year?: number }
	) => void;
}) {
	const [updatedName, setName] = useState(name);
	const [updatedYear, setYear] = useState(year);
	const [updatedArtistNames, setArtistNames] = useState(artistNames);

	const [invalid, setInvalid] = useState<string | null>(null);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<div className="flex w-full items-center flex-col pointer gap-2">
			<input
				onClick={(e) => e.stopPropagation()}
				id={uri + "-name"}
				type="text"
				value={updatedName}
				onChange={(e) => setName(e.target.value)}
				className={`rounded-full bg-black focus:outline-none border-r-[16px] border-transparent ring-2 px-4 py-2 ${
					invalid !== "name"
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
			/>
			<input
				onClick={(e) => e.stopPropagation()}
				type="text"
				value={updatedYear}
				onChange={(e) => setYear(parseInt(e.target.value))}
				className={`rounded-full bg-black focus:outline-none border-r-[16px] border-transparent ring-2 px-4 py-2 ${
					invalid !== "year"
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
			/>
			<input
				onClick={(e) => e.stopPropagation()}
				type="text"
				value={updatedArtistNames.join(", ")}
				onChange={(e) => setArtistNames(e.target.value.split(", "))}
				className={`rounded-full bg-black focus:outline-none border-r-[16px] border-transparent ring-2 px-4 py-2 ${
					invalid !== "artistNames"
						? "text-green ring-green"
						: "text-red-500 ring-red-500"
				}`}
			/>
			<button
				onClick={() => {
					if (name.trim().length < 1) {
						setInvalid("name");
						return;
					}

					if (isNaN(year)) {
						setInvalid("year");
						return;
					}

					if (artistNames.length < 1) {
						setInvalid("artistNames");
						return;
					}

					setInvalid(null);

					const current = new URLSearchParams(
						Array.from(searchParams.entries())
					);

					const patchTracks = {
						...(updatedName !== name ? { name: updatedName } : {}),
						...(updatedYear !== year ? { year: updatedYear } : {}),
						...(!arraysEqual(updatedArtistNames, artistNames)
							? {
									artistNames: updatedArtistNames,
							  }
							: {}),
					};

					updateTrack(uri, patchTracks);

					const patchUrl = {
						...(updatedName !== originalTrack.name
							? { name: updatedName }
							: {}),
						...(updatedYear !== originalTrack.year
							? { year: updatedYear }
							: {}),
						...(!arraysEqual(
							updatedArtistNames,
							originalTrack.artistNames
						)
							? {
									artistNames: updatedArtistNames,
							  }
							: {}),
					};

					const isPatching = Object.keys(patchUrl).length > 0;

					if (!current.has("patches")) {
						current.set(
							"patches",
							JSON.stringify(
								compress(
									isPatching
										? {
												[uri]: patchUrl,
										  }
										: {}
								)
							)
						);
					} else {
						const patches = decompress(
							JSON.parse(current.get("patches")!)
						);
						if (isPatching) patches[uri] = patchUrl;
						else delete patches[uri];

						current.set(
							"patches",
							JSON.stringify(compress(patches))
						);
					}

					const search = current.toString();
					const query = search ? `?${search}` : "";

					window.history.pushState(
						{
							path: `${pathname}${query}`,
						},
						"",
						`${pathname}${query}`
					);
				}}
				className="rounded-full w-full px-4 py-2 font-semibold uppercase bg-green"
			>
				update
			</button>
		</div>
	);
}
