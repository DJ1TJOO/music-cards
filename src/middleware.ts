import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const response = NextResponse.next();

	const token = cookies().get("music_cards_token");
	if (token === undefined) {
		if (
			url.pathname !== "/auth/login" &&
			url.pathname !== "/auth/callback"
		) {
			url.pathname = "/auth/login";
			return NextResponse.redirect(url);
		}
	} else if (url.pathname === "/auth/login") {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	if (url.pathname === "/generate" && !url.searchParams.has("seed")) {
		url.searchParams.set(
			"seed",
			Math.floor(100000 + Math.random() * 900000).toString()
		);

		return NextResponse.redirect(url);
	}

	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|.*\\..*|favicon|.well-known|sitemap|robots.txt|auth).*)",
	],
};
