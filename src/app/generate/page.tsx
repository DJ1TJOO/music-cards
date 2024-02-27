import React from "react";
import TrackListInput from "./_components/TrackListInput";
import TrackList from "./_components/TrackList";
import Link from "next/link";

export default async function Generate({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const listUrl = searchParams?.listUrl;
	const hasList = typeof listUrl === "string";
	const seed = searchParams?.seed;
	const hasSeed = typeof seed === "string";
	const patches = searchParams?.patches;
	const hasPatches = typeof patches === "string";

	return (
		<main className="w-full flex items-center pb-32 pt-8 px-4 flex-col gap-2">
			<Link
				href={"/"}
				className="max-w-xs w-full rounded-full px-4 py-2 font-semibold uppercase text-center mb-32 bg-green"
			>
				Back
			</Link>
			<TrackListInput />
			{hasList && hasSeed ? (
				<TrackList
					listUrl={listUrl}
					seed={seed}
					pattern={
						searchParams?.pattern === "wave"
							? "wave"
							: searchParams?.pattern === "checkered"
							? "checkered"
							: "wave"
					}
					light={
						typeof searchParams?.light !== "undefined" &&
						searchParams.light === "true"
					}
					patches={hasPatches ? patches : null}
				/>
			) : null}
		</main>
	);
}
