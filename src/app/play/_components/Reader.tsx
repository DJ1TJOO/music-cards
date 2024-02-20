"use client";
import React, { useState } from "react";
import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";
import playTrack from "./playTrack";

const constraints: MediaStreamConstraints = {
	video: true,
	audio: false,
};

export default function Reader() {
	const [result, setResult] = useState("");
	const { ref } = useZxing({
		onDecodeResult(result) {
			const value = result.getText();
			playTrack(value);
			setResult(value);
		},
	});

	return (
		<>
			<video ref={ref} />
			<p>
				<span>Last result:</span>
				<span>{result}</span>
				<button
					onClick={() => {
						try {
							alert(result);
							playTrack(result);
						} catch (error) {
							alert(error);
						}
					}}
				>
					Play
				</button>
			</p>
		</>
	);
}
