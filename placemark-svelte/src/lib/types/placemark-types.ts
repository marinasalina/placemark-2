//TS defenition for the main data structures used in the application, including User, Session, and Placemark. These interfaces define the shape of the data objects that will be used throughout the application, ensuring type safety and consistency when working with user information, authentication sessions, and placemark data.
export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
//Blueprint for a session object which contain 3 properties. Only descrybe expected structure
export interface Session {
	name: string;
	_id: string;//Mongo _id
	//email+password - server checks credentials. If correct: server create token
	//Token contain encoded user info
	//Browser stores it: cookie, local storage, session storage
	//Later requests token back
	token: string;//Authentication token (JWT - JSON web Token). This proves user is logged in
}

export interface Placemark {
	weather(lat: number, lng: number, name: string, category: string, description: string, arg5: string[], weather: any): unknown;
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
