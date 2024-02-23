import React from "react";

export default function TrackCardFront({
	qrDataUrl,
	pattern,
	light,
}: {
	qrDataUrl: string;
	pattern: "wave" | "checkered";
	light: boolean;
}) {
	return (
		<div
			className={`aspect-square p-6 h-full ${
				light ? "bg-white" : "bg-black"
			} ${pattern} flex items-center justify-center`}
		>
			<img src={qrDataUrl} width={100} height={100} alt="QR Code" />
		</div>
	);
}
