import { redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { placemarkStore } from '$lib/server/models/placemark-store';

export async function load({ cookies, locals }) {
	await dbConnect();

	const authSession = await locals.auth();
	const token = cookies.get('token');

	if (!authSession && !token) {
		throw redirect(303, '/login');
	}

	return {
		placemarks: await placemarkStore.find()
	};
}
