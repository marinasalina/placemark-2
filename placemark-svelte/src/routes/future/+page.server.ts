import { dbConnect } from '$lib/server/db';
import { placemarkStore } from '$lib/server/models/placemark-store';

export async function load() {
	await dbConnect();

	const placemarks = await placemarkStore.find();

	return {
		placemarks
	};
}
