import { User } from '$lib/server/models/user';
import { dbConnect } from '$lib/server/db';
import type { User as UserType } from '$lib/types/placemark-types';
//Creates reusable object with the DB functions
export const userStore = {
	//create new user in DB
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
