import { Placemark } from './placemark';
import type { Placemark as PlacemarkType } from '$lib/types/placemark-types';
//Creates reusable object with the DB funbctions
export const placemarkStore = {
	//returns array of placemarks
	async find(): Promise<PlacemarkType[]> {
		const placemarks = await Placemark.find().lean();
		return JSON.parse(JSON.stringify(placemarks));
	},
	// Gets only user's placemarks
	async findByUser(userId: string): Promise<PlacemarkType[]> {
		const placemarks = await Placemark.find({ userId }).lean();
		return JSON.parse(JSON.stringify(placemarks));
	},
	// Adds new placemarks to DB
	async add(placemark: PlacemarkType): Promise<PlacemarkType> {
		const newPlacemark = await new Placemark(placemark).save();
		return JSON.parse(JSON.stringify(newPlacemark));
	},
	//Add image
	async addImage(placemarkId: string, image: { url: string; publicId: string }) {
		const placemark = await Placemark.findById(placemarkId);

		if (!placemark) return false;

		placemark.images.push(image);
		await placemark.save();

		return true;
	},
	//delete image
	async deleteImage(placemarkId: string, imageIndex: number) {
		const placemark = await Placemark.findById(placemarkId);

		if (!placemark) return false;

		const image = placemark.images[imageIndex];

		if (!image) return false;

		placemark.images.pull(image);
		await placemark.save();

		return image;
	}
};
