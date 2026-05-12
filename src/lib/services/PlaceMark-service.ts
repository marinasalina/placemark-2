import axios from 'axios';
import type { Placemark, Session } from '$lib/types/placemark-types';

export const placemarkService = {
	baseUrl: 'http://localhost:4000',

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
				email,
				password
			});

			if (response.data.success) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

				const session: Session = {
					name: response.data.name,
					token: response.data.token,
					_id: response.data._id
				};

				return session;
			}

			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async addPlacemark(placemark: Placemark): Promise<boolean> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/placemarks`, placemark);
			return response.status === 200;
		} catch (error) {
			console.log(error);
			return false;
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
	}
};
