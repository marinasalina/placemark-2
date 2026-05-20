import { fail, redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { placemarkStore } from '$lib/server/models/placemark-store';
import { imageStore } from '$lib/server/models/image-store';
import { resolveUserId } from '$lib/server/auth.js';

export async function load({ cookies, locals }) {
	await dbConnect();

	const authSession = null;
	const token = cookies.get('token');

	if (!authSession && !token) {
		throw redirect(303, '/login');
	}

	return {};
}

export const actions = {
	default: async ({ request, cookies, locals }) => {
		await dbConnect();

		const authSession = await locals.auth();
		const token = cookies.get('token');

		if (!authSession && !token) {
			throw redirect(303, '/login');
		}

		const form = await request.formData();
		//Retrieves all files associated with the 'images' field in the form and casts them to an array of File objects. This allows us to work with the uploaded files in the server-side code.
		const files = form.getAll('images') as File[];

		const images = [];

		for (const file of files) {
			if (file && file.size > 0) {
				const uploadedImage = await imageStore.uploadImage(file);
				images.push(uploadedImage);
			}
		}
		const userId = resolveUserId(token, authSession);
		console.log('Hello', userId);
		const placemark = {
			name: String(form.get('name') || ''),
			description: String(form.get('description') || ''),
			category: String(form.get('category') || ''),
			rating: String(form.get('rating') || ''),
			lat: Number(form.get('lat') || 0),
			lng: Number(form.get('lng') || 0),
			userId,
			images,
			createdAt: new Date().toISOString()
		};

		if (!placemark.name || !placemark.description) {
			return fail(400, { message: 'Please enter name and description' });
		}

		await placemarkStore.add(placemark);

		throw redirect(303, '/PlaceMark');
	}
};
