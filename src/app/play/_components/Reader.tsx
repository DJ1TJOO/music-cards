"use client";
import React, { useState } from "react";
import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";
import playUri from "./playTrack";

const constraints: MediaStreamConstraints = {
	video: true,
	audio: false,
};

export default function Reader() {
	const [result, setResult] = useState("");
	const { ref } = useZxing({
		onDecodeResult(data) {
			const value = data.getText();
			if (result === value) return;

			playUri(value);
			setResult(value);
		},
	});

	return (
		<>
			<video ref={ref} />
			<p>
				<span>Last result:</span>
				<span>{result}</span>
			</p>
		</>
	);
}
