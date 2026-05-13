import { User } from '../../src/models/user.js';
import jwt from 'jsonwebtoken';

export const usersApi = [
	{
		method: 'POST',
		path: '/api/users',
		handler: async (request, h) => {
			const user = new User(request.payload);
			await user.save();
			return { success: true };
		}
	},
	{
		method: 'POST',
		path: '/api/users/authenticate',
		handler: async (request, h) => {
			const { email, password } = request.payload;
			const user = await User.findOne({ email, password });

			if (!user) return { success: false };

			const token = jwt.sign({ id: user._id }, 'secret');

			return {
				success: true,
				name: user.firstName,
				_id: user._id,
				token
			};
		}
	}
];
