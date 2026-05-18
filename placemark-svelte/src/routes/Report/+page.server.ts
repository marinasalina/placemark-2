import { fail, redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { placemarkStore } from '$lib/server/models/placemark-store';
import { imageStore } from '$lib/server/models/image-store';

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

export const actions = {
	addImage: async ({ request }) => {
		await dbConnect();

		const form = await request.formData();
		const placemarkId = String(form.get('placemarkId') || '');
		const files = form.getAll('images') as File[];

		if (!placemarkId) {
			return fail(400, { message: 'Missing placemark id' });
		}

		for (const file of files) {
			if (file && file.size > 0) {
				const uploadedImage = await imageStore.uploadImage(file);
				await placemarkStore.addImage(placemarkId, uploadedImage);
			}
		}

		throw redirect(303, '/Report');
	},

	deleteImage: async ({ request }) => {
		await dbConnect();

		const form = await request.formData();
		const placemarkId = String(form.get('placemarkId') || '');
		const imageIndex = Number(form.get('imageIndex'));

		const image = await placemarkStore.deleteImage(placemarkId, imageIndex);

		if (image && image.publicId) {
			await imageStore.deleteImage(image.publicId);
		}

		throw redirect(303, '/Report');
	}
};
