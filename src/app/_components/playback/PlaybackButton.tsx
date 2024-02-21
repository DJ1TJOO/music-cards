"use client";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import React, { PropsWithChildren, useEffect } from "react";
import togglePlayback from "./togglePlayback";
import { useRouter } from "next/navigation";

export default function PlaybackButton({
	isPlaying,
}: PropsWithChildren<{ isPlaying: boolean }>) {
	const router = useRouter();
	useEffect(() => {
		const interval = setInterval(() => router.refresh(), 1000);
		return () => clearInterval(interval);
	});

	return (
		<button onClick={() => togglePlayback()}>
			{isPlaying ? (
				<PauseIcon className="w-5 h-5" />
			) : (
				<PlayIcon className="w-5 h-5" />
			)}
		</button>
	);
}
