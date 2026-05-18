import type { Session, User, Placemark } from '$lib/types/placemark-types';
import { userStore } from '$lib/server/models/user-store';
import { placemarkStore } from '$lib/server/models/placemark-store';

export const placemarkService = {
	async signup(user: User): Promise<boolean> {
		try {
			const newUser = await userStore.add(user);
			return !!newUser;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const user = await userStore.findBy(email.trim().toLowerCase());

			if (user && user.password === password) {
				return {
					name: `${user.firstName} ${user.lastName}`,
					token: user._id!.toString(),
					_id: user._id!.toString(),
					email: user.email
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
			const placemarks = await placemarkStore.find();
			return JSON.parse(JSON.stringify(placemarks));
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async addPlacemark(placemark: Placemark): Promise<boolean> {
		try {
			const newPlacemark = await placemarkStore.add(placemark);
			return !!newPlacemark;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
};
