import { redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { placemarkStore } from '$lib/server/models/placemark-store';
import { resolveUserId } from '$lib/server/auth';

export async function load({ cookies, locals }) {
	await dbConnect();

	const authSession = null;
	const token = cookies.get('token');

	if (!authSession && !token) {
		throw redirect(303, '/login');
	}

	const userId = resolveUserId(token, authSession);

	return {
		placemarks: await placemarkStore.findByUser(userId)
	};
}
