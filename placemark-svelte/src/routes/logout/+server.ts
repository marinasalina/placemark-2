import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('token', { path: '/' });
	cookies.delete('name', { path: '/' });
	cookies.delete('email', { path: '/' });

	return json({ success: true });
};
