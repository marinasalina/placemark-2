import { Placemark } from '../models/placemark.js';

export const placemarkApi = [
	{
		method: 'GET',
		path: '/api/placemarks',
		handler: async () => {
			return await Placemark.find();
		}
	},
	{
		method: 'POST',
		path: '/api/placemarks',
		handler: async (request, h) => {
			const placemark = new Placemark(request.payload);
			await placemark.save();
			return { success: true };
		}
	}
];
