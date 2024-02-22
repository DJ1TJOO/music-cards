import { dark as spotifyDark, light as spotifyLight } from "@/spotify_logo";
import { loadImage, createCanvas } from "canvas";
import qrcode from "qrcode";

export async function generateQRCode(
	uri: string,
	light: boolean
): Promise<string> {
	try {
		const canvas = createCanvas(300, 300);
		await qrcode.toCanvas(canvas, uri, {
			color: {
				dark: light ? "#000" : "#fff",
				light: light ? "#fff" : "#000",
			},
			errorCorrectionLevel: "H",
			width: 300,
		});

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return canvas.toDataURL();
		}

		const size = 55;
		const center = (canvas.width - size) / 2;

		const img = await loadImage(light ? spotifyDark : spotifyLight);
		ctx.fillStyle = light ? "#fff" : "#000";
		ctx.fillRect(center - 2, center - 2, size + 4, size + 4);
		ctx.drawImage(img, center, center, size, size);

		return canvas.toDataURL();
	} catch (error) {
		console.error("Failed to generate QR code:", error);
		throw error;
	}
}
