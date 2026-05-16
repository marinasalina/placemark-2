import mongoose from 'mongoose';

const placemarkSchema = new mongoose.Schema({
	name: String,
	description: String,
	category: String,
	rating: String,
	lat: Number,
	lng: Number,
	userId: String,
	images: [String],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export const Placemark = mongoose.models.Placemark || mongoose.model('Placemark', placemarkSchema);
