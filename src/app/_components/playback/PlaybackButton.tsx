"use client";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import React, { PropsWithChildren } from "react";
import togglePlayback from "./togglePlayback";

export default function PlaybackButton({
	isPlaying,
}: PropsWithChildren<{ isPlaying: boolean }>) {
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
