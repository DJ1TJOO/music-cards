import React from "react";

export default function TrackCardBack({
	name,
	artistNames,
	year,
	light,
}: {
	name: string;
	artistNames: string[];
	year: number;
	light: boolean;
}) {
	return (
		<div
			className={`${
				light ? "bg-white text-black" : "bg-black text-white"
			} flex items-center justify-between h-full flex-col aspect-square p-6 text-center`}
		>
			<p className="text-xs font-semibold">{artistNames.join(", ")}</p>
			<p className="font-bold text-3xl">{year}</p>
			<p className="italic text-xs">{name}</p>
		</div>
	);
}
