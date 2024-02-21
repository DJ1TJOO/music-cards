"use client";
import React from "react";

export default function RefreshButton() {
	return (
		<button
			onClick={() => window.location.reload()}
			className="rounded-full px-4 py-2 font-semibold uppercase bg-green text-center"
		>
			refresh
		</button>
	);
}
