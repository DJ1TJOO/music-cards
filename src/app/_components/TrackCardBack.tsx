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
			} flex items-center justify-between h-full flex-col aspect-square p-6 relative text-center`}
		>
			<p className="text-xs font-semibold line-clamp-3 px-0.5">
				{artistNames.join(", ")}
			</p>
			<p className="font-bold text-3xl absolute top-1/2 -translate-y-1/2">
				{year}
			</p>
			<p className="italic text-xs line-clamp-3 px-0.5">{name}</p>
		</div>
	);
}
