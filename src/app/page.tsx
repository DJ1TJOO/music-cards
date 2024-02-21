import { ensureDevice } from "@/lib/transferPlayback";
import getAccessToken from "@/lib/getAccessToken";
import Reader from "./_components/scan/Reader";
import TrackCardFront from "./_components/TrackCardFront";
import Link from "next/link";
export default async function Home({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const accessToken = await getAccessToken();
	// TODO: change this
	await ensureDevice(accessToken);

	const playing = searchParams?.playing;
	const isPlaying = typeof playing === "string";

	return (
		<main className="w-full h-screen flex items-center py-32 flex-col gap-8">
			{!isPlaying ? (
				<Reader />
			) : (
				<div className="flex flex-col gap-4">
					<div className="h-72 w-72">
						<TrackCardFront
							uri={playing}
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
