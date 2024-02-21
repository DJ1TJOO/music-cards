import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Guess Song",
	description: "Guess the song from a qr code from spotify",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} min-h-screen bg-gradient-to-b from-cyan-300 to-blue-600`}
			>
				{children}
			</body>
		</html>
	);
}
