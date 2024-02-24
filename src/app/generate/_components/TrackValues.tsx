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
	track: { uri, name, artistNames, year },
}: {
	track: {
		uri: string;
		name: string;
		artistNames: string[];
		year: number;
		qrDataUrl: string;
	};
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

					console.log(
						updatedName === name,
						updatedYear === year,
						arraysEqual(updatedArtistNames, artistNames)
					);

					const patch = {
						...(updatedName !== name ? { name: updatedName } : {}),
						...(updatedYear !== year ? { year: updatedYear } : {}),
						...(!arraysEqual(updatedArtistNames, artistNames)
							? {
									artistNames: updatedArtistNames,
							  }
							: {}),
					};

					const isPatching = Object.keys(patch).length > 0;

					if (!current.has("patches")) {
						current.set(
							"patches",
							JSON.stringify(
								compress(
									isPatching
										? {
												[uri]: patch,
										  }
										: {}
								)
							)
						);
					} else {
						const patches = decompress(
							JSON.parse(current.get("patches")!)
						);
						if (isPatching) patches[uri] = patch;
						else delete patches[uri];

						current.set(
							"patches",
							JSON.stringify(compress(patches))
						);
					}

					const search = current.toString();
					const query = search ? `?${search}` : "";

					router.push(`${pathname}${query}`, {
						scroll: false,
					});
				}}
				className="rounded-full w-full px-4 py-2 font-semibold uppercase bg-green"
			>
				update
			</button>
		</div>
	);
}
