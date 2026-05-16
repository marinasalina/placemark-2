import axios from 'axios';
import type { Session, User, Placemark } from '$lib/types/placemark-types';

export const placemarkService = {
	baseUrl: 'http://localhost:4000',

	async signup(user: User): Promise<boolean> {
		try {
			await axios.post(`${this.baseUrl}/api/users`, user);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
				email,
				password
			});

			if (response.data.success) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
				return {
					name: response.data.name,
					token: response.data.token,
					_id: response.data._id
				};
			}
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async getPlacemarks(): Promise<Placemark[]> {
		try {
			const response = await axios.get(`${this.baseUrl}/api/placemarks`);
			return response.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async addPlacemark(placemark: Placemark): Promise<boolean> {
		try {
			await axios.post(`${this.baseUrl}/api/placemarks`, placemark);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async deleteImage(placemarkId: string, imageIndex: number): Promise<boolean> {
		try {
			await axios.delete(`${this.baseUrl}/api/placemarks/${placemarkId}/images/${imageIndex}`);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
};
