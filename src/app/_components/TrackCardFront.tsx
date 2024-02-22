import Image from "next/image";
import React from "react";

export default function TrackCardFront({
	qrDataUrl,
	style,
	light,
}: {
	qrDataUrl: string;
	style: "wave" | "checkered";
	light: boolean;
}) {
	return (
		<div
			className={`aspect-square p-6 h-full ${
				light ? "bg-white" : "bg-black"
			} ${style} flex items-center justify-center`}
		>
			<Image src={qrDataUrl} width={100} height={100} alt="QR Code" />
		</div>
	);
}
