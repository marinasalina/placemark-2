export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface Session {
	name: string;
	_id: string;
	token: string;
}

export interface Placemark {
	_id?: string;
	name: string;
	description: string;
	category: string;
	rating: string;
	lat: number;
	lng: number;
	createdAt?: string;
	images?: string[];
}
