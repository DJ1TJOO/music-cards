import TrackCardBack from "@/app/_components/TrackCardBack";
import TrackCardFront from "@/app/_components/TrackCardFront";
import React from "react";
import TrackButton from "./TrackButton";

export default function Track({
	track: { uri, name, artistNames, year, qrDataUrl },
	style,
	light,
	show,
}: {
	track: {
		uri: string;
		name: string;
		artistNames: string[];
		year: number;
		qrDataUrl: string;
	};
	style: "wave" | "checkered";
	light: boolean;
	show: boolean;
}) {
	return (
		<TrackButton uri={uri} show={show}>
			<div className="flex gap-2 h-56">
				{show ? (
					<TrackCardBack
						name={name}
						artistNames={artistNames}
						year={year}
						light={light}
					/>
				) : (
					<TrackCardFront
						qrDataUrl={qrDataUrl}
						style={style}
						light={light}
					/>
				)}
			</div>
		</TrackButton>
	);
}
