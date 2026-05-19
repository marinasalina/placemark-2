import { json } from '@sveltejs/kit';
import { createToken } from '$lib/server/auth';

export async function POST({ request, cookies }) {
	const { uid, email } = await request.json();

	const token = createToken(uid);

	cookies.set('token', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: false
	});

	cookies.set('name', email ?? 'Firebase User', {
		path: '/',
		httpOnly: false,
		sameSite: 'strict',
		secure: false
	});

	return json({ success: true });
}
