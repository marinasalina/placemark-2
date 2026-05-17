import { fail, redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { createUser } from '$lib/server/auth';

export const actions = {
	default: async ({ request }) => {
		await dbConnect();

		const form = await request.formData();

		const firstName = String(form.get('firstName') || '');
		const lastName = String(form.get('lastName') || '');
		const email = String(form.get('email') || '');
		const password = String(form.get('password') || '');

		if (!firstName || !lastName || !email || !password) {
			return fail(400, { message: 'Please fill in all fields' });
		}

		await createUser({
			firstName,
			lastName,
			email,
			password
		});

		throw redirect(303, '/login');
	}
};