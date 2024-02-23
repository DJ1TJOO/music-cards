"use client";
import React from "react";
import { useZxing } from "react-zxing";
import playUri from "./playTrack";
import { useRouter, useSearchParams } from "next/navigation";
import { formatURI } from "@/spotify-uri";

export default function Reader() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const playing = searchParams.get("playing");

	const { ref } = useZxing({
		onDecodeResult(data) {
			const value = data.getText();
			if (playing === value) return;

			try {
				const uri = formatURI(value);
				playUri(uri);
				router.replace(`/?playing=${value}`);
			} catch (error) {}
		},
	});

	return <video ref={ref} />;
}
