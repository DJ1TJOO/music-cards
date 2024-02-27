"use client";
import TrackCardBack from "@/app/_components/TrackCardBack";
import TrackCardFront from "@/app/_components/TrackCardFront";
import React, { useState } from "react";
import TrackValues from "./TrackValues";

export default function Track({
	originalTrack,
	track: { uri, name, artistNames, year, qrDataUrl },
	pattern,
	light,
	updateTrack,
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
	pattern: "wave" | "checkered";
	light: boolean;
	updateTrack: (
		uri: string,
		track: {
			name?: string;
			artistNames?: string[];
			year?: number;
		}
	) => void;
}) {
	const [show, setShow] = useState(false);

	return (
		<div className="flex flex-col gap-1 items-center">
			<button onClick={() => setShow((prev) => !prev)}>
				<div className="flex gap-2 h-56 w-full">
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
							pattern={pattern}
							light={light}
						/>
					)}
				</div>
			</button>
			{show && (
				<TrackValues
					originalTrack={originalTrack}
					track={{ uri, name, artistNames, year, qrDataUrl }}
					updateTrack={updateTrack}
				/>
			)}
		</div>
	);
}
