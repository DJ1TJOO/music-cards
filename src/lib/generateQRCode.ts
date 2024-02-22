import qrcode from "qrcode";

export async function generateQRCode(
	uri: string,
	light: boolean
): Promise<string> {
	const options = {
		color: {
			dark: light ? "#000" : "#fff",
			light: light ? "#fff" : "#000",
		},
	};

	try {
		return qrcode.toDataURL(uri, options);
	} catch (error) {
		console.error("Failed to generate QR code:", error);
		throw error;
	}
}
