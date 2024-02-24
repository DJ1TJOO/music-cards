export type PlaylistItems = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: PlaylistTrack[];
};

export type Playlist = {
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
		items: PlaylistTrack[];
	};
	type: string;
	uri: string;
};

type Image = {
	url: string;
	height: number;
	width: number;
};

export type PlaylistTrack = {
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
	track: Track;
};

export type Track = {
	album: Album;
	artists: SimplyfiedArtist[];
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

export type SimplyfiedTrack = Pick<
	Track,
	| "artists"
	| "available_markets"
	| "disc_number"
	| "duration_ms"
	| "explicit"
	| "external_urls"
	| "href"
	| "id"
	| "is_playable"
	| "linked_from"
	| "restrictions"
	| "name"
	| "preview_url"
	| "track_number"
	| "type"
	| "uri"
	| "is_local"
>;

export type AlbumItems = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SimplyfiedTrack[];
};

export type Album = {
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

export type Artist = {
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

export type SimplyfiedArtist = Pick<
	Artist,
	"external_urls" | "href" | "id" | "name" | "type" | "uri"
>;
