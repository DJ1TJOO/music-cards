import TrackCardBack from "@/app/_components/TrackCardBack";
import TrackCardFront from "@/app/_components/TrackCardFront";
import React from "react";

export default function Track({
	url,
	name,
	artistNames,
	year,
	style,
	light,
}: {
	url: string;
	name: string;
	artistNames: string[];
	year: number;
	style: "wave" | "checkered";
	light: boolean;
}) {
	return (
		<div className="flex gap-2 h-56">
			<TrackCardFront url={url} style={style} light={light} />
			<TrackCardBack
				name={name}
				artistNames={artistNames}
				year={year}
				light={light}
			/>
		</div>
	);
}
