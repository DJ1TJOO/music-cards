"use client";

import TrackCardBack from "@/app/_components/TrackCardBack";
import TrackCardFront from "@/app/_components/TrackCardFront";
import domToImage from "dom-to-image";
import jsPDF from "jspdf";
import React from "react";

export default function Print({
	tracks,
	pattern,
	light,
}: {
	tracks: {
		name: string;
		artistNames: string[];
		year: number;
		uri: string;
		qrDataUrl: string;
	}[];
	light: boolean;
	pattern: "wave" | "checkered";
}) {
	const printDocument = () => {
		const input = document.getElementById("divToPrint");
		if (!input)
			return console.error("No element with id 'divToPrint' found");

		const bounds = input.getBoundingClientRect();
		domToImage
			.toPng(input, {
				width: bounds.width * 2,
				height: bounds.height * 2,
				style: {
					transform: "scale(2)",
					transformOrigin: "top left",
				},
			})
			.then((imgData) => {
				const pdf = new jsPDF({
					unit: "px",
					format: "a4",
					userUnit: 72,
				});
				const pageHeight = pdf.internal.pageSize.getHeight();

				const imgProps = pdf.getImageProperties(imgData);
				const imgWidth = pdf.internal.pageSize.getWidth();

				const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
				let heightLeft = imgHeight;
				let position = 0;

				pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;

				while (heightLeft >= 16) {
					position = heightLeft - imgHeight;

					pdf.addPage();
					pdf.addImage(
						imgData,
						"PNG",
						0,
						position,
						imgWidth,
						imgHeight
					);
					heightLeft -= pageHeight;
				}

				pdf.save("music-cards.pdf");
			});
	};
	return (
		<div className="flex flex-col max-w-xs w-full">
			<button
				className="rounded-full px-4 py-2 font-semibold uppercase bg-green"
				onClick={printDocument}
			>
				Print
			</button>
			<div className="absolute ">
				{/* -translate-x-[200%] -translate-y-[200%] */}
				<div id="divToPrint" className="w-[595px] flex flex-col gap-0">
					{tracks
						.reduce((prev, curr) => {
							if (prev.length === 0) return [[curr]];

							const last = prev[prev.length - 1];
							const cols = Math.floor((595 - 16 * 2) / (180 + 4));
							const rows = Math.floor((842 - 16 * 2) / 360);

							if (last.length < cols * rows) {
								last.push(curr);
							} else {
								prev.push([curr]);
							}

							return prev;
						}, [] as (typeof tracks)[])
						.map((tracks) => (
							<div
								key={tracks.map((x) => x.uri).join("-")}
								className="flex-wrap flex justify-center items-center gap-2 p-[16px] h-[842px]"
							>
								{tracks.map((track) => (
									<div
										key={track.uri}
										className="h-[360px] w-[180px] flex-col flex"
									>
										<TrackCardBack
											artistNames={track.artistNames}
											name={track.name}
											year={track.year}
											light={light}
										/>
										<div className="rotate-180">
											<TrackCardFront
												qrDataUrl={track.qrDataUrl}
												pattern={pattern}
												light={light}
											/>
										</div>
									</div>
								))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
