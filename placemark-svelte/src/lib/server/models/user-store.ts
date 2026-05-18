import { User } from '$lib/server/models/user';
import { dbConnect } from '$lib/server/db';
import type { User as UserType } from '$lib/types/placemark-types';

export const userStore = {
	async add(user: UserType) {
		await dbConnect();

		const newUser = new User(user);
		return newUser.save();
	},

	async findBy(email: string) {
		await dbConnect();

		return User.findOne({
			email: email.trim().toLowerCase()
		}).lean();
	}
};
