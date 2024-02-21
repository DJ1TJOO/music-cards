import Image from "next/image";
import React from "react";
import QRCode from "qrcode";
import { formatOpenURL } from "@/spotify-uri";

export default async function TrackCardFront({
	uri,
	style,
	light,
}: {
	uri: string;
	style: "wave" | "checkered";
	light: boolean;
}) {
	const src = await QRCode.toDataURL(formatOpenURL(uri), {
		color: {
			dark: light ? "#000" : "#fff",
			light: light ? "#fff" : "#000",
		},
	});

	return (
		<div
			className={`aspect-square p-6 h-full ${
				light ? "bg-white" : "bg-black"
			} ${style} flex items-center justify-center`}
		>
			<Image src={src} width={100} height={100} alt="QR Code" />
		</div>
	);
}
