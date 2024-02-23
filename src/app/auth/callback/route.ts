import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	if (
		process.env.CLIENT_ID === undefined ||
		process.env.REDIRECT_URI === undefined
	) {
		return new Response("Internal server error", { status: 500 });
	}

	const searchParams = request.nextUrl.searchParams;
	const code = searchParams.get("code");
	const state = searchParams.get("state");
	const stateCookie = cookies().get("spotify_auth_state");
	const to = cookies().get("spotify_auth_to")?.value;

	if (state === null || state !== stateCookie?.value || code === null) {
		redirect("/404");
	}

	const getToken = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(
					process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
				).toString("base64"),
		},
		body: new URLSearchParams({
			code,
			redirect_uri: process.env.REDIRECT_URI,
			grant_type: "authorization_code",
		}),
	});

	const { access_token, expires_in } = await getToken.json();

	const url = new URL(to ?? "/");
	request.nextUrl.pathname = url.pathname;
	request.nextUrl.search = url.search;

	const response = NextResponse.redirect(request.nextUrl);

	// @TODO: do not store this data in cookie
	response.cookies.set("music_cards_token", access_token, {
		expires: new Date(Date.now() + 1000 * expires_in),
	});
	return response;
}
