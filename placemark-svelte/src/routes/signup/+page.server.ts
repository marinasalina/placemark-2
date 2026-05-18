import type { User } from '$lib/types/placemark-types';
import { redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { createUser } from '$lib/server/auth';

export const actions = {
	signup: async ({ request }) => {
		await dbConnect();

		const form = await request.formData();

		const user: User = {
			firstName: form.get('firstName') as string,
			lastName: form.get('lastName') as string,
			email: form.get('email') as string,
			password: form.get('password') as string
		};

		if (!user.email || !user.password) {
			throw redirect(307, '/signup');
		}

		await createUser(user);

		throw redirect(303, '/login');
	}
};
