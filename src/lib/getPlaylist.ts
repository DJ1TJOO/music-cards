async function getPlaylist(
	accessToken: string,
	playlistId: string
): Promise<Playlist> {
	const response = await fetch(
		`https://api.spotify.com/v1/playlists/${playlistId}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Failed to fetch playlist");
	}

	const playlist = await response.json();
	return playlist;
}

export default getPlaylist;

type Playlist = {
	collaborative: boolean;
	description: string;
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string;
		total: number;
	};
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: {
		external_urls: {
			spotify: string;
		};
		followers: {
			href: string;
			total: number;
		};
		href: string;
		id: string;
		type: string;
		uri: string;
		display_name: string;
	};
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
		items: Track[];
	};
	type: string;
	uri: string;
};

type Image = {
	url: string;
	height: number;
	width: number;
};

type Track = {
	added_at: string;
	added_by: {
		external_urls: {
			spotify: string;
		};
		followers: {
			href: string;
			total: number;
		};
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	is_local: boolean;
	track: {
		album: Album;
		artists: Artist[];
		available_markets: string[];
		disc_number: number;
		duration_ms: number;
		explicit: boolean;
		external_ids: {
			isrc: string;
			ean: string;
			upc: string;
		};
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		is_playable: boolean;
		linked_from: {};
		restrictions: {
			reason: string;
		};
		name: string;
		popularity: number;
		preview_url: string;
		track_number: number;
		type: string;
		uri: string;
		is_local: boolean;
	};
};

type Album = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: {
		reason: string;
	};
	type: string;
	uri: string;
	artists: SimplyfiedArtist[];
};

type Artist = {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string;
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

type SimplyfiedArtist = Pick<
	Artist,
	"external_urls" | "href" | "id" | "name" | "type" | "uri"
>;
