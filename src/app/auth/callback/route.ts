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

	// @TODO: compare state to send login request
	if (state === null || code === null) {
		// @TODO: handle error
		redirect("/#");
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

	// @TODO: do not store this data in cookie
	const response = NextResponse.redirect(new URL("/", request.url));
	response.cookies.set("guess_song_token", access_token, {
		expires: new Date(Date.now() + 1000 * expires_in),
	});
	return response;
}
