import { ensureDevice } from "@/lib/transferPlayback";
import getAccessToken from "@/lib/getAccessToken";
import Playback from "./_components/playback/Playback";
import QRCodeGenerator from "./_components/qrcode/QRCodeGenerator";

export default async function Home() {
	const accessToken = await getAccessToken();
	await ensureDevice(accessToken);

	return (
		<main className="">
			<Playback />
			<QRCodeGenerator />
		</main>
	);
}
