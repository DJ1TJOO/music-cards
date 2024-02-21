"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default function TrackButton({
	children,
	url,
	show,
}: PropsWithChildren<{ url: string; show: boolean }>) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const generatedUrl = () => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		if (show) {
			current.delete("showing");
		} else {
			current.set("showing", url);
		}

		const search = current.toString();
		const query = search ? `?${search}` : "";
		return `${pathname}${query}`;
	};

	return (
		<Link href={generatedUrl()} scroll={false}>
			{children}
		</Link>
	);
}
