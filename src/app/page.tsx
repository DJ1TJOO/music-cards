import { ensureDevice } from "@/lib/transferPlayback";
import getAccessToken from "@/lib/getAccessToken";
import Reader from "./_components/scan/Reader";
import TrackCardFront from "./_components/TrackCardFront";
import Link from "next/link";
import RefreshButton from "./_components/RefreshButton";
import { generateQRCode } from "@/lib/generateQRCode";
export default async function Home({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const accessToken = await getAccessToken();
	// TODO: change this
	if (!(await ensureDevice(accessToken))) {
		return (
			<main className="w-full h-screen flex items-center py-32 px-4 flex-col gap-8">
				<p className="text-white bg-black rounded-3xl p-4 max-w-sm text-center">
					Could not find any active devices, please activate an device
					by opening/playing in the spotify app or web player.
				</p>
				<RefreshButton />
			</main>
		);
	}

	const playing = searchParams?.playing;
	const isPlaying = typeof playing === "string";

	return (
		<main className="w-full h-screen flex items-center py-32 px-4 flex-col gap-8">
			{!isPlaying ? (
				<div className="flex flex-col gap-4">
					<Reader />
					<Link
						href={"/generate"}
						className="rounded-full px-4 py-2 font-semibold uppercase bg-green text-center"
					>
						generate
					</Link>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<div className="h-72 w-72">
						<TrackCardFront
							qrDataUrl={await generateQRCode(
								playing,
								typeof searchParams?.light !== "undefined"
							)}
							style={
								searchParams?.style === "wave"
									? "wave"
									: searchParams?.style === "checkered"
									? "checkered"
									: "wave"
							}
							light={typeof searchParams?.light !== "undefined"}
						/>
					</div>
					<Link
						href={"/"}
						className="rounded-full px-4 py-2 font-semibold uppercase bg-green text-center"
					>
						scan
					</Link>
				</div>
			)}
		</main>
	);
}
