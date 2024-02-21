import TrackCardBack from "@/app/_components/TrackCardBack";
import TrackCardFront from "@/app/_components/TrackCardFront";
import React from "react";
import TrackButton from "./TrackButton";

export default function Track({
	track: { url, name, artistNames, year },
	style,
	light,
	show,
}: {
	track: {
		url: string;
		name: string;
		artistNames: string[];
		year: number;
	};
	style: "wave" | "checkered";
	light: boolean;
	show: boolean;
}) {
	return (
		<TrackButton url={url} show={show}>
			<div className="flex gap-2 h-56">
				{show ? (
					<TrackCardBack
						name={name}
						artistNames={artistNames}
						year={year}
						light={light}
					/>
				) : (
					<TrackCardFront url={url} style={style} light={light} />
				)}
			</div>
		</TrackButton>
	);
}
