export interface PlacemarkSession {
	name: string;
	_id: string;
	token: string;
}

export interface PlacemarkPayload {
	name: string;
	description: string;
	category: string;
	rating: string;
	lat: number;
	lng: number;
}
