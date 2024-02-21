import getDevices from "./getDevices";

async function transferPlayback(
	accessToken: string,
	deviceIds: string[]
): Promise<boolean> {
	const response = await fetch("https://api.spotify.com/v1/me/player", {
		method: "PUT",
		headers: {
			contentType: "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			device_ids: deviceIds,
		}),
	});

	return response.ok;
}

export default transferPlayback;

export async function ensureDevice(accessToken: string) {
	const devices = await getDevices(accessToken);
	const anyActive = devices.some((device) => device.is_active);
	if (!anyActive && devices.length > 0) {
		await transferPlayback(accessToken, [devices[0].id]);
	}
}
