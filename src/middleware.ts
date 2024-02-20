import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const response = NextResponse.next();

	const token = cookies().get("guess_song_token");
	if (token === undefined) {
		if (
			request.nextUrl.pathname !== "/auth/login" &&
			request.nextUrl.pathname !== "/auth/callback"
		) {
			url.pathname = "/auth/login";
			return NextResponse.redirect(url);
		}
	} else if (request.nextUrl.pathname === "/auth/login") {
		url.pathname = "/";
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
