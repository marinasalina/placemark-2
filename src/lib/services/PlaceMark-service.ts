import axios from 'axios';
import type { Placemark, Session } from '$lib/types/placemark-types';

export const placemarkService = {
	baseUrl: '', // SvelteKit backend

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const response = await axios.post(`/api/users/authenticate`, {
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

	async addPlacemark(placemark: Placemark): Promise<boolean> {
		try {
			const response = await axios.post(`/api/placemarks`, placemark);
			return response.status === 200;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async getPlacemarks(): Promise<Placemark[]> {
		try {
			const response = await axios.get(`/api/placemarks`);
			return response.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async getPlacemark(id: string): Promise<Placemark | null> {
		try {
			const response = await axios.get(`/api/placemarks/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async deletePlacemark(id: string): Promise<boolean> {
		try {
			const response = await axios.delete(`/api/placemarks/${id}`);
			return response.status === 200;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
};
