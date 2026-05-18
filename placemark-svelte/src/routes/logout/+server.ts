import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('token', { path: '/' });
	cookies.delete('name', { path: '/' });
	cookies.delete('email', { path: '/' });

	cookies.set('loggedOut', 'true', {
		path: '/',
		maxAge: 60
	});

	throw redirect(303, '/signup');
}
