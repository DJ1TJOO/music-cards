"use client";
import React, { useState } from "react";
import QRCode from "qrcode";
import { formatURI } from "@/spotify-uri";

export default function QRCodeGenerator() {
	const [uri, setURI] = useState("");
	const [src, setSrc] = useState("");

	const generateQRCode = async () => {
		try {
			if (uri.length > 0) {
				QRCode.toDataURL(formatURI(uri)).then(setSrc);
			} else setSrc("");
		} catch (error) {
			setSrc("");
		}
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
