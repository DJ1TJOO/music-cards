import type { Metadata } from "next";
import { Inter, Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserratAlternates = Montserrat_Alternates({
	subsets: ["latin"],
	weight: ["900"],
	variable: "--font-montserrat-alternates",
});

export const metadata: Metadata = {
	title: "Music Cards",
	description:
		"Create music cards from your Spotify library, with the year, name and artist of the song",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} ${montserratAlternates.variable} min-h-screen bg-gradient-to-b from-cyan-300 to-blue-600`}
			>
				{children}
			</body>
		</html>
	);
}
