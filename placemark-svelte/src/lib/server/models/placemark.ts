import mongoose from 'mongoose';
import { imageSchema } from './image';
// Blueprint for placemark data in MongoDB
const placemarkSchema = new mongoose.Schema({
	name: String,
	description: String,
	category: String,
	rating: String,
	lat: Number,
	lng: Number,
	userId: String,
	images: [imageSchema],
	createdAt: String
});

export const Placemark = mongoose.models.Placemark || mongoose.model('Placemark', placemarkSchema);
