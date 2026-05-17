import { dbConnect } from '$lib/server/db';
import { Placemark } from '$lib/server/models/placemark';

export async function load() {
	await dbConnect();

	const placemarks = await Placemark.find().lean();

	return {
		placemarks: JSON.parse(JSON.stringify(placemarks))
	};
}
