import { fail, redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { authenticateUser } from '$lib/server/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		await dbConnect();

		const form = await request.formData();

		const email = String(form.get('email') || '');
		const password = String(form.get('password') || '');

		const session = await authenticateUser(email, password);

		if (!session) {
			return fail(401, { message: 'Invalid Credentials' });
		}

		cookies.set('token', session.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false
		});

		cookies.set('name', session.name, {
			path: '/',
			httpOnly: false,
			sameSite: 'strict',
			secure: false
		});

		throw redirect(303, '/PlaceMark');
	}
};
