"use client";
import React, { useState } from "react";
import QRCode from "qrcode";
import { parseSpotifyUri } from "./parseSpotifyUri";

export default function QRCodeGenerator() {
	const [uri, setURI] = useState("");
	const [src, setSrc] = useState("");

	const generateQRCode = async () => {
		if (uri.length > 0)
			QRCode.toDataURL(await parseSpotifyUri(uri)).then(setSrc);
		else setSrc("");
	};

	return (
		<div>
			<input
				type="text"
				value={uri}
				onChange={async (e) => setURI(e.target.value)}
			/>
			<button onClick={generateQRCode}>Generate</button>
			{src && <img src={src} alt="QR Code" />}
		</div>
	);
}
