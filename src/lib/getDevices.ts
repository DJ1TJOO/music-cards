async function getDevices(accessToken: string): Promise<
	{
		id: string;
		is_active: boolean;
		is_private_session: boolean;
		is_restricted: boolean;
		name: string;
		type: string;
		volume_percent: number;
		supports_volume: boolean;
	}[]
> {
	const response = await fetch(
		"https://api.spotify.com/v1/me/player/devices",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (response.status === 200) {
		const data = await response.json();
		return data.devices;
	} else {
		throw new Error("Failed to fetch playback devices");
	}
}

export default getDevices;
